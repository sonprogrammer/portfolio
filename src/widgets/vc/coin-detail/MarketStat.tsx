interface MarketStatProps {
  label: string;
  value: string;
  valueClassName?: string;
}

export function MarketStat({
  label,
  value,
  valueClassName = 'text-white',
}: MarketStatProps) {
  return (
    <div className="rounded-2xl bg-white/4 p-4">
      <p className="text-xs text-white/35">
        {label}
      </p>

      <p
        className={`mt-2 text-sm font-medium ${valueClassName}`}
      >
        {value}
      </p>
    </div>
  );
}