import React from 'react'
import { HashLoader } from 'react-spinners'

const Loader: React.FC = () => {
  return (
   <div className='h-screen flex justify-center items-center'>
    <HashLoader color="#0600d2" />
   </div>
  )
}

export default Loader