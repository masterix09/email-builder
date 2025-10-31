"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Mail, Copy, Download, FileText, Trash2, Check } from "lucide-react";
import { useAppSelector } from "@/lib/hooks";
import { selectColumns } from "@/lib/features/counter/columnSlice";
import { useDispatch } from "react-redux";
import { deleteColumn } from "@/lib/features/counter/columnSlice";
import { extractBackgroundColor } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Header = () => {
  const columns = useAppSelector(selectColumns);
  const dispatch = useDispatch();
  const [copied, setCopied] = useState(false);
  const [showClearDialog, setShowClearDialog] = useState(false);

  // Funzione per generare HTML da una colonna
  const generateColumnHTML = (column: typeof columns[0]): string => {
    const bgColor = extractBackgroundColor(column.content);
    const bgStyle = bgColor && bgColor !== "#fff" && bgColor !== "#ffffff" ? `background-color: ${bgColor};` : "";
    
    let childrenHTML = "";
    if (column.children && column.children.length > 0) {
      childrenHTML = column.children
        .map((child) => {
          if (child.type === "text") {
            return `<td style="padding: 10px; vertical-align: top;">${child.content}</td>`;
          } else if (child.type === "image") {
            return `<td style="padding: 10px; vertical-align: top; text-align: center;">${child.content}</td>`;
          }
          return "";
        })
        .join("");
    }

    // Estrae il numero di colonne dalla content (es. "grid grid-cols-2" -> 2)
    const colsMatch = column.content.match(/grid-cols-(\d+)/);
    const numCols = colsMatch ? parseInt(colsMatch[1]) : 1;

    // Se non ci sono children, crea celle vuote
    if (!childrenHTML && numCols > 0) {
      childrenHTML = Array(numCols)
        .fill(0)
        .map(() => '<td style="padding: 10px; vertical-align: top;">&nbsp;</td>')
        .join("");
    }

    // Genera le celle per il numero di colonne specificato
    const tableStyle = bgStyle 
      ? `style="width: 100%; border-collapse: collapse; ${bgStyle}"`
      : 'style="width: 100%; border-collapse: collapse;"';

    // Se è una singola colonna, restituisci un div semplice
    if (numCols === 1) {
      const divStyle = bgStyle 
        ? `style="width: 100%; ${bgStyle}"`
        : 'style="width: 100%;"';
      const childContent = column.children?.[0]?.content || "";
      return `<div ${divStyle}>${childContent}</div>`;
    }

    // Per più colonne, usa una tabella
    return `<table ${tableStyle} role="presentation" cellpadding="0" cellspacing="0" border="0">
      <tr>
        ${childrenHTML}
      </tr>
    </table>`;
  };

  // Genera l'HTML completo dell'email
  const generateEmailHTML = (): string => {
    if (columns.length === 0) {
      return "";
    }

    const columnsHTML = columns.map(generateColumnHTML).join("\n        ");

    return `<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Email</title>
    <!--[if mso]>
    <style type="text/css">
        table {border-collapse:collapse;border-spacing:0;margin:0;}
        div, td {padding:0;}
        div {margin:0 !important;}
    </style>
    <![endif]-->
    <style type="text/css">
        body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #f5f5f5;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
        }
        .email-content {
            padding: 20px;
        }
        img {
            max-width: 100%;
            height: auto;
            display: block;
        }
        table {
            border-collapse: collapse;
            border-spacing: 0;
        }
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
            }
            .email-content {
                padding: 10px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5;">
    <div class="email-container" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <div class="email-content" style="padding: 20px;">
${columnsHTML.split("\n").map((line) => `            ${line}`).join("\n")}
        </div>
    </div>
</body>
</html>`;
  };

  // Copia HTML negli appunti
  const handleCopyHTML = async () => {
    const html = generateEmailHTML();
    if (!html) {
      return;
    }

    try {
      await navigator.clipboard.writeText(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Errore durante la copia:", err);
    }
  };

  // Scarica HTML come file
  const handleDownloadHTML = () => {
    const html = generateEmailHTML();
    if (!html) {
      return;
    }

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "email.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Apre anteprima HTML in una nuova finestra
  const handlePreview = () => {
    const html = generateEmailHTML();
    if (!html) {
      return;
    }

    const newWindow = window.open("", "_blank");
    if (newWindow) {
      newWindow.document.write(html);
      newWindow.document.close();
    }
  };

  // Pulisce tutte le colonne
  const handleClearAll = () => {
    columns.forEach((column) => {
      dispatch(deleteColumn(column.id));
    });
    setShowClearDialog(false);
  };

  return (
    <header className="w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between gap-4 px-6 h-14">
        {/* Logo e Titolo */}
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary text-primary-foreground">
            <Mail className="size-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Email Builder</h1>
            <p className="text-xs text-muted-foreground">Crea email professionali in modo semplice</p>
          </div>
        </div>

        {/* Azioni */}
        <div className="flex items-center gap-2">
          {/* Copia HTML */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyHTML}
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

          {/* Scarica HTML */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadHTML}
            disabled={columns.length === 0}
            className="gap-2"
          >
            <Download className="size-4" />
            Scarica HTML
          </Button>

          {/* Anteprima */}
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreview}
            disabled={columns.length === 0}
            className="gap-2"
          >
            <FileText className="size-4" />
            Anteprima
          </Button>

          {/* Pulisci tutto */}
          <Dialog open={showClearDialog} onOpenChange={setShowClearDialog}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                disabled={columns.length === 0}
                className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="size-4" />
                Pulisci
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Pulisci tutto</DialogTitle>
                <DialogDescription>
                  Sei sicuro di voler eliminare tutte le colonne? Questa azione non può essere annullata.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Annulla
                  </Button>
                </DialogClose>
                <Button
                  variant="destructive"
                  onClick={handleClearAll}
                >
                  Pulisci tutto
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
};

export default Header;

