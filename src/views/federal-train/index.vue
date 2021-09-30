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
.site-layout-content {
  padding: 24px;
  border-radius: 7px;
  -moz-border-radius: 7px;
  -webkit-box-shadow: 0 20px 15px #9B7468;
  -moz-box-shadow: 0 20px 15px #9B7468;
  box-shadow: 0 8px 8px rgba(96, 185, 234, .24), 0 0 8px rgba(96, 185, 234, .12);
  text-decoration: none;
  background: #fff;
  height: 88vh;
  width: 95%;
  justify-self: center;
  align-self: center;
}

</style>
