import React from 'react'
import { connect } from 'react-redux';
import { DropDown, PagiNation, Search, Table, Button, CheckBox, CheckBoxGroup, Modal } from '../../../common/index'
import '../../../common/scss/_left_menu.scss'
import { HashRouter as Router, Route, Link, BrowserRouter } from 'react-router-dom';
import '../../scss/Teacher.scss'
import history from '../containers/history'
import EditTeacherModal from './EditTeacherModal'
import IconLocation from '../../images/icon-location.png'
import actions from '../actions';
import StudentChangeRecord from './TeacherChangeRecord'

class Teacher extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    render(){
        return (
            <div>Teacher</div>
        )
    }
}

export default Teacher