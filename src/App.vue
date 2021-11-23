<template>
  <div id="app">
    <Events :data="data"/>
  </div>
</template>

<script>
import Events from './components/Events.vue'
import { createClient } from '@supabase/supabase-js'

export default {
  name: 'App',
  components: {
    Events
  },
  async mounted() {
    const options = {
      schema: 'public',
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
    const supabase = createClient('https://tfnxpxrrpejortbsbjnd.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNzY5Mzk1MiwiZXhwIjoxOTUzMjY5OTUyfQ.mDH0Nc66EONfT-9RYu9zy-Uhz9GOEOK6fB5fWI0T8Sw', options)
    const { data, error } = await supabase
        .from('events')
        .select()

    console.log(data)
    console.log(error)

    this.data = data
  }
}
</script>
