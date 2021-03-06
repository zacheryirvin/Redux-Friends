import axios from 'axios';
import {
  FETCHINGFRIENDS,
  FETCHEDFRIENDS,
  ERROR,
  ADDINGFRIEND,
  ADDEDFRIEND,
  DELETINGFRIEND,
  DELETEDFRIEND,
  RESET,
} from './types.js';

export const fetchingFriends = () => {
  return dispatch => {
    dispatch({type: FETCHINGFRIENDS});
    axios
      .get('http://www.localhost:5000/api/friends')
      .then(res => {
        dispatch({type: FETCHEDFRIENDS, payload: res.data});
      })
      .catch(err => {
        dispatch({
          type: ERROR,
          payload:
            'There was a problem retrieving your friends. Please try again',
        });
      });
  };
};

export const addfriend = (friend, friendsEmails) => {
  if (
    !friendsEmails.includes(friend.email) &&
    friend.name != '' &&
    friend.age != ''
  ) {
    return dispatch => {
      dispatch({type: ADDINGFRIEND});
      axios
        .post('http://www.localhost:5000/api/friends', friend)
        .then(res => {
          dispatch({type: ADDEDFRIEND, payload: res.data});
        })
        .catch(err => {
          dispatch({
            type: ERROR,
            payload: 'There was a problem adding your friend. Pleas try again',
          });
        });
    };
  } else {
    return dispatch => {
      dispatch({
        type: ERROR,
        payload: 'The email provided is already taken, please try another',
      });
    };
  }
};

export const deletedFriend = id => {
  return dispatch => {
    dispatch({type: DELETINGFRIEND});
    axios
      .delete(`http://www.localhost:5000/api/friends/${id}`)
      .then(res => {
        console.log(res.data);
        dispatch({type: DELETEDFRIEND, payload: res.data});
      })
      .catch(err => {
        dispatch({
          type: ERROR,
          payload: `There was a problem deleting the friend `,
        });
      });
  };
};

export const resetMsg = () => {
  return {type: RESET};
};
