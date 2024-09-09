import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import store from '../state/store';


const Insert = () => {

  let {dataCtrl} = store();

  let insert = (e)=>{
    e.preventDefault();
    let value = e.target.todo.value;
    let data = {
      id:uuidv4(),
      todo:value,
      status:false
    }
    //데이터 값이 비어있을때는 저장되지 않게 하기 value 값이 비어있지 않을때는 저장
    if(value !== ''){
      dataCtrl({type:"post",data});
    }else{
      alert('내용을 입력해 주세요!');
    }
    e.target.todo.value = '';  //input박스에 값을 비워주는 것
    e.target.todo.focus(); //데이터 값을 입력하라는 신호처럼 input박스에 깜빡이는 포커스
    
  }
  return (
    <div className="insert">
    <form onSubmit={insert}>
      <input type="text" name="todo" placeholder='오늘은 무엇을 하실 건가요?'/>
      <button> + </button>
    </form>
  </div>

  )
}

export default Insert