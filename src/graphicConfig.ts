/**
 *
 * @author fuyg
 * @date  2019-07-16
 */

import CircularBall from './graphic/CircularBall'
import EasingBall from './graphic/EasingBall'
import EllipseBall from './graphic/EllipseBall'
import GraphicComponentConstructor from './graphic/GraphicComponentConstructor'
import OpacityBall from './graphic/OpacityBall'
import Rocket from './graphic/Rocket'
import ScalingBall from './graphic/ScalingBall'

interface GraphicConfigItem {
  graphicClass: GraphicComponentConstructor
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
  {
    graphicClass: EllipseBall,
    props: {
      speed: 0.01,
      radius: 100,
      longRadius: 200,
      x: 1000,
      y: 250,
    },
  },
]

export { graphicConfig }
