import React  from 'react'
import Navs  from './Navs'
import Title from './Title'

const MainPageLayout = ( {Children}) => {
  return (
    <div>
        <Title title="V shows" subtitle="Are you looking for a Show or an Actor ? "/>
        <Navs /> 
       <div> {Children}</div>
    </div>
  )
}

export default MainPageLayout
