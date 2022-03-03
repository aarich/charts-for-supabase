/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('../app.json');
const easConfig = require('../eas.json');
const fs = require('fs');

const appReleaseDashed = process.argv[2]; // app version, e.g. 3-0
const appRelease = appReleaseDashed.replace('-', '.');
const dest = process.argv[3]; // build destination, e.g. WEB/ANDROID/IOS/NONE

const { expo } = config;
const { ios, android } = expo;

if (dest === 'IOS') {
  if (expo.version !== appRelease) {
    // We're on a new version, reset ios build number
    ios.buildNumber = '1';
  } else {
    ios.buildNumber = `${parseInt(config.expo.ios.buildNumber) + 1}`;
  }
  console.log(`\nios.buildNumber set to ${ios.buildNumber}\n`);
} else if (dest === 'ANDROID') {
  android.versionCode += 1;
  console.log(`\nandroid.versionCode set to ${android.versionCode}\n`);
} else {
  console.log('\nNo version/build number changes made\n');
}

expo.version = appRelease;

easConfig.build.production.releaseChannel = 'prod-' + appReleaseDashed;

// Update minor version
fs.readFile('src/utils/constants.ts', 'utf-8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const match = /'(\d+)';/.exec(data)[0];
  const version = match.substring(1, match.length - 2);

  var newFile = data.replace(/'\d+';/, `'${parseInt(version) + 1}';`);
  fs.writeFileSync('src/utils/constants.ts', newFile);
});

// write file from root diretory
fs.writeFileSync('app.json', JSON.stringify(config, null, 2));
fs.writeFileSync('eas.json', JSON.stringify(easConfig, null, 2));
