<template>
	<div id="app">
		<Events
			v-if="eventsTableIsActive"
			:busy="eventFetchingActive"
			@geoDataLoaded="initMap"
		/>
		<Locations
			v-else
			:data="activeLocations"
			:busy="locationFetchingActive"
		/>
		<hr />
		<div>
			Show
			<span
				class="table-trigger"
				@click="eventsTableIsActive = !eventsTableIsActive"
				>{{ inactiveTable }}</span
			>
		</div>
		<div id="map"></div>
	</div>
</template>

<script>
	import "bootstrap/dist/css/bootstrap.css";
	import "bootstrap-vue/dist/bootstrap-vue.css";
	import { mapState, mapGetters, mapMutations } from "vuex";

	import supabase from "./supabase/supabase_client";

	import Event from "./daos/Event";
	import Location from "./daos/Location";

	import Events from "./components/Events.vue";
	import Locations from "./components/Locations.vue";

	import { MAPBOX_ACCESS_TOKEN } from "../config";

	const RECURRING_ID_INCREASE = 65536;

	export default {
		name: "App",
		components: {
			Locations,
			Events,
		},
		async mounted() {
			await this.fetchLocations();
			await this.fetchEvents();
		},
		data() {
			return {
				eventFetchingActive: false,
				locationFetchingActive: false,
				eventsTableIsActive: true,
				map: null,
			};
		},
		computed: {
			...mapState(["events", "locations"]),
			...mapGetters(["activeLocations"]),
			inactiveTable() {
				return this.eventsTableIsActive ? "Locations" : "Events";
			},
		},
		methods: {
			...mapMutations([
				"addEvent",
				"addLocation",
				"enrichEventsByLocationDescription",
			]),
			async fetchEvents() {
				this.eventFetchingActive = true;

				const { data, error } = await supabase.from("events").select();

				data.forEach((item) => {
					console.log(item);

					// One-time Event
					if (item.recurring_day_interval === 0)
						this.addEvent(
							new Event(
								item.id,
								item.description,
								item.location_id,
								new Date(item.time).toISOString()
							)
						);
					// Recurring Event (add several instances)
					else {
						// Event creation here, therefore recurring also here (eventually could also be moved to separate method)
						let baseDateTime = new Date(item.time);
						this.addEvent(
							new Event(
								item.id,
								item.description,
								item.location_id,
								new Date(baseDateTime).toISOString()
							)
						);
						this.addEvent(
							new Event(
								item.id + RECURRING_ID_INCREASE,
								item.description,
								item.location_id,
								new Date(
									baseDateTime.setDate(
										baseDateTime.getDate() +
											item.recurring_day_interval
									)
								).toISOString()
							)
						);
						this.addEvent(
							new Event(
								item.id + RECURRING_ID_INCREASE * 2,
								item.description,
								item.location_id,
								new Date(
									baseDateTime.setDate(
										baseDateTime.getDate() +
											item.recurring_day_interval * 2
									)
								).toISOString()
							)
						);

						// Possibly add events in a separate method, but hides what actually happens here. (Only) if process gets more complicated -> refactor to separate method, like ...
						// this.addRecurrentEvents(new Event(item.id, item.description, item.location_id, new Date(item.time).toISOString()), item.recurring_day_interval) // also possible
					}
				});

				this.enrichEventsByLocationDescription();

				this.eventFetchingActive = false;
			},
			async fetchLocations() {
				this.locationFetchingActive = true;

				const { data, error } = await supabase.from("locations").select();

				data.forEach((item) => {
					this.addLocation(
						new Location(
							item.id,
							item.description,
							item.address,
							item.lat,
							item.long
						)
					);
				});

				this.locationFetchingActive = false;
			},
			initMap(lat, long) {
				if (this.map) return;

				this.setMapView(lat, long);

				L.tileLayer(
					`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}`,
					{
						attribution:
							'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
						maxZoom: 18,
						id: "mapbox/streets-v11",
						tileSize: 512,
						zoomOffset: -1,
						accessToken: MAPBOX_ACCESS_TOKEN,
					}
				).addTo(this.map);

				this.setMapLocationMarker();
			},
			setMapView(lat, long) {
				this.map = L.map("map").setView([lat, long], 13);
			},
			setMapLocationMarker() {
				this.locations.forEach((location) =>
					L.marker([location.lat, location.long], {
						title: location.description,
					}).addTo(this.map)
				);
			},
		},
	};
</script>

<style>
	.table-trigger {
		cursor: pointer;
		color: -webkit-link;
	}

	#map {
		width: 100%;
		height: 800px;
		margin-top: 2rem;
	}
</style>
