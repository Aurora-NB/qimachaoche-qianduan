<template>
  <div class="content-container">
    <h1 style="margin-bottom: 2vh">数据源管理</h1>
    <el-button type="primary" style="margin-bottom: 2vh" @click="updateDatasourceShow = true">上传数据源</el-button>
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
          <el-link type="primary">预处理</el-link>
          <span>/</span>
          <el-link type="primary" @click="downloadTemplateByFullPath(scope.row.file)">下载</el-link>
          <span>/</span>
          <el-link slot="reference" type="primary" @click="delDatasource(scope.row.job_id)">删除</el-link>

        </template>
      </el-table-column>

    </el-table>
    <update-datasource :show="updateDatasourceShow" @close="handleDialogClose"/>
  </div>
</template>

<script>
import { delDatasource, getDatasourceManagementList } from '../../../api/datasouceCenter'
import UpdateDatasource from '../components/updateDatasourceDialog'
import { downloadTemplateByFullPath } from '../../../api/common'

export default {
  components: {
    'update-datasource': UpdateDatasource
  },
  data() {
    return {
      tableData: [],
      updateDatasourceShow: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.tableData = []
      getDatasourceManagementList().then((res) => {
        this.tableData = res.data.data
      }).catch((err) => {
        console.log(err)
      })
    },
    delDatasource(job_id) {
      this.$confirm('确定要删除么？删除后无法恢复！', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delDatasource(job_id).then((res) => {
          if (res.code === 0) {
            this.$message({ message: '删除成功', type: 'success' })
          } else {
            this.$message({ message: '删除失败,请稍后再试', type: 'error' })
          }
        }).catch(e => {
          console.log('删除失败,网络异常')
        }).finally(() => {
          this.getList()
        })
      }).catch((e) => {
        console.log(e)
      })
    },
    handleDialogClose() {
      this.updateDatasourceShow = false
      this.getList()
    },
    downloadTemplateByFullPath
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
