<template>
  <div>
    <h1>Events</h1>
    <b-table
        striped
        hover
        :items="data"
        :fields="computedFields"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :busy="busy">
      <template #cell(time)="data">
        {{ format(new Date(data.value), 'PPpp') }}
      </template>
      <template #cell(current_distance)="data">
        <div v-if="!data.value">
          <b-spinner class="align-middle"></b-spinner>
        </div>
        <div v-else>
          {{ data.value }}km
        </div>
      </template>
      <template #table-busy>
        <div class="text-center my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
    </b-table>
    <div>
      Sorting By: <b>{{ sortBy }}</b>, Sort Direction:
      <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b>
    </div>
  </div>
</template>


<script>
import {BTable, BSpinner} from 'bootstrap-vue'
import format from 'date-fns/format'
import $ from "jquery";
import {mapState, mapActions} from 'vuex'

export default {
  name: 'Events',
  props: [
    'data',
    'busy'
  ],
  components: {
    "b-table": BTable,
    "b-spinner": BSpinner
  },
  mounted() {
    this.getUserLocation()

    setTimeout(() => {
      if (!this.distanceCalculated && (!this.lat || !this.long)) {
        this.getUserLocationByIpAddress()
      } else {
        this.userLocationSuccessHandler()
      }
    }, 3000)
  },
  data() {
    return {
      sortBy: 'time',
      sortDesc: false,
      fields: [
        {
          key: 'description',
          sortable: true
        },
        {
          key: 'location_description',
          label: 'Location',
          sortable: true
        },
        {
          key: 'time',
          sortable: true
        },
        {
          key: 'current_distance',
          label: 'Distance',
          sortable: true
        }
      ],
      format: format,
      lat: null,
      long: null,
      accuracy: null,
      distanceCalculated: false,
    }
  },
  computed: {
    ...mapState([
      'locations'
    ]),
    computedFields() {
      return this.distanceCalculated ? this.fields : this.fields.filter(field => field.key !== 'current_description')
    },
  },
  methods: {
    ...mapActions([
      'enrichEventsByCurrentDistance'
    ]),
    getUserLocation() {
      let options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }

      const success = (pos) => {
        var crd = pos.coords;

        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);

        this.lat = crd.latitude
        this.long = crd.longitude
        this.accuracy = crd.accuracy

        this.userLocationSuccessHandler()
      }

      const error = (err) => {
        console.log("failed to retrieve user data with navigator.geolocation. Error:")
        console.warn(`ERROR(${err.code}): ${err.message}`);
        console.log(err);
        console.log("trying now to retrieve user geoinformation by ip address")

        this.getUserLocationByIpAddress()
      }

      if (!navigator.geolocation) {
        console.log('Geolocation is not supported by your browser')
      } else {
        console.log('Locating…')
        navigator.geolocation.getCurrentPosition(success, error, options);
      }
    },
    getUserLocationByIpAddress() {
      let ipinfodb_apiKey = '25864308b6a77fd90f8bf04b3021a48c1f2fb302a676dd3809054bc1b07f5b42'

      $.getJSON('https://api.ipinfodb.com/v3/ip-city/?format=json&key=' + ipinfodb_apiKey, (data) => {
        if (data.status !== 'OK') {
          console.warn("error retrieving user location by ip address:")
          console.log(JSON.stringify(data, null, 2))
        } else {
          console.log("successfully retrieved user location by ip address:")
          console.log(JSON.stringify(data, null, 2))

          this.lat = data.latitude
          this.long = data.longitude

          this.userLocationSuccessHandler()
        }
      })
    },
    async userLocationSuccessHandler() {
      await this.enrichEventsByCurrentDistance({
        lat: this.lat,
        long: this.long
      })

      this.distanceCalculated = true
    }
  }
}
</script>
