export function createItemKeyFromProps(itemProps: string[]) {
  return itemProps.map((item) => item.replace(' ', 'whitespace')).join('itemSpace');
}