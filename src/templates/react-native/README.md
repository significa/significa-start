# React Native boilerplate

This React Native starter aims to solve commons issues during the development step and build process in Appcenter. It's a non-opinionated boilerplate, however it uses a couple of preset tools and scripts in order to manage the routine tasks.

## 1. Getting started

**React Native first time**

The doctor command currently supports most of the software and libraries that React Native relies on, such as CocoaPods, Xcode and Android SDK. With doctor we'll find issues with your development environment and give you the option to automatically fix them. If doctor is not able to fix an issue, it will display a message and a helpful link explaining how to fix it manually as the following:

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

### Environment variable

react-native-dotenv provide a straightforward API to handle with environment variables

```js
import Config from "react-native-config";

Config.API_URL; // 'https://myapi.com'
Config.GOOGLE_MAPS_API_KEY; // 'abcdefgh'
```

Check [react-native-config](https://github.com/luggit/react-native-config) for more details.

**Env variable pattern name**

In order to work properly, the package requires to follow a specific pattern: `RN_NAME_VAR=VALUE`. The prefix "RN\_" is very important**, once a script that will run the Appcenter will look only for these variables following this pattern.

Check `scripts/appcenter_envar.sh` for more details.

### iOS certificates

In order to automate the process of distributing the application to the assigned user, Appcenter needs two essential files: `_.p12` and `_.mobileprovision`.

- `fastlane match development`: _Needs more details_


## 3. Build

This boilerplate is prepared to run in the Appcenter, where build and distribute the application for both: iOS and Android.

**Appcenter**

Appcenter is a continuously build, test, release, and monitor apps for React Native. Once the application has setup in the Appcenter, it will run the script `appcenter-pre-build.sh` with the following purpose:
- Expose environment variable;
- Install Fastlane dependency;
- Run Fastlane scrips;

**Picking Appcenter certificates**

_Needs more details_

**Fastlane**

It's an open-source platform aimed at simplifying Android and iOS deployment and everyday tasks. Each platform has its own configuration file with its proper tasks, but in general, all of them have this in common:
- Update icon: set an application icon according to build type. Icons images are in the metadata folder;
- Update application name: set the application name according to build type (like My app - Beta or My app). The name is taken from App.json in the root folder.

* Appcenter should handle this automatically; otherwise, you can run using the `scripts/fastlane.sh` script.

Check `ios/fastlane` and `android/fastlane` for more details.

