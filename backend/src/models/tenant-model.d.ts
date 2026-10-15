import mongoose, { Schema } from "mongoose";
declare const Tenant: mongoose.Model<{
    tenantName: string;
    phone: string;
    email?: string | null;
    unit: mongoose.Types.ObjectId;
    moveInDate: string;
    moveOutDate: string;
    idLicenseFile?: {
        name?: string | null;
        type?: string | null;
        data?: string | null;
    } | null;
    leaseAgreementFile?: {
        name?: string | null;
        type?: string | null;
        data?: string | null;
    } | null;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    tenantName: string;
    phone: string;
    email?: string | null;
    unit: mongoose.Types.ObjectId;
    moveInDate: string;
    moveOutDate: string;
    idLicenseFile?: {
        name?: string | null;
        type?: string | null;
        data?: string | null;
    } | null;
    leaseAgreementFile?: {
        name?: string | null;
        type?: string | null;
        data?: string | null;
    } | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    tenantName: string;
    phone: string;
    email?: string | null;
    unit: mongoose.Types.ObjectId;
    moveInDate: string;
    moveOutDate: string;
    idLicenseFile?: {
        name?: string | null;
        type?: string | null;
        data?: string | null;
    } | null;
    leaseAgreementFile?: {
        name?: string | null;
        type?: string | null;
        data?: string | null;
    } | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    tenantName: string;
    phone: string;
    email?: string | null;
    unit: mongoose.Types.ObjectId;
    moveInDate: string;
    moveOutDate: string;
    idLicenseFile?: {
        name?: string | null;
        type?: string | null;
        data?: string | null;
    } | null;
    leaseAgreementFile?: {
        name?: string | null;
        type?: string | null;
        data?: string | null;
    } | null;
}, mongoose.Document<unknown, {}, {
    tenantName: string;
    phone: string;
    email?: string | null;
    unit: mongoose.Types.ObjectId;
    moveInDate: string;
    moveOutDate: string;
    idLicenseFile?: {
        name?: string | null;
        type?: string | null;
        data?: string | null;
    } | null;
    leaseAgreementFile?: {
        name?: string | null;
        type?: string | null;
        data?: string | null;
    } | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    tenantName: string;
    phone: string;
    email?: string | null;
    unit: mongoose.Types.ObjectId;
    moveInDate: string;
    moveOutDate: string;
    idLicenseFile?: {
        name?: string | null;
        type?: string | null;
        data?: string | null;
    } | null;
    leaseAgreementFile?: {
        name?: string | null;
        type?: string | null;
        data?: string | null;
    } | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    tenantName: string;
    phone: string;
    email?: string | null;
    unit: mongoose.Types.ObjectId;
    moveInDate: string;
    moveOutDate: string;
    idLicenseFile?: {
        name?: string | null;
        type?: string | null;
        data?: string | null;
    } | null;
    leaseAgreementFile?: {
        name?: string | null;
        type?: string | null;
        data?: string | null;
    } | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    tenantName: string;
    phone: string;
    email?: string | null;
    unit: mongoose.Types.ObjectId;
    moveInDate: string;
    moveOutDate: string;
    idLicenseFile?: {
        name?: string | null;
        type?: string | null;
        data?: string | null;
    } | null;
    leaseAgreementFile?: {
        name?: string | null;
        type?: string | null;
        data?: string | null;
    } | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default Tenant;
//# sourceMappingURL=tenant-model.d.ts.map