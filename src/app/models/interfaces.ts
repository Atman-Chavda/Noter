export interface Category {
  id: string;
  name: string;
  createdAt: Date;
}

export interface Note {
  id: string;
  categoryId: string;
  title: string;
  content: string;
  createdAt: Date;
}
