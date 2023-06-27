import * as React from "react"
import { useEffect, useState } from "react"
import {heroContainer, heroHeadingContainer, heroHeading,
        greeting, heroAnimationContainer} from "./Hero.module.css"
import { textBrightGreen } from "../Layout/Layout.module.css"
import Illustration from "../Illustration/Illustration"

const Hero = () => {
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
        <div className={heroContainer} id="hero">
        <div className={heroHeadingContainer}>
          <h1 className={heroHeading}>
            Say<br />
            <span className={greeting} key={greetingIndex}>{greetings[greetingIndex]}</span><br />
            to your<br />
            <span className={textBrightGreen} >new website</span>
          </h1>
        </div>
        <div className={heroAnimationContainer}>
          <Illustration />
        </div>
      </div>
    )
}

export default Hero