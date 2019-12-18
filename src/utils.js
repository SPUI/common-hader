import Cookies from 'js-cookie';

import { MULTICHAIN, WALLETSYSTEM } from './config';

// 判断是否是测试环境
export function isTestEnv() {
  const { hostname } = window.location;
  // 判断是否是本地
  if (hostname === 'localhost') { return true; }
  // 判断是否是测试环境域名
  if (hostname.indexOf('test') > -1) { return true; }
  // 判断是否是账户中心测试环境域名
  if (hostname === 'oauth-wallet.sparkpool.com') { return true; }
  // 判断是否是ip
  if (/((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/g.test(hostname)) {
    return true;
  }
  return false;
}

// 判断是否是 stable 环境
export function isStableEnv() {
  const { hostname } = window.location;
  // 判断是否是stable 环境
  if (hostname.indexOf('stable') > -1) { return true; }
  return false;
}

// 判断是否是中文语言环境
export function isCN() {
  return (Cookies.get('i18next') || 'zh').indexOf('zh') > -1;
}

// 获取当前系统选中的 key
// www.sparkpool.com        => 'pool'
// www.sparkpool.com/miner  => 'miner'
// wallet.sparkpool.com     => 'wallet'
// staking.sparkpool.com    => 'staking'
// account.sparkpool.com    => 'account'
export const getCurrentKey = () => {
  const {
    protocol,
    hostname,
    pathname,
    port,
  } = window.location;
  let key = '';

  // 非 80 端口表示本地环境
  if (+port !== 80) {
    return localhost(+port);
  }
  if (`${protocol}//${hostname}` === MULTICHAIN) {
    if (pathname.indexOf('/miner') === 0) {
      return ['miner'];
    }
    return ['pool'];
  }
  if (`${protocol}//${hostname}` === WALLETSYSTEM) {
    return ['wallet'];
  }
  return [key];
}

/**
 * 获取本地系统 key [本地环境按端口区分项目]
 * @param  {Number} port [端口]
 * @return {String}      [key]
 * 8000 =>  'www.sparkpool.com'
 * 8001 =>  'staking.sparkpool.com'
 * 8002 =>  'account.sparkpool.com'
 * 8003 =>  'wallet.sparkpool.com'
 */
export const localhost = (port) => {
  const { pathname } = window.location;
  // 多链本地端口配置
  if ([8000].indexOf(port) > -1) {
    if (pathname.indexOf('/miner') === 0) {
      return ['miner'];
    }
    return ['pool'];
  }
  // 账户中心本地端口配置
  if ([8002].indexOf(port) > -1) {
    return ['account'];
  }
  // 云钱包本地端口配置
  if ([8003].indexOf(port) > -1) {
    return ['wallet'];
  }
  return ['pool'];
}
