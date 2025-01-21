import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Loading from '../components/Loading'

export default function Applayout() {
  return (
    <div>
      {/* <p>App Layout</p> */}
      <Header/>
      
    <div className=" mx-2 my-2 md:mx-36 md:my-12 flex flex-col  gap-8 h-full">
      <Outlet/>
      {/* <Loading/> */}
    </div>
    </div>
  )
}
