import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useClassWrapper } from '_helpers';
import {
    MessageOutlined,
    BellOutlined,
    InfoCircleOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { useUserActions } from '_actions';

export { StuHome };

function StuHome() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const classWrapper = useClassWrapper();
    const userActions = useUserActions();
    const [teacherState, setTeacherState] = useState({
        name: '', email: '', role: 'teacher', gender: '',
        phone_number: '', vnu_id: '',
    });

    useEffect(() => {
        console.log("Reconstruct StuHome");
        async function initStuHome() {
            var response = await classWrapper.getCurrentClassTeacherInfo();
            console.log(response);
            if ("vnu_id" in response) {
                setTeacherState(response);
            }
        }
        initStuHome();
    }, []);

    const shortcuts = [
        { to: `/${classWrapper.curClass?.class_id}/feed`, icon: <BellOutlined />, label: 'Diễn đàn', color: '#FF9800' },
        { to: `/chat/${teacherState.vnu_id}`, icon: <MessageOutlined />, label: 'Nhắn tin CVHT', color: '#7E57C2' },
        { to: '/personalscore', icon: <InfoCircleOutlined />, label: 'Bảng điểm cá nhân', color: '#66BB6A' },
        { to: '/profile', icon: <UserOutlined />, label: 'Hồ sơ cá nhân', color: '#42A5F5' },
    ];

    return (userData.role && <>
        {userData.role === "student" &&
            <div className="page-content">
                <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>
                    Xin chào, {userData.name}! 👋
                </h2>

                <div className="welcome-card" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    <div className="welcome-info" style={{ marginBottom: '16px' }}>
                        <h4>Vai trò</h4>
                        <h3>Sinh viên</h3>
                        <div style={{ marginTop: '12px' }}>
                            <h4>Lớp hiện tại</h4>
                            <h3>{classWrapper.curClass ? classWrapper.curClass.class_name : "Chưa có lớp"}</h3>
                        </div>
                    </div>
                    {teacherState.name &&
                        <div style={{ borderTop: '1px solid #E0E0E0', paddingTop: '16px', width: '100%' }}>
                            <h4 style={{ color: '#757575', fontSize: '14px', margin: '0 0 4px 0' }}>Cố vấn học tập</h4>
                            <h3 style={{ margin: '0 0 8px 0' }}>{teacherState.name}</h3>
                            <span style={{ color: '#757575', fontSize: '14px' }}>
                                📞 {teacherState.phone_number} &nbsp;&nbsp; 📧 {teacherState.email}
                            </span>
                        </div>
                    }
                </div>

                {classWrapper.curClass &&
                    <div className="shortcut-grid">
                        {shortcuts.map((item, idx) => (
                            <Link key={idx} to={item.to} className="shortcut-card" style={{ borderTopColor: item.color }}>
                                <div className="shortcut-icon" style={{ color: item.color }}>{item.icon}</div>
                                <div className="shortcut-label">{item.label}</div>
                            </Link>
                        ))}
                    </div>
                }
            </div>
        }
    </>);
}
