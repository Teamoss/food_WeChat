Component({
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },
  properties: {
    businesList: {
      type: Array,
      value: '',
      observer: function(newVal, oldVal) {}
    },

  },

  data: {
    imgUrls: [{
        swiper: '../../../images/swiper/1.jpg'
      },
      {
        swiper: '../../../images/swiper/2.jpg'
      },
      {
        swiper: '../../../images/swiper/3.jpg'
      },
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 500,
  },

  attached() {

  },

  methods: {
    swiperToDetail(e) {
      const {
        businesList
      } = this.data
      if (businesList && businesList.length > 0) {
        let item = e.currentTarget.dataset.item
        let detail = JSON.stringify(item)
        wx.navigateTo({
          url: '/pages/business/business?detail=' + detail,
        })
      }

    },

  }


})