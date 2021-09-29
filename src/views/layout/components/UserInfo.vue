<template>
  <section class="userinfo_container" @mouseout="detailOff" @mouseover="detailOn">
    <span class="title">{{ username }}</span>
    <div v-show="showing" class="dialog">
      <el-row>
        <el-col :span="24">
          <span class="name">{{ username }}</span>
        </el-col>
      </el-row>
      <el-row class="content-row">
        <el-col :span="8">
          <span class="subtitle">roles</span>
        </el-col>
        <el-col :span="16">
          <span class="content">{{ roles ? roles.join(',') : 'no roles' }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-button class="btn" size="mini" type="primary" @click="logout">Exit</el-button>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'UserInfo',

  props: {},

  data() {
    return {
      showing: false
    }
  },

  computed: {
    ...mapState({
      token: state => state.user.token,
      username: state => state.user.username,
      avatar: state => state.user.avatar,
      roles: state => state.user.roles
    })
  },
  methods: {
    ...mapActions({
      LogOut: 'LogOut'
    }),
    logout() {
      this.LogOut().then(res => {
        this.$router.push({
          name: 'login'
        })
      })
    },
    detailOn() {
      this.showing = true
    },
    detailOff() {
      this.showing = false
    }
  }
}
</script>

<style lang="scss" scoped>
.userinfo_container {
  position: relative;

  .dialog {
    position: absolute;
    top: 105%;
    right: 0;
    min-width: 200px;
    background-color: #ffffff;
    box-shadow: 0px 4px 12px rgba(83, 76, 119, 0.16);
    border-radius: 2px;
    padding: 24px;
  }

  .title {
    margin: 0 8px;
    padding: 0 15px;
    $h: 28px;
    color: #ffffff;
    height: $h;
    line-height: $h;
    border-radius: $h;
    cursor: pointer;
  }

  .name {
    color: #4159d1;
    font-size: 16px;
    line-height: 19px;
    font-weight: bold;
  }

  .subtitle {
    color: #999ba3;
  }

  .content {
    color: #3e4052;
  }

  .btn {
    width: 100%;
  }

  .content-row {
    height: 24px;
    line-height: 24px;
  }
}
</style>
