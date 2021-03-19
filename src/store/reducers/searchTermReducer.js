const searchTermReducer = (state = "", action) => {
    const {
        payload,
        type
    } = action;
    switch (type) {
        case 'SETSEARCHTERM':
            return state = payload;
        default:
            return state;
    }

}

export default searchTermReducer;