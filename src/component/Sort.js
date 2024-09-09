import React, { useEffect, useState } from 'react'
import store from '../state/store';

const Sort = () => {
    // <video src="" /> <source src="" type="">
    // <audio src=""></audio>
    let {data, sortData,sortCtrl} = store();
    let [type, setType] = useState('All');

     useEffect(()=>{
        sortCtrl({type});
     },[data,type])   //의존성 배열에 2개의 변수값, data가 변경되도 type이 변경되도 
  return (
    <div className='footer'>
        <div>할일 {sortData.length}개 </div>
        <div>
            <button onClick={()=>setType('All')}>All</button>
            <button onClick={()=>setType('Active')}>Active</button>
            <button onClick={()=>setType('Completed')}>Completed</button>
        </div>
    </div>
  )
}

export default Sort