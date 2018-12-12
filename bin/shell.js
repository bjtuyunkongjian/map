#!/usr/bin/env node

const Fs = require('fs');
const Shell = require('shelljs');
const Inquirer = require('inquirer');

const PackageJson = Fs.readFileSync('./package.json', 'utf-8');
const ConfigList = require('./config');

const { version, name } = JSON.parse(PackageJson.toString('utf-8'));

const serverList = ConfigList.map(item => item.server);

Inquirer.prompt({
  type: 'list',
  name: 'env_test',
  message: '请选择所需部署的服务器',
  choices: serverList
}).then(envAnswers => {
  const env_test = envAnswers['env_test'];
  let config;
  for (let item of ConfigList) {
    if (item.server === env_test) {
      config = item;
    }
  }
  if (!config || !config.url) {
    Shell.echo(`${env_test} 配置文件不对，请检查相应的配置文件`);
    return;
  }
  Shell.echo(
    `正在部署 ${name} 的 ${version} 版本到 ${config.server} 服务器...`
  );
  Shell.exec(`scp dist/* root@${config.server}:${config.url}`);
});
