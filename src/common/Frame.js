import React,{Component} from 'react';

import {Frame} from './index.js';

import dynamicFile from 'dynamic-file';


class FrameContainer extends Component{

    constructor(props) {

        super(props);

    }

    componentDidMount(){

        if (sessionStorage.getItem('UserInfo')){

            this.IntegrateMsg();

        }else{

            let WaitUserInfo = setInterval(()=>{

                if (sessionStorage.getItem('UserInfo')){

                    this.IntegrateMsg();

                    clearInterval(WaitUserInfo);

                }

            },20);

        }

    }


    IntegrateMsg(){

        let token = sessionStorage.getItem('token');

        let host = `http://${window.location.host}/`;

        let PsnMgrLgAssistantAddr = 'http://192.168.129.1:10103';

        sessionStorage.setItem('PsnMgrToken',token);//用户Token

        sessionStorage.setItem('PsnMgrMainServerAddr', host); //基础平台IP地址和端口号 形如：http://192.168.129.1:30103/

        sessionStorage.setItem('PsnMgrLgAssistantAddr','http://192.168.129.1:10103/');

        dynamicFile([

            `${PsnMgrLgAssistantAddr}/PsnMgr/LgAssistant/css/lancoo.cp.assistantInfo.css`,

            `${PsnMgrLgAssistantAddr}/PsnMgr/LgAssistant/js/jquery-1.7.2.min.js`

        ]).then(()=>{

            dynamicFile([

                `${PsnMgrLgAssistantAddr}/PsnMgr/LgAssistant/assets/jquery.pagination.js`,

                `${PsnMgrLgAssistantAddr}/PsnMgr/LgAssistant/js/lancoo.cp.assistantInfo.js`

            ])

        })

    }

    render() {

        const { children, type, module, userInfo, msg, showLeftMenu, showBarner = true,onLogOut, ...reset } = this.props;

        return (

            <Frame

                type={type}

                module={module}

                userInfo={userInfo}

                showLeftMenu={showLeftMenu}

                showBarner={showBarner}

                onLogOut={onLogOut}

                {...reset}

            >

                { children }

            </Frame>

        );

    }

}

export default FrameContainer;