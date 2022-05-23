import React, { useCallback,useEffect } from 'react';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import { history, useModel } from 'umi';
import { stringify } from 'querystring';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
// import { outLogin } from '@/services/ant-design-pro/api';
import { outLogin } from '@/services/ant-design-pro/user';
import defauleuser from '../../../public/defaultuser.png'
import UserCenter from './UserCenter'
import Cookies from 'js-cookie'
export type GlobalHeaderRightProps = {
  menu?: boolean;
};

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
  await outLogin({});
  const { query = {}, pathname } = history.location;
  const { redirect } = query;
  // Note: There may be security issues, please note
  if (window.location.pathname !== '/user/login' && !redirect) {
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: pathname,
      }),
    });
  }
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  console.log("initialState",initialState)
  const { currentUser,getCurrentUser } = useModel('user', (ret) => ({
    currentUser: ret.currentUser,
    getCurrentUser:ret.getCurrentUser
  }));
  const onMenuClick = useCallback(
    (event
    //   : {
    //   key: React.Key;
    //   keyPath: React.Key[];
    //   item: React.ReactInstance;
    //   domEvent: React.MouseEvent<HTMLElement>;
    // }
    ) => {
      const { key } = event;
      if (key === 'logout') {
       // setInitialState({ ...initialState, currentUser: undefined });
        loginOut();
        return;
      }
     // history.push(`/account/${key}`);
    },
    [initialState, setInitialState],
  );

  console.log('currentUser AvatarDropdown',currentUser)
  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  // if (!initialState) {
  //   return loading;
  // }

  // const { currentUser } = initialState;
  console.log("1111")
  useEffect(() =>{
    let Fuser_id =   Cookies.get('Fuser_id')
    if(Fuser_id) getCurrentUser({Fuser_id},true)
    if(initialState?.currentUser)getCurrentUser(initialState?.currentUser)
  },[])
  
  if (!currentUser.Fuser_id) {
    return loading;
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {menu && (
        <Menu.Item key="center">
          <UserOutlined />
          个人中心
        </Menu.Item>
      )}
      {menu && (
        <Menu.Item key="settings">
          <SettingOutlined />
          个人设置
        </Menu.Item>
      )}
      {menu && <Menu.Divider />}

      <Menu.Item key="center">
          <UserOutlined />
          <UserCenter></UserCenter>
      </Menu.Item>
      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} src={currentUser.Favatar ? currentUser.Favatar : defauleuser} alt="avatar" />
        <span className={`${styles.name} anticon`}>{currentUser.Fnickname}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
