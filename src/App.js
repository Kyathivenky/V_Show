import React from 'react';

 import { Switch,Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Navs from './components/Navs';
import Home from './pages/Home';
import Show from './pages/Show';
import Starred from './pages/Starred';
import err404 from  './pages/error404.png'

const theme = {
  mainColors: {
    blue: '#00ABE1',
    dark: '#00ABE1',
    gray: '#E1E2E2',
  },
};


function App() {
  return (
<ThemeProvider theme={theme}>
    <Switch>
    <Route exact path="/">
      <Home/>
    </Route>

    <Route  exact path="/starred">
     <Starred/>
    </Route>
    <Route exact path="/show/:id">
       
       <Show />
    </Route>
   
  <Route>
    <div><img style={{width : '100%',height: "auto"}} src={err404} alt="404"/> </div>
  </Route>

  </Switch>
  </ThemeProvider>
  );
  
};


export default App;
