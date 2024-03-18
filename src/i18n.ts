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
      "Change photo for your assistant": "Change photo for your assistant",
      "Assistant Name" : "Assistant Name",
      "Your assistant name": "Your assistant name",
      "Description" : "Description",
      "Your description for your assistant": "Your description for your assistant",
      "Define your own prompt list": "Define your own prompt list",
      "Publish to market": "Publish to market",
      "Cancel": "Cancel",
      "Submit": "Submit",
      "add image": "add image",
      "Photos": "Photos",
      "Detailed Description": "Detailed Description",
      "Your detail description for your assistant": "Your detail description for your assistant",
      "Item Name": "Item Name",
      "Prompt for this item": "Prompt for this item",
      "add prompt": "add prompt",
      "Enter your comment here...": "Enter your comment here...",
      "Enter your message here...": "Enter your message here...",
      "Use": "Use",
      "Modify": "Modify",
      "Fill the table template and start messaging with your own assistant!": "Fill the table template and start messaging with your own assistant!",
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
      "Change photo for your assistant": "为你的机器人更换头像",
      "Assistant Name" : "机器人名称",
      "Your assistant name": "为你的机器人取名",
      "Description" : "简介",
      "Your description for your assistant": "简要介绍你的机器人",
      "Define your own prompt list": "定义机器人的提示列表",
      "Publish to market": "发布到市场",
      "Cancel": "取消",
      "Submit": "提交",
      "add image": "添加图片",
      "Photos": "详情图片",
      "Detailed Description": "详细介绍",
      "Your detail description for your assistant": "详细介绍你的机器人",
      "Item Name": "项目名称",
      "Prompt for this item": "项目对应的提示",
      "add prompt": "添加提示",
      "Enter your message here...": "发送消息...",
      "Enter your comment here...": "在这里输入你的评论...",
      "Use": "去使用",
      "Modify": "修改",
      "Fill the table template and start messaging with your own assistant!": "填写模板表单，开始你和AI助手的对话吧！"
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
