<template>
  <div>
    Locations, direct query from db:
    <p>{{ data }}</p>
  </div>
</template>

<script>
export default {
  name: 'Locations',
  props: ['data']
}
</script>
