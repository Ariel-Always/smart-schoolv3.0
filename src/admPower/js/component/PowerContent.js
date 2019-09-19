import React, { Component } from 'react';
import { Frame, Menu, Loading, Alert, LeftMenu, Modal, Radio as MyRadio, RadioGroup } from "../../../common";
import { connect } from 'react-redux';
import CONFIG from '../../../common/js/config';
import student from '../../images/img-student.png'
import master from '../../images/img-master.png'
import teacher from '../../images/img-teacher.png'
import director from '../../images/img-director.png'
import Radio from './Radio'
// import { HashRouter as Router, Route, Link, BrowserRouter } from 'react-router-dom';
import { postData, getData } from '../../../common/js/fetch'
import actions from '../actions';
import '../../scss/PowerContent.scss'

class PowerContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    onRadioChange = (value, id) => {
        console.log(value, id)
    }
    render() {
        const { DataState, UIState } = this.props;
        let Power = DataState.GetUserPowerMsg.Power;
        return (
            <div id='powerContent' className='powerContent'>
                <div className='power-box'>
                    <div className='power-top'>
                        <span className='top-tips'>
                            <span className='tips tip-menu'>{'用户权限管理'}</span>
                        </span>


                    </div>
                    <hr className='power-hr' />
                    {Power ? (<div className='power-content'>
                        <div className='content-row clearfix'>
                            <div className='left'>
                                <img width={108} height={116} alt='student' src={student} />
                            </div>
                            <div className='right'>
                                <div className='radio-box-1'>
                                    <div>
                                        <Radio
                                            value={Power.student[0].PowerID}
                                            checked={Power.student[0].Status !== 0 ? true : false}
                                            className='radio'
                                            onChange={this.onRadioChange.bind(this)}
                                        >{Power.student[0].PowerName}</Radio>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='content-row clearfix'>
                            <div className='left'>
                                <img width={108} height={116} alt='teacher' src={teacher} />
                            </div>
                            <div className='right'>
                                <div>
                                    <Radio
                                        value={Power.teacher[0].PowerID}
                                        checked={Power.teacher[0].Status !== 0 ? true : false}
                                        className='radio'
                                        onChange={this.onRadioChange.bind(this)}
                                    >{Power.teacher[0].PowerName}</Radio>
                                    <Radio
                                        value={Power.teacher[1].PowerID}
                                        checked={Power.teacher[1].Status !== 0 ? true : false}
                                        className='radio'
                                        onChange={this.onRadioChange.bind(this)}
                                    >{Power.teacher[1].PowerName}</Radio>
                                    <Radio
                                        value={Power.teacher[2].PowerID}
                                        checked={Power.teacher[2].Status !== 0 ? true : false}
                                        className='radio'
                                        onChange={this.onRadioChange.bind(this)}
                                    >{Power.teacher[2].PowerName}</Radio>
                                </div>
                            </div>
                        </div>
                        <div className='content-row clearfix'>
                            <div className='left'>
                                <img width={108} height={116} alt='master' src={master} />
                            </div>
                            <div className='right'>
                                <div>
                                    <Radio
                                        value={Power.ganger[0].PowerID}
                                        checked={Power.ganger[0].Status !== 0 ? true : false}
                                        className='radio'
                                        onChange={this.onRadioChange.bind(this)}
                                    >{Power.ganger[0].PowerName}</Radio>
                                    <Radio
                                        value={Power.ganger[1].PowerID}
                                        checked={Power.ganger[1].Status !== 0 ? true : false}
                                        className='radio'
                                        onChange={this.onRadioChange.bind(this)}
                                    >{Power.ganger[1].PowerName}</Radio>
                                </div>
                            </div>
                        </div>
                        <div className='content-row clearfix'>
                            <div className='left'>
                                <img width={108} height={116} alt='director' src={director} />
                            </div>
                            <div className='right'>
                                <div>
                                    <Radio
                                        value={Power.dean[0].PowerID}
                                        checked={Power.dean[0].Status !== 0 ? true : false}
                                        className='radio'
                                        onChange={this.onRadioChange.bind(this)}
                                    >{Power.dean[0].PowerName}</Radio>
                                    <Radio
                                        value={Power.dean[1].PowerID}
                                        checked={Power.dean[1].Status !== 0 ? true : false}
                                        className='radio'
                                        onChange={this.onRadioChange.bind(this)}
                                    >{Power.dean[1].PowerName}</Radio>
                                    <Radio
                                        value={Power.dean[2].PowerID}
                                        checked={Power.dean[2].Status !== 0 ? true : false}
                                        className='radio'
                                        onChange={this.onRadioChange.bind(this)}
                                    >{Power.dean[2].PowerName}</Radio>
                                    <Radio
                                        value={Power.dean[3].PowerID}
                                        checked={Power.dean[3].Status !== 0 ? true : false}
                                        className='radio'
                                        onChange={this.onRadioChange.bind(this)}
                                    >{Power.dean[3].PowerName}</Radio></div>
                            </div>
                        </div>
                    </div>) : ''}
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
export default connect(mapStateToProps)(PowerContent);