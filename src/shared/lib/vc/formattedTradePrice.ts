export function formatTradePrice(
  price: number,
): string {
  const hundredMillion = 100_000_000;

  return `${(
    price / hundredMillion
  ).toLocaleString('ko-KR', {
    maximumFractionDigits: 0,
  })}억`;
}

