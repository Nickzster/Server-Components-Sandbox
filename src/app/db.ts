import fs from "fs";
import path from "path";

const DB_FILE_NAME = "db.txt";

const DB_PATH = path.join(process.cwd(), DB_FILE_NAME);

const createDBFile = () => {
  fs.writeFileSync(DB_PATH, "");
};

const DELIMITER = "__@__";

const appendToDb = (contentsToAppend: string, session: string) => {
  fs.appendFileSync(DB_PATH, `${session}${DELIMITER}${contentsToAppend}\n`);
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

  public addToDb(newItem: string, session: string) {
    appendToDb(newItem, session);
    return this;
  }

  public getSessionItems(session?: string) {
    if (!session) return [];
    const fullDb = openDBFile();
    const sessionDb = fullDb
      .filter((dbItem) => {
        const [owner, todoItem] = dbItem.split(DELIMITER);
        console.log(owner, todoItem);
        if (owner === session) return todoItem;
      })
      .map((filteredDbItem) => filteredDbItem.split(DELIMITER).at(1) as string);

    return sessionDb;
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
