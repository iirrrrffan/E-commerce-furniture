import './App.css';
import Home from './components/Pages/Home';
import Logn from './components/Authentication/Logn';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import Bedroom from './components/collections/Bedroom';
import Kitchen from './components/collections/Kitchen';
import Office from './components/collections/Office';
import Childrenbedroom from './components/collections/Childrenbedroom';
import Dininghall from './components/collections/Dininghall';
import Allitem from './components/collections/Allitem';
import { createContext, useState } from 'react';
import { Product } from './Productdatas';
import Viewproduct from './components/collections/Viewproduct';
import Registration from './components/Authentication/Registration';
import Cart from './components/Pages/Cart';
import { ToastContainer } from 'react-toastify';
import AdminLogin from './components/AdminSide/AdminLogin';
import AdminMainPage from './components/AdminSide/AdminMainPage';
import Users from './components/AdminSide/Users';
import Orders from './components/AdminSide/Orders';
import Adminhome from './components/AdminSide/Adminhome';
import Addproduct from './components/AdminSide/Addproduct';
import Productlist from './components/AdminSide/Productlist';
import Editlist from './components/AdminSide/Editlist';

export const userContext=createContext()

function App() {
  const [product,setProduct]=useState(Product)
  const [user,setUser]=useState([])
  const [login,setLogin]=useState(false)
  const [cart,setCart]=useState([])
  return (                          
    <div >

<userContext.Provider value={{product,setProduct,user,setUser,login,setLogin,cart,setCart}}>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/sign' element={<Registration/>}/>
      <Route path='/login' element={<Logn/>}/>
      <Route path='/bedroom' element={<Bedroom/>}/>
      <Route path='/kitchen' element={<Kitchen/>}/>
      <Route path='/office' element={<Office/>}/>
      <Route path='/childrenroom' element={<Childrenbedroom/>}/>
      <Route path='/dininghall' element={<Dininghall/>}/>
      <Route path='/all' element={<Allitem/>}/>
      <Route path='/view/:id' element={<Viewproduct/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/adminlogin' element={<AdminLogin/>}/>
      <Route path='/adminpage' element={<AdminMainPage/>}/>
      <Route path='/users' element={<Users/>}/>
      <Route path='/orders' element={<Orders/>}/>
      <Route path='/adminhome' element={<Adminhome/>}/>
      <Route path='/addproduct' element={<Addproduct/>}/>
      <Route path='/productlist' element={<Productlist/>}/>
      <Route path='/editlist/:id' element={<Editlist/>}/>
      
     </Routes>
    </userContext.Provider>
    <ToastContainer />

    </div>
  );
}

export default App;
