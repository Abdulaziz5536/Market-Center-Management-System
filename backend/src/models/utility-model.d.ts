import mongoose, { Schema } from "mongoose";
declare const Utility: mongoose.Model<{
    unit: mongoose.Types.ObjectId;
    utilityType: "Electricity" | "Other" | "Water";
    billingMonth: string;
    amount: number;
    dueDate: string;
    status: "Overdue" | "Paid" | "Pending";
    receiptFile?: {
        name?: string | null;
        type?: string | null;
        data?: string | null;
    } | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    unit: mongoose.Types.ObjectId;
    utilityType: "Electricity" | "Other" | "Water";
    billingMonth: string;
    amount: number;
    dueDate: string;
    status: "Overdue" | "Paid" | "Pending";
    receiptFile?: {
        name?: string | null;
        type?: string | null;
        data?: string | null;
    } | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    unit: mongoose.Types.ObjectId;
    utilityType: "Electricity" | "Other" | "Water";
    billingMonth: string;
    amount: number;
    dueDate: string;
    status: "Overdue" | "Paid" | "Pending";
    receiptFile?: {
        name?: string | null;
        type?: string | null;
        data?: string | null;
    } | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    unit: mongoose.Types.ObjectId;
    utilityType: "Electricity" | "Other" | "Water";
    billingMonth: string;
    amount: number;
    dueDate: string;
    status: "Overdue" | "Paid" | "Pending";
    receiptFile?: {
        name?: string | null;
        type?: string | null;
        data?: string | null;
    } | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    unit: mongoose.Types.ObjectId;
    utilityType: "Electricity" | "Other" | "Water";
    billingMonth: string;
    amount: number;
    dueDate: string;
    status: "Overdue" | "Paid" | "Pending";
    receiptFile?: {
        name?: string | null;
        type?: string | null;
        data?: string | null;
    } | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    unit: mongoose.Types.ObjectId;
    utilityType: "Electricity" | "Other" | "Water";
    billingMonth: string;
    amount: number;
    dueDate: string;
    status: "Overdue" | "Paid" | "Pending";
    receiptFile?: {
        name?: string | null;
        type?: string | null;
        data?: string | null;
    } | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    unit: mongoose.Types.ObjectId;
    utilityType: "Electricity" | "Other" | "Water";
    billingMonth: string;
    amount: number;
    dueDate: string;
    status: "Overdue" | "Paid" | "Pending";
    receiptFile?: {
        name?: string | null;
        type?: string | null;
        data?: string | null;
    } | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    unit: mongoose.Types.ObjectId;
    utilityType: "Electricity" | "Other" | "Water";
    billingMonth: string;
    amount: number;
    dueDate: string;
    status: "Overdue" | "Paid" | "Pending";
    receiptFile?: {
        name?: string | null;
        type?: string | null;
        data?: string | null;
    } | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default Utility;
//# sourceMappingURL=utility-model.d.ts.map