![](baserunner-logo.png)

# Baserunner

A tool for exploring and exploiting Firebase datastores. See [this post on our blog](https://iosiro.com/blog/baserunner-exploiting-firebase-datastores) for an overview of how Firebase works and why we developed this tool.

## Set up

1. `git clone https://github.com/iosiro/baserunner.git`
2. `cd baserunner`
3. `npm install`
4. `npm run build`
5. `npm start`
6. Go to http://localhost:3000 in your browser.

## Usage

The Baserunner interface looks like this:

![](baserunner.png)

First, use the configuration textbox to load a Firebase configuration JSON structure from the app you'd like to test. It looks like this:

```json
{
  "apiKey": "API_KEY",
  "authDomain": "PROJECT_ID.firebaseapp.com",
  "databaseURL": "https://PROJECT_ID.firebaseio.com",
  "projectId": "PROJECT_ID",
  "storageBucket": "PROJECT_ID.appspot.com",
  "messagingSenderId": "SENDER_ID",
  "appId": "APP_ID",
  "measurementId": "G-MEASUREMENT_ID",
  "databaseURL": "https://PROJECT_ID.firebasedatabase.app/"
}
```

Then log in as a regular user, either with email and password or with a mobile phone number. When logging in with a mobile phone number, complete the CAPTCHA before submitting your number. You then be prompted for an OTP from your SMS. Enter this without completing the CAPTCHA to finish logging in. Note that you can skip this step to test queries without authentication.

Finally, you can use the query interface to submit queries to the application's Cloud Firestore. Baserunner provides a number of template queries for common actions. Click on one of them to load it in the textbox, and replace the values that look `==LIKE THIS==` with valid names of collections, IDs, fields, etc.

As there is no way of getting a list of available collection using the Firebase JavaScript SDK, you will need to guess these, or source their names from the application's front-end JavaScript.

## FAQ

**How do I tell if an app is using Cloud Firestore or Realtime Database?**

Applications using Realtime Database will have a `databaseURL` key in their configuration objects. Applications without this key can be assumed to use Cloud Firestore. Note that it is possible for Firebase applications to use both datastores, so when in doubt, run both types of queries.

**I'm getting blocked by CORS!**

To function as intended, Baserunner expects applications to accept requests from localhost, which is enabled by default. Therefore, Baserunner cannot be used as a hosted application.

Should requests from localhost be disallowed by the application you're testing, a version of Baserunner with a reduced featureset can still be run by opening `dist/index.html` in your browser. Note that this way of running Baserunner only supports email + password login and not phone login.

**How do I know what collections to query for?**

Cloud Firestore: For security reasons, Firebase's client-side JavaScript API does not provide a mechanism for listing collections. You will need to deduce these from looking at the target application's JavaScript code and making educated guesses.

Realtime Database: As this datastore is represented as a JSON object, you can use the provided "[Realtime Database] Read datastore" query to attempt to view the entire thing. Note that this may fail depending on the rules configured.

**Can I see the results of previous queries?**

While only the latest query result is displayed on the Baserunner page, all results are logged to the browser console.

**When running Realtime Database queries, I get an error that says the client is offline.**

Try rerunning the query.

**How do I log in with Google?**

1. Find the app's Google OAuth Client ID (i.e. `NUMERIC_STR-ALPHANUMERIC_STR.apps.googleusercontent.com`). You can do this by clicking "Sign in with Google" on the site, inspecting the HTML, and searching for `apps.googleusercontent.com`.


2. Edit your DNS file (`/etc/hosts` on Linux and macOS, `C:\Windows\system32\drivers\etc\hosts` on Windows) and add the following line:

```
127.0.0.1 PROJECT_ID.firebaseapp.com
```

3. In the Baserunner directory, run the following command to generate a self-signed certificate:

```
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./selfsigned.key -out selfsigned.crt
```

At the prompts, you can leave all fields blank except `Common Name (e.g. server FQDN or YOUR name) []`, which you should set to `PROJECT_ID.firebaseapp.com`.

4. Edit `dist/index.html` and modify `TODO_SET_ME.apps.googleusercontent.com` to the Client ID you found in step 1.

5. Clear all website data relating to `PROJECT_ID.firebaseapp.com` from your browser settings (alternatively, use a fresh browser) in order to prevent the browser from blocking your connection due to certificate mismatch (HSTS).

5. Run Baserunner using ```sudo node index.js 443``` and then load `https://PROJECT_ID.firebaseapp.com` in your browser

6. Click the Google sign-in button and sign in using the Google account you registered for the app with.

7. Click the "Set google login" button.

8. Explore the database as you would with a non-Google account.

9. When done security testing, remove the line from step 2 from your DNS file.