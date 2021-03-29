interface Action {
    payload?: string;
    type: string;
  }
  
  interface State {
    searchTerm: string;
  }
  
  const initialState: State = {
    searchTerm: "",
  };
  
  const searchTermReducer = (state = initialState, action: Action) => {
    const { payload, type } = action;
    switch (type) {
      case "SETSEARCHTERM":
        return {
          searchTerm: payload,
        };
      // return state = payload;
      default:
        return state;
    }
  };
  
  export default searchTermReducer;
  