import React from 'react'
import styled from 'styled-components'

const News = styled.div`
width:90%;
font-size:1rem;
margin:2%;
height: auto;
border-top:3px solid var(--secondary-color);
box-shadow: 0 0 10px hsl(0, 0%, 81%);
border-radius:0 0 15px 15px;
padding:2%;
display:flex;
transition: all 0.5s ease;
&:hover{
  transform:scale(1.04);
}
div{
   margin-left:5%;
}
.heading{
    font-weight:500;
    font-size:15px;
}
`


const NewsCard = ({title, onClick}) => {
  return (
    <News onClick={onClick}>
    <div className='heading'>{title}</div>
    </News>
  )
}

export default NewsCard