<template>
  <div id="app">
    <Events v-if="eventsTableIsActive" :data="events" :busy="eventFetchingActive"/>
    <Locations v-else :data="locations" :busy="locationFetchingActive"/>
    <hr>
    <div>
      Show <span class="table-trigger" @click="eventsTableIsActive =! eventsTableIsActive">{{ inactiveTable }}</span>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {mapState, mapMutations} from 'vuex'

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
  async mounted() {
    await this.fetchLocations()
    await this.fetchEvents()
  },
  data() {
    return {
      eventFetchingActive: false,
      locationFetchingActive: false,
      eventsTableIsActive: true
    }
  },
  computed: {
    ...mapState([
        'events',
        'locations'
    ]),
    inactiveTable() {
      return this.eventsTableIsActive ? 'Locations' : 'Events'
    }
  },
  methods: {
    ...mapMutations([
        'addEvent',
        'addLocation',
        'enrichEventsByLocationDescription'
    ]),
    async fetchEvents() {
      this.eventFetchingActive = true

      const {data, error} = await supabase.from('events').select()

      data.forEach(item => {
        this.addEvent(new Event(item.id, item.description, item.location_id, new Date(item.time).toISOString()))
      })

      this.enrichEventsByLocationDescription()

      this.eventFetchingActive = false
    },
    async fetchLocations() {
      this.locationFetchingActive = true

      const {data, error} = await supabase.from('locations').select()

      data.forEach(item => {
        this.addLocation(new Location(item.id, item.description, item.address, item.lat, item.long))
      })

      this.locationFetchingActive = false
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
