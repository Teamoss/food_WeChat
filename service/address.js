//主机地址
const host = 'http://localhost:5000'
const connect = {
  host,
  //登录
  login: host + '/api/userLogin',
  //注册
  register: host + '/api/userRegister',
  //获取所有商家
  findAllBusiness: host + '/api/findAllBusiness',
  //获取商家菜单
  findAllFood: host + '/api/findAllFood',
  //获取用户收货地址
  getUserAddress: host + '/api/getUserAddress',
}
module.exports = connect