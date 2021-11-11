import React, {FunctionComponent, useEffect, useState} from "react";
import UserServiceV1 from "../service/user/UserServiceV1";
import WebService from "../model/WebService";
import HealthHistoryServiceV1 from "../service/healthstatus/HealthHistoryServiceV1";
import {Navigate} from "react-router-dom";
import WebServiceForm from "../model/WebServiceForm";
import AppHeader from "../component/AppHeader";
import {Col, Container, Row} from "react-bootstrap";
import AddNewService from "../component/AddNewService";
import ListServices from "../component/ListServices";

/**
 *
 * @constructor Varun Shrivastava
 */
const UserDashboardPage: FunctionComponent = () => {
    const userService = new UserServiceV1();

    const [services, setServices] = useState<WebService[]>([]);

    /**
     * iterates over each service and fetches the latest health status for each
     * @param services
     */
    async function updateServiceHealthStatus(services: WebService[]) {
        let servicesWithStatus:WebService[] = [];

        for (let i = 0; i < services.length; i++) {
            let healthHistoryService = new HealthHistoryServiceV1(services[i]);
            let healthHistory = await healthHistoryService.fetchHealthHistory(2, 1, "created,desc");
            servicesWithStatus.push({...services[i], healthHistory: healthHistory.healthhistory});
        }

        console.log(servicesWithStatus);
        setServices(servicesWithStatus);
    }

    /**
     * load all the user services when component mounts
     */
    useEffect(() => {
        userService.getAllServices()
            .then(services => {
                console.log(services);
                setServices(services);
                updateServiceHealthStatus(services);
            });
    }, [])

    if (localStorage.getItem("user") === null) {
        return <Navigate replace to={"/login"}/>
    }

    /**
     * delete the user created service
     * @param id service id
     */
    const deleteService = (id: number) => {
        setServices(services.filter(service => service.id !== id));
    }

    /**
     * create new service for the logged in user
     * @param webServiceForm new service data
     */
    const createService = async (webServiceForm: WebServiceForm) => {
        console.log(webServiceForm);
        let webService:WebService = await userService.createService(webServiceForm);
        let healthHistoryService = new HealthHistoryServiceV1(webService);
        let healthHistory = await healthHistoryService.fetchHealthHistory()

        webService.healthHistory = healthHistory.healthhistory;

        if (webService) {
            setServices([...services, webService]);
            return true;
        }

        return false;
    }


    return <>
        <AppHeader/>
        <Container>
            <Row>
                <Col style={{marginTop: "10px", marginBottom: "10px"}} >
                    <AddNewService createService={createService} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <ListServices services={services} delete={deleteService}/>
                </Col>
            </Row>
        </Container>
    </>
}

export default UserDashboardPage;