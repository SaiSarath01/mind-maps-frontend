const initialState = {
    userId: "",
    token: ""
}

const userStore = (state=initialState,action) => {
   switch(action.type){
       case "LOGIN":
           console.log(action)
           break;
        default: return {...state};   
   }
}

export default userStore;