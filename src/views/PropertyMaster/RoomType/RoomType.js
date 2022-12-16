import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { Edit, Trash } from 'react-feather'
import { Button, Card, CardBody, CardText, Input, CardTitle, Col, Label, Modal, ModalBody, ModalHeader, Row, CardHeader } from 'reactstrap'
import toast from 'react-hot-toast'
import axios from '../../../API/axios'

const RoomType = () => {
    const [show, setShow] = useState(false)
    const handleModal = () => setShow(!show)
    const [refresh, setRefresh] = useState(false)

    const [showEdit, setShowEdit] = useState(false)
    const handleEditModal = () => setShowEdit(!showEdit)
    const [selected_roomType, setSelected_roomType] = useState()
    const [del, setDel] = useState(false)
    const [roomTypes, setRoomTypes] = useState([])

    const [loader, setLoader] = useState(false)
    const userId = localStorage.getItem('user-id')

    const roomTypeList = () => {
        setLoader(true)
        try {
            const roomTypeDetails = {
                LoginID: userId,
                Token: "123",
                Seckey: "abc",
                Event: 'select'
            }
            axios.post(`/getdata/bookingdata/roomtype`, roomTypeDetails)
                .then(response => {
                    setRoomTypes(response.data[0])
                    setLoader(false)
                })
            if (roomTypes === []) { setRefresh(!refresh) }
        } catch (error) {
            setLoader(false)
            console.log("RoomType Error", error.message)
        }
    }
    useEffect(() => {
        roomTypeList()
    }, [refresh])

    const NewRoomTypeModal = () => {
        const [RoomType, setRoomType] = useState('')
        const [RoomTypeDesc, setRoomTypeDesc] = useState('')

        const [display, setDisplay] = useState(false)


        const addNewRoomType = () => {
            try {
                const roomTypeDetails = {
                    LoginID: userId,
                    Token: "123",
                    Seckey: "abc",
                    Event: 'insert',
                    RoomType,
                    RoomTypeDesc
                }
                axios.post(`/getdata/bookingdata/roomtype`, roomTypeDetails).then(() => {
                    roomTypeList()
                })
            } catch (error) {
                console.log("RoomType Error", error.message)
            }
        }

        const handleSubmit = () => {
            setDisplay(true)
            if (RoomType.trim() !== '') {
                addNewRoomType()
                handleModal()
                toast.success('RoomType Added!', { position: "top-center" })
            }
        }

        return (
            <Modal
                isOpen={show}
                toggle={handleModal}
                className='modal-dialog-centered modal-lg '
                backdrop={false}

            >
                <ModalHeader className='bg-transparent' toggle={handleModal}>
                    Add Room Type
                </ModalHeader>
                <ModalBody className='px-sm-2 mx-50 pb-5'>
                    <Row>
                        <Col md='12' className='mb-2'>
                            <Label className='form-label' for='roomType'>
                                <span className='text-danger'>*</span>Room Type
                            </Label>
                            <Input type='text' name='RoomType' id='RoomType' value={RoomType} onChange={e => setRoomType(e.target.value)} invalid={display && RoomType.trim() === ''} />
                            {display && !RoomType.trim() ? <span className='error_msg_lbl'>Enter Room Type </span> : null}
                        </Col>
                        <Col md='12' className='mb-2'>
                            <Label className='form-label' for='RoomTypeDesc'>Room Description</Label>
                            <Input type='textarea' name='RoomTypeDesc' id='RoomTypeDesc' value={RoomTypeDesc} onChange={e => setRoomTypeDesc(e.target.value)} />
                        </Col>
                    </Row>
                    <Row tag='form' className='gy-1 gx-2 mt-75' >
                        <Col className='text-end mt-1' xs={12}>
                            <Button className='me-1' color='primary' onClick={handleSubmit}>
                                Submit
                            </Button>
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
                </ModalBody>
            </Modal>
        )
    }

    const EditRoomTypeModal = ({ id }) => {

        const roomTypeData = roomTypes.filter(roomType => roomType.RoomTypeID === id)
        const [editStatusID] = useState(roomTypeData[0]?.StatusID)

        const [editRoomType, setEditRoomType] = useState(roomTypeData[0]?.RoomType)
        const [editRoomTypeDesc, setEditRoomTypeDesc] = useState(roomTypeData[0]?.RoomTypeDesc)
        const [editDisplay, setEditDisplay] = useState(false)

        const edtNewRoomType = () => {
            try {
                const roomTypeDetails = {
                    LoginID: userId,
                    Token: "123",
                    Seckey: "abc",
                    Event: 'update',
                    RoomTypeID: id,
                    RoomType: editRoomType,
                    RoomTypeDesc: editRoomTypeDesc,
                    StatusID: editStatusID
                }
                axios.post(`/getdata/bookingdata/roomtype`, roomTypeDetails).then(() => {
                    roomTypeList()
                })
            } catch (error) {
                console.log("RoomType Error", error.message)
            }
        }
        const editHandleSubmit = () => {
            setEditDisplay(true)
            if (editRoomType.trim() !== '') {
                edtNewRoomType()
                handleEditModal()
                toast.success('RoomType Edited Successfully!', { position: "top-center" })
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
                    Edit Room Type
                </ModalHeader>
                <ModalBody className='px-sm-2 mx-50 pb-5'>
                    <Row>
                        <Col md='12' className='mb-2'>
                            <Label className='form-label' for='RoomType'>
                                <span className='text-danger'>*</span>Room Type
                            </Label>
                            <Input type='text' name='RoomType' id='RoomType' value={editRoomType} onChange={e => setEditRoomType(e.target.value)} invalid={editDisplay && editRoomType.trim() === ''} />
                            {editDisplay && !editRoomType.trim() ? <span className='error_msg_lbl'>Enter Room Type </span> : null}
                        </Col>
                        <Col md='12' className='mb-2'>
                            <Label className='form-label' for='RoomTypeDesc'>Room Description</Label>
                            <Input type='textarea' name='RoomTypeDesc' id='RoomTypeDesc' value={editRoomTypeDesc} onChange={e => setEditRoomTypeDesc(e.target.value)} />
                        </Col>
                    </Row>
                    <Row tag='form' className='gy-1 gx-2 mt-75' >
                        <Col className='text-end mt-1' xs={12}>
                            <Button className='me-1' color='primary' onClick={editHandleSubmit}>
                                Submit
                            </Button>
                            <Button
                                color='secondary'
                                outline
                                onClick={() => {
                                    setShowEdit(handleEditModal)
                                }}
                            >
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
        )
    }

    const DeleteRoomTypeModal = ({ id }) => {

        const data = roomTypes.filter(roomTypes => roomTypes.RoomTypeID === id)
        const edtNewRoomType = () => {
            try {
                const roomTypeDetails = {
                    LoginID: userId,
                    Token: "123",
                    Seckey: "abc",
                    Event: 'delete',
                    RoomTypeID: id
                }
                axios.post(`/getdata/bookingdata/roomtype`, roomTypeDetails).then(() => {
                    roomTypeList()
                })
            } catch (error) {
                console.log("RoomType Error", error.message)
            }
        }
        const handleDeleteRoomType = () => {
            edtNewRoomType()
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
                    Are you sure to delete {data[0]?.RoomType} permanently?
                </ModalHeader>
                <ModalBody>
                    <Row className='text-center'>
                        <Col xs={12}>
                            <Button color='danger' className='m-1' onClick={handleDeleteRoomType}>
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

    const roomTypeTable = [
        {
            name: 'ID',
            sortable: true,
            selector: row => row.RoomTypeID
        },
        {
            name: 'Room Type',
            sortable: true,
            selector: row => row.RoomType
        },
        {
            name: "Room Description",
            selector: row => row.RoomTypeDesc
        },
        {
            name: 'Action',
            sortable: true,
            center: true,
            selector: row => (
                <>
                    <Col>
                        <Edit className='me-50 pe-auto' onClick={() => {
                            setShowEdit(true)
                            setSelected_roomType(row.RoomTypeID)
                        }} size={15} />
                        <Trash className='me-50' onClick={() => {
                            setDel(true)
                            setSelected_roomType(row.RoomTypeID)
                        }} size={15} />
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
                        Room Type
                    </CardTitle>
                    <Button color='primary' onClick={() => setShow(true)}>Add Room Type</Button>
                </CardHeader>
                <CardBody>
                    <Row className='my-1'>
                        <Col>
                            <DataTable
                                noHeader
                                data={roomTypes}
                                columns={roomTypeTable}
                                className='react-dataTable'
                                pagination
                                progressPending={loader}
                            />
                        </Col>
                    </Row>
                    <div>
                        <Button className='me-2' color='primary' onClick={roomTypeList}>Reload</Button>
                    </div>
                </CardBody>
            </Card>
            {/* <Row>
                <Col md='12' className='mb-1'>
                    <Card>
                        <CardBody>
                            <CardTitle tag='h1' className='fw-bold fs-2 d-flex justify-content-between'>
                                <h2>Room Type</h2>
                                <Button color='primary' onClick={() => setShow(true)}>Add Room Type</Button>
                            </CardTitle>
                            <CardText>
                                <DataTable
                                    noHeader
                                    data={roomTypes}
                                    columns={roomTypeTable}
                                    className='react-dataTable'
                                    pagination
                                    progressPending={loader}
                                />
                            </CardText>
                            <div>
                                <Button className='me-2' color='primary' onClick={roomTypeList}>Reload</Button>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row> */}
            {show ? <NewRoomTypeModal /> : <></>}
            {showEdit ? <EditRoomTypeModal id={selected_roomType} /> : <></>}
            {del ? <DeleteRoomTypeModal id={selected_roomType} /> : <></>}
            {
                show | showEdit | del ? (
                    <div class="modal-backdrop fade show" ></div>
                ) : null
            }

        </>
    )
}

export default RoomType