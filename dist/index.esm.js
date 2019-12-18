import React, { Component } from 'react';
import { initReactI18next, useTranslation } from 'react-i18next';
import 'antd/es/dropdown/style';
import _Dropdown from 'antd/es/dropdown';
import 'antd/es/divider/style';
import _Divider from 'antd/es/divider';
import 'antd/es/menu/style';
import _Menu from 'antd/es/menu';
import classnames from 'classnames';
import Cookies from 'js-cookie';
import 'antd/es/drawer/style';
import _Drawer from 'antd/es/drawer';
import 'antd/es/icon/style';
import _Icon from 'antd/es/icon';
import i18next from 'i18next';
import Backend from 'i18next-xhr-backend';
import LngDetector from 'i18next-browser-languagedetector';

/**
 * 多链 web 站下, history 跳转 todo
 * @param {String} to       跳转的路径
 * @param {React Node} children 内容
 */
var Link = function Link(_ref) {
  var to = _ref.to,
      children = _ref.children;
  return React.createElement("a", {
    href: to
  }, children);
};

function isTestEnv() {
  var hostname = window.location.hostname; // 判断是否是本地

  if (hostname === 'localhost') {
    return true;
  } // 判断是否是测试环境域名


  if (hostname.indexOf('test') > -1) {
    return true;
  } // 判断是否是账户中心测试环境域名


  if (hostname === 'oauth-wallet.sparkpool.com') {
    return true;
  } // 判断是否是ip


  if (/((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/g.test(hostname)) {
    return true;
  }

  return false;
} // 判断是否是 stable 环境

function isStableEnv() {
  var hostname = window.location.hostname; // 判断是否是stable 环境

  if (hostname.indexOf('stable') > -1) {
    return true;
  }

  return false;
} // 判断是否是中文语言环境

function isCN() {
  return (Cookies.get('i18next') || 'zh').indexOf('zh') > -1;
} // 获取当前系统选中的 key
// www.sparkpool.com        => 'pool'
// www.sparkpool.com/miner  => 'miner'
// wallet.sparkpool.com     => 'wallet'
// staking.sparkpool.com    => 'staking'
// account.sparkpool.com    => 'account'

var getCurrentKey = function getCurrentKey() {
  var _window$location = window.location,
      protocol = _window$location.protocol,
      hostname = _window$location.hostname,
      pathname = _window$location.pathname,
      port = _window$location.port;
  var key = ''; // 非 80 端口表示本地环境

  if (+port !== 80) {
    return localhost(+port);
  }

  if ("".concat(protocol, "//").concat(hostname) === MULTICHAIN) {
    if (pathname.indexOf('/miner') === 0) {
      return ['miner'];
    }

    return ['pool'];
  }

  if ("".concat(protocol, "//").concat(hostname) === WALLETSYSTEM) {
    return ['wallet'];
  }

  return [key];
};
/**
 * 获取本地系统 key [本地环境按端口区分项目]
 * @param  {Number} port [端口]
 * @return {String}      [key]
 * 8000 =>  'www.sparkpool.com'
 * 8001 =>  'staking.sparkpool.com'
 * 8002 =>  'account.sparkpool.com'
 * 8003 =>  'wallet.sparkpool.com'
 */

var localhost = function localhost(port) {
  var pathname = window.location.pathname; // 多链本地端口配置

  if ([8000].indexOf(port) > -1) {
    if (pathname.indexOf('/miner') === 0) {
      return ['miner'];
    }

    return ['pool'];
  } // 账户中心本地端口配置


  if ([8002].indexOf(port) > -1) {
    return ['account'];
  } // 云钱包本地端口配置


  if ([8003].indexOf(port) > -1) {
    return ['wallet'];
  }

  return ['pool'];
};

var MULTICHAIN = isTestEnv() ? 'http://multichain.client.test.sparkpool.com' : isStableEnv() ? 'https://multichain-client-stable.sparkpool.com' : 'https://www.sparkpool.com'; // 判断当前是否是测试环境，返回账户系统的测试/正式环境

var ACCOUNTSYSTEM = isTestEnv() ? 'https://oauth-wallet.sparkpool.com' : isStableEnv() ? 'https://oauth-wallet-stable.sparkpool.com' : 'https://account.sparkpool.com'; // 判断当前是否是测试环境，返回云钱包系统的测试/正式环境

var WALLETSYSTEM = isTestEnv() ? 'https://test.finance.sparkpool.com' : isStableEnv() ? 'https://stable-finance.sparkpool.com' : 'https://wallet.sparkpool.com'; // 定义支持的矿池币种

var CURRENCYLIST = [{
  currency: 'ETH'
}, {
  currency: 'CKB'
}, {
  currency: 'GRIN_29'
}, {
  currency: 'GRIN_31'
}, {
  currency: 'BEAM'
}];

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".styles-module_light__GLcZv {\n  color: #363e59;\n  background-color: #fff;\n  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);\n}\n.styles-module_dark__ZvqLe {\n  color: #f7fafc;\n  background-color: rgba(17, 15, 14, 0.9);\n}\n.styles-module_WebHeader__1cV3g {\n  height: 64px;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n          flex-direction: row;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n          align-items: center;\n}\n.styles-module_WebHeader__logo__Mo8NW {\n  padding-left: 40px;\n}\n.styles-module_WebHeader__logo__Mo8NW .styles-module_logo__1eFqo,\n.styles-module_WebHeader__logo__Mo8NW .styles-module_menu__2mqPC {\n  cursor: pointer;\n}\n.styles-module_WebHeader__logo__Mo8NW .styles-module_menu__2mqPC {\n  margin-left: 35px;\n}\n.styles-module_WebHeader__logo__Mo8NW .styles-module_menu__content__25ewk {\n  background-color: #fff;\n}\n.styles-module_WebHeader__nav__2FqKl .styles-module_navMenu__1l0fq {\n  line-height: 60px;\n  color: inherit;\n  border-bottom-width: 0;\n  background-color: transparent;\n}\n.styles-module_WebHeader__nav__2FqKl .styles-module_navMenu__1l0fq li {\n  margin: 0 14px;\n  padding: 0 6px;\n  font-size: 14px;\n  font-weight: normal;\n  -webkit-transition: none;\n  transition: none;\n}\n.styles-module_WebHeader__nav__2FqKl .styles-module_navMenu__1l0fq li a {\n  color: inherit;\n  -webkit-transition: none;\n  transition: none;\n}\n.styles-module_WebHeader__nav__2FqKl .styles-module_navMenu__1l0fq .styles-module_subMenu__qIEZv {\n  padding: 0 6px;\n}\n.styles-module_WebHeader__nav__2FqKl .styles-module_navMenu__1l0fq .styles-module_subMenu__qIEZv > div {\n  padding: 0;\n  -webkit-transition: none;\n  transition: none;\n}\n.styles-module_WebHeader__nav__2FqKl .styles-module_navMenu__subMenu__title__2ZK4G img {\n  margin-left: 8px;\n  width: 10px;\n}\n.styles-module_WebHeader__menu__1qA-s {\n  padding-right: 40px;\n}\n.styles-module_WebHeader__menu__1qA-s img {\n  width: 40px;\n  border-radius: 100%;\n}\n.styles-module_WebHeader__menu__1qA-s a {\n  color: inherit;\n}\n.styles-module_dropdown__3lVYY {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n          flex-direction: row;\n  margin-top: 19px;\n  padding: 0 16px;\n  border-radius: 12px;\n  background-color: #fff;\n  box-shadow: 0 16px 32px 0 rgba(0, 0, 0, 0.1);\n}\n.styles-module_dropdown__3lVYY .styles-module_menu__2mqPC {\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n.styles-module_dropdown__3lVYY .styles-module_menu__2mqPC > li {\n  margin: 24px 0;\n  line-height: 32px;\n}\n.styles-module_dropdown__3lVYY .styles-module_menu__2mqPC > li:first-child {\n  margin-top: 16px;\n}\n.styles-module_dropdown__3lVYY .styles-module_menu__2mqPC > li:last-child {\n  margin-bottom: 16px;\n}\n.styles-module_dropdown__3lVYY .styles-module_menu__2mqPC > li:hover {\n  cursor: pointer;\n}\n.styles-module_dropdown__3lVYY .styles-module_menu__2mqPC > li:hover > a strong {\n  color: #f86e21;\n}\n.styles-module_dropdown__3lVYY .styles-module_menu__2mqPC > li:hover > a .styles-module_icons__1ZPz9 img:first-child {\n  display: none;\n}\n.styles-module_dropdown__3lVYY .styles-module_menu__2mqPC > li:hover > a .styles-module_icons__1ZPz9 img:last-child {\n  display: initial;\n}\n.styles-module_dropdown__3lVYY .styles-module_menu__2mqPC > li:hover > a .styles-module_more__23WAX {\n  color: #f86e21;\n}\n.styles-module_dropdown__3lVYY .styles-module_menu__2mqPC > li > a {\n  display: inline-block;\n  min-width: 170px;\n}\n.styles-module_dropdown__3lVYY .styles-module_menu__2mqPC > li > a .styles-module_icons__1ZPz9 img:last-child {\n  display: none;\n}\n.styles-module_dropdown__3lVYY .styles-module_menu__2mqPC > li .styles-module_icon__1fDvZ,\n.styles-module_dropdown__3lVYY .styles-module_menu__2mqPC > li .styles-module_icons__1ZPz9 {\n  display: inline-block;\n  margin-right: 16px;\n}\n.styles-module_dropdown__3lVYY .styles-module_menu__2mqPC > li .styles-module_icon__1fDvZ {\n  width: 27px;\n  text-align: center;\n}\n.styles-module_dropdown__3lVYY .styles-module_menu__2mqPC > li .styles-module_icon__1fDvZ img {\n  height: 24px;\n}\n.styles-module_dropdown__3lVYY .styles-module_menu__2mqPC > li .styles-module_more__23WAX {\n  float: right;\n  font-size: 12px;\n  color: #363e59;\n  -webkit-transform: rotate(-90deg);\n          transform: rotate(-90deg);\n}\n.styles-module_dropdown__3lVYY .styles-module_menu__2mqPC > li strong {\n  font-size: 14px;\n  font-weight: 500;\n  color: #363e59;\n}\n.styles-module_dropdown__3lVYY .styles-module_menu__2mqPC .styles-module_new__31oD9 strong::after {\n  content: 'NEW';\n  margin-left: 8px;\n  padding: 0 4px;\n  font-size: 12px;\n  color: #fff;\n  border-radius: 2px;\n  background-image: -webkit-gradient(linear, left top, left bottom, from(#ffae57), to(#ff6531));\n  background-image: linear-gradient(to bottom, #ffae57, #ff6531);\n}\n.styles-module_dropdown__3lVYY .styles-module_subMenu__qIEZv {\n  float: right;\n  margin: 0 0 16px 16px;\n  min-width: 170px;\n  border-left: 1px solid #edeff5;\n}\n.styles-module_dropdown__3lVYY .styles-module_subMenu__qIEZv li {\n  margin: 24px 0;\n  padding-left: 16px;\n  cursor: pointer;\n}\n.styles-module_dropdown__3lVYY .styles-module_subMenu__qIEZv li:first-child {\n  margin-top: 8px;\n}\n.styles-module_dropdown__3lVYY .styles-module_subMenu__qIEZv li:hover a strong {\n  color: #f86e21;\n}\n.styles-module_dropdown__3lVYY .styles-module_subMenu__qIEZv li .styles-module_icon__1fDvZ {\n  display: inline-block;\n  margin-right: 16px;\n  width: 27px;\n  text-align: center;\n}\n.styles-module_dropdown__3lVYY .styles-module_subMenu__qIEZv li .styles-module_icon__1fDvZ img {\n  height: 24px;\n}\n.styles-module_dropdown__3lVYY .styles-module_subMenu__qIEZv li strong {\n  font-size: 14px;\n  font-weight: 500;\n  color: #363e59;\n}\n.styles-module_dropdown__3lVYY .styles-module_subMenu__pool__2ueQu {\n  background-color: #fff;\n}\n.styles-module_dropdown__userInfo__1r1NA {\n  margin-top: 14px;\n  border-radius: 4px;\n  overflow: hidden;\n  box-shadow: 0 16px 32px 0 rgba(0, 0, 0, 0.1);\n}\n";
var styles = {"light":"styles-module_light__GLcZv","dark":"styles-module_dark__ZvqLe","WebHeader":"styles-module_WebHeader__1cV3g","WebHeader__logo":"styles-module_WebHeader__logo__Mo8NW","logo":"styles-module_logo__1eFqo","menu":"styles-module_menu__2mqPC","menu__content":"styles-module_menu__content__25ewk","WebHeader__nav":"styles-module_WebHeader__nav__2FqKl","navMenu":"styles-module_navMenu__1l0fq","subMenu":"styles-module_subMenu__qIEZv","navMenu__subMenu__title":"styles-module_navMenu__subMenu__title__2ZK4G","WebHeader__menu":"styles-module_WebHeader__menu__1qA-s","dropdown":"styles-module_dropdown__3lVYY","icons":"styles-module_icons__1ZPz9","more":"styles-module_more__23WAX","icon":"styles-module_icon__1fDvZ","new":"styles-module_new__31oD9","subMenu__pool":"styles-module_subMenu__pool__2ueQu","dropdown__userInfo":"styles-module_dropdown__userInfo__1r1NA"};
styleInject(css);

var SubMenu = _Menu.SubMenu;

var WebHeader = function WebHeader(_ref) {
  var poolStatus = _ref.poolStatus,
      userInfo = _ref.userInfo,
      theme = _ref.theme,
      t = _ref.t,
      logout = _ref.logout;

  // 渲染 logo 导航
  function renderLogoNav() {
    var getCurrencyIcon = function getCurrencyIcon(currency) {
      var src = '';

      try {
        src = require("../assets/svg/".concat(currency.toUpperCase(), ".svg"));
      } catch (e) {
        console.log(e);
      }

      return src;
    };

    var menu = React.createElement("div", {
      className: styles.dropdown
    }, React.createElement("ul", {
      className: styles.menu
    }, (poolStatus || CURRENCYLIST).map(function (item) {
      return React.createElement("li", {
        key: item.currency
      }, React.createElement(Link, {
        to: "/token/".concat(item.currency)
      }, React.createElement("span", {
        className: styles.icon
      }, React.createElement("img", {
        src: getCurrencyIcon(item.currency),
        alt: ""
      })), React.createElement("strong", null, item.currency, " ", t('header:pool'))));
    }), React.createElement(_Divider, null), React.createElement("li", null, React.createElement("a", {
      href: "https://staking.sparkpool.com"
    }, React.createElement("span", {
      className: styles.icons
    }, React.createElement("img", {
      src: require('../assets/svg/icon-nav-staking.svg'),
      alt: ""
    }), React.createElement("img", {
      src: require('../assets/svg/icon-nav-staking-hover.svg'),
      alt: ""
    })), React.createElement("strong", null, "Staking"))), React.createElement("li", null, React.createElement("a", {
      href: "https://os.sparkpool.com/home/"
    }, React.createElement("span", {
      className: styles.icons
    }, React.createElement("img", {
      src: require('../assets/svg/icon-nav-sparkos.svg'),
      alt: ""
    }), React.createElement("img", {
      src: require('../assets/svg/icon-nav-sparkos-hover.svg'),
      alt: ""
    })), React.createElement("strong", null, "SparkOS"))), React.createElement("li", {
      className: styles.new
    }, React.createElement(Link, {
      to: "/download"
    }, React.createElement("span", {
      className: styles.icons
    }, React.createElement("img", {
      src: require('../assets/svg/icon-nav-app.svg'),
      alt: ""
    }), React.createElement("img", {
      src: require('../assets/svg/icon-nav-app-hover.svg'),
      alt: ""
    })), React.createElement("strong", null, t('header:download'))))));
    return React.createElement("div", null, React.createElement(Link, {
      to: "/"
    }, React.createElement("img", {
      className: styles.logo,
      src: require('../assets/svg/icon-logo.svg'),
      alt: ""
    })), React.createElement(_Dropdown, {
      overlay: menu
    }, React.createElement("img", {
      className: styles.menu,
      src: require('../assets/svg/icon-menu.svg'),
      alt: ""
    })));
  } // 渲染导航菜单


  function renderNavMenu() {
    return React.createElement(_Menu, {
      mode: "horizontal",
      className: styles.navMenu,
      selectedKeys: getCurrentKey()
    }, React.createElement(_Menu.Item, {
      key: "pool"
    }, React.createElement("a", {
      href: MULTICHAIN
    }, t('header:pool'))), React.createElement(_Menu.Item, {
      key: "miner"
    }, userInfo.id ? React.createElement("a", {
      href: "".concat(MULTICHAIN, "/action/mywallet")
    }, t('header:user.myWorkers')) : React.createElement("a", {
      href: "".concat(ACCOUNTSYSTEM, "/login?redirect_uri=").concat(MULTICHAIN, "/action/mywallet")
    }, t('header:user.myWorkers'))), React.createElement(_Menu.Item, {
      key: "wallet"
    }, userInfo.id ? React.createElement("a", {
      href: WALLETSYSTEM
    }, t('header:wallet')) : React.createElement("a", {
      href: "".concat(ACCOUNTSYSTEM, "/login?redirect_uri=").concat(WALLETSYSTEM)
    }, t('header:wallet'))), React.createElement(SubMenu, {
      key: "help",
      className: styles.subMenu,
      title: React.createElement("span", {
        className: styles.navMenu__subMenu__title
      }, t('header:help.title'), React.createElement("img", {
        src: require('../assets/svg/icon-download-black.svg'),
        alt: ""
      }))
    }, React.createElement(_Menu.Item, null, React.createElement("a", {
      href: "https://sparkpool.zendesk.com/hc/".concat(isCN() ? 'zh-cn' : 'en-us', "/requests/new"),
      target: "_blank",
      rel: "noopener noreferrer"
    }, t('header:help.order'))), React.createElement(_Menu.Item, null, React.createElement("a", {
      href: "https://support.sparkpool.com/hc/".concat(isCN() ? 'zh-cn' : 'en-us', "/categories/360000149093"),
      target: "_blank",
      rel: "noopener noreferrer"
    }, t('header:help.question'))), React.createElement(_Menu.Item, null, React.createElement("a", {
      href: "https://mp.weixin.qq.com/mp/homepage?__biz=MzU3MDY4Mjg5Mg==&hid=1&sn=bf68889a560a893a4936fb018b560966",
      target: "_blank",
      rel: "noopener noreferrer"
    }, t('header:help.classroom'))), React.createElement(_Menu.Item, null, React.createElement("a", {
      href: "https://mp.weixin.qq.com/mp/homepage?__biz=MzI3OTg3MDQ5NA==&hid=1&sn=9350c778ac3f87dce7bf8b208a4abe21",
      target: "_blank",
      rel: "noopener noreferrer"
    }, t('header:help.articles')))));
  } // 渲染用户登陆信息


  function renderUserInfo() {
    var _ref2 = userInfo || {},
        id = _ref2.id,
        avatar = _ref2.avatar;

    var menu = React.createElement("div", {
      className: styles.dropdown__userInfo
    }, React.createElement(_Menu, {
      onClick: function onClick(_ref3) {
        var key = _ref3.key;

        if (key === 'logout') {
          logout();
        }
      }
    }, React.createElement(_Menu.Item, {
      key: "mining"
    }, React.createElement(Link, {
      to: "/setting/mining"
    }, t('header:accountmining'))), React.createElement(_Menu.Item, {
      key: "follow"
    }, React.createElement(Link, {
      to: "/setting/follow"
    }, t('header:user.follow'))), React.createElement(_Menu.Item, {
      key: "account"
    }, React.createElement(Link, {
      to: "/setting/account"
    }, t('header:user.default'))), React.createElement(_Menu.Item, {
      key: "notice"
    }, React.createElement(Link, {
      to: "/setting/notice"
    }, t('header:user.notice'))), React.createElement(_Menu.Item, {
      key: "userInfo"
    }, React.createElement("a", {
      href: ACCOUNTSYSTEM
    }, t('header:user.setting'))), React.createElement(_Menu.Item, {
      key: "logout"
    }, t('header:logout'))));

    if (!id) {
      return React.createElement("div", null, React.createElement("a", {
        href: "".concat(ACCOUNTSYSTEM, "/login")
      }, t('header:login')), " / ", React.createElement("a", {
        href: "".concat(ACCOUNTSYSTEM, "/register")
      }, t('header:register')));
    }

    return React.createElement(_Dropdown, {
      overlay: menu,
      placement: "bottomCenter"
    }, React.createElement("img", {
      src: avatar || require('../assets/svg/icon-user.svg'),
      alt: ""
    }));
  }

  return React.createElement("div", {
    className: classnames(styles.WebHeader, styles[theme])
  }, React.createElement("div", {
    className: styles.WebHeader__logo
  }, renderLogoNav()), React.createElement("div", {
    className: styles.WebHeader__nav
  }, renderNavMenu()), React.createElement("div", {
    className: styles.WebHeader__menu
  }, renderUserInfo()));
};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

var css$1 = ".styles-module_WapHeader__193mB {\n  height: 44px;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n          flex-direction: row;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n          align-items: center;\n  background-color: #fff;\n  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.12);\n}\n.styles-module_WapHeader__193mB .styles-module_navMenu__1TyBw {\n  display: inline-block;\n  padding: 0 16px;\n  height: 44px;\n  line-height: 44px;\n}\n.styles-module_WapHeader__193mB .styles-module_userMenu__3FqbB {\n  display: inline-block;\n  padding: 0 16px;\n  height: 44px;\n  line-height: 44px;\n}\n.styles-module_WapHeader__193mB .styles-module_userMenu__3FqbB img {\n  width: 30px;\n  height: 30px;\n}\n.styles-module_WapHeader__193mB .styles-module_userMenu__3FqbB a {\n  color: rgba(0, 0, 0, 0.65);\n}\n.styles-module_dropdown__GE8CO {\n  margin-top: 16px;\n  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.12);\n  border-radius: 4px;\n  overflow: hidden;\n}\n";
var styles$1 = {"WapHeader":"styles-module_WapHeader__193mB","navMenu":"styles-module_navMenu__1TyBw","userMenu":"styles-module_userMenu__3FqbB","dropdown":"styles-module_dropdown__GE8CO"};
styleInject(css$1);

var SubMenu$1 = _Menu.SubMenu;

var WapHeader =
/*#__PURE__*/
function (_Component) {
  _inherits(WapHeader, _Component);

  function WapHeader() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, WapHeader);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(WapHeader)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      visible: false
    };

    _this.renderNavDrawer = function () {
      var _this$props = _this.props,
          i18n = _this$props.i18n,
          t = _this$props.t;
      var visible = _this.state.visible;
      return React.createElement(_Drawer, {
        title: React.createElement("img", {
          src: require('../assets/svg/icon-logo.svg'),
          alt: "sparkpool"
        }),
        placement: "left",
        closable: false,
        visible: visible,
        onClose: function onClose() {
          _this.setState({
            visible: false
          });
        }
      }, React.createElement(_Menu, {
        mode: "inline",
        selectedKeys: getCurrentKey(),
        onClick: function onClick(_ref) {
          var key = _ref.key;

          // 切换语言
          if (['zh', 'en'].indexOf(key) > -1) {
            i18n.changeLanguage(key);
            var _window$location = window.location,
                pathname = _window$location.pathname,
                search = _window$location.search; // /en 路径, 切换中文语言环境

            if (key === 'zh') {
              if (pathname.indexOf('/en') > -1) {
                window.location.href = pathname.replace('/en', '') + search;
              }
            } // / 路径, 切换英文语言环境


            if (key === 'en') {
              if (pathname.indexOf('/en') < 0) {
                window.location.href = '/en' + pathname + search;
              }
            }
          }

          _this.setState({
            visible: false
          });
        }
      }, React.createElement(_Menu.Item, {
        key: "pool"
      }, React.createElement("a", {
        href: MULTICHAIN
      }, React.createElement(_Icon, {
        type: "home"
      }), t('header:pool'))), React.createElement(_Menu.Item, {
        key: "miner"
      }, React.createElement("a", {
        href: "/action/mywallet"
      }, React.createElement(_Icon, {
        type: "laptop"
      }), t('header:user.myWorkers'))), React.createElement(_Menu.Item, {
        key: "wallet"
      }, React.createElement("a", {
        href: WALLETSYSTEM
      }, React.createElement(_Icon, {
        type: "wallet"
      }), t('header:wallet'))), React.createElement(_Menu.Item, {
        key: "download"
      }, React.createElement("a", {
        href: "".concat(MULTICHAIN, "/download")
      }, React.createElement(_Icon, {
        type: "cloud-download"
      }), t('header:download'))), React.createElement(_Menu.Item, {
        key: "staking"
      }, React.createElement("a", {
        href: "https://staking.sparkpool.com"
      }, React.createElement("img", {
        src: require('../assets/svg/icon-wap-staking.svg'),
        alt: "",
        style: {
          marginRight: 10,
          width: 14
        }
      }), "Staking")), React.createElement(SubMenu$1, {
        title: React.createElement("span", null, React.createElement(_Icon, {
          type: "question-circle"
        }), t('header:help.title'))
      }, React.createElement(_Menu.Item, null, React.createElement("a", {
        href: "https://sparkpool.zendesk.com/hc/".concat(isCN() ? 'zh-cn' : 'en-us', "/requests/new"),
        target: "_blank",
        rel: "noopener noreferrer"
      }, t('header:help.order'))), React.createElement(_Menu.Item, null, React.createElement("a", {
        href: "https://support.sparkpool.com/hc/".concat(isCN() ? 'zh-cn' : 'en-us', "/categories/360000149093"),
        target: "_blank",
        rel: "noopener noreferrer"
      }, t('header:help.question'))), React.createElement(_Menu.Item, null, React.createElement("a", {
        href: "https://mp.weixin.qq.com/mp/homepage?__biz=MzU3MDY4Mjg5Mg==&hid=1&sn=bf68889a560a893a4936fb018b560966",
        target: "_blank",
        rel: "noopener noreferrer"
      }, t('header:help.classroom'))), React.createElement(_Menu.Item, null, React.createElement("a", {
        href: "https://mp.weixin.qq.com/mp/homepage?__biz=MzI3OTg3MDQ5NA==&hid=1&sn=9350c778ac3f87dce7bf8b208a4abe21",
        target: "_blank",
        rel: "noopener noreferrer"
      }, t('header:help.articles')))), React.createElement(SubMenu$1, {
        title: React.createElement("span", null, React.createElement(_Icon, {
          type: "global"
        }), isCN() ? '简体中文' : 'English')
      }, React.createElement(_Menu.Item, {
        key: "zh"
      }, "\u7B80\u4F53\u4E2D\u6587"), React.createElement(_Menu.Item, {
        key: "en"
      }, "English"))));
    };

    _this.renderUserInfo = function () {
      var _this$props2 = _this.props,
          userInfo = _this$props2.userInfo,
          t = _this$props2.t,
          logout = _this$props2.logout;

      var _ref2 = userInfo || {},
          id = _ref2.id,
          avatar = _ref2.avatar;

      var menu = React.createElement("div", {
        className: styles$1.dropdown
      }, React.createElement(_Menu, {
        onClick: function onClick(_ref3) {
          var key = _ref3.key;

          if (key === 'logout') {
            logout();
          }
        }
      }, React.createElement(_Menu.Item, {
        key: "mining"
      }, React.createElement(Link, {
        to: "/setting/mining"
      }, t('header:accountmining'))), React.createElement(_Menu.Item, {
        key: "follow"
      }, React.createElement(Link, {
        to: "/setting/follow"
      }, t('header:user.follow'))), React.createElement(_Menu.Item, {
        key: "account"
      }, React.createElement(Link, {
        to: "/setting/account"
      }, t('header:user.default'))), React.createElement(_Menu.Item, {
        key: "notice"
      }, React.createElement(Link, {
        to: "/setting/notice"
      }, t('header:user.notice'))), React.createElement(_Menu.Item, {
        key: "userInfo"
      }, React.createElement("a", {
        href: ACCOUNTSYSTEM
      }, t('header:user.setting'))), React.createElement(_Menu.Item, {
        key: "logout"
      }, t('header:logout'))));

      if (!id) {
        return React.createElement("div", null, React.createElement("a", {
          href: "".concat(ACCOUNTSYSTEM, "/login")
        }, t('header:login')), " / ", React.createElement("a", {
          href: "".concat(ACCOUNTSYSTEM, "/register")
        }, t('header:register')));
      }

      return React.createElement(_Dropdown, {
        overlay: menu,
        placement: "bottomRight"
      }, React.createElement("img", {
        src: avatar || require('../assets/svg/icon-user.svg'),
        alt: ""
      }));
    };

    return _this;
  }

  _createClass(WapHeader, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var visible = this.state.visible;
      return React.createElement("div", {
        className: styles$1.WapHeader
      }, React.createElement("span", {
        className: styles$1.navMenu
      }, React.createElement("i", {
        className: "icon iconfont",
        onClick: function onClick() {
          _this2.setState({
            visible: !visible
          });
        }
      }, "\uE600")), React.createElement("span", {
        className: styles$1.userMenu
      }, this.renderUserInfo()), this.renderNavDrawer());
    }
  }]);

  return WapHeader;
}(Component);

var loadPath = isTestEnv() ? "https://api.locize.io/e21fe6cf-426d-4d02-b308-5fbf4ca52e62/latest/{{lng}}/{{ns}}" : isStableEnv() ? "https://i18n.res.ethfans.org/e21fe6cf-426d-4d02-b308-5fbf4ca52e62/latest/{{lng}}/{{ns}}" : "https://i18n.res.ethfans.org/e21fe6cf-426d-4d02-b308-5fbf4ca52e62/prod/{{lng}}/{{ns}}?version=".concat(process.version);
i18next.use(Backend).use(LngDetector).use(initReactI18next).init({
  fallbackLng: {
    'zh-Hant': ['zh'],
    'zh-TW': ['zh'],
    'zh-CN': ['zh'],
    'zh-Hans-CN': ['zh'],
    'zh-SG': ['zh'],
    'zh-HK': ['zh'],
    'zh-Hans': ['zh'],
    'en-US': ['en'],
    default: ['zh']
  },
  debug: false,
  preload: ['zh', 'en'],
  ns: ['footer'],
  defaultNS: 'footer',
  // interpolation: {
  //   escapeValue: false,
  // },
  react: {
    wait: true,
    bindI18n: 'languageChanged loaded',
    bindStore: 'added removed'
  },
  backend: {
    loadPath: loadPath,
    allowMultiLoading: false,
    crossDomain: true,
    withCredentials: false
  },
  detection: {
    // order and from where user language should be detected
    order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'subdomain'],
    // keys or params to lookup language from
    lookupQuerystring: 'lng',
    lookupCookie: 'i18next',
    lookupLocalStorage: 'i18nextLng',
    lookupFromPathIndex: 0,
    lookupFromSubdomainIndex: 0,
    // cache user language on
    caches: ['localStorage', 'cookie'],
    excludeCacheFor: ['cimode'],
    // languages to not persist (cookie, localStorage)
    // optional expire and domain for set cookie
    cookieMinutes: 10,
    cookieDomain: 'sparkpool.com',
    // optional htmlTag with lang attribute, the default is:
    htmlTag: document.documentElement
  }
});

var css$2 = ".index-module_CommonHader__3lQbp {\n  position: relative;\n  z-index: 1;\n}\n@media screen and (min-width: 769px) {\n  .index-module_webHeader__N9UwD {\n    display: block;\n  }\n  .index-module_wapHeader__3EuVt {\n    display: none;\n  }\n}\n@media screen and (max-width: 768px) {\n  .index-module_webHeader__N9UwD {\n    display: none;\n  }\n  .index-module_wapHeader__3EuVt {\n    display: block;\n  }\n}\n";
var styles$2 = {"CommonHader":"index-module_CommonHader__3lQbp","webHeader":"index-module_webHeader__N9UwD","wapHeader":"index-module_wapHeader__3EuVt"};
styleInject(css$2);

var CommonHader = function CommonHader(_ref) {
  var i18n = _ref.i18n,
      theme = _ref.theme,
      userInfo = _ref.userInfo,
      poolStatusData = _ref.poolStatusData,
      t = _ref.t,
      logout = _ref.logout;
  var translate;
  var languageHandler; // 判断是否配置了国际化

  if (t === undefined) {
    // 未指定国际化内容,引入自带的国际化配置
    var _useTranslation = useTranslation('header', {
      useSuspense: false,
      i18n: i18next
    }),
        _t = _useTranslation.t,
        ready = _useTranslation.ready;

    if (!ready) {
      return null;
    }

    translate = _t;
  } // 判断是否配置了国际化


  if (i18n === undefined) {
    languageHandler = i18next;
  }

  return React.createElement("div", {
    className: styles$2.CommonHader
  }, React.createElement("div", {
    className: styles$2.webHeader
  }, React.createElement(WebHeader, {
    theme: theme,
    userInfo: userInfo,
    poolStatus: poolStatusData,
    t: t || translate,
    logout: logout
  })), React.createElement("div", {
    className: styles$2.wapHeader
  }, React.createElement(WapHeader, {
    i18n: i18n || languageHandler,
    t: t || translate,
    userInfo: userInfo,
    logout: logout
  })));
};

export default CommonHader;
