import React from 'react'
import '../../scss/TimeBanner.scss'
class TimeBanner extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    render(){
        return (
            <span className='timeBanner_tips'>最近有<span className='tips_num'>{3334}</span>份档案发生了变更,<a href='#' target='_blank' className='tips_handle'>查看详情>></a></span>
        )
    }
}

export default TimeBanner