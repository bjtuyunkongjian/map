// 搜索分类
const SearchValue = {
  base: 'base',
  polygon: 'polygon'
};

const DefaultSearch = SearchValue.base;

// 搜索列表
const SearchArr = [
  { label: '文字转地址', value: SearchValue.base },
  { label: '地址转文字', value: SearchValue.polygon }
];

export { DefaultSearch, SearchValue, SearchArr };
