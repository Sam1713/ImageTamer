import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './index.css'
import Signup from './pages/Signup'
import Signin from './pages/Signin'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/'element={<Signup/>}/>
      <Route path='/'element={<Signin/>}/>

    </Routes>
    </BrowserRouter>
  ) 
}

export default App
