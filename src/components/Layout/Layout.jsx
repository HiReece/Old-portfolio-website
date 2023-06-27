import * as React from "react"
import { useEffect, useLayoutEffect, useState, useRef } from "react"
import * as layoutStyles from "./Layout.module.css"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Navbar from "../Navbar/Navbar"
import Hero from "../Hero/Hero"
import Banner from "../Banner/Banner"
import { routes } from "../../routes.json"


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
            description
          }
        }
      }
      contentfulPage(name: {eq: "Homepage"}) {
        ctaLink
        bannerImages {
          gatsbyImageData
        }
        authorImage{
          gatsbyImageData
        }
      }
    } 
    `
    )  

  const portfolio = data.allContentfulPortfolioItem.nodes
  const page = data.contentfulPage
  const bannerImages = data.contentfulPage.bannerImages

  const [rotationDegrees, setTopPolygonRotationDegrees] = useState([0,0])
  const [footerPolygonRotationDegrees, setFooterPolygonRotationDegrees] = useState(0)
  const [navbarHidden, setNavbarHidden] = useState(false)
  const [isNavbarAtTheTop, setNavbarAtTheTop] = useState(true)

  const [portfolioImage, setPortfolioImage] = useState("mobileImage")

  const refs = useRef([])
  const footerPolygonRef = useRef()
  let [prevScrollPos, setPrevScrollPos] = useState(0)



   const [windowWidth, setWindowWidth] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth
    }
    return 0
  })

    // Create a window resize handler function
  const handleResize = () => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
    }
  }

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    windowWidth > 768 ? setPortfolioImage("desktopImage") : setPortfolioImage("mobileImage");
  }, [windowWidth])


  useLayoutEffect(() => {

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
      setFooterPolygonRotationDegrees(filteredFooterPolygonDegrees)

      // Hide navbar on scroll
      let currentScrollPos = window.scrollY
      currentScrollPos > prevScrollPos && currentScrollPos > 100 ? setNavbarHidden(true) : setNavbarHidden(false) 
      setPrevScrollPos(currentScrollPos)

      
      // Navbar link font gets smaller being lower than x px in scrollY
      window.scrollY > window.innerHeight ? setNavbarAtTheTop(false) : setNavbarAtTheTop(true)
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll)
      window.addEventListener("resize", handleResize)
  
      return () => {
        window.removeEventListener("resize", handleResize)
        window.removeEventListener("scroll", handleScroll)
      };
    }

  }, [rotationDegrees])
 
    return (
        <div className={layoutStyles.container}>
          <Navbar navbarHidden={navbarHidden} isNavbarAtTheTop={isNavbarAtTheTop} routes={routes}/>
          <main>
            <Hero />
            <Banner bannerImages={bannerImages} />
            <section className={layoutStyles.introductionContainer}>
              <div className={`${layoutStyles.bgCircle} ${layoutStyles.introductionCircle} ${layoutStyles.bgColorBabyBlueEyes}`}></div>
              <div className={layoutStyles.introduction} id="introduction">
                <div className={layoutStyles.textContainer}>
                <div className={`${layoutStyles.bgCircle} ${layoutStyles.introductionTinyCircle} ${layoutStyles.bgColorSkyBlueCrayola} ${layoutStyles.displayedOnMobile}`}></div>
                  <div className={layoutStyles.introImageContainer}>
                    <GatsbyImage className={layoutStyles.introImage} image={page.authorImage.gatsbyImageData} alt="An image of the author" loading="lazy" />
                  </div>
                  <p className={layoutStyles.text}>Name is Rytis.</p>
                  <h2 className={`${layoutStyles.text}`}>I create <span className={`${layoutStyles.underline}`}>elegant</span><br /><b className={layoutStyles.textBrightGreen}>digital products</b></h2>
                </div>
              </div>
              <div className={layoutStyles.bendyLine}>
                <svg viewBox="0 0 136 709" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M67.7244 5C20.3911 73.5 -45.8756 239.8 67.7244 357C181.324 474.2 115.058 637.167 67.7244 704" />
                </svg>
              </div>
              <div className={`${layoutStyles.bgCircle} ${layoutStyles.introductionBottomCircle} ${layoutStyles.bgColorSkyBlueCrayola}`}></div>
            </section>
      
            <section className={layoutStyles.serviceContainer}>
              <div className={layoutStyles.service} id="services">
                <div className={layoutStyles.serviceTextContainer}>
                  <h2 className={layoutStyles.text}>I <b>do</b>:</h2>
                  <ul className={layoutStyles.serviceList}>
                    <li className={layoutStyles.text}>Websites</li>
                    <li className={layoutStyles.text}>Landing pages</li>
                    <li className={layoutStyles.text}>SEO</li>
                    <li className={layoutStyles.text}>Website speed optimization</li>
                  </ul>
                </div>
              </div>
            </section>

            <div className={layoutStyles.decorationBlock}>
                <div className={`${layoutStyles.bgCircle} ${layoutStyles.decorationTinyCircle} ${layoutStyles.bgColorFrenchSkyBlue}`}></div>
                <div className={`${layoutStyles.bgCircle} ${layoutStyles.decorationSmallCircle} ${layoutStyles.bgColorPink}`}></div>
                <div className={`${layoutStyles.bgCircle} ${layoutStyles.decorationBigCircle} ${layoutStyles.bgColorBabyBlueEyes}`}></div>
            </div>
      
            <section className={layoutStyles.portfolioContainer} id="portfolio">
              <h2 className={layoutStyles.text}>Past work:</h2>
              <div className={layoutStyles.portfolio}>
                {portfolio.map( item => (
                <div className={layoutStyles.portfolioItem} key={item.itemId}>
                  <div className={layoutStyles.topPolygon} style={{transform: `rotate(-${rotationDegrees[item.itemId-1]}deg)`, backgroundColor: `${item.topColor}`}} ref={el => refs.current[item.itemId] = el}></div>
                  <GatsbyImage imgClassName={layoutStyles.portfolioImage} className={layoutStyles.portfolioImageWrapper} image={item[portfolioImage].gatsbyImageData} alt={item.imageAltText} />
                  <div className={layoutStyles.bottomPolygon} style={{backgroundColor: `${item.bottomColor}`}}></div>
                  <div className={layoutStyles.portfolioInfoBlock}>
                    <div className={layoutStyles.mainInfo}>
                        <h2 className={`${layoutStyles.portfolioHeading} ${layoutStyles.backgroundBlock}`}>{item.description}</h2>
                        <p className={`${layoutStyles.portfolioTechStack} ${layoutStyles.backgroundBlock}`}>{item.techStack}</p>
                    </div>
                      <a className ={`${layoutStyles.portfolioLink} ${layoutStyles.backgroundBlock}`} rel="noreferrer noopener nofollow" href={item.link} target="_blank">Check it out -&gt;</a>
                  </div>
                </div>
                ))}
              </div>
            </section>

            {!isNavbarAtTheTop ? <div className={layoutStyles.scrollToTopContainer}>
              <a className={layoutStyles.scrollToTop} href="#hero">
              <svg className={layoutStyles.scrollTopIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C12.2652 3 12.5196 3.10536 12.7071 3.29289L19.7071 10.2929C20.0976 10.6834 20.0976 11.3166 19.7071 11.7071C19.3166 12.0976 18.6834 12.0976 18.2929 11.7071L13 6.41421V20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V6.41421L5.70711 11.7071C5.31658 12.0976 4.68342 12.0976 4.29289 11.7071C3.90237 11.3166 3.90237 10.6834 4.29289 10.2929L11.2929 3.29289C11.4804 3.10536 11.7348 3 12 3Z" />
              </svg>
              </a>
            </div>:""}

            <footer className={layoutStyles.footerContainer} id="contact">
              <div className={layoutStyles.ctaContainer}>
                <div className={layoutStyles.topPolygon} style={{transform: `rotate(-${footerPolygonRotationDegrees}deg)`,  backgroundColor: "#EA549E"}} ref={el => footerPolygonRef.current = el}></div>
                <p className={layoutStyles.ctaHeading}>Let's create</p>
                <a className={layoutStyles.ctaButton} href={page.ctaLink} rel="nofollow">Upwork profile</a>
              </div>
            </footer>
          </main>
        </div>
      )
}

export default Layout
