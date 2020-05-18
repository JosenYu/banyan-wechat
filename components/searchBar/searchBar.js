// components/searchBar/searchBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    searchInput: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    watchPassWord(e) {
      var searchInput = e.detail.value
      
      this.setData({
        searchInput: searchInput
      })
    },
    searchFun(e) {
      //  子组件传参给父组件

      this.triggerEvent('searchfun', { searchInput: this.data.searchInput });
    }
  }
})
