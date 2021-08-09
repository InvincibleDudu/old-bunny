import Vue from 'vue'
import {Button, InfiniteScroll, Upload, Loading, Message, Table, TableColumn, Select, Option} from 'element-ui'

Vue.use(Button)
Vue.use(InfiniteScroll)
Vue.use(Upload)
Vue.use(Loading)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Option)
Vue.use(Select)

Vue.prototype.$message = Message;
// Vue.use(MessageBox)
