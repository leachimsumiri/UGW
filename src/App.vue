<template>
  <div id="app">
    <Events :data="events"/>
    <Locations :data="locations"/>
  </div>
</template>

<script>
import supabase from './supabase/supabase_client'

import Events from './components/Events.vue'
import Locations from './components/Locations.vue'

export default {
  name: 'App',
  components: {
    Locations,
    Events
  },
  async mounted() {
    this.events = await this.fetchEvents()
    this.locations = await this.fetchLocations()
  },
  data() {
    return {
      events: null,
      locations: null
    }
  },
  methods: {
    async fetchEvents() {
      const { data, error } = await supabase.from('events').select()

      console.log(data)
      console.log(error)

      return data
    },
    async fetchLocations() {
      const { data, error } = await supabase.from('locations').select()

      console.log(data)
      console.log(error)

      return data
    }
  }
}
</script>
