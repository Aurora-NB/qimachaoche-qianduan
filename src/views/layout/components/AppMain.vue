<template>
  <section class="app-main bg-dark">
    <div class="menu-container flex">
      <el-menu
        :collapse="showMenu"
        :router="true"
        default-active="/"
        class="el-menu-vertical-demo">
        <el-menu-item index="/">
          <i class="el-icon-orange"/>
          <span slot="title">联邦训练</span>
        </el-menu-item>
        <el-submenu index="/dataCenter">
          <template slot="title">
            <i class="el-icon-s-data"/>
            <span slot="title">数据中心</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/dataCenter/management">数据源管理</el-menu-item>
            <el-menu-item index="/dataCenter/preprocess">预处理数据集</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="/inference">
          <template slot="title">
            <i class="el-icon-aim"/>
            <span slot="title">在线推理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/inference/deploy">模型部署</el-menu-item>
            <el-menu-item index="/inference/single">单例预测</el-menu-item>
            <el-menu-item index="/inference/batch">批量预测</el-menu-item>
          </el-menu-item-group>

        </el-submenu>
        <el-menu-item index="/running">
          <i class="el-icon-cpu"/>
          <span slot="title">正在训练</span>
        </el-menu-item>
        <el-menu-item index="/history">
          <i class="el-icon-link"/>
          <span slot="title">训练记录</span>
        </el-menu-item>
      </el-menu>
    </div>

    <div class="content-container">
      <transition mode="out-in" name="fade-transform">
        <!-- or name="fade" -->
        <!-- <router-view :key="key"></router-view> -->
        <router-view/>

      </transition>
    </div>

  </section>
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

export default {
  name: 'AppMain',
  props: { showMenu: { type: Boolean, default: false }},
  computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
}
</script>

<style scoped>
.app-main {
  display: flex;
  /*flex-direction: column;*/
  align-items: center;
  height: calc(100vh - 48px);
  position: relative;
  overflow: auto;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 13vw;
  height: 100%;
  float: left;
}

.menu-container {
  height: 100%;
}

.content-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  flex-grow: 1;
  overflow-x: scroll;
}
</style>
