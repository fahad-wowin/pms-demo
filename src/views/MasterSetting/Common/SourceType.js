import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { Button, Card, CardBody, Col, Form, Input, Label, Modal, ModalBody, ModalHeader, Row, Spinner } from 'reactstrap'
import { selectThemeColors } from '@utils'
import Select from 'react-select'
import { Edit, Trash } from 'react-feather'
import toast from 'react-hot-toast'
import axios from '../../../API/axios'

const SourceType = ({sourceTypeList, bookingSourceList, refreshList, loader, refreshBookingSourceList, bookingSourceLoader}) => {

    const [showEdit, setShowEdit] = useState(false)
    const handleEditModal = () => setShowEdit(!showEdit)

    const [selected_sourceType, setSelected_sourceType] = useState()

    const [del, setDel] = useState(false)

    const [SourceType, setSourceType] = useState('')
    const [BookingSourceID, setBookingSourceID] = useState('')

    const [display, setDisplay] = useState(false)

    const userId = localStorage.getItem('user-id')
    
    const bookingSourceOptions = bookingSourceList?.length > 0 && bookingSourceList[0]?.BookingSource ? bookingSourceList?.map(function (bookingSource) {
        return { value: bookingSource.BookingSourceID, label: bookingSource.BookingSource }
    }) : [{ value: 'reload', label: 'Error loading, click to reload again' }]

    const handleBookingSource = (value) => {
        if (value === 'reload') {
            refreshBookingSourceList()
            return
        }
        setBookingSourceID(value)
    }

    const sourceTypeInsert = () => {
        const sourceTypeInsertBody = {
            LoginID: userId,
            Token: "123",
            Seckey: "abc",
            BookingSourceID,
            Event: "insert",
            SourceType
        }
        try {
            axios.post(`/getdata/bookingdata/sourcetype`, sourceTypeInsertBody)
                .then(() => {
                    refreshList()
                })
        } catch (error) {
            console.log("Source Type Insert Error", error.message)
        }

    }

    const handleSubmit = () => {
        setDisplay(true)
        if (SourceType.trim() && BookingSourceID !== '') {
            sourceTypeInsert()
            setSourceType('')
            setBookingSourceID('')
            setDisplay(false)
            toast.success('Source Type Added!', { position: "top-center" })
        }
    }
    const sourceTypeTable = [
        {
            name: 'ID',
            selector: row => row.SourceTypeID
        },
        {
            name: 'Name',
            selector: row => row.SourceType
        },
        {
            name: 'Booking Source',
            selector: row => row.BookingSource
        },
        {
            name: 'Action',
            cell: row => (
                <>
                    <Edit className='me-50 pe-auto' size={15} onClick={() => {
                        setShowEdit(true)
                        setSelected_sourceType(row.SourceTypeID)
                    }} />
                    <Trash className='me-50' name={row.age} size={15} onClick={() => {
                        setDel(true)
                        setSelected_sourceType(row.SourceTypeID)
                    }} />

                </>
            )
        }
    ]

    const EditSourceTypeModal = ({ id }) => {
        const sourceTypeData = sourceTypeList?.filter(sourceType => sourceType.SourceTypeID === id)

        const [editSourceType, setEditSourceType] = useState(sourceTypeData[0]?.SourceType)
        const [editBookingSourceID, setEditBookingSourceID] = useState(sourceTypeData[0]?.BookingSourceID)
        const [editSourceTypeId] = useState(sourceTypeData[0]?.SourceTypeID)
        const [editStatusId] = useState(sourceTypeData[0]?.StatusID)

        const [editDisplay, setEditDisplay] = useState(false)

        const sourceTypeEdit = () => {
            const sourceTypeEditBody = {
                LoginID: userId,
                Token: "123",
                Seckey: "abc",
                BookingSourceID: editBookingSourceID,
                Event: "update",
                SourceTypeID: editSourceTypeId,
                SourceType: editSourceType,
                StatusID: editStatusId
            }
            try {
                axios.post(`/getdata/bookingdata/sourcetype`, sourceTypeEditBody)
                    .then(() => {
                        refreshList()
                    })
            } catch (error) {
                console.log("Source Type Edit Error", error.message)
            }
        }

        const editHandleSubmit = () => {
            setEditDisplay(true)
            if (editSourceType.trim() && editBookingSourceID !== '') {
                sourceTypeEdit()
                handleEditModal()
                toast.success('Source Type Edited Successfully!', { position: "top-center" })
            }
        }

        return (
            <Modal
                isOpen={showEdit}
                toggle={handleEditModal}
                className='modal-dialog-centered modal-lg'
                backdrop={false}
            >
                <ModalHeader className='bg-transparent' toggle={handleEditModal}>
                    <h1 className=' mb-1'>Edit Source Type</h1>
                </ModalHeader>
                <ModalBody className='px-sm-2 mx-50 pb-5'>
                    <>
                        <Form>
                            <Row>
                                <Col md='6'>
                                    <Row>
                                        <Col lg='4' className='pe-lg-0 text-lg-end text-start'>

                                            <Label className='mt-1' for='BookingSourceID'>
                                                <span className='text-danger'>*</span>Booking Source
                                            </Label>
                                        </Col>

                                        <Col lg='8'>

                                            <Select
                                                theme={selectThemeColors}
                                                className='react-select'
                                                classNamePrefix='select'
                                                options={bookingSourceOptions}
                                                isClearable={false}
                                                value={bookingSourceOptions?.filter(c => c.value === editBookingSourceID)}
                                                onChange={e => setEditBookingSourceID(e.value)}
                                                invalid={editDisplay && editBookingSourceID === ''}
                                            />
                                            {bookingSourceLoader ? <span>loading ... </span> : null }
                                            {editDisplay === true && !editBookingSourceID ? <span className='error_msg_lbl bookingSource'>Booking Source is required </span> : <></>}
                                        </Col>

                                    </Row>
                                </Col>
                                <Col md='6'>
                                    <Row>
                                        <Col lg='4' className='pe-lg-0 text-lg-end text-start'>

                                            <Label for='bookingSourceName' className='mt-1'>
                                                <span className='text-danger'>*</span>Name
                                            </Label>
                                        </Col>

                                        <Col lg='8'>

                                            <Input
                                                type='text'
                                                name='editSourceType'
                                                id='editSourceType'
                                                value={editSourceType}
                                                onChange={e => setEditSourceType(e.target.value)}
                                                invalid={editDisplay && editSourceType.trim() === ''}
                                            />
                                            {editDisplay === true && !editSourceType.trim() ? <span className='error_msg_lbl'>Name is required </span> : <></>}
                                        </Col>

                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col md='12 my-2 d-flex justify-content-center'>
                                    <Button className='me-2' color='primary' onClick={editHandleSubmit}>Submit</Button>
                                    <Button
                                        color='secondary'
                                        outline
                                        onClick={handleEditModal}
                                    >
                                        Cancel
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </>
                </ModalBody>
            </Modal>
        )
    }

    const DeleteSourceTypeModal = ({ id }) => {

        const data = sourceTypeList?.filter(sourceType => sourceType.SourceTypeID === id)
        const [sourceTypeId] = useState(data[0]?.SourceTypeID)

        const sourceTypeDelete = () => {
            const sourceTypeDelBody = {
                LoginID: userId,
                Token: "123",
                Seckey: "abc",
                Event: "delete",
                SourceTypeID: sourceTypeId
            }
            try {
                axios.post(`/getdata/bookingdata/sourcetype`, sourceTypeDelBody)
                    .then(() => {
                        refreshList()
                    })
            } catch (error) {
                console.log("Source Type Delete Error", error.message)
            }
        }

        const handleDeleteSourceType = () => {
            sourceTypeDelete()
            setDel(!del)
        }

        return (
            <Modal
                isOpen={del}
                toggle={() => setDel(!del)}
                className='modal-dialog-centered'
                backdrop={false}
            >
                <ModalHeader className='bg-transparent' toggle={() => setDel(!del)}>
                    Are you sure to delete  {data[0]?.SourceType} permanently?
                </ModalHeader>
                <ModalBody>
                    <Row className='text-center'>
                        <Col xs={12}>
                            <Button color='danger' className='m-1' onClick={handleDeleteSourceType}>
                                Delete
                            </Button>
                            <Button className='m-1' color='secondary' outline onClick={() => setDel(!del)}>
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
        )
    }

    return (
        <>
            {
                !loader ? (
                    <>
                        <Card className='bg-light mb-0'>
                            <CardBody>
                                <Row>
                                    <Col lg='5'>
                                        <Row>
                                            <Col md='4 pe-lg-0 text-md-end text-start'>
                                                <Label className='mt-1' for='BookingSourceID'>
                                                    <span className='text-danger'>*</span>Booking Source
                                                </Label>
                                            </Col>

                                            <Col md='8'>
                                                <Select
                                                    theme={selectThemeColors}
                                                    className='react-select'
                                                    classNamePrefix='select'
                                                    options={bookingSourceOptions}
                                                    isClearable={false}
                                                    value={bookingSourceOptions?.filter(c => c.value === BookingSourceID)}
                                                    onChange={e => {
                                                        handleBookingSource(e.value)
                                                    }}
                                                    invalid={display && BookingSourceID === ''}
                                                />
                                                {display === true && !BookingSourceID ? <span className='error_msg_lbl'>Select Booking Source </span> : null}

                                            </Col>

                                        </Row>
                                    </Col>
                                    <Col lg='5'>
                                        <Row>
                                            <Col md='4 test-lg-start text-md-end text-start'>
                                                <Label className='mt-1' for='SourceType'>
                                                    <span className='text-danger'>*</span>Name
                                                </Label>
                                            </Col>
                                            <Col md='8 mt-md-1 mt-lg-0'>
                                                <Input
                                                    type='text'
                                                    name='SourceType'
                                                    id='SourceType'
                                                    value={SourceType}
                                                    onChange={e => setSourceType(e.target.value)}
                                                    invalid={display && SourceType.trim() === ''}
                                                />
                                                {display === true && !SourceType.trim() ? <span className='error_msg_lbl'>Name is required </span> : null}
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col lg='2 mt-1 mt-lg-0 text-center'>
                                        <Button color='primary' onClick={handleSubmit}>Submit</Button>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>

                    </>
                ) : (
                    <div className='bg-light mb-0'>
                        <Spinner color='primary' style={{ marginLeft: '45%' }} />
                    </div>
                )
            }
            < Card >
                <CardBody>
                    <div className='text-center'>
                        {
                            <DataTable
                                noHeader
                                data={sourceTypeList}
                                columns={sourceTypeTable}
                                className='react-dataTable'
                                pagination
                                progressPending={loader}
                            />
                        }
                    </div>
                    <div>
                        <Button className='me-2' color='primary' onClick={refreshList}>Reload</Button>
                    </div>
                </CardBody>
                {showEdit ? <EditSourceTypeModal id={selected_sourceType} /> : <></>}
                {del ? <DeleteSourceTypeModal id={selected_sourceType} /> : <></>}
                {
                    showEdit | del ? (
                        <div class="modal-backdrop fade show" ></div>
                    ) : null
                }
            </Card >
        </>
    )
}

export default SourceType