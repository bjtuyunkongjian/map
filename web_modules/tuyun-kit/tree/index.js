import React, { Component } from 'react';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { FaRegLaughBeam, FaRegMeh, FaRegSadCry } from 'react-icons/fa';
import { IsEmpty } from 'tuyun-utils';

export default class TuyunTree extends Component {
  state = {
    treeData: JSON.parse(JSON.stringify(treeData)),
    selectedVal: null,
    preSelectedVal: null
  };

  static defaultProps = {
    treeData: [],
    childKey: defChildKey, // 为了防止与传输的树形结构对象 key 冲突
    labelKey: defLabelKey,
    valueKey: defValueKey,
    visibleKey: defVisibleKey,
    childVisibleKey: defChildVisibleKey,
    onSelect: () => {}
  };

  componentWillReceiveProps(nextProps) {
    const { treeData } = nextProps;
    this.setState({ treeData: JSON.parse(JSON.stringify(treeData)) });
  }

  render() {
    return <div className="ReactTree__Container">{this._createTree()}</div>;
  }

  _createTree = () => {
    const { selectedVal, treeData, preSelectedVal } = this.state;
    const {
      childKey = defChildKey,
      labelKey = defLabelKey,
      valueKey = defValueKey,
      visibleKey = defVisibleKey,
      childVisibleKey = defChildVisibleKey
    } = this.props; // 子类的一些树结构
    // 迭代生成树
    const createTreeEl = (arrData, isChildren) => {
      const _elArr = [];
      for (let item of arrData) {
        // 标签
        const _selected = item === selectedVal;
        const _preSelected = item === preSelectedVal;
        const _hidden = isChildren && !item[visibleKey];
        const _clsName = `ReactTree__LeafLabel${_hidden ? ' hidden' : ' show'}`;
        const _elItem = _hidden ? null : (
          <ul key={`el_tree_label_${item[valueKey]}`} className={_clsName}>
            <li className="ReactTree__LabelIcon">
              {!IsEmpty(item[childKey]) ? (
                item[childVisibleKey] ? (
                  <IoIosArrowDown onClick={() => this._hideChildEl(item)} />
                ) : (
                  <IoIosArrowForward onClick={() => this._showChildEl(item)} />
                )
              ) : _selected ? (
                <FaRegLaughBeam onClick={() => this._selectNode(item)} />
              ) : _preSelected ? (
                <FaRegSadCry onClick={() => this._selectNode(item)} />
              ) : (
                <FaRegMeh onClick={() => this._selectNode(item)} />
              )}
            </li>
            <li
              className={`ReactTree__LabelText${
                _selected ? ' ReactTree__Selected' : ''
              }`}
              onClick={() => this._selectNode(item)}
            >
              {item[labelKey]}
            </li>
          </ul>
        );
        _elArr.push(_elItem);
        // 子节点
        const _children = item[childKey];
        if (!IsEmpty(_children)) {
          const _childrenEl = createTreeEl(_children, true); // 子节点对应的html元素，传参数true表示是子节点
          for (let elIndex = 0; elIndex < _childrenEl.length; elIndex++) {
            const elItem = _childrenEl[elIndex];
            _elArr.push(
              <div key={`el_tree_${elIndex}`} className="ReactTree__LeafNode">
                {elItem}
              </div>
            );
          }
        }
      }
      return _elArr;
    };
    // 返回
    return createTreeEl(treeData);
  };

  _showChildEl = item => {
    const { treeData } = this.state;
    const {
      childKey = defChildKey,
      visibleKey = defVisibleKey,
      childVisibleKey = defChildVisibleKey
    } = this.props;
    item[childVisibleKey] = true; // 标志子节点已展开
    for (let child of item[childKey]) {
      child[visibleKey] = true;
    } // 显示下一层子节点
    this.setState({ treeData }); // 刷新数据
  };

  _hideChildEl = item => {
    const { treeData } = this.state;
    const {
      childKey = defChildKey,
      visibleKey = defVisibleKey,
      childVisibleKey = defChildVisibleKey
    } = this.props;
    item[childVisibleKey] = false; // 标志子节点已隐藏
    // 递归隐藏子节点
    const _hideAllNode = arrData => {
      for (let dataItem of arrData) {
        dataItem[visibleKey] = false; // 隐藏该节点
        const _children = dataItem[childKey]; // 子元素
        if (IsEmpty(_children)) continue; // 如果没有子元素，进入下一次循环
        dataItem[childVisibleKey] = false; // 标志子节点已经隐藏
        _hideAllNode(_children); // 递归
      }
    };
    // 隐藏所有子节点
    _hideAllNode(item[childKey]);
    this.setState({ treeData });
  };

  _selectNode = item => {
    const { selectedVal } = this.state;
    if (selectedVal === item) return;
    const {
      onSelect = () => {},
      labelKey = defLabelKey,
      valueKey = defValueKey
    } = this.props;
    this.setState({ selectedVal: item, preSelectedVal: selectedVal });
    onSelect({ label: item[labelKey], value: item[valueKey] });
  };
}

// 为了防止与传输的树形结构对象 key 冲突
const defChildKey = 'children';
const defLabelKey = 'label';
const defValueKey = 'value';
const defVisibleKey = 'visible';
const defChildVisibleKey = 'childVisible';

const treeData = [
  {
    label: '第0个',
    value: 0,
    children: [
      {
        label: '第0个',
        value: 0,
        children: [
          { label: '第0个', value: 0, children: [] },
          { label: '第1个', value: 1, children: [] },
          { label: '第2个', value: 2, children: [] },
          { label: '第3个', value: 3, children: [] }
        ]
      },
      { label: '第1个', value: 1, children: [] },
      {
        label: '第2个',
        value: 2,
        children: [
          { label: '第0个', value: 0, children: [] },
          {
            label: '第1个',
            value: 1,
            children: [
              { label: '第0个', value: 0, children: [] },
              { label: '第1个', value: 1, children: [] },
              { label: '第2个', value: 2, children: [] }
            ]
          },
          {
            label: '第2个',
            value: 2,
            children: [
              { label: '第0个', value: 0, children: [] },
              {
                label: '第1个',
                value: 1,
                children: [
                  {
                    label: '第0个',
                    value: 0,
                    children: [
                      {
                        label: '第0个',
                        value: 0,
                        children: [
                          {
                            label: '第0个',
                            value: 0,
                            children: [
                              { label: '第0个', value: 0, children: [] }
                            ]
                          },
                          { label: '第1个', value: 1, children: [] }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];
