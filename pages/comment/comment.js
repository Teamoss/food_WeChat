const app = getApp()
const wxAuth = require('../../utils/wxAuth.js')
const wxLogin = require('../../utils/wxLogin.js')
import Connect from '../../service/address.js'
import util from '../../utils/util.js'

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
    business: null,
    orderId: null
  },


  onLoad(options) {
    let data = app.globalData.commentOrder
    wx.getStorage({
      key: 'userInfo',
      success: res => {
        this.setData({
          openid: res.data.openid,
          userInfo: res.data.userInfo,
          business: data.business,
          orderId: data._id
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
    const {
      starId,
      openid,
      userInfo,
      business,
      orderId
    } = this.data
    let comment = e.detail.value.comment
    let commentTime = util.formatTime(new Date())

    if (starId == 0) {
      wx.showToast({
        title: '请选择评分',
        icon: 'none'
      })
      return
    }
    if (!comment) {
      wx.showToast({
        title: '评论不能为空',
        icon: 'none'
      })
      return
    }
    wx.request({
      url: Connect.addComment,
      method: 'POST',
      data: {
        score: starId,
        openid,
        userInfo,
        business: business._id,
        order: orderId,
        comment,
        commentTime
      },
      success: res => {
        console.log(res)
        if (res.data.code === 2000) {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
          wx.switchTab({
            url: '/pages/order/list/list'
          })
        }
      },
      fail: err => {
        wx.showToast({
          title: '服务器繁忙，请稍后重试',
          icon: 'none'
        })
      }
    })
  },


})