import React from 'react';
import { Scrollbars } from "react-custom-scrollbars";

import '../../scss/TipsLog.scss';
class TipsLog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        let Logs = this.props.data;
        return (
            <React.Fragment>
                <div className='tips-Box'>
                <Scrollbars autoHeight autoHeightMax={350} style={{ width: "400px" }}>
                    {
                        Logs instanceof Array && Logs.map((child, index) => {
                            return (
                                <div key={index} className='box-content'>
                                    <div className='content'>
                                        <span title={child.Content} className={`content-text `}>{child.Content}</span>
                                    </div>
                                    <hr style={{ border: '1px #ccc dotted' }} />
                                </div>
                            )
                        })
                    }

</Scrollbars>
                </div>
            </React.Fragment>
        )
    }
}

export default TipsLog;