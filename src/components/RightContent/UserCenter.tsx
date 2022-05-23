
import React, { useRef,useState } from 'react';
import { Button, message,Form,Upload } from 'antd';
import type { ProFormInstance } from '@ant-design/pro-form';
import { history, useModel } from 'umi';
import ProForm, {
  DrawerForm,
  ProFormText,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormUploadDragger,
  ProFormUploadButton
  
} from '@ant-design/pro-form';
import { PlusOutlined ,UploadOutlined,LoadingOutlined} from '@ant-design/icons';

import {updateUserInfo} from '@/services/ant-design-pro/user'
const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };
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
const UserCenter: React.FC = () => {
    const [isEdit,setIsEdit] = useState(true)
    const [imgUrl,setImgUrl] = useState('')
    const [loading,setLoading] = useState(false)
    const formRef = useRef<ProFormInstance>();
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    const { currentUser,getCurrentUser } = useModel('user', (ret) => ({
      currentUser: ret.currentUser,
      getCurrentUser:ret.getCurrentUser
    }));

    return (
      <DrawerForm<{
        Fnickname:string
        Favatar?:string
        Fphone:string
        Faccount_number:string
      }>
        title="个人中心"
        formRef={formRef}
        trigger={
           <span>个人中心</span>
        }
        layout='horizontal'
        {...formItemLayout}
        autoFocusFirstInput
        drawerProps={{
          forceRender: true,
          destroyOnClose: true,
          onClose: () =>  setIsEdit(true),
        }}

        onFinish={async (values) => {
          console.log('values start',values)
          if(currentUser.Funion_id){
            return message.warn("当前账户使用QQ第三方登陆,暂不支持修改")
          }
           if(values.Favatar)delete values.Favatar // 上传图片时已经将图片上保存到了数据库中
           values = {
             ...currentUser,
             ...values,
           }
           
          let res = await updateUserInfo(values)
          if(res.error){
             message.success('更新失败');
          }else{
            if(res.data){
              message.success('更新成功');
              let Fuser_id = currentUser.Fuser_id
              getCurrentUser({Fuser_id},true)// 更新状态管理保存的用户信息 
               // 返回true 关闭弹窗
               setIsEdit(true)
               return true
             }
          }
         
         
        }}
      >
        {/* <ProForm.Group>
          <ProFormText
            name="name"
            width="md"
            label="签约客户名称"
            tooltip="最长为 24 位"
            placeholder="请输入名称"
          />
          <ProFormText width="md" name="company" label="我方公司名称" placeholder="请输入名称" />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText width="md" name="contract" label="合同名称" placeholder="请输入名称" />
          <ProFormDateRangePicker name="contractTime" label="合同生效时间" />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect
            options={[
              {
                value: 'chapter',
                label: '盖章后生效',
              },
            ]}
            width="xs"
            name="useMode"
            label="合同约定生效方式"
          />
          <ProFormSelect
            width="xs"
            options={[
              {
                value: 'time',
                label: '履行完终止',
              },
            ]}
            name="unusedMode"
            label="合同约定失效效方式"
          />
        </ProForm.Group> */}
        <Button type="primary" onClick={() =>{
          if(currentUser.Funion_id){
          return  message.warn('当前账户使用QQ第三方登陆,暂不支持修改')
          }
           setIsEdit(false)
        }}>编辑</Button>
       
        <ProFormText name="Fnickname" disabled={isEdit} label="我的昵称" initialValue={currentUser.Fnickname}/>
        <ProFormText name="Fphone" disabled={isEdit} label="我的手机号" initialValue={currentUser.Fphone}/>
        <ProFormText name="Faccount_number" disabled={isEdit} label="我的账号" initialValue={currentUser.Faccount_number}/>

        {/* <Form.Item
        name="upload"
        label="Upload"
        valuePropName="fileList"
        // getValueFromEvent={normFile}
        extra="longgggggggggggggggggggggggggggggggggg"
      >
        <Upload 
          name="Favatar" 
          action="/common/user/UserAvatarUpload" 
          listType="picture-card">
        {imgUrl ? <img src={imgUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
         
        </Upload>
      </Form.Item> */}
       <ProFormUploadButton
        disabled={isEdit}
        name="Favatar"
        label="我的头像"
        max={1}
        fieldProps={{
          name: 'file',
          listType: 'picture-card',
          maxCount:1,
          // showUploadList:false,
          // 
          defaultFileList:[{
            uid: '1',
            name: 'yyy.png',
            status: 'done',
            url :currentUser.Favatar
          }]
        }}
        action="/common/user/avatarUpload"
        extra="上传图片"
      />
        {/* <ProFormText width="xs" name="mangerName" disabled={isEdit}  label="商务经理" initialValue="启途" /> */}
      </DrawerForm>
    );
  };

export default UserCenter