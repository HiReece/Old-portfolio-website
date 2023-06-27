import * as React from "react"
import {techStackBannerWrapper, techStackBannerContainer, techStackBanner,
        image, bannerImageWrapper, techStackBannerSecond} from "./Banner.module.css"
import { GatsbyImage } from "gatsby-plugin-image"

const Banner = ({bannerImages}) => {
    return(
        <div className={techStackBannerWrapper}>
            <div className={techStackBannerContainer}>
              <ul className={techStackBanner}>
                {bannerImages.map(bannerImage => (
                  <li>
                    <GatsbyImage imgClassName={image} className={bannerImageWrapper} image={ bannerImage.gatsbyImageData} alt={bannerImage.description} loading="eager"/>
                  </li>
                ))
                }
              </ul>
              <ul className={`${techStackBanner} ${techStackBannerSecond}`}>
                {bannerImages.map(bannerImage => (
                  <li>
                    <GatsbyImage imgClassName={image} className={bannerImageWrapper} image={ bannerImage.gatsbyImageData} alt={bannerImage.description} />
                  </li>
                ))
                }
              </ul>
            </div>
        </div>
    )
}

export default Banner