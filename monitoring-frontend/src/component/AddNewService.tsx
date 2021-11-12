import WebServiceForm from "../model/WebServiceForm";
import React, {FunctionComponent, useState} from "react";
import {Alert, Button, Form, Modal, Row} from "react-bootstrap";
import validator from "validator";

interface Props {
    createService: (webServiceForm:WebServiceForm) => Promise<boolean>
}

const AddNewService: FunctionComponent<Props> = (props:Props) => {
    const [webServiceForm, setWebServiceForm] = useState<WebServiceForm>({name: "", url: "", nameError: "", urlError: ""});
    const [modal, setModal] = useState(false);

    const updateWebServiceForm = (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.currentTarget.value;
        setWebServiceForm({...webServiceForm, [fieldName]: val});
    }

    const openModal = () => {
        setModal(true);
    }

    const closeModal = () => {
        setWebServiceForm({name: "", url:"", nameError: "", urlError: ""});
        setModal(false);
    }

    const handleFormSubmit = async () => {
        if (validator.isLength(webServiceForm.name, {min: 3, max: 26}) && validator.isAlphanumeric(webServiceForm.name)
            && validator.isURL(webServiceForm.url)) {
            if (await props.createService(webServiceForm)) {
                closeModal();
                setWebServiceForm({name: "", url:"", nameError: "", urlError: ""});
            }
        } else {
            setWebServiceForm({...webServiceForm,
                nameError: "Service name should be between 3-26 chars long",
                urlError: "Try a valid url"
            })
        }

    }

    return <>
        <Button variant={"outline-primary"} onClick={openModal}>Add New Service</Button>

        <Modal show={modal}>
            <Modal.Header>
                <h3>Enter Service Details</h3>
            </Modal.Header>
            <Modal.Body>
                {
                    webServiceForm.urlError !== "" || webServiceForm.nameError !== "" ?
                        <Alert variant={"danger"} style={{marginTop: "10px"}}>
                            <p>Please check following constraints:</p>
                            <ul>
                                <li>{webServiceForm.urlError}</li>
                                <li>{webServiceForm.nameError}</li>
                            </ul>
                        </Alert>
                        : <></>
                }
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group as={Row} className="mb-1">
                        <Form.Control type={"text"} placeholder={"Service Name"} value={webServiceForm.name}
                                      onChange={updateWebServiceForm("name")}/>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1">
                        <Form.Control type={"text"} placeholder={"http://example.com"} value={webServiceForm.url}
                                      onChange={updateWebServiceForm("url")}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"light"} onClick={closeModal}>Close</Button>
                <Button variant={"primary"} onClick={handleFormSubmit}>Add Service</Button>
            </Modal.Footer>
        </Modal>
    </>
}

export default AddNewService;