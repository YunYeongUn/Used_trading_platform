import axios from 'axios';

const callApi = async (requestType, router, data, setData) => {
  router = router || '';
  data = data || {};
  setData = setData || function () {};

  try {
    const res = await axios[requestType](
      process.env.REACT_APP_URL + router,
      data,
      { withCredentials: true }
    );
    if (requestType === 'get') {
      setData(res?.data);
    } else {
      alert(res?.data);
    }
  } catch (err) {
    alert(err.response.data);
  }
};

export default callApi;
