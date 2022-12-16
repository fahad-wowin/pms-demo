import { React, useState } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Modal, ModalBody, Row } from 'reactstrap'

const textSize = {
  fontSize: '18px'
}

const border = {
  borderBottom: '2px solid #5D3FD3'
}

const NightAudit = () => {
  const [startProcess, SetStartProcess] = useState(false)
  return (
    <>
      <Card>
        <CardHeader className='mx-1'>
          <div className='d-flex w-100' style={border}>
            <h4 className='mb-1'>Business Date:- 15-07-2022</h4>
            <h4 className='ms-3 mb-1'>Audit Date:- 15-07-2022</h4>
          </div>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md='12 mb-1 mx-1'>
              <h3 style={textSize}>If you continue the system, it will start the night audit for the next day and will change the business and audit date.</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <ul>
                <li className='mb-1 fw-bold'>
                  Step 01 : Initialize night audit
                </li>
                <li className='mb-1 fw-bold'>
                  Step 02 : Auto post Charges
                </li>
                <li className='mb-1 fw-bold'>
                  Step 03 : Cancel reservation on release date
                </li>
                <li className='mb-1 fw-bold'>
                  Step 04: Make non arrival guests to no-show
                </li>
                <li className='mb-1 fw-bold'>
                  Step 05 : Change business date
                </li>
                <li className='mb-1 fw-bold'>
                  Step 06 : Prior statistics update
                </li>
                <li className='mb-1 fw-bold'>
                  Step 07 : POS day end process statistics updates and others
                </li>
                <li className='mb-1 fw-bold'>
                  Step 08 : Transfers data and history
                </li>
                <li className='mb-1 fw-bold'>
                  Step 09 : Purge data
                </li>
                <li className='mb-1 fw-bold'>
                  Step 10 : Change audit date
                </li>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col md='12 text-end mt-2'>
              <Button color='primary' onClick={() => SetStartProcess(true)}>Start Process</Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Modal
        isOpen={startProcess}
        toggle={() => SetStartProcess(!startProcess)}
        className='modal-dialog-centered'
        backdrop={false}
      >
        <ModalBody className='px-sm-5 mx-50 pb-5'>
          <Row>
            <Col>
              <h1>Confirm</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>You are going to start night audit process. If you continue system will start night audit for next day and will change the business and audit date. Do you want to continue?</p>
            </Col>
          </Row>
          <Row>
            <Col className='mb-1'>
              <Button  color='primary' className='w-50'>
                CONFIRM
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button className='w-50' color='danger' onClick={() => SetStartProcess(!startProcess)}>
                CANCEL
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
      {
        startProcess ? (
          <div class="modal-backdrop fade show" ></div>
        ) : null
      }
    </>
  )
}

export default NightAudit