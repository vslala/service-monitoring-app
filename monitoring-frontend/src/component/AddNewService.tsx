import WebServiceForm from "../model/WebServiceForm";
import React, {FunctionComponent, useState} from "react";
import {Button, Form, Modal, Row} from "react-bootstrap";

interface Props {
    createService: (webServiceForm:WebServiceForm) => Promise<boolean>
}

const AddNewService: FunctionComponent<Props> = (props:Props) => {
    const [webServiceForm, setWebServiceForm] = useState<WebServiceForm>({name: "", url: ""});
    const [modal, setModal] = useState(false);

    const updateWebServiceForm = (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.currentTarget.value;
        setWebServiceForm({...webServiceForm, [fieldName]: val});
    }

    const openModal = () => {
        setModal(true);
    }

    const closeModal = () => {
        setModal(false);
    }

    const handleFormSubmit = async () => {
        if (await props.createService(webServiceForm)) {
            closeModal();
            setWebServiceForm({name: "", url:""});
        }
    }

    return <>
        <Button variant={"outline-primary"} onClick={openModal}>Add New Service</Button>

        <Modal show={modal}>
            <Modal.Body>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group as={Row} className="mb-1">
                        <Form.Control type={"text"} placeholder={"healthstatus Name"} value={webServiceForm.name}
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