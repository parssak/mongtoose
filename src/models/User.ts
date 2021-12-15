import model from "./model";

interface IUser {
  name: string;
  age: number;
}
const User = model<IUser>("users");

export default User;
