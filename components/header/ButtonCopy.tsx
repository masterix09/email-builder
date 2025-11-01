import React, { useState } from "react";
import { Button } from "../ui/button";
import { ColumnElementWithoutIcon } from "@/lib/features/columns/columnSlice";
import { handleCopyHTML } from "@/lib/header";
import { Check, Copy } from "lucide-react";

const ButtonCopy = ({columns}: {columns: ColumnElementWithoutIcon[]}) => {
    const [copied, setCopied] = useState<boolean>(false);
    
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => handleCopyHTML(columns, setCopied)}
      disabled={columns.length === 0}
      className="gap-2"
    >
      {copied ? (
        <>
          <Check className="size-4" />
          Copiato!
        </>
      ) : (
        <>
          <Copy className="size-4" />
          Copia HTML
        </>
      )}
    </Button>
  );
};

export default ButtonCopy;
