import React from 'react'
import ReactDOM from 'react-dom'

import './styles/app.scss'
import Root from './Root.jsx'
import server from './server'

ReactDOM.render(
  <Root />,
  document.getElementById('root') || document.createElement('div')
)