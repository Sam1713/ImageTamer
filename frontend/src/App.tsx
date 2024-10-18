import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './index.css'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Header from './components/header'

function App() {

  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/signup'element={<Signup/>}/>
      <Route path='/signin'element={<Signin/>}/>

    </Routes>
    </BrowserRouter>
  ) 
}

export default App
