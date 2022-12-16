import React, { useState } from 'react'
import { Button, Col, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import Select from 'react-select'
import { selectThemeColors } from '@utils'

const tableOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
]

const statusOptions = [
    { value: true, label: 'ACTIVE' },
    { value: false, label: 'INACTIVE' }
]

const UpdatePosModal = ({ updateOpen, handleUpdateOpen }) => {

    const [submit, setSumbit] = useState(false)
    const [newPosname, setNewPosname] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [newPoslogo, setNewPoslogo] = useState('')
    const [newPtypeoff, setNewPtypeoff] = useState('')
    const [newPanno, setNewPanno] = useState('')
    const [newCinno, setNewCinno] = useState('')
    const [newFssai, setNewFssai] = useState('')
    const [newPosgst, setNewPosgst] = useState('')
    const [newPosgstpercent, setNewPosgstpercent] = useState('')
    const [newAddress, setNewAddress] = useState('')
    const [newDescp, setNewDescp] = useState('')
    const [newTables, setNewTables] = useState('')
    const [newStatus, setNewStatus] = useState('')

    const handleUpdate = (e) => {
        e.preventDefault()
        setSumbit(!submit)
        handleUpdateOpen()
        console.log(newTables)
        console.log(newStatus)
    }

    const documentUpload = (e) => {
        setNewPoslogo(URL.createObjectURL(e.target.files[0]))
        console.log('posBlob', poslogo)
    }

    return (
        <>
            <Modal isOpen={updateOpen}
                toggle={handleUpdateOpen}
                className='modal-dialog-centered modal-lg'
                backdrop={false}
            >
                <ModalHeader toggle={handleUpdateOpen}>
                    Update POS Info
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={(e) => handleUpdate(e)}>
                        <Row className='mb-1'>
                            <Col>
                                <Label>Name<span className='text-danger'>*</span></Label>
                                <Input
                                    type='text'
                                    name='name'
                                    placeholder='POS name'
                                    value={newPosname}
                                    onChange={e => setNewPosname(e.target.value)}
                                    invalid={submit && newPosname === ''}
                                />
                                {submit && newPosname === '' && <FormFeedback>POS Name is required</FormFeedback>}
                            </Col>
                            <Col>
                                <Label>Logo<span className='text-danger'>*</span></Label>
                                <Input
                                    type='file'
                                    name='file'
                                    placeholder='POS logo'
                                    accept='image/*'
                                    onChange={e => documentUpload(e)}
                                    invalid={submit && newPoslogo === ''}
                                />
                                {submit && newPoslogo === '' && <FormFeedback>POS Logo is required</FormFeedback>}
                            </Col>
                        </Row>
                        <Row className='mb-1'>
                            <Col>
                                <Label>Email Id</Label>
                                <Input
                                    type='email'
                                    name='email'
                                    placeholder='Email Id'
                                    value={newEmail}
                                    onChange={e => setNewEmail(e.target.value)}
                                    invalid={submit && newEmail === ''}
                                />
                                {submit && newEmail === '' && <FormFeedback>Email is required</FormFeedback>}
                            </Col>
                            <Col>
                                <Label>Phone No</Label>
                                <Input
                                    type='phone'
                                    name='phone'
                                    min={10}
                                    placeholder='Phone No'
                                    value={newPhone}
                                    onChange={e => setNewPhone(e.target.value)}
                                    invalid={submit && newPhone === ''}
                                />
                                {submit && newPhone === '' && newPhone.length >= 10 && <FormFeedback>Phone No. is required</FormFeedback>}
                            </Col>
                        </Row>
                        <Row className='mb-1'>
                            <Col className='d-flex flex-row'>
                                <Col>
                                    <Label>Tables<span className='text-danger'>*</span></Label>
                                    <Col className='d-flex flex-row'>
                                        <Select
                                            placeholder=''
                                            menuPlacement='auto'
                                            theme={selectThemeColors}
                                            className='react-select w-75'
                                            classNamePrefix='select'
                                            options={tableOptions}
                                            onChange={e => setNewTables(e.value)}
                                        />
                                    </Col>
                                </Col>
                                <Col>
                                    <Label>Status</Label>
                                    <Col className='d-flex flex-row'>
                                        <Select
                                            placeholder=''
                                            menuPlacement='auto'
                                            theme={selectThemeColors}
                                            className='react-select w-100'
                                            classNamePrefix='select'
                                            options={statusOptions}
                                            onChange={e => setNewStatus(e.value)}
                                        />
                                    </Col>
                                </Col>
                            </Col>
                            <Col>
                                <Label>Payment Type: Complimentary (% Off)</Label>
                                <Input
                                    type='text'
                                    name='ptype'
                                    placeholder='Complimentary (% Off)'
                                    value={newPtypeoff}
                                    onChange={e => setNewPtypeoff(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <Row className='mb-1'>
                            <Col>
                                <Label>PAN No</Label>
                                <Input
                                    type='text'
                                    name='pan'
                                    placeholder='PAN No'
                                    value={newPanno}
                                    onChange={e => setNewPanno(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <Label>CIN No</Label>
                                <Input
                                    type='text'
                                    name='cin'
                                    placeholder='CIN No'
                                    value={newCinno}
                                    onChange={e => setNewCinno(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <Row className='mb-1'>
                            <Col>
                                <Label>FSSAI No</Label>
                                <Input
                                    type='text'
                                    name='fssai'
                                    placeholder='FSSAI No'
                                    value={newFssai}
                                    onChange={e => setNewFssai(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <Label>GST No</Label>
                                <Input
                                    type='text'
                                    name='gst'
                                    placeholder='GST No'
                                    value={newPosgst}
                                    onChange={e => setNewPosgst(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <Label>GST %</Label>
                                <Input
                                    type='text'
                                    name='gstpercent'
                                    placeholder='GST No'
                                    value={newPosgstpercent}
                                    onChange={e => setNewPosgstpercent(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <Row className='mb-1'>
                            <Col>
                                <Label>Address</Label>
                                <Input
                                    type='textarea'
                                    name='address'
                                    placeholder='POS Address'
                                    value={newAddress}
                                    onChange={e => setNewAddress(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <Label>Description</Label>
                                <Input
                                    type='textarea'
                                    name='descp'
                                    placeholder='Enter Description'
                                    value={newDescp}
                                    onChange={e => setNewDescp(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <Row className='my-1'>
                            <Col className='text-center'>
                                <Button color='primary' type='submit'>Update POS Info</Button>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
            </Modal>
            {
                updateOpen ? (
                    <div class="modal-backdrop fade show" ></div>
                ) : null
            }
        </>
    )
}

export default UpdatePosModal