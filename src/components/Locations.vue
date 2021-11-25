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
  name: 'Locations',
  props: ['data'],
  components: {
    "b-table": BTable
  },
  data() {
    return {
      sortBy: 'description',
      sortDesc: false,
      fields: [
        {
          key: 'description',
          sortable: true
        },
        {
          key: 'address',
          sortable: true
        }
      ]
    }
  }
}
</script>
