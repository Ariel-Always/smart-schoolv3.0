import React, { Component } from 'react';
import { Frame, Menu, Loading, Alert, PagiNation } from "../../../common";
import { connect } from 'react-redux';
import '../../scss/TeachingSolution.scss'
import ShowCard from './ShowCard'
import { getData, postData } from '../../../common/js/fetch'
import actions from '../actions';


class TeachingSolution extends Component {
    constructor(props) {
        super(props);
        const { dispatch } = props;
        this.state = {

        }
    }

    //分页改变回调
    onPaginationChange = (page) => {
        const { dispatch } = this.props;
        console.log(page)
        dispatch(actions.UpDataState.getTeachingSolutionMsg('/ListTeachingSolutions?beginTime=&endTime=&pageSize=9&currentPage='+page+'&userId=' + JSON.parse(sessionStorage.getItem('UserInfo')).UserID))

    }
    render() {
        const { DataState, UIState } = this.props;

        return (
            <div id='TeachingSolution'>
                <div className='content-box'>
                    
                    <div className='box-content'>
                        {DataState.GetTeachingSolutionMsg.solutionData.map((child, index) => {
                            return <ShowCard key={index} params={child}></ShowCard>
                        })}

                    </div>

                    <PagiNation
                        className='pagination'
                        hideOnsinglePage={true}
                        pageSize={12}
                        showQuickJumper={true}
                        total={DataState.GetTeachingSolutionMsg.TotalPage}
                        onChange={this.onPaginationChange.bind(this)}
                    ></PagiNation>

                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let { UIState, DataState } = state;
    return {
        UIState,
        DataState
    }
};
export default connect(mapStateToProps)(TeachingSolution);