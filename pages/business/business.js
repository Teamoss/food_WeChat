import Connect from '../../service/address.js'
const app = getApp()

Page({

  data: {
    detail: null,
    goodList: [],
    pageSize: 8,
    pageNo: 1,
    noMore: false,
    loadingMore: false,
    goodSum: 0,
    id: null
  },

  onLoad(options) {
    let detail = JSON.parse(options.detail)
    this.setData({
      detail,
      id: detail._id
    })
    this.loadingGoodList(detail._id)
  },


  onShow() {

  },

  //加载商家菜单
  loadingGoodList(id) {
    const {
      pageSize,
      pageNo
    } = this.data
    wx.request({
      url: Connect.findAllFood,
      method: 'POST',
      data: {
        business: id,
        pageSize,
        pageNo
      },
      success: res => {
        let goodList = res.data.data
        goodList.length != 0 && goodList.forEach(item => {
          item['number'] = 0
        })
        let total = res.data.total
        let page = Math.ceil(total / pageSize)
        let flag = page <= pageNo ? true : false
        this.setData({
          goodList,
          noMore: flag,
          pageNo: flag ? 1 : pageNo + 1
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
      loadingMore,
      id
    } = this.data
    wx.request({
      url: Connect.findAllFood,
      method: 'POST',
      data: {
        business: id,
        pageSize,
        pageNo
      },
      success: res => {
        let goodList = res.data.data
        goodList.length != 0 && goodList.forEach(item => {
          item['number'] = 0
        })
        let total = res.data.total
        let page = Math.ceil(total / pageSize)
        let flag = page <= pageNo ? true : false
        this.setData({
          goodList: this.data.goodList.concat(goodList),
          noMore: flag,
          pageNo: flag ? pageNo : pageNo + 1,
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

  //减少购买数量
  decrNumber(e) {
    const {
      goodList
    } = this.data
    let id = e.currentTarget.dataset.item._id
    let arr = goodList
    arr.forEach(item => {
      if (item._id == id) {
        if (item.number <= 0) return null
        item['number'] = item.number - 1
        this.setData({
          goodList: arr
        })
      }
    })
    let sum = 0
    arr.forEach(item => {
      sum += item.number
    })
    this.setData({
      goodSum: sum
    })
  },

  //增加购买数量
  increNumber(e) {
    const {
      goodList,
      id
    } = this.data
    let _id = e.currentTarget.dataset.item._id
    let arr = goodList
    arr.forEach(item => {
      if (item._id == _id) {
        item['number'] = item.number + 1
        this.setData({
          goodList: arr
        })
      }
    })
    let sum = 0
    arr.forEach(item => {
      sum += item.number
    })
    this.setData({
      goodSum: sum
    })
  },

  //去结算
  cashMoney() {
    const {
      goodList,
      id,
      detail
    } = this.data
    let arr = []
    let order = {}
    goodList.forEach(item => {
      if (item.number > 0) {
        arr.unshift(item)
      }
    })
    if (arr.length==0){
      wx.showToast({
        title: '请选择购买商品',
        icon: 'none'
      })
      return
    }
    order["data"] = arr
    order["business"] = detail
    app.globalData.order = order;
    wx.navigateTo({
      url: '../cash/cash'
    })
  }

})