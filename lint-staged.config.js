/*eslint-env node*/

const config = {
  '*.ts': ['tslint', 'prettier --write', 'git add'],
  'src/**/*.{css,scss}': ['stylelint', 'prettier --write', 'git add'],
  '*.md': ['prettier --write', 'git add'],
}

module.exports = config
