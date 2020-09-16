import { ALL_PROJ, IallProject, GET_STATE, Iletfetch, AUTH_USER, USER_DATA, IauthUser, IuserData } from "./actionTypes";

export function allProject( project: any, isFetching:boolean ): IallProject {
  return {
    type: ALL_PROJ,
    payload: {
        isFetching,
      project
    },
  };
}
export function letFetch(isFetching: boolean ): Iletfetch {
  return {
    type: GET_STATE,
    payload: {
      isFetching,
  },
  };
}
export function authUser (login: boolean) : IauthUser{
  return {
    type: AUTH_USER,
    payload: { login },
  }
};
export function userData (username: string, password:string) : IuserData{
  return {
    type: USER_DATA,
    payload: {username, password}
  }
};
