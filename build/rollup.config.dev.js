process.env.NODE_ENV = 'development';
const serve = require('rollup-plugin-serve');
const configList = require('./rollup.config');
const path = require('path');
const resolveFile = function(filePath) {
  return path.join(__dirname, '..', filePath)
}

const PORT = 3000;
const devSite = `http://127.0.0.1:${PORT}`;
const devUrl = `${devSite}/example/index.html`;

setTimeout(()=>{
  console.log(`[dev]: ${devUrl}`)
}, 1000);
configList.map((config, index) => {
  if( index === 0 ) {
    config.plugins = [
      ...config.plugins,
      ...[
        serve({
          port: PORT,
          contentBase: [resolveFile('')]
        })
      ]
    ]
  }
  return config;
})
module.exports = configList;
