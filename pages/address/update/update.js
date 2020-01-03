const app = getApp()
const pattern = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
import Connect from '../../../service/address.js'
Page({
  data: {

  },
  onLoad(options) {
    let data = app.globalData.updateAddr
    this.setData({
      address: data.address,
      gender: data.gender,
      name: data.name,
      phone: data.phone,
      id: data._id,
    })
  },
  getInput(e) {
    let k = e.currentTarget.dataset.key,
      v = e.detail.value,
      o = {};
    o[k] = v;
    this.setData(o);
  },
  chooseGender(e) {
    this.setData({
      gender: e.detail.value
    })
  },
  showToast(str) {
    wx.showToast({
      title: str,
      icon: 'none'
    })
  },
  exam() {
    const {
      address,
      phone,
      name,
      id,
      gender
    } = this.data
    if (!name) {
      this.showToast('请输入姓名')
      return false;
    }
    if (!phone) {
      this.showToast('请输入手机号码')
      return false;
    }

    if (!pattern.test(phone)) {
      this.showToast('请输入正确的手机号码')
      return false;
    }
    if (!address) {
      this.showToast('请输入收货地址')
      return false;
    }
    return true;
  },

  //编辑地址
  editAddr() {
    let valid = this.exam();
    if (!valid) {
      return false;
    }
    const {
      address,
      phone,
      name,
      id,
      gender
    } = this.data
    console.log(this.data)
    wx.request({
      url: Connect.editUserAddress,
      method: 'POST',
      data: {
        address,
        phone,
        name,
        gender,
        id
      },
      success: res => {
        console.log(res)
        if (res.data.code === 2000) {
          this.showToast('修改成功');
          wx.navigateBack({})
        }
      },
      fail: err => {
        console.log(err)
      }
    })
  },

  //删除地址
  deleteAddr() {
    const {
      id
    } = this.data
    wx.request({
      url: Connect.deleteUserAddress,
      method: 'POST',
      data: {
        id
      },
      success: res => {
        console.log(res)
        if (res.data.code === 2000) {
          this.showToast('删除成功');
          wx.navigateBack({})
        }
      },
      fail: err => {
        console.log(err)
      }
    })
  }
})