module.exports = {
  extends: ['eslint-config-airbnb'],
  env: {
      browser: true,
      es6: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
      ecmaVersion: 6,
      ecmaFeatures: {
          jsx: true,
          experimentalObjectRestSpread: true,
      },
  },
  plugins: ['react', 'babel'],
  rules: {
      'linebreak-style': 0,
      'no-param-reassign': 0,
      'prefer-rest-params': 0,
      'react/prefer-es6-class': 0,
      'react/no-multi-comp': 0,
      'react/sort-comp': 0,
      'react/prop-types': 0,
      'react/jsx-first-prop-new-line': 0,
      'import/no-unresolved': 0,
      'no-return-assign': 0,
      'no-redeclare': 0,
      'no-underscore-dangle': 0,
      'no-console': 0,
      'eol-last': 0,
      'global-require': 0,
      'max-len': 0,
      'consistent-return': 0,
      'func-names': 0,
      'arrow-body-style': 0,
      'no-plusplus': 0,
      'class-methods-use-this': 0,
      'no-else-return': 0,
      'comma-dangle': 0,
  }
};