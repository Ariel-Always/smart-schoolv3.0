import React,{Component} from 'react';

import { Loading } from "../../../../common";

class Content extends Component{

    render() {

        const { ModuleGroups,ImgLoad,ImgErrorLoad,GroupToggle,ClickModule,ModulesLoading } = this.props;

        return (

            <div className="content-wrapper">

                {

                    ModulesLoading?

                        <Loading  opacity={false}></Loading>

                        :''

                }

                    {
                        //遍历模块组合
                        ModuleGroups&&ModuleGroups.map((item,key)=>{

                            //判断是否是网站
                            if (item.IsWebsiteGroup){

                                return <div className="module-wrapper" key={key}>

                                            <div className="module-group-name">{item.GroupName}</div>

                                            <div className="module-group-wrapper clearfix">

                                                {

                                                    item.Modules.map((i,k)=>{

                                                        let ModuleDetail = '';
                                                        //判断是否是组合
                                                        if (i.IsGroup){

                                                            ModuleDetail = <div className="module-group-item clearfix">

                                                                {

                                                                    i.SubGroupModules.map((it,kt)=>{

                                                                        if (kt<=3){

                                                                            if (it.showDom==='img'){

                                                                                return <div className={`group-item-icon ${it.BgColor}`}>

                                                                                            <img key={kt}

                                                                                             alt=""

                                                                                             src={`${it.AccessParam}/favicon.ico`}

                                                                                             onLoad={()=>ImgLoad({GroupID:item.GroupID,PNO:i.OrderNo,CNO:it.OrderNo})}

                                                                                             onError={()=>ImgErrorLoad({GroupID:item.GroupID,PNO:i.OrderNo,CNO:it.OrderNo})}

                                                                                        />

                                                                                        </div>

                                                                            }else if (it.showDom === 'div'){

                                                                                return <div className={`group-item-icon ${it.BgColor}`}>{it.ModuleName[0]}</div>

                                                                            }

                                                                        }

                                                                    })

                                                                }

                                                            </div>

                                                        }else{

                                                            if (i.showDom==='img'){

                                                                ModuleDetail =  <div className={`module-logo ${i.BgColor}`}>

                                                                                    <img alt=""

                                                                                         src={`${i.AccessParam}/favicon.ico`}

                                                                                         onLoad={()=>ImgLoad({GroupID:item.GroupID,PNO:i.OrderNo})}

                                                                                         onError={()=>ImgErrorLoad({GroupID:item.GroupID,PNO:i.OrderNo})}/>

                                                                                </div>

                                                            }else{

                                                                ModuleDetail = <div className={`module-logo ${i.BgColor}`}>{i.ModuleName[0]}</div>

                                                            }

                                                        }


                                                        return <div key={k}

                                                                    className={`module-item ${i.IsGroup?'group':''}`}

                                                                    onClick={i.IsGroup?(e)=>GroupToggle({GroupID:item.GroupID,OrderNo:i.OrderNo,Event:e}):(e)=>ClickModule({ModuleStatus:i.ModuleStatus,AccessType:i.AccessType,AccessParam:i.AccessParam,Event:e})}>

                                                            {

                                                                ModuleDetail

                                                            }

                                                            <div className="module-name" title={i.ModuleName}>{i.ModuleName}</div>

                                                            {

                                                                i.IsGroup?

                                                                    <div className="module-detail-wrapper" style={{display:`${i.DetailShow?'block':'none'}`}}>

                                                                        <div className="module-detail-name">{i.ModuleName}</div>

                                                                        <div className="module-detail-item-wrapper clearfix">

                                                                            {

                                                                                i.SubGroupModules.map((it,kt)=>{

                                                                                    let ModuleIcon = '';

                                                                                    if (it.showDom === 'img'){

                                                                                        ModuleIcon = <div className={`module-detail-item-icon ${it.BgColor}`}><img src={`${it.AccessParam}/favicon.ico`}  alt=""/></div>;

                                                                                    }else{

                                                                                        ModuleIcon = <div className={`module-detail-item-icon ${it.BgColor}`}>{it.ModuleName[0]}</div>

                                                                                    }

                                                                                    return <div className="module-detail-item" onClick={(e)=>ClickModule({ModuleStatus:it.ModuleStatus,AccessType:it.AccessType,AccessParam:it.AccessParam,Event:e})}>

                                                                                        {

                                                                                            ModuleIcon

                                                                                        }

                                                                                        <div className="module-detail-item-name">{it.ModuleName}</div>

                                                                                    </div>

                                                                                })

                                                                            }

                                                                        </div>

                                                                    </div>

                                                                    :''

                                                            }

                                                        </div>

                                                    })

                                                }

                                            </div>

                                        </div>

                            }else{

                                return <div className="module-wrapper" key={key}>

                                            <div className="module-group-name">{item.GroupName}</div>

                                            <div className="module-group-wrapper clearfix">

                                                {

                                                    item.Modules.map((i,k)=>{

                                                        let ModuleDetail = '';
                                                        //判断是否是组合
                                                        if (i.IsGroup){

                                                            ModuleDetail = <div className="module-group-item clearfix">

                                                                {

                                                                    i.SubGroupModules.map((it,kt)=>{

                                                                        if (kt<=3){

                                                                            return <div key={kt} className="group-item-icon" style={{backgroundImage:`url(${it.ModuleLogoPath})`}}></div>

                                                                        }

                                                                    })

                                                                }

                                                            </div>

                                                        }else{


                                                            ModuleDetail = <div className={`module-logo`} style={{backgroundImage:`url(${i.ModuleLogoPath})`}}></div>


                                                        }


                                                        return <div key={k}

                                                                    className={`module-item ${i.IsGroup?'group':''}`}

                                                                    onClick={i.IsGroup?(e)=>GroupToggle({GroupID:item.GroupID,OrderNo:i.OrderNo,Event:e}):(e)=>ClickModule({ModuleStatus:i.ModuleStatus,AccessType:i.AccessType,AccessParam:i.AccessParam,Event:e})}>

                                                            {

                                                                ModuleDetail

                                                            }

                                                            <div className="module-name" title={i.ModuleName}>{i.ModuleName}</div>

                                                            {

                                                                i.IsGroup?

                                                                    <div className="module-detail-wrapper" style={{display:`${i.DetailShow?'block':'none'}`}}>

                                                                        <div className="module-detail-name">{i.ModuleName}</div>

                                                                        <div className="module-detail-item-wrapper clearfix">

                                                                            {

                                                                                i.SubGroupModules.map((it,kt)=>{

                                                                                    let ModuleIcon = '';

                                                                                    ModuleIcon = <div className="module-detail-item-pic" style={{backgroundImage:`url(${it.ModuleLogoPath})`}}></div>

                                                                                    return <div className="module-detail-item" onClick={(e)=>ClickModule({ModuleStatus:it.ModuleStatus,AccessType:it.AccessType,AccessParam:it.AccessParam,Event:e})}>

                                                                                        {

                                                                                            ModuleIcon

                                                                                        }

                                                                                        <div className="module-detail-item-name">{it.ModuleName}</div>

                                                                                    </div>

                                                                                })

                                                                            }

                                                                        </div>

                                                                    </div>

                                                                    :''

                                                            }

                                                        </div>

                                                    })

                                                }

                                            </div>

                                        </div>

                            }

                        })

                    }

            </div>

        );

    }

}

export default Content;