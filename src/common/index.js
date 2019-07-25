import 'core-js'
import React from 'react';
import ProTypes from 'prop-types';
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
class Radio extends React.Component{    //单选
    static contextTypes={
        radioGroup:ProTypes.object
    }
    render() {
        const {name, selectedValue, onChange} = this.context.radioGroup;
        const {children,disabled} = this.props;
        const optional = {};
        if(selectedValue !== undefined) {
            optional.checked = (this.props.value === selectedValue);
        }
        if(disabled !== undefined){
            optional.disabled = (this.props.disabled === disabled)        ;
        }
        if(typeof onChange === 'function') {
            optional.onChange = onChange.bind(null, this.props.value);
        }
        return (
                <label className={`radio_wrapper ${disabled?'disabled':''}`} name={name} onClick={optional.disabled?function(){}:optional.onChange}>
                    <span className={`radio_span ${optional.checked?'radio_checked':''}`}></span>
                    <span>{children}</span>
                </label>
        );
    }
}
class RadioGroup extends React.Component{   //单选组
    static defaultProps = {
        Component: "div"
    }
    static childContextTypes  ={
        radioGroup:ProTypes.object
    }
    getChildContext() {
        const {name, selectedValue, onChange} = this.props;
        return {
            radioGroup: {
                name, selectedValue, onChange
            }
        }
    }
    render() {
        const {Component, name, selectedValue, onChange, children, ...rest} = this.props;
        return (
            <Component {...rest}>{children}</Component>
        )
    }
}
class CheckBox extends React.Component{
    static contextTypes={
      CheckBoxGroup:ProTypes.object
    };
    changeChecked(obj){
      let {value,checkedList,changeItem,plainOptions,optLength,isGroup,checkAll}=obj;
      if(isGroup){
          if(checkAll){
              checkedList=[];
              checkAll = false;
          }else{
            checkedList=plainOptions
              checkAll=true;
          }
          return changeItem.bind(null,{checkAll,checkedList})();
      }else {
          if (checkedList.includes(value)) {
              checkedList = checkedList.filter((item) => {
                  return item !== value
              });
          } else {
              checkedList.push(value);
          }
          return changeItem.bind(null,{checkedList:checkedList,
              checkAll:checkedList.length===optLength?true:false})();
      }

    }
    render() {
        const {children,options,disabled} = this.props;
        if (options&&options.isGroup){
            const {isGroup,checkAll,checkedList,plainOptions,changeItem} = this.props.options;
            return (
                <label className={`checkbox_wrapper ${disabled?'disabled':''}`} onClick={disabled?()=>{}:this.changeChecked.bind(this,{isGroup,checkedList,checkAll,plainOptions,changeItem})}>
                    <span className={`checkbox_span ${checkAll===true?'checked':''}`}></span>
                    <span>{children}</span>
                </label>
            );
        }else{
            const {name,changeItem,checkedList,optLength} = this.context.CheckBoxGroup.options;
            const {value} = this.props;
            return (
                <label className={`checkbox_wrapper ${disabled?'disabled':''}`} name={name} onClick={disabled?()=>{}:this.changeChecked.bind(this,
                    {checkedList,value,changeItem,optLength}
                    )}>
                    <span className={`checkbox_span ${checkedList.includes(value)?'checked':''}`}></span>
                    <span>{children}</span>
                </label>
            );
        }

    }
}
class CheckBoxGroup extends React.Component{ //多选组件
    static defaultProps={
        Component:'div'
    };
    static childContextTypes={
        CheckBoxGroup:ProTypes.object
    };
    getChildContext(){
        const {options} = this.props;
       return {
           CheckBoxGroup:{
              options:options
           }
       }
    }
    render() {
        const {Component,children,options,...reset}= this.props;
        return (
         <Component {...reset}>{children}</Component>
        );
    }
}
/*
 * 选择组件（单选、多选、全选） end
 * */



export {
   Button,
   Radio,
   RadioGroup,
    CheckBox,
    CheckBoxGroup
}