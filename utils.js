/**
 * Composes message for transition in utilized format
 * @param {String} newState 
 * @param {Any} data 
 * @return {Object} {newState, data}
 */
const message = (newState, data=null) => ({
  newState, data
})


/**
 * Wraps network request in try-catch.
 * Returns a function which takes a request as argument,
 * to use `await` request should based on promise
 * @param {String} successState state to yield on success
 * @param {String} failureState state to yield on error
 * @return {Async Func}
 */
const tryCatchWrapper = (successState, failureState) =>
  async function* (request) {
    try {
      const data = await request()
      yield message(successState, data)
    }
    catch(e) {
      yield message(failureState)
    }
  }