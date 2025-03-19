import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home';
import NotFound from './pages/notFound';
import { sampleDisplayQueueRoute } from './components/displayQueue/displayQueueSampleRoute';

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        {sampleDisplayQueueRoute}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
