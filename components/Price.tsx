import { formatPrice } from "@/lib/money";

const Price = ({
  amount,
  className,
  currencyCode = "USD",
}: {
  amount: string;
  className?: string;
  currencyCode: string;
} & React.ComponentProps<"p">) => (
  <p suppressHydrationWarning={true} className={className}>
    {formatPrice({ amount, currencyCode })}
  </p>
);

export default Price;
