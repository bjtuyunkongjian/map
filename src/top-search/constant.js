// 搜索分类
const SearchValue = {
  geocode: 'geocode',
  geocodeReverse: 'geocodeReverse'
};

const DefaultSearch = SearchValue.geocode;

// 搜索列表
const SearchArr = [
  { label: '文字转地址', value: SearchValue.geocode },
  { label: '地址转文字', value: SearchValue.geocodeReverse }
];

export { DefaultSearch, SearchValue, SearchArr };
