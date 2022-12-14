
import { useReducer ,useCallback, useEffect, useState ,useRef} from "react";
import { apiGet } from "./config";

function showsReducer(prevState,action)
{
    switch(action.type)
    {
          case 'ADD':
            {
                return [...prevState,action.showId]
            }

            case 'REMOVE':
            {
                return prevState.filter((showId)=> showId !== action.showId);
            }

        default : return prevState;
    }
}

function usePersisterReducer(reducer,intialState,key){

    const [state,dispatch] = useReducer(reducer, intialState , (initial)=>{
         const persisted = localStorage.getItem(key);

         return persisted?JSON.parse(persisted) : initial ;
    });

  useEffect(()=>{
   localStorage.setItem(key,JSON.stringify(state))
  },[state,key]);


  return [state,dispatch];

}

export function useShows(key = 'shows')
{
    return usePersisterReducer(showsReducer,[],key);
}

export  function useLastQuery(key = 'lastQuery') {
    const [input, setInput] = useState(()=>{
        const persisted = sessionStorage.getItem(key);

        return persisted?JSON.parse(persisted) : "" ;

    });

    const SetPersistedInput =useCallback(  (newState) =>{
        setInput(newState);
        sessionStorage.setItem(key , JSON.stringify(newState))
    },[key]);

    return [input,SetPersistedInput]
}

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

export function useShow(showId)
{
    const [state, dispatch]=useReducer(reducer, {
        show : null,
        isLoading : true ,
        error : null ,
      });


   useEffect(()=>{

    let isMounted = true;

    apiGet(`/shows/${showId}?embed[]=seasons&embed[]=cast`)
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
  },[showId]);

  return state;
}

