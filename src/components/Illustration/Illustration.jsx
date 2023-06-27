import * as React from "react"
import {illustrationContainer, illustrationBaseContainer, illustrationBase,
        illustrationBaseShadow, baseContentContainer, contentRow,
        rectangle, bgColorBlueJeans, bgColorFrenchSkyBlue,
        bgColorBabyBlueEyes, flippedOnMobile, rowFlippedOnMobile,
        circleContainer, circle,  notDisplayedOnMobile,
        contentRowJustifyEnd  } from "./illustration.module.css"

const Illustration = () => {
    return (
        <div className={illustrationContainer}>
              <div className={illustrationBaseContainer}>
                <div className={illustrationBase}>
                  <div className={baseContentContainer}>
                    <div className={contentRow}>
                      <div className={`${rectangle} ${bgColorBlueJeans}`}></div>
                    </div>
                    <div className={flippedOnMobile}>
                      <div className={`${contentRow} ${rowFlippedOnMobile}`}>
                        <div className={`${circleContainer} ${notDisplayedOnMobile}`}>
                          <div className={`${circle} ${bgColorFrenchSkyBlue}`}></div>
                        </div>
                        <div className={`${circleContainer} ${notDisplayedOnMobile}`}>
                          <div className={`${circle} ${bgColorBlueJeans}`}></div>
                        </div>
                        <div className={circleContainer}>
                          <div className={`${circle} ${bgColorFrenchSkyBlue}`}></div>
                        </div>
                        <div className={circleContainer}>
                          <div className={`${circle} ${bgColorBlueJeans}`}></div>
                        </div>
                      </div>
                      <div className={`${contentRow} ${contentRowJustifyEnd}`}>
                        <div className={`${rectangle} ${bgColorBabyBlueEyes}`}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={illustrationBaseShadow}></div>
              </div>
          </div>
    )
}

export default Illustration