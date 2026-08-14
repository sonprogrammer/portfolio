"use client";

import { Check, Copy, Mail } from "lucide-react";
import { useState } from "react";

interface EmailCopyButtonProps {
  email: string;
}

export function EmailCopyBtn({ email }: EmailCopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(email);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950 px-5 py-3 text-sm font-semibold text-zinc-300 transition-all hover:-translate-y-0.5 hover:border-zinc-600 cursor-pointer"
    >
      <Mail size={16} />

      {copied ? "Copied!" : "Email"}

      {copied ? (
        <Check size={14} />
      ) : (
        <Copy size={14} className="text-zinc-500" />
      )}
    </button>
  );
}