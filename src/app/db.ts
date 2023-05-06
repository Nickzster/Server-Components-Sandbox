import fs from "fs";
import path from "path";

const DB_FILE_NAME = "db.txt";

const DB_PATH = path.join(process.cwd(), DB_FILE_NAME);

const createDBFile = () => {
  fs.writeFileSync(DB_PATH, "");
};

const appendToDb = (contentsToAppend: string) => {
  fs.appendFileSync(DB_PATH, `${contentsToAppend}\n`);
};

const openDBFile = () => {
  try {
    const fileBuffer = fs.readFileSync(DB_PATH);
    const fileContents = fileBuffer.toString();
    const fileContentsAsArray = fileContents.trim().split("\n");
    return fileContentsAsArray;
  } catch (err) {
    console.error("Error", err);
    createDBFile();
    return [];
  }
};

class InMemoryDB {
  private static instance: InMemoryDB;
  public constructor() {
    return this;
  }

  public addToDb(newItem: string) {
    appendToDb(newItem);
    return this;
  }

  public readDb() {
    return openDBFile();
  }

  public static connect() {
    if (!InMemoryDB.instance) {
      InMemoryDB.instance = new InMemoryDB();
    }
    return InMemoryDB.instance;
  }
}

export default InMemoryDB;
