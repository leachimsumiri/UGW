<template>
  <div id="app">
    <Events v-if="eventsTableIsActive" :data="events" :busy="eventFetchingActive"/>
    <Locations v-else :data="locations" :busy="locationFetchingActive"/>
    <hr>
    <div>
      Show <span class="table-trigger" @click="eventsTableIsActive =! eventsTableIsActive">{{inactiveTable}}</span>
    </div>
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
    this.fetchLocations()
    this.fetchEvents()
  },
  data() {
    return {
      events: [],
      eventFetchingActive: false,
      locations: [],
      locationFetchingActive: false,
      eventsTableIsActive: true
    }
  },
  computed: {
    inactiveTable() {
      return this.eventsTableIsActive ? 'Locations' : 'Events'
    }
  },
  methods: {
    async fetchEvents() {
      this.eventFetchingActive = true

      const {data, error} = await supabase.from('events').select()

      data.forEach(item => {
        this.events.push(new Event(item.id, item.description, item.location_id, new Date(item.time).toISOString()))
      })

      this.enrichEvents()

      this.eventFetchingActive = false
    },
    async fetchLocations() {
      this.locationFetchingActive = true

      const {data, error} = await supabase.from('locations').select()

      data.forEach(item => {
        this.locations.push(new Location(item.id, item.description, item.address, item.lat, item.long))
      })

      this.locationFetchingActive = false
    },
    enrichEvents() {
      this.events.forEach(event => {
        event._location_description = this.locations.find(location => location.id === event._location_id).description
      })
    }
  }
}
</script>

<style>
.table-trigger {
  cursor: pointer;
  color: -webkit-link;
}
</style>
