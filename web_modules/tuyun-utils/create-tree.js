let startNum = 6;
export default (CreateTree = () => {
  const arr = [];
  for (let index = 0; index < Math.random() * startNum; index++) {
    let itemEl = { label: '第' + index + '个', value: index, children: [] };
    const hasChild = Math.random() > 0.5;
    if (hasChild) {
      itemEl.children = createTree();
    }
    arr.push(itemEl);
  }
  startNum--;
  return arr;
});
