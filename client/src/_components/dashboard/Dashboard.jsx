import { useRecoilState } from 'recoil';
import React ,{useEffect, useState } from 'react';
import { dashboardGPAAtom, studentsAtom, scoreAtom, profileAtom } from '_state';
import { BachComponent } from '_components/subcomponents';
import { InfoCircleOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { GPADash } from '_components/dashboard';
import { StatisticBoard } from '_components/dashboard';
import { Row, Col, Card, Button } from 'antd';
import { useStudentScoreAction } from '_actions';
import { useClassWrapper } from '_helpers';

export { Dashboard };


function Dashboard() {
    const [student, setstudent] = useRecoilState(studentsAtom);
    const [score, setScore] = useRecoilState(scoreAtom);
    const classWrapper = useClassWrapper();
    const studentScoreAction = useStudentScoreAction();
    const userData = JSON.parse(localStorage.getItem("userData"));
    // const [profile,setProfile] = useRecoilState(profileAtom);

    const [dashProperties, setDashProperties] = useState({
        className: "Không hiển thị được tên lớp",
        teacherName: "Không hiển thị được tên CVHT",
        studentCount: 0,
        studentThieuTinChi: 0,
        studentThieuHocPhi: 0,
        classID: ""
    })

    useEffect(() =>{
        console.log("Reconstruct GPADash")
        async function initDashboard() {
            var classNameTemp = classWrapper.curClass.class_name;
            var classIDTemp = classWrapper.curClass.class_id;
            var teacherNameTemp = userData.name;
            var studentCountTemp = 0;
            var studentThieuTinChiTemp = 0;
            var studentThieuHocPhiTemp = 0;
            if ("length" in student) studentCountTemp = student.length;
            if (score!= null) {
                if (score!= "You are not teacher in this class")  {
                    console.log(score);
                    score.forEach(object => {
                        if (object.status.includes("Chưa nộp học phí")) studentThieuHocPhiTemp++;
                        if (object.status.includes("Chưa đủ tín")) studentThieuTinChiTemp++;
                    })
                }
            }
            // console.log(student);
            setDashProperties({
                className : classNameTemp,
                teacherName : teacherNameTemp,
                studentCount : studentCountTemp,
                studentThieuTinChi: studentThieuTinChiTemp,
                studentThieuHocPhi: studentThieuHocPhiTemp,
                classID : classIDTemp
            });
        };
        initDashboard();
    },[classWrapper.curClass]);

    return (
        <div className="page-content" style={{ overflow: 'auto' }}>
            <div className="page-header">
                <h2>Dashboard</h2>
            </div>

            {/* Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
                <div className="stat-card" style={{ borderLeftColor: '#4CAF50' }}>
                    <div style={{ fontSize: '20px', marginBottom: '8px' }}>👥</div>
                    <div className="stat-number" style={{ color: '#4CAF50' }}>{dashProperties.studentCount}</div>
                    <div className="stat-label">Sĩ số lớp</div>
                    <Link to={`/${dashProperties.classID}/studentinfo`} style={{ fontSize: '13px', color: '#4CAF50', marginTop: '8px', display: 'inline-block' }}>Xem danh sách →</Link>
                </div>
                <div className="stat-card" style={{ borderLeftColor: '#FF9800' }}>
                    <div style={{ fontSize: '20px', marginBottom: '8px' }}>⚠️</div>
                    <div className="stat-number" style={{ color: '#FF9800' }}>{dashProperties.studentThieuTinChi}</div>
                    <div className="stat-label">Thiếu tín chỉ</div>
                    <Link to={`/${dashProperties.classID}/studentscore`} style={{ fontSize: '13px', color: '#FF9800', marginTop: '8px', display: 'inline-block' }}>Xem tình trạng →</Link>
                </div>
                <div className="stat-card" style={{ borderLeftColor: '#E53935' }}>
                    <div style={{ fontSize: '20px', marginBottom: '8px' }}>💰</div>
                    <div className="stat-number" style={{ color: '#E53935' }}>{dashProperties.studentThieuHocPhi}</div>
                    <div className="stat-label">Thiếu học phí</div>
                    <Link to={`/${dashProperties.classID}/studentscore`} style={{ fontSize: '13px', color: '#E53935', marginTop: '8px', display: 'inline-block' }}>Xem tình trạng →</Link>
                </div>
                <div className="stat-card" style={{ borderLeftColor: '#42A5F5' }}>
                    <div style={{ fontSize: '20px', marginBottom: '8px' }}>📊</div>
                    <div className="stat-number" style={{ color: '#42A5F5' }}>{dashProperties.className}</div>
                    <div className="stat-label">Lớp hiện tại</div>
                    <span style={{ fontSize: '13px', color: '#757575', marginTop: '8px', display: 'inline-block' }}>CVHT: {dashProperties.teacherName}</span>
                </div>
            </div>

            {/* Charts */}
            <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: '24px' }}>
                <h3 style={{ marginBottom: '16px', fontWeight: 600 }}>Biểu đồ GPA</h3>
                <GPADash score={score} />
            </div>

            {/* Warning Table */}
            <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <h3 style={{ marginBottom: '16px', fontWeight: 600 }}>Bảng cảnh báo học vụ</h3>
                <StatisticBoard score={score} />
            </div>
        </div>
    )
}