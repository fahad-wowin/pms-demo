import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { Edit, Trash } from 'react-feather'
import { Button, Card, CardBody, CardText, Input, CardTitle, Col, Label, Modal, ModalBody, ModalHeader, Row, Form, CardHeader } from 'reactstrap'
import toast from 'react-hot-toast'
import axios from '../../../API/axios'

const ExtraBedType = () => {
    const [show, setShow] = useState(false)
    const handleModal = () => setShow(!show)

    const [showEdit, setShowEdit] = useState(false)
    const handleEditModal = () => setShowEdit(!showEdit)

    const [selected_extraBedType, setSelected_extraBedType] = useState()

    const [del, setDel] = useState(false)

    const [extraBedTypes, setExtraBedTypes] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [loader, setLoader] = useState(false)

    const userId = localStorage.getItem('user-id')

    const extraBedTypeList = () => {
        setLoader(true)
        const extraBedTypeBody = {
            LoginID: userId,
            Token: "123",
            Seckey: "abc",
            Event: 'select'
        }
        try {
            axios.post(`/getdata/bookingdata/extrabedtype`, extraBedTypeBody)
                .then(response => {
                    setExtraBedTypes(response.data[0])
                    setLoader(false)
                })
            if (extraBedTypes === []) { setRefresh(!refresh) }
        } catch (error) {
            setLoader(false)
            console.log("ExtraBedTypeError", error.message)
        }
    }
    useEffect(() => {
        extraBedTypeList()
    }, [refresh])

    const NewExtraBedTypeModal = () => {
        const [ExtraBedType, setExtraBedType] = useState('')
        const [ExtraBedTypeDesc, setExtraBedTypeDesc] = useState('')
        const [ExtraBedCharges, setExtraBedCharges] = useState('')
        const [display, setDisplay] = useState(false)

        const addExtraBedType = () => {

            const extraBedTypeBody = {
                LoginID: userId,
                Token: "123",
                Seckey: "abc",
                Event: 'insert',
                ExtraBedType,
                ExtraBedTypeDesc,
                ExtraBedCharges
            }
            try {
                axios.post(`/getdata/bookingdata/extrabedtype`, extraBedTypeBody)
                    .then(() => {
                        extraBedTypeList()
                    })
            } catch (error) {
                console.log("ExtraBedTypeError", error.message)
            }
        }

        const handleSubmit = () => {
            setDisplay(true)
            if (ExtraBedType.trim() && ExtraBedCharges.trim() !== '') {
                addExtraBedType()
                handleModal()
                toast.success('Extra Bed Type Added!', { position: "top-center" })
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
                    Add Extra Bed Type
                </ModalHeader>
                <ModalBody className='px-sm-2 mx-50 pb-5'>
                    <>
                        <Form>
                            <Row className='mb-1'>
                                <Col md='4'>
                                    <Label for='bedType'><span className='text-danger'>*</span>Extra Bed Type</Label>
                                    <Input
                                        type='text'
                                        name='extraBedType'
                                        placeholder='Extra Bed Type name'
                                        value={ExtraBedType}
                                        onChange={e => setExtraBedType(e.target.value)}
                                        invalid={display && ExtraBedType.trim() === ''}
                                    />
                                    {display === true && !ExtraBedType.trim() ? <span className='error_msg_lbl'>Extra Bed Type Required </span> : <></>}
                                </Col>
                                <Col md='4'>
                                    <Label for='bedTypeDesc'>Bed Type Description</Label>
                                    <Input
                                        type='text'
                                        name='ExtraBedTypeDesc'
                                        placeholder='Enter Description'
                                        value={ExtraBedTypeDesc}
                                        onChange={e => setExtraBedTypeDesc(e.target.value)}
                                    />
                                </Col>
                                <Col md='4'>
                                    <Label for='ExtraBedCharges'><span className='text-danger'>*</span>Extra Bed Charges</Label>
                                    <Input
                                        type='number'
                                        name='ExtraBedCharges'
                                        value={ExtraBedCharges}
                                        onChange={e => setExtraBedCharges(e.target.value)}
                                        invalid={display && ExtraBedCharges.trim() === ''}
                                    />
                                    {display === true && !ExtraBedCharges.trim() ? <span className='error_msg_lbl'>Extra Bed Charges Required </span> : <></>}
                                </Col>
                            </Row>
                            <Row tag='form' className='gy-1 gx-2 mt-75' >
                                <Col className='text-end mt-1' xs={12}>
                                    <Button className='me-1' color='primary' onClick={handleSubmit}> CREATE EXTRA BED TYPE</Button>
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

    const EditExtraBedTypeModal = ({ id }) => {
        const extraBedTypeData = extraBedTypes.filter(extraBedType => extraBedType.ExtraBedTypeID === id)
        const [editStatusId] = useState(extraBedTypeData[0]?.StatusID)

        const [editExtraBedType, setEditExtraBedType] = useState(extraBedTypeData[0]?.ExtraBedType)
        const [editExtraBedTypeDesc, setEditExtraBedTypeDesc] = useState(extraBedTypeData[0]?.ExtraBedTypeDesc)
        const [editExtraBedCharges, setEditExtraBedCharges] = useState(extraBedTypeData[0]?.ExtraBedCharges)

        const [editDisplay, setEditDisplay] = useState(false)

        const editExtBedType = () => {

            const extraBedTypeBody = {
                LoginID: userId,
                Token: "123",
                Seckey: "abc",
                Event: 'update',
                ExtraBedTypeID: id,
                ExtraBedType: editExtraBedType,
                ExtraBedTypeDesc: editExtraBedTypeDesc,
                StatusID: editStatusId,
                ExtraBedCharges: editExtraBedCharges
            }
            try {
                axios.post(`/getdata/bookingdata/extrabedtype`, extraBedTypeBody)
                    .then(() => {
                        extraBedTypeList()
                    })
            } catch (error) {
                console.log("ExtraBedTypeError", error.message)
            }
        }
        const editHandleSubmit = () => {
            setEditDisplay(true)
            // setRefresh(!refresh)
            if (editExtraBedType.trim() && editExtraBedCharges.trim() !== '') {
                editExtBedType()
                handleEditModal()
                toast.success('Extra Bed Type Edited Succesfully!', { position: "top-center" })
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
                    Edit Extra Bed Type
                </ModalHeader>
                <ModalBody className='px-sm-2 mx-50 pb-5'>
                    <>
                        <Form>
                            <Row className='mb-1'>
                                <Col md='4'>
                                    <Label for='bedType'><span className='text-danger'>*</span>Extra Bed Type</Label>
                                    <Input
                                        type='text'
                                        name='bedType'
                                        placeholder='Bed Type name'
                                        value={editExtraBedType}
                                        onChange={e => setEditExtraBedType(e.target.value)}
                                        invalid={editDisplay && editExtraBedType.trim() === ''}
                                    />
                                    {editDisplay === true && !editExtraBedType.trim() ? <span className='error_msg_lbl'>Extra Bed Type Required </span> : <></>}
                                </Col>
                                <Col md='4'>
                                    <Label for='bedTypeDesc'>Bed Type Description</Label>
                                    <Input
                                        type='text'
                                        name='bedTypeDesc'
                                        placeholder='Enter Description'
                                        value={editExtraBedTypeDesc}
                                        onChange={e => setEditExtraBedTypeDesc(e.target.value)}
                                    />
                                </Col>
                                <Col md='4'>
                                    <Label for='ExtraBedCharges'><span className='text-danger'>*</span>Extra Bed Charges</Label>
                                    <Input
                                        type='number'
                                        name='ExtraBedCharges'
                                        value={editExtraBedCharges}
                                        onChange={e => setEditExtraBedCharges(e.target.value)}
                                        invalid={editDisplay && editExtraBedCharges.trim() === ''}
                                    />
                                    {editDisplay === true && !editExtraBedCharges.trim() ? <span className='error_msg_lbl'>Extra Bed Charges Required </span> : <></>}
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

    const DeleteExtraBedTypeModal = ({ id }) => {

        const deleteExtraBedType = () => {

            const extraBedTypeBody = {
                LoginID: userId,
                Token: "123",
                Seckey: "abc",
                Event: 'delete',
                ExtraBedTypeID: id
            }
            try {
                axios.post(`/getdata/bookingdata/extrabedtype`, extraBedTypeBody)
                    .then(() => {
                        extraBedTypeList()
                    })
            } catch (error) {
                console.log("ExtraBedTypeError", error.message)
            }
        }
        const handleDeleteExtraBedType = () => {
            deleteExtraBedType()
            // setRefresh(!refresh)
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
                            <Button color='danger' className='m-1' onClick={handleDeleteExtraBedType}>
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

    const extraBedTypeTable = [
        {
            name: 'ID',
            sortable: true,
            selector: row => row.ExtraBedTypeID
        },
        {
            name: 'Extra Bed Type',
            sortable: true,
            selector: row => row.ExtraBedType
        },
        {
            name: 'Description',
            selector: row => row.ExtraBedTypeDesc
        },
        {
            name: 'Extra Bed Charges',
            selector: row => row.ExtraBedCharges
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
                            setSelected_extraBedType(row.ExtraBedTypeID)
                        }} size={15} />
                        <Trash className='me-50' size={15} onClick={() => {
                            setDel(true)
                            setSelected_extraBedType(row.ExtraBedTypeID)
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
                        Extra Bed Type
                    </CardTitle>
                    <Button color='primary' onClick={handleModal}>Add Extra Bed Type</Button>
                </CardHeader>
                <CardBody>
                    <Row className='my-1'>
                        <Col>
                            <DataTable
                                noHeader
                                data={extraBedTypes}
                                columns={extraBedTypeTable}
                                className='react-dataTable'
                                pagination
                                progressPending={loader}
                            />
                        </Col>
                    </Row>
                    <div>
                        <Button className='me-2' color='primary' onClick={extraBedTypeList}>Reload</Button>
                    </div>
                </CardBody>
            </Card>
            {/* <Row>
                <Col md='12'>
                    <Card>
                        <CardBody>
                            <CardTitle tag='h1' className='fw-bold fs-2 d-flex justify-content-between'>
                                <h2>Extra Bed Type</h2>
                                <Button color='primary' onClick={handleModal}>Add Extra Bed Type</Button>
                            </CardTitle>
                            <CardText>
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col className='react-dataTable'>
                                                <DataTable
                                                    noHeader
                                                    data={extraBedTypes}
                                                    columns={extraBedTypeTable}
                                                    className='react-dataTable'
                                                    pagination
                                                    progressPending={loader}
                                                />
                                            </Col>
                                        </Row>
                                        <div>
                                            <Button className='me-2' color='primary' onClick={extraBedTypeList}>Reload</Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row> */}
            {show ? <NewExtraBedTypeModal /> : <></>}
            {showEdit ? <EditExtraBedTypeModal id={selected_extraBedType} /> : <></>}
            {del ? <DeleteExtraBedTypeModal id={selected_extraBedType} /> : <></>}
            {
                show | showEdit | del ? (
                    <div class="modal-backdrop fade show" ></div>
                ) : null
            }
        </>
    )

}

export default ExtraBedType