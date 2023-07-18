import * as React from "react"
import { useEffect, useState } from "react"
import {heroWrapper, heroContainer, heroHeadingContainer, heroHeading,
        greeting, heroAnimationContainer, textBrightGreen, ctaButton, ctaContainer} from "./Hero.module.css"
import Illustration from "../Illustration/Illustration"

const Hero = ({ ctaLink }) => {
    const greetings = ["hello", "labas", "bonjour", "hallo", "ciao", "привіт", "hola", "habari", "こんにちは", "witam", "ahoj", "tere", "hallå", "hei", "你好", "merhaba"]
    const [greetingIndex, setGreetingIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
          setGreetingIndex((greetingIndex) =>
          greetingIndex + 1 >= greetings.length ? 0 : greetingIndex + 1
          );
        }, 6000);
      
        return () => clearInterval(interval);
      }, []);

    return (
        <div className={heroWrapper} id="hero">
          <div className={heroContainer}>
            <div className={heroHeadingContainer}>
              <h1 className={heroHeading}>
                Say&nbsp; 
                <span className={greeting} key={greetingIndex}>{greetings[greetingIndex]}</span><br />
                to your<br />
                <span className={textBrightGreen} >new website</span>
              </h1>
            </div>
            <div className={ctaContainer}>
              <a className={ctaButton} href={ctaLink} rel="nofollow">CONTACT</a>
            </div>
        </div>
      </div> 
    )
}

export default Hero