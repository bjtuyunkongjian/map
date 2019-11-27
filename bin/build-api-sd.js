#!/usr/bin/env node

const fs = require('fs');
const shell = require('shelljs');
const path = require('path');

const city = 'sd';

function main() {
  const { code } = shell.exec(
    `rm -rf ./build-api-${city}/ty-map* && webpack --config webpack.config.api.prod.${city}.babel.js --mode production  && webpack --config webpack.config.api.dev.${city}.babel.js --mode production`
  );

  if (code !== 0) {
    shell.echo('\033[31m 打包失败 \033[0m ');
    return;
  }
  shell.echo('\033[36m 打包成功 \033[0m ');
  // 修改文件
  const PackageJson = fs.readFileSync('./package.json', 'utf-8');

  const { version } = JSON.parse(PackageJson.toString('utf-8'));

  for (let item of ['development', 'production']) {
    const filepath = path.resolve(
      __dirname,
      `../build-api-${city}/ty-map-${item}.${version}.js`
    );
    fs.readFile(filepath, (err, data) => readFunc(err, data, filepath));
  }

  function readFunc(err, data, filepath) {
    if (err) {
      return console.error(err);
    }
    const dataStr = data.toString();
    fs.writeFile(
      filepath,
      dataStr
        .replace(/mapboxgl/g, 'tuyun')
        .replace(/mapbox/g, 'tuyun')
        .replace(
          `&&t.warnOnce('Vector tile source "'+o.source+'" layer "'+m+'" does not use vector tile spec v2 and therefore may have some rendering errors.')`,
          ''
        )
        .replace(
          '&&t.warnOnce("This page appears to be missing CSS declarations for Mapbox GL JS, which may cause the map to display incorrectly. Please ensure your page includes tuyun-gl.css, as described in https://www.tuyun.com/tuyun-gl-js/api/.")',
          ''
        ),
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
