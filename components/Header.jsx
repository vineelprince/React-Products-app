import React from 'react'
import {NavLink} from 'react-router'
function Header() {
  return (
    <div className='flex justify-between px-10 items-center bg-gray-300 '>
        {/* logo */}
        <img className='p-2 rounded-full' width="80px" src="https://static.vecteezy.com/system/resources/previews/043/212/156/non_2x/a-stylish-logo-design-for-a-cosmetics-brand-featuring-sleek-typography-and-a-simple-yet-sophisticated-graphic-element-produce-a-clean-and-memorable-logo-for-a-beauty-products-e-commerce-site-free-vector.jpg" alt="" />
        <ul className='flex gap-10 text-2xl'>
            <li>
                <NavLink to="" className={({isActive})=>isActive?"text-blue-100 bg-blue-700 p-2":""}>Home</NavLink>
            </li>
            <li><NavLink to='products'className={({isActive})=>isActive?"text-blue-100 bg-blue-700 p-2":""}>ProductsList</NavLink></li>
            <li><NavLink to='contact'className={({isActive})=>isActive?"text-blue-100 bg-blue-700 p-2":""}>ContactUs</NavLink></li>
        </ul>
    </div>
  )
}

export default Header