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
      <h1 class="dialog-title">新建部署任务</h1>
    </template>
    <el-form ref="form" :model="form" :rules=" rules">
      <el-form-item label="service_id:" prop="service_id">
        <el-input v-model="form.service_id"/>
      </el-form-item>
      <el-form-item label="相关模型:" prop="model">
        <el-input v-model="form.model"/>
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
      form: { service_id: '', model: '', content: '' },
      rules: {
        service_id: [{ required: true, message: '请输入service_id' }],
        model: [{ required: true, message: '请选择模型' }]
      },
      submitLoading: false
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    handleSubmit() {
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
    }
  }
}
</script>
