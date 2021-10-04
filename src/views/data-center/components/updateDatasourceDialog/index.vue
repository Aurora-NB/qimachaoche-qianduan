<template>
  <el-dialog
    :visible="show"
    :before-close="handleClose"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :destroy-on-close="true">
    <template slot="title">
      <h1 class="dialog-title">上传数据集</h1>
    </template>
    <el-form
      ref="form"
      :rules="rules"
      :model="form"
      label-position="left"
      size="small"
    >
      <el-form-item prop="config_file" label="数据集选取:">
        <el-upload
          :limit="1"
          :auto-upload="true"
          :before-upload="resetFile"
          :multiple="false"
          :file-list="form.file"
          action="#">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item prop="table_name" label="数据表名:">
        <el-input v-model="form.table_name" class="table_name"/>
      </el-form-item>

      <el-form-item prop="namespace" label="命名空间:">
        <el-input v-model="form.namespace" class="namespace"/>
      </el-form-item>

      <el-form-item prop="description" label="数据集描述:">
        <el-input v-model="form.description" class="description"/>
      </el-form-item>

      <el-form-item prop="work_mode" label="任务类型:">
        <el-radio-group v-model="form.work_mode">
          <el-radio :label="0">单机</el-radio>
          <el-radio :label="1">集群</el-radio>
        </el-radio-group>
      </el-form-item>

    </el-form>

    <template slot="footer">
      <el-button @click="handleClose">取消</el-button>
      <el-button :loading="submitLoading" plain type="primary" @click="handleSubmit">上传并编辑下一项</el-button>
    </template>
  </el-dialog>
</template>

<script>

import { uploadDatasource } from '../../../../api/datasouceCenter'

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        file: [],
        table_name: '',
        namespace: '',
        description: '',
        work_mode: 0
      },
      rules: {
        table_name: [{ required: true, message: '请输入数据表名' }],
        namespace: [{ required: true, message: '请输入命名空间表名' }],
        description: [{ required: true, message: '请输入数据集描述表名' }]
      },
      submitLoading: false
    }
  },
  methods: {
    resetFile(file) {
      this.form.file = [file]
      return false
    },
    handleClose() {
      this.$emit('close')
    },
    handleSubmit() {
      if (this.form.file.length === 0) {
        this.$message({ message: '请选择数据源文件', type: 'warning' })
        return
      }

      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitLoading = true
          const { form } = this

          const data = new FormData()
          data.append('table_name', form.table_name)
          data.append('namespace', form.namespace)
          data.append('data_type', '0')
          data.append('description', form.description)
          data.append('work_mode', form.work_mode)
          data.append('file', form.file[0])

          uploadDatasource(data).then((res) => {
            if (res.code === 0) {
              this.$message({ message: '上传成功', type: 'success' })
            } else {
              this.$message({ message: '上传失败', type: 'error' })
            }
          }, (err) => {
            console.log(err)
          }).finally(() => {
            this.form.file = []
            this.$refs.form.resetFields()
            this.submitLoading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
