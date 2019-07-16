/**
 *
 * @author fuyg
 * @date  2019-07-16
 */

import CircularBall from './graphic/CircularBall'
import EasingBall from './graphic/EasingBall'
import { GraphicComponent } from './graphic/GraphicComponent'
import OpacityBall from './graphic/OpacityBall'
import Rocket from './graphic/Rocket'
import ScalingBall from './graphic/ScalingBall'
type BaseConstructor = new (props: any) => GraphicComponent

interface GraphicConfigItem {
  graphicClass: BaseConstructor
  props: any
}

const graphicConfig: GraphicConfigItem[] = [
  {
    graphicClass: EasingBall,
    props: {
      easing: 0.05,
    },
  },
  {
    graphicClass: EasingBall,
    props: {
      easing: 0.1,
    },
  },
  {
    graphicClass: Rocket,
    props: {
      easing: 0.2,
    },
  },
  {
    graphicClass: ScalingBall,
    props: {
      speed: 0.02,
      radius: 50,
      innerRadius: 5,
      x: 100,
      y: 100,
    },
  },
  {
    graphicClass: ScalingBall,
    props: {
      speed: 0.07,
      radius: 50,
      innerRadius: 5,
      x: 300,
      y: 300,
    },
  },
  {
    graphicClass: OpacityBall,
    props: {
      speed: 0.01,
      radius: 100,
      innerRadius: 20,
      x: 100,
      y: 300,
    },
  },
  {
    graphicClass: CircularBall,
    props: {
      speed: 0.01,
      radius: 100,
      x: 500,
      y: 200,
    },
  },
  {
    graphicClass: CircularBall,
    props: {
      speed: 0.03,
      radius: 150,
      x: 700,
      y: 200,
    },
  },
]

export { graphicConfig }
