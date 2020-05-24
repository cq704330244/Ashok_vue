<template>
  <Lint class="a" />
</template>

<script>
import Lint from '../../components/echart/lint'
export default {
  name: 'deskTop',
  components: { Lint }
}
</script>

<style>
.a {
  position: relative;
  width: 100%;
  height: calc(100vh - 106px);
}
</style>
