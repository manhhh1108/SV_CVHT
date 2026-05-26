import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useUserActions } from '_actions';
import { useAuthWrapper } from '_helpers';
import { MailOutlined } from '@ant-design/icons';

export { PasswordRecover };

function PasswordRecover({ history }) {
    const userActions = useUserActions();
    const authWrapper = useAuthWrapper();

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Vui lòng nhập email'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    async function onSubmit(data) {
        await authWrapper.forgetPassword(data);
    }

    return (
        <div className="login-page">
            <div className="login-card" style={{ background: '#FFFFFF', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', padding: '40px', width: '420px', textAlign: 'center' }}>
                <div className="login-logo" style={{ marginBottom: '8px' }}><img src="/logo.jpg" alt="Logo" style={{ height: '64px' }} /></div>
                <div className="login-title" style={{ fontSize: '24px', fontWeight: 700, color: '#333333', marginBottom: '4px' }}>Khôi phục tài khoản</div>
                <div className="login-subtitle" style={{ fontSize: '14px', color: '#757575', marginBottom: '32px' }}>Nhập email đã đăng ký với tài khoản của bạn</div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div style={{ marginBottom: '24px', textAlign: 'left' }}>
                        <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#757575', zIndex: 1 }}>
                                <MailOutlined />
                            </span>
                            <input
                                name="email"
                                type="text"
                                {...register('email')}
                                placeholder="Email"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                style={{ height: '44px', borderRadius: '8px', paddingLeft: '36px', width: '100%', border: '1px solid #E0E0E0', fontSize: '14px' }}
                            />
                        </div>
                        <div className="invalid-feedback">{errors.email?.message}</div>
                    </div>
                    <button
                        disabled={isSubmitting}
                        style={{ width: '100%', height: '44px', fontSize: '16px', fontWeight: 600, borderRadius: '8px', background: '#4CAF50', color: '#FFFFFF', border: 'none', cursor: 'pointer' }}
                    >
                        {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Khôi phục
                    </button>
                    <div style={{ marginTop: '16px' }}>
                        <Link to="login" style={{ color: '#757575', fontSize: '14px' }}>Quay lại đăng nhập</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
