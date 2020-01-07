const app = getApp()
const wxAuth = require('../../utils/wxAuth.js')
const wxLogin = require('../../utils/wxLogin.js')
import Connect from '../../service/address.js'

Page({

  data: {
    imgs: [{
      id: 1
    }, {
      id: 2
    }, {
      id: 3
    }, {
      id: 4
    }, {
      id: 5
    }],
    starId: 0,
    src1: '../../images/buitiful.png',
    src2: '../../images/noBuitiful.png',
    openid: null,
    userInfo: null,
    businessId: null,
    orderId: null
  },


  onLoad(options) {
    let data = app.globalData.commentOrder
    let businessId = data.business._id
    let orderId = data._id
    wx.getStorage({
      key: 'userInfo',
      success: res => {
        this.setData({
          openid: res.data.openid,
          userInfo: res.data.userInfo,
          businessId,
          orderId
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
            url: '../login/login'
          })
        });
      }
    })
  },


  onShow() {

  },

  //选择评分
  select(e) {
    const {
      starId
    } = this.data
    let index = e.currentTarget.dataset.index;
    this.setData({
      starId: index
    })
  },

  //提交评论
  bindFormSubmit(e) {
    let comment = e.detail.value.comment
    console.log(comment)
  },


})