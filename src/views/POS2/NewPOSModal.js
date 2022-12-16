import React, { useState } from 'react'
import { Button, Col, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import Select from 'react-select'
import { selectThemeColors } from '@utils'

const tableOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
]

const NewPOSModal = ({ open, handleOpen }) => {

    const [submit, setSumbit] = useState(false)
    const [posname, setPosname] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [poslogo, setPoslogo] = useState('')
    const [ptypeoff, setPtypeoff] = useState('')
    const [panno, setPanno] = useState('')
    const [cinno, setCinno] = useState('')
    const [fssai, setFssai] = useState('')
    const [posgst, setPosgst] = useState('')
    const [posgstpercent, setPosgstpercent] = useState('')
    const [address, setAddress] = useState('')
    const [descp, setDescp] = useState('')
    const [tables, setTables] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        setSumbit(!submit)
        handleOpen()
        console.log(tables)
    }
    const documentUpload = (e) => {
        setPoslogo(URL.createObjectURL(e.target.files[0]))
        console.log('posBlob', poslogo)
    }

    return (
        <>
            <Modal isOpen={open}
                toggle={handleOpen}
                className='modal-dialog-centered modal-lg'
                backdrop={false}
            >
                <ModalHeader toggle={handleOpen}>
                    Create New POS
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <Row className='mb-1'>
                            <Col>
                                <Label>Name<span className='text-danger'>*</span></Label>
                                <Input
                                    type='text'
                                    name='name'
                                    placeholder='POS name'
                                    value={posname}
                                    onChange={e => setPosname(e.target.value)}
                                    invalid={submit && posname === ''}
                                />
                                {submit && posname === '' && <FormFeedback>POS Name is required</FormFeedback>}
                            </Col>
                            <Col>
                                <Label>Logo<span className='text-danger'>*</span></Label>
                                <Input
                                    type='file'
                                    name='file'
                                    placeholder='POS logo'
                                    accept='image/*'
                                    onChange={e => documentUpload(e)}
                                    invalid={submit && poslogo === ''}
                                />
                                {submit && poslogo === '' && <FormFeedback>POS Logo is required</FormFeedback>}
                            </Col>
                        </Row>
                        <Row className='mb-1'>
                            <Col>
                                <Label>Email Id</Label>
                                <Input
                                    type='email'
                                    name='email'
                                    placeholder='Email Id'
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    invalid={submit && email === ''}
                                />
                                {submit && email === '' && <FormFeedback>Email is required</FormFeedback>}
                            </Col>
                            <Col>
                                <Label>Phone No</Label>
                                <Input
                                    type='phone'
                                    name='phone'
                                    min={10}
                                    placeholder='Phone No'
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                    invalid={submit && phone === ''}
                                />
                                {submit && phone === '' && phone.length >= 10 && <FormFeedback>Phone No. is required</FormFeedback>}
                            </Col>
                        </Row>
                        <Row className='mb-1'>
                            <Col>
                                <Label>Tables<span className='text-danger'>*</span></Label>
                                <Col className='d-flex flex-row'>
                                    <Select
                                        placeholder=''
                                        menuPlacement='auto'
                                        theme={selectThemeColors}
                                        className='react-select w-100'
                                        classNamePrefix='select'
                                        options={tableOptions}
                                        onChange={e => setTables(e.value)}
                                    />
                                </Col>
                            </Col>
                            <Col>
                                <Label>Payment Type: Complimentary (% Off)</Label>
                                <Input
                                    type='text'
                                    name='ptype'
                                    placeholder='Complimentary (% Off)'
                                    value={ptypeoff}
                                    onChange={e => setPtypeoff(e.target.value)}
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
                                    value={panno}
                                    onChange={e => setPanno(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <Label>CIN No</Label>
                                <Input
                                    type='text'
                                    name='cin'
                                    placeholder='CIN No'
                                    value={cinno}
                                    onChange={e => setCinno(e.target.value)}
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
                                    value={fssai}
                                    onChange={e => setFssai(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <Label>GST No</Label>
                                <Input
                                    type='text'
                                    name='gst'
                                    placeholder='GST No'
                                    value={posgst}
                                    onChange={e => setPosgst(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <Label>GST %</Label>
                                <Input
                                    type='text'
                                    name='gstpercent'
                                    placeholder='GST No'
                                    value={posgstpercent}
                                    onChange={e => setPosgstpercent(e.target.value)}
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
                                    value={address}
                                    onChange={e => setAddress(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <Label>Description</Label>
                                <Input
                                    type='textarea'
                                    name='descp'
                                    placeholder='Enter Description'
                                    value={descp}
                                    onChange={e => setDescp(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <Row className='my-1'>
                            <Col className='text-center'>
                                <Button color='primary' type='submit'>Create POS</Button>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
            </Modal>
            {
                open ? (
                    <div class="modal-backdrop fade show" ></div>
                ) : null
            }
        </>
    )
}

export default NewPOSModal