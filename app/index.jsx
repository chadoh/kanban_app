import React from 'react'
import App from './components/App'
import './main.css'

main()

function main() {
  const app = document.createElement('div')
  document.body.appendChild(app)
  React.render(<App/>, app)
}
