import { CategoryNode, CategoryPath } from "../../domain/embeddedTypes.js";
export function extractCategoryPaths(rawCategories: any): CategoryPath[] {
  if (!Array.isArray(rawCategories)) return [];

  const paths: CategoryPath[] = [];

  const buildPath = (node: any, acc: CategoryNode[]) => {
    if (!node) return;
    const current: CategoryNode = {
      id: node.id,
      name: String(node.name ?? ""),
      level: node.level ?? acc.length,
      order: node.order ?? null,
    };
    const nextAcc = [...acc, current];
    const children = Array.isArray(node.categories) ? node.categories : [];
    if (children.length === 0) {
      paths.push({ nodes: nextAcc });
      return;
    }
    for (const child of children) buildPath(child, nextAcc);
  };

  for (const root of rawCategories) buildPath(root, []);
  return paths
    .map((p) => ({
      nodes: p.nodes.filter((n) => n.id > 0 && n.name.length > 0),
    }))
    .filter((p) => p.nodes.length > 0);
}
