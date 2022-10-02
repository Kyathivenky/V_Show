/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import ActorGrid from '../components/actors/ActorGrid';
import CustomRadio from '../components/CustomRadio';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/shows/ShowGrid';
import {apiGet} from '../misc/config'
import { useLastQuery } from '../misc/Custom-hooks';
import { RadioInputsWrapper, SearchButtonWrapper, SearchInput } from './Home.styled';
import err404 from './error404.png'


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

    return  <div><img style={{width : '100%',height: "auto"}} src={err404} alt="404"/></div>

  }

  if(results && results.length>0)
  {
         return results[0].show ? (<ShowGrid data={results}/>) : ( <ActorGrid data={results}/>)
        } 

  return null;
}
  return <div> <MainPageLayout/>
  <SearchInput type="text" placeholder='Search for something' onChange={onInputchange} onKeyDown={onKeyDown} value={input}/>    

  <RadioInputsWrapper> <div>
    
  <CustomRadio label="Shows"  id='show-search'  value="shows" onChange={OnRadioChange} checked={isShowSearch}/>
</div>

<div>
    
  <CustomRadio label="Actors"  id='actor-search'  value="people" onChange={OnRadioChange} checked={!isShowSearch}/>
</div>
  
  
  
  </RadioInputsWrapper>  
  <SearchButtonWrapper><button type="button" onClick={onSearch}>Search  </button> </SearchButtonWrapper> 
  {renderResults()}
  
  
  
  
  
  
  
  
  
  </div> 
};

export default Home
