import React, {FunctionComponent, useEffect, useRef, useState} from "react";
import {Badge, Button, ListGroup} from "react-bootstrap";
import WebService from "../model/WebService";
import {Link} from "react-router-dom";
import {HealthStatus} from "../model/HealthHistory";
import HealthHistoryServiceV1 from "../service/healthstatus/HealthHistoryServiceV1";

interface Props {
    services: WebService[]
    delete: (id: number) => void
}

interface HealthProps {
    service: WebService
    delete: (id: number) => void
}

const ServiceHealthBadge: FunctionComponent<HealthProps> = (props: HealthProps) => {
    const intervalIdRef = useRef<any>(false);
    const [healthStatus, setHealthStatus] = useState<HealthStatus>({status: "Loading...", _links: [], created: ""});

    const updateHealthHistory = async () => {
        let healthHistoryService = new HealthHistoryServiceV1();
        let healthHistory = await healthHistoryService.fetchHealthHistory(props.service,1, 0, "created,desc");
        if (healthHistory.healthhistory.length > 0) {
            console.log("Health Status: ", healthStatus);
            setHealthStatus(healthHistory.healthhistory[0]);
        }
    }

    useEffect(() => {
        // call immediately at page load
        updateHealthHistory();
        // and schedule for regular update
        intervalIdRef.current = setInterval(() => {
            updateHealthHistory();
        }, 5000);

        return () => clearInterval(intervalIdRef.current);
    }, []);

    return <>
        <Badge bg={healthStatus.status === "OK" ? "success" : "danger"} pill
               style={{margin: "5px"}}>
            {healthStatus.status}
        </Badge>
    </>
}

const ListServices: FunctionComponent<Props> = (props: Props) => {

    const handleDelete = async (id: number) => {
        props.delete(id);
    }

    return <>
        <ListGroup as="ol" numbered>
            {
                props.services.map(service => (
                    <ListGroup.Item key={service.id}
                                    as="li"
                                    className="d-flex justify-content-between align-items-start"
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">
                                <Link to={`/dashboard/service/${service.id}`}>{service.name}</Link>
                            </div>
                            {service.url}
                        </div>
                        <div className={"pull-right"}>
                            <ServiceHealthBadge service={service} delete={() => handleDelete(service.id)}/>
                            <Button variant={"link"} onClick={() => handleDelete(service.id)}>
                                <Badge bg={"dark"} pill>
                                    X
                                </Badge>
                            </Button>
                        </div>

                    </ListGroup.Item>
                ))
            }

        </ListGroup>
    </>
}

export default ListServices;