import {
  addInterfaceInfoUsingPOST,
  deleteInterfaceInfoUsingPOST,
  getInterfaceInfoByIdUsingGET,
  listInterfaceInfoByPageUsingPOST, offlineInterfaceInfoUsingPOST, onlineInterfaceInfoUsingPOST,
  updateInterfaceInfoUsingPOST,
} from '@/services/memory-api/interfaceInfoController';
import {
  ActionType,
  ModalForm,
  PageContainer,
  ProColumns,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import {Button, message, Space, Tag} from 'antd';
import React, {useRef, useState} from 'react';

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

const InterfaceInfoList: React.FC = () => {
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);

  const [createUpdateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);

  const [interfaceInfo, setInterfaceInfo] = useState<API.InterfaceInfo | null>(null);

  const actionRef = useRef<ActionType>();

  /**
   * 发布接口
   *
   * @param record
   */
  const handleOnline = async ({record}: { record: API.IdRequest }) => {
    const hide = message.loading('发布中');
    if (!record) return true;
    try {
      await onlineInterfaceInfoUsingPOST({
        id: record.id
      });
      hide();
      message.success('操作成功');
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('操作失败，' + error.message);
      return false;
    }
  };

  /**
   * 下线接口
   *
   * @param record
   */
  const handleOffline = async (record: API.IdRequest) => {
    const hide = message.loading('发布中');
    if (!record) return true;
    try {
      await offlineInterfaceInfoUsingPOST({
        id: record.id
      });
      hide();
      message.success('操作成功');
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('操作失败，' + error.message);
      return false;
    }
  };

  const columns: ProColumns<API.InterfaceInfoQueryRequest>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      copyable: true,
      hideInForm: true,
      width: 140,
    },
    {
      title: '接口名称',
      dataIndex: 'name',
      copyable: true,
      ellipsis: true,
    },

    {
      title: '接口描述',
      dataIndex: 'description',
      ellipsis: true,
      valueType: 'textarea',
    },
    {
      title: '接口地址',
      dataIndex: 'url',
      width: 200, // 设置宽度为 80
      ellipsis: true,
      copyable: true,
      render: (_, record) => {
        let url = record.url;

        return (
          <Space>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {url}
            </a>
          </Space>
        );
      },
    },

    {
      title: '接口状态',
      dataIndex: 'status',
      filters: true,
      onFilter: true,
      hideInForm: true,
      valueEnum: {
        1: {
          text: '正常',
          status: 'success',
        },
        0: {
          text: '异常',
          status: 'error',
        },
      },
    },
    {
      title: '接口方法',
      disable: true,
      dataIndex: 'method',
      valueType: 'select',
      filters: true,
      onFilter: true,
      valueEnum: {
        GET: {
          text: 'GET',
          status: 'success',
        },
        POST: {
          text: 'POST',
          status: 'success',
        },
      },

      render: (_, record) => {
        let color = 'grey';

        switch (record?.method) {
          case 'GET':
            color = 'green';
            break;
          case 'POST':
            color = 'blue';
            break;
        }

        return (
          <Space>
            <Tag color={color} key={record?.method}>
              {record?.method}
            </Tag>
          </Space>
        );
      },
    },
    {
      title: '请求头',
      dataIndex: 'requestHeader',
      ellipsis: true,
    },

    {
      title: '响应头',
      dataIndex: 'responseHeader',
      ellipsis: true,
    },
    {
      title: '请求参数',
      dataIndex: 'requestParams',
      valueType: 'jsonCode',
    },
    {
      title: '创建人',
      dataIndex: 'userId',
      ellipsis: true,
      copyable: true,
    },

    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm: true,
      width: 160,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (_, record) => [
        // eslint-disable-next-line react/jsx-key
        <a
          onClick={async () => {
            const res = await getInterfaceInfoByIdUsingGET(Number(record.id));
            if (res.data) {
              setInterfaceInfo(res.data);
            }
            handleUpdateModalOpen(true);
          }}
        >
          更新
        </a>,
        // eslint-disable-next-line react/jsx-key
        <a
          onClick={async () => {
            const res = await deleteInterfaceInfoUsingPOST(Number(record.id));
            if (res.data) {
              message.success('删除接口信息成功');
            } else {
              message.error('删除接口信息失败');
            }
          }}
        >
          删除
        </a>,
        record.status === 0 ? <a
          key="config"
          onClick={() => {
            handleOnline({record: record});
          }}
        >
          发布
        </a> : null,
        record.status === 1 ? <Button
          type="text"
          key="config"
          danger
          onClick={() => {
            handleOffline(record);
          }}
        >
          下线
        </Button> : null,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.InterfaceInfo>
        cardBordered
        request={async (params: { pageSize?: number; current?: number; keyword?: string }) => {
          const res = await listInterfaceInfoByPageUsingPOST({
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
        headerTitle="接口信息"
        toolBarRender={() => [
          // <Button key="show">查看日志</Button>,

          <Button
            key="button"
            onClick={() => {
              handleModalOpen(true);
            }}
            type="primary"
          >
            新增接口
          </Button>,
        ]}
      />

      <ModalForm
        name="addInterfaceInfo"
        title="新增接口表单"
        width="600px"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async (value) => {
          const success = await addInterfaceInfoUsingPOST(value as API.InterfaceInfo);
          if (success) {
            console.log('addInterfaceInfo表单提交');
            message.success('新增接口成功');
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          name="name"
          label="接口名称"
          placeholder="请输入接口名称"
          required
          rules={[{required: true, message: '接口名称不能为空'}]}
        />
        <ProFormTextArea
          name="description"
          label="接口描述"
          placeholder="请输入接口描述"
          required
          rules={[{required: true, message: '接口描述不能为空'}]}
        />
        <ProFormText
          name="url"
          label="接口地址"
          placeholder="请输入接口地址"
          required
          rules={[{required: true, message: '账户不能为空'}]}
        />
        <ProFormText
          name="requestHeader"
          label="请求头"
          placeholder="请输入请求头"
          required
          rules={[{required: true, message: '请求头不能为空'}]}
        />
        <ProFormText
          name="responseHeader"
          label="响应头"
          placeholder="请输入请求头"
          required
          rules={[{required: true, message: '响应头不能为空'}]}
        />
        <ProFormText
          name="userTd"
          label="创建人"
          placeholder="请输入创建人"
          required
          rules={[{required: true, message: '创建人不能为空'}]}
        />
        <ProFormRadio.Group
          name="method"
          label="请求类型"
          placeholder="请选择请求类型"
          required
          options={['GET', 'POST']}
          rules={[{required: true, message: '请求类型不能为空'}]}
        />
      </ModalForm>

      <ModalForm
        name="updateInterfaceInfo"
        title="更新接口表单"
        width="600px"
        open={createUpdateModalOpen}
        onOpenChange={handleUpdateModalOpen}
        onFinish={async (value) => {
          const additionalData = {
            // 添加额外的数据
            id: interfaceInfo?.id,
          };

          const formData = {
            ...value, // 表单数据
            ...additionalData, // 额外的数据
          };
          const success = await updateInterfaceInfoUsingPOST(formData as API.InterfaceInfo);
          if (success) {
            console.log('updateInterfaceInfo表单提交');
            message.success('更新接口成功');

            handleUpdateModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
          // window.location.reload(); // 刷新页面
        }}
      >
        <ProFormText
          name="name"
          label="接口名称"
          initialValue={interfaceInfo?.name}
          placeholder="请输入接口名称"
          required
          rules={[{required: true, message: '接口名称不能为空'}]}
        />
        <ProFormTextArea
          name="description"
          label="接口描述"
          initialValue={interfaceInfo?.description}
          placeholder="请输入接口描述"
          required
          rules={[{required: true, message: '接口描述不能为空'}]}
        />
        <ProFormText
          name="url"
          label="接口地址"
          initialValue={interfaceInfo?.url}
          placeholder="请输入接口地址"
          required
          rules={[{required: true, message: '账户不能为空'}]}
        />
        <ProFormText
          name="requestHeader"
          label="请求头"
          initialValue={interfaceInfo?.requestHeader}
          placeholder="请输入请求头"
          required
          rules={[{required: true, message: '请求头不能为空'}]}
        />
        <ProFormText
          name="responseHeader"
          label="响应头"
          initialValue={interfaceInfo?.responseHeader}
          placeholder="请输入请求头"
          required
          rules={[{required: true, message: '响应头不能为空'}]}
        />
        <ProFormText
          name="userTd"
          label="创建人"
          initialValue={interfaceInfo?.userId}
          placeholder="请输入创建人"
          required
          rules={[{required: true, message: '创建人不能为空'}]}
        />
        <ProFormRadio.Group
          name="method"
          label="请求类型"
          placeholder="请选择请求类型"
          value={interfaceInfo?.method}
          options={['GET', 'POST']}
          rules={[{required: true, message: '请求类型不能为空'}]}
        />
      </ModalForm>
    </PageContainer>
  );
};

export default InterfaceInfoList;
