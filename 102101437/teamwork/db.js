import Taro from '@tarojs/taro';

Taro.cloud.init({
  env: 'cloud1-1gxswkl3c502ee3c'
});

const db = Taro.cloud.database();
const goods = db.collection('goods')
const brands = db.collection('brands')
const _ = db.command;

export { db, _ };
