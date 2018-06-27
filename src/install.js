import Cal from './components/cal';

export default function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component(Cal.name, Cal);
}
