import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { Edit, Trash } from 'react-feather'
import { Button, Card, CardBody, CardText, Input, CardTitle, Col, Label, Modal, ModalBody, ModalHeader, Row, Form, CardHeader } from 'reactstrap'
import toast from 'react-hot-toast'
import axios from '../../../API/axios'

const BedType = () => {

    const [show, setShow] = useState(false)
    const handleModal = () => setShow(!show)

    const [showEdit, setShowEdit] = useState(false)
    const handleEditModal = () => setShowEdit(!showEdit)

    const [selected_bedType, setSelected_bedType] = useState('')

    const [del, setDel] = useState(false)

    const [bedTypes, setBedTypes] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [loader, setLoader] = useState(false)
    const userId = localStorage.getItem('user-id')

    const bedTypeList = () => {
        setLoader(true)
        try {
            const bedTypeBody = {
                LoginID: userId,
                Token: "123",
                Seckey: "abc",
                Event: 'select'
            }
            axios.post(`/getdata/bookingdata/bedtype`, bedTypeBody)
                .then(response => {
                    setBedTypes(response?.data[0])
                    setLoader(false)
                })
            if (refresh === []) {
                setRefresh(!refresh)
            }
        } catch (error) {
            setLoader(false)
            console.log("BedType Error", error.message)
        }
    }
    useEffect(() => {
        bedTypeList()
    }, [refresh])

    const NewBedTypeModal = () => {
        const [BedType, setBedType] = useState('')
        const [BedTypeDesc, setBedTypeDesc] = useState('')

        const [display, setDisplay] = useState(false)

        const createBedType = () => {
            try {
                const bedTypeBody = {
                    LoginID: userId,
                    Token: "123",
                    Seckey: "abc",
                    Event: 'insert',
                    BedType,
                    BedTypeDesc

                }
                axios.post(`/getdata/bookingdata/bedtype`, bedTypeBody)
                    .then(() => {
                        bedTypeList()
                    })
            } catch (error) {
                console.log("BedType Error", error.message)
            }
        }

        const handleSubmit = () => {
            setDisplay(true)
            if (BedType.trim() !== '') {
                createBedType()
                handleModal()
                toast.success('Bed Type Added!', { position: "top-center" })
            }
        }

        return (
            <Modal
                isOpen={show}
                toggle={handleModal}
                className='modal-dialog-centered modal-lg'
                backdrop={false}
            >
                <ModalHeader className='bg-transparent' toggle={handleModal}>
                    Add Bed Type
                </ModalHeader>
                <ModalBody className='px-sm-2 mx-50 pb-5'>
                    <>
                        <Form>
                            <Row className='mb-1'>
                                <Col>
                                    <Label for='BedType'><span className='text-danger'>*</span>Bed Type</Label>
                                    <Input
                                        type='text'
                                        name='BedType'
                                        placeholder='Bed Type name'
                                        value={BedType}
                                        onChange={e => setBedType(e.target.value)}
                                        invalid={display && BedType.trim() === ''}
                                    />
                                    {display === true && !BedType.trim() ? <span className='error_msg_lbl'>Enter Bed Type </span> : <></>}
                                </Col>
                                <Col>
                                    <Label for='BedTypeDesc'>Bed Type Description</Label>
                                    <Input
                                        type='text'
                                        name='BedTypeDesc'
                                        placeholder='Enter Description'
                                        value={BedTypeDesc}
                                        onChange={e => setBedTypeDesc(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Row tag='form' className='gy-1 gx-2 mt-75' >
                                <Col className='text-end mt-1' xs={12}>
                                    <Button className='me-1' color='primary' onClick={handleSubmit}> CREATE BED TYPE</Button>
                                    <Button
                                        color='secondary'
                                        outline
                                        onClick={() => {
                                            setShow(!show)
                                        }}
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

    const EditBedTypeModal = ({ id }) => {
        const bedTypeData = bedTypes?.filter(BedType => BedType.BedTypeID === id)

        const [statusId] = useState(bedTypeData[0]?.StatusID)
        const [editBedType, setEditBedType] = useState(bedTypeData[0]?.BedType)
        const [editBedTypeDesc, setEditBedTypeDesc] = useState(bedTypeData[0]?.BedTypeDesc)

        const [editDisplay, setEditDisplay] = useState(false)

        const createBedType = () => {
            try {
                const bedTypeBody = {
                    LoginID: userId,
                    Token: "123",
                    Seckey: "abc",
                    Event: 'update',
                    BedTypeID: id,
                    BedType: editBedType,
                    BedTypeDesc: editBedTypeDesc,
                    StatusID: statusId
                }
                axios.post(`/getdata/bookingdata/bedtype`, bedTypeBody)
                    .then(() => {
                        bedTypeList()
                    })
            } catch (error) {
                console.log("BedType Error", error.message)
            }
        }
        const editHandleSubmit = () => {
            setEditDisplay(true)
            if (editBedType.trim() !== '') {
                createBedType()
                handleEditModal()
                toast.success('Bed Type Edited Succesfully!', { position: "top-center" })
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
                    Edit Bed Type
                </ModalHeader>
                <ModalBody className='px-sm-2 mx-50 pb-5'>
                    <>
                        <Form>
                            <Row className='mb-1'>
                                <Col>
                                    <Label for='BedType'><span className='text-danger'>*</span>Bed Type</Label>
                                    <Input
                                        type='text'
                                        name='BedType'
                                        placeholder='Bed Type name'
                                        value={editBedType}
                                        onChange={e => setEditBedType(e.target.value)}
                                        invalid={editDisplay && editBedType.trim() === ''}
                                    />
                                    {editDisplay === true && !editBedType.trim() ? <span className='error_msg_lbl'>Enter Bed Type </span> : <></>}
                                </Col>
                                <Col>
                                    <Label for='BedTypeDesc'>Bed Type Description</Label>
                                    <Input
                                        type='text'
                                        name='BedTypeDesc'
                                        placeholder='Enter Description'
                                        value={editBedTypeDesc}
                                        onChange={e => setEditBedTypeDesc(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Row tag='form' className='gy-1 gx-2 mt-75' >
                                <Col className='text-end mt-1' xs={12}>
                                    <Button className='me-1' color='primary' onClick={editHandleSubmit}> Submit </Button>
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

    const DeleteBedTypeModal = ({ id }) => {

        const deleteBedType = () => {
            try {
                const bedTypeBody = {
                    LoginID: userId,
                    Token: "123",
                    Seckey: "abc",
                    Event: 'delete',
                    BedTypeID: id

                }
                axios.post(`/getdata/bookingdata/bedtype`, bedTypeBody)
                    .then(() => {
                        bedTypeList()
                    })
            } catch (error) {
                console.log("BedType Error", error.message)
            }
        }

        const handleDeleteBedType = () => {
            deleteBedType()
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
                    Are you sure to delete this permanently?
                </ModalHeader>
                <ModalBody>
                    <Row className='text-center'>
                        <Col xs={12}>
                            <Button color='danger' className='m-1' onClick={handleDeleteBedType}>
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

    const bedTypeTable = [
        {
            name: 'ID',
            sortable: true,
            selector: row => row.BedTypeID
        },
        {
            name: 'Bed Type',
            sortable: true,
            selector: row => row.BedType
        },
        {
            name: 'Description',
            selector: row => row.BedTypeDesc
        },
        {
            name: 'Actions',
            sortable: true,
            center: true,
            selector: row => (
                <>
                    <Col>
                        <Edit className='me-50 pe-auto' onClick={() => {
                            setShowEdit(true)
                            setSelected_bedType(row.BedTypeID)
                        }} size={15} />
                        <Trash className='me-50' size={15} onClick={() => {
                            setDel(true)
                            setSelected_bedType(row.BedTypeID)
                        }} />
                    </Col>


                </>
            )
        }
    ]

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Bed Type
                    </CardTitle>
                    <Button color='primary' onClick={handleModal}>Add Bed Type</Button>
                </CardHeader>
                <CardBody>
                    <Row className='my-1'>
                        <Col>
                            <DataTable
                                noHeader
                                data={bedTypes}
                                columns={bedTypeTable}
                                className='react-dataTable'
                                pagination
                                progressPending={loader}
                            />
                        </Col>
                    </Row>
                    <div>
                        <Button className='me-2' color='primary' onClick={bedTypeList}>Reload</Button>
                    </div>
                </CardBody>
            </Card>
            {/* <Row>
                <Col md='12'>
                    <Card>
                        <CardBody>
                            <CardTitle tag='h1' className='fw-bold fs-2 d-flex justify-content-between'>
                                <h2>Bed Type</h2>
                                <Button color='primary' onClick={handleModal}>Add Bed Type</Button>
                            </CardTitle>
                            <CardText>
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col className='react-dataTable'>
                                                <DataTable
                                                    noHeader
                                                    data={bedTypes}
                                                    columns={bedTypeTable}
                                                    className='react-dataTable'
                                                    pagination
                                                    progressPending={loader}
                                                />
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </CardText>
                            <div>
                                <Button className='me-2' color='primary' onClick={bedTypeList}>Reload</Button>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row> */}
            {show ? <NewBedTypeModal /> : <></>}
            {showEdit ? <EditBedTypeModal id={selected_bedType} /> : <></>}
            {del ? <DeleteBedTypeModal id={selected_bedType} /> : <></>}
            {
                show | showEdit | del ? (
                    <div class="modal-backdrop fade show" ></div>
                ) : null
            }
        </>
    )
}

export default BedType