<template>
  <div>
    <h1 class="dialog-title" style="margin-bottom: 3vh">单例预测</h1>
    <el-form ref="form" :model="form" :rules=" rules" :inline="true" label-width="128px">
      <el-row>
        <el-form-item label="service_id:" prop="service_id">
          <el-input v-model="form.service_id"/>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="匹配样本的特征:" prop="feature">
          <el-input v-model="form.feature"/>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="样本内容:" prop="content">
          <el-input v-model="form.content" type="textarea"/>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item >
          <el-button :loading="submitLoading" style="margin-left: 128px" plain type="primary" @click="handleSubmit">执行</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: { service_id: '', feature: '', content: '' },
      rules: {
        service_id: [{ required: true, message: '请输入service_id' }],
        feature: [{ required: true, message: '请输入匹配样本的特征' }],
        content: [{ required: true, message: '请输入样本内容' }]
      },
      submitLoading: false
    }
  },
  methods: {
    handleSubmit() {
      this.submitLoading = true
      setTimeout(() => {
        this.submitLoading = false
      }, 500)
    }
  }
}
</script>
