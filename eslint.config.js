import antfu from '@antfu/eslint-config'

export default antfu(
  {
    svelte: true,
  },
  {
    rules: {
      'svelte/html-quotes': [2, {
        prefer: 'double',
        dynamic: {
          quoted: false,
          avoidInvalidUnquotedInHTML: false,
        },
      }],
      'style/space-before-function-paren': [
        2,
        {
          anonymous: 'always',
          named: 'always',
          asyncArrow: 'always',
        },
      ],

      'no-unused-vars': 0,
      'ts/no-unused-vars': [
        2,
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      'antfu/if-newline': 0,
      'prefer-const': 0,
    },
  },
)
