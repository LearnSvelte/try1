/* eslint perfectionist/sort-objects: 2 */
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    svelte: true,
  },
  {
    rules: {
      'antfu/if-newline': 0,
      'prefer-const': 0,
      'style/object-curly-newline': [
        2,
        {
          ExportDeclaration: {
            minProperties: 2,
            multiline: true,
          },
        },
      ],
      'style/space-before-function-paren': [
        2,
        {
          anonymous: 'always',
          asyncArrow: 'always',
          named: 'always',
        },
      ],
    },
  },
  /* svelte */
  {
    rules: {
      'svelte/html-quotes': [2, {
        dynamic: {
          avoidInvalidUnquotedInHTML: false,
          quoted: false,
        },
        prefer: 'double',
      }],
    },
  },
  /* vanilla-ts pairs */
  {
    rules: {
      'no-unused-vars': 0,
      'ts/no-unused-vars': [
        2,
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
)
