/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import {apiGet} from '../misc/config'


const Home = () => {

  const [input , SetInput ] = useState('');
  const [results , setResults] =useState(null);
  const onInputchange = (ev) => {

     SetInput(ev.target.value);
  
  };

  const onSearch = () =>
  {

    apiGet(`/search/shows?q=${input}`).then(result=> {

   setResults(result);
  
   
   });
};

const onKeyDown =(ev) =>{

  if(ev.keyCode === 13 )
{
   onSearch();
} 



};

const renderResults = () =>
{
  if(results && results.length === 0){

    return  <div>no results</div>

  }

  if(results && results.length>0)
  {
         return <div> {results.map ( (item) => <div key={item.show.id}>{item.show.name}</div>

          )}</div>
  }
  return null;
}
  return <div> <MainPageLayout/>
  <input type="text"  onChange={onInputchange} onKeyDown={onKeyDown} value={input}/>      
  <button type="button" onClick={onSearch}>Search</button> 
  {renderResults()}
  
  
  
  
  
  
  
  
  
  </div> 
};

export default Home
