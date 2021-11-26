<template>
  <div>
    <h1>Events</h1>
    <b-table
        striped
        hover
        :items="filterByUserDefinedRadius(userDefinedRadius)"
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
    <div class="table-footer">
      <div>
        Sorting By: <b>{{ getSortByLabel(sortBy) }}</b>, Sort Direction:
        <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b>
      </div>
      <div class="radius-wrapper">
        <span>Radius: </span>
        <v-app>
          <v-slider v-model="userDefinedRadius" min="1" max="100"></v-slider>
        </v-app>
        <span>{{userDefinedRadius}}km</span>
      </div>
    </div>
  </div>
</template>


<script>
import {BTable, BSpinner} from 'bootstrap-vue'
import format from 'date-fns/format'
import $ from "jquery";
import {mapState, mapGetters, mapActions} from 'vuex'
import ipinfodb_apiKey from '../geo_location/ipinfodb_apiKey'
import {VApp, VSlider} from 'vuetify/lib'
import vuetify from '../plugins/vuetify';

export default {
  name: 'Events',
  vuetify,
  props: [
    'busy'
  ],
  components: {
    "b-table": BTable,
    "b-spinner": BSpinner,
    VApp,
    VSlider
  },
  mounted() {
    this.getUserLocation()
    this.addDistanceCalculatorTimeout()
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
      userDefinedRadius: 50
    }
  },
  computed: {
    ...mapState([
      'locations'
    ]),
    ...mapGetters([
        'filterByUserDefinedRadius'
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
      $.getJSON('https://api.ipinfodb.com/v3/ip-city/?format=json&key=' + ipinfodb_apiKey, (data) => {
        if (data.statusCode !== 'OK') {
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
      this.$emit('geoDataLoaded', this.lat, this.long)
    },
    getSortByLabel(key) {
      const field = this.fields.find(field => field.key === key)
      return field.label ? field.label : field.key.charAt(0).toUpperCase() + field.key.slice(1)
    },
    addDistanceCalculatorTimeout() {
      setTimeout(() => {
        if (!this.distanceCalculated && (!this.lat || !this.long)) {
          this.getUserLocationByIpAddress()
        } else {
          this.userLocationSuccessHandler()
        }
      }, 5000)
    }
  }
}
</script>

<style lang="scss">
.table-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .radius-wrapper {
    display: flex;

    > div {
      height: 0;
      margin: 0 1rem;
      width: 200px;
    }
  }
}
</style>
