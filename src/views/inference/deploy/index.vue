<template>
  <div>
    <h1 class="dialog-title" style="margin-bottom: 3vh">模型部署</h1>
    <el-button type="primary" style="margin-bottom: 1vh" @click="dialogShow = true">新建部署任务</el-button>
    <el-table :data="data" stripe border>
      <el-table-column label="序号" type="index"/>
      <el-table-column label="service_id">
        <template slot-scope="scope">
          <span>{{ scope.row.service_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="关联模型">
        <template slot-scope="scope">
          <span>{{ scope.row.relational_model }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span>{{ scope.row.status }}</span>
        </template>
      </el-table-column>
    </el-table>
    <deploy-dialog :show="dialogShow" @close="handleDialogClose"/>
  </div>
</template>

<script>
import DeployDialog from './DeployDialog'

export default {
  components: {
    'deploy-dialog': DeployDialog
  },
  data() {
    return {
      dialogShow: false,
      data: [
        { service_id: '123456789', relational_model: '456789', status: '完成' },
        { service_id: '123456789', relational_model: '456789', status: '完成' },
        { service_id: '123456789', relational_model: '456789', status: '完成' },
        { service_id: '123456789', relational_model: '456789', status: '完成' }
      ]
    }
  },
  methods: {
    handleDialogClose() {
      console.log(123)
      this.dialogShow = false
    }
  }
}
</script>
