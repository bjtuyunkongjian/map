import { Emitter } from 'tuyun-utils';

export default new Emitter(); // Event

// 事件名称
const EventName = {
  changeTotalTime: 'change:totalTime',
  changeExpiredTime: 'change:expiredTime',
  togglePlay: 'toggle:play',
  changeSettingsSpeed: 'change:settingsSpeed'
};

export { EventName };
