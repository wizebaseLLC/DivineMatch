module.exports = {
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    /*  project: './tsconfig.json', */
    tsconfigRootDir: __dirname,
  },
  rules: {
    'import/no-unresolved': 0,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.ts', '.tsx'],
      },
    ],
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'all',
        tabWidth: 2,
        semi: true,
        singleQuote: true,
        arrowParens: 'avoid',
        endOfLine: 'auto',
      },
    ],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'import/extensions': ['error', 'never'],
    'react/prop-types': 0,
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'react/jsx-props-no-spreading': 'off',
    'explicit-module-boundary-types': 'off',
    'react/require-default-props': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-console': 'off',
    'react/no-array-index-key': 'off',
    'global-require': 'off',
    'no-alert': 'off',
    'no-unused-expressions': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
  },
};

// eslint-disable-next-line spaced-comment
//TO INSTALL HUSKY, npx mrm lint-staged
