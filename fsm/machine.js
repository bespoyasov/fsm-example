/**
 * Implements FSM abstraction.
 * @param {String} initial initial state for machine
 * @param {Object} states all possible states
 * @param {Object} transitions all transition functions
 * @param {Any} data data to store
 */
class StateMachine {
  constructor({
    initial, 
    states, 
    transitions, 
    data=null,
  }) {
    this.transitions = transitions
    this.states = states
    this.state = initial
    this.data = data
    
    this._onUpdate = null
  }

  stateOf() {
    return this.state
  }

  _updateState(newState, data=null) {
    this.state = newState
    this.data = data
    
    this._onUpdate 
      && this._onUpdate(newState, data)
  }

  async performTransition(transitionName) {
    const possibleTransitions = this.transitions[this.state]
    const transition = possibleTransitions[transitionName]
    if (!transition) return

    const current = {
      state: this.state,
      data: this.data,
    }

    for await (const {newState, data=null} of transition(current)) {
      this._updateState(newState, data)
    }
  }

  subscribe(event, callback) {
    if (event === 'update') this._onUpdate = callback || null
  }
}