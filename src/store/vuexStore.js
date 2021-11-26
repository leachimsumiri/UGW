import calculateDistance from "../geo_location/calculateDistance";

export default {
    state: {
        events: [],
        locations: []
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
