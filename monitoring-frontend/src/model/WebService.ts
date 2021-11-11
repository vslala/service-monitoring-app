import {HealthStatus} from "./HealthHistory";

interface WebService {
    id: number
    name: string
    url: string
    createdAt: string;
    healthHistory:HealthStatus[]
    _links: any
}

export interface WebServices {
    services: WebService[]
}

export default WebService;