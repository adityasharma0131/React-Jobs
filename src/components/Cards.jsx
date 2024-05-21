import React from 'react'

const Cards = ( { children, bg='bg-zinc-800'}) => {
  return (
    <div className={`${bg} p-6 rounded-lg shadow-md hover:bg-indigo-950`}>
        { children }
    </div>
  )
} 

export default Cards