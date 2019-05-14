import Vue from 'vue'

// By default we import all the components.
// Only reserve the components on demand and remove the rest.
// Style is always required.
import {
  Tabbar,
  TabbarItem,
  Swipe,
  SwipeItem,
  NavBar,
  Lazyload
} from 'vant'

Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(NavBar)
Vue.use(Lazyload)
