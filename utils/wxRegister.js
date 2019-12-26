import Connect from './../service/address.js'
const wxRegister = (user) => {
  wx.request({
    url: Connect.register,
    method: 'POST',
    data: {
      openid: user.openid,
      userInfo: user.userInfo
    }, success() {
      wx.hideLoading()
    }
  })
}

module.exports = wxRegister