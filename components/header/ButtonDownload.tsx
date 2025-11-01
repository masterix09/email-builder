import { ColumnElementWithoutIcon } from "@/lib/features/columns/columnSlice";
import React from "react";
import { Button } from "../ui/button";
import { Download } from "lucide-react";
import { handleDownloadHTML } from "@/lib/header";

const ButtonDownload = ({
  columns,
}: {
  columns: ColumnElementWithoutIcon[];
}) => {
  
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => handleDownloadHTML(columns)}
      disabled={columns.length === 0}
      className="gap-2"
    >
      <Download className="size-4" />
      Scarica HTML
    </Button>
  );
};

export default ButtonDownload;
