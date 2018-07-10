const initialState = {
  count1: 5,
  isFetching: false,
  errorMessage: '',
  people: []
};

export function tabnavi(state = initialState, action) {
  switch (action.type) {
    case 'FETCHING_PEOPLE_REQUEST':
      return { ...state, isFetching: true };
    case 'FETCHING_PEOPLE_FAILURE':
      return { ...state, isFetching: false, errorMessage: action.payload };
    case 'FETCHING_PEOPLE_SUCCESS':
      return { ...state, isFetching: false, people: action.payload };

    default:
      return state;
  }
}
