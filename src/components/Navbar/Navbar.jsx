import * as React from "react"
import { useState } from "react"
import {navbarContainer, navbarContainerFullHeight, navbarLinks,
        navbarLinkItem, navbarLink, navbarAtTheTop,
        navOpened, itemHidden, closeButton,
        closeIcon, menuButton, menuIcon } from "./Navbar.module.css"

const Navbar = ({navbarHidden, isNavbarAtTheTop, routes}) => {
    const [isMobileNavOpened, setIsMobileNavOpened] = useState(false)
    const toggleMobileNav = () => setIsMobileNavOpened(!isMobileNavOpened)

    return(
        <div className={`${navbarContainer} ${navbarHidden ? itemHidden : ""} ${isMobileNavOpened ? navbarContainerFullHeight : ""}`}>
            <ul className={`${navbarLinks} ${isMobileNavOpened ? navOpened : ""}`}>
                {Object.keys(routes).map( route => (
                    <li className={`${navbarLinkItem} ${isNavbarAtTheTop ? navbarAtTheTop : ""}`} onClick={isMobileNavOpened ? toggleMobileNav : null} key={routes[route].id}>
                        <a className={navbarLink} href={routes[route].link}>
                            {routes[route].name}
                        </a>
                    </li>
                ))}
            </ul> 
        {isMobileNavOpened ? 
            <button className={closeButton} onClick={toggleMobileNav}>
                <svg className={closeIcon} viewBox="0 0 32 32">
                   <g id="cross"><line x1="7" x2="25" y1="7" y2="25"/><line x1="7" x2="25" y1="25" y2="7"/></g>
                </svg>
            </button> :
            <button className={`${menuButton} ${navbarHidden ? itemHidden : ""}`} onClick={toggleMobileNav}>
                <svg className={menuIcon} viewBox="0 0 24 24" >
                    <line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="18" y2="18"/>
                </svg>
            </button>
        }
</div>
    )
}

export default Navbar