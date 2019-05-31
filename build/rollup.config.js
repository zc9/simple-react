
const path = require('path');
const typescript2 = require('rollup-plugin-typescript2');
const { uglify } = require('rollup-plugin-uglify');
const isProd = process.env.NODE_ENV === 'production';
const resolveFile = function(filePath) {
  return path.join(__dirname, '..', filePath)
}
let configList = []
let inputFile =  resolveFile('src/index.ts');

configList.push({
  input: inputFile,
  output: {
    file: resolveFile('dist/simple-react.js'),
    format: 'umd',
    name: 'React',
    sourcemap: true
  },
  plugins: [
    typescript2()
  ]
})

if (isProd) {
  configList.push({
    input: inputFile,
    output: {
      file: resolveFile('dist/simple-react.min.js'),
      format: 'umd',
      name: 'React',
      sourcemap: false
    },
    plugins: [
      typescript2(),
      uglify()
    ]
  })
}

module.exports = configList;
