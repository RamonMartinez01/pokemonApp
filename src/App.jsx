import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import PokedexPage from './pages/PokedexPage'
import PokeInfoPage from './pages/PokeInfoPage'
import ProtectedRoutes from './pages/ProtectedRoutes'
import NavBar from './pages/NavBar'


function App() {
  
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  return (
   <div>
    { !isHomePage && <NavBar />}
    <Routes >
      <Route path='/' element={ <HomePage className="homePage__container"/> } />
      <Route element={<ProtectedRoutes />}>
        <Route path='/pokedex' element={<PokedexPage className="pokedexpage__container" /> } />
        <Route path='/pokedex/:id' element={<PokeInfoPage className="pokeInfoPage__container"/>}/>
      </Route>  
    </Routes>
   </div>
  )
}

export default App
