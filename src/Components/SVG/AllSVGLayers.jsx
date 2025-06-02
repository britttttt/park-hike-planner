import { SVGLayer1 } from "./SVGLayer1"
import { SVGLayer2 } from "./SVGLayer2"
import { SVGLayer3 } from "./SVGLayer3"
import "./SVGBackground.css"
import { SVGLayer12 } from "./SVGLayerBG"
import { SVGLayer4 } from "./SVGLayer4"
export const AllSVGLayers = () => {

    // constant elements: your main scrolling element; html element
const scrollEl = document.documentElement
const root = document.documentElement

let scrollPos

// update css property on scroll
function animation() {
  // check the scroll position has changed
  if (scrollPos !== scrollEl.scrollTop) {
    // reset the seen scroll position
    scrollPos = scrollEl.scrollTop
    // update css property --scrollPos with scroll position in pixels
    root.style.setProperty('--scrollPos', scrollPos + 'px')
  }

  // call animation again on next animation frame
  window.requestAnimationFrame(animation)
}

// start animation on next animation frame
window.requestAnimationFrame(animation)


    return (
        <div class="landscape" role="img" aria-label="This is equivalent to an img alt attribute.">
                <div className="landscape__layer" style={{ '--offset': 0.96 }}>
                    <div class="landscape__image_12">
                        <SVGLayer12 />
                    </div>
                </div>

            <div className="landscape__layer" style={{ '--offset': 0.6 }}>
                <div class="landscape__image_4">
                    <SVGLayer4 />
                </div>
            </div>

            <div className="landscape__layer" style={{ '--offset': 0.7 }}>
                <div class="landscape__image_3">
                    <SVGLayer3 />
                </div>
            </div>
            
            <div className="landscape__layer" style={{ '--offset': 0.5 }}>
                <div class="landscape__image_2">
                    <SVGLayer2 />
                </div>
            </div>

                <div className="landscape__layer" style={{ '--offset': 0 }}>
                    <div class="landscape__image_1">
                        <SVGLayer1 />
                    </div>
                </div>

        </div>
    )
}
