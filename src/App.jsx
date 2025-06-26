import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import ShowMore from './pages/showmore';
import ModelViewer from './pages/simple';
import ChestofDrawers from './pages/Chestofdrawer';
import ArmChairs from './pages/chair';
import DressingTables from './pages/Dressing';
import ConsoleTables from './pages/Console';
import Bookshelfs from './pages/Book';
import ShoesRack from './pages/Shoes';
import Crockery from './pages/Crockery';
import BesideTables from './pages/BesideTables';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/showmore" element={<ShowMore />} />
        <Route path="/simple" element={<ModelViewer />} />
        <Route path="/chest" element={<ChestofDrawers />} />
        <Route path="/armchair" element={<ArmChairs />} />
        <Route path="/dressing" element={<DressingTables />} />
        <Route path="/console" element={<ConsoleTables />} />
        <Route path="/book" element={<Bookshelfs />} />
        <Route path="/shoe" element={<ShoesRack />} />
        <Route path="/crockery" element={<Crockery />} />
        <Route path="/beside" element={<BesideTables />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
