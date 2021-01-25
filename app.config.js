import 'dotenv/config'

export default {
  name: 'Репы',
  slug: 'turnips',
  version: '0.0.2',
  orientation: 'portrait',
  icon: './assets/repa.png',
  splash: {
    image: './assets/cover.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: [
    '**/*',
  ],
  ios: {
    bundleIdentifier: 'com.lookatonion.turnips',
    buildNumber: '1.0.3',
    supportsTablet: true,
  },
  android: {
    package: 'com.lookatonion.turnips',
    versionCode: 3,
    adaptiveIcon: {
      foregroundImage: './assets/repa.png',
      backgroundColor: '#FFFFFF',
    },
  },
  web: {
    favicon: './assets/favicon.png',
  },
  description: 'Pet project for acting lessons',
  githubUrl: 'https://github.com/traf333/turnip',
  extra: {
    apiUrl: process.env.API_URL,
  },
}
