declare global {
  namespace Express {
    interface Request {
      userId?: string;
      user?: {
        userId: string;
        accessLevel: "admin" | "readonly";
      };
    }
  }
}

export {};