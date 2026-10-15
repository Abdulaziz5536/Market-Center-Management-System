import type { Request, Response } from "express";
export declare const addUnit: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getUnits: (req: Request, res: Response) => Promise<void>;
export declare const getUnit: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateUnit: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteUnit: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=unit-controller.d.ts.map