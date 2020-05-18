// pages/my/my.js
//获取应用实例
const app = getApp();
const utils = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      avatarUrl: "",
      company: '11',
      linkman: '',
      tel: null,
      address: ''
    },
    // 是否授权
    hasUserInfo: false,
    // 修改信息
    changeBox: {
      visible: false,
      title: '公司',
    }
  },
  bindInput({ detail, currentTarget }) {
    const type = currentTarget.dataset.type
    const setLabel = `userInfo.${type}`
    
    switch (type) {
      case "company":
        this.setData({
          [setLabel]: detail.value
        })
        break;
      case "tel":
        const tel = Number(detail.value) ? Number(detail.value) : 0
        this.setData({
          [setLabel]: tel
        })
        break;
      case "address":
        this.setData({
          [setLabel]: detail.value
        })
        break;
    }
  },

  // 修改用户信息
  changeVisible(event) {
    wx.hideTabBar();
    // console.log(event.currentTarget.dataset.type);
    this.setData({
      changeBox: {
        visible: true
      }
    })
  },
  back() {
    wx.showTabBar();
    this.setData({
      changeBox: {
        visible: false
      }
    })
  },

  // 获取用户信息
  getUserInfo(e) {
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: {
        avatarUrl: e.detail.userInfo.avatarUrl,
        linkman: e.detail.userInfo.nickName,
      },
      hasUserInfo: true
    })
  },
  // 创建成为用户
  createExporter() {
    // console.log(this.data.userInfo);
    utils.request('/customer/createExporter', 'post', this.data.userInfo, (res) => {
      app.globalData.userInfo = Object.assign(app.globalData.userInfo, this.data.userInfo)
      if (res.data.doc) {
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
        wx.setStorage({
          data: res.data.doc.tel,
          key: 'tel',
        })
      } else {
        wx.showToast({
          title: '已经存在相同手机号',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        // 判断是否能获取用户信息
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给台解码出 unionId
              app.globalData.userInfo = res.userInfo
              this.setData({
                userInfo: Object.assign(this.data.userInfo, { avatarUrl: res.userInfo.avatarUrl, linkman: res.userInfo.nickName }),
                hasUserInfo: true,
              });
              console.log(this.data);
            }
          })
        }
      }
    })
    var tel = wx.getStorageSync('tel')
    utils.request('/customer/getExporterByTel', 'get', { tel: tel }, (res) => {
      this.setData({
        userInfo: Object.assign(this.data.userInfo, {
          company: res.data.doc.company,
          linkman: res.data.doc.linkman,
          address: res.data.doc.address,
          tel: res.data.doc.tel,
        })
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})