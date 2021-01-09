import { createStoreon } from 'storeon'

import { turnips } from './turnips'
import { speeches } from './speeches'
import { general } from './general'

export const store = createStoreon([turnips, speeches, general])
