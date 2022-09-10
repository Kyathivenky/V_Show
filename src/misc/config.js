const API_BASE_URL = 'https://api.tvmaze.com' ;

export async function apiGet(queeryString){

    const response  = await fetch(`${API_BASE_URL}${queeryString}`).then(r => r.json());

    

    return response ;
   
}