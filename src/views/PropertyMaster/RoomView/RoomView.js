import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { Edit, Trash } from 'react-feather'
import { Button, Card, CardBody, CardText, Input, CardTitle, Col, Label, Modal, ModalBody, ModalHeader, Row, Spinner, CardHeader } from 'reactstrap'
import toast from 'react-hot-toast'
import axios from '../../../API/axios'

const RoomView = () => {
    const [show, setShow] = useState(false)
    const handleModal = () => setShow(!show)

    const [showEdit, setShowEdit] = useState(false)
    const handleEditModal = () => setShowEdit(!showEdit)
    const [loader, setLoader] = useState(false)
    const [selected_roomView, setSelected_roomView] = useState()

    const [del, setDel] = useState(false)

    const [roomViews, setRoomViews] = useState([])
    const [refresh, setRefresh] = useState(false)

    const userId = localStorage.getItem('user-id')

    const roomViewList = () => {
        setLoader(true)
        try {
            const roomTypeDetails = {
                LoginID: userId,
                Token: "123",
                Seckey: "abc",
                Event: 'select'
            }
            axios.post(`/getdata/bookingdata/roomviewdetails`, roomTypeDetails)
                .then(response => {
                    setRoomViews(response.data[0])
                    setLoader(false)
                })
            if (roomViews === []) { setRefresh(!true) }
        } catch (error) {
            setLoader(false)
            console.log("RoomType Error", error.message)
        }
    }
    useEffect(() => {
        roomViewList()
    }, [refresh])

    const NewRoomViewModal = () => {
        const [RoomView, setRoomView] = useState('')
        const [RoomViewDesc, setRoomViewDesc] = useState('')

        const [display, setDisplay] = useState(false)

        const addNewRoomView = () => {
            try {
                const roomTypeDetails = {
                    LoginID: userId,
                    Token: "123",
                    Seckey: "abc",
                    Event: 'insert',
                    RoomView,
                    RoomViewDesc
                }
                axios.post(`/getdata/bookingdata/roomviewdetails`, roomTypeDetails)
                    .then(() => {
                        roomViewList()
                    })
            } catch (error) {
                console.log("RoomType Error", error.message)
            }
        }
        const handleSubmit = () => {
            setDisplay(true)
            if (RoomView.trim() && RoomViewDesc.trim() !== '') {
                addNewRoomView()
                handleModal()
                toast.success('Room View Added!', { position: "top-center" })
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
                   Add Room View
                </ModalHeader>
                <ModalBody className='px-sm-2 mx-50 pb-5'>
                    <>
                        <Row className='mx-5'>
                            <Col md='12' className='mb-2'>
                                <Label className='form-label' for='roomView'>
                                    <span className='text-danger'>*</span>Room View
                                </Label>
                                <Input type='text' name='roomView' id='roomView' value={RoomView} onChange={e => setRoomView(e.target.value)} invalid={display && RoomView.trim() === ''} />
                                {display && !RoomView.trim() ? <span className='error_msg_lbl'>Enter Room View </span> : null}
                            </Col>
                            <Col md='12' className='mb-2'>
                                <Label className='form-label' for='RoomViewDesc'>
                                    <span className='text-danger'>*</span>Room View Description
                                </Label>
                                <Input type='textarea' name='RoomViewDesc' id='RoomViewDesc' value={RoomViewDesc} onChange={e => setRoomViewDesc(e.target.value)} invalid={display && RoomViewDesc.trim() === ''} />
                                {display && !RoomViewDesc.trim() ? <span className='error_msg_lbl'>Enter Room View Description </span> : null}
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
                    </>
                </ModalBody>
            </Modal>
        )
    }

    const EditRoomViewModal = ({ id }) => {
        const roomViewData = roomViews.filter(roomView => roomView.RoomViewID === id)

        const [editRoomView, setEditRoomView] = useState(roomViewData[0]?.RoomView)
        const [editRoomViewDesc, setEditRoomViewDesc] = useState(roomViewData[0]?.RoomViewDesc)

        const [editDisplay, setEditDisplay] = useState(false)

        const edtNewRoomView = () => {
            try {
                const roomTypeDetails = {
                    LoginID: userId,
                    Token: "123",
                    Seckey: "abc",
                    Event: 'update',
                    RoomViewID: id,
                    RoomView: editRoomView,
                    RoomViewDesc: editRoomViewDesc,
                    StatusID: 'SDT001'
                }
                axios.post(`/getdata/bookingdata/roomviewdetails`, roomTypeDetails).then(() => {
                    roomViewList()
                })
            } catch (error) {
                console.log("RoomType Error", error.message)
            }
        }
        const editHandleSubmit = () => {
            setEditDisplay(true)
            if (editRoomView.trim() && editRoomViewDesc.trim() !== '') {
                edtNewRoomView()
                handleEditModal()
                toast.success('Room View Edited Succesfully!', { position: "top-center" })
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
                    Edit Room View
                </ModalHeader>
                <ModalBody className='px-sm-2 mx-50 pb-5'>
                    <>
                        <Row className='mx-5'>
                            <Col md='12' className='mb-2'>
                                <Label className='form-label' for='roomView'>
                                    <span className='text-danger'>*</span>Room View
                                </Label>
                                <Input type='text' name='roomView' id='roomView' value={editRoomView} onChange={e => setEditRoomView(e.target.value)} invalid={editDisplay && editRoomView.trim() === ''} />
                                {editDisplay && !editRoomView.trim() ? <span className='error_msg_lbl'>Enter Room View </span> : null}
                            </Col>
                            <Col md='12' className='mb-2'>
                                <Label className='form-label' for='RoomViewDesc'>
                                    <span className='text-danger'>*</span>Room View Description
                                </Label>
                                <Input type='textarea' name='RoomViewDesc' id='RoomViewDesc' value={editRoomViewDesc} onChange={e => setEditRoomViewDesc(e.target.value)} invalid={editDisplay && editRoomViewDesc.trim() === ''} />
                                {editDisplay && !editRoomViewDesc.trim() ? <span className='error_msg_lbl'>Enter Room View Description </span> : null}
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
                                    onClick={handleEditModal}
                                >
                                    Cancel
                                </Button>
                            </Col>
                        </Row>
                    </>
                </ModalBody>
            </Modal>
        )
    }

    const DeleteRoomViewModal = ({ id }) => {

        const data = roomViews.filter(roomView => roomView.RoomViewID === id)

        const deleteNewRoomView = () => {
            try {
                const roomTypeDetails = {
                    LoginID: userId,
                    Token: "123",
                    Seckey: "abc",
                    Event: 'delete',
                    RoomViewID: id
                }
                axios.post(`/getdata/bookingdata/roomviewdetails`, roomTypeDetails).then(() => {
                    roomViewList()
                })
            } catch (error) {
                console.log("RoomType Error", error.message)
            }
        }
        const handleDeleteRoomView = () => {
            deleteNewRoomView()
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
                    Are you sure to delete  {data[0]?.roomView} permanently?
                </ModalHeader>
                <ModalBody>
                    <Row className='text-center'>
                        <Col xs={12}>
                            <Button color='danger' className='m-1' onClick={handleDeleteRoomView}>
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

    const roomViewTable = [
        {
            name: 'ID',
            width: '150px',
            sortable: true,
            selector: row => row.RoomViewID
        },
        {
            name: "Room View",
            sortable: true,
            selector: row => row.RoomView
        },
        {
            name: "Room View Description",
            selector: row => row.RoomViewDesc
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
                            setSelected_roomView(row.RoomViewID)
                        }} size={15} />
                        <Trash className='me-50' size={15} onClick={() => {
                            setDel(true)
                            setSelected_roomView(row.RoomViewID)
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
                    Room View
                    </CardTitle>
                    <Button color='primary' onClick={() => setShow(true)}>Add Room View</Button>
                </CardHeader>
                <CardBody>
                    <Row className='my-1'>
                        <Col>
                        <DataTable
                                    noHeader
                                    data={roomViews}
                                    columns={roomViewTable}
                                    className='react-dataTable'
                                    pagination
                                    progressPending={loader}
                                />
                        </Col>
                    </Row>
                    <div>
                        <Button className='me-2' color='primary' onClick={roomViewList}>Reload</Button>
                    </div>
                </CardBody>
            </Card>
            {/* <Row>
                <Col md='12' className='mb-1'>
                    <Card>
                        <CardBody>
                            <CardTitle tag='h1' className='fw-bold fs-2 d-flex justify-content-between'>
                                <h2>Room View</h2>
                                <Button color='primary' onClick={() => setShow(true)}>Add Room View</Button>
                            </CardTitle>
                            <CardText>

                                <DataTable
                                    noHeader
                                    data={roomViews}
                                    columns={roomViewTable}
                                    className='react-dataTable'
                                    pagination
                                    progressPending={loader}
                                />

                            </CardText>
                            <div>
                                <Button className='me-2' color='primary' onClick={roomViewList}>Reload</Button>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row> */}
            {show ? <NewRoomViewModal /> : <></>}
            {showEdit ? <EditRoomViewModal id={selected_roomView} /> : <></>}
            {del ? <DeleteRoomViewModal id={selected_roomView} /> : <></>}
            {
                show | showEdit | del ? (
                    <div class="modal-backdrop fade show" ></div>
                ) : null
            }
        </>
    )
}

export default RoomView