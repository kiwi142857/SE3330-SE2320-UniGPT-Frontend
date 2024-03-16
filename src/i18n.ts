import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "Welcome to React": "Welcome to React",
      "Recently Used": "Recently Used",
      "changeLanguage": "切换语言",
      "Favorite": "Favorite",
      "Welcome to UniGPT": "Welcome to UniGPT.",
      "More from market": "More from market",
      " Create your new bot": " Create your new bot",
      "change your avatar": "change your avatar",
      "Username": "Username",
      "change": "change",
      "Write your description here...": "Write your description here...",
      "Created": "Created",
      "Latest": "Latest",
      "Hottest": "Hottest",
    }
  },
  zh: {
    translation: {
      "Welcome to React": "欢迎来到 React",
      "Recently Used": "最近使用",
      "changeLanguage": "change Language",
      "Favorite": "收藏",
      "Welcome to UniGPT": "欢迎来到 UniGPT",
      "More from market": "应用市场",
      " Create your new bot": " 创建你的新机器人",
      "change your avatar": "更换头像",
      "Username": "用户名",
      "change": "更改",
      "Write your description here...": "你的个人简介...",
      "Created": "已创建",
      "Latest": "最新",
      "Hottest": "最热",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // 默认语言
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;