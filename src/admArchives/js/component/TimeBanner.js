import React from 'react'
import '../../scss/TimeBanner.scss'
import { HashRouter as Router, Route, Link, BrowserRouter } from 'react-router-dom';
import { Button } from '../../../common'
class TimeBanner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (<Router>

            {this.props.route ? (<Link to='/ImportFile/Graduate' target='_blank'><Button className='btn-toGraduate' color='blue' shape='round'>导入毕业去向</Button></Link>)
                : (<span className='timeBanner_tips'>
                    最近有
                <span className='tips_num'>
                        {3334}
                    </span>
                    份档案发生了变更,
                <a href='#' target='_blank' className='tips_handle'>
                        查看详情>></a>
                </span>)}
        </Router>

        )
    }
}

export default TimeBanner