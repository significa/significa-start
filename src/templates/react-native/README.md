# React Native boilerplate

This React Native starter aims to solve commons issues during the development step and build process in Appcenter. It's a non-opinionated boilerplate, however it uses a couple of preset tools and scripts in order to manage the routine tasks.

## 1. Getting started

**React Native first time**

The doctor command currently supports most of the software and libraries that React Native relies on, such as CocoaPods, Xcode, and Android SDK. With doctor, we'll find issues with your development environment and give you the option to automatically fix them. If doctor is not able to fix an issue, it will display a message and a helpful link explaining how to fix it manually:

```sh
npx @react-native-community/cli doctor
```

**Project first time**

Installing all project dependencies, from node to pods:

```sh
yarn install
```

**Scripts available**

- `yarn ios`: run iOS development mode;
- `yarn android`: run Android development mode;
- `yarn clean`: clean up React Native environment;
- `yarn rename [NewName]`: rename application's name;
- `sh ./scripts/fastlane.sh`: install the Fastlane environnement;
- `sh ./scripts/sync-cocoapods-version.sh`: install the version the is set in the Podfile;


## 2. Development

### Environment variables

react-native-dotenv provides a straightforward API to handle environment variables

```js
import Config from "react-native-config";

Config.API_URL; // 'https://myapi.com'
Config.GOOGLE_MAPS_API_KEY; // 'abcdefgh'
```

Check [react-native-config](https://github.com/luggit/react-native-config) for more details.

**Environment variables name pattern**

In order to work properly, the package requires you to follow a specific pattern: `RN_VAR_NAME=VALUE`. The prefix "RN\_" is very important**. A script that will run in Appcenter will only look only for variables that follow this pattern.

Check `scripts/appcenter_envar.sh` for more details.

## 3. Build

This boilerplate is prepared to run in Appcenter, where it will build and distribute the application for both iOS and Android.

**Appcenter**

Appcenter is a platform to continuously build, test, release, and monitor apps. Once the application is setup in Appcenter, it will run the script `appcenter-pre-build.sh` to:
- Expose environment variables;
- Install Fastlane dependencies;
- Run Fastlane scripts;

**Code signing**

- Android: https://docs.microsoft.com/en-us/appcenter/build/android/code-signing
- iOS: https://docs.microsoft.com/en-us/appcenter/build/ios/code-signing

**Fastlane**

It's an open-source platform aimed at simplifying Android and iOS deployment and everyday tasks. Each platform has its own configuration file with its proper tasks, but in general, all of them have this in common:
- Update icon: set an application icon according to build type. Icons images are in the metadata folder;
- Update application name: set the application name according to build type (like My app - Beta or My app). The name is taken from App.json in the root folder.

* Appcenter should handle this automatically; otherwise, you can run using the `scripts/fastlane.sh` script.

Check `ios/fastlane` and `android/fastlane` for more details.
