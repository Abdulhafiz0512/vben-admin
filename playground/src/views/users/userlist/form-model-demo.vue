<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';

defineOptions({
  name: 'FormModelDemo',
});

function onSubmit(values: Record<string, any>) {
  message.info(JSON.stringify(values)); // 只会执行一次
}

const [Form, formApi] = useVbenForm({
  handleSubmit: onSubmit,
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: 'name',
      },
      fieldName: 'field1',
      label: 'Name:',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: 'email',
      },
      fieldName: 'field2',
      label: 'Email',
    },
    {
      component: 'Select',
      componentProps: {
        options: [
          { label: 'USER', value: '1' },
          { label: 'ADMIN', value: '2' },
          { label: 'SUPER ADMIN', value: '3' },
        ],
        placeholder: 'Role',
      },
      fieldName: 'field3',
      label: 'Role',
      rules: 'required',
    },
  ],
  showDefaultActions: false,
});

const [Modal, modalApi] = useVbenModal({
  fullscreenButton: false,
  onCancel() {
    modalApi.close();
  },
  onConfirm: async () => {
    await formApi.submitForm();
    modalApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const { values } = modalApi.getData<Record<string, any>>();
      if (values) {
        formApi.setValues(values);
      }
    }
  },
  title: 'Edit User',
});
</script>
<template>
  <Modal>
    <Form />
  </Modal>
</template>
