import Connect from '../../service/address.js'
const app = getApp()

Page({
  data: {
    showAdressList: false,
    addressList: [],
    address: null,
    time: null,
    orderList: [],
    business: null,
    sumMoney: null,
  },

  onLoad(options) {
    this.loadingOrder()
    this.setTime()
  },

  onShow() {
    wx.getStorage({
      key: 'userInfo',
      success: res => {
        let id = res.data.openid
        this.getAdressList(id)
      },
    })
  },

  //确认支付
  cashMoney() {
    // wx.reLaunch({
    //   url: '../cashSuccess/cashSuccess'
    // })
  },

  //加载订单
  loadingOrder() {
    let order = app.globalData.order
    let orderList = order.data
    let business = order.business
    let sumMoney = 0
    orderList.forEach(item => {
      sumMoney += item.number * item.price
    })
    this.setData({
      orderList,
      business,
      sumMoney,
      business
    })
  },

  //设置时间
  setTime() {
    let date = new Date()
    let hour = date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`
    let minute = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`
    let time = `${hour}:${minute}`
    this.setData({
      time
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
        addressList.length != 0 && addressList.forEach((item, index) => {
          if (index === 0) {
            item["isSelect"] = true
          } else {
            item["isSelect"] = false
          }
        })
        if (addressList.length != 0) {
          this.setData({
            addressList,
            address: addressList[0]
          })
        }
      },
      fail: err => {
        console.log(err);
      }
    })
  },

  //选择地址
  selectAdress() {
    const {
      showAdressList
    } = this.data
    this.setData({
      showAdressList: !showAdressList
    })
  },


  //确定地址
  selectAdre(e) {
    const {
      addressList,
      showAdressList
    } = this.data
    let id = e.currentTarget.dataset.info._id;
    let arr = addressList
    let address = null
    arr.forEach(item => {
      if (item._id == id) {
        item["isSelect"] = true
        address = item
      } else {
        item["isSelect"] = false
      }
    })
    this.setData({
      addressList: arr,
      showAdressList: !showAdressList,
      address
    })
  },

  //时间选择
  bindTimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },

})