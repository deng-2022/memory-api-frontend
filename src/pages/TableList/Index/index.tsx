import React, {useEffect, useState} from 'react';
import {Avatar, Card, List, message} from 'antd';
import {listInterfaceInfoByPageUsingPOST} from "@/services/memory-api/interfaceInfoController";
import Search from "antd/es/input/Search";
import {SearchProps} from "antd/lib/input";
import {Link} from "@@/exports";

const {Meta} = Card;

const InterfaceInfoList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<API.InterfaceInfo[]>([]);
  const [total, setTotal] = useState<number>(0);
  // 加载接口列表
  const loadData = async (current = 1, pageSize = 5) => {
    setLoading(true);
    try {
      const res = await listInterfaceInfoByPageUsingPOST({
        current,
        pageSize,
      });
      setList(res?.data?.records ?? []);
      setTotal(res?.data?.total ?? 0);
    } catch (error: any) {
      message.error('请求失败，' + error.message);
    }
    setLoading(false);
  };

  // 钩子
  useEffect(() => {
    loadData();
    console.log('???')
  }, []);

  // 执行搜索
  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

  return (
    <div>
      <Card
        title="搜索你想要的接口服务"
        hoverable
        style={{
          width: 1200, height: 150, margin: 30, marginLeft: 70,
        }}
      >
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
      </Card>

      <List
        itemLayout="horizontal"
        dataSource={list}
        grid={{gutter: 16, column: 5}}
        renderItem={(item) => (
          <List.Item>
            <Link to={`/interfaceInfo/${item.id}`}>
              <Card
                hoverable
                style={{width: 240,height:410}}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
              >
                <Card.Meta title={item.name} description={item.description}/>
              </Card>
            </Link>
          </List.Item>
        )}
      />
    </div>
  )
}


export default InterfaceInfoList;

// import { PageContainer } from '@ant-design/pro-components';
// import React, { useEffect, useState } from 'react';
// import { List, message } from 'antd';
// import { listInterfaceInfoByPageUsingPOST } from '@/services/memory-api/interfaceInfoController';
//
// /**
//  * 主页
//  * @constructor
//  */
// const Index: React.FC = () => {
//   const [loading, setLoading] = useState(false);
//   const [list, setList] = useState<API.InterfaceInfo[]>([]);
//   const [total, setTotal] = useState<number>(0);
//
//   const loadData = async (current = 1, pageSize = 5) => {
//     setLoading(true);
//     try {
//       const res = await listInterfaceInfoByPageUsingPOST({
//         current,
//         pageSize,
//       });
//       setList(res?.data?.records ?? []);
//       setTotal(res?.data?.total ?? 0);
//     } catch (error: any) {
//       message.error('请求失败，' + error.message);
//     }
//     setLoading(false);
//   };
//
//   useEffect(() => {
//     loadData();
//     console.log('???')
//   }, []);
//
//   return (
//     <PageContainer title="在线接口开放平台">
//       <List
//         className="my-list"
//         loading={loading}
//         itemLayout="horizontal"
//         dataSource={list}
//         renderItem={(item) => {
//           const apiLink = `/interfaceInfo/${item.id}`;
//           return (
//             <List.Item actions={[<a key={item.id} href={apiLink}>查看</a>]}>
//               <List.Item.Meta
//                 title={<a href={apiLink}>{item.name}</a>}
//                 description={item.description}
//               />
//             </List.Item>
//           );
//         }}
//
//         pagination={{
//           // eslint-disable-next-line @typescript-eslint/no-shadow
//           showTotal(total: number) {
//             return '总数：' + total;
//           },
//           pageSize: 5,
//           total,
//           onChange(page, pageSize) {
//             loadData(page, pageSize);
//           },
//         }}
//       />
//     </PageContainer>
//   );
// };
//
// export default Index;
