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
      '../../../images/swiper/01.jpg',
      '../../../images/swiper/02.jpg',
      '../../../images/swiper/04.jpg',
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 500,
   
  },
})