import { Layout , Form, Avatar, Input, DatePicker, Button, Switch } from 'antd';
import { ConsoleSqlOutlined, UserOutlined} from '@ant-design/icons';
import moment from 'moment';
import {useEffect} from 'react';
import { pickBy, identity } from 'lodash';
import {useRecoilState} from 'recoil';


import { useProfileAction } from '_actions';
import { alertBachAtom } from '_state';
import { useState } from 'react';

import locale from 'antd/es/date-picker/locale/vi_VN';
import { ConfigProvider } from 'antd';


export{ ProfileForm}

const Background = {
    background: 'linear-gradient(135deg, #E8F5E9 0%, #FFFFFF 100%)',
    height : '160px',
    borderRadius: '12px 12px 0 0',
}
const avatarStyle = {
    backgroundColor: '#4CAF50',
    height: '100px',
    width: '100px',
    border: '4px solid #FFFFFF',
    boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
}

const dateFormat = 'DD/MM/YYYY';

const { Header, Content } = Layout;


function ProfileForm(props) {
    const profileAction = useProfileAction(); 
    const [form] = Form.useForm();
    const [alert, setAlert] = useRecoilState(alertBachAtom);
    const [passwordSwitch, setPasswordSwitch] = useState(false);
    const [submitButtonLoading, setSubmitButtonLoading] = useState(false);
    const userData = JSON.parse(localStorage.getItem("userData"));
    let data = props.data;
    let isTable = props.isTable;
    console.log(data);

    if (data == null) {
        profileAction.getMyProfile().then( newData =>{
                console.log('set new data here!!!!!');
                data = newData;
            }
        )
    }

    const onChangePassSwitch = () => {
        setPasswordSwitch(!passwordSwitch)
    }

    useEffect (() => {
        if (data !== undefined){
            // data = profile;
            form.resetFields();
        }
        
    },[data])

    // useEffect (() => {
    //     form.resetFields();
    // },[data])

    function formatDate(timestamp) {
        let formatedDateOfBirth = moment.utc(timestamp).format("DD/MM/YYYY") ;
        return formatedDateOfBirth
    }

    const cancelEdit = () => {
        setAlert({message: "Thành công", description: "Đã cập nhật lại các thông tin !"});
        form.resetFields();
    }     

    const handleSubmit = async () => {
        try {
			setSubmitButtonLoading(true)
            let values = await form.validateFields();
            const changedFields =  pickBy(values, identity);
			console.log("CHANGEFIELD")
			console.log(changedFields);
          	if(changedFields.date_of_birth) {
                let timestamp = moment(changedFields.date_of_birth, 'DD/MM/YYYY').format('x');
                console.log(timestamp);
                changedFields.date_of_birth = timestamp;
          	}
          	console.log(changedFields);
          	await profileAction.handleSubmit(changedFields, data.vnu_id, isTable);
			setSubmitButtonLoading(false);
        } catch (e) {
            setAlert({message: "Lỗi", description: e});
        }
    }

    return (
        (data)?
        <div className="page-content">
            <div style={{ background: '#FFFFFF', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', overflow: 'hidden', maxWidth: '720px', margin: '0 auto' }}>
                <div style={Background}></div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-50px', marginBottom: '16px' }}>
                    <Avatar
                        style={avatarStyle}
                        src={"https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png"}
                        icon={<UserOutlined />}
                    />
                </div>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <h3 style={{ margin: '0 0 4px 0', fontWeight: 700, color: '#333333' }}>{data.name}</h3>
                    <span style={{ color: '#757575', fontSize: '14px' }}>{data.role == 'teacher' ? "Cố vấn học tập" : "Sinh viên"}</span>
                </div>
                <div style={{ padding: '0 32px 32px' }}>
                    <Form
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                        form={form}
                    >
                        <Form.Item label="Họ và tên" name="name">
                            <Input defaultValue={data.name} />
                        </Form.Item>
                        <Form.Item label="VNU ID" name="vnu_id">
                            {(userData.role=='student') &&
                                <Input disabled defaultValue={data.vnu_id} />
                            }
                            {(userData.role=='teacher') &&
                                <Input defaultValue={data.vnu_id} />
                            }
                        </Form.Item>
                        <Form.Item label="Ngày sinh" name="date_of_birth">
                            <DatePicker placeholder="Chọn ngày" defaultValue={moment(formatDate(data.date_of_birth), dateFormat)} format={dateFormat} />
                        </Form.Item>
                        <Form.Item label="Email" name="email">
                            <Input defaultValue={data.email} />
                        </Form.Item>
                        <Form.Item label="Số điện thoại" name="phone_number">
                            <Input defaultValue={data.phone_number} />
                        </Form.Item>
                        {(data.role=='student') &&
                            <Form.Item label="SĐT phụ huynh" name="parent_number">
                                <Input defaultValue={data.parent_number} />
                            </Form.Item>
                        }
                        <Form.Item label="Địa chỉ" name="location">
                            <Input defaultValue={data.location} />
                        </Form.Item>
                        <Form.Item label="Đổi mật khẩu" name="password_switch">
                            <Switch
                                checked={passwordSwitch}
                                checkedChildren="Có"
                                unCheckedChildren="Không"
                                onChange={onChangePassSwitch}
                            />
                        </Form.Item>
                        {passwordSwitch && <>
                            <Form.Item label="Mật khẩu cũ" name="old_password">
                                <Input.Password defaultValue={""} />
                            </Form.Item>
                            <Form.Item label="Mật khẩu mới" name="new_password">
                                <Input.Password defaultValue={""} />
                            </Form.Item>
                        </>}
                        <Form.Item wrapperCol={{ offset: 8, span: 14 }}>
                            <Button type="primary" htmlType="submit" onClick={handleSubmit} loading={submitButtonLoading} style={{ marginRight: '16px' }}>
                                Thay đổi
                            </Button>
                            <Button onClick={cancelEdit}>
                                Hoàn tác
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
        :<></>
    )
}