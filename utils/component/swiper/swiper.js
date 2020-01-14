// utils/component/swiper/swiper.js
Component({
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },
  properties: {
    businesList: { // 属性名
      type: Array, 
      value: '', 
      observer: function (newVal, oldVal) { } 
    },
  
  },

  data: {
    imgUrls: [
      '../../../images/swiper/1.jpg',
      '../../../images/swiper/2.jpg',
      '../../../images/swiper/3.jpg',
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 500,
  },

  attached:{
    
  },

  methods: {
    swiperToDetail(e) {
      let item = e.currentTarget.dataset.item
      console.log(this.data.businesList)
      // wx.navigateTo({
      //   url: '../../pages/webView/webView?banner_url=' + this.data.url
      // })
    },
    loadingData(){
      this.setData({
        businesList
      })
    }
  }


})