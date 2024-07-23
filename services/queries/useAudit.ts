import { AUDIT_ROUTE } from "@/app/constants/routes";
import useSWR from "swr";
import { AuditResponseType, AuditType } from "../types/AuditType";
import  {faker}  from "@faker-js/faker";

// temp convenience function to generate audit items [mdev]
function generateAuditItems(n: number): AuditType[] {
    const auditItems = []
    for (let i = 0; i < n; i++) {
        auditItems.push({
            date: faker.date.recent().toString(),
            event: `Event ${faker.commerce.department()}`,
            userName: `User ${faker.person.fullName()}`,
            userRole: `Role ${faker.person.jobType()}`,
            details: `Details ${faker.lorem.words(5)}`
        })
    }
    return auditItems
}

export function useAudit(page: number = 1, pageSize: number = 10) {
    //TODO update local fetcher to fetcher from services/fetcher.ts once refactor pr: pull/486 is merged [mdev]
    return useSWR<AuditResponseType>(`${AUDIT_ROUTE}?page=${page}&pageSize=${pageSize}`, fetcher)
}

//TODO using this fetcher function as api does not yet exist, so mocking the response for now [mdev]
export const fetcher = async <T>(url: string): Promise<AuditResponseType> => {
    const pageSize = parseInt(url.split('pageSize=')[1])
    return new Promise(resolve => setTimeout(() => resolve({items: generateAuditItems(pageSize), pageSize}), 1500) )
}

