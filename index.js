import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
const compat = new FlatCompat({
  allConfig: js.configs.all,
  recommendedConfig: js.configs.recommended,
})

export default [
  ...compat.plugins(
    '@typescript-eslint',
    'eslint-comments',
    'import',
    'simple-import-sort',
    'sonarjs',
    'unicorn'
  ),
  ...compat.extends(
    'eslint:all',
    'plugin:@typescript-eslint/all',
    'plugin:eslint-comments/recommended',
    'plugin:import/errors',
    'plugin:import/typescript',
    'plugin:import/warnings',
    'plugin:sonarjs/recommended',
    'plugin:unicorn/all',
    'prettier'
  ),
  {
    files: ['**/*.js', '**/*.ts'],
    rules: {
      // セミコロン無し
      '@typescript-eslint/semi': 'off',

      // type N = number のような単純なタイプ宣言を禁止
      '@typescript-eslint/no-type-alias': [
        'error',
        {
          // ただし、タプル、ユニオン、交差、条件、マップ、ジェネリクス型は許可
          allowTupleTypes: 'always',
          allowAliases: 'in-unions-and-intersections',
          allowConditionalTypes: 'always',
          allowMappedTypes: 'always',
          allowGenerics: 'always',
        },
      ],

      // マジックナンバーの使用許可
      // str.at(-1) とかができなくなるのは困るので一律許可。本当は `allowNums: [-1, 0, 1]` とかやりたいけど
      '@typescript-eslint/no-magic-numbers': 'off',

      // 関数の定義について、関数式と関数宣言のどちらも許可
      'func-style': 'off',

      // ブロックの中身の最初/最後の行の空行禁止
      'padded-blocks': ['error', 'never'],

      // new Promise の第一引数の関数で値を返すことを許可
      // アロー関数を使ってもエラーに引っかからないように
      'no-promise-executor-return': 'off',

      // シングルクォート以外は禁止
      '@typescript-eslint/quotes': ['error', 'single'],

      // var, let, const をまとめての宣言禁止
      'one-var': ['error', 'never'],

      // 長すぎる行禁止
      'max-len': [
        'error',
        {
          // ただし、`// eslint-disable` 系のコメントは上限無視
          ignorePattern: '^\\s*// eslint-disable',
        },
      ],

      // undefined の使用を許可
      'no-undefined': 'off',

      // boolean 型以外の値を条件に使うことを許可
      '@typescript-eslint/strict-boolean-expressions': 'off',

      // コメントの頭文字は大文字小文字どちらも許可
      'capitalized-comments': 'off',

      // 識別子の頭のアンダーバーを許可
      'no-underscore-dangle': 'off',

      // タイプの名前の先頭のアンダーバーを許可
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'typeLike',
          format: ['PascalCase'],
          leadingUnderscore: 'allow',
        },
      ],

      // オブジェクトのプロパティをアルファベット順にソート
      'sort-keys': [
        'error',
        'asc',
        {
          // ただし、空行がグルーピングが可能
          allowLineSeparatedGroups: true,
        },
      ],

      // 行数が多すぎるファイル禁止
      'max-lines': [
        'error',
        {
          // 空行とコメントはカウントしない
          skipBlankLines: true,
          skipComments: true,
        },
      ],

      // 関数の行数の上限無し
      'max-lines-per-function': 'off',

      // インクリメント/デクリメント演算子を許可
      'no-plusplus': 'off',

      // 識別子の略語を許可
      'unicorn/prevent-abbreviations': 'off',

      // 短い識別子を許可
      'id-length': 'off',

      // null の使用を許可
      'unicorn/no-null': 'off',

      // 関数のステートメント数の上限無し
      'max-statements': 'off',

      // ヨーダ記法は許可
      // 本当は数値比較の大なり小なりのときのみ許可したいがそのようなオプションがない
      'yoda': 'off',

      // 認知的複雑度は上限なし
      'sonarjs/cognitive-complexity': 'off',

      // Error クラス以外の throw を許可
      // 何故か Readonly<Error> が throw できないので仕方なく
      '@typescript-eslint/no-throw-literal': 'off',

      // 三項演算子の許可
      'no-ternary': 'off',

      // ネストした三項演算子は禁止
      'no-nested-ternary': 'error',

      // 下記は prettier に任せる
      // 関数の括弧の周りのスペースはどのような形でも OK
      '@typescript-eslint/space-before-function-paren': 'off',

      // 関数の返り値の型を明示しないことを許可
      '@typescript-eslint/explicit-function-return-type': 'off',

      // Array.prototype.reduce を許可
      'unicorn/no-array-reduce': 'off',

      // 三項演算子を使える場面で強制する機能の無効化
      'unicorn/prefer-ternary': 'off',

      // `if (cond) return foo; else return bar` のような必要ない else を許可
      'no-else-return': 'off',

      // 非プリミティブかつ非 readonly な型の引数を許可
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
    },
  },
  {
    // テストに関しては下記のルールを無効化
    files: ['**/*.test.js', '**/*.test.ts'],
    rules: {
      'eslint-comments/disable-enable-pair': 'off',
      '@typescript-eslint/no-magic-numbers': 'off',
      'id-length': 'off',
      'unicorn/consistent-function-scoping': 'off',
    },
  },
]
