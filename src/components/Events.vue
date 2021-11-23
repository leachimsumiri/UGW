<template>
  <div>
    Events, direct query from db:
    <p>{{ data }}</p>
  </div>
</template>

<script>
export default {
  name: 'Events',
  props: ['data']
}
</script>
