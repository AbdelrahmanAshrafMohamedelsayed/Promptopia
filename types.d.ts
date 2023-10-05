export interface OptionsDB {
  dbName: String;
  useNewUrlParser: Boolean;
  useUnifiedTopology: Boolean;
}

export interface sessionUser {
  user: {
    email: String;
    name: String;
    image?: String;
    id?: String;
  };
  expires?: String;
}
export type Providerstype = Record<
  LiteralUnion<BuiltInProviderType, string>,
  ClientSafeProvider
> | null;

export type postType = {
  creator: {
    username: string;
    email: string;
    image: string;
    _id: string;
  };
  prompt: string;
  tag: string;
  _id: string;
};
