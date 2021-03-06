import React, {FunctionComponent, useEffect, useState} from "react";
import WebService from "../model/WebService";
import {Navigate} from "react-router-dom";
import WebServiceForm from "../model/WebServiceForm";
import AppHeader from "../component/AppHeader";
import {Col, Container, Row} from "react-bootstrap";
import AddNewService from "../component/AddNewService";
import ListServices from "../component/ListServices";
import ServiceFactory from "../service/ServiceFactory";
import UserServiceV1 from "../service/user/UserServiceV1";

/**
 *
 * @constructor Varun Shrivastava
 */
const UserDashboardPage: FunctionComponent = () => {

    const userService:UserServiceV1 = ServiceFactory.getUserService();

    const [services, setServices] = useState<WebService[]>([]);

    /**
     * iterates over each service and fetches the latest health status for each
     * @param services
     */
    async function updateServiceHealthStatus() {
        let services = await userService.getAllServices();
        console.log("Update service status: ", services);
        setServices(services);
    }

    /**
     * load all the user services when component mounts
     */
    useEffect(() => {
        updateServiceHealthStatus();
    }, [])

    if (localStorage.getItem("user") === null) {
        return <Navigate replace to={"/login"}/>
    }

    /**
     * delete the user created service
     * @param id service id
     */
    const deleteService = async (id: number) => {
        let deleted = await userService.deleteService(id);
        if (deleted) {
            setServices(services.filter(service => service.id !== id));
        }
    }

    /**
     * create new service for the logged in user
     * @param webServiceForm new service data
     */
    const createService = async (webServiceForm: WebServiceForm) => {
        console.log(webServiceForm);
        let webService: WebService = await userService.createService(webServiceForm);

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
                <Col style={{marginTop: "10px", marginBottom: "10px"}}>
                    <AddNewService createService={createService}/>
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