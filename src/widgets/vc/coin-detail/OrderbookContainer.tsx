export function OrderbookContainer({
  market,
  children,
}: {
  market: string;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#111318]">
      <div className="border-b border-white/10 px-5 py-4">
        <h2 className="font-medium text-white">
          실시간 호가
        </h2>

        <p className="mt-1 text-xs text-white/35">
          {market} · 업비트 15호가 기준
        </p>
      </div>

      {children}
    </section>
  );
}