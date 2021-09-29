<template>
  <div>
    <div class="form-container">
      <el-form
        ref="form"
        :rules="rules"
        :model="form"
        label-position="right"
        size="small"
        style="width: 50vw"
        label-width="15vw">
        <el-form-item prop="train_name" label="任务名称:">
          <el-input v-model="form.train_name" class="form-input" readonly/>
        </el-form-item>
        <el-form-item prop="config_file" label="config_file">
          <el-upload
            :limit="1"
            :auto-upload="true"
            :before-upload="resetConfigFile"
            :multiple="false"
            :file-list="form.config_file"
            action="#">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button
              size="small"
              type="primary"
              @click="downloadTempalte('/fate/examples/dsl/v1/homo_logistic_regression',
                                       'test_homolr_train_job_conf.json')">
              下载模版
            </el-button>
          </el-upload>
        </el-form-item>
        <el-form-item prop="dsl_file" label="dsl_file">
          <el-upload
            :limit="1"
            :auto-upload="true"
            :before-upload="resetDslFile"
            :multiple="false"
            :file-list="form.dsl_file"
            action="#">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button
              size="small"
              type="primary"
              @click="downloadTempalte('/fate/examples/dsl/v1/homo_logistic_regression',
                                       'test_homolr_train_job_dsl.json')">
              下载模版
            </el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-link style="color:blue" @click="$router.push('/federalTrain/choseParams-normal')">普通</el-link>
        </el-form-item>

      </el-form>
      <el-row style="position: absolute;bottom: 35vh;width: 50vw" type="flex" justify="space-around">
        <el-button type="info" plain round @click="toLast">返回</el-button>
        <el-button :loading="submitLoading" type="primary" plain round @click="handleFinish">提交</el-button>
      </el-row>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { downloadTempalte, submitAssignmentByFile } from '../../../api/federalTrain'

export default {
  data() {
    return {
      form: {
        train_name: 'homo_logistic_regression',
        config_file: [],
        dsl_file: []
      },
      submitLoading: false,
      rules: {
        train_name: [{ required: true, message: '请输入任务名称' }]
      }
    }
  },
  computed: {
    ...mapState('federalTrain', ['guest', 'host'])
  },
  mounted() {
    this.$emit('stepActive', 2)
    if (this.guest === null || this.host === null) {
      this.$router.push('/federalTrain/chosePartner')
    }
  },
  methods: {
    downloadTempalte,
    toLast() {
      this.$router.push('/federalTrain/chosePartner')
    },
    resetConfigFile(file) {
      this.form.config_file = [file]
      return false
    },
    resetDslFile(file) {
      this.form.dsl_file = [file]
      return false
    },
    handleFinish() {
      console.log(this.form)
      if (this.form.config_file.length === 0 || this.form.dsl_file.length === 0) {
        this.$message({ message: '请选择config文件和dsl文件', type: 'warning' })
        return
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitLoading = true
          const { form } = this
          console.log(form)
          const formData = new FormData()
          formData.append('train_algorithm_name', form.train_name)
          formData.append('config_type', 1)
          formData.append('config_file', form.config_file[0])
          formData.append('dsl_file', form.dsl_file[0])

          submitAssignmentByFile(formData).then((res) => {
            console.log(res)
          }, (err) => {
            console.log(err)
          }).finally(() => {
            this.submitLoading = false
          })

          // this.$router.push('/running')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }

  }

}
</script>

<style scoped>
.form-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-input {
  width: 20vw;
}
</style>
