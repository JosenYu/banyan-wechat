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
  handleContact(e) {
    console.log(e.detail.path)
    console.log(e.detail.query)
  },
  searchfun(e) {
    console.log(e.detail.searchInput);
    util.request('/stock/queryCondition', 'get', { name: e.detail.searchInput, brand: e.detail.searchInput, model: e.detail.searchInput }, (res) => {
      console.log(res);
      this.setData({
        list: res.data.doc
      })
    });
  },

  onLoad: function () {

  },

})
