/**
 *
 * @author fuyg
 * @date  2019-07-19
 */

import SpriteConfigItem from '../SpriteConfigItem'
import Sprite from './Sprite'
import SpriteProps from './SpriteProps'
import Stage from './Stage'
import StageProps from './StageProps'

function createSprite(props: SpriteProps, stage?: Stage): Sprite {
  const sprite = new Sprite(props)
  if (stage) {
    stage.addSprite(sprite)
  }
  return sprite
}

function createStage(
  canvas: HTMLCanvasElement,
  spriteConfig: SpriteConfigItem[],
): Stage {
  const props: StageProps = {
    canvas,
    spriteConfig,
  }
  const stage = new Stage(props)
  return stage
}

export { createSprite, createStage }
