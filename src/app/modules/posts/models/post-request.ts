export interface PostRequest {
  title: string;
  frontpage: string;
  description: string;
  content: string;
  categoryId: number;
  userId: number;
  tags: number[];
}
