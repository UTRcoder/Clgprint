import './App.css';
import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Login from './screens/Login';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import Signup from './screens/Signup.js';
import MyOrders from './screens/MyOrders.js';
import {CartProvider} from './Components/ContextReducer.js'


function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/creatuser" element={<Signup />} />
            <Route exact path="/myOrderData" element={<MyOrders/>} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
