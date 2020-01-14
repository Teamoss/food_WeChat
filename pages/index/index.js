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
    location:null
  },

  onLoad() {
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
            let location = r.data.result.address
            this.setData({
              location
            })
          }
        });
      }
    })

  },

  onShow() {
    this.loadingInfo()
    this.loadingData()
  },

  //搜索商家
  search() {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },

  //加载数据
  loadingData(businessType) {
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
        type: businessType ? businessType : type
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
      type
    } = this.data
    wx.request({
      url: Connect.findAllBusiness,
      method: 'POST',
      data: {
        pageSize,
        pageNo,
        type
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
    let businessType = e.target.dataset.type
    this.loadingData(businessType)
    this.setData({
      type: businessType
    })
  },



})