import './App.css';
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';
import publicRoutes from './routes/routes';
import { Fragment } from 'react';

function App() {
  return (
    <div className="App">
      <Routes>
      {publicRoutes.map((rt) => {
        if (rt.Layout) {
          var Layout = rt.Layout
        }else {
          var Layout = Fragment
        }
        const PAGE = rt.component
        return <Route path={rt.path} element={<Layout><PAGE/></Layout>} />
      })}
      </Routes>
    </div>
  );
}

export default App;
