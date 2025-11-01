"use client";
import React from "react";
import { Mail } from "lucide-react";
import { useAppSelector } from "@/lib/hooks";
import { selectColumns } from "@/lib/features/columns/columnSlice";
import ButtonDeleteAll from "./ButtonDeleteAll";
import ButtonCopy from "./ButtonCopy";
import ButtonDownload from "./ButtonDownload";
import ButtonAnteprima from "./ButtonAnteprima";

const Header = () => {
  const columns = useAppSelector(selectColumns);

  return (
    <header className="w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between gap-4 px-6 h-14">
        {/* Logo e Titolo */}
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary text-primary-foreground">
            <Mail className="size-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              Email Builder
            </h1>
            <p className="text-xs text-muted-foreground">
              Crea email professionali in modo semplice
            </p>
          </div>
        </div>

        {/* Azioni */}
        <div className="flex items-center gap-2">
          {/* Copia HTML */}
          <ButtonCopy columns={columns} />

          {/* Scarica HTML */}
          <ButtonDownload columns={columns} />

          {/* Pulisci tutto */}
          <ButtonDeleteAll columns={columns} />

          {/* Anteprima */}
          <ButtonAnteprima columns={columns} />
        </div>
      </div>
    </header>
  );
};

export default Header;
