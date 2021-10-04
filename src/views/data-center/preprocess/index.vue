<template>
  <div class="content-container">
    <h1 class="dialog-title" style="margin-bottom: 3vh">预处理数据管理</h1>
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
          <el-link type="primary" @click="handlePreprocess(scope.row)">查询</el-link>
          <span>/</span>
          <el-link type="primary" @click="downloadTemplateByFullPath(scope.row.file)">下载</el-link>
          <span>/</span>
          <el-link type="primary" @click="delDatasource(scope.row.job_id)">删除</el-link>
        </template>
      </el-table-column>

    </el-table>
    <datasource-dialog :show="datasourceDialogShow" :basic-info="curInfo" :type="1" @close="handleDatasourceDialogClose"/>
  </div>

</template>

<script>
import { delDatasource, getDatasourcePreprocessList } from '../../../api/datasouceCenter'
import { downloadTemplateByFullPath } from '../../../api/common'
import DatasourceDialog from '../components/datasourceDialog'

export default {
  components: {
    'datasource-dialog': DatasourceDialog
  },
  data() {
    return {
      tableData: [],
      datasourceDialogShow: false,
      curInfo: {}
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.tableData = []
      getDatasourcePreprocessList().then((res) => {
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
    handleDatasourceDialogClose() {
      this.datasourceDialogShow = false
      this.getList()
    },
    handlePreprocess(info) {
      this.curInfo = info
      this.datasourceDialogShow = true
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
