import mongoose, { Schema } from "mongoose";
declare const Unit: mongoose.Model<{
    unitId: string;
    area?: string | null;
    type?: string | null;
    monthlyRent?: number | null;
    status: "Available" | "Occupied";
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    unitId: string;
    area?: string | null;
    type?: string | null;
    monthlyRent?: number | null;
    status: "Available" | "Occupied";
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    unitId: string;
    area?: string | null;
    type?: string | null;
    monthlyRent?: number | null;
    status: "Available" | "Occupied";
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    unitId: string;
    area?: string | null;
    type?: string | null;
    monthlyRent?: number | null;
    status: "Available" | "Occupied";
}, mongoose.Document<unknown, {}, {
    unitId: string;
    area?: string | null;
    type?: string | null;
    monthlyRent?: number | null;
    status: "Available" | "Occupied";
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    unitId: string;
    area?: string | null;
    type?: string | null;
    monthlyRent?: number | null;
    status: "Available" | "Occupied";
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    unitId: string;
    area?: string | null;
    type?: string | null;
    monthlyRent?: number | null;
    status: "Available" | "Occupied";
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    unitId: string;
    area?: string | null;
    type?: string | null;
    monthlyRent?: number | null;
    status: "Available" | "Occupied";
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default Unit;
//# sourceMappingURL=unit-model.d.ts.map