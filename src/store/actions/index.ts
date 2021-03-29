export const setSearchTerm = (Term: string) => {
    return {
        type: 'SETSEARCHTERM',
        payload: Term
    };
}

export const hideBar = () => {
    return {
        type: 'HIDEBAR'
    }
}

export const toggleBar = () => {
    return {
        type: 'TOGGLEBAR'
    }
}