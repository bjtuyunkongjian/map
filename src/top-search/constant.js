// 搜索分类
const SearchValue = {
  base: 'base',
  polygon: 'polygon'
};

const DefaultSearch = SearchValue.base;

// 搜索列表
const SearchArr = [
  { label: '输入搜索', value: SearchValue.base },
  { label: '地图搜索', value: SearchValue.polygon }
];

const DropDown = {
  cityList: 'city-list',
  seearchList: 'search-list'
};

export { DefaultSearch, SearchValue, SearchArr, DropDown };
