import { Task } from "./types";

function generateRandomFirmName(): string {
    const names = ["Firm A", "Firm B", "Firm C", "Firm D", "Firm E"];
    return names[Math.floor(Math.random() * names.length)];
}

function generateRandomUEI(): string {
    const ueis = ["UEI1", "UEI2", "UEI3", "UEI4", "UEI5"];
    return ueis[Math.floor(Math.random() * ueis.length)];
}

function generateRandomCertification(): string {
    const certifications = ["ISO 9001", "ISO 14001", "ISO 27001", "ISO 45001"];
    return certifications[Math.floor(Math.random() * certifications.length)];
}

function generateRandomApplicationType(): string {
    const applicationTypes = ["New", "Renewal", "Update"];
    return applicationTypes[Math.floor(Math.random() * applicationTypes.length)];
}

function generateRandomDate(): string {
    const start = new Date(2020, 0, 1);
    const end = new Date();
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
}

function generateRandomStatus(): string {
    const statuses = ["Pending", "In Progress", "Completed", "Rejected"];
    return statuses[Math.floor(Math.random() * statuses.length)];
}

export function getDashboardData(taskCnt: number): Task[] {
const tasks: Task[] = [];
for (let i = 0; i < taskCnt; i++) {
    const task: Task = {
        firmName: generateRandomFirmName(),
        uei: generateRandomUEI(),
        certification: generateRandomCertification(),
        applicationType: generateRandomApplicationType(),
        submittedOn: generateRandomDate(),
        dueOn: generateRandomDate(),
        daysInQueue: Math.floor(Math.random() * 30).toString(),
        status: generateRandomStatus(),
        id: i.toString()
    };
    tasks.push(task);
}
return tasks;
}

