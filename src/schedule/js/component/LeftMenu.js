import React,{Component} from 'react';

import $ from 'jquery';

import {Search} from "../../../common";

class LeftMenu extends Component{

    catNameClick(id,e){

        $(this.refs[id]).slideToggle();

    }

    render() {

        const { title,type,pickList } = this.props;

        return (

            <div className="left-menu-wrapper">

                <div className="left-menu-title">{title}</div>

                <Search width={204}></Search>

                <div className={`pick-wrapper ${type}`}>

                    {

                        pickList&&pickList.map((item,key) => {

                            return  <div key={key} className="pick-item">

                                        <div className={`cat-wrapper`} data-id={item.id}>

                                            <span className="cat-name" onClick={(e)=>this.catNameClick(item.id,e)}>{item.name}</span>

                                        </div>

                                        <div className={`cat-children-wrapper`} ref={item.id} data-children-id={item.id}>

                                            {

                                                item.list.map((i,k) => {

                                                    return  <div key={k} className="cat-item" data-id={i.id}>

                                                                <span className="cat-children-name">

                                                                    {i.name}

                                                                </span>

                                                             </div>

                                                })

                                            }

                                        </div>
                                </div>

                        })

                    }

                 {/*   <div className="cat-wrapper cat2">

                        <span className="cat-name picked">英语</span>

                    </div>

                    <div className="cat-children-wrapper open cat1-children">

                        <div className="cat-item">

                            <span className="cat-children-name">

                                张杨丽景

                            </span>

                        </div>

                        <div className="cat-item active">

                            <span className="cat-children-name">

                                张杨丽景

                            </span>

                        </div>

                        <div className="cat-item">

                            <span className="cat-children-name">

                                张杨丽景

                            </span>

                        </div>

                    </div>*/}

                </div>

            </div>

        );

    }

}

export default LeftMenu;