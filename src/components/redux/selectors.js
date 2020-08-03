export const getProjList = (store) => store.projList;

export const getProjById = (store, id) => ({ ...store.projMap[id], id });

export const getProjs = (store) =>
  getProjList(store).map((id) => getProjById(store, id));
