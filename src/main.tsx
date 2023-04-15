import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import ReactQueryProvider from '@/lib/react-query/Provider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ReactQueryProvider>
      <App />
    </ReactQueryProvider>
  </React.StrictMode>,
)
