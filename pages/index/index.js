const app = getApp()
const wxAuth = require('../../utils/wxAuth.js')
const wxLogin = require('../../utils/wxLogin.js')
import Connect from '../../service/address.js'

Page({

  data: {
    businesList: [],
    pageSize: 8,
    pageNo: 1,
    noMore: false,
    loadingMore: false,
    type: 1,
    location: null,
    cityKey: null,
    typeArr: [{
        index: 0,
        type: 1,
        title: '推荐商家',
        active:true
      },
      {
        index: 1,
        type: 2,
        title: '好评优先',
        active: false
      },
      {
        index: 2,
        type: 3,
        title: '销量最高',
        active: false
      },
    ],
    type: 1,
  },

  onLoad() {
    this.loadingInfo()
    this.location()
  },

  onShow() {
    this.loadingData()
  },

  //定位
  location() {
    const {
      type
    } = this.data
    wx.getLocation({
      type: 'wgs84',
      success: res => {
        let locationString = res.latitude + "," + res.longitude;
        wx.request({
          url: 'http://apis.map.qq.com/ws/geocoder/v1/',
          data: {
            "key": "2LNBZ-OMPLR-FSFWP-WWJU7-L5HWQ-WYFAF",
            "location": locationString
          },
          method: 'GET',
          success: r => {
            let cityKey = r.data.result.address_component.district
            let location = r.data.result.address
            this.loadingData(type, cityKey)
            this.setData({
              location,
              cityKey
            })
            app.globalData.cityKey = cityKey;
          }
        });
      }
    })
  },

  //选择位置
  chosenMap() {
    const {
      type
    } = this.data
    wx.chooseLocation({
      success: res => {
        let locationString = res.latitude + "," + res.longitude;
        wx.request({
          url: 'http://apis.map.qq.com/ws/geocoder/v1/',
          data: {
            "key": "2LNBZ-OMPLR-FSFWP-WWJU7-L5HWQ-WYFAF",
            "location": locationString
          },
          method: 'GET',
          success: r => {
            let cityKey = r.data.result.address_component.district
            let location = r.data.result.address
            this.loadingData(type, cityKey)
            this.setData({
              location,
              cityKey
            })
            app.globalData.cityKey = cityKey;
          }
        });
      },
    })
  },

  //搜索商家
  search() {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },

  //加载数据
  loadingData(businessType, cityKey) {
    const {
      pageSize,
      pageNo,
      type
    } = this.data
    wx.request({
      url: Connect.findAllBusiness,
      method: 'POST',
      data: {
        pageSize,
        pageNo,
        type: businessType ? businessType : type,
        cityKey
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
      loadingMore,
      type,
      cityKey
    } = this.data
    wx.request({
      url: Connect.findAllBusiness,
      method: 'POST',
      data: {
        pageSize,
        pageNo,
        type,
        cityKey
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

  //推荐商家 好评优先 销量最高排序
  loadingBusiness(e) {
    const {
      cityKey,
      typeArr
    } = this.data
    let item = e.target.dataset.item
    this.loadingData(item.type, cityKey)
    let arr = typeArr
    arr.forEach(i=>{
      if (i.type == item.type) {
        i['active'] = true
      }else {
        i['active'] = false
      }
    })
    this.setData({
      type: item.type,
      typeArr:arr
    })
  },



})