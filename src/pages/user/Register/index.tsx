
import React, { useState,useRef } from 'react';
import { message } from 'antd';

import ProForm, { ProFormText, ProFormCaptcha } from '@ant-design/pro-form';
import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import { useIntl, Link, history, FormattedMessage, SelectLang, useModel } from 'umi';
import './index.less';
import type { ProFormInstance } from '@ant-design/pro-form';
import {userRegister,getCaptcha} from "@/services/ant-design-pro/user"
import {
  UserOutlined,
  MobileOutlined,
  LockOutlined,
  AlipayCircleOutlined,
  TaobaoCircleOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
const Register: React.FC = () => {
  const formRef = useRef<ProFormInstance>();
  return (
    <div className="main-bg">
      <div className="main-left">
        <h3>用科技</h3>
        <p>让复杂的世界更简单</p>
      </div>

      <div className="main-right">

        <div style={{ marginBottom: "40px" }}>

          <div style={{ fontSize: "40px", fontWeight: "bolder" }}>欢迎注册</div>
          <span>已有帐号？</span>
          <a href="/user/login">登陆</a>

        </div>
        <ProForm<{
          Faccount_number: string;
          Fphone: string;
          Fpassword: string;
          Fnickname: string;
          captcha :string;
          company?: string;
          useMode?: string;
        }>

          // submitter={{
          //   searchConfig: {
          //     submitText: "注册",
          //     resetText: '重置',
          //   },
          // }}
          formRef={formRef}
          layout={'horizontal'}
          onFinish={async (values) => {
            console.log(values);
            userRegister(values).then((res) =>{
             
              if(res && res.errno){
                message.error('注册失败--' + res.errmsg);
              }else if(res && res.data){
                message.success('注册成功');
                // 跳转登陆
                history .push('/user/login')
              }
            })
           
          }}
        >
          <div>
            <ProFormText
              // width="md"
              fieldProps={{
                size: 'large',
              //  prefix: <UserOutlined className={'prefixIcon'} />,
              }}
              hasFeedback
              name="Fnickname"
              // width='sm'
              label="昵称"
              tooltip="最长为 24 位"
              placeholder="请输入昵称"
              rules={[
                {
                  required: true,
                  message: "昵称必填"
                },
              ]}
            />
            <ProFormText
              // width="md"
              fieldProps={{
                size: 'large',
              //  prefix: <UserOutlined className={'prefixIcon'} />,
              }}
              hasFeedback
              name="Faccount_number"
              label="账号"
              tooltip="最长为 24 位"
              placeholder="请输入账号"
              rules={[
                {
                  required: true,
                  message: "账号必填"
                },
              ]}
            />
            <ProFormText
            hasFeedback
              name={'Fpassword'}
              fieldProps={{
                size: 'large',
              //  prefix: <UserOutlined className={'prefixIcon'} />,
              }}
              // width="md"
              label="密码"
              tooltip="最长为 24 位"
              placeholder="请输入密码"
              rules={[
                {
                  required: true,
                  message: "密码必填"

                },
              ]}
            />
            <ProFormText
              // width="md"
              hasFeedback
              fieldProps={{
                size: 'large',
              //  prefix: <UserOutlined className={'prefixIcon'} />,
              }}
              name="Fphone"
              label="手机号"
              placeholder="用于登陆和找回密码"
              rules={[
                {
                  required: true,
                  message: "手机号必填"
                },
                {
                  pattern: /^1\d{10}$/,
                  message: "手机号格式错误！"
                },
              ]}
            />
            <ProFormCaptcha
            
              fieldProps={{
                size: 'large',
              //  prefix: <LockOutlined className={'prefixIcon'} />,
              }}
              captchaProps={{
                size: 'large',
              }}
              label="验证码"
              placeholder={'请输入验证码'}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${'获取验证码'}`;
                }
                return '获取验证码';
              }}
              name="captcha"
              rules={[ {
                required: true,
                message: '请输入验证码！',
              },]}
              onGetCaptcha={async () => {
                formRef.current?.validateFieldsReturnFormatValue?.(["Fphone",]).then((val) => {
                  // 以下为格式化之后的表单值
  
                  console.log("111",val);// {Fphone:15106114538}
                  if(val){
                    console.log(process.env)
                    let phone = val.Fphone
                    getCaptcha({phone}).then( 
                      res =>{
                        console.log("res",res)
                        // 如果验证码不正确或者过期将 提示错误 
                        // 暂时不知道该如何就像表单校验那样显示错误
                        
                        if(res && res.data){
                          message.success("获取成功,验证码1分钟内有效,请及时在手机查看");
                        }
                        if(res && res.errno){
                          message.error("获取验证码失败--" + res.errmsg);
                        }

                         
                      }
                      )
                  }
               
                }).catch( res =>{
                  console.log("res",res)
                  if(res){

                  }
                });
            
              }}
            />
            {/* <ProFormCaptcha
                  fieldProps={{
                    size: 'large',
             
                  }}
                  captchaProps={{
                    size: 'large',
                  }}
                  placeholder='请输入验证码'
                  captchaTextRender={(timing, count) => {
                    if (timing) {
                      return `${count} 获取验证码`;
                    }
                    return '获取验证码';
                  }}
                  name="captcha"
                  rules={[
                    {
                      required: true,
                      message: "请输入验证码！"
                    },
                  ]}
                  onGetCaptcha={async (phone) => {
                    const result = await getFakeCaptcha({
                      phone,
                    });
                    if (result === false) {
                      return;
                    }
                    message.success('获取验证码成功！验证码为：1234');
                  }}
                /> */}
        
          </div>
        </ProForm>
      </div>
    </div>

  );
};

export default Register;
