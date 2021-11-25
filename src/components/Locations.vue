<template>
  <div>
    <h1>Locations, direct query from db:</h1>
    <b-table striped hover :items="data"></b-table>
  </div>
</template>

<script>
import {BTable} from 'bootstrap-vue'

export default {
  name: 'Locations',
  props: ['data'],
  components: {
    "b-table": BTable
  }
}
</script>
