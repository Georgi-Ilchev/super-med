import { Alert, Modal } from 'react-bootstrap';

const AccountModal = ({ show, modalInfo }) => {
    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">Congratulations!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>{modalInfo}</h4>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    )
}

export default AccountModal;