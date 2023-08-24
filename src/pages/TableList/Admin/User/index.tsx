import { addRule, removeRule, updateRule } from '@/services/ant-design-pro/api';
import { addUserUsingPOST, listUserByPageUsingPOST } from '@/services/memory-api/userController';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Drawer, message, Space, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from '../InterfaceInfo/UpdateForm';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.RuleListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Configuring');
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.RuleListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const UserList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const columns: ProColumns<API.User>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      copyable: true,
      ellipsis: true,
      tip: '用户id是唯一的',
    },

    {
      title: '账户',
      dataIndex: 'userAccount',
      valueType: 'textarea',
    },

    {
      title: '昵称',
      dataIndex: 'userName',
      valueType: 'textarea',
    },

    {
      title: '头像',
      dataIndex: 'userAvater',
      valueType: 'textarea',
      render: (_, record) => {
        const url = record.userAvatar;

        return (
          <Space>
            <img src={url} alt="img" style={{ width: '30px', height: '30px' }} />
          </Space>
        );
      },
    },

    {
      title: '微信开放平台id',
      dataIndex: 'unionId',
      copyable: true,
      ellipsis: true,
    },

    {
      title: '公众号id',
      dataIndex: 'mpOpenId',
      copyable: true,
      ellipsis: true,
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
          case 'admin':
            tagColor = 'green';
            userRole = '管理员';
            break;
          case 'user':
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
      title: '介绍',
      dataIndex: 'userProfile',
      ellipsis: true,
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
        <a
          key="update"
          onClick={() => {
            handleUpdateModalOpen(true);
          }}
        >
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
          const res = await listUserByPageUsingPOST({
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
          pageSize: 5,
          onChange: (page) => console.log(page),
        }}
        //
        dateFormatter="string"
        headerTitle="用户信息"
        toolBarRender={() => [
          // <Button key="show">查看日志</Button>,

          <Button
            key="button"
            onClick={() => {
              handleModalOpen(true);
            }}
            type="primary"
          >
            新增用户
          </Button>,
        ]}
      />

      {/* 新增记录表单 */}
      <ModalForm
        title="新增用户"
        width="400px"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async (value) => {
          const success = await addUserUsingPOST(value as API.User);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          name="userName"
          label="账户"
          placeholder="请输入账户名"
          initialValue="账户"
          required
          rules={[
            { required: true, message: '账户不能为空' },
            { min: 4, max: 20, message: '账户名输入不正确' },
          ]}
        />
        <ProFormTextArea width="md" name="desc" />
      </ModalForm>

      {/* 遮罩层 */}
      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default UserList;
