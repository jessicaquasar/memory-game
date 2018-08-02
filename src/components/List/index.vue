<template>
  <div class="">
    <h1>{{ title }}</h1>
    <ul v-if="data.length">
      <li v-for="(item, index) in data" :key="index">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'List',
  props: {
    title: {
      type: String,
      default: 'Lista'
    },
    data: {
      type: Array,
      default: () => []
    }
  }
}
</script>