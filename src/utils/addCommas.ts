export function 세자리콤마추가(num: number): string {
  let numStr: string = num.toString();

  return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function 점수최대치처리(num: number): string {
  if (num < 99999) return 세자리콤마추가(num);

  return "99,999+";
}
