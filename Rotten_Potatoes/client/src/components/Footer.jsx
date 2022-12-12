import React from 'react'
import { Link } from 'react-router-dom';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';

const Footer = () => {
  return (
    <div className="bg-gray-900 h-[100px] text-white flex items-center">
        <div className='flex gap-2'>
            <Link to="https://github.com/Robertsnemeth/Rotten-Potatoes"><AiFillGithub size="30px"/></Link>
            <Link to="https://www.linkedin.com/in/robert-s-nemeth/"><AiFillLinkedin size="30px"/></Link>
        </div>
    </div>
  )
}

export default Footer