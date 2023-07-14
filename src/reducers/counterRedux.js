const INITIAL_STATE = {
  counter: 0,
  user: false,
};

const actionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "UPDATE_USER":
      return {
        ...state,
        user: !state.user,
      };

    default:
      return state;
  }
};

export default actionsReducer;
