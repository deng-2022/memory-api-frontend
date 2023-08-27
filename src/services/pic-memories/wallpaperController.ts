// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getPage GET /api/wallpaper/listPage */
export async function getPageUsingGET1(options?: { [key: string]: any }) {
  return request<API.BaseResponsePageWallpaper_>('/api/wallpaper/listPage', {
    method: 'GET',
    ...(options || {}),
  });
}

/** getPageByLike GET /api/wallpaper/listPage/like */
export async function getPageByLikeUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseListWallpaper_>('/api/wallpaper/listPage/like', {
    method: 'GET',
    ...(options || {}),
  });
}

/** getPageByTime GET /api/wallpaper/listPage/time */
export async function getPageByTimeUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseListWallpaper_>('/api/wallpaper/listPage/time', {
    method: 'GET',
    ...(options || {}),
  });
}

/** getPageByType GET /api/wallpaper/listPage/type */
export async function getPageByTypeUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPageByTypeUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListWallpaper_>('/api/wallpaper/listPage/type', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getTagsByUrl GET /api/wallpaper/tags */
export async function getTagsByUrlUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTagsByUrlUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListString_>('/api/wallpaper/tags', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getUserByUrl GET /api/wallpaper/user */
export async function getUserByUrlUsingGET1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserByUrlUsingGET1Params,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUser_>('/api/wallpaper/user', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
