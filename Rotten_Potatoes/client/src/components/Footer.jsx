import React from 'react'
import { Link } from 'react-router-dom';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';

const Footer = () => {
  return (
    <footer className="bg-gray-900 h-[100px] text-white flex items-center relative bottom-0">
        <div className='flex gap-2'>
            <a href="https://github.com/Robertsnemeth/Rotten-Potatoes" target="_blank"><AiFillGithub size="30px"/></a>
            <a href="https://www.linkedin.com/in/robert-s-nemeth/" target="_blank"><AiFillLinkedin size="30px"/></a>
        </div>
    </footer>
  )
}

export default Footer