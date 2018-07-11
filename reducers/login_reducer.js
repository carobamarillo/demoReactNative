const initialState = {
  user: '',
  password: ''
};

export function tabnavi(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: 'hola',
        password: 1234
      };
    default:
      return state;
  }
}
