import Cal from './cal';

// console.log(Cal);

Cal.install = function (Vue) {
  Vue.component(Cal.name, Cal);
};

export default Cal;
