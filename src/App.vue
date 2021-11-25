<template>
  <div id="app">
    <Events :data="events"/>
    <br>
    <Locations :data="locations"/>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import supabase from './supabase/supabase_client'

import Event from './daos/Event'
import Location from './daos/Location'

import Events from './components/Events.vue'
import Locations from './components/Locations.vue'

export default {
  name: 'App',
  components: {
    Locations,
    Events
  },
  mounted() {
    this.fetchEvents()
    this.fetchLocations()
  },
  data() {
    return {
      events: [],
      locations: []
    }
  },
  methods: {
    async fetchEvents() {
      const {data, error} = await supabase.from('events').select()

      data.forEach(item => {
        this.events.push(new Event(item.id, item.description, item.location_id, item.time))
      })
    },
    async fetchLocations() {
      const {data, error} = await supabase.from('locations').select()

      data.forEach(item => {
        this.locations.push(new Location(item.id, item.description, item.address, item.lat, item.long))
      })
    }
  }
}
</script>
