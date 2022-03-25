const dashBoardState = {
    loading: false,
    comicsData: null,
    error: '',
}
export default function dashboardReducer(state = dashBoardState, action) {

    switch (action.type) {
        case "FETCH_DASH_BOARD_REQUIST":
            return {
                ...state,
                loading: true

            }
        case "FETCH_DASH_BOARD_SUCCESS":
            let dummyComicData = []
            const newData = action.payload
            if (newData.length > 0 && state.comicsData.length > 0) {
                dummyComicData = state.comicsData
            }
            if (newData.length > 0) {
                newData.map(item => {
                    dummyComicData.push(item)
                })
            }
            return {
                ...state,
                loading: false,
                comicsData: dummyComicData,
                error: ''

            }
        case "FETCH_DASH_BOARD_FAILURE":
            return {
                ...state,
                loading: false,
                comicsData: [],
                error: action.payload

            }
        default:
            return state;
    }
}