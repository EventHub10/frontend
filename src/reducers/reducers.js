const INITIAL_STATE = {
  counter: 0,
  user: {},
};

const actionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "UPDATE_USER":
      return {
        ...state,
        user: action.content,
      };

    default:
      return state;
  }
};

export default actionsReducer;
