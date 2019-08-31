import React,{Component} from 'react';

import $ from 'jquery';

import {Search} from "../../../common";

class LeftMenu extends Component{

    constructor(props) {

        super(props);

        this.state={

            catActive:'',

            catChildrenActive:'',

            searchActive:''

        };

    }

    //点击分类的名称
    catNameClick(id,e){

        if ($(e.target).hasClass('picked')){

            $(this.refs[id]).slideUp();

            $(e.target).removeClass('picked');

        }else{

            $(this.refs[id]).slideDown();

            $(e.target).addClass('picked');

        }

    }
    //点击二级里面的名字
    onPick(pickInfo){

        const {pickClick} = this.props;

        this.setState({catChildrenActive:pickInfo.catChildrenId,catActive:pickInfo.catId});

        pickClick(pickInfo);

    }


    render() {

        const { title,type,pickList,pickClick,searchClick,cancelSearch,searchShow,searchResult } = this.props;

        return (

            <div className="left-menu-wrapper">

                <div className="left-menu-title">{title}</div>

                <Search width={204} onClickSearch={searchClick} onCancelSearch={cancelSearch}></Search>

                {

                    searchShow?

                        <div className={`left-menu-search-wrapper ${type}`}>

                            {

                                searchResult.map((item,key) => {

                                    return <div key={key} className={`cat-item ${item.id===this.state.searchActive?'active':''}`} data-id={item.id}>

                                                <span className="cat-children-name" title={item.name} onClick={this.onPick.bind(this,{catChildrenId:item.id,catChildrenName:item.name})}>

                                                    {item.name}

                                                </span>

                                            </div>

                                })

                            }

                        </div>

                    :

                        <div className={`pick-wrapper ${type}`}>

                            {

                                pickList&&pickList.map((item,key) => {

                                    return  <div key={key} className="pick-item">

                                        <div className={`cat-wrapper`} data-id={item.id}>

                                            <span className={`cat-name`} onClick={(e)=>this.catNameClick(item.id,e)} title={item.name}>{item.name}</span>

                                        </div>

                                        <div className={`cat-children-wrapper`} ref={item.id} data-children-id={item.id}>

                                            {

                                                item.list.map((i,k) => {

                                                    return  <div key={k} className={`cat-item ${((item.id===this.state.catActive)&&(this.state.catChildrenActive===i.id))?'active':''}`} data-id={i.id}>

                                                                <span className="cat-children-name" title={i.name} onClick={this.onPick.bind(this,{catId:item.id,catChildrenId:i.id,catChildrenName:i.name,catName:item.name})}>

                                                                    {i.name}

                                                                </span>

                                                    </div>

                                                })

                                            }

                                        </div>
                                    </div>

                                })

                            }

                        </div>

                }

            </div>

        );

    }

}

export default LeftMenu;