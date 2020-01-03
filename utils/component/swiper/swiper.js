// utils/component/swiper/swiper.js
Page({
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
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
})