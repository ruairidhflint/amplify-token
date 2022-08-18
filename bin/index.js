#! /usr/bin/env node
import Configstore from "configstore";
import { readFileSync } from "fs";
import { Command } from "commander";
import prompt from "prompt";
import { Auth } from "@aws-amplify/auth";
import chalk from "chalk";

const program = new Command();
const packageJson = JSON.parse(readFileSync("./package.json", "utf8"));
const config = new Configstore(packageJson.name);

program
  .command("config")
  .description("view config")
  .option("--set [values...]", "set a config value in the key store")
  .option("--get [value]", "get a config value in the key store")
  .option("--clear", "clear config store")
  .option("--get-all", "view config file")
  .action(function (options) {
    if (Object.keys(options).length === 0) {
      return console.log(
        chalk.yellow(
          "You must supply additional arguments to the config command. Enter rory config --help to view all available commands"
        )
      );
    }
    if (Object.keys(options).length > 1) {
      return console.log(
        chalk.yellow(
          "You can only specify one command at a time. Enter rory config --help to view all available commands"
        )
      );
    }
    if (options.set) {
      if (options.set.length !== 2) {
        return console.log(
          chalk.yellow(
            "Setting a config variable requires both a key and a value eg. region us-west"
          )
        );
      }
      config.set(options.set[0], options.set[1]);
      return;
    }
    if (options.get) {
      const retrieved = config.get(options.get);
      if (!retrieved) {
        return console.log(chalk.red(`No key ${options.get} exists`));
      } else {
        return console.log(chalk.green(retrieved));
      }
    }
    if (options.clear) {
      prompt.get(
        {
          properties: {
            Clear: {
              description: chalk.yellow(
                "Are you sure you want to clear all config settings? y/n"
              ),
              required: true,
            },
          },
        },
        function (err, result) {
          if (err) {
            return 1;
          }
          if (result.Clear.toLowerCase() === "y" || result.Clear === "yes") {
            console.log(chalk.red("Configuration cleared"));
            return config.clear();
          }
        }
      );
    }
    if (options.getAll) {
      return console.log(config.all);
    }
  });

program
  .command("token")
  .description("view config")
  .action(function () {
    Auth.configure({
      Auth: config.all,
    });
    prompt.start();
    prompt.get(
      {
        properties: {
          email: {
            required: true,
          },
          password: {
            required: true,
            hidden: true,
          },
        },
      },
      async function (err, result) {
        if (err) {
          console.dir(err);
          return 1;
        }
        try {
          const user = await Auth.signIn(result.email, result.password);
          console.log(
            chalk.blue(`\n\n\n${user.signInUserSession.idToken.jwtToken}\n\n\n`)
          );
        } catch (error) {
          console.dir(error);
          return 1;
        }
      }
    );
  });

program.parse(process.argv);
