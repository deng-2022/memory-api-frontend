// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getUserByUrl GET /api/upload/user */
export async function getUserByUrlUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserByUrlUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUser_>('/api/upload/user', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
