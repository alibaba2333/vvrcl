function CategoryReducer(state={
    category:[
        {id:1,idx:"4cd53568-4296-4398-97ce-1aa39b9256b5",name:"English"},
        {id:2,idx:"fa299921-ff87-4281-88a9-51e2c37390c5",name:"Korean"},
        {id:3,idx:"167a713a-0a98-4d7f-8664-2aeb6a8c3d93",name:"Programming"},
        {id:4,idx:"d1a614a9-ed75-42a7-b2cc-82d8baa764bc",name:"Languagesgfg"},
        {id:5,idx:"0bc0d3a8-2539-492a-93be-cdf319d020b0",name:"Business eee"},
        {id:6,idx:"5134cb7f-8289-4b9c-9774-09c977eea49c",name:"tashkent"},

    ],
    editData:""
},action){
    switch (action.type) {
        case "ADD_CATEGORY" :
            let kategoriya = [...state.category]

            kategoriya.push({
                id:state.category.length+1,
                idx: action.payload.idx,
                name:action.payload.name,

            })

            state = {...state,category: kategoriya}
            break
        case "DELETE_CATEGORY" :
            let a = [...state.category]

            a.map((item,index)=>{
                a.splice(index,1)
            })
            state = {...state,category: a}
            break
        case "EDIT_DATA" :
            state={...state,editData: action.payload}
            break
        case "EDIT_SAVE" :
            let b = state.category.map(item=>{
                let data = state.editData

                if (item.id === data.id){
                    item={
                        ...item,
                        name:action.payload.name,
                        idx:action.payload.idx,


                    }
                }
                return item

            })
            state={...state,category: b}



    }
    return state
}
export default CategoryReducer