import {LogoutOutlined, SettingOutlined, UserOutlined} from '@ant-design/icons';
import {useEmotionCss} from '@ant-design/use-emotion-css';
import {Link, useModel} from '@umijs/max';
import {Button, message} from 'antd';
import React from 'react';
import HeaderDropdown from '../HeaderDropdown';
import {userLogoutUsingPOST} from "@/services/memory-api/userController";


export type GlobalHeaderRightProps = {
  menu?: boolean;
  children?: React.ReactNode;
};

export const AvatarName = () => {
  const { initialState } = useModel('@@initialState');
  const { loginUser } = initialState || {};

  return <span className="anticon">{loginUser?.userName}</span>;
};

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({menu, children}) => {
  const actionClassName = useEmotionCss(({token}) => {
    return {
      display: 'flex',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      alignItems: 'center',
      padding: '0 8px',
      cursor: 'pointer',
      borderRadius: token.borderRadius,
      '&:hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });

  const {initialState} = useModel('@@initialState');
  // 登出
  const logout = () => {
    userLogoutUsingPOST()
      .then(() => {
          message.success("退出登录成功");
          window.location.reload();
        }
      )
  };

  // 未登录
  const unLoading = (
    <span>
      <span>
              <h6>还未登录</h6>
      </span>
      <span className={actionClassName}>
        <Link to="/user/login">
        <Button type="primary" ghost>
          去登录
        </Button>
      </Link>
      </span>
    </span>
  );

  // 如果用户未登录
  if (!initialState) {
    return unLoading;
  }

  const {loginUser} = initialState;
  if (!loginUser || !loginUser.userAvatar) {
    return unLoading;
  }

  const menuItems = [
    ...(menu
      ? [
        {
          key: 'center',
          icon: <UserOutlined/>,
          label: '个人中心',
        },
        {
          key: 'settings',
          icon: <SettingOutlined/>,
          label: '个人设置',
        },
        {
          type: 'divider' as const,
        },
      ]
      : []),
    {
      key: 'logout',
      icon: <LogoutOutlined/>,
      label: '退出登录',
    },
  ];

  return (
    <HeaderDropdown
      menu={{
        selectedKeys: [],
        onClick: logout,
        items: menuItems,
      }}
    >
      {children}
    </HeaderDropdown>
  );
};
