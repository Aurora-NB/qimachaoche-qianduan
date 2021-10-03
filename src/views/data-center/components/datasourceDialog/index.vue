<template>
  <el-dialog title="上传数据集"/>
</template>

<script>

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    type: {
      type: Number,
      default: 0
    }
  }
}
</script>
