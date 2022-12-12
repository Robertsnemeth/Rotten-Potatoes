import React from 'react'

const Button = ({buttonText}) => {
  return (
    <button className="border border-green-500 rounded p-1 text-green-500 hover:text-white hover:bg-green-500 hover:border-white">{buttonText}</button>
    )
}

export default Button