export const INITIAL_STATE = {
    title: "",
    description: "",
    skills: [''],
    timeline: "2",
    amount: "",
}

export enum ACTION_TYPES {
    CHANGE_INPUT = 'CHANGE_INPUT',
    HANDLE_TAGS = 'HANDLE_TAGS'
}

type ACTION = 
 | {
    type: ACTION_TYPES.CHANGE_INPUT, 
    payload:{
        name:string;
        value:string;
    }
}
 | {type: ACTION_TYPES.HANDLE_TAGS, payload:string[]};

export const hireTalentReducer = (state: typeof INITIAL_STATE, action:ACTION) => {
    switch (action.type) {
        case ACTION_TYPES.CHANGE_INPUT:
            return {
                ...state,
                [action.payload.name]: action.payload.value
            };
        case ACTION_TYPES.HANDLE_TAGS:
            return {
                ...state,
                skills: action.payload
            };
        default:
            return state;
    }
}