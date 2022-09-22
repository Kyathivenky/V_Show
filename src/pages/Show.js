/* eslint-disable no-underscore-dangle */
import React,{useEffect,useReducer} from 'react'
import { useParams } from 'react-router'
import Cast from '../components/shows/Cast';
import Details from '../components/shows/Details';
import Seasons from '../components/shows/Seasons';
import ShowMainData from '../components/shows/ShowMainData';
import { apiGet } from '../misc/config';
import { InfoBlock, ShowPageWrapper } from './show.styled';



const reducer = (prevState , action) =>
{
       switch(action.type)
       {

        case 'FETCH_SUCCESS' :
          {
            return { isLoading : false , show : action.show, error : null }
          }

          case 'FETCH_FAILED':
            {
               return {...prevState, isLoading:false , error: action.error}
            }
         default : return prevState;
       }
};

const intialstate = {
         show : null,
         isLoading : true ,
         error : null ,
};

const Show = () => {

 const { id } = useParams();

 const [{ show , isLoading, error}, dispatch]=useReducer(reducer, intialstate);
 /* const [show,setShow]=useState(null);
 const [isLoading,setIsLoading]=useState(true);
 const [error,setError]=useState(null); */

   useEffect(()=>{

    let isMounted = true;

    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
   .then(results  => {

   
     if(isMounted){
     
     dispatch({type :'FETCH_SUCCESS' , show: results });
     
      
     }
    
   
   }).catch(err=>{
    if(isMounted)
    dispatch({type : 'FETCH_FAILED' , Error : err.message});
    
   });

   return ()=>{
    isMounted = false;
   }
  },[id]);


 
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
