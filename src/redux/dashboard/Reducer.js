import apiConstants from "./Constants";
import { List } from "../../data";

const initialStateSchema = {
    stages: [
        { id: "phone", value: "Phone screen", index: 1 },
        { id: "interview_1", value: "Interview 1", index: 2 },
        { id: "on_site", value: "Onsite", index: 3 },
        { id: "decision", value: "Decision", index: 4 }],
    list: List,
    viewList: List,
    forceUpdate: 0,
    listView: 'grid',
    search: "",
    error: '',
};

let initialState = initialStateSchema;

const dashboardReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case apiConstants.UPDATE_LIST_SUCCESS:
            newState = {
                ...state,
                list: action.response,
                viewList: state.search ? action.response.filter(value => {
                    if (value.role.toLowerCase().includes(state.search)) return value;
                    else if (value.company.toLowerCase().includes(state.search)) return value;
                    else if (value.name.toLowerCase().includes(state.search)) return value;
                }) : action.response,
                forceUpdate: state.forceUpdate ^ 1
            };
            return newState;

        case apiConstants.UPDATE_VIEW_SUCCESS:
            newState = {
                ...state,
                listView: action.response
            };
            return newState;

        case apiConstants.HANDLE_SEARCH_SUCCESS:
            newState = {
                ...state,
                search: action.response,
                viewList: action.response ? state.list.filter(value => {
                    if (value.role.toLowerCase().includes(action.response)) return value;
                    else if (value.company.toLowerCase().includes(action.response)) return value;
                    else if (value.name.toLowerCase().includes(action.response)) return value;
                }) : state.list
            };
            return newState;

        default:
            return state;
    }
};

export default dashboardReducer;
