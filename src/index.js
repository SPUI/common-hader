import { useTranslation } from 'react-i18next';

import WebHeader from './WebHeader';
import WapHeader from './WapHeader';

import i18nLng from './i18n';

import styles from './index.module.less';

const CommonHader = ({
  i18n,
  theme,
  userInfo,
  poolStatusData,
  t,
  logout,
}) => {

  let translate;
  let languageHandler;

  // 判断是否配置了国际化
  if (t === undefined) {
    // 未指定国际化内容,引入自带的国际化配置
    const { t, ready } = useTranslation('header', { useSuspense: false, i18n: i18nLng });
    if (!ready) { return null }
    translate = t;
  }

  // 判断是否配置了国际化
  if (i18n === undefined) {
    languageHandler = i18nLng;
  }

  return (
    <div className={styles.CommonHader}>
      <div className={styles.webHeader}>
        <WebHeader
          theme={theme}
          userInfo={userInfo}
          poolStatus={poolStatusData}
          t={t || translate}
          logout={logout}
        />
      </div>
      <div className={styles.wapHeader}>
        <WapHeader
          i18n={i18n || languageHandler}
          t={t || translate}
          userInfo={userInfo}
          logout={logout}
        />
      </div>
    </div>
  );

}

export default CommonHader;
