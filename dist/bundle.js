export default class Event {
    constructor(id, description, location_id, time) {
        this._id = id
        this._description = description
        this._location_id = location_id
        this._location_description = ""
        this._time = time
        this._current_distance = 0
    }

    get id() {
        return this._id
    }

    get description() {
        return this._description
    }

    get location_id() {
        return this._location_id
    }

    get location_description() {
        return this._location_description
    }

    get time() {
        return this._time
    }

    get current_distance() {
        return this._current_distance
    }

    set id(id) {
        this._id = id
    }

    set description(description) {
        this._description = description
    }

    set location_id(location_id) {
        this._location_id = location_id
    }

    set location_description(location_description) {
        this._location_description = location_description
    }

    set time(time) {
        this._time = time
    }

    set current_distance(current_distance) {
        this._current_distance = current_distance
    }
}

export default class Location {
    constructor(id, description, address, lat, long) {
        this._id = id
        this._description = description
        this._address = address
        this._lat = lat
        this._long = long
    }

    get id() {
        return this._id
    }

    get description() {
        return this._description
    }

    get address() {
        return this._address
    }

    get lat() {
        return this._lat
    }

    get long() {
        return this._long
    }

    set id(id) {
        this._id = id
    }

    set description(description) {
        this._description = description
    }

    set address(address) {
        this._address = address
    }

    set lat(lat) {
        this._lat = lat
    }

    set long(long) {
        this._long = long
    }
}

export default function(lat1, lon1, lat2, lon2) {
    //https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p) / 2 +
        c(lat1 * p) * c(lat2 * p) *
        (1 - c((lon2 - lon1) * p)) / 2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

export default '25864308b6a77fd90f8bf04b3021a48c1f2fb302a676dd3809054bc1b07f5b42'

export default 'pk.eyJ1IjoibGVhY2hpbSIsImEiOiJja3dmbGw1eHowM3FpMm9tbGYwODBjc252In0.1Uy0WQq36UaEURZJPUkB0Q'

import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import vuexStore from './store/vuexStore'
import vuetify from './plugins/vuetify'

Vue.use(Vuex)
Vue.config.productionTip = false

const store = new Vuex.Store(vuexStore)

new Vue({
    vuetify,
    store: store,
    render: h => h(App),
}).$mount('#app')

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify);

const opts = {};

export default new Vuetify(opts);

import calculateDistance from "../geo_location/calculateDistance";

export default {
    state: {
        events: [],
        locations: []
    },
    getters: {
        filterByUserDefinedRadius: state => radius => {
            return state.events.filter(event => !event.current_distance || event.current_distance <= radius)
        }
    },
    mutations: {
        addEvent(state, newEvent) {
            if(!state.events.find(event => event.id === newEvent.id)) {
                state.events.push(newEvent)
            }
        },
        addLocation(state, newLocation) {
            if(!state.locations.find(location => location.id === newLocation.id)) {
                state.locations.push(newLocation)
            }
        },
        enrichEventsByLocationDescription(state) {
            state.events.forEach(event => {
                event.location_description = state.locations.find(location => location.id === event.location_id).description
            })
        }
    },
    actions: {
        async enrichEventsByCurrentDistance({state}, {
            lat, long
        }) {
            const promises = state.events.map(event => {
                let location = state.locations.find(location => location.id === event.location_id)
                event.current_distance = calculateDistance(location.lat, location.long, lat, long).toFixed(2)
            })

            await Promise.all(promises)
        }
    }
}

export const OPTIONS = {
    schema: 'public',
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
}

export const URL = 'https://tfnxpxrrpejortbsbjnd.supabase.co'

export const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNzY5Mzk1MiwiZXhwIjoxOTUzMjY5OTUyfQ.mDH0Nc66EONfT-9RYu9zy-Uhz9GOEOK6fB5fWI0T8Sw'

import {createClient} from "@supabase/supabase-js";
import {OPTIONS, URL, API_KEY} from "./config";

const supabase = createClient(URL, API_KEY, OPTIONS)

export default supabase
