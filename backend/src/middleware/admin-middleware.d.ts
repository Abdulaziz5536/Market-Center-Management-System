import type { Request, Response, NextFunction } from "express";
export declare const authenticateUser: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const adminOnly: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=admin-middleware.d.ts.map