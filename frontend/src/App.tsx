import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Header from './components/Header';
import Home from './pages/Home';
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Route>

        {/* Private routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
