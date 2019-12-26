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
}
module.exports = connect