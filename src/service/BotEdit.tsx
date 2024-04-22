enum PromptType {
  USER, BOT, SYSTEM
}

export interface fewShot {
  type : PromptType;
  content: string;
}

export interface botEditInfo{
  name: string;
  avatar: string;
  description: string;
  baseModelAPI: string;
  isPublished: boolean;
  detail: string;
  photos: string[] | [];
  isPrompted: boolean;
  promptChats: fewShot[] | [];
  promptKeys: string[] | [];
}

export async function getBotEditInfo(id: string): Promise<botEditInfo> {

    let botDetail = {
        "name": "aaa",
        "avatar": '/assets/bot-default.png',
        "description": "bbbb",
        "baseModelAPI": "GPT-4",
        "isPublished": true,
        "detail": "cccccccccccccccccccccccccccccc",
        "photos": [],
        "isPrompted": true,
        "promptChats": [
            {
              "type": PromptType.SYSTEM,
              "content": "you are a bot."
            },
            {
              "type": PromptType.USER,
              "content": "hello?"
            },
            {
              "type": PromptType.BOT,
              "content": "hello"
            },
            {
                "type": PromptType.USER,
                "content": "1 + 1 = ? "
            },
            {
                "type": PromptType.BOT,
                "content": "1 + 1 = 2"
            },
            
        ],
        "promptKeys": [
          "aaa", "bbb", "ccc", "ddd", "eee"
        ]
    }

    return botDetail;
}