declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        accessLevel: "admin" | "readonly";
      };
    }
  }
}

export {};