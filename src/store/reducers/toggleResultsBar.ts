interface Action {
    payload?: string,
    type: string
}
 
 
 const initialState = {
     show: false
 }

 const toggleResultsBar = (state = initialState, action:Action) => {
     const {
         type
     } = action;
     switch (type) {
         case 'HIDEBAR':
             return {
                show: false
             }
        case 'TOGGLEBAR':
            return {
               show: !state.show
            }
             default:
                 return state;
     }
 }

 export default toggleResultsBar;