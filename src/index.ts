import { Command } from 'commander'
import { config, fetchToken } from './lib/commands.js'

export const init = () => {
  const program = new Command()

  program
    .command('config')
    .description(
      'Set and view the configuration settings for your AWS Amplify Request'
    )
    .option(
      '--set [values...]',
      'Set a config value. Takes 2 arguments (key and value)'
    )
    .option('--get [value]', 'Get a config value. Takes 1 arguments (key)')
    .option('--clear', 'Clear config of all values')
    .option('--get-all', 'View all values in config file')
    .action((options) => config(options))

  program
    .command('fetch')
    .description('Fetch JWT with email and password')
    .action(fetchToken)

  program.parse(process.argv)
}
