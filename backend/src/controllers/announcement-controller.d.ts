import type { Request, Response } from "express";
export declare const createAnnouncement: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAnnouncements: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAnnouncement: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateAnnouncement: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteAnnouncement: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=announcement-controller.d.ts.map