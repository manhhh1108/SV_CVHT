import { useRecoilState } from 'recoil';
import React ,{useEffect } from 'react';
import { UploadForm } from './UploadForm';
import { Row, Col } from 'antd';

export { DBPortal };

var upload_form_semester = [
    {
      title: 'Mã kỳ học',
      dataIndex: 'semester_id',
      key: 'semester_id',
    },
    {
      title: 'Tên kỳ học',
      dataIndex: 'semester_name',
      key: 'semester_name',
    },
    {
      title: 'Lỗi',
      dataIndex: 'error',
      key: 'error',
    },
  ];
  var upload_form_subject = [
    {
      title: 'Tên môn học',
      dataIndex: 'subject_name',
      key: 'subject_name',
    },
    {
      title: 'Mã môn học',
      dataIndex: 'subject_code',
      key: 'subject_code',
    },
    {
        title: 'Số tín chỉ',
        dataIndex: 'credits_number',
        key: 'credits_number',
      },
    {
      title: 'Lỗi',
      dataIndex: 'error',
      key: 'error',
    },
  ];

  var upload_score_student = [
    {
        title: 'Mã sinh viên',
        dataIndex: 'vnu_id',
        key: 'vnu_id',
    },
    {
        title: 'Mã môn học',
        dataIndex: 'subject_code',
        key: 'subject_code',
    },
    {
        title: 'Điểm',
        dataIndex: 'score',
        key: 'score',
    },
    {
        title: 'Mã kỳ học',
        dataIndex: 'semester_id',
        key: 'semester_id',
    },
    {
        title: 'Lỗi',
        dataIndex: 'error',
        key: 'error',
    },
  ]
  var upload_form_student = [
    {
      title: 'Ngày sinh',
      dataIndex: 'date_of_birth',
      key: 'date_of_birth',
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
        title: 'Vai trò',
        dataIndex: 'role',
        key: 'role',
    },
    {
        title: 'Quê quán',
        dataIndex: 'location',
        key: 'location',
    },
    {
        title: 'VNU-ID',
        dataIndex: 'vnu_id',
        key: 'vnu_id',
    },
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: 'Password',
        dataIndex: 'password',
        key: 'password',
    },
    {
        title: 'Giới tính',
        dataIndex: 'gender',
        key: 'gender',
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phone_number',
        key: 'phone_number',
    },
    {
      title: 'Lỗi',
      dataIndex: 'error',
      key: 'error',
    },
  ];
  var upload_form_teacher = [
    {
      title: 'Ngày sinh',
      dataIndex: 'date_of_birth',
      key: 'date_of_birth',
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
        title: 'Vai trò',
        dataIndex: 'role',
        key: 'role',
    },
    {
        title: 'VNU-ID',
        dataIndex: 'vnu_id',
        key: 'vnu_id',
    },
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: 'Password',
        dataIndex: 'password',
        key: 'password',
    },
    {
        title: 'Giới tính',
        dataIndex: 'gender',
        key: 'gender',
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phone_number',
        key: 'phone_number',
    },
    {
      title: 'Lỗi',
      dataIndex: 'error',
      key: 'error',
    },
  ];

  var upload_form_status = [
    {
        title: 'VNU-ID',
        dataIndex: 'vnu_id',
        key: 'vnu_id',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
    },
    
    {
        title: 'Lỗi',
        dataIndex: 'error',
        key: 'error',
    },

  ]
function DBPortal() {
    return (
        <div className="page-content">
            <div className="page-header">
                <h2>Quản lý cơ sở dữ liệu</h2>
            </div>
            <p style={{ color: '#757575', marginBottom: '24px' }}>Nơi tải lên dữ liệu sinh viên, điểm số, kì học dành cho Cố vấn học tập</p>

            <Row gutter={[24, 24]}>
                <Col span={8}>
                    <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', height: '100%' }}>
                        <h4 style={{ fontWeight: 600, marginBottom: '8px' }}>Danh sách CVHT</h4>
                        <p style={{ color: '#757575', fontSize: '13px', marginBottom: '16px' }}>Tải danh sách tài khoản và thông tin Cố vấn học tập lên hệ thống.</p>
                        <UploadForm columns={upload_form_teacher} formurl="http://localhost:3000/api/upload/dscv"/>
                    </div>
                </Col>
                <Col span={8}>
                    <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', height: '100%' }}>
                        <h4 style={{ fontWeight: 600, marginBottom: '8px' }}>Danh sách sinh viên</h4>
                        <p style={{ color: '#757575', fontSize: '13px', marginBottom: '16px' }}>Tải danh sách tài khoản và thông tin sinh viên lên hệ thống.</p>
                        <UploadForm columns={upload_form_student} formurl="http://localhost:3000/api/upload/dssv"/>
                        <p style={{ color: '#FF9800', fontSize: '12px', marginTop: '8px' }}><b>Lưu ý:</b> SV chưa được thêm lớp. CVHT tạo lớp và thêm tại Thông tin SV.</p>
                    </div>
                </Col>
                <Col span={8}>
                    <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', height: '100%' }}>
                        <h4 style={{ fontWeight: 600, marginBottom: '8px' }}>Danh sách môn học</h4>
                        <p style={{ color: '#757575', fontSize: '13px', marginBottom: '16px' }}>Tải danh sách môn học lên hệ thống.</p>
                        <UploadForm columns={upload_form_subject} formurl="http://localhost:3000/api/upload/dsmh"/>
                    </div>
                </Col>
            </Row>

            <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
                <Col span={8}>
                    <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', height: '100%' }}>
                        <h4 style={{ fontWeight: 600, marginBottom: '8px' }}>Danh sách kì học</h4>
                        <p style={{ color: '#757575', fontSize: '13px', marginBottom: '16px' }}>Tải danh sách kì học lên hệ thống.</p>
                        <UploadForm columns={upload_form_semester} formurl="http://localhost:3000/api/semesters/upload"/>
                    </div>
                </Col>
                <Col span={8}>
                    <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', height: '100%' }}>
                        <h4 style={{ fontWeight: 600, marginBottom: '8px' }}>Cập nhật bảng điểm</h4>
                        <p style={{ color: '#757575', fontSize: '13px', marginBottom: '16px' }}>Tải danh sách bảng điểm của sinh viên lên hệ thống.</p>
                        <UploadForm columns={upload_score_student} formurl="http://localhost:3000/api/scores/import"/>
                    </div>
                </Col>
                <Col span={8}>
                    <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', height: '100%' }}>
                        <h4 style={{ fontWeight: 600, marginBottom: '8px' }}>Cập nhật tình trạng</h4>
                        <p style={{ color: '#757575', fontSize: '13px', marginBottom: '16px' }}>Tải danh sách tình trạng sinh viên lên hệ thống.</p>
                        <UploadForm columns={upload_form_status} formurl="http://localhost:3000/api/status/import"/>
                    </div>
                </Col>
            </Row>
        </div>
    );
}