const app = getApp()
import Connect from '../../../service/address.js'

import util from '../../../utils/util.js'

Page({

  data: {
    business: null,
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
    src1: '../../../images/buitiful.png',
    src2: '../../../images/noBuitiful.png',
    comment: null,
    commentId: null,
    oldscore:null
  },

  onLoad(options) {

    let data = app.globalData.commentOrder
    let orderId = data._id
    this.setData({
      business: data.business
    })
    this.getComment(orderId)
  },


  onShow() {

  },

  //获取评论内容
  getComment(id) {
    wx.request({
      url: Connect.findComment,
      method: 'POST',
      data: {
        id
      },
      success: res => {
        if (res.data && res.data.code === 2000) {
          let data = res.data.data
          this.setData({
            starId: data.score,
            oldscore: data.score,
            comment: data.comment,
            commentId: data._id
          })
        }

      },
      fail: err => {
        console.log(err)

      }
    })
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

  //修改评论
  bindFormSubmit(e) {

    const {
      starId,
      commentId,
      business,
      oldscore
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
      url: Connect.editComment,
      method: 'POST',
      data: {
        score: starId,
        oldscore,
        commentId,
        comment,
        commentTime,
        business: business._id
      },
      success: res => {
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