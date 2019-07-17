/**
 *
 * @author fuyg
 * @date  2019-07-17
 */
import { applyBlurFilter } from './applyBlurFilter'
import ApplyFunction from './ApplyFunction'
import { applyGrayFilter } from './applyGrayFilter'
import BlurFilter from './BlurFilter'
import Filter from './Filter'
import FilterConstructor from './FilterConstructor'
import GrayFilter from './GrayFilter'

interface MapConfigItem {
  filter: FilterConstructor
  apply: ApplyFunction
}

const mapConfig: MapConfigItem[] = [
  {
    filter: BlurFilter,
    apply: applyBlurFilter,
  },
  {
    filter: GrayFilter,
    apply: applyGrayFilter,
  },
]

function getApply(filter: Filter): ApplyFunction | null {
  const { name } = filter
  const found = mapConfig.find((item) => {
    return item.filter.NAME === name
  })
  return found ? found.apply : null
}

export { mapConfig, getApply }
