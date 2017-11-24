module.exports = {
  UNKNOW_ERROR: {
    code: -500,
    message: '服务器未知错误'
  },
  USERNAME_IS_NULL: {
    code: -2,
    message: '用户名不能为空'
  },
  USERNAME_NOT_FOUND: {
    code: -3,
    message: '用户名不存在'
  },
  USERNAME_PWD_IS_NULL: {
    code: -4,
    message: '用户名和密码不能为空'
  },
  ID_INVALID: {
    code: -5,
    message: 'ID不合法'
  },
  DATA_NOT_FOUND: {
    code: -6,
    message: '资源不存在'
  },
  USER_INVALID: {
    code: -7,
    message: '用户名或密码错误'
  },
  USERNAME_EXIST: {
    code: -8,
    message: '用户名已经存在'
  },
  USERNAME_INVALID: {
    code: -9,
    message: '用户名不合法，必须是6-10位字母数字或下划线组成'
  },
  PARAMS_ERROR: {
    code: -10,
    message: '参数错误'
  },
}