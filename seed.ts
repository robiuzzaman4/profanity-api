import fs from "fs";
import csv from "csv-parser";

interface Row {
  text: string;
}

async function parseCSV(filePath: string): Promise<Row[]> {
  return new Promise((resolve, reject) => {
    const rows: Row[] = [];

    fs.createReadStream(filePath)
      .pipe(csv({ separator: "," }))
      .on("data", (row: Row) => rows.push(row))
      .on("end", () => resolve(rows))
      .on("error", (error: Error) => reject(error));
  });
}
