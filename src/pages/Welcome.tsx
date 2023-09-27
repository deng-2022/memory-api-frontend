import { PageContainer } from '@ant-design/pro-components';
import { Card, theme } from 'antd';
import React from 'react';

/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */
const InfoCard: React.FC<{
  title: string;
  index: number;
  desc: string;
  href: string;
}> = ({ title, href, index, desc }) => {
  const { useToken } = theme;

  const { token } = useToken();

  return (
    <div
      style={{
        backgroundColor: token.colorBgContainer,
        boxShadow: token.boxShadow,
        borderRadius: '8px',
        fontSize: '14px',
        color: token.colorTextSecondary,
        lineHeight: '22px',
        padding: '16px 19px',
        minWidth: '220px',
        flex: 1,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            lineHeight: '22px',
            backgroundSize: '100%',
            textAlign: 'center',
            padding: '8px 16px 16px 12px',
            color: '#FFF',
            fontWeight: 'bold',
            backgroundImage:
              "url('https://gw.alipayobjects.com/zos/bmw-prod/daaf8d50-8e6d-4251-905d-676a24ddfa12.svg')",
          }}
        >
          {index}
        </div>
        <div
          style={{
            fontSize: '16px',
            color: token.colorText,
            paddingBottom: 8,
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          fontSize: '14px',
          color: token.colorTextSecondary,
          textAlign: 'justify',
          lineHeight: '22px',
          marginBottom: 8,
        }}
      >
        {desc}
      </div>
      <a href={href} target="_blank" rel="noreferrer">
        了解更多 {'>'}
      </a>
    </div>
  );
};

const Welcome: React.FC = () => {
  const { token } = theme.useToken();
  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,
        }}
      >
        <div
          style={{
            backgroundPosition: '100% -30%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '274px auto',
            backgroundImage:
              "url('https://gw.alipayobjects.com/mdn/rms_a9745b/afts/img/A*BuFmQqsB2iAAAAAAAAAAAAAAARQnAQ')",
          }}
        >
          <div
            style={{
              fontSize: '20px',
              color: token.colorTextHeading,
            }}
          >
            欢迎使用 Memory API接口开放平台
          </div>

          <p
            style={{
              fontSize: '14px',
              color: token.colorTextSecondary,
              lineHeight: '22px',
              marginTop: 16,
              marginBottom: 32,
              width: '65%',
            }}
          >
            Memory API接口开放平台是提供 API 接口供开发者调用的平台，基于 SpringBoot 后端 + React 前端的 全栈微服务项目
            管理员可以接入并发布接口，统计分析各接口的调用情况；用户可以注册登录并开通接口调用权限、浏览接口、在线调试，还能使用 客户端 SDK 轻松在代码中调用接口
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <InfoCard
              index={1}
              title="我的 Gitee 主页"
              href="https://gitee.com/deng-2022"
              desc="我的Gitee主页上开源了多个个人项目，包括Memory聚合搜索平台、MemoryChat通信交友平台、Memory伙伴匹配系统、Memory用户中心和PicMemories壁纸下载小程序等，为用户提供多样化的功能和服务，并搭建了我的个人博客"
            />
            <InfoCard
              index={2}
              href="https://deng-2022.gitee.io/blog/"
              title="了解 开发者Memory"
              desc="我是一名在校大三学生，对互联网行业充满浓厚的兴趣，尤其对后端开发具有热情。每天的学习与工作总结，是我不断提升技能和知识的重要方式。点击 ”了解更多“ 可跳转至我的个人博客首页"
            />
            <InfoCard
              index={3}
              title="我的 GitHub 主页"
              href="https://procomponents.ant.design"
              desc="我的GitHub主页上开源了多个个人项目，包括Memory聚合搜索平台、MemoryChat通信交友平台、Memory伙伴匹配系统、Memory用户中心和PicMemories壁纸下载小程序等，为用户提供多样化的功能和服务。"
            />
          </div>
        </div>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
