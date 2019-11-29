import React,{ Component } from 'react';

import {Alert} from "../common";

class APP extends Component{

    render() {

        const  { props } = this.props;

        return (

            <div>

                <Alert type={"btn-success"} abstract={"123"} title={"123"} show={true}>



                </Alert>

            </div>

        );

    }

}

export default APP;