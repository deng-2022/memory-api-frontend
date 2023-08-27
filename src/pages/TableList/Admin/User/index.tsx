import { getPageUsingGET } from '@/services/pic-memories/userController';
import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Space, Tag } from 'antd';
import React from 'react';

const UserList: React.FC = () => {
  const columns: ProColumns<API.User>[] = [
    // avatar?: string;
    // createTime?: string;
    // isDelete?: number;
    // password?: string;
    // phone?: string;
    // updateTime?: string;
    // userId?: number;
    // userRole?: number;
    // username?: string;
    {
      title: 'id',
      dataIndex: 'userId',
      copyable: true,
      ellipsis: true,
      tip: '用户id是唯一的',
    },

    {
      title: '昵称',
      dataIndex: 'username',
      valueType: 'textarea',
    },

    {
      title: '头像',
      dataIndex: 'avatar',
      valueType: 'textarea',
      render: (_, record) => {
        const url = record.avatar;

        return (
          <Space>
            <img src={url} alt="img" style={{ width: '30px', height: '30px' }} />
          </Space>
        );
      },
    },

    {
      title: '角色',
      disable: true,
      dataIndex: 'userRole',
      valueType: 'select',
      filters: true,
      onFilter: true,

      render: (_, record) => {
        let tagColor = 'grey';
        let userRole = '';

        switch (record?.userRole) {
          case 1:
            tagColor = 'green';
            userRole = '管理员';
            break;
          case 0:
            tagColor = 'blue';
            userRole = '普通用户';
            break;
          default:
            tagColor = 'default';
        }

        return (
          <Space>
            <Tag color={tagColor} key={record?.userRole}>
              {userRole}
            </Tag>
          </Space>
        );
      },
    },

    {
      title: '注册时间',
      dataIndex: 'createTime',
      ellipsis: true,
    },

    {
      title: '状态',
      dataIndex: 'isDelete',
      valueEnum: {
        0: {
          text: '正常',
          status: 'success',
        },
        user: {
          text: '异常',
          status: 'error',
        },
      },
    },

    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: () => [
        <a key="update" onClick={() => {}}>
          更新
        </a>,

        <a
          key="delete"
          onClick={() => {
            // action?.startEditable?.(record.id);
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.User, API.PageParams>
        // 发送请求
        request={async (params: { pageSize?: number; current?: number; keyword?: string }) => {
          const res = await getPageUsingGET({
            ...params,
          });

          if (res?.data) {
            return {
              data: res?.data.records || [],
              success: true,
              total: res?.data.total,
            };
          }
        }}
        columns={columns}
        //
        editable={{
          type: 'multiple',
        }}
        //
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          onChange(value) {
            console.log('value: ', value);
          },
        }}
        //
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        //
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        //
        pagination={{
          pageSize: 20,
          onChange: (page) => console.log(page),
        }}
        //
        dateFormatter="string"
        headerTitle="用户信息"
        toolBarRender={() => [
          // <Button key="show">查看日志</Button>,
        ]}
      />
    </PageContainer>
  );
};

export default UserList;
