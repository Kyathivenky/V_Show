import React,{useEffect,useReducer} from 'react'
import { useParams } from 'react-router'
import { apiGet } from '../misc/config';



const reducer = (prevState , action) =>
{
       switch(action.type)
       {

        case 'FETCH_SUCESS' :
          {
            return {...prevState, isLoading : false , show : action.Show, error : null }
          }

          case ' FETCH_FAILED':
            {
               return {...prevState, isLoading:false , error: action.error}
            }
         default : return prevState;
       }
}

const intialstate = {
         show :null,
         isLoading :true ,
         error : null 
}

const Show = () => {

 const {id} = useParams();

 const [{ show , isLoading, error}, dispatch]=useReducer(reducer, intialstate);
 /* const [show,setShow]=useState(null);
 const [isLoading,setIsLoading]=useState(true);
 const [error,setError]=useState(null); */

   useEffect(()=>{

    let isMounted =true;

    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
   .then(results  => {

   
     if(isMounted){
     
     dispatch({type : 'FETCH_SUCCESS' , show: results})
     
      
     }
    
   
   }).catch(err=>{
    if(isMounted)
    dispatch({type : 'FETCH_FAILED' , Error : err.message})
    
   });

   return ()=>{
    isMounted=false;
   }
  },[id])


 console.log('show',show);
if(isLoading)
{
  return <div>data is being loaded</div>
}
if(error)
{
  return <div>Error occured :{error}</div>
}
  return (
    <div>
      this is show pages
    </div>
  )
};

export default Show
