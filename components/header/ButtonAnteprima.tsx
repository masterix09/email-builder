import React from "react";
import { Button } from "../ui/button";
import { ColumnElementWithoutIcon } from "@/lib/features/columns/columnSlice";
import { handlePreview } from "@/lib/header";
import { EyeIcon } from "lucide-react";

const ButtonAnteprima = ({
  columns,
}: {
  columns: ColumnElementWithoutIcon[];
}) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => handlePreview(columns)}
      disabled={columns.length === 0}
      className="gap-2"
    >
      <EyeIcon className="size-4" />
      Anteprima
    </Button>
  );
};

export default ButtonAnteprima;
