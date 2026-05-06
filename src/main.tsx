import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import posthog from 'posthog-js'
import './index.css'
import App from './App.tsx'

posthog.init('phc_uRSJAsuLXnRN5ZQYps8pHhYAjVtbHCKwwQG6ovU3WWpx', {
  api_host: 'https://us.i.posthog.com',
  person_profiles: 'always',
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
