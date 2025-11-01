import { Dispatch } from "react";
import {
  ColumnElementWithoutIcon,
  deleteColumn,
} from "../features/columns/columnSlice";
import { extractBackgroundColor } from "../utils";
import { UnknownAction } from "@reduxjs/toolkit";

// Funzione per generare HTML da una colonna
export const generateColumnHTML = (
  column: ColumnElementWithoutIcon
): string => {
  const bgColor = extractBackgroundColor(column.content);
  const bgStyle =
    bgColor && bgColor !== "#fff" && bgColor !== "#ffffff"
      ? `background-color: ${bgColor};`
      : "";

  const childrenHTML = column.children
    ?.map((child) => {
      if (child.type === "text") {
        return `${child.content}`;
      } else if (child.type === "image") {
        return `${child.content}`;
      } else if (child.type === "button") {
        return `${child.content}`;
      } else if (child.type === "divider") {
        return `${child.content}`;
      } else if (child.type === "spacer") {
        return `${child.content}`;
      } else if (child.type === "link") {
        return `${child.content}`;
      } else if (child.type === "heading") {
        return `${child.content}`;
      }
      return "";
    })
    .join("");

  // // Genera le celle per il numero di colonne specificato
  const tableStyle = bgStyle
    ? `style="width: 100%; border-collapse: collapse; ${bgStyle}"`
    : 'style="width: 100%; border-collapse: collapse;"';

  return `<div ${tableStyle} class="${column.content}">
      ${childrenHTML}
    </div>`;
};

// Genera l'HTML completo dell'email
export const generateEmailHTML = (
  columns: ColumnElementWithoutIcon[]
): string => {
  if (columns.length === 0) {
    return "";
  }
  const columnsHTML = columns.map(generateColumnHTML);
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
        .grid {
            display: grid;
        }
        .grid-cols-1 {
            grid-template-columns: repeat(1, minmax(0, 1fr));
        }
        .grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
        .grid-cols-3 {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }
        .grid-cols-4 {
            grid-template-columns: repeat(4, minmax(0, 1fr));
        }
        .gap-2 {
            gap: 0.5rem;
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
        ${columnsHTML.map((column) => `${column}`).join("\n")}
        </div>
    </div>
</body>
</html>`;
};

// Pulisce tutte le colonne
export const handleClearAll = (
  columns: ColumnElementWithoutIcon[],
  dispatch: Dispatch<UnknownAction>
) => {
  columns.forEach((column) => {
    dispatch(deleteColumn(column.id));
  });
};

// Apre anteprima HTML in una nuova finestra
export const handlePreview = (columns: ColumnElementWithoutIcon[]) => {
  const html = generateEmailHTML(columns);
  if (!html) {
    return;
  }

  const newWindow = window.open("", "_blank");
  if (newWindow) {
    newWindow.document.write(html);
    newWindow.document.close();
  }
};

// Scarica HTML come file
export const handleDownloadHTML = (columns: ColumnElementWithoutIcon[]) => {
  const html = generateEmailHTML(columns);
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

// Copia HTML negli appunti
export const handleCopyHTML = async (columns: ColumnElementWithoutIcon[], setCopied: (copied: boolean) => void) => {
  const html = generateEmailHTML(columns);
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