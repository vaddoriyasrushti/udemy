import signup from './../view/signup.vue';
import signin from './../view/signin.vue';
import home from './../view/home.vue';
import subcategories from './../view/subcategories.vue';
import categories from './../view/categories.vue';
const routes = [{
    path: "/",
    component: home,
    name: "home"
  },
  {
    path: "/signin",
    component: signin,
    name: "signin"
  },
  {
    path: "/signup",
    component: signup,
    name: "signup"
  },
  {
    path: "/categories",
    component: categories,
    name: "categories"
  },
  {
    path: "/subcategories",
    component: subcategories,
    name: "subcategories"
  }

]

// router.beforeEach((to, from, next) => {
//     // redirect to login page if not logged in and trying to access a restricted page
//     const publicPages = ['/signin', '/signup'];
//     const authRequired = !publicPages.includes(to.path);
//     const loggedIn = localStorage.getItem('user');

//     if (authRequired && !loggedIn) {
//       return next('/signin');
//     }

//     next();
//   })
export default routes;
