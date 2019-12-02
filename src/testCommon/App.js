import React,{ Component } from 'react';

import {PagiNation,DropDown} from "../common";

class APP extends Component{

    render() {

        return (

            <div>

                <DropDown

                    dropSelectd={{value:"123",title:"123"}}

                    height={100}

                    //dropList={[{value:"123",title:"123"},{value:"456",title:"123"},{value:"789",title:"123"},{value:"111",title:"123"},{value:"112",title:"123"},{value:"113",title:"123"},{value:"114",title:"123"},{value:"115",title:"123"},{value:"116",title:"123"},{value:"117",title:"123"},{value:"118",title:"123"}]}

                    /*activeValue={"11"}*/

                    type="multiple"

                    mutipleOptions={{

                        range:2,

                        searchOpen:true,

                        searchList:[

                            /*{id:'123',name:'123',list:[{id:123,name:'123'}]},*/

                            /*{id:'123',name:'123',list:[{id:123,name:'123'}]},

                            {id:'123',name:'123',list:[{id:123,name:'123'}]},

                            {id:'123',name:'123',list:[{id:123,name:'123'}]},

                            {id:'123',name:'123',list:[{id:123,name:'123'}]},

                            {id:'123',name:'123',list:[{id:123,name:'123'}]},

                            {id:'123',name:'123',list:[{id:123,name:'123'}]},

                            {id:'123',name:'123',list:[{id:123,name:'123'}]},

                            {id:'123',name:'123',list:[{id:123,name:'123'}]},*/

                        ],

                        dropMultipleList:[

                            {id:'123',name:'123',list:[{id:123,name:'123'}]},

                            /*{id:'123',name:'123',list:[{id:123,name:'123'}]},

                            {id:'123',name:'123',list:[{id:123,name:'123'}]},

                            {id:'123',name:'123',list:[{id:123,name:'123'}]},

                            {id:'123',name:'123',list:[{id:123,name:'123'}]},

                            {id:'123',name:'123',list:[{id:123,name:'123'}]},

                            {id:'123',name:'123',list:[{id:123,name:'123'}]},

                            {id:'123',name:'123',list:[{id:123,name:'123'}]},

                            {id:'123',name:'123',list:[{id:123,name:'123'}]},*/

                        ],

                    }}

                >

                </DropDown>

                <PagiNation current={1} size={"micro"} total={200}  pageSize={10}></PagiNation>

            </div>

        );

    }

}

export default APP;