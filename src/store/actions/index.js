export const setSearchTerm = (Term) => {
    return {
        type: 'SETSEARCHTERM',
        payload: Term
    };
}