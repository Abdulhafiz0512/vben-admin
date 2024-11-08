<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { Page } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getExampleTableApi } from '#/api';

interface RowType {
  createdAt: string;
  id: string;
  text: string;
  updatedAt: string;
}

const formOptions: VbenFormProps = {
  // 默认展开
  collapsed: false,
  schema: [
    {
      component: 'Input',
      defaultValue: '1',
      fieldName: 'id',
      label: 'ID',
    },
    {
      component: 'Input',
      fieldName: 'text',
      label: 'Text',
    },
  ],
  // 控制表单是否显示折叠按钮
  showCollapseButton: true,
  // 按下回车时是否提交表单
  submitOnEnter: false,
};

const gridOptions: VxeGridProps<RowType> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: [
    { field: 'id', title: 'ID', width: 50 },
    { field: 'text', title: 'Text' },
    { field: 'createdAt', formatter: 'formatDateTime', title: 'Create Date' },
    { field: 'updatedAt', formatter: 'formatDateTime', title: 'Updated Date' },
    {
      field: 'action',
      fixed: 'right',
      slots: { default: 'action' },
      title: 'Actions',
    },
  ],
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        message.success(`Query params: ${JSON.stringify(formValues)}`);
        return await getExampleTableApi({
          page: page.currentPage,
          pageSize: page.pageSize,
        });
      },
    },
  },
};

const [Grid] = useVbenVxeGrid({ formOptions, gridOptions });
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #action>
        <Button type="link">edit</Button>
      </template>
    </Grid>
  </Page>
</template>
