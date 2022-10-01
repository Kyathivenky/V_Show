/* eslint-disable no-underscore-dangle */
import React from 'react'
import { useParams } from 'react-router'
import Cast from '../components/shows/Cast';
import Details from '../components/shows/Details';
import Seasons from '../components/shows/Seasons';
import ShowMainData from '../components/shows/ShowMainData';
import { apiGet } from '../misc/config';
import { useShow } from '../misc/Custom-hooks';
import { InfoBlock, ShowPageWrapper } from './show.styled';







const Show = () => {

 const { id } = useParams();

 const { show  ,isLoading,error }=useShow(id);




 
  if(isLoading)
{
  return <div>data is being loaded</div>;
}  
if(error)
{
  return <div>Error occured :{error}</div>;
}
  return (
    <ShowPageWrapper>
      <ShowMainData image={show.image}  name ={show.name} rating ={show.rating} summary={show.summary} tags={show.genres} />
      <InfoBlock>Details</InfoBlock>
      <Details  status={show.status} premiered ={show.premiered} network={show.network} />
      <InfoBlock>Seasons</InfoBlock>
      <Seasons seasons={show._embedded.seasons }/>
      <InfoBlock>Cast</InfoBlock>
      <Cast cast={show._embedded.cast}/>
    </ShowPageWrapper>
  )
};

export default Show
