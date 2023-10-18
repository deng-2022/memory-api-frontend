import {PageContainer} from '@ant-design/pro-components';
import React, {useEffect, useState} from 'react';
import {Button, Card, Descriptions, Form, message, Input, Divider, TabsProps, Table} from 'antd';
import {
  getInterfaceInfoByIdUsingGET,
  invokeInterfaceInfoUsingPOST,
} from '@/services/memory-api/interfaceInfoController';
import {useParams} from '@@/exports';
import {Tabs} from 'antd';
import {ApiOutlined} from '@ant-design/icons';

/**
 * 主页
 * @constructor
 */
const InterfaceInvoke: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfo>();
  const [invokeRes, setInvokeRes] = useState<any>();
  const [invokeLoading, setInvokeLoading] = useState(false);

  const params = useParams();

  const loadData = async () => {
    if (!params.id) {
      message.error('参数不存在');
      return;
    }
    setLoading(true);
    try {
      const res = await getInterfaceInfoByIdUsingGET({
        id: Number(params.id),
      });
      setData(res.data);
    } catch (error: any) {
      message.error('请求失败，' + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // 调用接口
  const onFinish = async (values: any) => {
    if (!params.id) {
      message.error('接口不存在');
      return;
    }
    setInvokeLoading(true);
    try {
      const res = await invokeInterfaceInfoUsingPOST({
        id: params.id,
        ...values,
      });
      setInvokeRes(res.data);
      message.success('请求成功');
    } catch (error: any) {
      message.error('操作失败，' + error.message);
    }
    setInvokeLoading(false);
  };

  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];

  // 请求参数说明
  const requestColumns = [
    {
      title: '参数说明',
      dataIndex: 'param',
      key: 'param',
    },
    {
      title: '必选',
      dataIndex: 'errorCode',
      key: 'errorCode',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  // 响应参数说明
  const responseColumns = [
    {
      title: '参数说明',
      dataIndex: 'param',
      key: 'param',
    },
    {
      title: '必选',
      dataIndex: 'errorCode',
      key: 'errorCode',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  // 错误码参照
  const errorColumns = [
    {
      title: '参数名称',
      dataIndex: 'param',
      key: 'param',
    },
    {
      title: '错误码',
      dataIndex: 'errorCode',
      key: 'errorCode',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  return (
    <PageContainer title="查看接口文档">
      <Card hoverable>
        {data ? (
          <Descriptions title={data.name} column={1}>
            <Descriptions.Item label="接口状态">{data.status ? '开启' : '关闭'}</Descriptions.Item>
            <Descriptions.Item label="描述">{data.description}</Descriptions.Item>
            <Descriptions.Item label="请求地址">{data.url}</Descriptions.Item>
            <Descriptions.Item label="请求方法">{data.method}</Descriptions.Item>
            <Descriptions.Item label="请求参数">{data.requestParams}</Descriptions.Item>
            <Descriptions.Item label="请求头">{data.requestHeader}</Descriptions.Item>
            <Descriptions.Item label="响应头">{data.responseHeader}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
            <Descriptions.Item label="更新时间">{data.updateTime}</Descriptions.Item>
          </Descriptions>
        ) : (
          <>接口不存在</>
        )}
      </Card>

      <Card
        title="查看开发者文档来了解如何调用该接口"
        hoverable
        style={{marginTop: 30}}
      >
        <a>接口在线文档: 随机名言</a>
      </Card>


      <Card hoverable title="在线测试" style={{marginTop: 30}}>
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              label: `在线调试工具`,
              key: '1',
              children:
                <Form name="invoke" layout="vertical" onFinish={onFinish}>
                  <Form.Item label="请求参数" name="userRequestParams">
                    <Input.TextArea/>
                  </Form.Item>
                  <Form.Item wrapperCol={{span: 16}}>
                    <Button type="primary" htmlType="submit">
                      调用
                    </Button>
                  </Form.Item>
                </Form>,
            },
            {
              label: 'API 文档',
              key: '2',
              children:[
                <Table dataSource={dataSource} columns={requestColumns}/>,
                <Table dataSource={dataSource} columns={responseColumns}/>
              ]
          },
            {
              label: '错误码参照',
              key: '3',
              children:
                <Table dataSource={dataSource} columns={errorColumns}/>
            },
            {
              label: '示例代码',
              key: '4',
              children: 'Tab 3',
            },
          ]}
        />
      </Card>

      <Card hoverable title="返回结果" style={{marginTop: 30}} loading={invokeLoading}>
        {invokeRes}
      </Card>
    </PageContainer>
  );
};

export default InterfaceInvoke;
