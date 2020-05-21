export interface Post {
    _id: string;
    username: string;
    nickname: string;
    title: string;
    authorId?: string;
    text: string;
    date: Date;
    comments?: Comment[];
  }

export interface Comment {
    nickname: string;
    username: string;
    comment: string;
    date: string;
    _id: string;
  }
