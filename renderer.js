const renderBackBtn = () =>
  `<button type='button' onclick='transitionClear()'>Go back</button>`

const renderStatus = (status) => 
  `<div id='status'>${status}</div>`

const renderPostsList = (posts) => 
  posts && posts.length 
    ? `<ul>
      ${posts.reduce((res, post) => 
        res + `<li>${post.title}</li>`, '')}
    </ul>`
    : ''


/**
 * Renders markup for an app
 * @param {String} state 
 * @param {Any} payload 
 * @return {String} html to inject
 */
const render = (state, payload) => {
  switch (state) {
    case states.INITIAL:
      return `<div>
        ${renderStatus('How are you today?')}
        <button type='button' onclick='transitionFetch()'>Load posts</button>
      </div>`

    case states.LOADING:
      return `<div>
        ${renderStatus('Loading...')}
        ${renderPostsList(payload)}
      </div>`

    case states.FAILURE:
      return `<div>
        ${renderStatus('Loading failed!')}
        ${renderBackBtn()}
        <button type='button' onclick='transitionRetry()'>Retry!</button>
      </div>`

    case states.SUCCESS:
      return `<div>
        ${renderStatus('Yay!')}
        ${renderPostsList(payload)}
        ${renderBackBtn()}
        <button type='button' onclick='transitionReload()'>Reload all!</button>
        <button type='button' onclick='transitionMore()'>Load more!</button>
      </div>`
  
    default: return ''
  }
}