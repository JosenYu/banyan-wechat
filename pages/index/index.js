//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util')

Page({
  data: {
    hasUserInfo: false,
    list: [{
      brand: "qq",
      model: "qq",
      name: "qq",
      surplusNumber: 99,
      unit: "只"
    }]
  },
  // handleContact(e) {
  //   console.log(e.detail.path)
  //   console.log(e.detail.query)
  // },
  searchfun(e) {
    let content = '';
    e ? context = e.detail.searchInput : content = ''
    util.request('/stock/queryCondition', 'get',
      {
        name: content,
        brand: content,
        model: content
      },
      (res) => {
        console.log(res);
        this.setData({
          list: res.data.doc
        })
      });
  },

  onLoad: function () {
    this.searchfun();
  },

})
