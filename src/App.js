import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import UploadComponent from './UploadComponent';
import ResultComponent from './ResultComponent';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/upload">Upload</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/upload" element={<UploadComponent />} />
          <Route path="/result" element={<ResultComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
