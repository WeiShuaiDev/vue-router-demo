<script setup lang="ts">
import { reactive } from "vue";
import { useRouter, RouterView } from "vue-router";
const router = useRouter();
const data = reactive<Array<Person>>([
  {
    name: "张三",
    age: 18,
    profession: "老师",
  },
  {
    name: "李四",
    age: 8,
    profession: "学生",
  },
  {
    name: "王五",
    age: 28,
    profession: "家长",
  },
]);

type Person = {
  name: string;
  age: number;
  profession: string;
};

const toPage = (item: Person, index: number) => {
  // todo: 跳转到新的页面，展示详细数据
  //console.log("person[" + index + "]=" + JSON.stringify(item));
  if (index == 0) {
    router.push({ name: "content" });
  } else {
    router.push({ name: "about", query: item });
  }
  //router.push({
  //  name: "about",  
  //  params: item,
  //});
};
</script>
<template>
  <div class="home">
    <p class="title">名单</p>
    <div
      class="list"
      @click="toPage(item, index)"
      v-for="(item, index) in data"
      :key="index"
    >
      No.{{ index + 1 }} - 《{{ item.name }}》
    </div>
    <RouterView name="head" />
    <RouterView />
    <RouterView name="bottom" />
  </div>
</template>

<style>
.title {
  font-size: 18px;
  font-weight: bold;
  color: black;
}
.list {
  padding: 5px;
  width: 100%;
  background-color: aquamarine;
  margin-bottom: 5px;
  border-radius: 5px;
}
@media (min-width: 1024px) {
  .home {
    min-height: 100vh;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
