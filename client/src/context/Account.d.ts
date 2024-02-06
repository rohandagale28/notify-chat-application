export interface Account {
  _id: any;
  iss: string;
  nbf: number;
  aud: string;
  sub: string;
  email: string;
  email_verify: boolean;
  azp: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
  jti: string;
  contact_list: Array<{ name: string; sub: string; picture: string }>;
  request_list: Array[{ name: string; sub: string; picture: string }];
}
