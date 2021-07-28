const initialState = {
   allProjects: [],
   project: {},
}

const projectStore = (state=initialState,action) => {
   switch(action.type){
       case "PROJECTS":
           return {
               ...state,
               allProjects: [...action.allProjects]
           }
      case "PROJECT_DETAIL":
         return {
            ...state,
            project: action.project
         }
        default: return {...state};   
   }
}

export default projectStore;