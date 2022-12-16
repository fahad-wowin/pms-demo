import React, { useState } from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Form, Input, Label, Row } from 'reactstrap'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import toast from 'react-hot-toast'

const idProof = [
    { value: 'Aadhar Card', label: 'Aadhar Card' },
    { value: 'Pan Card', label: 'Pan Card' },
    { value: 'abc', label: 'abc' },
    { value: 'abc', label: 'abc' }
]

const WebCheckIn = () => {
    const [show, setShow] = useState(false)
    const [arrival, setArrival] = useState('')
    const [departure, setDeparture] = useState('')
    const [comingFrom, setComing] = useState('')
    const [goingTo, setGoingTo] = useState('')
    const [doc, setDoc] = useState('')
    const [nameOnDoc, setNameOnDoc] = useState('')
    const [idNumber, setIdNumber] = useState('')
    const [docImage, setDocImage] = useState('')

    const handleSubmit = () => {
        setShow(true)
        if (arrival && departure && comingFrom && goingTo && doc && nameOnDoc && idNumber && docImage !== '') {
            toast.success('Form Submitted!', { position: "top-center" })
        }
        // else {
        //     toast.error('Fill All Fields!', {
        //         position: "top-center",
        //         style: {
        //             minWidth: '250px'
        //         },
        //         duration: 4000
        //     })
        // }
    }

    // const documentUpload = (e) => {
    //     setDocImage(URL.createObjectURL(e.target.files[0]))
    // }

    return (
        <Card>
            <CardHeader className='border m-2'>
                <CardTitle>
                    <Row>
                        <Col className='d-flex'>
                            <Label className='fw-bold fs-5'>Booking ID :</Label>
                            <Label className='ms-1'>FDR01191662123455</Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='d-flex'>
                            <Label className='fw-bold fs-5'>CheckIn Date :</Label>
                            <Label className='ms-1'>02-Sep-2022</Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='d-flex'>
                            <Label className='fw-bold fs-5'>CheckOut Date :</Label>
                            <Label className='ms-1'>03-Sep-2022</Label>
                        </Col>
                    </Row>
                </CardTitle>
                <CardTitle>
                    <Row>
                        <Col className='d-flex'>
                            <Label className='fw-bold fs-5'>Name : </Label>
                            <Label className='ms-1'>TestN</Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='d-flex'>
                            <Label className='fw-bold fs-5'>Email : </Label>
                            <Label className='ms-1'>sid010882@gmail.com</Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='d-flex'>
                            <Label className='fw-bold fs-5'>Mobile No : </Label>
                            <Label className='ms-1'>9876543210</Label>
                        </Col>
                    </Row>
                </CardTitle>
            </CardHeader>
            <CardBody className='mt-1'>
                <Form>
                    <Row className='mb-1'>
                        <Col md='6'>
                            <Label>Expected Arrival Date <span className='text-danger'>*</span></Label>
                            <Input
                                type='date'
                                value={arrival}
                                placeholder='Select Check-In Date'
                                onChange={e => setArrival(e.target.value)}
                                invalid={show ? arrival === '' : false}
                            />
                            {show === true && !arrival ? <span className='error_msg_lbl'>Select Arrival Date </span> : <></>}
                        </Col>
                        <Col md='6'>
                            <Label>Expected Departure Date <span className='text-danger'>*</span></Label>
                            <Input
                                type='date'
                                value={departure}
                                placeholder='Select Check-In Date'
                                onChange={e => setDeparture(e.target.value)}
                                invalid={show ? departure === '' : false}
                            />
                            {show === true && !departure ? <span className='error_msg_lbl'>Select Departure Date </span> : <></>}
                        </Col>
                    </Row>
                    <Row className='mb-1'>
                        <Col md='6'>
                            <Label>Coming From <span className='text-danger'>*</span></Label>
                            <Input type='text' placeholder='Coming From' value={comingFrom} onChange={e => setComing(e.target.value)} invalid={show ? comingFrom === '' : false}></Input>

                            {show === true && !comingFrom ? <span className='error_msg_lbl'>Enter Place </span> : <></>}
                        </Col>
                        <Col md='6'>
                            <Label>Going To <span className='text-danger'>*</span></Label>
                            <Input type='text' placeholder='Going To' value={goingTo} onChange={e => setGoingTo(e.target.value)} invalid={show ? goingTo === '' : false}></Input>

                            {show === true && !goingTo ? <span className='error_msg_lbl'>Enter Place </span> : <></>}
                        </Col>
                    </Row>
                    <Row className='mb-1'>
                        <Col md='6'>
                            <Label>Type of ID Proof <span className='text-danger'>*</span></Label>
                            <Select
                                theme={selectThemeColors}
                                className='react-select'
                                classNamePrefix='select Doc'
                                defaultValue={idProof[0]}
                                options={idProof}
                                isClearable={false}
                                onChange={(e) => setDoc(e.value)}
                                invalid={show ? doc === '' : false}
                            />

                            {show === true && !doc ? <span className='error_msg_lbl'>Select Document Type </span> : <></>}
                        </Col>
                        <Col md='6'>
                            <Label>Name as Per ID Proof <span className='text-danger'>*</span></Label>
                            <Input type='text' placeholder='Name As On Proof' value={nameOnDoc} onChange={e => {
                                const vald = /^[a-z A-Z]*$/.test(e.target.value)
                                if (vald) {
                                    setNameOnDoc(e.target.value)
                                }
                            }} invalid={show ? nameOnDoc === '' && nameOnDoc.length <= 5 : false}></Input>

                            {show === true && !nameOnDoc ? <span className='error_msg_lbl'>Enter Name As Per Document </span> : <></>}
                        </Col>
                    </Row>
                    <Row className='mb-1'>
                        <Col md='6'>
                            <Label>ID Proof Number <span className='text-danger'>*</span></Label>
                            <Input type='text' placeholder='ID Proof Number' value={idNumber} onChange={e => setIdNumber(e.target.value)} invalid={show ? idNumber === '' : false}></Input>

                            {show === true && !idNumber ? <span className='error_msg_lbl'>Enter Id Number </span> : <></>}
                        </Col>
                        <Col md='6'>
                            <Label for='docImage'>ID Proof(s) Scan Copy <span className='text-danger'>*</span></Label>
                            <Input type='file' id='docImage' name='docImage' value={docImage} accept='image/*' invalid={show ? docImage === '' : false} onChange={e => setDocImage(e.target.value)}></Input>

                            {show === true && !docImage ? <span className='error_msg_lbl'>Upload Document </span> : <></>}
                        </Col>
                        <Col md='6'>
                            
                        </Col>
                        <Col md='6'>
                            <img width='250px' src={docImage} alt="" />
                        </Col>
                    </Row>
                    <Row>
                        <Col md='12 mt-5'>
                            <Button color='primary' onClick={handleSubmit}>Create Check In</Button>
                        </Col>
                    </Row>
                </Form>
            </CardBody>
        </Card >
    )
}

export default WebCheckIn