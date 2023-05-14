import * as React from "react"
import { useEffect, useState, useRef } from "react"
import * as layoutStyles from "./Layout.module.css"
import "../../styles/reset.css"
import {routes} from "../../routes.json"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const Layout = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulPortfolioItem(sort: {itemId: ASC}) {
        nodes {
          itemId
          bottomColor
          description
          id
          imageAltText
          link
          portfolioItemName
          techStack
          topColor
          desktopImage {
            gatsbyImageData
          }
          mobileImage{
            gatsbyImageData
          }
        }
      } 
    } 
    `
    )  

    const portfolio = data.allContentfulPortfolioItem.nodes

  const [rotationDegrees, setTopPolygonRotationDegrees] = useState([0,0])
  const [footerPolygonRotationDegrees, setFooterPolygonRotationDegrees] = useState(0)
  const [navbarHidden, setNavbarHidden] = useState(false)
  const [navbarAtTheTop, setNavbarAtTheTop] = useState(true)
  const [isMobileNavOpened, setIsMobileNavOpened] = useState(false)
  const refs = useRef([])
  const footerPolygonRef = useRef()
  let prevScrollPos = window.scrollY
  let windowWidth = window.innerWidth;

  const toggleMobileNav = () => setIsMobileNavOpened(!isMobileNavOpened)
  
  useEffect(() => {
    const handleScroll = () => {
      let filteredTopPolygonDegrees = [];
      let filteredFooterPolygonDegrees = 0;
      const maxDegreesTop = windowWidth > 480 ? 10 : 40;
      const bodyPosition = document.body.getBoundingClientRect().top

      portfolio.map((item)=> {     
        const topPolygonPosition = refs.current[item.itemId].getBoundingClientRect().top - bodyPosition
        const footerPolygonPosition = footerPolygonRef.current.getBoundingClientRect().top - bodyPosition
        const topPolygonDegrees = (topPolygonPosition -  window.scrollY) / 40;
        const footerPolygonDegrees = (footerPolygonPosition - 140 -  window.scrollY) / 40;
         // Checks if topPolygonDegrees value is not larger than degree by which rectangle is tilted and no smaller than 0.
        topPolygonDegrees > maxDegreesTop ? filteredTopPolygonDegrees.push(maxDegreesTop) : topPolygonDegrees < 0 ? filteredTopPolygonDegrees.push(0) : filteredTopPolygonDegrees.push(topPolygonDegrees)
        footerPolygonDegrees > maxDegreesTop ? filteredFooterPolygonDegrees = maxDegreesTop : footerPolygonDegrees < 0 ? filteredFooterPolygonDegrees = 0 : filteredFooterPolygonDegrees = footerPolygonDegrees
      })

      setTopPolygonRotationDegrees([...filteredTopPolygonDegrees])
      console.log(rotationDegrees)
      setFooterPolygonRotationDegrees(filteredFooterPolygonDegrees)

      // Hide navbar on scroll
      let currentScrollPos = window.scrollY
      currentScrollPos > prevScrollPos && currentScrollPos > 100 ? setNavbarHidden(true) : setNavbarHidden(false) 

      // Navbar link font gets smaller being lower than x px in scrollY
      window.scrollY > window.innerHeight ? setNavbarAtTheTop(false) : setNavbarAtTheTop(true)
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }

  }, [rotationDegrees])
 
    return (
        <div className={layoutStyles.container}>
          <div className={`${layoutStyles.navbarContainer} ${navbarHidden ? layoutStyles.navbarHidden : ""} ${isMobileNavOpened ? layoutStyles.navbarContainerFullHeight : ""}`}>
            <ul className={`${layoutStyles.navbarLinks} ${isMobileNavOpened ? layoutStyles.navOpened : ""}`}>
              {Object.keys(routes).map( route => (
                <li className={`${layoutStyles.navbarLinkItem} ${navbarAtTheTop ? layoutStyles.navbarAtTheTop : ""}`} onClick={isMobileNavOpened ? toggleMobileNav : null} key={routes[route].id}>
                  <a className={layoutStyles.navbarLink} href={routes[route].link}>
                    {routes[route].name}
                  </a>
                </li>
              ))
              }
            </ul> 
              {isMobileNavOpened ? 
                <button className={layoutStyles.closeButton} onClick={toggleMobileNav}>
                  <svg className={layoutStyles.closeIcon} viewBox="0 0 32 32">
                    <g id="cross"><line className={layoutStyles.iconStroke} x1="7" x2="25" y1="7" y2="25"/><line className={layoutStyles.iconStroke} x1="7" x2="25" y1="25" y2="7"/></g>
                  </svg>
                </button> :
                <button className={layoutStyles.menuButton} onClick={toggleMobileNav}>
                  <svg className={layoutStyles.menuIcon} viewBox="0 0 24 24" >
                    <line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="18" y2="18"/>
                  </svg>
                </button>
              }
          </div>
          
          <main>
            <div className={layoutStyles.heroContainer} id="hero">
              <div className={layoutStyles.heroHeadingContainer}>
                <h1 className={layoutStyles.heroHeading}>
                  Say<br />
                  <span>hello</span><br />
                  to your<br />
                  new <span>website</span>
                </h1>
              </div>
              <div className={layoutStyles.heroAnimationContainer}>
                <div className={layoutStyles.illustrationContainer}>
                    <div className={layoutStyles.illustrationBase}>

                    </div>
                </div>
              </div>
            
            </div>
      
            <div className={layoutStyles.techStackBannerContainer}>
              <ul className={layoutStyles.techStackBanner}>
                <li className={layoutStyles.techStackBannerItem}>CSS</li>
                <li className={layoutStyles.techStackBannerItem}>HTML</li>
                <li className={layoutStyles.techStackBannerItem}>Javascript</li>
                <li className={layoutStyles.techStackBannerItem}>ReactJS</li>
                <li className={layoutStyles.techStackBannerItem}>GatsbyJS</li>
              </ul>
            </div>
      
            {/*<section className={layoutStyles.decoration}></section>*/}
            <section className={layoutStyles.introductionContainer} id="introduction">
              <div className={layoutStyles.textContainer}>
                <p className={layoutStyles.text}>Name is Rytis</p>
                <h2 className={layoutStyles.text}>I create <span className={layoutStyles.wigglyUnderline}>sick</span><br /><b>digital products</b></h2>
              </div>
              {/*<div className={layoutStyles.imageContainer}>
                  <img className={layoutStyles.introImage} src={introImg} alt="An image of a web developer" />
                </div>
              */}
            </section>
      
            <section className={layoutStyles.introductionContainer} id="services">
              <h2 className={layoutStyles.text}>I do:</h2>
              <ul>
                <li className={layoutStyles.text}>Websites</li>
                <li className={layoutStyles.text}>Landing pages</li>
                <li className={layoutStyles.text}>SEO</li>
                <li className={layoutStyles.text}>Website speed optimization</li>
              </ul>
            </section>
      
            <section className={layoutStyles.portfolioContainer} id="portfolio">
              <h2 className={layoutStyles.text}>Past work:</h2>
              <div className={layoutStyles.portfolio}>
                {portfolio.map( item => (
                <div className={layoutStyles.portfolioItem} key={item.itemId}>
                  <div className={layoutStyles.topPolygon} style={{transform: `rotate(-${rotationDegrees[item.itemId-1]}deg)`, backgroundColor: `${item.topColor}`}} ref={el => refs.current[item.itemId]= el}></div>
                  <GatsbyImage imgClassName={layoutStyles.portfolioImage} className={layoutStyles.portfolioImageWrapper} image={windowWidth > 480 ? item.desktopImage.gatsbyImageData : item.mobileImage.gatsbyImageData} alt={item.imageAltText} />
                  <div className={layoutStyles.bottomPolygon} style={{backgroundColor: `${item.bottomColor}`}}></div>
                  <div className={layoutStyles.portfolioInfoBlock}>
                    <div className={layoutStyles.mainInfo}>
                        <h2 className={`${layoutStyles.portfolioHeading} ${layoutStyles.backgroundBlock}`}>{item.description}</h2>
                        <p className={`${layoutStyles.portfolioTechStack} ${layoutStyles.backgroundBlock}`}>{item.techStack}</p>
                    </div>
                      <a className ={`${layoutStyles.portfolioLink} ${layoutStyles.backgroundBlock}`} rel="no-follow" href={item.link}>Check it out -&gt;</a>
                  </div>
                </div>
                ))}
              </div>
            </section>

            {!isMobileNavOpened ? <div className={layoutStyles.scrollToTopContainer}>
              <a className={layoutStyles.scrollToTop} href="#hero">&#11014;</a>
            </div>:""}

            <footer className={layoutStyles.footerContainer} id="contact">
              <div className={layoutStyles.ctaContainer}>
                <div className={layoutStyles.topPolygon} style={{transform: `rotate(-${footerPolygonRotationDegrees}deg)`,  backgroundColor: "#EA549E"}} ref={el => footerPolygonRef.current = el}></div>
                <p className={layoutStyles.ctaHeading}>Let's create</p>
                <a className={layoutStyles.ctaButton} href="#" rel="nofollow">Upwork profile</a>
              </div>
            </footer>
          </main>
        </div>
      )
}

export default Layout