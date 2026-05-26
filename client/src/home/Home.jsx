import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { useAuthWrapper, useClassWrapper } from '_helpers';
import { classPickerVisibleAtom } from '_state';
import { Redirect } from 'react-router-dom';
import { Button } from 'antd';
import {
    MessageOutlined,
    BellOutlined,
    InfoCircleOutlined,
    DashboardOutlined,
    TableOutlined,
    UploadOutlined,
    UserOutlined,
    AppstoreOutlined
} from '@ant-design/icons';
import { useUserActions } from '_actions';

export { Home };

function Home() {
    const [drawerVisible, setDrawerVisible] = useRecoilState(classPickerVisibleAtom);
    const authWrapper = useAuthWrapper();
    const userData = JSON.parse(localStorage.getItem("userData"));
    const [studentFirstClassLoaded, setStudentFirstClassLoaded] = useState(false);
    const classWrapper = useClassWrapper();
    const userActions = useUserActions();

    const onClick = () => {
        classWrapper.getClassList();
        setDrawerVisible(true);
    };

    useEffect(() => {
        async function loadFirstClassForStudent() {
            if (userData.role == "student") {
                await classWrapper.chooseClassById(null);
                setStudentFirstClassLoaded(true);
            }
        }
        loadFirstClassForStudent();
    });

    const shortcuts = [
        { to: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard', color: '#42A5F5' },
        { to: 'studentscore', icon: <TableOutlined />, label: 'Bảng điểm', color: '#66BB6A' },
        { to: '/chat', icon: <MessageOutlined />, label: 'Tin nhắn', color: '#7E57C2', absolute: true },
        { to: 'feed', icon: <BellOutlined />, label: 'Diễn đàn', color: '#FF9800' },
        { to: 'studentinfo', icon: <InfoCircleOutlined />, label: 'Thông tin SV', color: '#26C6DA' },
        { to: '/dbportal', icon: <UploadOutlined />, label: 'Quản lý CSDL', color: '#78909C', absolute: true },
        { to: '/profile', icon: <UserOutlined />, label: 'Hồ sơ cá nhân', color: '#42A5F5', absolute: true },
    ];

    return (userData.role && <>
        {userData.role === "teacher" &&
            <div className="page-content">
                <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>
                    Xin chào, {userData.name}! 👋
                </h2>

                <div className="welcome-card">
                    <div className="welcome-info">
                        <h4>Vai trò</h4>
                        <h3>Cố vấn học tập</h3>
                        <div style={{ marginTop: '12px' }}>
                            <h4>Lớp hiện tại</h4>
                            <h3>{classWrapper.curClass ? classWrapper.curClass.class_name : "Vui lòng chọn lớp để bắt đầu"}</h3>
                        </div>
                    </div>
                    <Button type="primary" onClick={onClick} icon={<AppstoreOutlined />} size="large" style={{ borderRadius: '8px' }}>
                        {classWrapper.curClass ? "Đổi lớp" : "Chọn lớp"}
                    </Button>
                </div>

                {classWrapper.curClass &&
                    <div className="shortcut-grid">
                        {shortcuts.map((item, idx) => (
                            <Link
                                key={idx}
                                to={item.absolute ? item.to : `/${classWrapper.curClass.class_id}/${item.to}`}
                                className="shortcut-card"
                                style={{ borderTopColor: item.color }}
                            >
                                <div className="shortcut-icon" style={{ color: item.color }}>{item.icon}</div>
                                <div className="shortcut-label">{item.label}</div>
                            </Link>
                        ))}
                    </div>
                }
            </div>
        }

        {userData.role === "student" && <>
            {(studentFirstClassLoaded && !classWrapper.curClass) &&
                <div className="page-content" style={{ textAlign: 'center', paddingTop: '60px' }}>
                    <h2>Xin chào, bạn chưa có lớp!</h2>
                    <p style={{ color: '#757575' }}>Vui lòng liên hệ với admin hệ thống và nhà trường để được thêm vào trang lớp học của bạn.</p>
                </div>
            }
        </>}

        {(studentFirstClassLoaded && classWrapper.curClass) &&
            <Redirect from="*" to="/stuhome" />
        }

        {userData.role === "admin" &&
            <div className="page-content" style={{ textAlign: 'center', paddingTop: '60px' }}>
                <h2>Xin chào Admin!</h2>
            </div>
        }
    </>);
}
