export type CategoryNode = {
  id: number;
  name: string;
  level: number;
  order: number;
};

export type CategoryPath = {
  nodes: CategoryNode[]; // root → leaf
};

export type ProductPrice = {
  unitPrice: number;
  quantity: number;
  quantityUnit: string;
  isApproximate: boolean;
  referencePrice?: number;
  referenceUnit?: string;
  taxPercentage?: number;
};

export type CategoryTreeNode = {
  id: number;
  name: string;
  level: number;
  order: number;
  children: CategoryTreeNode[];
};
