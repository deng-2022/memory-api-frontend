import { getPageUsingGET1 } from '@/services/pic-memories/wallpaperController';
import { PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Space } from 'antd';
import React from 'react';

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

const WallpaperList: React.FC = () => {
  const columns: ProColumns<API.Wallpaper>[] = [
    // createTime?: string;
    // downloads?: number;
    // isDelete?: number;
    // likes?: number;
    // status?: number;
    // tags?: string;
    // type?: number;
    // updateTime?: string;
    // uploadDate?: string;
    // userId?: number;
    // wallpaperDescription?: string;
    // wallpaperId?: number;
    // wallpaperName?: string;
    // wallpaperUrl?: string;

    {
      title: 'id',
      dataIndex: 'wallpaperId',
      copyable: true,
      hideInForm: true,
      width: 140,
    },
    {
      title: '壁纸名称',
      dataIndex: 'wallpaperName',
      copyable: true,
      ellipsis: true,
    },
    {
      title: '壁纸描述',
      dataIndex: 'wallpaperDescription',
      ellipsis: true,
      valueType: 'textarea',
    },
    // {
    //   title: '壁纸地址',
    //   dataIndex: 'wallpaperUrl',
    //   width: 200, // 设置宽度为 80
    //   ellipsis: true,
    //   copyable: true,
    //   render: (_, record) => {
    //     let url = record.wallpaperUrl;

    //     return (
    //       <Space>
    //         <a href={url} target="_blank" rel="noopener noreferrer">
    //           {url}
    //         </a>
    //       </Space>
    //     );
    //   },
    // },
    {
      title: '壁纸详情',
      dataIndex: 'avatar',
      valueType: 'textarea',
      render: (_, record) => {
        const url = record.wallpaperUrl;

        return (
          <Space>
            <a href={url} target="_blank" rel="noopener noreferrer">
              <img src={url} alt="img" style={{ width: '150px' }} />
            </a>
          </Space>
        );
      },
    },

    {
      title: '上传用户',
      dataIndex: 'userId',
      ellipsis: true,
      copyable: true,
    },
    {
      title: '获赞数',
      dataIndex: 'likes',
      width: 80,
    },
    {
      title: '下载量',
      dataIndex: 'downloads',
      width: 80,
    },
    {
      title: '上传时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm: true,
      width: 160,
    },

    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (_, record) => {
        return (
          <Space>
            <a
              onClick={async () => {
                // const res = await getInterfaceInfoByIdUsingGET(Number(record.id));
                // if (res.data) {
                //   setInterfaceInfo(res.data);
                // }
                // handleUpdateModalOpen(true);
              }}
            >
              更新
            </a>
            <a
              onClick={async () => {
                // const res = await deleteInterfaceInfoUsingPOST(Number(record.id));
                // if (res.data) {
                //   message.success('删除接口信息成功');
                // } else {
                //   message.error('删除接口信息失败');
                // }
              }}
            >
              删除
            </a>
          </Space>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.Wallpaper>
        cardBordered
        request={async (params: { pageSize?: number; current?: number; keyword?: string }) => {
          const res = await getPageUsingGET1({
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
        headerTitle="接口信息"
        toolBarRender={() => [
          // <Button key="show">查看日志</Button>,

          <Button
            key="button"
            onClick={() => {
              // handleModalOpen(true);
            }}
            type="primary"
          >
            新增壁纸
          </Button>,
        ]}
      />
    </PageContainer>
  );
};

export default WallpaperList;
