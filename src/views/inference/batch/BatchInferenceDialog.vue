<template>
  <el-dialog
    :visible="show"
    :before-close="handleClose"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :destroy-on-close="true"
    width="30%">
    <template slot="title">
      <h1 class="dialog-title">新建预测任务</h1>
    </template>
    <el-form ref="form" :model="form" :rules=" rules">
      <el-form-item label="任务名称:" prop="name">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="service_id:" prop="service_id">
        <el-input v-model="form.service_id"/>
      </el-form-item>
      <el-form-item label="匹配样本的特征:" prop="feature">
        <el-input v-model="form.model"/>
      </el-form-item>
      <el-form-item prop="file" label="预测样本">
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
    </el-form>
    <template slot="footer">
      <el-button @click="handleClose">取消</el-button>
      <el-button :loading="submitLoading" plain type="primary" @click="handleSubmit">执行</el-button>
    </template>
  </el-dialog>
</template>

<script>

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: { name: '', service_id: '', feature: '', content: '', file: [] },
      rules: {
        name: [{ required: true, message: '请输入任务名称' }],
        service_id: [{ required: true, message: '请选择service_id' }],
        feature: [{ required: true, message: '请输入匹配样本的特征' }]
      },
      submitLoading: false
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    handleSubmit() {
      if (this.form.file.length === 0) {
        this.$message({ message: '请选择预测样本文件', type: 'warning' })
        return
      }

      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitLoading = true
          // const { form } = this
          setTimeout(()=>{
            this.$refs.form.resetFields()
            this.submitLoading = false
            this.$emit('close')
          }, 1000)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetFile(file) {
      this.form.file = [file]
      return false
    }
  }
}
</script>
