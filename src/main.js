import Vue from 'vue'
import App from './App'
import router from './router'
// Element-UI
import { Transfer, Button, Form, FormItem, Input, Checkbox, Message, MessageBox, Row, Col, Header, Dropdown, DropdownMenu, DropdownItem, Menu, MenuItem, Submenu, Main, Card, Tabs, TabPane, Select, Option, DatePicker, TimePicker, Switch, CheckboxGroup, Radio, RadioGroup, Upload, Table, TableColumn, Dialog, Pagination, Popover, Tag, Badge, ColorPicker } from 'element-ui'

import VueScroll from 'vuescroll'
import Mock from './mock'
import 'vuescroll/dist/vuescroll.css'
import './assets/css/common.less'

// icon-font
import SvgIcon from '@/components/icon/svg-icon.vue'

// 国际化
import VueI18n from 'vue-i18n'
import myEnLocale from './assets/lang/en'
import myZhLocale from './assets/lang/zh-cn'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import ElementLocale from 'element-ui/lib/locale'

// mockjs
Mock.mockData()
// vue-i18n
Vue.use(VueI18n)
const messages = {
  'en': Object.assign(myEnLocale, enLocale),
  'zh-cn': Object.assign(myZhLocale, zhLocale)
}
// 加载用户语言设置
const lang = localStorage.getItem('user-language') || 'zh-cn'
const i18n = new VueI18n({
  locale: lang,
  messages
})
ElementLocale.i18n((key, value) => i18n.t(key, value))

Vue.config.productionTip = false

Vue.use(VueScroll, { ops: { bar: { background: '#C0C4CC' } } })

const components = [Transfer, Button, Form, FormItem, Input, Checkbox, Message, MessageBox, Row, Col, Header, Dropdown, DropdownMenu, DropdownItem, Menu, MenuItem, Submenu, Main, Card, Tabs, TabPane, Select, Option, DatePicker, TimePicker, Switch, CheckboxGroup, Radio, RadioGroup, Upload, Table, TableColumn, Dialog, Pagination, Popover, Tag, Badge, ColorPicker]

components.forEach(item => {
  Vue.component(item.name, item)
})

const MsgBox = MessageBox
Vue.prototype.$alert = MsgBox.alert

Vue.prototype.$message = Message

Vue.component('SvgIcon', SvgIcon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  render: h => h(App)
})
