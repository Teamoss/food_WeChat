// pages/cashSuccess/cashSuccess.js
Page({
  data: {

  },

  onLoad(options) {
    let orderInfo = JSON.parse(options.orderInfo)
    console.log(orderInfo)
  },

  onShow() {

  },

  //回到首页
  goIndex() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  }
})