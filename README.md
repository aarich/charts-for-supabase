<p align="center">
  <a href="https://apps.apple.com/app/apple-store/id1612680145?pt=117925864&ct=rm&mt=8" style="width: 100px; height: 100px; border-radius: 22%; overflow: hidden; display: inline-block; vertical-align: middle;">
    <img src="https://github.com/aarich/charts-for-supabase/raw/master/assets/images/icon512.png" width="100" heigth="100" alt="App Icon">
  </a>

  <h1 align="center">Charts</h1>
  <h4 align="center">An open source analytics client for Supabase Database</h4>
</p>

<div align="center">
  <a href="https://apps.apple.com/app/apple-store/id1612680145?pt=117925864&ct=readme&mt=8">
    <img alt="Download on the App Store" title="App Store" src="https://github.com/aarich/charts-for-supabase/raw/master/assets/images/downloadOnAppStore.png" width="150">
  </a>
  <a href="https://play.google.com/store/apps/details?id=rich.alex.charts">
    <img alt="Download on Google Play" title="Play Store" src="https://github.com/aarich/charts-for-supabase/raw/master/assets/images/getItOnGooglePlay.png" width="150">
  </a>
  </div>

<div align="center">

[![Built with Expo](https://img.shields.io/badge/Built%20with%20Expo-informational.svg?style=flat-square&logo=EXPO)](https://github.com/expo/expo)
[![Built with Supabase](https://img.shields.io/badge/Built%20with%20Supabase-informational.svg?style=flat-square&logo=SUPABASE)](https://supabase.com)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-informational.svg?style=flat-square)](https://github.com/aarich/charts-for-supabase/pulls)

</div>

<div align="center">
    <img alt="Screenshot 1" src="https://github.com/aarich/charts-for-supabase/raw/master/screenshots/12%20Home.png" width="30%">
    <img alt="Screenshot 2" src="https://github.com/aarich/charts-for-supabase/raw/master/screenshots/12%20Query.png" width="30%">
    <img alt="Screenshot 3" src="https://github.com/aarich/charts-for-supabase/raw/master/screenshots/12%20Edit.png" width="30%">
</div>

## About

Connect to your Supabase project using a public URL and key (and optionally as an authenticated user) then create a dashboard to monitor key metrics.

## Usage

1. Start a Supabase Project
   - See the [official docs](https://supabase.com/docs/guides/examples) for a list of great starting point ideas.
1. Get the App
   - [iOS App Store](https://apps.apple.com/app/apple-store/id1612680145?pt=117925864&ct=readme&mt=8)
   - [Google Play Store](https://play.google.com/store/apps/details?id=rich.alex.charts)
   - [Browser](https://charts.mrarich.com)
   - [Expo Go](https://expo.dev/@mrarich/sbcharts)
   - Locally (see next section)
1. Follow the [instructions in the app](https://charts.mrarich.com/help)

## Local Setup

Clone the repository

    git clone https://github.com/aarich/charts-for-supabase.git
    cd charts-for-supabase

Install dependencies with [NPM](https://docs.npmjs.com/cli/v8/commands/npm)

    npm install

Create a development client build

    make build-ios-native # OR build-android-native
    # Install in simulator/emulator

Start with [expo-cli](https://docs.expo.dev/workflow/expo-cli/)

    npx expo start --dev-client

## External Links

[Visit @mr_arich on Twitter](https://twitter.com/mr_arich)

[View on Product Hunt](https://www.producthunt.com/posts/charts-for-supabase)
