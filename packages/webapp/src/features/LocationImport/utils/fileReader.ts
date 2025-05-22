// src/features/LocationImport/utils/fileReader.ts
import * as XLSX from "xlsx";
import { ExcelCellValue } from "../types/locationImport.types";

export const readExcelFile = (
  file: File,
  sheetIdentifier?: string | number
): Promise<ExcelCellValue[][]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      try {
        if (!event.target || !event.target.result) {
          reject(
            new Error("Failed to read file: Event target or result is null.")
          );
          return;
        }

        const data = event.target.result;
        const workbook = XLSX.read(data, { type: "array" });

        let sheetName: string | undefined;

        if (sheetIdentifier === undefined || sheetIdentifier === null) {
          // Default to the first sheet if no identifier is provided
          sheetName = workbook.SheetNames[0];
        } else if (typeof sheetIdentifier === "string") {
          // If identifier is a string, use it as a sheet name
          if (!workbook.SheetNames.includes(sheetIdentifier)) {
            reject(
              new Error(`Sheet with name "${sheetIdentifier}" not found.`)
            );
            return;
          }
          sheetName = sheetIdentifier;
        } else if (typeof sheetIdentifier === "number") {
          // If identifier is a number, use it as a 0-based index
          if (
            sheetIdentifier < 0 ||
            sheetIdentifier >= workbook.SheetNames.length
          ) {
            reject(
              new Error(`Sheet index ${sheetIdentifier} is out of bounds.`)
            );
            return;
          }
          sheetName = workbook.SheetNames[sheetIdentifier];
        } else {
          reject(
            new Error(
              "Invalid sheet identifier type. Must be a string or number."
            )
          );
          return;
        }

        if (!sheetName) {
          reject(
            new Error(
              "No sheets found or specified sheet could not be determined."
            )
          );
          return;
        }

        const worksheet = workbook.Sheets[sheetName];
        if (!worksheet) {
          reject(new Error(`Sheet "${sheetName}" not found or is empty.`));
          return;
        }

        const jsonDataFromSheet: unknown[][] = XLSX.utils.sheet_to_json(
          worksheet,
          {
            header: 1,
            blankrows: false,
            raw: false,
          }
        );
        const processedRows: ExcelCellValue[][] = jsonDataFromSheet
          .filter(
            (row): row is unknown[] =>
              Array.isArray(row) &&
              row.some(
                (cell) => cell !== null && cell !== undefined && cell !== ""
              )
          )
          .map((row) => row.map((cell) => cell as ExcelCellValue)); // Приводим каждую ячейку

        console.log(
          `FILEREADER: Read ${jsonDataFromSheet.length} total rows from sheet, after filtering: ${processedRows.length} rows.`
        );
        resolve(processedRows);
      } catch (e) {
        console.error("Error processing Excel file:", e);
        if (e instanceof Error) {
          reject(new Error(`Error processing Excel file: ${e.message}`));
        } else {
          reject(
            new Error(
              "An unknown error occurred while processing the Excel file."
            )
          );
        }
      }
    };

    reader.onerror = (event: ProgressEvent<FileReader>) => {
      console.error("File reading error:", event);
      reject(new Error("Failed to read file."));
    };

    reader.readAsArrayBuffer(file);
  });
};
