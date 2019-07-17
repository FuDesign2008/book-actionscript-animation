/**
 *
 * @author fuyg
 * @date  2019-07-12
 */
import Filter from './Filter'
import FilterConstructor from './FilterConstructor'
import FilterManager from './FilterManager'

function buildFilter(
  manager: FilterManager,
  filterClass: FilterConstructor,
  options: any,
): Filter {
  const filter: Filter = new filterClass(options)
  manager.add(filter)
  return filter
}

export { buildFilter }
