import type { Request, Response } from "express";
export declare const createContract: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getContracts: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getContract: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateContract: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteContract: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=contract-controller.d.ts.map