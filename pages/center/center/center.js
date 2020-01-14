const app = getApp()
const wxAuth = require('../../../utils/wxAuth.js')
const wxLogin = require('../../../utils/wxLogin.js')

Page({
  data: {
    userInfo: null
  },
  onLoad(options) {

  },
  onShow() {
    this.loadingInfo()
  },

 //订单页
  toOrderList(){
    wx.switchTab({
      url: '/pages/order/list/list'
    })
  },

  //收藏页
  collection(){
    wx.navigateTo({
      url: '../../collection/collection'
    })
  },

  //加载缓存用户信息
  loadingInfo() {
    wx.getStorage({
      key: 'userInfo',
      success: res => {
        this.setData({
          userInfo: res.data.userInfo
        })
      },
      fail: err => {
        wxAuth(() => {
          wxLogin((data) => {
            wx.setStorage({
              key: 'userInfo',
              data: data,
            })
          })
        }, () => {
          wx.navigateTo({
            url: '../../login/login'
          })
        });
      }
    })
  },

})