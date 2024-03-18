
export async function getBotDetail(id: string) {
    let botDetail = {
        id: '1',
        name: 'bot1',
        author: 'user1',
        avatar: '/assets/bot-default.png',
        description: "this is bot1. ",
        detail: 'Long description here.Long description here.Long description here.Long description here.Long description here.Long description here.Long description here.Long description here.Long description here.Long description here.Long description here.Long description here.Long description here.Long description here.Long description here.Long description here.Long description here.Long description here.Long description here.Long description here.',
        photos: ['/assets/bot-detail-1.png', '/assets/bot-detail-2.png', '/assets/bot-detail-1.png', '/assets/bot-detail-2.png'],
        like: 100,
        collect: 100
    }

    // const res = await get(`/bot/${id}`);

    return botDetail;
}

export async function getBotComments(id: string) {
    let comments = {
        total: 3,
        items: [
            {
                id: '1',
                name: 'Sue',
                avatar: '/assets/user-1.png',
                content: 'CommentCommentComment CommentCommentComment CommentCommentComment CommentCommentComment CommentCommentComment CommentCommentComment CommentCommentComment CommentCommentComment CommentCommentComment CommentCommentComment CommentCommentComment....',
            },
            {
                id: '2',
                name: 'Frank',
                avatar: '/assets/user-2.png',
                content: 'CommentCommentCommentCommentCommentCommentCommentCommentCommentCommentCommentCommentCommentCommentComment....',
            },
            {
                id: '3',
                name: 'Steve',
                avatar: '/assets/user-3.png',
                content: 'CommentCommentCommentCommentCommentCommentCommentCommentCommentCommentCommentCommentCommentCommentComment....',
            },
        ]
    }

    // const res = await get(`/bot/${id}/comments`);

    return comments;
}
