import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Program from './pages/Program';
import Apply from './pages/Apply';
import Invest from './pages/Invest';
import Books from './pages/Books';
import Projects from './pages/Projects';
import Passions from './pages/Passions';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Admin routes without navbar/footer */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          
          {/* Public routes with navbar/footer */}
          <Route path="/*" element={
            <>
              <Navbar />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/program" element={<Program />} />
                  <Route path="/apply" element={<Apply />} />
                  <Route path="/invest" element={<Invest />} />
                  <Route path="/books" element={<Books />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/passions" element={<Passions />} />
                </Routes>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
