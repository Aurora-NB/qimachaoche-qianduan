<template>
  <div class="content-container">
    <h1 style="margin-bottom: 2vh">预处理数据管理</h1>
    <el-table :data="tableData" style="width: 98%" stripe border>
      <el-table-column label="job_id">
        <template slot-scope="scope">
          <span>{{ scope.row.job_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数据表名">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="命名空间">
        <template slot-scope="scope">
          <span>{{ scope.row.namespace }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务类型">
        <template slot-scope="scope">
          <span>{{ scope.row.work_mode === 0 ? '单机' : '集群' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-link type="primary">查询</el-link>
          <span>/</span>
          <el-link type="primary">下载</el-link>
          <span>/</span>
          <el-link type="primary">删除</el-link>
        </template>
      </el-table-column>

    </el-table>
  </div>

</template>

<script>
import { getDatasourcePreprocessList } from '../../../api/datasouceCenter'

export default {
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      getDatasourcePreprocessList().then((res) => {
        this.tableData = res.data.data
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
.content-container {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
</style>
