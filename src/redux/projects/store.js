const initialState = {
   allProjects: [],
   project: {},
   nodeDataArray: [],
   linkDataArray: [],
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
      case "DATA":
         return {
            ...state,
            nodeDataArray: [...action.nodeDataArray],
            linkDataArray: [...action.linkDataArray]
         }  
        default: return {...state};   
   }
}

export default projectStore;