import React from 'react'
import { useLocation } from 'react-router';

import { LinkStyled, NavList } from './shows/navs.styled';

const LINKS =[
    { to: "/", text : 'HOME' },
    { to: "/starred", text : 'STARRED' }

];


// eslint-disable-next-line arrow-body-style
const Navs = () => {
    const location = useLocation();
  return ( 
    <div>
    <NavList>
        
            {
                LINKS.map(item => <li key={item.to}>
                    <LinkStyled to={item.to} className={item.to === location.pathname ? 'active' : ''  }>{item.text}</LinkStyled>
    
                </li>)
            }
        
        
      
      
    </NavList>
    </div>
  )
}

export default Navs

