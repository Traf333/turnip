import { createStoreon } from 'storeon'

import { turnips } from './turnips'
import { speeches } from './speeches'

export const store = createStoreon([turnips, speeches])
