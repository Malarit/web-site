import { categoryType } from "../store/slices/category/types";

export function drawNestedSetsTree(
  mass: categoryType[],
  ReactElement: React.FC<any>
) {
  let m: JSX.Element[] = [];
  fetchChildElement(m);
  return m.map((obj) => obj);

  function fetchChildElement(
    container: JSX.Element[],
    left?: number,
    right?: number
  ) {
    mass.filter(filterItems);
    return container;

    function filterItems(item: categoryType) {
      if (item.left === (left || 1)) {
        let element: any = [<ReactElement item={item} />];

        if (item.left + 1 < item.right) {
          let childContainer: any[] = [];
          let child = fetchChildElement(
            childContainer,
            item.left + 1,
            item.right - 1
          );
          element.push(<ul>{child.map((e) => e)}</ul>);
        }

        container.push(element);

        if (right && item.right < right) {
          fetchChildElement(container, item.right + 1, right);
        }
      }
    }
  }
}
