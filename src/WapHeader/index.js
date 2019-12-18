import React, { Component } from 'react';
import { Dropdown, Menu, Icon, Drawer } from 'antd';

import Link from '../components/Link';

import { MULTICHAIN, ACCOUNTSYSTEM, WALLETSYSTEM } from '../config';
import { isCN, getCurrentKey } from '../utils';

import styles from './styles.module.less';

const SubMenu = Menu.SubMenu;

class WapHeader extends Component {

  state = {
    visible: false,
  }

  // 渲染导航抽屉
  renderNavDrawer = () => {
    const { i18n, t } = this.props;
    const { visible } = this.state;

    return (
      <Drawer
        title={<img src={require('../assets/svg/icon-logo.svg')} alt="sparkpool" />}
        placement="left"
        closable={false}
        visible={visible}
        onClose={() => {
          this.setState({
            visible: false,
          });
        }}
      >
        <Menu
          mode="inline"
          selectedKeys={getCurrentKey()}
          onClick={({ key }) => {
            // 切换语言
            if (['zh', 'en'].indexOf(key) > -1) {
              i18n.changeLanguage(key);
              const { pathname, search } = window.location;
              // /en 路径, 切换中文语言环境
              if (key === 'zh') {
                if (pathname.indexOf('/en') > -1) {
                  window.location.href = pathname.replace('/en', '') + search;
                }
              }
              // / 路径, 切换英文语言环境
              if (key === 'en') {
                if (pathname.indexOf('/en') < 0) {
                  window.location.href = '/en' + pathname + search;
                }
              }
            }
            this.setState({
              visible: false,
            });
          }}
        >
          <Menu.Item key="pool">
            <a href={MULTICHAIN}>
              <Icon type="home" />{t('header:pool')}
            </a>
          </Menu.Item>
          <Menu.Item key="miner">
            <a href="/action/mywallet">
              <Icon type="laptop" />{t('header:user.myWorkers')}
            </a>
          </Menu.Item>
          <Menu.Item key="wallet">
            <a href={WALLETSYSTEM}>
              <Icon type="wallet" />{t('header:wallet')}
            </a>
          </Menu.Item>
          <Menu.Item key="download">
            <a href={`${MULTICHAIN}/download`}>
              <Icon type="cloud-download" />{t('header:download')}
            </a>
          </Menu.Item>
          <Menu.Item key="staking">
            <a href={`https://staking.sparkpool.com`}>
              <img
                src={require('../assets/svg/icon-wap-staking.svg')}
                alt=""
                style={{
                  marginRight: 10,
                  width: 14,
                }}
              />Staking
            </a>
          </Menu.Item>
          <SubMenu
            title={
              <span>
                <Icon type="question-circle" />{t('header:help.title')}
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
          <SubMenu
            title={
              <span><Icon type="global" />{isCN() ? '简体中文' : 'English'}</span>
            }
          >
            <Menu.Item key="zh">
              简体中文
            </Menu.Item>
            <Menu.Item key="en">
              English
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Drawer>
    )
  }

  // 渲染用户登陆信息
  renderUserInfo = () => {
    const { userInfo, t, logout } = this.props;
    const { id, avatar } = userInfo || {};
    const menu = (
      <div className={styles.dropdown}>
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
        placement="bottomRight"
      >
        <img src={avatar || require('../assets/svg/icon-user.svg')} alt=""/>
      </Dropdown>
    );
  }

  render() {

    const { visible } = this.state;

    return (
      <div className={styles.WapHeader}>
        <span className={styles.navMenu}>
          <i
            className="icon iconfont"
            onClick={() => {
              this.setState({
                visible: !visible,
              });
            }}
          >
            &#xe600;
          </i>
        </span>
        <span className={styles.userMenu}>
          {this.renderUserInfo()}
        </span>
        {this.renderNavDrawer()}
      </div>
    );
  }
}

export default WapHeader;
