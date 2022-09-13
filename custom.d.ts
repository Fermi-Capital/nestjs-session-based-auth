declare namespace Express {
  export interface Request {
    session?: Session;
    account?: Account;
  }
}

interface Session {
  jwt: string;
}

interface Account {
  id: string;
  clientId: string;
}
