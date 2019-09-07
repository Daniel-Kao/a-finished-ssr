import axios from 'axios';

const regenerate = list => ({
  type: 'newslist',
  list,
});

export const getNewsList = () => (dispatch, getState, axiosInstance) => {
  return axiosInstance.get('/todos').then(res => {
    dispatch(regenerate(res.data));
  });
};
