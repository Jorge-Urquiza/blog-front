export interface Role {
  createdBy: number;
  createdAt: string;
  lastModifiedBy: number | null;
  updatedAt: string | null;
  deletedAt: string | null;
  id: number;
  name: string;
  permissions: any[]; // Puedes especificar los tipos de permisos si los conoces
}

export interface User {
  createdBy: number;
  createdAt: string;
  lastModifiedBy: number | null;
  updatedAt: string | null;
  deletedAt: string | null;
  id: number;
  name: string;
  lastName: string;
  username: string;
  password: string;
  status: 'ACTIVE' | 'INACTIVE'; // Asumí posibles valores de status
  roles: Role[];
  scores: any[]; // Puedes especificar el tipo de score si lo conoces
  following: any[]; // Puedes especificar el tipo si lo conoces
  followers: any[]; // Puedes especificar el tipo si lo conoces
}

export interface Category {
  createdBy: number;
  createdAt: string;
  lastModifiedBy: number | null;
  updatedAt: string | null;
  deletedAt: string | null;
  id: number;
  name: string;
}

export interface Tag {
  createdBy: number;
  createdAt: string;
  lastModifiedBy: number | null;
  updatedAt: string | null;
  deletedAt: string | null;
  id: number;
  name: string;
}

export interface Post {
  id: number;
  title: string;
  description: string;
  content: string; // mediumtext
  frontpage: string | null; // mediumtext, puede ser null
  status: 'APPROVED' | 'CREATED' | 'DELETED' | 'REFUSED';
  category: Category;
  approvedBy: number | null;
  createdBy: User;
  tags: Tag[];
  scores: any[]; // Puedes especificar el tipo de score si lo conoces
  comments: any[]; // Puedes especificar el tipo de comentarios si lo conoces
  createdAt: string; // datetime(6)
}

export interface Comment {
  image?: string;
  name?: string;
  date?: string;
  description?: string;
}
