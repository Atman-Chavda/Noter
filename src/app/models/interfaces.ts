export interface Category {
  id: string;
  name: string;
}

export interface Note {
  id: string;
  categoryId: string;
  title: string;
  content: string;
  createdAt: Date;
}