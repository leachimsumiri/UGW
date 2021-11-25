<template>
  <div>
    <h1>Events</h1>
    <b-table
        striped
        hover
        :items="data"
        :fields="fields"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :busy="busy">
      <template #cell(time)="data">
        {{format(new Date(data.value), 'PPpp')}}
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
        }
      ],
      format: format
    }
  }
}
</script>
