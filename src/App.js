import React, {createContext} from 'react'
import './App.less';
import Router from './routers/router'
import * as THREE from 'three'

export const AppContext = createContext()

function App() {
  return (
    <AppContext.Provider value={{THREE}}>
      <div className="App">
        <Router/>
      </div>
    </AppContext.Provider>
  );
}

export default App;
