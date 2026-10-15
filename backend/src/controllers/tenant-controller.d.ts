import type { Request, Response } from "express";
export declare const createTenant: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getTenants: (req: Request, res: Response) => Promise<void>;
export declare const getTenant: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateTenant: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteTenant: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=tenant-controller.d.ts.map