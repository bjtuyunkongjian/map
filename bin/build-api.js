#!/usr/bin/env node

const fs = require('fs');
const shell = require('shelljs');
const path = require('path');

function main() {
  shell.exec(
    `rm -rf ./build-api/ty-map* && webpack --config webpack.config.api.prod.babel.js --mode production  && webpack --config webpack.config.api.dev.babel.js --mode production`
  );

  shell.echo('\033[36m 打包成功 \033[0m ');

  const PackageJson = fs.readFileSync('./package.json', 'utf-8');

  const { version } = JSON.parse(PackageJson.toString('utf-8'));

  for (let item of ['development', 'production']) {
    fs.readFile(
      path.resolve(__dirname, `../build-api/ty-map-${item}.${version}.js`),
      readFunc
    );
  }

  function readFunc(err, data) {
    if (err) {
      return console.error(err);
    }
    const dataStr = data.toString();
    fs.writeFile(
      './web_modules/tuyun-utils/building-type.js',
      dataStr.replace(/mapboxgl/g, 'tuyun').replace(/mapbox/g, 'tuyun'),
      writeFunc
    );
  }
  function writeFunc(err) {
    if (err) {
      return console.error(err);
    }
    shell.echo('\033[36m 数据写入成功 \033[0m ');
  }
}

main();
