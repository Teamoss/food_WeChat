import Connect from '../../../service/address.js'

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
    src1: '../../../images/buitiful.png',
    src2: '../../../images/noBuitiful.png',
    commentList: [],
    pageSize: 8,
    pageNo: 1,
    noMore: false,
    loadingMore: false,
    businessId: null
  },


  onLoad(options) {
    const {
      id
    } = options
    this.getCommentList(id)
    this.setData({
      businessId: id
    })
  },


  onShow() {

  },


  //加载订单数据
  getCommentList(id) {
    const {
      pageSize,
      pageNo
    } = this.data
    wx.request({
      url: Connect.findAllComment,
      method: 'POST',
      data: {
        businessId: id,
        pageSize: 8,
        pageNo: 1,
      },
      success: res => {
        let commentList = res.data.data
        commentList.length > 0 && commentList.forEach(item => {
          item['commentTime'] = this.formatTime(item.commentTime)
        })
        let total = res.data.total
        let page = Math.ceil(total / pageSize)
        let flag = page <= pageNo ? true : false
        this.setData({
          commentList,
          noMore: flag,
          pageNo: flag ? 1 : this.data.pageNo + 1
        })
      },
      fail: err => {
        console.log(err);
      }
    })
  },

  formatTime(time) {
    if (time) {
      let arr = time.split(' ')
      return arr[0]
    }
  },



  //加载更多
  loadingMoreData() {
    const {
      pageSize,
      pageNo,
      loadingMore,
      businessId
    } = this.data
    wx.request({
      url: Connect.findAllComment,
      method: 'POST',
      data: {
        pageSize,
        pageNo,
        businessId
      },
      success: res => {
        let commentList = res.data.data
        commentList.length > 0 && commentList.forEach(item => {
          item['commentTime'] = this.formatTime(item.commentTime)
        })
        let total = res.data.total
        let page = Math.ceil(total / pageSize)
        let flag = page <= pageNo ? true : false
        this.setData({
          commentList: this.data.commentList.concat(commentList),
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


})