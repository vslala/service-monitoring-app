import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {useParams} from 'react-router-dom';
import HealthHistoryServiceV1 from "../service/healthstatus/HealthHistoryServiceV1";
import HealthHistory, {HealthStatus} from "../model/HealthHistory";
import AppHeader from "../component/AppHeader";
import {Col, Container, ListGroup, ProgressBar, Row, Spinner, Table} from "react-bootstrap";

const TimeSeries: FunctionComponent = () => {
    const params = useParams();
    let intervalId = useRef<any>();
    const healthCheckService = new HealthHistoryServiceV1();

    const [healthHistory, setHealthHistory] = useState<HealthHistory>({healthhistory: []});
    const [loader, setLoader] = useState<boolean>(false);

    console.log(params.id);

    const fetchHealthStatus = async () => {
        setLoader(true);
        console.log("Fetch status: ", params.id);
        var health = await healthCheckService.fetchHealthHistoryByServiceId(parseInt(params.id!), 50, 0, "created,desc");
        setHealthHistory(health);

    }

    useEffect(() => {
        intervalId.current = setInterval(() => {
            fetchHealthStatus()
        }, 5000);

        return () => {
            clearInterval(intervalId.current);
        }
    }, []);

    return <>
        <AppHeader/>
        <Container>
            <Row>
                <Col>
                    <h3>Health History</h3>

                    {
                        loader ? <Spinner animation="grow" /> : <></>
                    }
                    {
                        healthHistory.healthhistory.length > 0 ?
                            <table className={"table table-condensed justify-content-center"}>
                                {
                                    healthHistory.healthhistory.map(healthStatus => (
                                        <tr>
                                            <td className={healthStatus.status === "OK" ? "bg-success" : "bg-danger"}>{healthStatus.status}</td>
                                            <td className={"bg-light"}>{healthStatus.created}</td>
                                        </tr>
                                    ))
                                }
                            </table>
                            : <><ProgressBar striped variant="primary" now={80} /></>
                    }


                </Col>
            </Row>
        </Container>
    </>
}

export default TimeSeries;