import calculateDistance from "../geo_location/calculateDistance";

export default {
    state: {
        events: [],
        locations: []
    },
    mutations: {
        addEvent(state, event) {
            state.events.push(event)
        },
        addLocation(state, location) {
            state.locations.push(location)
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
