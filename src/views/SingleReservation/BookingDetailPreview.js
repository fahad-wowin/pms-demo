import React from 'react'
import { Button, Input, Col, Label, Modal, ModalBody, ModalHeader, Row, Form, ModalFooter } from 'reactstrap'
// import { store } from '@store/store'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const BookingDetailPreview = ({ showBookingDetails, BookingError, handleFinalModal }) => {
    const navigate = useNavigate()
    const bookingStore = useSelector(state => state.booking)
    console.log(bookingStore)
    console.log(bookingStore.bookingDetail_store[0][0][0].Adult)
    const confirm = () => {
        // onSubmit(e)
        navigate('/reservation')
    }

    return (
        <>
            {
                // editModelData.length > 0 &&
                <>
                    <Modal
                        isOpen={showBookingDetails}
                        // toggle={handleEditModal}
                        className='modal-dialog-centered modal-lg'
                    // backdrop={false}
                    >
                        {
                            BookingError === '' ? ( 
                                <>  <style>
                                    {
                                        `.hide-close button.btn-close{
                                            display: none;
                                        }`
                                    }
                                    </style>
                                    <ModalHeader className='bg-transparent hide-close' toggle={confirm}>
                                        <h1 className=' mb-1'>Room Confirmation</h1>
                                    </ModalHeader>
                                    <ModalBody className='px-sm-2 mx-50 pb-5'>
                                        <Row>
                                            <Col md={6}>
                                                <Label>
                                                    Guest Name
                                                </Label>
                                                <Input type='text' disabled />{bookingStore.guest_details}
                                            </Col>
                                            <Col md={6}>
                                                <Label>
                                                    Adult
                                                </Label>
                                                <Input type='text' value={bookingStore.bookingDetail_store[0][0][0].Adult} disabled />
                                            </Col>
                                            <Col md={6}>
                                                <Label>
                                                    Child
                                                </Label>
                                                <Input type='text' value={bookingStore.bookingDetail_store[0][0][0].Children} disabled />
                                            </Col>
                                            <Col md={6}>
                                                <Label>
                                                    Room
                                                </Label>
                                                <Input type='text' value={bookingStore.bookingDetail_store[0][0][0].RoomID} disabled />
                                            </Col>
                                            <Col md={6}>
                                                <Label>
                                                    Check In Date
                                                </Label>
                                                <Input type='text' value={bookingStore.checkInDate} disabled />
                                            </Col>
                                            <Col md={6}>
                                                <Label>
                                                    Check Out Date
                                                </Label>
                                                <Input type='text' value={bookingStore.checkOutDate} disabled />
                                            </Col>
                                            <Col md={6}>
                                                <Label>
                                                    Address
                                                </Label>
                                                <Input type='text' disabled />
                                            </Col>
                                            <Col md={6}>
                                                <Label>
                                                    Total Amount
                                                </Label>
                                                <Input type='text' disabled value={bookingStore.total} />
                                            </Col>
                                        </Row>

                                    </ModalBody>
                                    <ModalFooter>
                                        <Button type='submit' onClick={confirm} color='success'>Ok, Next Booking</Button>
                                    </ModalFooter>
                                </>) : (<>
                                    <ModalHeader className='bg-transparent' toggle={handleFinalModal}>
                                        <h1 className='text-danger mb-1'>Error while booking</h1>
                                    </ModalHeader>
                                    <ModalBody className='px-4 mx-50 pb-1 '>
                                        <Row>
                                            <Col>
                                                <h3 className='text-danger'>{BookingError}</h3>
                                                <p>Please share the error message above with the tech support team.</p>
                                            </Col>
                                        </Row>

                                    </ModalBody>
                                    <ModalFooter>
                                        <Button onClick={handleFinalModal} color='danger'>Back</Button>
                                    </ModalFooter>
                                </>)
                        }

                    </Modal>
                </>

            }
        </>

    )
}

export default BookingDetailPreview
