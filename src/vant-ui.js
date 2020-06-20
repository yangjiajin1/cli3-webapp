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
  Lazyload,
  GridItem,
  Grid,
  Uploader,
  Field,
  Cell,
  CellGroup,
  Button,
  Image,
  Icon,
  Popup,
  ImagePreview,
  NoticeBar,
  Toast
} from 'vant'

Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(NavBar)
Vue.use(Lazyload)
Vue.use(GridItem)
Vue.use(Grid)
Vue.use(Uploader)
Vue.use(Field)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Button)
Vue.use(Image)
Vue.use(Icon)
Vue.use(Popup)
Vue.use(NoticeBar)
Vue.use(ImagePreview)
Vue.use(Toast)
