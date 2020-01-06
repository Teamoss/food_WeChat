// pages/cashSuccess/cashSuccess.js
Page({
  data: {
    order: null,
    money: null
  },

  onLoad(options) {
    let orderInfo = JSON.parse(options.orderInfo)
    this.setData({
      order: orderInfo.id,
      money: orderInfo.sumMoney
    })
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