import React from 'react'
import NavbarScreen from './NavbarScreen'
import FooterScrren from './FooterScrren'
import DisplayBlog from '../Blogpage/DisplayBlog'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function HomeScrren() {
    return (
        <>
        <NavbarScreen/>
        <DisplayBlog/>
        <FooterScrren/>
        </>
    )
}

export default HomeScrren
