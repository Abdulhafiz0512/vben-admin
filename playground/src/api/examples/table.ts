import { requestClient } from '#/api/request';

export namespace DemoTableApi {
  export interface PageFetchParams {
    [key: string]: any;
    page: number;
    pageSize: number;
  }
}

/**
 * 获取示例表格数据
 */
async function getExampleTableApi(params: DemoTableApi.PageFetchParams) {
  return requestClient.get('https://gis.my.kube.uz/api/user/getUsers', {
    params,
  });
}

export { getExampleTableApi };

async function getTable(url: string) {
  return requestClient.get(url);
}

export { getTable };
