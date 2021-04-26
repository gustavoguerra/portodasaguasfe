import React from 'react'

import SideBar from '../Side-Bar/sidebar'

import './navbar.css'

export default class NavBar extends React.Component {
    render() {
        return (
            <div className="side-bar">
                <SideBar></SideBar>
            </div>
        )
    }
}