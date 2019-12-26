const app = getApp()
const wxAuth = require('../../utils/wxAuth.js')
const wxLogin = require('../../utils/wxLogin.js');

Page({
  
  data: {

  },
  onLoad() {
   
  },
  onShow() {
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        console.log('res', res)
      },
      fail: function(err) {
        wxAuth(() => {
          wxLogin((data) => {
            wx.setStorage({
              key: 'userInfo',
              data: data,
            })
          })
        }, () => {
          wx.navigateTo({
            url: '../login/login'
          })
        });
      }
    })
  },
  
 
})