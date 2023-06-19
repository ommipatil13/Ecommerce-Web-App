import React from 'react';
import { NavLink, Link } from 'react-router-dom';
// import { FaShoppingCart } from 'react-icons/fa';
import { useAuth } from '../../context/Auth';
import toast from 'react-hot-toast';
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/cart';
import { Badge } from 'antd';

const Header = () => {
    const [auth, setAuth] = useAuth()
    const [cart] = useCart()
    const categories = useCategory()
    const handleLogout = () => {
        setAuth({
            ...auth, user: null, token: ""
        })
        localStorage.removeItem("auth")
        toast.success("Logout Human")
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid ">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link to='/' className="navbar-brand" >🛒Ommi E-Commerce</Link>
                        <div className='  mx-0 mx-lg-auto p-2'>

                            <SearchInput />
                        </div>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to='/' className="nav-link " >Home</NavLink>
                            </li>

                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to={'/categories'} data-bs-toggle="dropdown" >
                                    Categories
                                </Link>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item" to={'/categories'}>All Categories</Link>
                                    </li>
                                    {categories?.map((c) => (
                                        <li>

                                            <Link className="dropdown-item" to={`/category/${c.slug}`}>{c.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>

                            {/* <li className="nav-item">
                                <NavLink to='/category' className="nav-link " >Category</NavLink>
                            </li> */}
                            {
                                !auth.user ? (<>
                                    <li className="nav-item">
                                        <NavLink to='/register' className="nav-link" >Register</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to='/login' className="nav-link" >Login</NavLink>
                                    </li>
                                </>)
                                    :
                                    (<>
                                        <li className="nav-item dropdown">
                                            <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {auth?.user?.name}
                                            </NavLink>
                                            <ul className="dropdown-menu">
                                                <li><NavLink to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`} className="dropdown-item" href="#">Dashboard</NavLink></li>
                                                <li> <NavLink onClick={handleLogout} to='/login' className="dropdown-item bg-danger text-white" >Logout</NavLink> </li>
                                            </ul>
                                        </li>


                                    </>)
                            }
                            <li className="nav-item">
                                <Badge count={cart?.length} showZero>
                                    <NavLink to='/cart' className="nav-link" > Cart  </NavLink>
                                    {/* {cart?.length} */}
                                </Badge>
                            </li>
                        </ul>
                        {/* <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form> */}
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Header