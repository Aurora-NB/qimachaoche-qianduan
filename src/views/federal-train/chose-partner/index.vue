<template>
  <div>
    <el-form ref="form" :inline="true" :model="form" style="width: 100%">
      <!-- 单行数据 -->
      <el-row v-for="(item, index) in form.items" :key="index" type="flex" justify="space-around">
        <el-form-item
          :prop="'items.'+index+'.role'"
          :rules="[{ required: true, message: '请输入角色类型'}]"
          label="角色类型:">
          <el-input v-model="item.role" readonly/>
        </el-form-item>
        <el-form-item
          :prop="'items.'+index+'.id'"
          :rules="[{ required: true, message: '请输入成员ID' }]"
          label="成员ID:">
          <el-input v-model="item.id"/>
        </el-form-item>
        <el-form-item
          :prop="'items.'+index+'.tableName'"
          :rules="[{ required: true, message: '请输入数据表名称' }]"
          label="数据表名称:">
          <el-input v-model="item.tableName"/>
        </el-form-item>
        <el-form-item
          :prop="'items.'+index+'.nameSpace'"
          :rules="[{ required: true, message: '请输入命名空间' }]"
          label="命名空间:">
          <el-input v-model="item.nameSpace"/>
        </el-form-item>
      </el-row>
      <el-row type="flex" justify="center">
        <el-button
          type="primary"
          style="width: 96%"
          @click="addPartner"
        >新增参与方
        </el-button
        >
      </el-row>

    </el-form>
    <el-row style="margin: 5vh 10vw;" type="flex" justify="space-around">
      <el-button type="info" plain round @click="resetForm">重置</el-button>
      <el-button type="primary" plain round @click="toNext">继续</el-button>
    </el-row>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      form: {
        items: [
          { role: '主导方', id: '', tableName: '', nameSpace: '' },
          { role: '参与方', id: '', tableName: '', nameSpace: '' }
        ]
      }
    }
  },
  mounted() {
    this.$emit('stepActive', 1)
  },
  methods: {
    addPartner() {
      this.form.items.push({
        role: '参与方',
        id: '',
        tableName: '',
        nameSpace: ''
      })
    },
    resetForm() {
      this.$refs.form.resetFields()
      this.form.items = this.form.items.slice(0, 2)
    },
    toNext() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const guest = {
            party_id: this.form.items[0].id,
            table_name: this.form.items[0].tableName,
            namespace: this.form.items[0].nameSpace
          }
          const host = this.form.items.slice(1).map(item => ({
            party_id: item.id,
            table_name: item.tableName,
            namespace: item.nameSpace
          }))

          this.UPDATE_PARTNER({ host, guest })
          this.$router.push('/federalTrain/choseParams-normal')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    ...mapMutations('federalTrain', ['UPDATE_PARTNER'])
  }
}
</script>

