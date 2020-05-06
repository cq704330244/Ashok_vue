<template>
  <div>
    <Upload @onchange="imgChange" />
  </div>
</template>

<script>
import Upload from '../../components/upload/index.vue'
export default {
  name: 'imgupload',
  components: {
    Upload
  },
  methods: {
    imgChange(fileList) {
      console.log(fileList)
    }
  }
}
</script>

<style></style>
