import firebase from "../firebase";
import IUserData from "../types/type"

const db = firebase.ref("/users");

class UserDataService {
  getAll() {
    return db;
  }

  create(tutorial: IUserData) {
    return db.push(tutorial);
  }

  update(key: string, value: any) {
    return db.child(key).update(value);
  }

  delete(key: string) {
    return db.child(key).remove();
  }

  deleteAll() {
    return db.remove();
  }
}

export default new UserDataService();
