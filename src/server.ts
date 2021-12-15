import { MongoClient } from "mongodb";
import model, { setup } from "./models/model";

const main = async () => {
  const dbClient = new MongoClient("<ADD URL HERE>", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as any);

  await dbClient.connect();
  setup("<ADD DB NAME HERE>", dbClient);

  interface IUser {
    name: string;
    age: number;
  }

  const User = model<IUser>("users");

  const user = await User.create({
    name: "John",
    age: 30,
  });

  console.log(user);
};

main();