import React from 'react'
import { connect } from 'react-redux';
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
        const {DataState,UIState} = this.props
        return (<Router>

            {this.props.route ? 
            (<Link to='/ImportFile/Graduate' target='_blank'><Button className='btn-toGraduate' color='blue' shape='round'>导入毕业去向</Button></Link>)
                : (<span className='timeBanner_tips'>
                    最近有
                <span className='tips_num'>
                        {DataState.LogPreview.unreadLogCount}
                    </span>
                    份档案发生了变更,
                <Link to='/UserArchives/LogDynamic' target='_blank' className='tips_handle'>
                        查看详情>></Link>
                </span>)}
        </Router>

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
export default connect(mapStateToProps)(TimeBanner)