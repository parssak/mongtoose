import { MongoClient } from "mongodb";
import { setup } from "./models/model";
import User from "./models/User";

const main = async () => {
  const dbClient = new MongoClient("<ADD URL HERE>", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as any);

  await dbClient.connect();
  setup("<ADD DB NAME HERE>", dbClient);

  const user = await User.create({
    name: "John",
    age: 30,
  });

  console.log(user);
};

main();