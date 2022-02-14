# Create a Secure Serverless Application with FaunaDB

This repository shows you how to secure an express application with Okta and deploy that application to [Google Firebase](https://firebase.google.com/).

**Prerequisites:**

- [Node.js](https://nodejs.org/en/)
- [Firebase Project on Blaze Billing Plan](https://firebase.google.com/)
- [Firebase CLI](https://firebase.google.com/docs/cli)
- [Okta CLI](https://cli.okta.com)
  > [Okta](https://developer.okta.com/) has Authentication and User Management APIs that reduce development time with instant-on, scalable user infrastructure. Okta's intuitive API and expert support make it easy for developers to authenticate, manage and secure users and roles in any application.

* [Getting Started](#getting-started)
* [Links](#links)
* [Help](#help)
* [License](#license)

## Getting Started

To run this example locally, run the following commands:

```bash
git clone https://github.com/nickolasfisher/Okta_Firebase
cd functions
```

### Create an OIDC Application in Okta

Create a free developer account with the following command using the [Okta CLI](https://cli.okta.com):

```shell
okta register
```

If you already have a developer account, use `okta login` to integrate it with the Okta CLI.

Create your application

```shell
okta apps create
```

You will be prompted to select the following options:

- Type of Application: **1: Web**
- Framework of Application: **Other**
- Redirect URI: `https://localhost:5001/{yourFirebaseProjectId}/{yourFirebaseRegion}/app/authorization-code/callback`
- Post Logout Redirect URI: `https://localhost:5001`

The application configuration will be printed to `.okta.env`. Add the value for `APP_BASEURL` to this file.

```dotenv
export OKTA_OAUTH2_ISSUER="{yourOktaDomain}/oauth2/{yourAuthorizationServiceId}"
export OKTA_OAUTH2_CLIENT_SECRET="{yourClientSecret}"
export OKTA_OAUTH2_CLIENT_ID="{yourClientId}"
export APP_BASEURL="https://localhost:5001/{yourFirebaseProjectId}/{yourFirebaseRegion}/app"
```

Use `npm run serve` to run the application in an emulator.

### Deploy to Firebase

Using the Firebase CLI run the command `firebase deploy`.  After the application is deployed, obtain the URL on your application from the CLI.  

Update `.okta.env` to replace the `APP_BASEURL` value you just obtained.  For example, mine is `https://us-central1-okta-firebase-55b7a.cloudfunctions.net/app`.

Run `firebase deploy` again to update the changes to your `.okta.env`.

### Update your Okta application

Navigate to your application in the Okta developer console.

Add values for *Sign-in redirect URIs* and *Sign-out reidrect URIs* that reflect your live site.  For example, my *Sign-in redirect URIs* has a value for `https://us-central1-okta-firebase-55b7a.cloudfunctions.net/app/authorization-code/callback` and my *Sign-out redirect URIs* has a value for `https://us-central1-okta-firebase-55b7a.cloudfunctions.net/app`.

Navigate to your site and test your login functionality.  

## Links

This example uses the following open source libraries from Okta:

- [Okta with NodeJs](https://developer.okta.com/code/nodejs/)
- [Okta CLI](https://github.com/okta/okta-cli)
- [Okta OIDC Middleware](https://github.com/okta/okta-oidc-middleware)

## Help

Please post any questions as comments on the [blog post][blog], or visit our [Okta Developer Forums](https://devforum.okta.com/).

## License

Apache 2.0, see [LICENSE](LICENSE).

[blog]: https://developer.okta.com/blog/2021/xyz
