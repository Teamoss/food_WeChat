Component({
  data: {
    imageList: [{
        id: 0,
        url: '../../../images/menu/icon4.png',
        name: '酒店',
        webUrl: " http://t.cn/AigldKuT"
      },
      {
        id: 1,
        url: '../../../images/menu/icon4.png',
        name: '酒店',
        webUrl: " http://t.cn/AigldKuT"
      },
      {
        id: 2,
        url: '../../../images/menu/icon4.png',
        name: '酒店',
        webUrl: " http://t.cn/AigldKuT"
      },
      {
        id: 3,
        url: '../../../images/menu/icon4.png',
        name: '酒店',
        webUrl: " http://t.cn/AigldKuT"
      },
    ]
  },
  methods: {
    toWeb(e) {
      let item = e.currentTarget.dataset.item
      let {
        url,
        id
      } = item
      // wx.navigateTo({
      //   url: '../../pages/webView/webView?banner_url=' + this.data.url
      // })
    },
  }

})