import { CategoryPath } from "../embeddedTypes";
import { CategoryTreeNode } from "../embeddedTypes";

export function buildCategoryTreeFromPaths(
  paths: CategoryPath[],
): CategoryTreeNode[] {
  const roots: CategoryTreeNode[] = [];

  // child index per parent ("root" for top-level)
  const childrenIndex = new Map<
    number | "root",
    Map<number, CategoryTreeNode>
  >();

  const getChildrenMap = (parentId: number | "root") => {
    let m = childrenIndex.get(parentId);
    if (!m) {
      m = new Map();
      childrenIndex.set(parentId, m);
    }
    return m;
  };

  for (const path of paths) {
    let parentKey: number | "root" = "root";
    let parentNode: CategoryTreeNode | undefined;

    for (const node of path.nodes) {
      const siblings = getChildrenMap(parentKey);

      let treeNode = siblings.get(node.id);
      if (!treeNode) {
        treeNode = { ...node, children: [] };
        siblings.set(node.id, treeNode);

        if (parentNode) parentNode.children.push(treeNode);
        else roots.push(treeNode);
      }

      parentNode = treeNode;
      parentKey = treeNode.id;
    }
  }

  // optional: sort once at the end
  sortTree(roots);
  return roots;
}

function sortTree(nodes: CategoryTreeNode[]): void {
  nodes.sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
  for (const n of nodes) sortTree(n.children);
}
