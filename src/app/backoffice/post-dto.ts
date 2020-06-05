export interface PostDTO{
    _id: string;
    username: string;
    nickname: string;
    title: string;
    authorId?: string;
    text: string;
    date: Date;
    comments?: CommentDTO[];
}

export interface CommentDTO {
    nickname: string;
    username: string;
    comment: string;
    date: Date;
    _id?: string;
}
