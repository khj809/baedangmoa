/**
 * Object의 nested property를 포함한 property의 path를 resolve합니다.
 * @param obj 대상 Object
 * @param path property path (ex. "company.ticker")
 * @param separator nested property들의 구분자 (default: ".")
 */
export function resolve(obj: object, path: string, separator: string = ".") {
  var properties = path.split(separator);
  return properties.reduce((prev, curr) => prev && prev[curr], obj);
}
