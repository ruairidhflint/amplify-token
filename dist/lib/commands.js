var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import prompt from 'prompt';
import { Auth } from '@aws-amplify/auth';
import chalk from 'chalk';
import { setKey, getKey, clearStore, getStore } from './configstore.js';
import * as text from './constants.js';
function config(options) {
    if (Object.keys(options).length === 0) {
        return console.log(chalk.yellow(text.MISSING_ARGS));
    }
    if (Object.keys(options).length > 1) {
        return console.log(chalk.yellow(text.EXCESS_ARGS));
    }
    if (options.set) {
        if (options.set.length !== 2) {
            return console.log(chalk.yellow(text.CONFIG_VARS));
        }
        setKey(options.set[0], options.set[1]);
        return;
    }
    if (options.get) {
        const retrieved = getKey(options.get);
        if (!retrieved) {
            return console.log(chalk.red(`No key ${options.get} exists`));
        }
        else {
            return console.log(chalk.green(retrieved));
        }
    }
    if (options.clear) {
        prompt.get({
            properties: {
                Clear: {
                    description: chalk.yellow(text.CONFIRM_CLEAR),
                    required: true,
                },
            },
        }, function (err, result) {
            if (err) {
                return 1;
            }
            if (result.Clear.toLowerCase() === 'y' || result.Clear === 'yes') {
                console.log(chalk.red(text.CONFIG_CLEARED));
                return clearStore();
            }
        });
    }
    if (options.getAll) {
        return console.log(getStore());
    }
}
function fetchToken() {
    Auth.configure({
        Auth: getStore(),
    });
    prompt.start();
    prompt.get({
        properties: {
            email: {
                required: true,
            },
            password: {
                required: true,
                hidden: true,
            },
        },
    }, function (err, result) {
        return __awaiter(this, void 0, void 0, function* () {
            if (err) {
                console.dir(err);
                return 1;
            }
            try {
                console.log(chalk.yellow(text.FETCHING_TOKEN));
                const user = yield Auth.signIn(result.email, result.password);
                console.log(chalk.green(`\n\nSuccess! Your JWT is below:\n\n\n${user.signInUserSession.idToken.jwtToken}\n\n\n`));
            }
            catch (error) {
                console.dir(error);
                return 1;
            }
        });
    });
}
export { config, fetchToken };
//# sourceMappingURL=commands.js.map