import * as React from "react"
import {portfolioItem, portfolioInfoBlock, portfolioHeading,
     portfolioTechStack, backgroundBlock, portfolioLink, topPolygon,
    bottomPolygon, portfolioImageStyle, portfolioImageWrapper } from "./Portfolio.module.css"
import { GatsbyImage } from "gatsby-plugin-image"

const Portfolio = ({ portfolio, rotationDegrees, imageType, refs }) => {

    return(
        <>
            {portfolio.map( (item, index) => (
            <div className={portfolioItem} key={item.itemId} style={{backgroundColor: `${item.topColor}`, zIndex: `${index}`}}>
                <div className={portfolioInfoBlock}>
                    <div>
                        <h2 className={`${portfolioHeading} ${backgroundBlock}`}>{item.description}</h2>
                        <p className={`${portfolioTechStack} ${backgroundBlock}`}>{item.techStack}</p>
                    </div>
                    <a className ={`${portfolioLink} ${backgroundBlock}`} rel="noreferrer noopener nofollow" href={item.link} target="_blank">Check it out -&gt;</a>
                </div>
                <div className={topPolygon} style={{transform: `rotate(-${rotationDegrees[item.itemId-1]}deg)`, backgroundColor: `${item.topColor}`}} ref={el => refs.current[item.itemId] = el}></div>
                <GatsbyImage imgClassName={portfolioImageStyle} className={portfolioImageWrapper} image={item[imageType].gatsbyImageData} alt={item.imageAltText} />
                <div className={bottomPolygon} style={{backgroundColor: `${item.bottomColor}`}}></div>
            </div>
            ))}
        </>
    )
}

export default Portfolio