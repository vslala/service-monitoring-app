export interface HealthStatus {
    status:string
    created:string
    _links:any
}

interface HealthHistory {
    healthhistory: HealthStatus[]
}

export default HealthHistory;