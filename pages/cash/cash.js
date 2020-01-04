Page({
  data: {
    showAdressList: false
  },

  onLoad(options) {

  },

  onShow: function() {

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

  //确认支付
  cashMoney() {

  },

  selectAddr(){
    console.log(11)
  }
})