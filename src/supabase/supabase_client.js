import {createClient} from '@supabase/supabase-js'
import {OPTIONS, SUPABASE_URL, SUPABASE_KEY} from '../config'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, OPTIONS)

export default supabase
