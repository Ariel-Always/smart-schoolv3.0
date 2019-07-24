import "core-js";
import React,{Component} from 'react';
import Header from './Header';
import BreadCrumb from './BreadCrumb';
import {HashRouter as Router,NavLink} from 'react-router-dom';

class App extends Component{

    render() {
        return (
            <div>
                <Router>

                <Header></Header>
                <BreadCrumb></BreadCrumb>
                <div className="frame_content_container clearfix">
                 <div className='frame_content_left_side'>
                     <div className='frame_left_menu_pin'>
                         <div className='frame_left_menu_pic pic1'></div>
                         <div className='frame_left_menu_container'>
                           <NavLink to="/" exact className='frame_leftmenu_mainitem main_menu_item no_child'>
                               <span className="frame_leftmenu_mainitem_name main_menu_tab menu10">
                                   <div>会员信息总览</div>
                               </span>
                           </NavLink>
                             <NavLink to="/grade/1" className="frame_leftmenu_mainitem main_menu_item no_child">
                                  <span className="frame_leftmenu_mainitem_name main_menu_tab menu10">
                                   <div>一年级</div>
                               </span>
                             </NavLink>
                             <NavLink to="/grade/class/2" className="frame_leftmenu_mainitem main_menu_item no_child">
                                  <span className="frame_leftmenu_mainitem_name main_menu_tab menu10">
                                   <div>二年级1班</div>
                               </span>
                             </NavLink>
                         </div>
                     </div>
                 </div>
                    {this.props.children}
                </div>
                </Router>
            </div>
        );
    }
}
export default App;