import axiosClient from './axiosClient';

const userApi = {
  addNewUserAndMark(data) {
    const url = '/users';

    return axiosClient.post(url, data);
  },

  getAllUserMark() {
    const url = '/users';

    return axiosClient.get(url);
  },
};

export default userApi;
