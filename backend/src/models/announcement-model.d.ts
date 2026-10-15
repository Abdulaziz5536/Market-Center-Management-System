import mongoose, { Schema } from "mongoose";
declare const Announcement: mongoose.Model<{
    title: string;
    announcementType: "Contract" | "Emergency" | "General" | "Maintenance" | "Other" | "Payment" | "Utility";
    message: string;
    audience: "All Tenants" | "Specific Tenants";
    targetTenants: mongoose.Types.ObjectId[];
    scheduledDate: NativeDate;
    deliveryType: "Both" | "Email" | "SMS";
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    title: string;
    announcementType: "Contract" | "Emergency" | "General" | "Maintenance" | "Other" | "Payment" | "Utility";
    message: string;
    audience: "All Tenants" | "Specific Tenants";
    targetTenants: mongoose.Types.ObjectId[];
    scheduledDate: NativeDate;
    deliveryType: "Both" | "Email" | "SMS";
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    title: string;
    announcementType: "Contract" | "Emergency" | "General" | "Maintenance" | "Other" | "Payment" | "Utility";
    message: string;
    audience: "All Tenants" | "Specific Tenants";
    targetTenants: mongoose.Types.ObjectId[];
    scheduledDate: NativeDate;
    deliveryType: "Both" | "Email" | "SMS";
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    title: string;
    announcementType: "Contract" | "Emergency" | "General" | "Maintenance" | "Other" | "Payment" | "Utility";
    message: string;
    audience: "All Tenants" | "Specific Tenants";
    targetTenants: mongoose.Types.ObjectId[];
    scheduledDate: NativeDate;
    deliveryType: "Both" | "Email" | "SMS";
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    title: string;
    announcementType: "Contract" | "Emergency" | "General" | "Maintenance" | "Other" | "Payment" | "Utility";
    message: string;
    audience: "All Tenants" | "Specific Tenants";
    targetTenants: mongoose.Types.ObjectId[];
    scheduledDate: NativeDate;
    deliveryType: "Both" | "Email" | "SMS";
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    title: string;
    announcementType: "Contract" | "Emergency" | "General" | "Maintenance" | "Other" | "Payment" | "Utility";
    message: string;
    audience: "All Tenants" | "Specific Tenants";
    targetTenants: mongoose.Types.ObjectId[];
    scheduledDate: NativeDate;
    deliveryType: "Both" | "Email" | "SMS";
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    title: string;
    announcementType: "Contract" | "Emergency" | "General" | "Maintenance" | "Other" | "Payment" | "Utility";
    message: string;
    audience: "All Tenants" | "Specific Tenants";
    targetTenants: mongoose.Types.ObjectId[];
    scheduledDate: NativeDate;
    deliveryType: "Both" | "Email" | "SMS";
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    title: string;
    announcementType: "Contract" | "Emergency" | "General" | "Maintenance" | "Other" | "Payment" | "Utility";
    message: string;
    audience: "All Tenants" | "Specific Tenants";
    targetTenants: mongoose.Types.ObjectId[];
    scheduledDate: NativeDate;
    deliveryType: "Both" | "Email" | "SMS";
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default Announcement;
//# sourceMappingURL=announcement-model.d.ts.map