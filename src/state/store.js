import axios from 'axios';
import { create } from 'zustand';

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
});

const store = create((set) => ({
  data: [],
  sortData:[],
  dataCtrl : async function(action){


    // set( (state)=>{
    //   return {data:[...state.data, action.data] } //...state.data(기존데이터)에 action.data(신규데이터)저장
    //  });

    let res;

    switch(action.type){
        case 'get' : 
        res = await instance.get("/");
        set( {data:res.data} );
        break;

        case 'post' :
          await instance.post("/",action.data);
          set( (state)=>{
              return {data:[...state.data, action.data] } 
          });
          break;

        case 'put' :
          await instance.put("/",action.data); 
          set( (state)=>{
             let update = [...state.data].map((obj)=>{
                if(action.data.id == obj.id){
                  obj.status = action.status
                }
                return obj;
              })
            return{data:update}; 
          });   
       break;
       
       case 'delete' : 
       res = await instance.delete(`/?id=${action.data}`); 
       set( (state)=> {
         let del = [...state.data].filter((obj)=>{
                       return obj.id != action.data                          
                     })
         return {data:del};
       });  
       break;
}    

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