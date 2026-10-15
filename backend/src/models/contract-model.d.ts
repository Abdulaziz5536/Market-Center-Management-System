import mongoose, { Schema } from "mongoose";
declare const Contract: mongoose.Model<{
    tenant: mongoose.Types.ObjectId;
    amount: number;
    leaseStartDate: string;
    leaseEndDate: string;
    paymentFrequency: "6 Months" | "Monthly" | "Quarterly" | "Yearly";
    status: "Expired" | "Paid" | "Pending";
    contractFile?: {
        name?: string | null;
        type?: string | null;
        data?: string | null;
    } | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    tenant: mongoose.Types.ObjectId;
    amount: number;
    leaseStartDate: string;
    leaseEndDate: string;
    paymentFrequency: "6 Months" | "Monthly" | "Quarterly" | "Yearly";
    status: "Expired" | "Paid" | "Pending";
    contractFile?: {
        name?: string | null;
        type?: string | null;
        data?: string | null;
    } | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    tenant: mongoose.Types.ObjectId;
    amount: number;
    leaseStartDate: string;
    leaseEndDate: string;
    paymentFrequency: "6 Months" | "Monthly" | "Quarterly" | "Yearly";
    status: "Expired" | "Paid" | "Pending";
    contractFile?: {
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
    tenant: mongoose.Types.ObjectId;
    amount: number;
    leaseStartDate: string;
    leaseEndDate: string;
    paymentFrequency: "6 Months" | "Monthly" | "Quarterly" | "Yearly";
    status: "Expired" | "Paid" | "Pending";
    contractFile?: {
        name?: string | null;
        type?: string | null;
        data?: string | null;
    } | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    tenant: mongoose.Types.ObjectId;
    amount: number;
    leaseStartDate: string;
    leaseEndDate: string;
    paymentFrequency: "6 Months" | "Monthly" | "Quarterly" | "Yearly";
    status: "Expired" | "Paid" | "Pending";
    contractFile?: {
        name?: string | null;
        type?: string | null;
        data?: string | null;
    } | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    tenant: mongoose.Types.ObjectId;
    amount: number;
    leaseStartDate: string;
    leaseEndDate: string;
    paymentFrequency: "6 Months" | "Monthly" | "Quarterly" | "Yearly";
    status: "Expired" | "Paid" | "Pending";
    contractFile?: {
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
    tenant: mongoose.Types.ObjectId;
    amount: number;
    leaseStartDate: string;
    leaseEndDate: string;
    paymentFrequency: "6 Months" | "Monthly" | "Quarterly" | "Yearly";
    status: "Expired" | "Paid" | "Pending";
    contractFile?: {
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
    tenant: mongoose.Types.ObjectId;
    amount: number;
    leaseStartDate: string;
    leaseEndDate: string;
    paymentFrequency: "6 Months" | "Monthly" | "Quarterly" | "Yearly";
    status: "Expired" | "Paid" | "Pending";
    contractFile?: {
        name?: string | null;
        type?: string | null;
        data?: string | null;
    } | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default Contract;
//# sourceMappingURL=contract-model.d.ts.map