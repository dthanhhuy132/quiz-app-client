import axiosClient from './axiosClient';

const questionApi = {
  getAllQuestions() {
    const url = '/questions';
    return axiosClient.get(url);
  },

  addNewQuestion(data) {
    const url = '/questions';

    console.log('data trong axios', data);
    return axiosClient.post(url, data);
  },

  deleteQuestion(id) {
    const url = `/questions/${id}`;

    return axiosClient.delete(url);
  },

  editQuestion(id) {
    const url = `/questions/${id}`;

    return axiosClient.patch(url);
  },
};

export default questionApi;
