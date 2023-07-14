export const updateUser = (newUser) => ({
  type: "UPDATE_USER",
  content: newUser
});

export const updateEvents = (eventUpdated) => ({
  type: "UPDATE_EVENTS",
  content: eventUpdated
});
