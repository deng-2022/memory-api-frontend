// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getCurrentUser GET /api/user/current */
export async function getCurrentUserUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCurrentUserUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUser_>('/api/user/current', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getPage GET /api/user/listPage */
export async function getPageUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponsePageUser_>('/api/user/listPage', {
    method: 'GET',
    ...(options || {}),
  });
}

/** userLogin POST /api/user/login */
export async function userLoginUsingPOST(
  body: API.UserLoginRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUser_>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** adminLogin POST /api/user/login/admin */
export async function adminLoginUsingPOST(
  body: API.UserLoginRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUser_>('/api/user/login/admin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getLoginUser GET /api/user/loginUser */
export async function getLoginUserUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseUser_>('/api/user/loginUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** userLogout POST /api/user/logout */
export async function userLogoutUsingPOST(
  body: API.Code2Session,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseString_>('/api/user/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** userRegister POST /api/user/register */
export async function userRegisterUsingPOST(
  body: API.UserRegisterRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** userUpdate POST /api/user/update */
export async function userUpdateUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userUpdateUsingPOSTParams,
  body: API.User,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseString_>('/api/user/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}
