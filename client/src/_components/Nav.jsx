import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authAtom } from '_state';
import { useClassWrapper } from '../_helpers/class-wrapper';
import { useUserActions } from '_actions';
import 'antd/dist/antd.css';
import { Layout, Menu, Divider } from 'antd';
import {
  HomeOutlined,
  MessageOutlined,
  BellOutlined,
  InfoCircleOutlined,
  UserOutlined,
  DashboardOutlined,
  TableOutlined,
  LogoutOutlined,
  UploadOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

export { Nav };

function Nav(props) {
    var classID = props.classID ? props.classID : "";
    const location = useLocation();
    const userActions = useUserActions();
    const classWrapper = useClassWrapper();
    const auth = props.auth;
    var userData = JSON.parse(localStorage.getItem("userData"));

    useEffect(() => {
        console.log(location.pathname);
        console.log("NAV constructing ", classID);
        userData = JSON.parse(localStorage.getItem("userData"));
    }, []);

    if (!auth) return null;

    const iconStyle = (color) => ({
        fontSize: '20px',
        color: color,
    });

    return (
        <Sider
            width={240}
            style={{
                overflow: 'auto',
                height: 'calc(100vh - 64px)',
                position: 'sticky',
                top: 64,
                left: 0,
                background: '#FFFFFF',
                borderRight: '1px solid #E0E0E0',
            }}
        >
            <Menu
                mode="inline"
                selectedKeys={[location.pathname]}
                style={{ background: '#FFFFFF', borderRight: 'none', paddingTop: '8px' }}
            >
                {!classWrapper.curClass &&
                    <Menu.Item key="/" icon={<HomeOutlined style={iconStyle('#4CAF50')} />}>
                        <span>Trang chủ</span>
                        <Link to="/"></Link>
                    </Menu.Item>
                }

                {classWrapper.curClass && <>
                    {userData.role == "teacher" &&
                        <Menu.Item key={`/${classWrapper.curClass.class_id}/`} icon={<HomeOutlined style={iconStyle('#4CAF50')} />}>
                            <span>Trang chủ</span>
                            <Link to={`/${classWrapper.curClass.class_id}/`}></Link>
                        </Menu.Item>
                    }
                    {userData.role == "student" &&
                        <Menu.Item key="/stuhome" icon={<HomeOutlined style={iconStyle('#4CAF50')} />}>
                            <span>Trang chủ</span>
                            <Link to="/stuhome"></Link>
                        </Menu.Item>
                    }

                    {userData.role == "teacher" && <>
                        <Menu.Item key={`/${classWrapper.curClass.class_id}/dashboard`} icon={<DashboardOutlined style={iconStyle('#42A5F5')} />}>
                            <span>Dashboard</span>
                            <Link to={`/${classWrapper.curClass.class_id}/dashboard`}></Link>
                        </Menu.Item>
                        <Menu.Item key="/chat" icon={<MessageOutlined style={iconStyle('#7E57C2')} />}>
                            <span>Tin nhắn</span>
                            <Link to="/chat"></Link>
                        </Menu.Item>
                    </>}

                    <Menu.Item key={`/${classWrapper.curClass.class_id}/feed`} icon={<BellOutlined style={iconStyle('#FF9800')} />}>
                        <span>Diễn đàn</span>
                        <Link to={`/${classWrapper.curClass.class_id}/feed`}></Link>
                    </Menu.Item>

                    {userData.role == "teacher" &&
                        <Menu.Item key={`/${classWrapper.curClass.class_id}/studentinfo`} icon={<InfoCircleOutlined style={iconStyle('#26C6DA')} />}>
                            <span>Thông tin SV</span>
                            <Link to={`/${classWrapper.curClass.class_id}/studentinfo`}></Link>
                        </Menu.Item>
                    }
                    {userData.role == "teacher" &&
                        <Menu.Item key={`/${classWrapper.curClass.class_id}/studentscore`} icon={<TableOutlined style={iconStyle('#66BB6A')} />}>
                            <span>Bảng điểm SV</span>
                            <Link to={`/${classWrapper.curClass.class_id}/studentscore`}></Link>
                        </Menu.Item>
                    }
                    {userData.role == "student" &&
                        <Menu.Item key="/personalscore" icon={<UserOutlined style={iconStyle('#66BB6A')} />}>
                            <span>Bảng điểm cá nhân</span>
                            <Link to="/personalscore"></Link>
                        </Menu.Item>
                    }
                </>}

                {userData?.role === "teacher" &&
                    <Menu.Item key="/dbportal" icon={<UploadOutlined style={iconStyle('#78909C')} />}>
                        <span>Quản lý CSDL</span>
                        <Link to="/dbportal"></Link>
                    </Menu.Item>
                }

                <Menu.Item key="/profile" icon={<UserOutlined style={iconStyle('#42A5F5')} />}>
                    <span>Hồ sơ cá nhân</span>
                    <Link to="/profile"></Link>
                </Menu.Item>

                <Divider style={{ margin: '8px 16px', minWidth: 'auto', width: 'calc(100% - 32px)' }} />

                <Menu.Item key="logout" onClick={userActions.logout} icon={<LogoutOutlined style={iconStyle('#E53935')} />} danger>
                    <span>Đăng xuất</span>
                </Menu.Item>
            </Menu>
        </Sider>
    );
}
