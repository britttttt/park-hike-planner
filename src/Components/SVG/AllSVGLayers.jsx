import { SVGLayer1 } from "./SVGLayer1"
import { SVGLayer2 } from "./SVGLayer2"
import { SVGLayer3 } from "./SVGLayer3"
import "./SVGBackground.css"
import { SVGLayer12 } from "./SVGLayerBG"
import { SVGLayer4 } from "./SVGLayer4"
export const AllSVGLayers = () => {
    return (
        <div class="landscape" role="img" aria-label="This is equivalent to an img alt attribute.">
                <div class="landscape__layer">
                    <div class="landscape__image_12">
                        <SVGLayer12 />
                    </div>
                </div>

            <div class="landscape__layer">
                <div class="landscape__image_4">
                    <SVGLayer4 />
                </div>
            </div>

            <div class="landscape__layer">
                <div class="landscape__image_3">
                    <SVGLayer3 />
                </div>
            </div>
            
            <div class="landscape__layer">
                <div class="landscape__image_2">
                    <SVGLayer2 />
                </div>
            </div>

                <div class="landscape__layer">
                    <div class="landscape__image_1">
                        <SVGLayer1 />
                    </div>
                </div>

        </div>
    )
}
