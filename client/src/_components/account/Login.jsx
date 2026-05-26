import { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useUserActions } from '_actions';
import { authAtom } from '_state';
import { useRecoilValue } from 'recoil';
import { useAuthWrapper } from '_helpers';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export { Login };

function Login(props) {
    const userActions = useUserActions();
    const auth = useRecoilValue(authAtom);
    const authWrapper = useAuthWrapper();
    const [loginDone, setLoginDone] = useState(false);

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Vui lòng điền tên người dùng'),
        password: Yup.string().required('Vui lòng điền mật khẩu')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    useEffect(() => {
        async function loadUser() {
            await authWrapper.loadUser();
            setLoginDone(true);
        }
        if (auth) loadUser();
        else userActions.logout();
    }, [auth]);

    return (loginDone ?
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        :
        <div className="login-page">
            <div className="login-card" style={{ background: '#FFFFFF', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', padding: '40px', width: '420px', textAlign: 'center' }}>
                <div className="login-logo" style={{ marginBottom: '8px' }}><img src="/logo.jpg" alt="Logo" style={{ height: '64px' }} /></div>
                <div className="login-title" style={{ fontSize: '24px', fontWeight: 700, color: '#333333', marginBottom: '4px' }}>Student Advisor</div>
                <div className="login-subtitle" style={{ fontSize: '14px', color: '#757575', marginBottom: '32px' }}>Đăng nhập hệ thống</div>

                <form onSubmit={handleSubmit(userActions.login)}>
                    <div style={{ marginBottom: '16px', textAlign: 'left' }}>
                        <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#757575', zIndex: 1 }}>
                                <UserOutlined />
                            </span>
                            <input
                                name="username"
                                type="text"
                                {...register('username')}
                                placeholder="Tài khoản"
                                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                style={{ height: '44px', borderRadius: '8px', paddingLeft: '36px', width: '100%', border: '1px solid #E0E0E0', fontSize: '14px' }}
                            />
                        </div>
                        <div className="invalid-feedback">{errors.username?.message}</div>
                    </div>
                    <div style={{ marginBottom: '24px', textAlign: 'left' }}>
                        <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#757575', zIndex: 1 }}>
                                <LockOutlined />
                            </span>
                            <input
                                name="password"
                                type="password"
                                {...register('password')}
                                placeholder="Mật khẩu"
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                style={{ height: '44px', borderRadius: '8px', paddingLeft: '36px', width: '100%', border: '1px solid #E0E0E0', fontSize: '14px' }}
                            />
                        </div>
                        <div className="invalid-feedback">{errors.password?.message}</div>
                    </div>
                    <button
                        disabled={isSubmitting}
                        style={{ width: '100%', height: '44px', fontSize: '16px', fontWeight: 600, borderRadius: '8px', background: '#4CAF50', color: '#FFFFFF', border: 'none', cursor: 'pointer' }}
                    >
                        {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Đăng nhập
                    </button>
                    <div style={{ marginTop: '16px' }}>
                        <Link to="passwordrecover" style={{ color: '#757575', fontSize: '14px' }}>Quên mật khẩu?</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
