import React from 'react'
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {

  interface navItem {
    path: string;
    name: string;
  }

  const list: navItem[] = [
    {
      path: '/',
      name: "Home"
    },
    {
      path: "/table",
      name: "Table"
    }
  ]

  return (
    <nav className='flex justify-between  px-10 text-lg py-4 shadow-2xl'>
      <p className='text-blue-700 font-semibold'>GrowMeOrganic Private Limited</p>
      <div>
        {
          list.map((item, index) => (
            <NavLink key={index} className={({ isActive }) => `${isActive ? "text-blue-700" : ""} mx-2 hover:text-red-500`} to={item.path}>
              {item.name}
            </NavLink>
          ))
        }
      </div>

    </nav>
  )
}

export default Navbar