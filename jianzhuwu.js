const fs = require('fs');

fs.readFile('./grespl.properties', readFunc);

function readFunc(err, data) {
  if (err) {
    return console.error(err);
  }
  const BuildingType = {};
  for (let item of data.toString().split('\n')) {
    if (!item.startsWith('#')) {
      const [key, value] = item.split('=');
      if (
        value !== '0' &&
        value !== '1' &&
        value !== '2' &&
        value !== '3' &&
        value !== '4'
      )
        continue;
      BuildingType[key] = value;
    }
  }

  fs.writeFile(
    './web_modules/tuyun-utils/building-type.js',
    'export default ' + JSON.stringify(BuildingType),
    writeFunc
  );
}

function writeFunc(err) {
  if (err) {
    return console.error(err);
  }
  console.log('数据写入成功！');
}
