import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
// import { Provider } from 'react-redux'
import Provider from './Provider';
import App from './components/App'
import rootReducer from './reducers'

const store = createStore(rootReducer)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
