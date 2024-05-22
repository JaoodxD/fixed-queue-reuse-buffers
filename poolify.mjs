export default function poolify (factory, min, norm, max) {
  const duplicate = (n) => new Array(n).fill().map(() => factory());
  const items = duplicate(norm);

  return (item) => {
    if (item) {
      if (items.length < max) {
        items.push(item);
      }
      return;
    }
    if (items.length < min) {
      const instances = duplicate(norm - items.length);
      items.push(...instances);
    }
    const res = items.pop();
    return res;
  };
};
