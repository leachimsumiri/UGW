import {createClient} from "@supabase/supabase-js";
import {OPTIONS, URL, API_KEY} from "./config";

const supabase = createClient(URL, API_KEY, OPTIONS)

export default supabase
