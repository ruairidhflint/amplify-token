# Amplify Token

Generate a [AWS Amplify Auth Token](https://docs.amplify.aws/lib/auth/getting-started/q/platform/js/) using your AWS configuration and [Cognito](https://aws.amazon.com/cognito/) credentials via a CLI.

## Installation

Amplify Token requires [Node.js](https://nodejs.org) version 12 or above. To install, run the following command from any directory in your terminal:

```bash
npm install amplify-token -g
```

Currently the project has only been tested on macOS Monterey but has no obvious limitations so should work on both modern and legacy versions of Windows and macOs.

**Important:** Running `npm install amplify-token -g` in CI means you're always installing the latest version of the CLI, including **breaking changes**.

## Usage

Installing the CLI globally provides access to the `amplify-token` command.

```bash
amplify-token [command]

# Run `--help` for detailed information about CLI commands
amplify-token [command] --help
```

## Commands

There are two main commands provided with `amplify-token`: **config** and **fetch**.

### config

Interact with the config store where your variables to interact with AWS are saved.

| Subcommand  | description                                                      |
| :---------- | :--------------------------------------------------------------- |
| `--set`     | Set a key and value in the config store (requires two arguments) |
| `--get`     | Get a value from the config store (requires one argument)        |
| `--get-all` | Gets all current values from the config store                    |
| `--clear`   | Clears the config store of all values                            |

_Example_

```bash
amplify-token config --set region us-west-2
```

### fetch

Attempt to communicate with AWS using the configuration settings. If successful, the user will be prompted for an email and password. If the credentials are valid, the JWT will be provided.

_Example_

```bash
amplify-token fetch
```

## AWS Auth

Authentication with Cognito/Amplify can be a little nuanced. Taken directly from the [docs](https://docs.amplify.aws/lib/restapi/getting-started/q/platform/js/#configure-your-application), these are example settings that can be set in the config store before running `fetch`

```javascript
// REQUIRED - Amazon Cognito Identity Pool ID
identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',
// REQUIRED - Amazon Cognito Region
region: 'XX-XXXX-X',
// OPTIONAL - Amazon Cognito User Pool ID
userPoolId: 'XX-XXXX-X_abcd1234',
// OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
userPoolWebClientId: 'a1b2c3d4e5f6g7h8i9j0k1l2m3',`
```

## License

MIT. See [LICENSE.md](LICENSE) for more details.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for more info on how to make contributions to this project.
