<template>
  <div>
    <h1 class="dialog-title" style="margin-bottom: 3vh">批量预测</h1>
    <el-button type="primary" style="margin-bottom: 1vh" @click="dialogShow = true">新建预测任务</el-button>
    <el-table :data="data" stripe border>
      <el-table-column label="序号" type="index"/>
      <el-table-column label="service_id">
        <template slot-scope="scope">
          <span>{{ scope.row.service_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="关联模型">
        <template slot-scope="scope">
          <span>{{ scope.row.relational_model }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span>{{ scope.row.status }}</span>
        </template>
      </el-table-column>
    </el-table>
    <batch-inference-dialog :show="dialogShow" @close="handleDialogClose"/>
  </div>
</template>

<script>
import BatchInferenceDialog from './BatchInferenceDialog'

export default {
  components: {
    'batch-inference-dialog': BatchInferenceDialog
  },
  data() {
    return {
      dialogShow: false,
      data: [
        { service_id: '123456789', name: '123', relational_model: '456789', status: '完成' },
        { service_id: '123456789', name: '123', relational_model: '456789', status: '完成' },
        { service_id: '123456789', name: '123', relational_model: '456789', status: '完成' },
        { service_id: '123456789', name: '123', relational_model: '456789', status: '完成' },
        { service_id: '123456789', name: '123', relational_model: '456789', status: '完成' }
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
