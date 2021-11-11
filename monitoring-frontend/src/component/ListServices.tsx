import React, {FunctionComponent} from "react";
import {Badge, Button, ListGroup} from "react-bootstrap";
import WebService from "../model/WebService";

interface Props {
    services: WebService[]
    delete: (id:number) => void
}

const ListServices: FunctionComponent<Props> = (props: Props) => {
    const handleDelete = async (id:number) => {
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
                            <div className="fw-bold">{service.name}</div>
                            {service.url}
                        </div>

                        {
                            service.healthHistory.length > 0 ?
                                <div className={"pull-right"}>
                                    <Badge bg={service.healthHistory[0].status === "OK" ? "success" : "danger"} pill style={{margin: "5px"}}>
                                        {service.healthHistory[0].status}
                                    </Badge>
                                    <Button variant={"link"} onClick={() => handleDelete(service.id)}>
                                        <Badge bg={"dark"} pill>
                                            X
                                        </Badge>
                                    </Button>
                                </div>
                                : <></>
                        }

                    </ListGroup.Item>
                ))
            }

        </ListGroup>
    </>
}

export default ListServices;