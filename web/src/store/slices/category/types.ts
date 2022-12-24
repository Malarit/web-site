export interface categoryType {
  id: number;
  left: number;
  right: number;
  level: number;
  name: string;
  parent_id: number | null;
  tree_id: number;
  visible: boolean | null;
}