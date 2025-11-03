
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import Table from './components/Table'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/table' element={<Table />} />

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
