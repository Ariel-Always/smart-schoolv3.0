import React,{Component} from 'react';


class ModulesContent extends Component{

    render() {

        const { Modules } = this.props;

        return (

            <div className="content-wrapper">

                {

                    Modules.map((item,key)=>{

                        return <div key={key} className="modules-row">

                            <div className="modules-wrapper">

                                <div className="modules-type">{item.GroupName}</div>

                                <div className="module-item-wrapper clearfix">

                                    {

                                        item.Modules.map((i,k)=>{

                                            return <a href={i.AccessParam} className="module-item">



                                            </a>

                                        })

                                    }

                                </div>

                            </div>

                        </div>

                    })

                }

            </div>

        )

    }

}

export default ModulesContent;