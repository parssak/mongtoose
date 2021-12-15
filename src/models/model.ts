import { DeleteResult, MongoClient } from "mongodb";

class Model<T> {
  private static databaseName = "database-name";
  private static client: MongoClient;
  private collectionName: string = "";

  constructor(collection: string) {
    this.collectionName = collection;
  }

  static setup(databaseName: string, client: MongoClient) {
    Model.databaseName = databaseName;
    this.client = client;
  }

  public async create(document: T) {
    await Model.client
      .db(Model.databaseName)
      .collection(this.collectionName)
      .insertOne(document);
    return document;
  }

  public async createMany(documents: T[]) {
    await Model.client
      .db(Model.databaseName)
      .collection(this.collectionName)
      .insertMany(documents);
  }

  public async find(filter?: any): Promise<T[] | undefined> {
    // @ts-ignore
    return await Model.client
      .db(Model.databaseName)
      .collection(this.collectionName)
      .find(filter)
      .toArray();
  }

  public async findOne(filter?: any): Promise<T | undefined> {
    return (await Model.client
      .db(Model.databaseName)
      .collection(this.collectionName)
      .findOne(filter)) as T | undefined;
  }

  public async delete(filter: any): Promise<DeleteResult> {
    return await Model.client
      .db(Model.databaseName)
      .collection(this.collectionName)
      .deleteOne(filter);
  }

  public async updateOne(filter: any, document: T) {
    return await Model.client
      .db(Model.databaseName)
      .collection(this.collectionName)
      .updateOne(filter, { $set: document });
  }

  public async updateOnesElement(filter: any, key: string, newValue: string) {
    return await Model.client
      .db(Model.databaseName)
      .collection(this.collectionName)
      .updateOne(filter, { $set: { [key]: newValue } });
  }

  public async addToArray(filter: any, arrayName: string, document: any) {
    return await Model.client
      .db(Model.databaseName)
      .collection(this.collectionName)
      .updateOne(filter, { $addToSet: { [arrayName]: document } });
  }

  public async deleteFromArray(filter: any, arrayName: string, document: any) {
    return await Model.client
      .db(Model.databaseName)
      .collection(this.collectionName)
      .updateOne(filter, { $pull: { [arrayName]: { $in: [document] } } });
  }

  public async update(filter: any, document: T) {
    return await Model.client
      .db(Model.databaseName)
      .collection(this.collectionName)
      .updateMany(filter, { $set: document });
  }

  public async deleteAll() {
    return await Model.client
      .db(Model.databaseName)
      .collection(this.collectionName)
      .deleteMany({});
  }
}

export function setup(databaseName: string, client: MongoClient): void {
  Model.setup(databaseName, client);
}

export default function model<T>(collection: string): Model<T> {
  return new Model<T>(collection);
}
