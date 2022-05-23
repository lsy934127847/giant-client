import {useState } from 'react';
import { Button, Tooltip, Dropdown, Menu, Input, message} from 'antd';
import { EllipsisOutlined, QuestionCircleOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { getUserInfo} from '@/services/ant-design-pro/user';
import {
  ModalForm,
  ProFormText
} from '@ant-design/pro-form';

export type TableListItem = {
  Fuser_id: number;
  Faccount_number: string;
  Fpassword: string;
  Fnickname: string;
  Fphone: string;
  Funion_id: string;
  Fstatus: number;
  Favatar: string;
  Finsert_time: string;
  Fupdate_time: string;
  key: number
};
let tableListDataSource: TableListItem[] = [];
const columns: ProColumns<TableListItem>[] = [
  {
    title: '用户ID',
    dataIndex: 'Fuser_id',
    valueType: 'indexBorder',
    key: 'Fuser_id'
  },
  {
    title: '用户昵称',
    dataIndex: 'Fnickname',
    key: 'Fnickname',
    render: (_) => <a>{_}</a>,
    // 自定义筛选项功能具体实现请参考 https://ant.design/components/table-cn/#components-table-demo-custom-filter-panel
    filterDropdown: () => (
      <div style={{ padding: 8 }}>
        <Input style={{ width: 188, marginBottom: 8, display: 'block' }} />
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    )
  },
  {
    title: '用户头像',
    dataIndex: 'Favatar',
    key: 'Favatar',
    search: false,
    render: (text) => {
      //  console.log('text',text)
      //  console.log('recode',recode)
      return (<div>
        <img style={{width: 100, height: 100}}src={text as string} />
      </div>);
    }
  },
  {
    title: '用户手机',
    dataIndex: 'Fphone',
    key: 'Fphone'
  },
  {
    title: (<>
       用户状态
      <Tooltip placement="top" title="仅支持当前页数据的筛选,如要筛选数据库,请在上方查询">
        <QuestionCircleOutlined style={{ marginLeft: 4 }} />
      </Tooltip>
    </>),
    dataIndex: 'Fstatus',
    initialValue: '0',
    key: 'Fstatus',
    filters: true,
    onFilter: true,
    valueEnum: {
      0: { text: '全部', status: 'Default' },
      1: { text: '运行中', status: 'Processing' },
      2: { text: '异常', status: 'Error' }
    }
  },
  {
    title: (
      <>
        创建时间
        <Tooltip placement="top" title="会筛选数据库">
          <QuestionCircleOutlined style={{ marginLeft: 4 }} />
        </Tooltip>
      </>
    ),
    width: 140,

    key: 'Finsert_time',
    dataIndex: 'Finsert_time',
    valueType: 'dateTime',
    sorter: (a: any, b: any) => a.Finsert_time - b.Finsert_time
  },
  {
    title: (
      <>
        更新时间
        <Tooltip placement="top" title="会筛选数据库">
          <QuestionCircleOutlined style={{ marginLeft: 4 }} />
        </Tooltip>
      </>
    ),
    width: 140,

    key: 'Fupdate_time',
    dataIndex: 'Fupdate_time',
    valueType: 'dateTime',
    sorter: (a: any, b: any) => a.Fupdate_time - b.Fupdate_time
  },
  {
    title: '用户QQunionid',
    dataIndex: 'Funion_id',
    key: 'Funion_id',
    ellipsis: true,
    copyable: true
  },
  {
    title: '操作',
    width: 180,
    key: 'option',
    valueType: 'option',
    render: () => [
      <a key="link">链路</a>,
      <a key="link2">报警</a>,
      <a key="link3">监控</a>,
      <TableDropdown
        key="actionGroup"
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' }
        ]}
      />
    ]
  }
];

const menu = (
  <Menu>
    <Menu.Item key="1">1st item</Menu.Item>
    <Menu.Item key="2">2nd item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>
);

export default () => {
  const [isVisible, setVisible] = useState(false);
  return (
    <PageContainer>
      <ProTable<TableListItem>
        columns={columns}
        request={async(params, sorter) => {
        // 表单搜索项会从 params 传入，传递给后端接口。

          // 由于 sorter, filter 会对当前数据进行一个筛选和排序
          // 可能有用户只想针对 当前页码数据进行排序 这个暂且不考虑
          // 获取用户

          // 排序需要查询数据库

          params.sortField = sorter;
          const res = await getUserInfo(params as any);
          res.data.data.forEach((item: TableListItem, index: number) => {
            item.key = index;
          });
          tableListDataSource = res.data.data;
          return Promise.resolve({
            data: tableListDataSource,
            success: true
          });
        }}
        rowKey="key"
        pagination={{
          showQuickJumper: true
        }}
        search={{
          layout: 'vertical',
          defaultCollapsed: false
        }}
        dateFormatter="string"
        toolbar={{
          title: '高级表格',
          tooltip: '这是一个标题提示'
        }}
        toolBarRender={() => [
          <Button key="danger" danger>
          危险按钮
          </Button>,
          <Button key="show">查看日志</Button>,
          <ModalForm

            visible={isVisible}
            modalProps={{
              onCancel: () => {
                setVisible(false);
              }
            }}
            layout="horizontal"
            trigger={
              <Button type="primary" onClick={() => {
                setVisible(true);
              }}>
                <PlusOutlined />
              新建表单
              </Button>
            }
            onFinish={async() => {
              setVisible(false);
              message.success('提交成功');
            }}
          >

            <ProFormText
              width="md"
              name="Faccount_number"
              label="用户账号"
              tooltip="最长为 24 位"
              placeholder="请输入名称"
              rules={[
                {
                  required: true,
                  message: '昵称必填'
                }
              ]}
            />
            <ProFormText
              width="md"
              name="Fpassword"
              label="用户密码"
              tooltip="最长为 24 位"
              placeholder="请输入名称"
              rules={[
                {
                  required: true,
                  message: '昵称必填'
                }
              ]}
            />
            <ProFormText
              width="md"
              name="Fnickname"
              label="用户昵称"
              tooltip="最长为 24 位"
              placeholder="请输入名称"
              rules={[
                {
                  required: true,
                  message: '昵称必填'
                }
              ]}
            />
            <ProFormText
              width="md"
              name="Fphone"
              label="用户手机"
              tooltip="最长为 24 位"
              placeholder="请输入名称"
              rules={[
                {
                  required: true,
                  message: '昵称必填'
                }
              ]}
            />

          </ModalForm>,
          <Dropdown key="menu" overlay={menu}>
            <Button>
              <EllipsisOutlined />
            </Button>
          </Dropdown>
        ]}
      />
    </PageContainer>

  );
};
