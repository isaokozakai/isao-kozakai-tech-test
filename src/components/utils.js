import axios from 'axios';
import _ from 'lodash';

export const getRandomActivity = async (criteria) => {
  try {
    const { data } = await axios.get('http://www.boredapi.com/api/activity', { params: criteria });
    if (data?.error === 'No activity found with the specified parameters') {
      throw 'No activity matches the criteria';
    }

    return data;
  } catch (error) {
    throw new Error(error);
  }
};
