//主机地址
const host = 'http://localhost:5000'

//真机调试地址
// const host = 'http://192.168.1.167:5000'

const connect = {
  host,
  //登录
  login: host + '/api/userLogin',
  //注册
  register: host + '/api/userRegister',
  //获取所有商家  好评优先  销量最高查询商家
  findAllBusiness: host + '/api/findAllBusiness',
  //获取商家菜单
  findAllFood: host + '/api/findAllFood',
  //获取商家详细信息
  getDetailBusiness: host + '/api/getBusinessMessage',
  //获取用户收货地址
  getUserAddress: host + '/api/getUserAddress',
  //添加用户收货地址
  addUserAddress: host + '/api/addUserAddress',
  //编辑用户收货地址
  editUserAddress: host + '/api/editUserAddress',
  //删除用户收货地址
  deleteUserAddress: host + '/api/deleteUserAddress',
  //用户下单
  sendOrder: host + '/api/sendOrder',
  //获取用户所有订单
  findAllOrder: host + '/api/findAllOrder',
  //提交评论
  addComment: host + '/api/addComment',
  //查看用户评论
  findComment: host + '/api/findComment',
  //修改评论
  editComment: host + '/api/editComment',
  //查看店铺评论
  findAllComment: host + '/api/findAllComment',
  //搜索店铺
  searchBusiness: host + '/api/searchBusiness',
  //查询店铺收藏状态
  collection: host + '/api/collection',
  //添加收藏
  addCollection: host + '/api/addCollection',
  //取消收藏
  deleteCollection: host + '/api/deleteCollection',
  //查询用户收藏
  findAllCollection: host + '/api/findAllCollection',

}
module.exports = connect