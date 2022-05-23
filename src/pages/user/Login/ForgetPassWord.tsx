import React,{useRef,useState} from 'react';
import { Button, message } from 'antd';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormCaptcha
} from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';
import {getForgetPassWordCaptcha,getFaccountNumber,resetLoginPassWord} from "@/services/ant-design-pro/user"
import {handleResponseData} from '@/utils/responseData'
const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 3 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
 const ForgetPassWord:React.FC = () => {
   const [initFaccountNnumber,setInitFaccountNnumber] =   useState('')
    initFaccountNnumber
    const formRef = useRef<ProFormInstance>();
  return (
    <ModalForm<{
      Faccount_number: string;
      Fpassword: string;
      Fphone: string;
      captcha: string;
    }>
    {...formItemLayout}
      layout="horizontal"
      formRef={formRef}
      title="忘记密码"
      trigger={
        // <Button type="primary">
        //   <PlusOutlined />
        //   忘记密码
        // </Button>
        <span style={{color:'black'}}>
            忘记密码
        </span>
      }
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log('run'),
      }}
      onFinish={async (values) => {
 
      let data = await resetLoginPassWord(values)
      let res =  handleResponseData(data)
      console.log('66666',res)
      if(res){
          return true
      }
       
      }}
    >
       {/* <ProForm.Group> */}
               
                
       {/* </ProForm.Group> */}
      <ProFormText  
         name="Faccount_number" 
         label="用户账号" 
         labelAlign="right"
         initialValue={initFaccountNnumber}
         rules={[
            {
              required: true,
              message: "昵称必填"
            },
          ]}
         />
      <ProFormText
                labelAlign="right"
                        // width="md"
                        addonAfter={<Button style={{width:110,height:38}} onClick={() =>{
                            formRef.current?.validateFieldsReturnFormatValue?.(["Fphone",]).then((val) => {
                                // 以下为格式化之后的表单值
                    
                                console.log("111",val);// {Fphone:15106114538}
                                if(val){
                                console.log(process.env)
                                let phone = val.Fphone
                                getFaccountNumber({phone}).then( 
                                    res =>{
                                    console.log("res",res)
                                    // 如果验证码不正确或者过期将 提示错误 
                                    // 暂时不知道该如何就像表单校验那样显示错误
                                    
                                    if(res && res.data){
                                        formRef.current?.setFieldsValue({'Faccount_number':res.data.Faccount_number})
                                        message.success("账号获取成功,您的账号为 " + res.data.Faccount_number);
                                    }
                                    if(res && res.errno){
                                        message.error("账号获取失败--" + res.errmsg);
                                    }
                    
                                        
                                    }
                                    )
                                }
                            
                            }).catch( res =>{
                                if(res){
                                
                                console.log('提交忘记密码验证码时有表单值校验错误',res)
                                message.error('有数据校验错误,请在console.log查看错误信息')
                                
                                }
                            });
                        
                        }}>获取账号</Button>}
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
        rules={[
            {
                required: true,
                message: '请输入验证码！',
            },
            {
                pattern: /^\d{4}$/,
                message: "验证码格式错误"
                },
    ]}
        onGetCaptcha={async () => {
        
        formRef.current?.validateFieldsReturnFormatValue?.(["Fphone",]).then((val) => {
            // 以下为格式化之后的表单值

            console.log("111",val);// {Fphone:15106114538}
            if(val){
            console.log(process.env)
            let phone = val.Fphone
            getForgetPassWordCaptcha({phone}).then( 
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
            if(res){
            
            console.log('提交忘记密码验证码时有表单值校验错误',res)
            message.error('有数据校验错误,请在console.log查看错误信息')
            
            }
        });
    
        }}
    />
      <ProFormText 
      labelAlign="right" 
         name="Fpassword" 
   
         label="用户密码" 
         rules={[
            {
              required: true,
              message: "昵称必填"
            },
          ]}
         />
    </ModalForm>
  );
};

export default ForgetPassWord