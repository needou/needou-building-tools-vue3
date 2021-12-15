import Vue from "vue";
import TowerCrane from './components/TowerCrane.vue';
TowerCrane.install = Vue => Vue.component(TowerCrane.name, TowerCrane);//注册组件

import Elevator from './components/Elevator.vue';
Elevator.install = Vue => Vue.component(Elevator.name, Elevator);//注册组件
// Object.keys(Components).forEach(name => {
//     Vue.component(name, Components[name]);
// });
export { TowerCrane,Elevator }