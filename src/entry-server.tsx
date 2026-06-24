import { renderToString } from 'react-dom/server'
import App from './App'
import { routes } from './routes'

export function render(): string {
  return renderToString(
    <App />,
  )
}

export { routes }
