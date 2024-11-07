<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { Page, useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';
import { Pencil } from 'lucide-vue-next';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getExampleTableApi } from '#/api';

import FormModelDemo from './form-model-demo.vue';

interface RowType {
  createdAt: string;
  email: string;
  id: string;
  name: string;
  role: string;
  updatedAt: string;
}
const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: FormModelDemo,
});
function openFormModal() {
  formModalApi.setData({
    values: { field1: 'abc' },
  });
  formModalApi.open();
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
      fieldName: 'name',
      label: 'Name',
    },
    {
      component: 'Input',
      fieldName: 'email',
      label: 'Email',
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [
          {
            label: 'USER',
            value: '1',
          },
          {
            label: 'ADMIN',
            value: '2',
          },
          {
            label: 'SUPER ADMIN',
            value: '3',
          },
        ],
        placeholder: 'Role',
      },
      fieldName: 'role',
      label: 'Role',
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
    { field: 'name', title: 'Name' },
    { field: 'email', title: 'Email' },
    { field: 'role', title: 'Role' },
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
        <FormModal />
        <Button type="primary" @click="openFormModal">
          <Pencil size="16px" />
        </Button>
      </template>
    </Grid>
  </Page>
</template>
