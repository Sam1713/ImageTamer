import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {persistor, store} from '../src/redux/store.ts'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>
)
