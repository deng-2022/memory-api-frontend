import Footer from '@/components/Footer';
import { Question, SelectLang } from '@/components/RightContent';
import { LinkOutlined } from '@ant-design/icons';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history, Link } from '@umijs/max';
import { AvatarDropdown, AvatarName } from './components/RightContent/AvatarDropdown';
import { errorConfig } from './requestErrorConfig';
<<<<<<< HEAD
import { getLoginUserUsingGET } from './services/pic-memories/userController';
=======
import { getLoginUserUsingGET } from './services/memory-api/userController';
>>>>>>> dea6872 (前端框架构建完成 用户信息获取 接口信息获取完成)
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
const registerPath = '/user/register';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */

// 当页面首次加载时，获取全局保存数据
const state: InitialState = {
  loginUser: undefined,
};

export async function getInitialState(): Promise<InitialState> {
  // 1.获取当前用户登录态
  try {
    const res = await getLoginUserUsingGET();

    if (res.data) {
      state.loginUser = res.data;
    }
  } catch (error) {
    history.push(loginPath);
  }
  return state;
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    actionsRender: () => [<Question key="doc" />, <SelectLang key="SelectLang" />],
    // 获取头像
    avatarProps: {
      src: initialState?.loginUser?.userAvatar,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    // 获取水印
    waterMarkProps: {
      content: initialState?.loginUser?.userName,
    },
    // 获取脚标
    footerRender: () => <Footer />,
    // 监测登录状态
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，且非登录/注册页面，重定向到 login
      if (
        initialState?.loginUser &&
        location.pathname !== loginPath &&
        location.pathname !== registerPath
      ) {
        console.log(initialState?.loginUser);
        // message.error(`${location.pathname}`);
        // history.push(loginPath);
      }
    },
    // 布局背景色
    layoutBgImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    // 接口文档
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    // childrenRender: (children) => {
    //   // if (initialState?.loading) return <PageLoading />;
    //   return (
    //     <>
    //       {children}
    //       <SettingDrawer
    //         disableUrlParams
    //         enableDarkTheme
    //         settings={initialState?.settings}
    //         onSettingChange={(settings) => {
    //           setInitialState((preInitialState) => ({
    //             ...preInitialState,
    //             settings,
    //           }));
    //         }}
    //       />
    //     </>
    //   );
    // },
    // ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig,
};
