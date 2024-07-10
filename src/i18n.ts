import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "changeLanguage": "切换语言",
    }
  },
  zh: {
    translation: {
      // HomePage
      "Recently Used": "最近使用",
      "Favorite": "收藏",
      "More from market": "应用市场",
      "Create your new bot": " 创建你的新机器人",

      // navigator
      "changeLanguage": "change Language",
      "Market": "市场",
      "Bot Create": "创建机器人",
      "UserList": "用户列表",

      // ProfilePage
      "change your avatar": "更换头像",
      "Username": "用户名",
      "change": "更改",
      "Write your description here...": "你的个人简介...",
      "Created": "已创建",
      'Profile': '个人资料',
      "Cancel": "取消",
      'Update': '更新',
      "Maximum 25 characters input": "最多25个字符",
      "Maximum 255 characters input": "最多255个字符",
      'Canvas Url': 'Canvas 订阅',
      "Log in to canvas, click \"Calendar\" - \"Calendar Subscription\", then copy the link to here": "登录到Canvas，点击\"日历\" - \"日历订阅\"，然后复制链接到这里",
      "Logout": "登出",
      "Ban": "禁用",
      "Unban": "解禁",

      // MarketPage
      "Latest": "最新",
      "Hottest": "最热",
      "Bot Market" : "机器人市场",
      "Plugin Market": "插件市场",
      "Create your new plugin": "创建你的新插件",

      // BotEditPage
      "Change photo for your assistant": "为你的机器人更换头像",
      "Assistant Name" : "机器人名称",
      "Your assistant name (max 50 characters)": "为你的机器人取名（最多50个字符）",
      "Description" : "简介",
      "Your description for your assistant (max 255 characters)": "简要介绍你的机器人（最多255个字符）",
      "Base Model": "基础模型",
      "Temperature": "温度",
      "Define your own prompt list": "定义机器人的提示列表",
      "System Prompt": "系统提示",
      "System prompt for your assistant": "你的机器人的系统提示",
      "Few-shot": "对话样本",
      "Prompt for this item": "项目对应的提示",
      "USER": "用户",
      "BOT": "机器人",
      "User Ask": "用户提问",
      "What User will Ask for your assistant": "用户会问你的机器人的内容",
      "Prompt Key": "变量",
      "Add files to knowledge base": "添加文件到知识库",
      "Upload Files": "上传文件",
      "Add plugins": "添加插件",
      "Select Plugin": "选择插件",
      "Confirm": "确认",
      "Publish to market": "发布到市场",
      "Detailed Description": "详细介绍",
      "Your detail description for your assistant (max 255 characters)": "详细介绍你的机器人（最多255个字符）",
      "add image": "添加图片",
      "Photos": "详情图片",
      "Submit": "提交",

      // PluginEditPage
      "Change photo for your plugin": "为你的插件更换头像",
      "Plugin Name": "插件名称",
      "Your plugin name (max 50 characters)": "为你的插件取名（最多50个字符）",
      "Your description for your plugin (max 255 characters)": "简要介绍你的插件（最多255个字符）",
      "Your detail description for your plugin (max 255 characters)": "详细介绍你的插件（最多255个字符）",
      "Plugin Running Logic": "插件运行逻辑",
      "File name": "文件名",
      "no need to add suffix .py": "不需要添加.py后缀",
      "Code": "代码",
      "Parameter": "参数",
      "Type": "类型",
      "Parameter description": "参数说明",

      // BotChatPage
      "Enter your message here...": "发送消息...",
      "Use": "去使用",
      "Edit": "编辑",
      "Chat": "聊天",
      "Fill in the prompt table and start chatting!": "填写表格,然后开始聊天！",
      "Chat History": "对话历史",
      "No chat history yet.": "暂无对话历史",
      "Prompt Table": "提示词表",
      "Delete": "删除",
      "Archive": "归档",
      "Running Process": "运行进度",

      // BotDetailPage
      "Enter your comment here...": "在这里输入你的评论...",
      "Comments": "评论区",
      "Plugins Called": "调用插件",
      "Error": "错误",
      "The bot is not public anymore": "该机器人已不再公开",

      // PluginDetailPage
      "Bots Calling": "调用该插件的机器人",

      // some bot
      "bot0": "机器人0",
      "Programming Debug Assistant": "编程调试助手",
      "Paper Abstract Assistant": "论文摘要助手",
      "Emotional Communication Robot": "情感交流机器人",
      "Paper Proofreading Assistant": "论文润色助手",
      "Paper Translation Assistant": "论文翻译助手",
      "The robot can help you debug your code. It can help you find the bug in your code and give you some suggestions.": "这个机器人可以帮你调试代码，找到代码中的bug并给出一些建议。",
      "The robot can help you polish your paper. It can help you find the grammar mistakes and give you some suggestions.": "这个机器人可以帮你润色论文，找到语法错误并给出一些建议。",
      "The robot can help you translate your paper. It can help you translate the paper to the language you want and give you some suggestions.": "这个机器人可以帮你翻译论文，将论文翻译成你想要的语言并给出一些建议。",
      "The robot can help you write the abstract of your paper. It can help you write the abstract and give you some suggestions.": "这个机器人可以帮你写论文摘要，并给出一些建议。",
      "The robot can play a role in emotional communication. It can communicate with you and give you some suggestions.": "这个机器人可以扮演角色与你交流并给出一些建议。",
      "The robot can help you debug your code. It can help you find the bug in your ..." : "这个机器人可以帮你调试代码，找到代码中的bug并给出一些建议。",
      
      // UserListPage
      "ID": "ID",
      "Name": "名称",
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
