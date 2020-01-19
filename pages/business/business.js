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
    id: null,
    isCollection: false,
    openid:null
  },

  onLoad(options) {
    let detail = JSON.parse(options.detail)
    this.setData({
      detail,
      id: detail._id
    })
    this.loadingGoodList(detail._id)
    this.getDetailBusiness(detail._id)
    wx.getStorage({
      key: 'userInfo',
      success: res => {
        let openid = res.data.openid
        this.setData({
          openid
        })
        this.collection(detail._id, openid)
      },
    })
  },

  

  //刷新商家信息
  getDetailBusiness(id){
    wx.request({
      url: Connect.getDetailBusiness,
      method: 'POST',
      data: {
        userID: id
      },
      success: res => {
        if(res.data && res.data.code ===2000){
          let detail = res.data.userInfo
          let addr = ''
          detail.city.forEach(item=>{
            addr += item
          })
          detail.address = detail.address ? addr + detail.address: addr
           this.setData({
             detail
           })
        }
      }
    })
  },



  //添加取消收藏
  changeCollection() {
    const {
      id, openid, isCollection
    } = this.data
    if (!isCollection){
       wx.request({
         url: Connect.addCollection,
         method:'POST',
         data:{
           openid,
           business: id
         },
         success:res=>{
          if(res.data&& res.data.code ===2000){
            wx.showToast({
              title: res.data.message,
              icon: 'success'
            })
            this.collection(id, openid)
          }
         }
       })
    }else {
      wx.request({
        url: Connect.deleteCollection,
        method: 'POST',
        data: {
          openid,
          business: id
        },
        success: res => {
          if (res.data && res.data.code === 2000) {
            wx.showToast({
              title: res.data.message,
              icon: 'success'
            })
            this.collection(id, openid)
          }
        }
      })
    }

  },

  //查询收藏状态
  collection(business, openid) {
    wx.request({
      url: Connect.collection,
      method: 'POST',
      data: {
        business,
        openid
      },
      success: res => {
        if (res.data && res.data.code === 2000) {
          this.setData({
            isCollection: true
          })
        } else {
          this.setData({
            isCollection: false
          })
        }
      }
    })
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
        arr.push(item)
      }
    })
    if (arr.length == 0) {
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
  },

  //查看评论
  getComment() {
    const {
      detail
    } = this.data
    let id = detail._id
    wx.navigateTo({
      url: './businessComment/businessComment?id=' + id,
    })
  }

})