export type CategoryNode = {
  id: number;
  name: string;
  level: number;
  order: number;
};

export type CategoryPath = {
  nodes: CategoryNode[];
};

export type ProductPrice = {
  unitPrice: number;
  quantity: number;
};

export type CategoryTreeNode = {
  id: number;
  name: string;
  level: number;
  order: number;
  children: CategoryTreeNode[];
};
