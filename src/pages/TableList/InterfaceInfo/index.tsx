import { listInterfaceInfoByPageUsingPOST } from '@/services/memory-api/interfaceInfoController';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Space, Tag } from 'antd';
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

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

const columns: ProColumns<API.InterfaceInfoQueryRequest>[] = [
  {
    title: 'id',
    dataIndex: 'id',
    copyable: true,
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
    valueType: 'select',
    valueEnum: {
      all: { text: '超长'.repeat(50) },
      open: {
        text: '未解决',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
        disabled: true,
      },
      processing: {
        text: '解决中',
        status: 'Processing',
      },
    },
  },

  {
    title: '接口状态',
    dataIndex: 'status',
    filters: true,
    onFilter: true,
    valueEnum: {
      0: {
        text: '开放',
        status: 'success',
      },
      1: {
        text: '异常',
        status: 'error',
        disabled: true,
      },
      2: {
        text: '解决中',
        status: 'Processing',
      },
    },
  },
  {
    disable: true,
    title: '接口方法',
    dataIndex: 'method',
    valueType: 'select',
    renderFormItem: (_, { defaultRender }) => {
      return defaultRender(_);
    },
    render: (_, record) => (
      <Space>
        <Tag color={'green'} key={record?.method}>
          {record?.method}
        </Tag>
      </Space>
    ),
  },
  // `id` bigint n
  // `name` varcha
  // `description`
  // `url` varchar
  // `requestHeade
  // `responseHead
  // `userId` bigi
  // `status` int
  // `method` varc
  // `createTime`
  // `updateTime`
  // `isDelete` ti
  {
    title: '创建人',
    dataIndex: 'userId',
    copyable: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'date',
    hideInSearch: true,
  },

  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          // action?.startEditable?.(record.id);
        }}
      >
        更新
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        删除
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

export default () => {
  return (
    <ProTable<GithubIssueItem>
      columns={columns}
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
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
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
        <Button key="button" icon={<PlusOutlined />} onClick={() => {}} type="primary">
          新增接口
        </Button>,
        //
        <Dropdown
          key="menu"
          menu={{
            items: [
              {
                label: '1st item',
                key: '1',
              },
              {
                label: '2nd item',
                key: '1',
              },
              {
                label: '3rd item',
                key: '1',
              },
            ],
          }}
        >
          <Button>
            <EllipsisOutlined />
          </Button>
        </Dropdown>,
      ]}
    />
  );
};
