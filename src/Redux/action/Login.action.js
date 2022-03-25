import axios from "axios";

export const dashBoardRequest = () => ({
  type: 'FETCH_DASH_BOARD_REQUIST',
});

export const dashBoardSuccess = (data) => ({
  type: 'FETCH_DASH_BOARD_SUCCESS',
  payload: data,
});

export const dashBoardFailure = (error) => ({
  type: 'ETCH_DASH_BOARD_FAILURE',
  payload: error,
});

export default function fetchComicData(comicData, page){
  return dispatch => {
  dispatch(dashBoardRequest())
  axios.get(`https://gateway.marvel.com/v1/public/comics?limit=${comicData}&offset=${page}&ts=1&hash=866ddc8bf8343c53f45a710a0deb34c0&apikey=8b0c1cf5084a6b18d0034b1096ece30d`)
      .then(res => {
        console.log("ress",res);
        var comicRecord = res.data.data.results;
        dispatch(dashBoardSuccess(comicRecord));
        return res.data;
      }).catch(error => {
          dispatch(dashBoardFailure("Your Data Not Found..."));
      })
  }
}


