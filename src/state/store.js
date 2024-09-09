import axios from 'axios';
import { create } from 'zustand';

const instance = axios.create({
    baseURL: 'https://port-0-express-server24-m0uahclw12f8e972.sel4.cloudtype.app/todos',
});

const store = create((set) => ({
  data: [],
  sortData:[],
  dataCtrl : async function(action){

    let res;

    switch(action.type){
        case 'get' : 
        res = await instance.get("/"); break;

        case 'post' : 
        res = await instance.post("/",action.data); break;

        case 'put' : 
        
        res = await instance.put("/",action.data); break;
       
        case 'delete' : 
        res = await instance.delete(`/?id=${action.data}`); break;
    }

    set({data:res.data.list})

  },
  sortCtrl: function(sort){
  
   set((state)=>{
      //true-> 끝낸 일 , false -> 해야할 일

      //내가 해야할 일 return {sortData:state.data.filter(obj=> obj.status == false)};
      //내가 한 일 return {sortData:state.data.filter(obj=> obj.status == true)}
      //Alldata : return {sortData:state.data}
      
    let findData;
    switch(sort.type){
     case 'Active': return {sortData:state.data.filter(obj=> obj.status == false)}; 
     case 'Completed': return {sortData:state.data.filter(obj=> obj.status == true)}; 
     default: return {sortData:state.data};
    } 
   });
  }
}))

export default store;