import Connect from '../../../service/address.js'
const wxAuth = require('../../../utils/wxAuth.js')
const wxLogin = require('../../../utils/wxLogin.js')
const app = getApp()

Page({
  data: {
    noAdress: false,
    addressList: []
  },

  onLoad(options) {

  },

  onShow() {
    wx.getStorage({
      key: 'userInfo',
      success: res => {
        let id = res.data.openid
        this.getAdressList(id)
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

  //加载地址列表
  getAdressList(id) {
    wx.request({
      url: Connect.getUserAddress,
      method: 'POST',
      data: {
        id
      },
      success: res => {
        let addressList = res.data.data
        if (addressList.length == 0) {
          this.setData({
            noAdress: true
          })
        } else {
          this.setData({
            addressList
          })
        }
      },
      fail: err => {
        console.log(err);
      }
    })
  },

  addAddr() {
    wx.redirectTo({
      url: '../add/add'
    })
  },
  updateAddr(e) {
    let data = e.currentTarget.dataset.info;
    app.globalData.updateAddr = data;
    wx.navigateTo({
      url: '../update/update'
    })
  },



})