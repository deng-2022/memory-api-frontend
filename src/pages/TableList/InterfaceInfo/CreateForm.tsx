import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Modal } from 'antd';
import React from 'react';

export type Props = {
  columns: ProColumns<API.InterfaceInfo>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  visible: boolean;
};

const CreateModal: React.FC<Props> = (props) => {
  const { visible, columns, onCancel, onSubmit } = props;

  return (
    <Modal visible={visible} footer={null} onCancel={() => onCancel?.()} title="查询接口信息">
      <ProTable
        // 设置表单的标题
        type="form"
        columns={columns}
        onSubmit={(value) => {
          onSubmit?.(value);
        }}
        onReset={() => {
          console.log('表单已重置'); // 表单重置的回调函数
        }}
      />
    </Modal>
  );
};

export default CreateModal;

