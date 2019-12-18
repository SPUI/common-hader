import { isTestEnv, isStableEnv } from './utils';

// 判断当前环境是否是测试环境,返回多链系统的测试/正式环境
export const MULTICHAIN =
  isTestEnv() ? 'http://multichain.client.test.sparkpool.com' :
  isStableEnv() ? 'https://multichain-client-stable.sparkpool.com' : 'https://www.sparkpool.com';

// 判断当前是否是测试环境，返回账户系统的测试/正式环境
export const ACCOUNTSYSTEM =
  isTestEnv() ? 'https://oauth-wallet.sparkpool.com' :
  isStableEnv() ? 'https://oauth-wallet-stable.sparkpool.com' : 'https://account.sparkpool.com';

// 判断当前是否是测试环境，返回云钱包系统的测试/正式环境
export const WALLETSYSTEM =
  isTestEnv() ? 'https://test.finance.sparkpool.com' :
  isStableEnv() ? 'https://stable-finance.sparkpool.com' : 'https://wallet.sparkpool.com';

// 定义支持的矿池币种
export const CURRENCYLIST = [
  {
    currency: 'ETH',
  },
  {
    currency: 'CKB',
  },
  {
    currency: 'GRIN_29',
  },
  {
    currency: 'GRIN_31',
  },
  {
    currency: 'BEAM',
  },
];
