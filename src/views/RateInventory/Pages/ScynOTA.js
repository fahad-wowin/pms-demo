import React, { useState } from 'react'
import {
    Card, CardTitle, CardText, CardBody, CardSubtitle, CardHeader, Row, Col, Label, Input, UncontrolledDropdown, DropdownToggle, DropdownMenu,
    DropdownItem, Modal, ModalHeader, ModalBody,
    Button, Form, Alert, Accordion, AccordionBody, AccordionHeader, AccordionItem
} from 'reactstrap'
import Flatpickr from 'react-flatpickr'

function ScynOTA() {
    const [show, setShow] = useState(false)
    const [cardType, setCardType] = useState('')
    const [fromDate, setFromDate] = useState(new Date())
    const [toDate, setToDate] = useState(new Date())
    const [open, setOpen] = useState('')

    const toggle = id => {
        open === id ? setOpen() : setOpen(id)
    }
    return (
        <>
            <Card color='warning' inverse onClick={() => setShow(!show)}>
                <CardHeader className='rate_inventry_card_header'>
                    Sync With OTA
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
                    <p>Sync With OTA</p>
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
                    </Row>
                    <Accordion className='accordion-margin' open={open} toggle={toggle}>
                        <AccordionItem>
                            <AccordionHeader targetId='1'>Standard Room</AccordionHeader>
                            <AccordionBody accordionId='1'>
                                <Col lg='4' md='4' className='mb-1'>
                                    <Input type='text' />
                                </Col>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionHeader targetId='2'>Deluxe</AccordionHeader>
                            <AccordionBody accordionId='2'>
                                <Col lg='4' md='4' className='mb-1'>
                                    <Input type='text' />
                                </Col>
                            </AccordionBody>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionHeader targetId='3'>Executive Room</AccordionHeader>
                            <AccordionBody accordionId='3'>
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
                            Sync
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

export default ScynOTA