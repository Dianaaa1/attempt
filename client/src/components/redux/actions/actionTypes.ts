export const ALL_PROJ = "ADD_PROJ";
export const GET_STATE = "GET_STATE";
export type typeOfAction=typeof ALL_PROJ | typeof GET_STATE;
export type actionType=IallProject | Iletfetch | IauthUser | IuserData;

export interface IallProject{
    type: typeof ALL_PROJ,
    payload: {
        project : any,
        isFetching: boolean,
    }
}
export interface Iletfetch{
    type: typeof GET_STATE,
    payload: {
        isFetching: boolean,
    }
}

export const AUTH_USER="AUTH_USER";
export const USER_DATA="USER_DATA";
export const GETJSON="GET_JSON";

export interface IauthUser{
    type: typeof AUTH_USER,
    payload:{
        login: boolean
    }
}
export interface IuserData{
    type: typeof USER_DATA,
    payload: {
        username: string,
        password: string,
    }
}
export interface IgetJSON{
    type: typeof GETJSON,
    payload: {
        json: any
    }
}
