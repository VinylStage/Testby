import React from 'react'
import { Link } from 'gatsby-link'

export default function Layout({ children }) {
    return (
        <nav>
            <div className='bg-blue-800 p-4 m-4 grid gird-cols-4'>
                <Link to='/'><h1 className='my-2'>HOME</h1></Link>
                <Link to='/blog'><h1 className='my-2'>BLOG</h1></Link>
                <Link to='/posts'><h1 className='my-2'>POST</h1></Link>
                <Link to='/contact'><h1 className='my-2'>CONTACT</h1></Link>
            </div>
            <div>
                {children}
            </div>
        </nav>
    )
}
