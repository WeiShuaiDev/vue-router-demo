<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
</script>
<template>
  <div class="about">
    <p class="title">详情</p>
    <button @click="router.back()">返回</button>
    <p class="item">名称：{{ route.query.name }}</p>
    <p class="item">年龄：{{ route.query.age }}</p>
    <p class="item">职业：{{ route.query.profession }}</p>
  </div>
</template>

<style>
.title {
  font-size: 18px;
  font-weight: bold;
  color: black;
  margin-bottom: 5px;
}
.item {
  padding: 2px;
  font-size: 14px;
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
   align-items: flex-start;
  }
}
</style>
