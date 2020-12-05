module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'airbnb-base',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
  ],
  rules: {
    'linebreak-style': 0,
    'import/prefer-default-export': 0,
    'prettier/prettier': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'no-underscore-dangle': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      alias: {
        map: [
          ['@api', './src/api'],
          ['@auth', './src/auth'],
          ['@config', './src/config'],
          ['@models', './src/models'],
          ['@util', './src/util'],
          ['@', './src'],
        ],
      },
    },
  },
};
