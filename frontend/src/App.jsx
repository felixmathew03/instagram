import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Email from './Components/Email';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/email' Component={Email}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App