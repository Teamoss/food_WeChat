const app = getApp()
import Connect from '../../service/address.js'

Page({

  data: {
    searchValue: null,
    businesList: [],
    pageSize: 8,
    pageNo: 1,
    noMore: false,
    loadingMore: false
  },


  onLoad(options) {

  },


  onShow() {

  },

  bindKeyInput(e) {
    this.setData({
      searchValue: e.detail.value
    })
  },

  //搜索
  search() {
    const {
      searchValue,
      pageNo,
      pageSize
    } = this.data
    let cityKey = app.globalData.cityKey
    if (searchValue) {
      wx.request({
        url: Connect.searchBusiness,
        method: 'POST',
        data: {
          pageSize: 8,
          pageNo: 1,
          key: searchValue,
          cityKey
        },
        success: res => {
          console.log(res)
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
    } else {
      wx.showToast({
        title: '请输入搜索商家',
        icon: 'none'
      })
    }
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