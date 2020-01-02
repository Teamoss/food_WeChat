const app = getApp()

Page({
  data: {
    userInfo: null
  },
  onLoad(options) {

  },
  onShow() {
    this.loadingInfo()
  },

  //加载缓存用户信息
  loadingInfo() {
    wx.getStorage({
      key: 'userInfo',
      success: res => {
        this.setData({
          userInfo: res.data.userInfo
        })
      }
    })
  },

})