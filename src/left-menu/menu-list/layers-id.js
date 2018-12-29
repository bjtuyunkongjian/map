export default {
  workContent: {
    source: 'dailySource',
    layers: [
      { layer: 'taskLst', iconImg: 'EF9DA1' },
      { layer: 'cluesLst', iconImg: '9B5C8B' },
      { layer: 'casesLstt', iconImg: '3886CC' },
      { layer: 'residenceLst', iconImg: 'FAF575' },
      { layer: 'immigrationLst', iconImg: 'EECE98' },
      { layer: 'helpLst', iconImg: '8AC89A' },
      { layer: 'publicPreLst', iconImg: '837EB4' }
    ]
  },
  policeData: {
    source: 'populationSource',
    layer: 'populationLayer'
  },
  camera: {
    source: 'cameraSource',
    layer: 'cameraLayer'
  },
  callPolice: {
    source: 'callpoliceSource',
    layer: 'callpoliceLayer'
  }
};
