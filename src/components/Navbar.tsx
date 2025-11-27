import React from 'react'
import { Link ,useNavigate } from 'react-router'
import './Navbar.css'
import { useDispatch ,useSelector} from 'react-redux';
import { clearCredentials } from '../features/slice/authSlice';
import type { RootState } from '../store/store'
import { LogOut } from 'lucide-react';

const Navbar: React.FC = () => {

    const dispatch =useDispatch();
    const navigate= useNavigate();

    const{isAuthenticated,user} =useSelector((state:RootState)=> state.authSlice);
    // console.log(user)

    const handleLogout=()=>{
        dispatch (clearCredentials());
        navigate ("/login");
    }
    return (       
         <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                </div>
                <ul
                    tabIndex={-1}
                    className="vehicle vehicle-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 h-40 w-31 p-2 shadow text-gold">
                    <Link to="/" className="navbar-link">Home</Link><br></br>
                    <Link to="/about" className="navbar-link">About</Link><br></br>
                    <Link to="/vehicles" className="navbar-link">Our Vehicles</Link><br></br>
                    <Link to="/contact" className="navbar-link">Contact Us</Link><br></br>

                     {/* {isAuthenticated && (
                        <Link to="/dashboard" className="navbar-link">Dashboard</Link>
                     )} */}
                </ul>
                </div>
                <a className=" text-x0.5 text-gold ">Lemcee<br/>Executive</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="vehicle vehicle-horizontal px-1">
                <Link to="/" className="navbar-link">Home</Link>
                <Link to="/about" className="navbar-link">About</Link>
                <Link to="/vehicles" className="navbar-link">Our Vehicles</Link>
                <Link to="/contact" className="navbar-link">Contact Us</Link>
                {/* {isAuthenticated && (
                    <Link to="/dashboard" className="navbar-link">Dashboard</Link>
                )} */}
                </ul>
            </div>
            <div className="navbar-end" style={{justifyContent:'space-evenly'}}>
                <div>
                {!isAuthenticated?(
                        <Link to="/register">
                        <a className="btn bg-black-100 hover:bg-black-900 text-white border-black-900 hover:border-black-900 px-6 py-2 font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                            BOOK NOW
                            </a>
                        </Link>):(
                            <label className="input">
                                    <button
                                    onClick={handleLogout}
                                    className="flex items-center text-950 hover:text-gray-300"
                                >
                                    <LogOut color="#318c18" className='mr-3'/>
                                    Logout
                                </button> 
                                    </label>
                        )
                }
               
                </div>
                {/* {!isAuthenticated ? (
                    <Link to="/login">
                        <a className="btn bg-green-800 hover:bg-green-900 text-white border-green-800 hover:border-green-900 px-6 py-2 font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                            Login
                        </a>
                    </Link>) : (
                    <div  >
                        <div className="flexitems-center">
                            <span className='text- dark'>Hey,{user?.first_name}</span>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center text-slate-950 hover:text-gray-300"
                                >
                                    <LogOut color="#318c18" className='mr-3'/>
                                    Logout
                                </button> 
                        </div>             
                    </div>
                )
                } */}
                
            </div>
        </div>
    )
}

export default Navbar