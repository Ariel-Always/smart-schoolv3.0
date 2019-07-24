import React from 'react';
import imgTable from './images/table/table.png';
import imgPage from './images/pagenation/page.png';
const Table = function () {
  console.log("this is a common plugin Table!");
  return <div className='table'><img src={imgTable}></img></div>
};

const PageNation = function () {
    console.log("this is a common plugin PageNation!");
    return <div className='page'><img src={imgPage}></img></div>
};

export {
    PageNation,
    Table
};