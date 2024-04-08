import { Outlet } from 'react-router-dom'
import { TopBar } from './Layout/TopBar/TopBar'

function App() {

  return (
    <>
      <TopBar />
      <Outlet />
    </>
  )
}

export default App
