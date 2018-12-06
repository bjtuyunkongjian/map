const msgContainer = document.createElement('div');
msgContainer.className = 'ReactTips__Container';
document.body.appendChild(msgContainer);

function create(type) {
  return (msg, opt = {}) => {
    const { duration = 3000 } = opt;
    const _msgItemDom = document.createElement('div');
    _msgItemDom.className = type ? type : 'show';
    const _msgInfo = document.createElement('span');
    _msgInfo.innerText = msg;
    _msgItemDom.appendChild(_msgInfo);

    if (msgContainer.children[0]) {
      msgContainer.insertBefore(_msgItemDom, msgContainer.children[0]);
    } else {
      msgContainer.appendChild(_msgItemDom);
    }
    setTimeout(() => {
      msgContainer.removeChild(_msgItemDom);
    }, duration);
  };
}

export default {
  show: create(),
  success: create('success'),
  info: create('info'),
  warning: create('warning'),
  error: create('error')
};
