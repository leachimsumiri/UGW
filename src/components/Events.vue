<template>
  <div>
    <h1>Events</h1>
    <b-table
        striped
        hover
        aria-sort="none"
        :items="data"
        :fields="fields"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
    ></b-table>
    <div>
      Sorting By: <b>{{ sortBy }}</b>, Sort Direction:
      <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b>
    </div>
  </div>
</template>

<script>
import {BTable} from 'bootstrap-vue'

export default {
  name: 'Events',
  props: ['data'],
  components: {
    "b-table": BTable
  },
  data() {
    return {
      sortBy: 'time',
      sortDesc: false,
      fields: [
        {
          key: 'description',
          sortable: true,
          headerAbbr: ''
        },
        {
          key: 'time',
          sortable: true
        }
      ]
    }
  }
}
</script>
