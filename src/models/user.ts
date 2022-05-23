


// 有多个组件使用到的数据 可以采用model

// 在使用状态管理时 可以只暴漏接口 不做缓存 减少内存占用
// 对于需要在多个组件中使用到的数据 可以做缓存 减少http请求 直接从缓存中拿数据
// 加快页面渲染速度
// 一个请求可能需要化几百ms请求回来 内存中则几ms



import { useState, useCallback } from 'react';
import { getUserInfo,updateUserInfo } from '@/services/ant-design-pro/user';
import { message } from 'antd';

// 规定 请求一条信息用对象 请求多条信息或者不确定几条信息用数组
export default () => {
  const [counter, setCounter] = useState(0);
 let initCurrentUser:any = {}
  const [currentUser, setCurrentUser] = useState(initCurrentUser); // 当前用户
  const [userList, setUserList] = useState([]);       // 分页用户
  const [allUserList, setAllUserList] = useState([]); // 所有用户

  const getCurrentUser = useCallback(async (params,isSendAjax?:boolean) =>{
    if(isSendAjax){
            let res =  await getUserInfo(params)
            if(res && res.errno == 0){
              setCurrentUser(res.data)
            }else{
                message.error('用户信息拉取失败--' + res.errmsg)
            }
    }else{
      console.log('params',params)
      setCurrentUser(params)
    }

  }, []);

 


  const decrement = useCallback(() => setCounter((c) => c - 1), []);
  return { counter, getCurrentUser, decrement ,currentUser};
};