
export async function getBotDetail(id: string) {
    let botDetail = {
        id: '1',
        name: 'bot1',
        author: 'user1',
        avator: '/assets/bot-default.png',
        description: 'this is bot1',
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
        comments: [
            {
                id: '1',
                user: 'user1',
                avator: '/assets/user-default.jpg',
                content: 'CommentCommentCommentCommentCommentCommentCommentCommentCommentCommentCommentCommentCommentCommentComment....',
            },
            {
                id: '2',
                user: 'user2',
                avator: '/assets/user-default.jpg',
                content: 'CommentCommentCommentCommentCommentCommentCommentCommentCommentCommentCommentCommentCommentCommentComment....',
            },
            {
                id: '3',
                user: 'user3',
                avator: '/assets/user-default.jpg',
                content: 'CommentCommentCommentCommentCommentCommentCommentCommentCommentCommentCommentCommentCommentCommentComment....',
            },
        ]
    }

    // const res = await get(`/bot/${id}/comments`);

    return comments;
}