/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
import MainPageLayout from '../components/MainPageLayout'
import { apiGet } from '../misc/config';
import { useShows } from '../misc/Custom-hooks'
import ShowGrid from '../components/shows/ShowGrid';

// eslint-disable-next-line arrow-body-style
const Starred = () => {

  const [ starred ]=useShows()
  const [shows,setShows]=useState(null);
  const [isLoading, setIsLoading]=useState(true);
  const [error,setError]=useState(null);
useEffect(()=>{
if(starred && starred.length>0)
{
    const promises = starred.map(showId => apiGet(`/shows/${showId}`))

    Promise.all(promises)
    .then(apiData =>apiData.map(show=>({show})))
    .then(results=>{
      setShows(results);
      setIsLoading(false);
    }).catch((err)=>{
      setError(err.message)

    });
  
}
else
{
  setIsLoading(false);
}


},[starred])

    return  <div><MainPageLayout/>
    { isLoading &&<div>Shows are still loading </div> }
    {error && <div>Error occured: {error} </div>}
    {!isLoading && !shows && <div> No shows were added </div> }
    {!isLoading && !error && shows && <ShowGrid data={shows}/> }
    
    </div>
};

export default Starred
