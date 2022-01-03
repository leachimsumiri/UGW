<template>
	<div>
		<h1>Locations</h1>
		<b-table
			striped
			hover
			:items="data"
			:fields="fields"
			:sort-by.sync="sortBy"
			:sort-desc.sync="sortDesc"
			:busy="busy"
		>
			<template #table-busy>
				<div class="text-center my-2">
					<b-spinner class="align-middle"></b-spinner>
					<strong>Loading...</strong>
				</div>
			</template>
		</b-table>
		<div>
			Sorting By: <b>{{ getSortByLabel(sortBy) }}</b
			>, Sort Direction:
			<b>{{ sortDesc ? "Descending" : "Ascending" }}</b>
		</div>
	</div>
</template>

<script>
	import { BTable, BSpinner } from "bootstrap-vue";

	export default {
		name: "Locations",
		props: ["data", "busy"],
		components: {
			"b-table": BTable,
			"b-spinner": BSpinner,
		},
		data() {
			return {
				sortBy: "description",
				sortDesc: false,
				fields: [
					{
						key: "description",
						sortable: true,
					},
					{
						key: "address",
						sortable: true,
					},
				],
			};
		},
		methods: {
			getSortByLabel(key) {
				const field = this.fields.find((field) => field.key === key);
				return field.label
					? field.label
					: field.key.charAt(0).toUpperCase() + field.key.slice(1);
			},
		},
	};
</script>
