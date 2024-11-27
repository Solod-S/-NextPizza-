/**
 * функция для округления ссумы к сотым
 *
 * @param value  - nubmer число (10.021333)
 *
 *  @returns - nubmer результат (10.02)
 */
export function roundMoney(value: number): number {
  return Math.round(value * 100) / 100;
}
