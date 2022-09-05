/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react'
import MainPageLayout from '../components/MainPageLayout'

const Home = () => {

  const [input , SetInput ] = useState('');
  const onInputchange = (ev) => {

     SetInput(ev.target.value);
  
  };

  const onSearch = () =>
  {
   // https://api.tvmaze.com/search/shows?q=girls
   fetch(`https://api.tvmaze.com/search/shows?q=${input}`).then(r => r.json()).then(result=> {
         
   // eslint-disable-next-line no-console
   console.log(result);
   });
};

const onKeyDown =(ev) =>{

  if(ev.keyCode === 13 )
{
   onSearch();
}

};
  return <div> <MainPageLayout/>
  <input type="text"  onChange={onInputchange} onKeyDown={onKeyDown} value={input}/>      
  <button type="button" onClick={onSearch}>Search</button> 
  
  
  
  
  
  
  
  
  
  </div> 
};

export default Home
