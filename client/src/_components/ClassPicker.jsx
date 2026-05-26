import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Card, Row, Col, Modal, Form, Input, Button, Drawer } from 'antd';
import { useRecoilState } from 'recoil';
import { classesAtom } from '_state';
import { useClassWrapper } from '_helpers';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

export { ClassPicker };

function ClassPicker(props) {
    const classWrapper = useClassWrapper();
    const [classes, setClasses] = useRecoilState(classesAtom);
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);

    const showModal = () => { setVisible(true); };

    const handleOk = (values) => {
        setConfirmLoading(true);
        classWrapper.createClass(values.class_name);
        setVisible(false);
        setConfirmLoading(false);
    };

    var drawerVisible = props.drawerVisible;
    var setDrawerVisible = props.setDrawerVisible;
    var onDrawerClose = props.onDrawerClose;
    var input = classWrapper.classes;

    let Cards = [];
    for (let i = 0; i < input.length; i++) {
        const isActive = classWrapper.curClass && classWrapper.curClass.class_id === input[i].class_id;
        Cards.push(
            <div key={input[i].class_id} style={{ marginBottom: '12px' }}
                onClick={() => { classWrapper.chooseClass(input[i]); }}>
                <Link to={"/" + input[i].class_id + "/"} onClick={onDrawerClose} style={{ textDecoration: 'none' }}>
                    <Card
                        hoverable
                        style={{
                            borderRadius: '12px',
                            border: isActive ? '2px solid #4CAF50' : '1px solid #E0E0E0',
                            background: isActive ? '#E8F5E9' : '#FFFFFF',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                                width: '48px', height: '48px', borderRadius: '12px',
                                background: isActive ? '#4CAF50' : '#42A5F5',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: '#FFFFFF', fontSize: '20px', fontWeight: 700
                            }}>
                                {(input[i].class_name || '?').charAt(0)}
                            </div>
                            <div>
                                <div style={{ fontWeight: 600, fontSize: '16px', color: '#333333' }}>{input[i].class_name || 'Unnamed'}</div>
                                <div style={{ fontSize: '13px', color: '#757575' }}>Lớp đại học</div>
                            </div>
                        </div>
                    </Card>
                </Link>
            </div>
        );
    }

    return (
        <Drawer title="Chọn lớp học" placement="right" onClose={onDrawerClose} visible={drawerVisible} width={400}>
            <CollectionCreateForm
                visible={visible}
                onCreate={handleOk}
                onCancel={() => { setVisible(false); }}
            />
            <div style={{ padding: '0' }}>
                {Cards}
                <Button
                    type="dashed"
                    onClick={showModal}
                    icon={<PlusOutlined />}
                    style={{ width: '100%', height: '48px', borderRadius: '12px', marginTop: '8px', color: '#4CAF50', borderColor: '#4CAF50' }}
                >
                    Tạo lớp mới
                </Button>
            </div>
        </Drawer>
    );
}

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
        <Modal
            animation={false}
            visible={visible}
            title="Tạo lớp học mới"
            okText="Tạo"
            cancelText="Hủy"
            onCancel={onCancel}
            onOk={() => {
                form.validateFields().then((values) => {
                    form.resetFields();
                    onCreate(values);
                }).catch((info) => {
                    console.log('Validate Failed:', info);
                });
            }}
        >
            <Form animation={false} form={form} layout="vertical" name="form_in_modal"
                initialValues={{ modifier: 'public' }}>
                <Form.Item name="class_name" label="Tên lớp:"
                    rules={[{ required: true, message: 'Vui lòng nhập tên lớp!' }]}>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};
