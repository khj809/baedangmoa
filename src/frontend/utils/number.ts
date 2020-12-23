export function thousandSeparate(nStr: number | string) {
  nStr = nStr.toString();
  return nStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
