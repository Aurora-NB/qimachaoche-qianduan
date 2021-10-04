<template>
  <el-dialog
    :visible="show"
    :before-close="handleClose"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :destroy-on-close="true"
    top="5vh"
    width="80%"
  >
    <template slot="title">
      <h1 class="dialog-title">{{ type === 0 ? '数据源预处理' : '预处理数据查询' }}</h1>
    </template>
    <el-divider content-position="left"><span class="divider">基本信息</span></el-divider>
    <el-form ref="form" :model="form" :inline="true" :rules="type === 0 ? rules : {}" label-width="15vw">
      <el-row type="flex" justify="start" align="center">
        <el-form-item label="所属数据源:">
          <el-input v-model="form.origin_name" readonly/>
        </el-form-item>
        <el-form-item label="数据表名:" prop="table_name">
          <el-input v-model="form.table_name" :readonly="type !== 0"/>
        </el-form-item>
      </el-row>
      <el-row type="flex" justify="start" align="center">
        <el-form-item label="命名空间:" prop="namespace">
          <el-input v-model="form.namespace" :readonly="type !== 0"/>
        </el-form-item>
        <el-form-item label="备注:" prop="description">
          <el-input v-model="form.description" :readonly="type !== 0"/>
        </el-form-item>
      </el-row>
      <el-row type="flex" justify="start" align="center">
        <el-form-item label="任务类型:">
          <el-radio-group v-model="form.work_mode" :disabled="type !== 0">
            <el-radio :label="0">单机</el-radio>
            <el-radio :label="1">集群</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-row>
    </el-form>
    <el-divider content-position="left"><span class="divider">数据预处理字段规则定义</span></el-divider>
    <el-table :data="preprocessingField" stripe border>
      <el-table-column
        type="index"
        label=" "/>

      <el-table-column label="字段标签">
        <template slot-scope="scope">
          <span>{{ scope.row.label }}</span>
        </template>
      </el-table-column>
      <el-table-column label="字段描述">
        <template slot-scope="scope">
          <el-input :placeholder="type === 0 ?'请输入字段描述':''" v-model="scope.row.description" style="width: 100%"/>
        </template>
      </el-table-column>
      <el-table-column label="字段类型">
        <template slot-scope="scope">
          <el-select v-model="scope.row.type" :disabled="type !== 0">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="是否使用">
        <template slot-scope="scope">
          <el-select v-model="scope.row.is_use" :disabled="type !== 0">
            <el-option
              v-for="item in isUseOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="标签(分类)Map (哑变量处理)">
        <template slot-scope="scope">
          <span>{{ scope.row.content }}</span>
        </template>
      </el-table-column>
    </el-table>
    <template slot="footer">
      <el-button @click="handleClose">取消</el-button>
      <el-button v-if="type === 0" :loading="submitLoading" plain type="primary" @click="handleSubmit">上传</el-button>
    </template>

  </el-dialog>

</template>

<script>

import { getPreprocessingField, preprocess } from '../../../../api/datasouceCenter'

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    type: {
      type: Number,
      default: 0
    },
    basicInfo: {
      type: Object,
      default: null
    }

  },
  data() {
    return {
      submitLoading: false,
      form: {
        origin_name: '',
        table_name: '',
        namespace: '',
        description: '',
        work_mode: 0
      },
      typeOptions: [
        {
          value: 0,
          label: '唯一标识(ID)'
        },
        {
          value: 1,
          label: '数值型变量'
        },
        {
          value: 2,
          label: '分类型变量'
        }
      ],
      isUseOptions: [{
        value: true,
        label: '是'
      },
      {
        value: false,
        label: '否'
      }],
      rules: {
        table_name: [{ required: true, message: '请输入数据表名' }],
        namespace: [{ required: true, message: '请输入命名空间' }]
      },
      preprocessingField: []
    }
  },
  watch: {
    basicInfo(newValue) {
      console.log(newValue)
      console.log(this.type)
      if (newValue !== null) {
        if (this.type === 0) {
          this.form.origin_name = newValue.name
          getPreprocessingField(newValue.file).then(preprocessingField => {
            console.log(preprocessingField)
            this.preprocessingField = preprocessingField
          }).catch(err => {
            console.log(err)
          })
        } else {
          this.form.origin_name = newValue.history_table_name
          this.form.table_name = newValue.name
          this.form.namespace = newValue.namespace
          this.form.description = newValue.description
          this.form.work_mode = newValue.work_mode
          this.preprocessingField = newValue.custom_table
        }
      }
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
          const { form } = this

          const data = {
            description: form.description,
            file_path: this.basicInfo.file,
            history_table_name: form.origin_name,
            label_info: this.preprocessingField,
            namespace: form.namespace,
            table_name: form.table_name,
            work_mode: form.work_mode
          }

          preprocess(data).then((res) => {
            if (res.code === 0) {
              this.$message({ message: '上传成功', type: 'success' })
            } else {
              this.$message({ message: '上传失败', type: 'error' })
            }
          }, (err) => {
            console.log(err)
          }).finally(() => {
            this.$refs.form.resetFields()
            this.basicInfo = null
            this.preprocessingField = []
            this.submitLoading = false
            this.$emit('close')
            this.$emit('after-submit')
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

<style scoped>

.divider {
  color: rgb(93, 176, 215);
  font-size: large;
  font-weight: bolder;
}

</style>
