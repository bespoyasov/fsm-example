// render the app helper
const renderApp = (state, data) => {
  const html = render(state, data)
  document.getElementById('root').innerHTML = html
}

// create an FSM object
const fsm = new StateMachine({
  states,
  transitions,
  initial: states.INITIAL,
})

// subscribe to state updates
fsm.subscribe('update', (state, data) =>
  renderApp(state, data))


// helpers to bind button clicks with FSM transitions
const transitionFetch = () =>
  fsm.performTransition('fetch')

const transitionClear = () =>
  fsm.performTransition('clear')

const transitionRetry = () =>
  fsm.performTransition('retry')

const transitionMore = () =>
  fsm.performTransition('loadMore')

const transitionReload = () =>
  fsm.performTransition('reload')


// initial render
renderApp(states.INITIAL)