export function 세자리콤마추가(num: number): string {
  let numStr: string = num.toString();

  return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
