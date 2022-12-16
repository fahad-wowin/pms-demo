import React, { useState } from 'react'
import {
    Card, CardHeader, Row, Col, Label, Input, Modal, ModalHeader, ModalBody,
    Button,
    Accordion, AccordionBody, AccordionHeader, AccordionItem
} from 'reactstrap'
import Flatpickr from 'react-flatpickr'

function Inventory() {
    const [show, setShow] = useState(false)
    const [cardType, setCardType] = useState('')
    const [fromDate, setFromDate] = useState(new Date())
    const [toDate, setToDate] = useState(new Date())
    const [monday, setMonday] = useState(false)
    const [tuesday, setTuesday] = useState(false)
    const [wednesday, setWednesday] = useState(false)
    const [thursday, setThursday] = useState(false)
    const [friday, setFriday] = useState(false)
    const [saturday, setSaturday] = useState(false)
    const [sunday, setSunday] = useState(false)
    const [open, setOpen] = useState('')

    const toggle = id => {
        open === id ? setOpen() : setOpen(id)
    }
    // console.log('checkbox', monday)
    return (
        <>
            <Card color='primary' inverse onClick={() => setShow(!show)}>
                <CardHeader className='rate_inventry_card_header'>
                    Inventory
                </CardHeader>
            </Card>
            <Modal
                isOpen={show}
                toggle={() => {
                    setShow(!show)
                }}
                className='modal-dialog-centered'
                onClosed={() => setCardType('')}
                size='lg'
                backdrop={false}
            >
                <ModalHeader className='bg-transparent border-bottom' toggle={() => {
                    setShow(!show)
                }}>
                    <span>Bulk Update Inventry</span>
                </ModalHeader>
                <ModalBody className='rate_inventry'>
                    {cardType !== '' && cardType !== 'unknown' ? (
                        <InputGroupText className='p-25'>
                            <span className='add-card-type'>
                                <img height='24' alt='card-type' src={cardsObj[cardType]} />
                            </span>
                        </InputGroupText>
                    ) : null}
                    <Row>
                        <Col lg='6' md='6' className='mb-1'>
                            <Label className='form-label' for='hf-picker'>
                                From Date :
                            </Label>
                            <Flatpickr
                                value={fromDate}
                                id='hf-picker'
                                className='form-control'
                                onChange={date => setFromDate(date)}
                                options={{
                                    altInput: true,
                                    altFormat: 'F j, Y',
                                    dateFormat: 'Y-m-d'
                                }}
                            />
                        </Col>
                        <Col lg='6' md='6' className='mb-1'>
                            <Label className='form-label' for='hf-picker'>
                                To Date :
                            </Label>
                            <Flatpickr
                                value={toDate}
                                id='hf-picker'
                                className='form-control'
                                onChange={date => setToDate(date)}
                                options={{
                                    altInput: true,
                                    altFormat: 'F j, Y',
                                    dateFormat: 'Y-m-d'
                                }}
                            />
                        </Col>
                        <Col lg='12' md='12' className='mb-1'>
                            <div className='form-check form-check-inline'>
                                <Input type='checkbox' id='basic-cb-unchecked' onClick={() => setMonday(!monday)} value='monday' checked={monday === true} />
                                <Label for='basic-cb-unchecked' className='form-check-label'>
                                    Mon
                                </Label>
                            </div>
                            <div className='form-check form-check-inline'>
                                <Input type='checkbox' id='basic-cb-unchecked1' onChange={() => setTuesday(!tuesday)} checked={tuesday === true} value='tue' />
                                <Label for='basic-cb-unchecked1' className='form-check-label'>
                                    Tue
                                </Label>
                            </div>
                            <div className='form-check form-check-inline'>
                                <Input type='checkbox' id='basic-cb-unchecked2' onChange={() => setWednesday(!wednesday)} checked={wednesday === true} value='wed' />
                                <Label for='basic-cb-unchecked2' className='form-check-label'>
                                    Wed
                                </Label>
                            </div>
                            <div className='form-check form-check-inline'>
                                <Input type='checkbox' id='basic-cb-unchecked3' onChange={() => setThursday(!thursday)} checked={thursday === true} value='thu' />
                                <Label for='basic-cb-unchecked3' className='form-check-label'>
                                    Thu
                                </Label>
                            </div>
                            <div className='form-check form-check-inline'>
                                <Input type='checkbox' id='basic-cb-unchecked4' onChange={() => setFriday(!friday)} checked={friday === true} value='fri' />
                                <Label for='basic-cb-unchecked4' className='form-check-label'>
                                    Fri
                                </Label>
                            </div>
                            <div className='form-check form-check-inline'>
                                <Input type='checkbox' id='basic-cb-unchecked5' onChange={() => setSaturday(!saturday)} checked={saturday === true} value='sat' />
                                <Label for='basic-cb-unchecked5' className='form-check-label'>
                                    Sat
                                </Label>
                            </div>
                            <div className='form-check form-check-inline'>
                                <Input type='checkbox' id='basic-cb-unchecked6' onChange={() => setSunday(!sunday)} checked={sunday === true} value='sun' />
                                <Label for='basic-cb-unchecked6' className='form-check-label'>
                                    Sun
                                </Label>
                            </div>
                        </Col>
                    </Row>
                    <Accordion className='accordion-margin' open={open} toggle={toggle}>
                        <AccordionItem>
                            <AccordionHeader targetId='1'>
                            

                                <div className='accordion-img'>
                                <span>Standard Room</span>
                                </div>

                            </AccordionHeader>
                            <AccordionBody accordionId='1'>
                                <span>Number Of Room TO Be Adjusted</span>
                                <Col lg='4' md='4' className='mb-1'>
                                    <Input type='text' />
                                </Col>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionHeader targetId='2'>
                                <div className='accordion-img'>
                                    Deluxe
                                </div>
                            </AccordionHeader>
                            <AccordionBody accordionId='2'>
                                <span>Number Of Room TO Be Adjusted</span>
                                <Col lg='4' md='4' className='mb-1'>
                                    <Input type='text' />
                                </Col>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionHeader targetId='3'>
                                <div className='accordion-img'>
                                    Executive Room
                                </div>
                            </AccordionHeader>
                            <AccordionBody accordionId='3'>
                                <span>Number Of Room TO Be Adjusted</span>
                                <Col lg='4' md='4' className='mb-1'>
                                    <Input type='text' />
                                </Col>
                            </AccordionBody>
                        </AccordionItem>
                    </Accordion>
                    <div className='text-end mt-1'>
                        <Button className='me-1' color='primary' type='submit' onClick={(e) => {
                            e.preventDefault()
                        }}>
                            Save
                        </Button>
                        <Button className='me-1' color='danger' type='submit' onClick={(e) => {
                            e.preventDefault()
                            setShow(!show)
                        }}>
                            Close
                        </Button>
                    </div>
                </ModalBody>

            </Modal>
            {
                show ? (
                    <div class="modal-backdrop fade show" ></div>
                ) : null
            }
        </>
    )
}

export default Inventory