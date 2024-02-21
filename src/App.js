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
import { createContext, useEffect, useState } from 'react';
import { Product } from './Productdatas';
import Viewproduct from './components/collections/Viewproduct';
import Registration from './components/Authentication/Registration';
import Cart from './components/Pages/Cart';
import { ToastContainer, toast } from 'react-toastify';
import AdminLogin from './components/AdminSide/AdminLogin';
import AdminMainPage from './components/AdminSide/AdminMainPage';
import Users from './components/AdminSide/Users';
import Orders from './components/AdminSide/Orders';
import Adminhome from './components/AdminSide/Adminhome';
import Addproduct from './components/AdminSide/Addproduct';
import Productlist from './components/AdminSide/Productlist';
import Editlist from './components/AdminSide/Editlist';
// ---------------new-----------------------1
import axios from "axios";
import Wish from './components/collections/Wish';




// -----------------------------------------1
export const userContext=createContext()

// -----------------------new----------------------2
console.log(process.env.REACT_APP_BASE_URL)

export const Axios = axios.create({
  baseURL : process.env.REACT_APP_BASE_URL||"http://localhost:3000",
  headers: {
    "Content-Type":"application/json",
    Authorization:  `Bearer ${localStorage.getItem("jwt_token")}`,
  }

})
console.log(process.env.REACT_APP_BASE_URL,"haiu")
//-----------------------------------------------------------2

function App() {
  const [product,setProduct]=useState(Product)
  const [user,setUser]=useState([])
  const [login,setLogin]=useState(false)
  const [cart,setCart]=useState([])
  const [wishLit ,setWishlist] = useState([])
const [wishStatus, setWishStatus] = useState(false)

const userId = localStorage.getItem("userID")
console.log(userId,"KKk");

  useEffect(()=>{
         
    const fetchData = async()=>{
      try{
      const response = await Axios.get(`api/users/${userId}/wishList`)

       if(response.status === 200){
            setWishlist(response.data.data)
            setWishStatus(true)

       }
      }catch(error){
          console.log(error);
      }

    }
       fetchData()
  },[])









  const addtowishlist = async (productId) => {
    try {
      await Axios.post(`api/users/${userId}/addtowishList`,{productId})
      const response = await Axios.get(`api/users/${userId}/wishList`)

      console.log(response,"ttt");

      if(response.status === 200){
        toast.success("Added to wishlist")
        setWishlist(response.data.data)
         

      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }




  
      


  return (                          
    <div >

<userContext.Provider value={{product,setProduct,user,setUser,login,setLogin,cart,setCart,addtowishlist}}>
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
      <Route path='/wishlist' element={<Wish/>}/>
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
