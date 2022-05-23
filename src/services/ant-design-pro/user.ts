
import { request } from 'umi';

/** 用户注册 POST /api/user */
export async function userRegister(
    data:API.UserRegister,
  ) {
    return request<API.ResponseUserRegister>('/common/user/register', {
      method: 'POST',
      data,
    });
  }

  // 获取用户注册验证码
  export async function getCaptcha(params:{phone:string}) {
    return request('/common/user/getCaptcha', {
      method: 'GET',
      params, 
    });
  }
  
  // 获取用户手机号登陆验证码
   // 获取用户注册验证码
   export async function getLoginCaptcha(params:{phone:string}) {
    return request('/common/user/getLoginCaptcha', {
      method: 'GET',
      params, 
    });
  }
// 用户登陆 账号密码登陆
  export async function loginByCount(data:{Faccount_number:string,Fpassword:string}) {
    return request('/common/user/loginByCount', {
      method: 'POST',
      data, 
    });
  }
// 手机号登陆
  export async function loginByPhone(data:{Fphone:string,captcha:string}) {
    return request('/common/user/loginByPhone', {
      method: 'POST',
      data, 
    });
  }

/**
 * 
 * @param params 
 * @returns 
 * 获取用户 
 */
export async function getUserInfo(params:API.UserInfo) {
  return request('/api/user', {
    method: 'GET',
    params, 
  });
}

// 更新用户信息
export async function updateUserInfo(data:API.UserInfo) {
  return request('/api/user', {
    method: 'PUT',
    data
  });
}
// 退出登陆
export async function outLogin(data:{Fuser_id?:number}) {
  return request('/common/user/outLogin', {
    method: 'POST',
    data
  });
}

// 获取忘记密码验证码
export async function getForgetPassWordCaptcha(params:{phone:string}) {
  return request('/common/user/getForgetPassWordCaptcha', {
    method: 'GET',
    params, 
  });
}

// 重置密码
export async function resetLoginPassWord(data:{Fphone:string,Fpassword:string,Faccount_number:string,captcha:string}) {
  return request('/common/user/resetLoginPassWord', {
    method: 'POST',
    data, 
  });
}


export async function getFaccountNumber(params:{phone:string}) {
  return request('/common/user/getFaccountNumber', {
    method: 'GET',
    params, 
  });
}

export async function getQQUserInfo(code:string) {
  return request('/common/user/getQQUserInfo', {
    method: 'GET',
    params:{
      code
    } 
  });
}