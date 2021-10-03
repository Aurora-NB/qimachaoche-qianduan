<template>
  <div class="site-layout-content">
    <el-steps :active="stepActive" style="height: 10%">
      <el-step icon="el-icon-upload" title="任务方选择"/>
      <el-step icon="el-icon-download" title="参数配置"/>
    </el-steps>
    <div class="content-container" style="height: 90%">
      <router-view @stepActive="changeStep"/>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      stepActive: 1
    }
  },
  methods: {
    changeStep(step) {
      this.stepActive = step
    }
  }
}
</script>

<style scoped>
.content-container {
  width: 100%;
  overflow-y: scroll;
}

</style>
