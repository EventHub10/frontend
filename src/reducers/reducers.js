const INITIAL_STATE = {
  counter: 0,
  user: {},
  events: []
};

const actionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "UPDATE_USER":
      return {
        ...state,
        user: action.content,
      };

    case "UPDATE_EVENTS":
      return {
        ...state,
        events: action.content,
      };

    default:
      return state;
  }
};

export default actionsReducer;
