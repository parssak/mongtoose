# Usage

Call `setup()` and pass in the database name, as well as the MongoClient.
> Refer to 'src/server.ts' for the example.

```{typescript}
  const dbClient = new MongoClient("<ADD URL HERE>", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as any);
  await dbClient.connect();
  setup("<ADD DB NAME HERE>", dbClient);
```

Then, to create a Model, simply create the interface and call the `model<T>()`
function, passing the collection name as the parameter.
> Refer to 'src/models/User.ts' for the example.

```{typescript}
  interface IUser {
    name: string;
    age: number;
  }

  const User = model<User>("users");
  export default User
```

Now you're able to use the model in your code.

```{typescript}
  const user = await User.findOne({ name: "John" });
  console.log(user);

  const newUser = await User.create({ name: "John", age: 20 });
  console.log(newUser);
```



