import React from 'react';

import '../../scss/TipsPower.scss';
class TipsPower extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        const PowerList = this.props.data.Powers.map((power, index) => {
            return (
                <Power key={index} power={power}></Power>
            )
        })
        return (
            <React.Fragment> 
                    {PowerList}
            </React.Fragment>
        )
    }
}

function Power(props) {
    const data = props.power;
    const dataList = data.PowerChild.map((child, index) => {
        return (
            <span className='powerText' key={child.value}>{child.PowerChildName}<span className='text-after'>，</span></span>
        )
    })
    return (
        <div className='tipsPower-Box'>
            <div className='box-top'>
                <span className='top-tip'>{data.PowerName+':'}</span>
            </div>
            <hr style={{ border: '1px #ccc dotted' }} />
            <div className='box-content'>
                {dataList}
            </div>
        </div>
    )
}
export default TipsPower;