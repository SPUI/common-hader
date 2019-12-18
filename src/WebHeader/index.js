import classnames from 'classnames';
import { Menu, Dropdown, Divider } from 'antd';

import Link from '../components/Link';

import { MULTICHAIN, ACCOUNTSYSTEM, WALLETSYSTEM, CURRENCYLIST } from '../config';
import { isCN, getCurrentKey } from '../utils';
import styles from './styles.module.less';

const { SubMenu } = Menu;

const WebHeader = ({
  poolStatus,
  userInfo,
  theme,
  t,
  logout,
}) => {

  // 渲染 logo 导航
  function renderLogoNav() {

    const getCurrencyIcon = (currency) => {
      let src = '';
      try {
        src = require(`../assets/svg/${currency.toUpperCase()}.svg`);
      } catch (e) {
        console.log(e);
      }
      return src;
    }

    const menu = (
      <div className={styles.dropdown}>
        <ul className={styles.menu}>
          {
            (poolStatus || CURRENCYLIST).map(item => (
              <li key={item.currency}>
                <Link to={`/token/${item.currency}`}>
                  <span className={styles.icon}>
                    <img src={getCurrencyIcon(item.currency)} alt=""/>
                  </span>
                  <strong>
                    {item.currency} {t('header:pool')}
                  </strong>
                </Link>
              </li>
            ))
          }
          <Divider />
          <li>
            <a href="https://staking.sparkpool.com">
              <span className={styles.icons}>
                <img src={require('../assets/svg/icon-nav-staking.svg')} alt=""/>
                <img src={require('../assets/svg/icon-nav-staking-hover.svg')} alt=""/>
              </span>
              <strong>Staking</strong>
            </a>
          </li>
          <li>
            <a href="https://os.sparkpool.com/home/">
              <span className={styles.icons}>
                <img src={require('../assets/svg/icon-nav-sparkos.svg')} alt=""/>
                <img src={require('../assets/svg/icon-nav-sparkos-hover.svg')} alt=""/>
              </span>
              <strong>SparkOS</strong>
            </a>
          </li>
          <li className={styles.new}>
            <Link to="/download">
              <span className={styles.icons}>
                <img src={require('../assets/svg/icon-nav-app.svg')} alt=""/>
                <img src={require('../assets/svg/icon-nav-app-hover.svg')} alt=""/>
              </span>
              <strong>{t('header:download')}</strong>
            </Link>
          </li>
        </ul>
      </div>
    );

    return (
      <div>
        <Link to="/">
          <img className={styles.logo} src={require('../assets/svg/icon-logo.svg')} alt=""/>
        </Link>
        <Dropdown overlay={menu}>
          <img className={styles.menu} src={require('../assets/svg/icon-menu.svg')} alt=""/>
        </Dropdown>
      </div>
    );
  }

  // 渲染导航菜单
  function renderNavMenu() {

    return (
      <Menu
        mode="horizontal"
        className={styles.navMenu}
        selectedKeys={getCurrentKey()}
      >
        <Menu.Item key="pool">
          <a href={MULTICHAIN}>{t('header:pool')}</a>
        </Menu.Item>
        <Menu.Item key="miner">
          {
            userInfo.id ? (
              <a href={`${MULTICHAIN}/action/mywallet`}>{t('header:user.myWorkers')}</a>
            ) : (
              <a href={`${ACCOUNTSYSTEM}/login?redirect_uri=${MULTICHAIN}/action/mywallet`}>{t('header:user.myWorkers')}</a>
            )
          }
        </Menu.Item>
        <Menu.Item key="wallet">
          {
            userInfo.id ? (
              <a href={WALLETSYSTEM}>{t('header:wallet')}</a>
            ) : (
              <a href={`${ACCOUNTSYSTEM}/login?redirect_uri=${WALLETSYSTEM}`}>{t('header:wallet')}</a>
            )
          }
        </Menu.Item>
        <SubMenu
          key="help"
          className={styles.subMenu}
          title={
            <span className={styles.navMenu__subMenu__title}>
              {t('header:help.title')}<img src={require('../assets/svg/icon-download-black.svg')} alt=""/>
            </span>
          }
        >
          <Menu.Item>
            <a
              href={`https://sparkpool.zendesk.com/hc/${isCN() ? 'zh-cn' : 'en-us' }/requests/new`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('header:help.order')}
            </a>
          </Menu.Item>
          <Menu.Item>
            <a
              href={`https://support.sparkpool.com/hc/${isCN() ? 'zh-cn' : 'en-us' }/categories/360000149093`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('header:help.question')}
            </a>
          </Menu.Item>
          <Menu.Item>
            <a
              href="https://mp.weixin.qq.com/mp/homepage?__biz=MzU3MDY4Mjg5Mg==&hid=1&sn=bf68889a560a893a4936fb018b560966"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('header:help.classroom')}
            </a>
          </Menu.Item>
          <Menu.Item>
            <a
              href="https://mp.weixin.qq.com/mp/homepage?__biz=MzI3OTg3MDQ5NA==&hid=1&sn=9350c778ac3f87dce7bf8b208a4abe21"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('header:help.articles')}
            </a>
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
  }

  // 渲染用户登陆信息
  function renderUserInfo() {
    const { id, avatar } = userInfo || {};
    const menu = (
      <div className={styles.dropdown__userInfo}>
        <Menu
          onClick={({ key }) => {
            if (key === 'logout') {
              logout();
            }
          }}
        >
          <Menu.Item key="mining">
            <Link to="/setting/mining">
              {t('header:accountmining')}
            </Link>
          </Menu.Item>
          <Menu.Item key="follow">
            <Link to="/setting/follow">
              {t('header:user.follow')}
            </Link>
          </Menu.Item>
          <Menu.Item key="account">
            <Link to="/setting/account">
              {t('header:user.default')}
            </Link>
          </Menu.Item>
          <Menu.Item key="notice">
            <Link to="/setting/notice">
              {t('header:user.notice')}
            </Link>
          </Menu.Item>
          <Menu.Item key="userInfo">
            <a href={ACCOUNTSYSTEM}>
              {t('header:user.setting')}
            </a>
          </Menu.Item>
          <Menu.Item key="logout">
            {t('header:logout')}
          </Menu.Item>
        </Menu>
      </div>
    );
    if (!id) {
      return (
        <div>
          <a href={`${ACCOUNTSYSTEM}/login`}>{t('header:login')}</a> / <a href={`${ACCOUNTSYSTEM}/register`}>{t('header:register')}</a>
        </div>
      )
    }
    return (
      <Dropdown
        overlay={menu}
        placement="bottomCenter"
      >
        <img src={avatar || require('../assets/svg/icon-user.svg')} alt=""/>
      </Dropdown>
    )
  }

  return (
    <div className={classnames(styles.WebHeader, styles[theme])}>
      <div className={styles.WebHeader__logo}>
        {renderLogoNav()}
      </div>
      <div className={styles.WebHeader__nav}>
        {renderNavMenu()}
      </div>
      <div className={styles.WebHeader__menu}>
        {renderUserInfo()}
      </div>
    </div>
  )
}

export default WebHeader;
