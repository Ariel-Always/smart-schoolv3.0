import 'core-js'
import React from 'react';
import {Radio as AntRadio,Checkbox as AntCheckBox,Table as AntTable,
Pagination as AntPagination} from 'antd';
import 'antd/dist/antd.min.css';
import './index.scss'

/*
* 组件：按钮组
* params
*style:样式
* func:方法
* details:内容
* type:按钮颜色类型
* size:按钮大小
* */
class Button extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            style : props.style,
            func : props.func,
            details : props.details,
            type: props.type,
            size: props.size,
            mouseEnter:false
        }
    }



    /*
    * type类型选择
    * */

    TypeSelect = () => {
        let ButtonType = 'button_type';
        console.log(this.state.type)
        switch(this.state.type)
        {
            case 'normal':
                ButtonType =  'button_type_normal'
               break;
            case 'primary':
                ButtonType = 'button_type_primary'
                break;
            default:
                console.log('Button属性赋值不合法')

        }
        this.setState({ButtonType:ButtonType})
    }

    /*
     * size类型选择
     * */

    SizeSelect = () => {
        let ButtonSize = 'button_size';
        console.log(this.state.size)
        switch(this.state.size)
        {
            case 'small':
                ButtonSize =  'button_size_small'
                break;
            case 'normal':
                ButtonSize = 'button_size_normal'
                break;
            default:
                console.log('Button属性赋值不合法')

        }
        this.setState({ButtonSize:ButtonSize})
    }

    /*
    * 鼠标移入
    * */
    MouseEnter = (event) => {
        /*$(event.target).addClass('Button_mouse_enter')*/
        this.setState({mouseEnter:true})
        console.log(this.state.mouseEnter)
    }
    /*
     * 鼠标移出
     * */
    MouseLeave = (event) => {
        this.setState({mouseEnter:false})
        console.log(this.state.mouseEnter)
    }

    componentDidMount(){
        this.TypeSelect();
        this.SizeSelect();
    }

    render(){
        return (
            <input
                type="button"
                className={`ButtonBase ${this.state.ButtonType} ${this.state.ButtonSize} ${this.state.mouseEnter?'Button_mouse_enter':''}`}

                style={this.state.style}
                onClick={this.state.func}
                value = {this.state.details}/>


        )
    }
}

/*
 * 按钮组件默认属性
 * */
Button.defaultProps = {
    /*type:'normal',
    size:'normal'*/
}
/*
 * 选择组件（单选、多选、全选） start
 * */
    class Radio extends React.Component{
        render() {
            const {children,...reset} = this.props;
            return (
                <AntRadio {...reset}>{children}</AntRadio>
            );
        }
    }
    class RadioGroup extends React.Component{
        render() {
            const {children,...reset} = this.props;
            return (
                <AntRadio.Group {...reset}>{children}</AntRadio.Group>
            );
        }
    }
    class CheckBox extends React.Component{
        render() {
            const {children,...reset} = this.props;
            return (
                <AntCheckBox {...reset}>{children}</AntCheckBox>
            );
        }
    }
    class CheckBoxGroup extends React.Component{
        render() {
            const {children,...reset} = this.props;
            return (
                <AntCheckBox.Group {...reset}>{children}</AntCheckBox.Group>
            );
        }
    }
/*
 * 选择组件（单选、多选、全选） end
 * */

/*
 * table组件 start
 * */
    class Table extends React.Component{
        render() {
            const {children,...reset} = this.props;
            return (
                <AntTable {...reset}>{children}</AntTable>
            );
        }
    }
/*
 * table组件 end
 * */
/*
 * 分页组件 start
 * */
    class PagiNation extends React.Component{
        render() {
            const {children,hideOnSinglePage,...reset} = this.props;
            return (
                <AntPagination {...reset} hideOnSinglePage={hideOnSinglePage?hideOnSinglePage:true}>{children}</AntPagination>
            );
        }
    }
/*
 * 分页组件 end
 * */
export {
   Button,
    Radio,
    RadioGroup,
    CheckBox,
    CheckBoxGroup,
    Table,
    PagiNation
}