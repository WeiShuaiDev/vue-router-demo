# Vue3 Router路由基础使用

## 一、介绍

`vue` 是用来构建单页面应用的前端框架，对于大多数此类型应用来讲，都推荐使用官方支持的 `vue Router`，在单页面应用，客户端的 JavaScript 可以连接页面跳转请求，动态获取数据，然后无需重新加载页面的情况下，更新当前页面数据，这样可以带来更加丝滑的用户体验，因为这类场景下的用户通常会在很长的一段时间中做出多次交互，路由是更新在客户端执行的。

`vue Router` 是 vue 官方路由，他与 vue 核心深度集成，让 `vue` 构建单页面应用变得更加轻而易举。

- 嵌套路由映射
- 动态路由选择 模块化、基于组件的路由配置
- 路由参数、查询、通配符
- 展示由 Vue.js 的过渡系统提供的过渡效果
- 细致的导航控制
- 自动激活 CSS 类的链接
- HTML5 history 模式或 hash 模式
- 可定制的滚动行为
- URL 的正确编码

## 二、Router基础使用

创建一个`vue3.5.12`+`vite5.4.10`+`router4.4.5`项目，使用命令直接创建最新版本vue项目，根据需求引入一些模块，在条件选择里直接使用键盘空格选中切换，并通过回车键确定。

注意：使用 vue3 对应的router4版本;使用 vue2 对应的router3版本

```bash
pnpm create vue@latest
```

![17313109048527](https://github.com/WeiShuaiDev/vue-router-demo/blob/main/screenshots/17313109048527.png?raw=true)

完整项目结构

![1731317298165](https://github.com/WeiShuaiDev/vue-router-demo/blob/main/screenshots/1731317298165.png?raw=true)

### 1、router安装

如果在创建项目过程中，没有自动引入 vue Router，可以手动引入， 只需要一个简单的命令即可实现安装：

```bash
pnpm install vue-router
```

执行完成之后，只需要静待安装完成即可。

安装完成之后，我们可以看到已经装了 4 版本的 router，如果是 vue2 的项目，则需要安装 3 版本的。

```typescript
"dependencies": {
    "vue": "^3.5.12",
    "vue-router": "^4.4.5"
  }
```

因为这两个版本他们是不互相兼容的，代码是不一样的，切记。

### 2、router 初始化

首先我们在 `src` 文件夹下创建一个 `router` 文件夹，在内部创建一个 `index.ts` 文件。

首先我们需要在这个 `index.ts` 文件中引入 router：

```typescript
import { createRouter } from "vue-router";
```

然后我们初始化一下路由：

```typescript
import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: HomeView,
    },
    {
      path: "/about",
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router
```

然后，我们需要在 main.ts 文件中注册一下子：

```typescript
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
```

这样的话，我们就把路由集成进项目了。

### 3、router-view

其实到这一步，我们已经将路由添加到项目里面去了，但是没有效果，是因为我们还没有写一个容器来引入我们的路由。

接下来我们写一个容器，在 App.vue 项目里面：

```vue
<script setup lang="ts">
import {RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style scoped>
</style>
```

像 vue2 项目一样，使用 `<router-view></router-view>` 插入路由。

这样的话我们刷新页面，可以看到我们能够根据路由变化切换组件更新显示内容：

![17313186462474](https://github.com/WeiShuaiDev/vue-router-demo/blob/main/screenshots/17313186462474.png?raw=true)

注意： `<router-view></router-view>` 可以放置任何位置，这个根据实际业务的排版来就可以。

### 4、router-link

接下来说一下 `router-link` ，这个是和 vue2 完全一样的，我们在 App.vue 文件编写 `router-link`。

```vue
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>
```

这样的话，我们点击 `router-link` 的时候，可以快速实现组件切换，注意 `router-link` 必须有一个 `to` 属性，`to` 属性的值必须与初始化的 `router` 里面的 `path` 对应，意味着去哪个页面。

![17313190606892](https://github.com/WeiShuaiDev/vue-router-demo/blob/main/screenshots/17313190606892.png?raw=true)

我们点击之后看到，下面的组件切换了，同时地址栏的地址也修改掉了。这就是路由最简单的使用方式。

### 5、路由模式

接下来说一下路由模式：

| vue2    | vue3                 |
| :------ | :------------------- |
| history | createWebHistory     |
| hash    | createWebHashHistory |
| abstact | createMemoryHistory  |

上面是 vue2 和 vue3 路由类型的对比，其中 vue2 配置类型使用的属性是 `mode`， vue3 里面更新为 `history`。

#### createWebHashHistory

上面的案例我们使用了 `createWebHistory` 模式：

![17313197172381](https://github.com/WeiShuaiDev/vue-router-demo/blob/main/screenshots/17313197172381.png?raw=true)

看到访问的路由就是正常类似于多页面的地址。

但是如果使用了 `createWebHashHistory` 模式之后：

```typescript
const router = createRouter({
  history: createWebHashHistory(),
  routes // short for `routes: routes`
})
```

我们看一下：

![17313202081583](https://github.com/WeiShuaiDev/vue-router-demo/blob/main/screenshots/17313202081583.png?raw=true)

地址中间使用了 `#` 连接。

他是通过 `location.hash` 去匹配路由的，比如我们让他跳转到首页：

```bash
location.hash
```

![17313206639466](https://github.com/WeiShuaiDev/vue-router-demo/blob/main/screenshots/17313206639466.png?raw=true)

就是这个样子。监听浏览器左右箭头，是使用一个回调函数实现的：

```bash
window.addEventListener("hashchange", (e) =>{ console.log(e) })
```

我们切换浏览器左右箭头就会触发打印：

![17313754538954](https://github.com/WeiShuaiDev/vue-router-demo/blob/main/screenshots/17313754538954.png?raw=true)

#### createWebHistory

使用 `createWebHistory` 在地址栏是没有 `#` 号的。

它是基于 `H5` 的 `history` 实现的：

```bash
history
```

![17313758949901](https://github.com/WeiShuaiDev/vue-router-demo/blob/main/screenshots/17313758949901.png?raw=true)

它监听浏览器左右箭头是通过 `popstate` 实现的：

```bash
window.addEventListener("popstate", (e) =>{ console.log(e) })
```

这时候，我们切换浏览器前后箭头，就可以打印出数据：

![17313761826098](https://github.com/WeiShuaiDev/vue-router-demo/blob/main/screenshots/17313761826098.png?raw=true)

好的，就是这个样子。跳转的话是使用 `pushState` 实现跳转的：

```bash
history.pushState({"state":1},"","/")
```

使用这个切换了之后，你会发现页面地址栏地址已经变了，但是页面并没有修改，这是因为，你这种方式切换并不会监听到，还是需要手动刷新页面。

### 6、编程式导航

#### path 跳转

```vue
<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>
```

上面的案例，我们是使用 `router-link` 标签通过 `path` 方式实现的路由跳转，除了使用 `path` 实现路由跳转之外，我们还可以使用 `name` 的方式进行路由的跳转。

#### name 跳转

比如我们给 routes 列表的路由配置添加一个名字：

```typescript
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
  ],
});
```

注意哈，这个 `name` 不要起重复了嗷！

然后我们修改一下 `router-link` 标签，由 `path` 跳转改为 `name` 跳转：

```vue
<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink :to="{ name: 'about' }">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
```

我把 关于我们 改成通过 name 跳转了，可以对比一下子，效果一样一样滴！

![17313190606892](https://github.com/WeiShuaiDev/vue-router-demo/blob/main/screenshots/17313190606892.png?raw=true)

#### a 标签跳转

我们还可以使用另一种方式，就是直接是 `a` 标签：

```html
<a href="/">Home</a>
<a href="/about">About</a>
```

但是这个和 path 跳转还是有区别的：

注意浏览器刷新按钮，我们切换页面的时候，按钮编程叉号一段时间，所以可以说明，使用这个方式实现页面跳转的话，会看到页面整体闪烁了一下子，他是整个页面给你刷新，而不是其中一部分刷新。因此不建议使用这种方式，只是知道就可以了。

#### 编程式跳转

编程式跳转就是不通过便签实现路由的跳转，而是使用 js 代码的方式实现，用于我们点击按钮，手动进行跳转，或者是点击按钮，进行一些逻辑处理后在进行跳转。

那么我们可以在之前写 a 标签的地方改成两个按钮：

```html
<button>Home</button>
<button>About</button>
```

然后呢，我们给按钮添加个点击事件：

```html
<button @click="toPage('/')">Home</button>
<button @click="toPage('/about')">About</button>
```

然后我们写一下这个 `toPage` 事件：

```typescript
<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

function toPage(url: string) {
  router.push(url);
}
</script>
```

这样的话，我们就是先了一个简单的编程式路由跳转：

![17313826053760](https://github.com/WeiShuaiDev/vue-router-demo/blob/main/screenshots/17313826053760.png?raw=true)

跟`router-link`效果是一样的。

`router.push(url)` 不仅仅可以传路由，他还可以传递一个对象，比如说用来跳转传参：

```typescript
router.push({ path: url });  // path 跳转
```

也可以是用 name 进行跳转：

```typescript
router.push({ name: 'about' });   // name 跳转
```

效果一样就不截图了。

#### 历史纪录

我们点击按钮跳转完之后，我们可以通过浏览器的前进、后退按钮实现对应的操作。

因为通过 vue 路由的操作，会把历史纪录给存储起来。

但是，有时候需求，不想把历史纪录给存储起来，就比如说，我登录完成之后，我不想点击浏览器后退按钮在进入登录页面，这是后怎么办呢？

1. ##### router-link 标签

   首先我们看 `router-link` 标签：

   ```vue
   <RouterLink replace to="/">Home</RouterLink>
   ```

   如果是 `router-link` 标签的话，我们可以直接使用一个 `replace` 设置这个路由不被保存到历史记录。

2. 编程式开发

   如果是使用编程式开发的话也很简单，就是把 `push` 改为 `replace` 即可：

   ```typescript
   router.replace(url)   // path 跳转
   ```

   效果是一样的，也是没有历史纪录，效果一样就不截图了。 

#### 历史纪录逻辑操作

关于历史纪录的逻辑处理也很简单。

```vue
<RouterLink to="/">Home</RouterLink>
<RouterLink :to="{ name: 'about' }">About</RouterLink>

<button @click="prev()">向前</button>
<button @click="next()">向后</button>
```

我们不用浏览器，点击自己的自定义按钮实现向前、向后切换功能：

```typescript
function prev() {
  // router.go(-1)  // 参数是后退几个历史，比如1个，2个。
  router.back()  // 后退
}

function next() {
  router.go(1)  // 参数是前进几个历史，比如1个，2个。
}
```

看一下效果：

![1731391719219](https://github.com/WeiShuaiDev/vue-router-demo/blob/main/screenshots/1731391719219.png?raw=true)

### 7、路由传参

路由传参是项目里面肯定会用的功能，所以说这个得好好整一下，下面这一节，主要说一下关于路由传参的部分。

#### 案例准备

先准备一个案例，我随便写的，咱就不要细说了关于这个案例

home.vue

```vue
<script setup lang="ts">
import { reactive } from "vue";

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
  console.log("person[" + index + "]=" + JSON.stringify(item));
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
  background-color: aquamarine;
  margin-bottom: 5px;
  border-radius: 5px;
}
@media (min-width: 1024px) {
  .home {
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
}
</style>
```

运行效果，点击`item`后直接打印数据

![17313949139911](https://github.com/WeiShuaiDev/vue-router-demo/blob/main/screenshots/17313949139911.png?raw=true)

我们点击电影名称，跳转到 about 页面，展示详细信息，这时候，我们在点击事件里面需要实现两个功能，第一个是跳转，第二个是传参：

首先我们需要引入 router ：

```typescript
import { useRouter } from "vue-router";
```

因为引入进来的是 hook，我们需要调用一下：

```typescript
const router = useRouter();
```

好的，我们实现页面跳转：

```typescript
const toPage = (item: Person, index: number) => {
  // todo: 跳转到新的页面，展示详细数据
  console.log("person[" + index + "]=" + JSON.stringify(item));
  router.push({ path: "/about" });
};
```

好的，这样就实现了页面的跳转：

#### query 传参

然后，是传递参数，和 vue2 其实是一样一样的：

```typescript
const toPage = (item: Person, index: number) => {
  router.push({ path: "/about", query: item });
};
```

注意，`query` 只能设置对象。上面我们是使用的 `query` 进行参数传递，

![17313961873853](https://github.com/WeiShuaiDev/vue-router-demo/blob/main/screenshots/17313961873853.png?raw=true)

![17313961395135](https://github.com/WeiShuaiDev/vue-router-demo/blob/main/screenshots/17313961395135.png?raw=true)

可以看到跳转，点击的时候，就会在地址栏显示我们传递的参数。

然后我们就可以在about页面去取一下数据：

about.vue

```vue
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
    align-items: center;
  }
}
</style>
```

然后，我们看一下效果：

![17313961873853](https://github.com/WeiShuaiDev/vue-router-demo/blob/main/screenshots/17313961873853.png?raw=true)

![17313975159217](https://github.com/WeiShuaiDev/vue-router-demo/blob/main/screenshots/17313975159217.png?raw=true)

效果实现了，可以传参并且展示出数据。

#### params 传参

注意 `params` 不能使用 `path` 进行参数传递，只能使用 `name` 进行传参。

所以修改上面页面跳转的代码： 

```typescript
const toPage = (item: Person, index: number) => {
  //router.push({ path: "/about", query: item });
  router.push({
    name: "about",
    params: item,
  });
};
```

上面代码就已经修改成 `params` 的方式进行参数传递了。`params`传参有一个特点，就是他传递的参数不会显示在地址栏：

![17313961873853](https://github.com/WeiShuaiDev/vue-router-demo/blob/main/screenshots/17313961873853.png?raw=true)

![17313993268706](https://github.com/WeiShuaiDev/vue-router-demo/blob/main/screenshots/17313993268706.png?raw=true)

看，点击之后，通过 `params` 传递参数的时候，地址栏已经不会显示传递的参数了。

然后我们需要修改一下接收参数的地方，同样也是改为 `params` 接收参数：

```vue
<p class="item">名称：{{ route.params.name }}</p>
<p class="item">年龄：{{ route.params.age }}</p>
<p class="item">职业：{{ route.params.profession }}</p>
```

这样就可以实现数据显示了。

**但是，注意一个问题：**

就是从 `4.1.4` 版本之后，修改了`route.params.name` 之后也显示不出来，会报一个警告

```
[Vue Router warn]: Discarded invalid param(s) "name", "age", "profession" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.
```

因为新版本把这个功能给砍掉了，

### 8、嵌套路由

```vue
<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink :to="{ name: 'about' }">About</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>
```

这里的 `<router-view>` 是一个顶层的 `router-view`。它渲染顶层路由匹配的组件。同样地，一个被渲染的组件也可以包含自己嵌套的 `<router-view>`。例如，如果我们在 `Home` 组件的模板内添加一个 `<router-view>`：

```vue
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
    <RouterView />
  </div>
</template>
```

要将组件渲染到这个嵌套的 `router-view` 中，我们需要在路由中配置 `children`：

```typescript
import { createWebHistory, createRouter } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
      children: [
        {
          path: "",
          name: "index",
          component: () => import("../components/HelloWorld.vue"),
        },
        {
          path: "/about",
          name: "about",
          component: () => import("../views/AboutView.vue"),
        },
      ],
    },
  ],
});

export default router;
```

**注意，以 `/` 开头的嵌套路径将被视为根路径。这允许你利用组件嵌套，而不必使用嵌套的 URL。**

如你所见，`children` 配置只是另一个路由数组，就像 `routes` 本身一样。因此，你可以根据自己的需要，不断地嵌套视图。

此时，按照上面的配置，当你访问一个不存在路径 时，在 `Home` 的 `router-view` 里面什么都不会呈现，因为没有匹配到嵌套路由。也许你确实想在那里渲染一些东西。在这种情况下，你可以提供一个空的嵌套路径。

![17314701507296](https://github.com/WeiShuaiDev/vue-router-demo/blob/main/screenshots/17314701507296.png?raw=true)

![17314702239601](https://github.com/WeiShuaiDev/vue-router-demo/blob/main/screenshots/17314702239601.png?raw=true)

注意，这里也可以通过嵌套的命名路由进行导航，在一些场景中，你可能希望导航到命名路由而不导航到嵌套路由。例如，你想导航 `/` 而不显示嵌套路由。那样的话，你还可以**命名父路由**，但请注意**重新加载页面将始终显示嵌套的子路由**，因为它被视为指向路径`/about` 的导航，而不是命名路由

### 9、命名视图

有时候想同时 (同级) 展示多个视图，而不是嵌套展示，例如创建一个布局，有 `head (头部)` 和 `bottom (底部)` 两个视图，这个时候命名视图就派上用场了。

你可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果 `router-view` 没有设置名字，那么默认为 `default`。

```vue
<template>
  <div class="home">
    <RouterView name="head" />
    <RouterView />
    <RouterView name="bottom" />
  </div>
</template>
```

一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。确保正确使用 `components` 配置 (带上 `s`)：

```typescript
import { createWebHistory, createRouter } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
      children: [
        {
          path: "",
          name: "index",
          component: () => import("../components/HelloWorld.vue"),
        },
        {
          //子路由前不需要加斜杠
          path: "content",
          name: "content",
          components: {
            head: () => import("../components/Head.vue"),
            default: () => import("../components/HelloWorld.vue"),
            bottom: () => import("../components/Bottom.vue"),
          },
        },
      ],
    },
  ],
});

export default router;
```

![173147716472](https://github.com/WeiShuaiDev/vue-router-demo/blob/main/screenshots/173147716472.png?raw=true)

![17314772814890](https://github.com/WeiShuaiDev/vue-router-demo/blob/main/screenshots/17314772814890.png?raw=true)

### 10、路由重定向 redirect

重定向比较简单一笔带过：

```typescript
import { createWebHistory, createRouter } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "/about",
      component: () => import("../views/HomeView.vue"),
      children: [
        {
          path: "",
          name: "index",
          component: () => import("../components/HelloWorld.vue"),
        },
        {
          //子路由前不需要加斜杠
          path: "content",
          name: "content",
          components: {
            head: () => import("../components/Head.vue"),
            default: () => import("../components/HelloWorld.vue"),
            bottom: () => import("../components/Bottom.vue"),
          },
        },
      ],
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;

```

主要是使用的 `redirect: "/about",` 这一段代码实现重定向功能。

除了直接设置，还可以使用对象的方式实现重定向：

```typescript
redirect: {
  path: "/about"
},
```

可以设置 path ，当然设置 name 也是一样的：

```typescript
redirect: {
  name: "about"
},
```

除了上面两种方式，还可以设置一个回调：

```typescript
redirect: to => {
  console.log(to)
  return "/about"
},
```

回调的话，我们可以接受一个参数 to，我们打印了 to 的信息，同时他需要返回一个路径,打印出了他父路由的信息，除了返回一个路径之外，同样也是可以返回一个对象实现传参：

```typescript
redirect: to => {
  console.log(to)
   return {
     path: '/about',
     query: {
        name: "张三"
     }
   }
}
```

也是没有任何问题的，效果都一样。

### 11、路由别名 alias

alias 就是给我们的路由起多个名字，别名可以随便起，甚至可以取多个。

```typescript
import { createWebHistory, createRouter } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "/about",
      alias: ["/home1", "/home2", "/home3"],
      component: () => import("../views/HomeView.vue"),
      children: [
        {
          path: "",
          name: "index",
          component: () => import("../components/HelloWorld.vue"),
        },
        {
          //子路由前不需要加斜杠
          path: "content",
          name: "content",
          components: {
            head: () => import("../components/Head.vue"),
            default: () => import("../components/HelloWorld.vue"),
            bottom: () => import("../components/Bottom.vue"),
          },
        },
      ],
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
```

我们给这个路由设置了多个别名，我们访问哪一个别名之后呢，都可以访问到这个路由：

![17314822449363](https://github.com/WeiShuaiDev/vue-router-demo/blob/main/screenshots/17314822449363.png?raw=true)

### 12、滚动行为

在页面来回切换的时候，滚动到上次的位置，如果没有滚动条，直接置顶。可以返回一个 Promise 来延迟滚动。

`savedPosition`记录之前页面位置，默认返回，或者固定位置。

```typescript
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
}); 
```

### 13、导航守卫

#### 全局前置守卫

使用 `router.beforeEach` 注册一个全局前置守卫：

```typescript
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      //   redirect: "/about",
      //   alias: ["/home1", "/home2", "/home3"],
      component: () => import("../views/HomeView.vue"),
      //   children: [
      //     {
      //       path: "",
      //       name: "index",
      //       component: () => import("../components/HelloWorld.vue"),
      //     },
      //     {
      //       //子路由前不需要加斜杠
      //       path: "content",
      //       name: "content",
      //       components: {
      //         head: () => import("../components/Head.vue"),
      //         default: () => import("../components/HelloWorld.vue"),
      //         bottom: () => import("../components/Bottom.vue"),
      //       },
      //     },
      //   ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

router.beforeEach((to, from) => {
  // ...
  // 返回 false 以取消导航
  return false
})
```

当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于**等待中**。

每个守卫方法接收两个参数：

- **`to`**: 即将要进入的目标 (到哪儿去)
- **`from`**: 当前导航正要离开的路由 （从哪儿来）

可以返回的值如下:

- `false`: 取消当前的导航。如果浏览器的 URL 改变了(可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 `from` 路由对应的地址。
- 一个路由地址: 通过一个路由地址跳转到一个不同的地址，就像你调用 `router.push()` 一样，你可以设置诸如 `replace: true` 或 `name: 'home'` 之类的配置。当前的导航被中断，然后进行一个新的导航，就和 `from` 一样。

```typescript
router.beforeEach(async (to, from) => {
   if (
     // 检查用户是否已登录
     !isAuthenticated &&
     //  避免无限重定向
     to.name !== 'login'
   ) {
     // 将用户重定向到登录页面
     return { name: 'login' }
   }
 })
```

如果遇到了意料之外的情况，可能会抛出一个 `Error`。这会取消导航并且调用 [`router.onError()`](https://router.vuejs.org/zh/api/#onerror) 注册过的回调。

如果什么都没有，`undefined` 或返回 `true`，**则导航是有效的**，并调用下一个导航守卫

> Tips:在之前的 vue Router 版本中，也是可以使用 *第三个参数* `next` 的。这是一个常见的错误来源，可以通过 [RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0037-router-return-guards.md#motivation) 来消除错误。然而，它仍然是被支持的，这意味着你可以向任何导航守卫传递第三个参数。在这种情况下，**确保 `next`** 在任何给定的导航守卫中都被**严格调用一次**。它可以出现多于一次，但是只能在所有的逻辑路径都不重叠的情况下，否则钩子永远都不会被解析或报错。

```typescript
//白名单
const whiteList = ["/login"];

router.beforeEach((to,from,next)=>{
    if (whiteList.includes(to.path)) {
        next()
    } else {
        next("/login"); // 否则全部重定向到登录页
    }
})
```

![17315635301939](https://github.com/WeiShuaiDev/vue-router-demo/blob/main/screenshots/17315635301939.png?raw=true)

#### 全局解析守卫

你可以用 `router.beforeResolve` 注册一个全局守卫。这和 `router.beforeEach` 类似，因为它在**每次导航**时都会触发，不同的是，解析守卫刚好会在导航被确认之前、**所有组件内守卫和异步路由组件被解析之后**调用。这里有一个例子，确保用户可以访问[自定义 meta](https://router.vuejs.org/zh/guide/advanced/meta.html) 属性 `requiresCamera` 的路由：

`router.beforeResolve` 是获取数据或执行任何其他操作（如果用户无法进入页面时你希望避免执行的操作）的理想位置。

```typescript
router.beforeResolve(async to => {
  if (to.meta.requiresCamera) {
    try {
      await askForCameraPermission()
    } catch (error) {
      if (error instanceof NotAllowedError) {
        // ... 处理错误，然后取消导航
        return false
      } else {
        // 意料之外的错误，取消导航并把错误传给全局处理器
        throw error
      }
    }
  }
})
```

#### 全局后置钩子

你也可以注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 `next` 函数也不会改变导航本身：

它们对于分析、更改页面标题、声明页面等辅助功能以及许多其他事情都很有用。

它们也反映了 [navigation failures](https://router.vuejs.org/zh/guide/advanced/navigation-failures.html) 作为第三个参数：

```typescript
router.afterEach((to, from) => {
  sendToAnalytics(to.fullPath)
})

//也可以用 navigation failures 作为第三个参数：
router.afterEach((to, from, failure) => {
  if (!failure) sendToAnalytics(to.fullPath)
})
```

### 14、路由元信息

通过路由记录的 `meta` 属性可以定义路由的**元信息**。使用路由元信息可以在路由中附加自定义的数据，例如：

- 权限校验标识。
- 路由组件的过渡名称。
- 路由组件持久化缓存 (keep-alive) 的相关配置。
- 标题名称

我们可以在**导航守卫**或者是**路由对象**中访问路由的元信息数据。

```typescript
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import("../views/HomeView.vue"),
      meta: {
        title: "首页"
      }
    }
  ]
})
```

### 15、动态路由

我们一般使用动态路由都是后台会返回一个路由表，前端通过调接口拿到后处理(后端处理路由)

动态路由主要通过两个函数实现。`router.addRoute()` 和 `router.removeRoute()`。它们只注册一个新的路由，也就是说，如果新增加的路由与当前位置相匹配，就需要你用 `router.push()` 或 `router.replace()` 来手动导航，才能显示该新路由

```typescript
router.addRoute({
  path: "/login",
  name: "login",
  component: () => import("../views/LoginView.vue"),
})
```

如果你决定在导航守卫内部添加或删除路由，你不应该调用 `router.replace()`，而是通过返回新的位置来触发重定向：

```typescript
router.beforeEach(to => {
  if (!hasNecessaryRoute(to)) {
    router.addRoute(generateRoute(to))
    // 触发重定向
    return to.fullPath
  }
})
```

上面的例子有两个假设：第一，新添加的路由记录将与 `to` 位置相匹配，实际上导致与我们试图访问的位置不同。第二，`hasNecessaryRoute()` 在添加新的路由后返回 `false`，以避免无限重定向。

因为是在重定向中，所以我们是在替换将要跳转的导航，实际上行为就像之前的例子一样。而在实际场景中，添加路由的行为更有可能发生在导航守卫之外，例如，当一个视图组件挂载时，它会注册新的路由。

## 三、Router在项目中使用
