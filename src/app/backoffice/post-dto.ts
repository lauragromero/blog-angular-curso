export interface PostDTO{
    _id: string;
    username: string;
    nickname: string;
    title: string;
    authorId: string;
    text: string;
    date: Date;
    comments: Comment[];
}
