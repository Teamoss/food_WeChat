const app = getApp()
const wxAuth = require('../../utils/wxAuth.js')
const wxLogin = require('../../utils/wxLogin.js');
import Connect from '../../service/address.js'

Page({

  data: {
    businesList: [],
    pageSize: 8,
    pageNo: 1,
    total: null
  },

  onLoad() {

  },

  onShow() {
    this.loadingInfo()
    this.loadingData()
  },

  //加载数据
  loadingData() {
    const { pageSize, pageNo } = this.data
    wx.request({
      url: Connect.findAllBusiness,
      method: 'POST',
      data: {
        pageSize,
        pageNo
      },
      success: res => {
        let businesList = res.data.data
        let total = res.data.total
        console.log(businesList);
        this.setData({
          businesList,
          total
        })
      },
      fail: err => {
        console.log(err);
      }
    })
  },

  //加载更多数据
  loadingMoreData() {

  },

  //加载缓存用户信息
  loadingInfo() {
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        console.log('res', res)
      },
      fail: function (err) {
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

  scroll(e) {
    // console.log(e)
  },


  //滑到最底部加载更多
  scrolltolower() {
    // wx.showLoading({
    //   title: '加载更多~~~',
    //   mask: true,
    // });
  }


})