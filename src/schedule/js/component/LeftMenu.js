import React,{Component} from 'react';

import $ from 'jquery';

import {Search,Loading,Empty} from "../../../common";

import ScrollBars from 'react-custom-scrollbars';

class LeftMenu extends Component{

   /* constructor(props) {

        super(props);

       /!* this.state={

            catActive:'',

            catChildrenActive:'',

            searchActive:''

        };*!/

    }*/

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

        //this.setState({catChildrenActive:pickInfo.catChildrenId,catActive:pickInfo.catId});

        pickClick(pickInfo);

    }

    //点击搜索的选项
    onPickSearch(pickInfo){

        const {pickClick} = this.props;

        //this.setState({searchActive:pickInfo.catChildrenId});

        pickClick(pickInfo);

    }


    render() {

        const {

            title,type,pickList,pickClick,searchClick,

            cancelSearch,searchShow,searchResult,leftMenuSearchLoading,

            searchTitleShow,searchTitle,PickID,CancelBtnShow,SearchValue,

            SearchValueChange

        } = this.props;

        return (

            <div className="left-menu-wrapper">

                <div className="left-menu-title">{title}</div>

                <Search width={204} CancelBtnShow={CancelBtnShow} Value={SearchValue} onChange={(e)=>SearchValueChange(e)} onClickSearch={searchClick} onCancelSearch={cancelSearch}></Search>

                {

                    searchShow?

                        <Loading tip="加载中..." spinning={leftMenuSearchLoading}>

                            {

                                searchTitleShow?

                                    <div className="peronal-title">{searchTitle}</div>

                                    :''

                            }

                            <ScrollBars autoHide autoHeight autoHeightMax={760}>

                                <div className={`left-menu-search-wrapper ${type}`}>

                                {

                                    searchResult&&searchResult.length>0?

                                        searchResult.map((item,key) => {

                                        return <div key={key} className={`cat-item ${item.id===PickID?'active':''}`} data-id={item.id}>

                                                    <span className="cat-children-name" title={item.name} onClick={this.onPickSearch.bind(this,{catChildrenId:item.id,catChildrenName:item.name})}>

                                                        {item.name}

                                                    </span>

                                                </div>

                                    })

                                        :

                                        <Empty type="5" title="没有数据"></Empty>

                                }

                        </div>

                            </ScrollBars>

                        </Loading>
                    :

                        <div className={`pick-wrapper ${type}`}>

                            <ScrollBars autoHide autoHeight autoHeightMax={760}>

                            {

                                pickList&&pickList.length>0?


                                    pickList.map((item,key) => {

                                        return  <div key={key} className="pick-item">

                                            <div className={`cat-wrapper`} data-id={item.id}>

                                                <span className={`cat-name`} onClick={(e)=>this.catNameClick(item.id,e)} title={item.name}>{item.name}</span>

                                            </div>

                                            <div className={`cat-children-wrapper`} ref={item.id} data-children-id={item.id}>

                                                {

                                                    item.list.map((i,k) => {

                                                        return  <div key={k} className={`cat-item ${i.id===PickID?'active':''}`} data-id={i.id}>

                                                                    <span className="cat-children-name" title={i.name} onClick={this.onPick.bind(this,{catId:item.id,catChildrenId:i.id,catChildrenName:i.name,catName:item.name})}>

                                                                        {i.name}

                                                                    </span>

                                                        </div>

                                                    })

                                                }

                                            </div>
                                        </div>

                                    })

                                    :

                                    <Empty type="3" title="没有数据"></Empty>

                            }

                            </ScrollBars>

                        </div>

                }

            </div>

        );

    }

}

export default LeftMenu;