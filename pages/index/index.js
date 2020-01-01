const app = getApp()
const wxAuth = require('../../utils/wxAuth.js')
const wxLogin = require('../../utils/wxLogin.js');
import Connect from '../../service/address.js'

Page({

  data: {
    businesList: [],
    pageSize: 8,
    pageNo: 1,
    noMore: false,
    loadingMore: false
  },

  onLoad() {

  },

  onShow() {
    this.loadingInfo()
    this.loadingData()
  },

  onUnload() {

  },

  //加载数据
  loadingData() {
    const {
      pageSize,
      pageNo
    } = this.data
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
        let page = Math.ceil(total / pageSize)
        let flag = page <= pageNo ? true : false
        this.setData({
          businesList,
          noMore: flag,
          pageNo: flag ? 1 : this.data.pageNo + 1
        })
      },
      fail: err => {
        console.log(err);
      }
    })
  },

  //加载更多数据
  loadingMoreData() {
    const {
      pageSize,
      pageNo,
      loadingMore
    } = this.data
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
        let page = Math.ceil(total / pageSize)
        let flag = page <= pageNo ? true : false
        this.setData({
          businesList: this.data.businesList.concat(businesList),
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


  //加载缓存用户信息
  loadingInfo() {
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

  //点击列表跳转到商家详细页面
  toBusiness(e) {
    let business = e.currentTarget.dataset.item
    let detail = JSON.stringify(business)
    wx.navigateTo({
      url: '/pages/business/business?detail=' + detail,
    })
  },



})