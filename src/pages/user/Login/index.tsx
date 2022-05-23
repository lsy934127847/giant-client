import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
  QqOutlined
} from '@ant-design/icons';
import { Alert, Space, message, Tabs } from 'antd';
import React, { useState, useRef } from 'react';
import ProForm, { ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { useIntl, Link, history, FormattedMessage, SelectLang, useModel } from 'umi';
import Footer from '@/components/Footer';
import { login } from '@/services/ant-design-pro/api';
import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import type { ProFormInstance } from '@ant-design/pro-form';
import { loginByCount, getLoginCaptcha,loginByPhone } from '@/services/ant-design-pro/user';
import styles from './index.less';
import ForgetPassWord from './ForgetPassWord';
const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

/** 此方法会跳转到 redirect 参数所在的位置 */
const goto = () => {
  if (!history) return;
  setTimeout(() => {
    const { query } = history.location;
    const { redirect } = query as { redirect: string };
    history.push(redirect || '/');
  }, 10);
};

const Login: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  // const { initialState, setInitialState } = useModel('@@initialState');
  const formRef = useRef<ProFormInstance>();
  const intl = useIntl();
  const {  getCurrentUser } = useModel('user', (ret) => ({
    getCurrentUser: ret.getCurrentUser,
  }));
  // const fetchUserInfo = async () => {
  //   const userInfo = await initialState?.fetchUserInfo?.();
  //   if (userInfo) {
  //     setInitialState({
  //       ...initialState,
  //       currentUser: userInfo,
  //     });
  //   }
  // };

  const handleSubmit = async (values:any) => {
    setSubmitting(true);
    try {
      // 登录
      console.log("type",type)
      let res 
      if(type == 'account'){
          res =  await loginByCount(values)
      }else if(type == 'mobile'){
          res =  await loginByPhone(values)
      }
    
     console.log("res",res)
     if(res && res.errno == 0){
      message.success("登陆成功");
      // await fetchUserInfo();
      // 将用户信息保存在全局状态中
    
       getCurrentUser(res.data)
      goto();
      return;
     }else if(res && res.errno){
      message.error(res.errmsg);
      setUserLoginState(res.errmsg);
     }
     console.log("values",values)
  
  
      // 如果失败去设置用户错误信息
    
    } catch (error) {
      if(error){console.log("error",error)}
      const defaultloginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      });

      message.error(defaultloginFailureMessage);
    }
    setSubmitting(false);
  };
  const { status, type: loginType } = userLoginState;

  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src="http://www.xsumb.com/uploads/allimg/200329/124051H91-6.jpg" />
              <span className={styles.title}>Giant</span>
            </Link>
          </div>
          <div className={styles.desc}>
            {intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
          </div>
        </div>

        <div className={styles.main}>
          <ProForm
            formRef={formRef}
            initialValues={{
              autoLogin: true,
            }}
            submitter={{
              searchConfig: {
                submitText: intl.formatMessage({
                  id: 'pages.login.submit',
                  defaultMessage: '登录',
                }),
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                loading: submitting,
                size: 'large',
                style: {
                  width: '100%',
                },
              },
            }}
            onFinish={async (values) => {
              handleSubmit(values as API.LoginParams);
            }}
          >
            <Tabs activeKey={type} onChange={setType}>
              <Tabs.TabPane
                key="account"
                tab={intl.formatMessage({
                  id: 'pages.login.accountLogin.tab',
                  defaultMessage: '账户密码登录',
                })}
              />
              <Tabs.TabPane
                key="mobile"
                tab={intl.formatMessage({
                  id: 'pages.login.phoneLogin.tab',
                  defaultMessage: '手机号登录',
                })}
              />
            </Tabs>

            {status === 'error' && loginType === 'account' && (
              <LoginMessage
                content={intl.formatMessage({
                  id: 'pages.login.accountLogin.errorMessage',
                  defaultMessage: '账户或密码错误（admin/ant.design)',
                })}
              />
            )}
            {type === 'account' && (
              <>
                <ProFormText
                  name="Faccount_number"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.login.username.placeholder',
                    defaultMessage: '用户名: admin or user',
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.username.required"
                          defaultMessage="请输入用户名!"
                        />
                      ),
                    },
                  ]}
                />
                <ProFormText.Password
                  name="Fpassword"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.login.password.placeholder',
                    defaultMessage: '密码: ant.design',
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.password.required"
                          defaultMessage="请输入密码！"
                        />
                      ),
                    },
                  ]}
                />
              </>
            )}

            {status === 'error' && loginType === 'mobile' && <LoginMessage content="验证码错误" />}
            {type === 'mobile' && (
              <>
                <ProFormText
                  fieldProps={{
                    size: 'large',
                    prefix: <MobileOutlined className={styles.prefixIcon} />,
                  }}
                  name="Fphone"
                  placeholder={intl.formatMessage({
                    id: 'pages.login.phoneNumber.placeholder',
                    defaultMessage: '手机号',
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.phoneNumber.required"
                          defaultMessage="请输入手机号！"
                        />
                      ),
                    },
                    {
                      pattern: /^1\d{10}$/,
                      message: (
                        <FormattedMessage
                          id="pages.login.phoneNumber.invalid"
                          defaultMessage="手机号格式错误！"
                        />
                      ),
                    },
                  ]}
                />
                <ProFormCaptcha
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon} />,
                  }}
                  captchaProps={{
                    size: 'large',
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.login.captcha.placeholder',
                    defaultMessage: '请输入验证码',
                  })}
                  captchaTextRender={(timing, count) => {
                    if (timing) {
                      return `${count} ${intl.formatMessage({
                        id: 'pages.getCaptchaSecondText',
                        defaultMessage: '获取验证码',
                      })}`;
                    }
                    return intl.formatMessage({
                      id: 'pages.login.phoneLogin.getVerificationCode',
                      defaultMessage: '获取验证码',
                    });
                  }}
                  name="captcha"
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.captcha.required"
                          defaultMessage="请输入验证码！"
                        />
                      ),
                    },
                  ]}
                  onGetCaptcha={async () => {
                    formRef.current?.validateFieldsReturnFormatValue?.(["Fphone"]).then((val) => {
                      // 以下为格式化之后的表单值

                      console.log("111", val);// {Fphone:15106114538}
                      if (val) {
                        console.log(process.env)
                        let phone = val.Fphone
                        getLoginCaptcha({ phone }).then(
                          res => {
                            console.log("res", res)
                            // 如果验证码不正确或者过期将 提示错误 
                            // 暂时不知道该如何就像表单校验那样显示错误

                            if (res && res.data) {
                              message.success("获取成功,验证码1分钟内有效,请及时在手机查看");
                            }
                            if (res && res.errno) {
                              message.error("获取验证码失败--" + res.errmsg);
                            }


                          }
                        )
                      }

                    }).catch(res => {
                      console.log("res", res)
                      if (res) {

                      }
                    });
                  }}
                />
              </>
            )}
            <div
              style={{
                marginBottom: 24,
              }}
            >
              <ProFormCheckbox noStyle name="autoLogin">
                <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录" />
              </ProFormCheckbox>
              <span
                style={{
                  float: 'right',
                  cursor:'pointer',
                  color:'burlywood'
                }}
                // onClick={()=>{
                //   console.log('点击我了')
                // }}
              >
                <ForgetPassWord />
                {/* <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码" /> */}
              </span>
            </div>
          </ProForm>
          <Space className={styles.other}>
            <FormattedMessage id="pages.login.loginWith" defaultMessage="其他登录方式" />
            {/* <AlipayCircleOutlined className={styles.icon} />
            <TaobaoCircleOutlined className={styles.icon} />
            <WeiboCircleOutlined className={styles.icon} /> */}

           
            <a href="https://graph.qq.com/oauth2.0/authorize?display=pc&response_type=code&client_id=101984051&redirect_uri=http://lashiyong.top/welcome&state=lashiyong&scope=get_user_info,get_vip_info,get_vip_rich_info">
            <QqOutlined className={styles.icon} />
            </a>
          </Space>
          <span 
             style={{marginLeft:130,cursor:'pointer'}}
             onClick={
               () =>{
                history.push('/user/register')
               }
             }
          >立即注册</span>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
