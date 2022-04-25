import axiosClient from './axiosClient';

const feedbackApi = {
  addNewFeedback(data) {
    const url = '/feedbacks';
    return axiosClient.post(url, data);
  },

  getAllFeedback() {
    const url = '/feedbacks';
    return axiosClient.get(url);
  },
};

export default feedbackApi;
