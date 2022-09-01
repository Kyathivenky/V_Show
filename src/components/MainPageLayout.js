import React  from 'react'
import Navs  from './Navs'
import Title from './Title'

const MainPageLayout = ( {Children}) => {
  return (
    <div>
        <Title title="MOVIE BRO" subtitle="You are looking for a movie or an actor"/>
        <Navs /> 
       <div> {Children}</div>
    </div>
  )
}

export default MainPageLayout
