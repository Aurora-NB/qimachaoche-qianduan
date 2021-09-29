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
        <el-form-item prop="assignmentName" label="任务名称:">
          <el-input v-model="form.assignmentName" class="form-input"/>
        </el-form-item>
        <el-form-item :rules="[{ required: true, message: '请输入任务类型'}]" prop="assignmentType" label="任务类型:">
          <el-radio-group v-model="form.assignmentType">
            <el-radio :label="0">单机</el-radio>
            <el-radio :label="1">多机</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="algorithmName" label="采用算法:">
          <el-input v-model="form.algorithmName" class="form-input" readonly/>
        </el-form-item>
        <el-form-item prop="algorithmParams" label="算法参数:">
          <el-input v-model="form.algorithmParams" class="form-input" type="textarea"/>
        </el-form-item>
        <el-form-item prop="isScale" label="isScale:">
          <el-radio-group v-model="form.isScale">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="percent" label="测试数据集百分比(%):">
          <el-input v-model.number="form.percent" class="form-input" max="1" min="0" type="number" step="0.1"/>
        </el-form-item>
        <el-form-item prop="postScript" label="备注信息:">
          <el-input v-model="form.postScript" class="form-input" type="textarea"/>
        </el-form-item>
        <el-form-item>
          <el-link style="color:blue" @click="$router.push('/federalTrain/choseParams-advance')">高级</el-link>
        </el-form-item>

      </el-form>
    </div>
    <el-row style="margin: 5vh 10vw;" type="flex" justify="space-around">
      <el-button type="info" plain round @click="toLast">返回</el-button>
      <el-button :loading="submitLoading" type="primary" plain round @click="handleFinish">提交</el-button>
    </el-row>
  </div>

</template>

<script>
import { mapState } from 'vuex'
import { submitAssignment } from '../../../api/federalTrain'

export default {
  data() {
    const algorithmValidator = (rules, value, callback) => {
      if (!value || value === '') {
        callback()
      }
      const jsonVal = '{' + value + '}'
      try {
        if (typeof JSON.parse(jsonVal) === 'object') {
          this.paramType = 0
          callback()
        }
      } catch (e) {
        try {
          if (typeof JSON.parse(value) === 'object') {
            this.paramType = 1
            callback()
          }
        } catch (e2) {
          console.log(2222)
          callback(new Error())
        }
      }
      callback(new Error())
    }
    return {
      form: {
        assignmentName: '',
        assignmentType: 0,
        algorithmName: 'hetero_lr',
        algorithmParams: '',
        isScale: true,
        percent: null,
        postScript: '',
        paramType: 0

      },
      submitLoading: false,
      rules: {
        assignmentName: [{ required: true, message: '请输入任务名称' }],
        assignmentType: [{ required: true, message: '请输入任务类型' }],
        algorithmParams: [{ validator: algorithmValidator, message: '算法参数格式不正确' }],
        percent: [{ required: true, message: '请输入测试数据百分比' }, { type: 'number', max: 1, min: 0, message: '必须在0和1之间' }]
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
    toLast() {
      this.$router.push('/federalTrain/chosePartner')
    },
    handleFinish() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitLoading = true

          let algorithmParams
          if (this.paramType === 0) {
            algorithmParams = this.form.algorithmParams
              ? JSON.parse('{' + this.form.algorithmParams + '}')
              : {}
          } else {
            algorithmParams = this.form.algorithmParams
              ? JSON.parse(this.form.algorithmParams)
              : {}
          }
          const { form } = this
          const data = {
            algorithm_parameters: algorithmParams,
            guest: this.guest,
            host: this.host,
            isScale: form.isScale,
            job_description: form.postScript,
            job_name: form.assignmentName,
            test_size: form.percent,
            train_algorithm_name: form.algorithmName,
            work_mode: form.assignmentType,
            config_type: 0
          }
          console.log(data)
          submitAssignment(data).then((res) => {
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
  width: 35vw;
}
</style>
