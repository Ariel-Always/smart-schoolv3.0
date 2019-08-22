import React from 'react'
import { connect } from 'react-redux';
import { DropDown, PagiNation, Search, Table, Button, CheckBox, CheckBoxGroup, Modal } from '../../../common/index'
import '../../../common/scss/_left_menu.scss'
import { HashRouter as Router, Route, Link, BrowserRouter } from 'react-router-dom';
import '../../scss/Teacher.scss';

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