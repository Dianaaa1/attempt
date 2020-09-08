export const ADD_PROJ = "ADD_PROJ";
export const TOGGLE_PROJ = "TOGGLE_PROJ";
export const EDIT_PROJ = "EDIT_PROJ";
export const DELETE_PROJ = "DELETE_PROJ";
export const AUTH_USER="AUTH_USER";
export const USER_DATA="USER_DATA";
export const GETJSON="GET_JSON";

export type typeOfAction=typeof TOGGLE_PROJ| typeof DELETE_PROJ;

export interface IaddProject{
    type: typeof ADD_PROJ,
    payload: {
        id: number,
        name: string,
        description: string
    }
}
export interface ItoggleProject{
    type: typeof TOGGLE_PROJ,
    payload: 
    {
        id: number;
    }
    
}
export interface IeditProject{
    type: typeof EDIT_PROJ,
    payload: {
        id: number,
        name: string,
        description: string
    }
}
export interface IdeleteProject{
    type: typeof DELETE_PROJ,
    payload: {
        id: number;
    }
}
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
export type actionType=IaddProject | ItoggleProject | IeditProject | IdeleteProject | IauthUser | IuserData | IgetJSON;