// To set loading state, perform a network request
// and set success or failure state after request is done.
// Clears all older posts
async function* loadNewPosts() {
  yield message(states.LOADING)
  const performRequest = tryCatchWrapper(states.SUCCESS, states.FAILURE)
  yield* performRequest(fetchPosts)
}

// To append new posts after existing.
// Example of usage FSM with data storage inside
async function* appendPosts(current) {
  yield message(states.LOADING, current.data)
  const performRequest = tryCatchWrapper(states.SUCCESS, states.FAILURE)
  
  for await (const update of performRequest(fetchPosts)) {
    const {newState, data=null} = update
    const newData = data !== null 
      ? [...current.data, ...data]
      : null

    yield message(newState, newData)
  }
}

// To clear data and return to initial state
function* clear() {
  yield message(states.INITIAL)
}


/**
 * Dict of all possible transitions between states.
 * Each transition func returns a new state which
 * FSM should be in after transition
 */
const transitions = {
  [states.INITIAL]: {
    fetch: loadNewPosts,
  },

  [states.LOADING]: {},

  [states.SUCCESS]: {
    loadMore: appendPosts,
    reload: loadNewPosts,
    clear: clear,
  },
  
  [states.FAILURE]: {
    retry: loadNewPosts,
    clear: clear,
  },
}
