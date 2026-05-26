# UI/UX Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign toàn bộ giao diện Student Management theo phong cách friendly & colorful (Google Classroom style), giữ nguyên business logic và dependencies.

**Architecture:** CSS override approach - tạo global.css override Ant Design classes, sau đó rewrite JSX từng component để áp dụng layout mới. Mỗi task sửa 1-2 files, build verify sau mỗi task.

**Tech Stack:** React 17, Ant Design 4, Recoil, Recharts (giữ nguyên)

**Build command:** `cd client && NODE_OPTIONS=--openssl-legacy-provider npm run build`

**Dev server:** `cd client && NODE_OPTIONS=--openssl-legacy-provider npm start` (port 3000)

**Lưu ý quan trọng:** Project không có test suite. Mỗi task PHẢI verify bằng build thành công + kiểm tra visual trên browser. KHÔNG được thay đổi bất kỳ business logic nào (state, API calls, routing paths, event handlers).

---

## File Structure

```
client/src/
├── theme/
│   └── global.css              # NEW - Design tokens + Ant Design overrides
├── index.css                    # MODIFY - import global.css
├── App.jsx                      # MODIFY - Layout structure (Header, Content wrapper)
├── _components/
│   ├── Nav.jsx                  # MODIFY - White sidebar, colored icons
│   ├── ClassPicker.jsx          # MODIFY - New card styles
│   ├── account/
│   │   └── Login.jsx            # MODIFY - Centered card, new styling
│   ├── dashboard/
│   │   └── Dashboard.jsx        # MODIFY - Stat cards grid, remove wrapper
│   ├── feed/
│   │   ├── Feed.jsx             # MODIFY - Layout spacing
│   │   └── Feed.css             # MODIFY - Post card styles
│   ├── studentScoreList/
│   │   └── StudentScore-table.js # MODIFY - Score color coding, table style
│   ├── studentInfoList/
│   │   └── StudentInfoList-table.js # MODIFY - Table style
│   ├── profile/
│   │   └── Profile.jsx          # MODIFY - Centered card layout
│   └── dbportal/
│       └── DBPortal.jsx         # MODIFY - Tabs layout
├── home/
│   ├── Home.jsx                 # MODIFY - Shortcut cards grid
│   └── StuHome.jsx              # MODIFY - Shortcut cards grid
```

---

### Task 1: Create Global Theme CSS

**Files:**
- Create: `client/src/theme/global.css`
- Modify: `client/src/index.css`

- [ ] **Step 1: Create theme/global.css with design tokens and Ant Design overrides**

```css
/* ===== DESIGN TOKENS ===== */
:root {
  --color-primary: #4CAF50;
  --color-primary-light: #E8F5E9;
  --color-primary-dark: #2E7D32;
  --color-primary-hover: #43A047;
  --color-secondary: #FF9800;
  --color-danger: #E53935;
  --color-info: #42A5F5;
  --color-bg: #F5F5F5;
  --color-card: #FFFFFF;
  --color-text: #333333;
  --color-text-secondary: #757575;
  --color-border: #E0E0E0;
  --color-zebra: #FAFAFA;
  --radius-card: 12px;
  --radius-btn: 8px;
  --radius-pill: 24px;
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.12);
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.12);
  --transition: all 0.2s ease;
}

/* ===== GLOBAL RESETS ===== */
body {
  background: var(--color-bg) !important;
  color: var(--color-text);
}

/* ===== ANT DESIGN OVERRIDES ===== */

/* Header */
.ant-layout-header {
  background: var(--color-card) !important;
  box-shadow: var(--shadow-sm);
  padding: 0 24px !important;
  height: 64px;
  line-height: 64px;
  z-index: 100;
}

/* Sidebar / Sider */
.ant-layout-sider {
  background: var(--color-card) !important;
  border-right: 1px solid var(--color-border);
  box-shadow: none !important;
}
.ant-layout-sider .ant-layout-sider-trigger {
  display: none;
}
.ant-menu {
  background: var(--color-card) !important;
  border-right: none !important;
}
.ant-menu-dark {
  background: var(--color-card) !important;
}
.ant-menu-dark .ant-menu-item {
  color: var(--color-text) !important;
  margin: 4px 8px !important;
  border-radius: var(--radius-btn) !important;
  height: 44px !important;
  line-height: 44px !important;
}
.ant-menu-dark .ant-menu-item:hover {
  background: var(--color-bg) !important;
}
.ant-menu-dark .ant-menu-item-selected {
  background: var(--color-primary-light) !important;
  border-left: 3px solid var(--color-primary) !important;
  color: var(--color-primary-dark) !important;
  font-weight: 600;
}
.ant-menu-dark .ant-menu-item a {
  color: inherit !important;
}

/* Buttons */
.ant-btn {
  border-radius: var(--radius-btn) !important;
  transition: var(--transition);
}
.ant-btn-primary {
  background: var(--color-primary) !important;
  border-color: var(--color-primary) !important;
}
.ant-btn-primary:hover,
.ant-btn-primary:focus {
  background: var(--color-primary-hover) !important;
  border-color: var(--color-primary-hover) !important;
}

/* Cards */
.ant-card {
  border-radius: var(--radius-card) !important;
  box-shadow: var(--shadow-sm) !important;
  border: none !important;
  transition: var(--transition);
}
.ant-card:hover {
  box-shadow: var(--shadow-md) !important;
}
.ant-card-head {
  border-radius: var(--radius-card) var(--radius-card) 0 0 !important;
}

/* Inputs */
.ant-input,
.ant-select-selector,
.ant-picker {
  border-radius: var(--radius-btn) !important;
}

/* Tables */
.ant-table-wrapper {
  border-radius: var(--radius-card);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}
.ant-table-thead > tr > th {
  background: var(--color-primary-light) !important;
  color: var(--color-primary-dark) !important;
  font-weight: 600;
}
.ant-table-tbody > tr:hover > td {
  background: var(--color-primary-light) !important;
}
.ant-table-tbody > tr:nth-child(even) > td {
  background: var(--color-zebra);
}
.ant-table-tbody > tr:nth-child(even):hover > td {
  background: var(--color-primary-light) !important;
}

/* Tags */
.ant-tag {
  border-radius: var(--radius-pill) !important;
}

/* Drawer */
.ant-drawer-header {
  border-bottom: 1px solid var(--color-border);
}
.ant-drawer-body {
  background: var(--color-bg);
}

/* Modal */
.ant-modal-content {
  border-radius: var(--radius-card) !important;
  overflow: hidden;
}
.ant-modal-header {
  border-radius: var(--radius-card) var(--radius-card) 0 0 !important;
}

/* Tabs */
.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
  color: var(--color-primary) !important;
}
.ant-tabs-ink-bar {
  background: var(--color-primary) !important;
}

/* ===== UTILITY CLASSES ===== */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.page-header h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: var(--color-text);
}
.page-content {
  max-width: 1200px;
  margin: 0 auto;
}
.stat-card {
  background: var(--color-card);
  border-radius: var(--radius-card);
  padding: 20px;
  box-shadow: var(--shadow-sm);
  border-left: 4px solid var(--color-primary);
  transition: var(--transition);
}
.stat-card:hover {
  box-shadow: var(--shadow-md);
}
.stat-card .stat-number {
  font-size: 36px;
  font-weight: 700;
  line-height: 1.2;
}
.stat-card .stat-label {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin-top: 4px;
}
.shortcut-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 16px;
}
.shortcut-card {
  background: var(--color-card);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: var(--transition);
  text-decoration: none;
  color: var(--color-text);
  display: block;
  border-top: 4px solid transparent;
}
.shortcut-card:hover {
  transform: scale(1.03);
  box-shadow: var(--shadow-md);
  color: var(--color-text);
}
.shortcut-card .shortcut-icon {
  font-size: 36px;
  margin-bottom: 12px;
}
.shortcut-card .shortcut-label {
  font-size: 16px;
  font-weight: 600;
}
.welcome-card {
  background: linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-card) 100%);
  border-radius: var(--radius-card);
  padding: 24px 32px;
  box-shadow: var(--shadow-sm);
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.welcome-card .welcome-info h4 {
  margin: 0 0 4px 0;
  color: var(--color-text-secondary);
  font-size: 14px;
  font-weight: 400;
}
.welcome-card .welcome-info h3 {
  margin: 0;
  color: var(--color-text);
}
.score-low {
  color: var(--color-danger) !important;
  background: #FFEBEE;
  padding: 2px 8px;
  border-radius: 4px;
}
.score-high {
  color: var(--color-primary-dark) !important;
  background: var(--color-primary-light);
  padding: 2px 8px;
  border-radius: 4px;
}

/* Login page */
.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, var(--color-primary-light) 0%, #FFFFFF 100%);
}
.login-card {
  width: 420px;
  border-radius: 16px !important;
  box-shadow: var(--shadow-lg) !important;
  padding: 40px;
  text-align: center;
}
.login-card .login-logo {
  font-size: 48px;
  color: var(--color-primary);
  margin-bottom: 8px;
}
.login-card .login-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 4px;
}
.login-card .login-subtitle {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin-bottom: 32px;
}
.login-card .ant-input {
  height: 44px;
  border-radius: var(--radius-btn) !important;
}
.login-card .ant-input-affix-wrapper {
  border-radius: var(--radius-btn) !important;
  height: 44px;
}
.login-card .login-btn {
  width: 100%;
  height: 44px;
  font-size: 16px;
  border-radius: var(--radius-btn) !important;
  background: var(--color-primary) !important;
  border-color: var(--color-primary) !important;
  margin-top: 8px;
}
.login-card .login-btn:hover {
  background: var(--color-primary-hover) !important;
  border-color: var(--color-primary-hover) !important;
}
```

- [ ] **Step 2: Update index.css to import global.css**

Replace entire content of `client/src/index.css` with:

```css
@import './theme/global.css';
```

- [ ] **Step 3: Verify build succeeds**

Run: `cd client && NODE_OPTIONS=--openssl-legacy-provider npm run build`
Expected: "Compiled with warnings" (existing warnings), no new errors.

---

### Task 2: Redesign App Layout (Header + Content wrapper)

**Files:**
- Modify: `client/src/App.jsx` (lines 58-120)

The App.jsx contains the main layout with Header, Sider, and Content. We change Header to white with new content arrangement, and wrap Content with page-content class. We keep ALL existing logic (auth, classWrapper, socket, routing) untouched.

- [ ] **Step 1: Update App.jsx return JSX**

Replace lines 58-120 in `client/src/App.jsx`. Keep all imports and logic above line 58 exactly as-is. Replace the `return (` block:

```jsx
    return (
        <div className={'app-container' + (authWrapper.tokenValue ? ' bg-light' : '')}>
            <Router history={history}>
            {authWrapper.tokenValue && <Socket></Socket>}

            <Layout>
                <Header style={{ position: 'sticky', top: 0, zIndex: 100, width: '100%', background: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: '0 24px', display: 'flex', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                        <span style={{ fontSize: '24px', color: '#4CAF50', marginRight: '10px' }}>🎓</span>
                        <span style={{ fontSize: '18px', fontWeight: 700, color: '#333333' }}>Student Advisor</span>
                    </div>
                    <div style={{ flex: 1, textAlign: 'center' }}>
                        <span style={{ fontSize: '15px', color: '#757575', fontWeight: 500 }}>
                            {ClassNameDisplay()}
                        </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {(authWrapper.tokenValue != "" & userData?.role == "teacher") &&
                            <Button type="primary" onClick={showDrawer} style={{ borderRadius: '8px' }}>
                                Chọn lớp
                            </Button>
                        }
                    </div>
                </Header>
                <Layout>
                    <Nav onLogout={userActions.logout} auth={authWrapper.tokenValue} userData={userData} classID={classWrapper.curClass ? classWrapper.curClass.class_id : ""}/>

                <Layout style={{ background: '#F5F5F5' }}>
                    <Content style={{ margin: '24px', maxWidth: '1200px', width: '100%' }}>
                        <Switch>
                          <PrivateRoute exact path="/" component={Home} />
                          <Route path="/account" component={Account} />
                          <PrivateRoute path="/chat" component={Chat} />
                          <PrivateRoute path="/profile" component={Profile} />
                          <PrivateRoute exact path="/dbportal" component={DBPortal} />
                          <PrivateRoute path="/:classID" component={Child} />
                          <Redirect from="*" to="/" />
                        </Switch>
                    </Content>
                </Layout>
                </Layout>
            </Layout>

            <ClassPicker drawerVisible={drawerVisible} setDrawerVisible={setDrawerVisible} onDrawerClose={onDrawerClose}/>
            <Notification></Notification>
            <LinearProgress sx={{position:"fixed", width: "100%", top: "0px", zIndex:200, visibility: (loadingVisible ? "visible" : "hidden")}} />
            </Router>
        </div>
    );
```

- [ ] **Step 2: Verify build + check browser**

Run: `cd client && NODE_OPTIONS=--openssl-legacy-provider npm run build`
Expected: Build success. Header is white with logo left, class name center, button right.

---

### Task 3: Redesign Sidebar Navigation

**Files:**
- Modify: `client/src/_components/Nav.jsx`

Replace the entire Nav function return block. Keep all imports, hooks, and logic untouched. Only change the JSX.

- [ ] **Step 1: Add color icon imports and update Nav.jsx**

Replace the entire file `client/src/_components/Nav.jsx`:

```jsx
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

    const menuItemStyle = (color) => ({
        display: 'flex',
        alignItems: 'center',
    });

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
```

- [ ] **Step 2: Verify build + check browser**

Run: `cd client && NODE_OPTIONS=--openssl-legacy-provider npm run build`
Expected: Build success. Sidebar is white with colored icons, active item has green left border.

---

### Task 4: Redesign Login Page

**Files:**
- Modify: `client/src/_components/account/Login.jsx`

- [ ] **Step 1: Rewrite Login.jsx**

Replace the entire file. Keep the same logic (useForm, yup validation, userActions.login, auth redirect):

```jsx
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
                <div className="login-logo" style={{ fontSize: '48px', color: '#4CAF50', marginBottom: '8px' }}>🎓</div>
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
```

- [ ] **Step 2: Verify build + check login page in browser**

Run: `cd client && NODE_OPTIONS=--openssl-legacy-provider npm run build`
Expected: Build success. Login page shows centered card with green theme on gradient background.
Functional check: Login with `19039001` / `hai123` still works.

---

### Task 5: Redesign Home Page (Teacher)

**Files:**
- Modify: `client/src/home/Home.jsx`

- [ ] **Step 1: Rewrite Home.jsx**

Replace the entire file. Keep ALL existing logic (classWrapper, userActions, useEffect for student first class, role checks):

```jsx
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
    LeftCircleOutlined,
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
```

- [ ] **Step 2: Verify build + check teacher home in browser**

Run: `cd client && NODE_OPTIONS=--openssl-legacy-provider npm run build`
Expected: Build success. Teacher home shows greeting, welcome card, and shortcut grid.
Functional check: Clicking shortcuts navigates to correct pages. "Chọn lớp" button opens drawer.

---

### Task 6: Redesign Home Page (Student)

**Files:**
- Modify: `client/src/home/StuHome.jsx`

- [ ] **Step 1: Rewrite StuHome.jsx**

Replace the entire file. Keep ALL existing logic (teacherState, useEffect with getCurrentClassTeacherInfo):

```jsx
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
```

- [ ] **Step 2: Verify build + check student home in browser**

Run: `cd client && NODE_OPTIONS=--openssl-legacy-provider npm run build`
Expected: Build success.
Functional check: Login as student (`22021001` / `student123`), see greeting + CVHT info + shortcut grid.

---

### Task 7: Redesign Dashboard

**Files:**
- Modify: `client/src/_components/dashboard/Dashboard.jsx` (lines 66-135)

- [ ] **Step 1: Replace Dashboard return JSX**

Keep lines 1-65 exactly as-is (imports, hooks, state, useEffect). Replace the `return (` block starting at line 66:

```jsx
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
```

Also remove the unused `data` constant at the bottom of the file (lines 138-298) - it's dead code.

- [ ] **Step 2: Verify build + check dashboard in browser**

Run: `cd client && NODE_OPTIONS=--openssl-legacy-provider npm run build`
Expected: Build success. Dashboard shows stat cards grid + chart + table.
Functional check: Stat numbers match actual data. Chart renders. Table shows students.

---

### Task 8: Redesign ClassPicker Drawer

**Files:**
- Modify: `client/src/_components/ClassPicker.jsx`

- [ ] **Step 1: Update ClassPicker styles**

Replace lines 13-24 (cardStyle, cardHeadStyle) and update the Cards rendering and Drawer JSX. Keep all logic (classWrapper, modal, form) untouched.

Replace the entire file:

```jsx
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
                                {input[i].class_name.charAt(0)}
                            </div>
                            <div>
                                <div style={{ fontWeight: 600, fontSize: '16px', color: '#333333' }}>{input[i].class_name}</div>
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
```

- [ ] **Step 2: Verify build + check class picker in browser**

Run: `cd client && NODE_OPTIONS=--openssl-legacy-provider npm run build`
Expected: Build success.
Functional check: Click "Chọn lớp" → drawer opens with styled class cards. Creating new class still works.

---

### Task 9: Redesign DBPortal (Tabs layout)

**Files:**
- Modify: `client/src/_components/dbportal/DBPortal.jsx`

- [ ] **Step 1: Rewrite DBPortal.jsx with Tabs layout**

Keep ALL existing column definitions (upload_form_semester, upload_form_subject, etc.) exactly as-is. Only change the `DBPortal` function return:

Replace the `function DBPortal()` block (lines 194-247):

```jsx
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
```

- [ ] **Step 2: Verify build + test upload in browser**

Run: `cd client && NODE_OPTIONS=--openssl-legacy-provider npm run build`
Expected: Build success.
Functional check: Upload a CSV file through any form → modal shows success/failure results correctly.

---

### Task 10: Redesign Feed Page

**Files:**
- Modify: `client/src/_components/feed/Feed.css`

The Feed component uses MUI components (Avatar, Grid, Paper) for post rendering via `bach_component/Post/`. We'll only adjust the Feed wrapper spacing and CSS - not rewrite the MUI Post components (too risky for logic).

- [ ] **Step 1: Update Feed.css**

Replace entire content of `client/src/_components/feed/Feed.css`:

```css
.NoPost {
  text-align: center;
  color: #757575;
  margin-top: 40px;
}
```

- [ ] **Step 2: Update Feed.jsx padding**

In `client/src/_components/feed/Feed.jsx`, replace line 88:
```jsx
            <div style={{paddingRight:"300px", paddingLeft:"230px"}}>
```
with:
```jsx
            <div style={{ maxWidth: '680px', margin: '0 auto' }}>
```

- [ ] **Step 3: Verify build + check feed in browser**

Run: `cd client && NODE_OPTIONS=--openssl-legacy-provider npm run build`
Expected: Build success.
Functional check: Feed page shows posts centered. Post, like, comment still work.

---

### Task 11: Final Build Verification

- [ ] **Step 1: Full production build**

Run: `cd client && NODE_OPTIONS=--openssl-legacy-provider npm run build`
Expected: "Compiled with warnings" (pre-existing warnings only). No new errors.

- [ ] **Step 2: Functional smoke test checklist**

Start dev server: `cd client && NODE_OPTIONS=--openssl-legacy-provider npm start`

Verify each flow:
1. Login page renders with green theme → login with `19039001` / `hai123`
2. Teacher home shows greeting + welcome card + shortcut grid
3. "Chọn lớp" drawer opens with styled class cards
4. Dashboard shows stat cards + charts
5. Bảng điểm SV table renders with data
6. Thông tin SV table renders with data
7. Diễn đàn page shows posts (if any)
8. Chat page renders conversation list + messages
9. Profile page renders form
10. DBPortal shows upload cards in grid
11. Logout works
12. Login as student (`22021001` / `student123`) → student home with CVHT info + shortcuts
