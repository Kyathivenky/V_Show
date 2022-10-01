/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import ActorGrid from '../components/actors/ActorGrid';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/shows/ShowGrid';
import {apiGet} from '../misc/config'
import { useLastQuery } from '../misc/Custom-hooks';


const Home = () => {

  const [input , SetInput ] = useLastQuery();
  const [results , setResults] =useState(null);
  const [searchOption, SetSearchOption] = useState('shows');
  const isShowSearch = searchOption=== 'shows' ;
  

  const onInputchange = (ev) => {

     SetInput(ev.target.value);
  
  };

  const onSearch = () =>
  {

    apiGet(`/search/${searchOption
    }?q=${input}`).then(result=> {

   setResults(result);
  
   
   });
};

const onKeyDown =(ev) =>{

  if(ev.keyCode === 13 )
{
   onSearch();
} 



};

const OnRadioChange = (ev) =>
{
      SetSearchOption(ev.target.value);

}


const renderResults = () =>
{
  if(results && results.length === 0){

    return  <div>no results</div>

  }

  if(results && results.length>0)
  {
         return results[0].show ? (<ShowGrid data={results}/>) : ( <ActorGrid data={results}/>)
        } 

  return null;
}
  return <div> <MainPageLayout/>
  <input type="text" placeholder='Search for something' onChange={onInputchange} onKeyDown={onKeyDown} value={input}/>    

  <div> <label htmlFor='show-search'>Shows<input id='show-search' type="radio" value="shows" onChange={OnRadioChange} checked={isShowSearch}/></label>
  <label htmlFor='actor-search'>Actors<input id='actor-search' type="radio"  value= "people" onChange={OnRadioChange}checked={!isShowSearch} /></label>
  </div>  
  <button type="button" onClick={onSearch}>Search</button> 
  {renderResults()}
  
  
  
  
  
  
  
  
  
  </div> 
};

export default Home
