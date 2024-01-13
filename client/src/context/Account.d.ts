export interface Account {
  account: {
    sub: string;
    name: string;
    picture: string;
    contact_list: Array<T>;
  };
}
