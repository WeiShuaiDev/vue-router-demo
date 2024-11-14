import { createWebHashHistory, createRouter } from "vue-router";
const router = createRouter({
  history: createWebHashHistory(),
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
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});
const whiteList = ["/login"];
router.beforeEach((to, from, next) => {
  console.log("beforeEach to" + to.path);
  // to 要前往的页面；from 从哪个页面来；next() 设置到哪个页面
  // if (whiteList.includes(to.path)) {
  // next();
  // } else {
  // next("/login"); // 否则全部重定向到登录页
  // }
  // if (to.name !== "login") {
  // return { name: "login" };
  // }
  next();
  // return false;
});

router.beforeResolve(async (to) => {
  console.log("beforeResolve to" + JSON.stringify(to));
});

router.afterEach((to, from, failure) => {
  console.log(
    "afterEach to" + JSON.stringify(to) + "from" + JSON.stringify(from)
  );
});

export default router;
