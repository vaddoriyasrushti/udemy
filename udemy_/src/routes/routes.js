import Development from "../view/development.vue";
import Business from "../view/business.vue";
import itsoftware from "../view/itsoftware.vue";
import music from "../view/music.vue";
import Home from "../view/home.vue";
import Officeproductivity from "../view/officeproductivity.vue";
import Personaldevelopment from "../view/personaldevelopment.vue";
import Photography from "../view/photography.vue";
import Lifestyle from "../view/lifestyle.vue";
import Healthandfitness from "../view/helthandfitness.vue";
import Design from "../view/design.vue";
import Marketing from "../view/marketing.vue";
import cart from "../view/cart.vue";
import details from "../view/details.vue";
import payment from "../view/payment.vue";
import search from "../view/search.vue";

const routes = [
  { path: "/", component: Home, name: "home"  },
  { path: "/Development/:subcat", component: Development, name: "Development"},
  { path: "/Business/:subcat", component: Business, name: "Business"},
  { path: "/It & Software/:subcat", component: itsoftware, name: "It & Software"},
  { path: "/Music/:subcat", component: music, name: "Music"},
  { path: "/Office Productivity/:subcat", component: Officeproductivity, name: "Office Productivity"},
  { path: "/Personal Development/:subcat", component: Personaldevelopment, name: "Personal development"},
  { path: "/Design/:subcat", component: Design, name: "Design"},
  { path: "/Marketing/:subcat", component: Marketing, name: "Marketing"},
  { path: "/Health and fitness/:subcat", component: Healthandfitness, name: "Health and fitness"},
  { path: "/Photography/:subcat", component: Photography, name: "Photography"},
  { path: "/Lifestyle/:subcat", component: Lifestyle, name: "Lifestyle"},
  { path: "/cart", component: cart, name: "cart"  },
  { path:"/:course",component:details, name:"detail"},
  { path:"/payment",component:payment, name:"payment"},
  { path:"/search/:searchtitle",component:search, name:"search"}
];

export default routes;
