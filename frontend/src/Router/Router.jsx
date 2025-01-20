import React from 'react'
import Navbar from '../Components/Header/Navbar'
import { Outlet } from 'react-router'

const Router = () => {
  return (
    <>
     <Navbar/> 
     <Outlet/>
    </>
  )
}

export default Router
