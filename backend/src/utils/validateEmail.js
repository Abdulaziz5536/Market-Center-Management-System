import { resolveMx, resolve4, resolve6 } from "node:dns/promises";
import validator from "validator";
export const validateEmailDomain = async (email) => {
    if (!validator.isEmail(email)) {
        return false;
    }
    const domain = email.split("@")[1]?.toLowerCase();
    if (!domain) {
        return false;
    }
    try {
        const mxRecords = await resolveMx(domain);
        if (mxRecords.length > 0) {
            return true;
        }
    }
    catch {
    }
    try {
        const [ipv4, ipv6] = await Promise.allSettled([
            resolve4(domain),
            resolve6(domain),
        ]);
        return (ipv4.status === "fulfilled" ||
            ipv6.status === "fulfilled");
    }
    catch {
        return false;
    }
};
//# sourceMappingURL=validateEmail.js.map