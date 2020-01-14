Component({
  data: {
    imageList: [{
        id: 0,
        url: '../../../images/menu/icon4.png',
        name: '酒店',
        webUrl: "http://t.cn/AigldKuT"
      },
      {
        id: 1,
        url: '../../../images/menu/chaoshi.png',
        name: '超市',
        webUrl: "https://s.click.taobao.com/t?e=m%3D2%26s%3DxzSwQRwy61EcQipKwQzePCperVdZeJviK7Vc7tFgwiFRAdhuF14FMRs7MAK8mhlD8sviUM61dt2gdx04my86DHpZjlW9mNOHARlrcq9P3%2B05ifuyVaPnGN0uB1f4fThH4gqXglJHiXPLQPEJLPAWAV3WV7X8X8sdyARaEpTliORPf2BYFhAHdG52R0giPkGksd%2B%2Ff4Fhw9aJbQ0XuCRgYihtqTYkKJ6lyi27umSzCd2o1izWY8kpxr4MyUOcL5HQGggxR1v8%2FLFSbQaOVqMw3QDz%2B7OD4pSG%2FYubYYodSIbGDF1NzTQoPw%3D%3D&union_lens=lensId%3APUB%401573699342%400b0fb839_0cd6_16e67ca5294_1b15%4001"
      },
      {
        id: 2,
        url: '../../../images/menu/hb.png',
        name: '外卖红包',
        webUrl: "https://jxbwlsali.kuaizhan.com/46/67/p67601952954395?phone=13068518223"
      },
      {
        id: 3,
        url: '../../../images/menu/icon6.png',
        name: '视频会员',
        webUrl: "https://w.url.cn/s/AuN4I8R"
      },
      {
        id: 4,
        url: '../../../images/menu/wancan.png',
        name: '优惠券',
        webUrl: "http://t.cn/AigldKO0"
      },
    ]
  },
  methods: {
    toWeb(e) {
      let item = e.currentTarget.dataset.item
      let {
        webUrl
      } = item
      wx.navigateTo({
        url: '../../pages/webView/webView?banner_url=' + webUrl
      })
    },
  }

})