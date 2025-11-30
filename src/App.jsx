import './App.css'
import Navbar from './components/Navbar'
import RouterConfig from './config/RouterConfig'
import { Toaster } from 'react-hot-toast'
import FloatingPostButton from './components/FloatingPostButton'
import ScrollToTop from './components/ScrollTop'

function App() {

  return (
    <>
      <ScrollToTop></ScrollToTop>
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      <Navbar></Navbar>
      <RouterConfig></RouterConfig>
      <FloatingPostButton/>
    </>
  )
}

export default App
