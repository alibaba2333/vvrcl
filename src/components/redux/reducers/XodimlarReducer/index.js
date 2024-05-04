function XodimlarReducer(state={
    xodimlar:[
        {id:1,fullname:"Sardor",email:"r1zer.2110@gmail.com",password:"2006"}
    ],
    editData:""
},action){
    switch (action.type){
        case "ADD_USER" :
            let users = [...state.xodimlar]
            users.push({
                id:state.xodimlar.length+1,
                fullname: action.payload.fullname,
                email:action.payload.email,
                password: action.payload.password

            })
            state={...state,xodimlar: users}
            break
        case "DELETE_USER" :
            let a = [...state.xodimlar]

            a.map((item,index)=>{
                a.splice(index,1)
            })
            state = {...state,xodimlar: a}
            break
        case "EDIT_DATA" :
            state={...state,editData: action.payload}
            break
        case "EDIT_SAVE" :
            let b = state.xodimlar.map(item=>{
                let data = state.editData

                if (item.id === data.id){
                    item={
                        ...item,
                        fullname:action.payload.fullname,
                        email:action.payload.email,
                        password:action.payload.password,

                    }
                }
                return item

            })
            state={...state,xodimlar: b}






    }
    return state

}
export default XodimlarReducer;