# Capacitor Browser plugin events investigation

Reproduction of issue with Capacitor's Browser plugin, where the `browserFinished` event is treated differently on iOS and Android. Specifically, Android does not call the event listener until the app has been inactive and then resumed. iOS calls the event listener immediately after the in-app browser is closed.

This repo was created on 2020-12-03 with:

```bash
# Minimal starter `app` option:
npm init stencil app
npx install -D @capacitor/core @capacitor/cli
npx cap init
npx cap add android
```

To run, clone this repo and:

```bash
npm install
npm run build
npx cap sync
# Build and run in Android Studio
npx cap open android
# Build and run in Xcode
npx cap open ios
```
