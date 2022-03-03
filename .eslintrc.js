module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  env: {
    browser: true,
    es6: true,
    'react-native/react-native': true,
    jest: true,
  },
  settings: {
    react: {
      createClass: 'createReactClass',
      pragma: 'React',
      fragment: 'Fragment',
      version: 'detect',
      flowVersion: '0.53',
    },
    propWrapperFunctions: [
      'forbidExtraProps',
      {
        property: 'freeze',
        object: 'Object',
      },
    ],
    linkComponents: [
      'Hyperlink',
      {
        name: 'Link',
        linkAttribute: 'to',
      },
    ],
  },
  rules: {
    'no-duplicate-imports': 'error',
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
    'object-curly-newline': 'off',
    'implicit-arrow-linebreak': 'off',
    'comma-dangle': 'off',
    'no-template-curly-in-string': 'error',
    'no-console': 'error',

    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'react-native',
            importNames: ['Text', 'TextInput', 'Alert'],
          },
          {
            name: '@ui-kitten/components',
            importNames: ['Icon', 'Button'],
            message: 'use base components',
          },
          { name: 'expo-constants', message: 'Use MyConstants' },
        ],
      },
    ],

    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-use-before-define': 'off',

    'import/no-unresolved': 'off',
    'import/order': 'off',
    'import/extensions': 'off',
    'import/namespace': 'off',

    'react/display-name': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'react/jsx-curly-brace-presence': ['error', 'never'],
    'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
    'react/jsx-pascal-case': ['error'],
    'react/prop-types': 'off',
    'react/no-unused-prop-types': 2,

    // Until https://github.com/Intellicode/eslint-plugin-react-native/issues/270 is resolved
    'react-native/no-raw-text': 'off',
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 2,

    'filenames/match-exported': 2,
  },
  plugins: [
    'react',
    'react-native',
    '@typescript-eslint',
    'filenames',
    'restrict-imports',
    'import',
  ],
  ignorePatterns: ['/**/*.d.ts', 'e2e/**', 'web-build/**'],
};
