<template>
  <div class="nav-container flex">
    <div class="navbar flex flex-center">
      <div class="menu-icon flex flex-center">
        <svg
          :class="{'icon':true,'show-animation':showMenu,'un-show-animation':!showMenu}"
          t="1632974746733"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="5222"
          width="200"
          height="200"
          @click="handleShowMenu">
          <path
            d="M170.666667 213.333333h682.666666v85.333334H170.666667V213.333333z m0 512h682.666666v85.333334H170.666667v-85.333334z m0-256h682.666666v85.333334H170.666667v-85.333334z"
            fill="#dbdbdb"
            p-id="5223"/>
        </svg>

      </div>
      <div>
        <div class="home-btn c-fff" @click="go('/')">
          <b>FATE</b>Board
        </div>
      </div>
      <div class="router-btns flex flex-center">
        <!--        <span v-if="!!username" :class="{'active':path === '/running'}" @click="go('/running')">RUNNING</span>-->
        <!--        <span v-if="!!username" :class="{'active':path === '/history'}" @click="go('/history')">JOBS</span>-->
        <!--        <userinfo v-if="!!username" />-->
        <!--        <span v-if="!username" :class="{'active':path === '/login'}" @click="go('/login')">SIGNIN</span>-->
      </div>
    </div>

    <div class="help flex flex-center justify-center">
      <!--<span class="icon" @click="openModal"><i class="el-icon-s-tools"/></span>-->
      <span @click="openModal">
        <svg
          t="1633328987187"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2438"
          width="32"
          height="32"><path
            d="M1024 512c0-281.6-230.4-512-512-512S0 230.4 0 512s230.4 512 512 512 512-230.4 512-512z m-512 448c-249.6 0-448-198.4-448-448s198.4-448 448-448 448 198.4 448 448-198.4 448-448 448z"
            p-id="2439"
            fill="#ffffff"/><path
              d="M627.2 505.6c44.8-38.4 76.8-89.6 76.8-153.6 0-108.8-83.2-192-192-192s-192 83.2-192 192c0 64 32 115.2 76.8 153.6-102.4 44.8-172.8 147.2-172.8 262.4 0 19.2 12.8 32 32 32s32-12.8 32-32c0-121.6 102.4-224 224-224s224 102.4 224 224c0 19.2 12.8 32 32 32s32-12.8 32-32c0-115.2-70.4-217.6-172.8-262.4zM512 480c-70.4 0-128-57.6-128-128s57.6-128 128-128 128 57.6 128 128-57.6 128-128 128z"
              p-id="2440"
              fill="#ffffff"/></svg>
      </span>
    </div>
    <!-- <SSHConfig :show-config-modal="showConfigModal" @closeSSHConfigModal="showConfigModal = false" /> -->
  </div>
</template>

<script>
/**
 *
 *  Copyright 2019 The FATE Authors. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

import { mapGetters, mapState } from 'vuex'
// import SSHConfig from './SSHConfig'
// import { getAllSSHConfig, getSSHConfig, removeSSHConfig, addSSHConfig } from '@/api/ssh'
import Userinfo from './UserInfo'

export default {
  // components: {
  //   SSHConfig
  // },
  components: {
    Userinfo
  },
  data() {
    return {
      projectsData: null,
      isSimulate: true,
      path: this.$route.path,
      showConfigModal: false,
      showMenu: false
    }
  },
  computed: {
    ...mapState({
      username: state => state.user.username
    }),
    routes() {
      // console.log(this.$route.fullPath === '/old-job-dashboard')
      return this.$router.options.routes[0].children.filter(item => {
        return (
          item.path === '/data-center' ||
          item.path === '/experiment' ||
          item.path === '/job-history'
        )
      })
    },
    ...mapGetters(['isOpenReqSimulate']),
    pname() {
      return this.$route.query.pname || ''
    },
    pid() {
      return this.$route.query.pid || ''
    }
  },
  watch: {
    $route: 'getPath'
  },
  mounted() {
    this.isSimulate = this.isOpenReqSimulate
  },
  methods: {
    getPath() {
      this.path = this.$route.path
    },
    go(path) {
      this.$router.push(path)
      this.path = path
    },
    handleCommand(command) {
      // this.$router.replace({
      //   path: '/refresh',
      //   query: { pid: command.pid }
      // })
      this.$router.push({
        path: this.$route.path,
        query: { pid: command.pid, pname: command.pname }
      })
    },
    changeSimulate(flag) {
      this.$store.dispatch('SwitchReqSimulate', flag)
    },
    openModal() {
      this.showConfigModal = true
    },
    save() {
      this.$message('save successfully')
      this.showConfigModal = false
    },
    handleShowMenu() {
      this.showMenu = !this.showMenu
      this.$emit('show-menu', this.showMenu)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../styles/common/layout/navbar.scss';
</style>

