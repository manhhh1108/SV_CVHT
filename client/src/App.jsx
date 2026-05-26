import { BrowserRouter as Router,
    Switch,
    Route, 
    Redirect,
    useParams, useLocation} from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';

import { Nav, PrivateRoute, ClassPicker } from '_components';
import { history } from '_helpers';
import { Home } from 'home';
import { Account } from '_components/account';
import { Dashboard } from '_components/dashboard';
import { Feed } from '_components/feed';
import { Chat } from '_components/chat';
import { Profile } from '_components/profile';
import { StudentInfoList } from '_components/studentInfoList';
import { StudentScoreList, PersonalScore } from '_components/studentScoreList';

import { useAuthWrapper, useClassWrapper } from '_helpers';
import { authAtom, classPickerVisibleAtom } from '_state';
import { Layout, Button, Row, Col, } from 'antd';

import React, { useEffect, useState } from 'react';
import { loadingVisibleAtom } from '_state';
import Title from 'antd/lib/typography/Title';
import { useUserActions } from '_actions';
import {Notification} from './_components/bach_component/Notification/Notification'
import { socketWrapper } from '_helpers/socket-wrapper';
import Socket from '_components/bach_component/Socket/socket';
import LinearProgress from '@mui/material/LinearProgress';
import { DBPortal } from '_components/dbportal/DBPortal';
import { StuHome } from 'home/StuHome';
const style = { };

const { Header, Footer, Content } = Layout;

export { App };

function App() {
    const authWrapper = useAuthWrapper();
    const classWrapper = useClassWrapper();
    const [drawerVisible, setDrawerVisible] = useRecoilState(classPickerVisibleAtom);
    const [loadingVisible, setLoadingVisible] = useRecoilState(loadingVisibleAtom);

    const userData = JSON.parse(localStorage.getItem("userData"));
    
    const userActions = useUserActions();
    const showDrawer = () => {
        classWrapper.getClassList();
        setDrawerVisible(true);
    };

    const onDrawerClose = () => {
        setDrawerVisible(false);
    };
  

    return (
        <div className={'app-container' + (authWrapper.tokenValue ? ' bg-light' : '')}>
            <Router history={history}>
            {authWrapper.tokenValue && <Socket></Socket>}

            <Layout>
                <Header style={{ position: 'sticky', top: 0, zIndex: 100, width: '100%', background: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: '0 24px', display: 'flex', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                        <img src="/logo.jpg" alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
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
}

function Child(props) {
    let {classID} = useParams();
    const userData = JSON.parse(localStorage.getItem("userData"));
    const classWrapper = useClassWrapper();
    const [loaded, setloaded] = useState(false);
    // console.log('hello');
    const location  = useLocation()
    // let { path } = match;
    // console.log(path);
    useEffect(() => {
        classWrapper.chooseClassById(classID).then(data => {
            setloaded(true)
        });
        console.log("Child component construct, classID: ", classID)
    },[])

    return (
    (!classWrapper.curClass && loaded) ? <Redirect from="*" to="/" /> :
        <>
        
            {(classWrapper.curClass) &&  
                <>
                    {(userData.role == "teacher") &&
                        <>
                            <Switch>
                            <PrivateRoute exact path="/:classID/" component={Home} />
                            <PrivateRoute exact path="/:classID/dashboard" component={Dashboard} />
                            <PrivateRoute exact path="/:classID/studentinfo" component={StudentInfoList} />
                            <PrivateRoute exact path="/:classID/studentscore" component={StudentScoreList} />
                            <PrivateRoute exact path="/:classID/feed" component={Feed} />
                            <Redirect from="*" to={`/${classWrapper.curClass.class_id}/dashboard`} />
                            </Switch>
                        </>
                    }
                    {(userData.role == "student") &&
                        <>
                            <Switch>
                            <PrivateRoute exact path="/" component={Home} />
                            {/* <PrivateRoute exact path="/:classID/studentinfo" component={StudentInfoList} />
                            <PrivateRoute exact path="/:classID/studentscore" component={StudentScoreList} /> */}
                            <PrivateRoute exact path="/stuhome" component={StuHome} />
                            <PrivateRoute exact path="/:classID/feed" component={Feed} />
                            <PrivateRoute path="/personalscore" component={PersonalScore}/>
                            <Redirect from="*" to={`/${classWrapper.curClass.class_id}/feed`} />
                            </Switch>
                        </>
                    }
                    {(userData.role == "admin") &&
                        <>
                            <Switch>
                            {/* route admin here */}
                            </Switch>
                        </>
                    }
                </>
            }
            
        </>
    );
  }

function ClassNameDisplay(){
    const auth = useRecoilValue(authAtom);
    const classWrapper = useClassWrapper();
    if (auth) {
        if (classWrapper.curClass) {
            return classWrapper.curClass.class_name;
        }
        return "Chưa chọn lớp";
    }    
    localStorage.removeItem('currentClass');
    return "";
}


// function App() {
//     const authWrapper = useAuthWrapper();
//     return (
//         <div className={'app-container' + (authWrapper.tokenValue ? ' bg-light' : '')}>
//             {/* <div>{JSON.stringify(authWrapper.tokenValue)}</div> */}
//             <Router history={history}>
//             <Layout>
//                 <Header style={{ padding: '20px 0px 2px 20px', height: '70px' }}>
//                     <Title style={{ padding: 0, color: 'white' }} level={3}>Student Advisor Web App</Title>
//                 </Header>
//             </Layout>
//             <Layout>
//                 <Nav />
//                 <Layout>
//                     <Content style={{ margin: '20px 16px' }}>
//                         <Switch>
//                           <PrivateRoute exact path="/" component={Home} />
//                           <PrivateRoute exact path="/dashboard" component={Dashboard} />
//                           <PrivateRoute exact path="/studentinfo" component={StudentInfoList} />
//                           <PrivateRoute exact path="/studentscore" component={StudentScoreList} />
//                           <PrivateRoute exact path="/feed" component={Feed} />
//                           <PrivateRoute exact path="/chat" component={Chat} />
//                           <PrivateRoute exact path="/profile" component={Profile} />
//                           {/* <PrivateRoute path="/users" component={Users} /> */}
//                           <Route path="/account" component={Account} />
//                           <Redirect from="*" to="/" />
//                         </Switch>
//                     </Content>
//                     <Footer style={{ textAlign: 'center' }}>
//                         Phần mềm quản lý CVHT & SV
//                         <br/>
//                         Thực hiện bởi @vakoyomi, @miaht94, @anhbomx13, @h2b, @tuna
//                     </Footer>
//                </Layout>
//              </Layout>
//             </Router>
//         </div>        
//     );
// }