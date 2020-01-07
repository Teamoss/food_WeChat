const app = getApp()
import Connect from '../../../service/address.js'
const wxAuth = require('../../../utils/wxAuth.js')
const wxLogin = require('../../../utils/wxLogin.js')

Page({
  data: {
    openid: null,
    orderList: [],
    pageSize: 8,
    pageNo: 1,
    noMore: false,
    loadingMore: false
  },

  onShow() {
    this.getOrderList()
  },

  //加载订单数据
  getOrderList() {
    const {
      pageSize,
      pageNo
    } = this.data
    wx.getStorage({
      key: 'userInfo',
      success: res => {
        let openid = res.data.openid
        wx.request({
          url: Connect.findAllOrder,
          method: 'POST',
          data: {
            openid,
            pageSize: 8,
            pageNo: 1,
          },
          success: res => {
            let orderList = res.data.data
            orderList.length > 0 && orderList.forEach(item => {
              item['food'] = JSON.parse(item.food)
            })
            let total = res.data.total
            let page = Math.ceil(total / pageSize)
            let flag = page <= pageNo ? true : false
            this.setData({
              orderList,
              noMore: flag,
              pageNo: flag ? 1 : this.data.pageNo + 1
            })
          },
          fail: err => {
            console.log(err);
          }
        })
        this.setData({
          openid
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

  //加载更多
  loadingMoreData() {
    const {
      pageSize,
      pageNo,
      loadingMore,
      openid
    } = this.data
    wx.request({
      url: Connect.findAllOrder,
      method: 'POST',
      data: {
        pageSize,
        pageNo,
        openid
      },
      success: res => {
        let orderList = res.data.data
        orderList.length > 0 && orderList.forEach(item => {
          item['food'] = JSON.parse(item.food)
        })
        let total = res.data.total
        let page = Math.ceil(total / pageSize)
        let flag = page <= pageNo ? true : false
        this.setData({
          orderList: this.data.orderList.concat(orderList),
          noMore: flag,
          pageNo: flag ? this.data.pageNo : this.data.pageNo + 1,
          loadingMore: false
        })
      },
      fail: err => {
        console.log(err);
      }
    })
  },

  //滑到最底部加载更多
  scrolltolower() {
    const {
      noMore,
      loadingMore
    } = this.data
    if (noMore) return null
    this.setData({
      loadingMore: true
    })
    this.loadingMoreData()
  },

  scroll(e) {

  },


  //去评价
  toComment(e) {
    let item = e.currentTarget.dataset.item
    app.globalData.commentOrder = item;
    wx.navigateTo({
      url: '../../comment/comment'
    })
  },

  //已评价
  isComment(e) {
    let item = e.currentTarget.dataset.item
  },

  //确认收货
  finishOrder(e) {
    let item = e.currentTarget.dataset.item
  }

})