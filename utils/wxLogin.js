const wxRegister = require('./wxRegister.js');
const appid = 'wx3cc514493bcaffdd';
const secret = '04d081104f15da3934334206e71bbd32';
import Connect from './../service/address.js'

const wxLogin = (callBack) => {
  wx.login({
    success: res => {
      wx.request({
        url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + res.code + '&grant_type=authorization_code',
        method: 'GET',
        success(result) {
          wx.request({
            url: Connect.login,
            method: 'POST',
            data: {
              openid: result.data.openid
            },
            success(loginData) {
              wx.showLoading({
                title: '获取用户数据',
                mask: true
              })
              /*获取用户信息*/
              wx.getUserInfo({
                success(userInfo) {
                  let code = loginData.data.code
                  if (code === 2001) {
                    //  用户未注册
                    wxRegister({
                      openid: result.data.openid,
                      userInfo: userInfo.userInfo
                    })
                  }
                  const data = {
                    openid: result.data.openid,
                    userInfo: userInfo.userInfo,
                  }
                  wx.hideLoading()
                  callBack && callBack(data)
                }
              })
            }
          })
        }
      })
    }
  })
}

module.exports = wxLogin