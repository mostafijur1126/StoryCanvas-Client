"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

const TicketWidget = ({
  ticketPrice,
  totalCapacity,
}: {
  ticketPrice: number;
  totalCapacity: number;
}) => {
  const [quantity, setQuantity] = useState(1);

  const decrease = () => setQuantity((q) => Math.max(1, q - 1));
  const increase = () =>
    setQuantity((q) => Math.min(totalCapacity || 10, q + 1));

  return (
    <div className="rounded-2xl border border-border/40 bg-card p-6">
      <div className="mb-4">
        <span className="text-2xl font-bold">${ticketPrice}</span>
        <span className="text-sm text-muted-foreground"> / per ticket</span>
      </div>

      <div className="mb-4 flex items-center justify-between rounded-lg border border-border/40 px-3 py-2">
        <span className="text-sm text-muted-foreground">Quantity</span>
        <div className="flex items-center gap-3">
          <button
            onClick={decrease}
            aria-label="Decrease quantity"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-border/40 hover:bg-muted transition-colors"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-4 text-center text-sm font-medium">
            {quantity}
          </span>
          <button
            onClick={increase}
            aria-label="Increase quantity"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-border/40 hover:bg-muted transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <button className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600">
        Register Now — ${ticketPrice * quantity}
      </button>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        {totalCapacity} total seats available
      </p>
    </div>
  );
};

export default TicketWidget;
