export interface IArticles {
    title: string;
    author: number;
    description: string;
    content: string;
    searchTags: string[];
    ratting: number;
    likes: number;
    dislikes: number;
    slugUrl: string;
    category: object;
    comments: boolean;
    isPublished: boolean;
    isDeleted: boolean;
}