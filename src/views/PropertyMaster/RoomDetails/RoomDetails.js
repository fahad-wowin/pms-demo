import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { ChevronDown, Edit, Trash } from 'react-feather'
import { Button, Card, CardBody, CardText, CardTitle, Col, Row, CardHeader, Badge } from 'reactstrap'
import axios from '../../../API/axios'
import AddNewRoom from './AddNewRoom'
import DeleteRoom from './DeleteRoom'
import UpdateRoom from './UpdateRoom'

const RoomType = () => {

    const [roomTypes, setRoomTypes] = useState([])

    const [sel_id, setSel_id] = useState()

    const [newRoom, setNewRoom] = useState(false)
    const handleNewRoom = () => setNewRoom(!newRoom)

    const [update, setUpdate] = useState(false)
    const handleUpdate = () => setUpdate(!update)

    const [deleteRoom, setDeleteRoom] = useState(false)
    const handleDelete = () => setDeleteRoom(!deleteRoom)

    const [roomTypeDropDown, setRoomTypeDropDown] = useState([])
    const [roomStatusDropDown, setRoomStatusDropDown] = useState([])
    const [bedTypeDropDown, setBedTypeDropDown] = useState([])
    const [extraBedTypeDropDown, setExtraBedTypeDropDown] = useState([])
    const [roomViewsList, setRoomViewsList] = useState([])

    const [loader, setLoader] = useState(false)

    const [RoomTypeID, setRoomTypeID] = useState("")
    const [BedTypeID, setBedTypeID] = useState("")
    const [ExtraBedTypeID, setExtraBedTypeID] = useState("")
    const [RoomViewID, setRoomViewID] = useState("")
    const [RoomStatusID, setRoomStatusID] = useState('')
    const [editRoomTypeID, setEditRoomTypeID] = useState()
    const [editBedTypeID, setEditBedTypeID] = useState()
    const [editExtraBedTypeID, setEditExtraBedTypeID] = useState()
    const [editRoomViewID, setEditRoomViewID] = useState()
    const [editRoomStatusID, setEditRoomStatusID] = useState()

    const [dropdownLoader, setDropdownLoader] = useState(false)

    const userId = localStorage.getItem('user-id')

    const roomDetailsList = () => {
        setLoader(true)
        try {
            const roomDetailsListBody = {
                LoginID: userId,
                Token: "123",
                Seckey: "abc",
                Event: "select"
            }
            axios.post(`/getdata/bookingdata/roomdetails`, roomDetailsListBody)
                .then(detailResponse => {
                    setRoomTypes(detailResponse?.data[0])
                    setLoader(false)
                })
        } catch (error) {
            setLoader(false)
            console.log("Room Details Error", error.message)
        }
    }


    useEffect(() => {
        roomDetailsList()
    }, [])

    const roomTypeDropdown = () => {
        setDropdownLoader(true)
        try {
            const roomTypeDropdownBody = {
                LoginID: userId,
                Token: "123",
                Seckey: "abc",
                Event: "select"
            }
            axios.post(`/getdata/bookingdata/roomtype`, roomTypeDropdownBody)
                .then(typeResponse => {
                    setRoomTypeDropDown(typeResponse?.data[0])
                    setDropdownLoader(false)
                })

        } catch (error) {
            setDropdownLoader(false)
            console.log("Room Type Dropdown Error", error.message)
        }
    }
    const roomTypeDropDownOptions = roomTypeDropDown?.length > 0 && roomTypeDropDown[0]?.RoomType ? roomTypeDropDown?.map((roomType) => {
        return { value: roomType.RoomTypeID, label: roomType.RoomType }
    }) : [{ value: 'reload', label: 'Error loading, click to reload again' }]

    const handleRoomType = (value) => {
        if (value === 'reload') {
            setDropdownLoader(true)
            try {
                const roomTypeDropdownBody = {
                    LoginID: userId,
                    Token: "123",
                    Seckey: "abc",
                    Event: "select"
                }
                axios.post(`/getdata/bookingdata/roomtype`, roomTypeDropdownBody)
                    .then(typeResponse => {
                        setRoomTypeDropDown(typeResponse?.data[0])
                        setDropdownLoader(false)
                    })

            } catch (error) {
                setDropdownLoader(false)
                console.log("Room Type Dropdown Error", error.message)
            }
            return
        }
        setRoomTypeID(value)
        setEditRoomTypeID(value)
    }

    const roomStatusDropdown = () => {
        setDropdownLoader(true)
        try {
            const roomStatusDropdownBody = {
                LoginID: userId,
                Token: "123",
                Seckey: "abc",
                Event: "select"
            }
            axios.post(`/getdata/bookingdata/roomstatus`, roomStatusDropdownBody)
                .then(statusResponse => {
                    setRoomStatusDropDown(statusResponse?.data[0])
                    setDropdownLoader(false)
                    console.log("Room status Dropdown", statusResponse?.data[0])

                })

        } catch (error) {
            setDropdownLoader(false)
            console.log("Room Type Dropdown Error", error.message)
        }
    }

    const statusOptions = roomStatusDropDown?.length > 0 && roomStatusDropDown[0]?.Status ? roomStatusDropDown?.map((status) => {
        return { value: status.StatusID, label: status.Status }
    }) : [{ value: 'reload', label: 'Error loading, click to reload again' }]

    const handleRoomStatus = (value) => {
        if (value === 'reload') {
            setDropdownLoader(true)
            try {
                const roomStatusDropdownBody = {
                    LoginID: userId,
                    Token: "123",
                    Seckey: "abc",
                    Event: "select"
                }
                axios.post(`/getdata/bookingdata/roomstatus`, roomStatusDropdownBody)
                    .then(statusResponse => {
                        setRoomStatusDropDown(statusResponse?.data[0])
                        setDropdownLoader(false)
                        console.log("Room status Dropdown - ", statusResponse?.data[0])

                    })

            } catch (error) {
                setDropdownLoader(false)
                console.log("Room Type Dropdown Error", error.message)
            }
            return
        }
        setRoomStatusID(value)
        setEditRoomStatusID(value)
    }

    const bedTypeDropdown = () => {
        setDropdownLoader(true)
        try {
            const bedTypeDropdownBody = {
                LoginID: userId,
                Token: "123",
                Seckey: "abc",
                Event: "select"
            }
            axios.post(`/getdata/bookingdata/bedtype`, bedTypeDropdownBody)
                .then(response => {
                    setBedTypeDropDown(response?.data[0])
                    setDropdownLoader(false)
                })
        } catch (error) {
            setDropdownLoader(false)
            console.log("Bed Type Dropdown Error", error.message)
        }
    }
    const bedTypeDropDownOptions = bedTypeDropDown?.length > 0 && bedTypeDropDown[0]?.BedType ? bedTypeDropDown?.map((bedType) => {
        return { value: bedType.BedTypeID, label: bedType.BedType }
    }) : [{ value: 'reload', label: 'Error loading, click to reload again' }]

    const handleBedType = (value) => {
        if (value === 'reload') {
            setDropdownLoader(true)
            try {
                const bedTypeDropdownBody = {
                    LoginID: userId,
                    Token: "123",
                    Seckey: "abc",
                    Event: "select"
                }
                axios.post(`/getdata/bookingdata/bedtype`, bedTypeDropdownBody)
                    .then(response => {
                        setBedTypeDropDown(response?.data[0])
                        setDropdownLoader(false)
                    })
            } catch (error) {
                setDropdownLoader(false)
                console.log("Bed Type Dropdown Error", error.message)
            }
            return
        }
        setBedTypeID(value)
        setEditBedTypeID(value)
    }

    const extraBedTypeDropdown = () => {
        setDropdownLoader(true)
        try {
            const extraBedTypeDropdownBody = {
                LoginID: userId,
                Token: "123",
                Seckey: "abc",
                Event: "select"
            }
            axios.post(`/getdata/bookingdata/extrabedtype`, extraBedTypeDropdownBody)
                .then(response => {
                    setExtraBedTypeDropDown(response?.data[0])
                    setDropdownLoader(false)
                })
        } catch (error) {
            setDropdownLoader(false)
            console.log("Extra Bed Type Dropdown Error", error.message)
        }
    }
    const extraBedTypeDropDownOptions = extraBedTypeDropDown?.length > 0 && extraBedTypeDropDown[0]?.ExtraBedType ? extraBedTypeDropDown?.map((extraBedType) => {
        return { value: extraBedType.ExtraBedTypeID, label: extraBedType.ExtraBedType }
    }) : [{ value: 'reload', label: 'Error loading, click to reload again' }]

    const handleExtraBedType = (value) => {
        if (value === 'reload') {
            setDropdownLoader(true)
            try {
                const extraBedTypeDropdownBody = {
                    LoginID: userId,
                    Token: "123",
                    Seckey: "abc",
                    Event: "select"
                }
                axios.post(`/getdata/bookingdata/extrabedtype`, extraBedTypeDropdownBody)
                    .then(response => {
                        setExtraBedTypeDropDown(response?.data[0])
                        setDropdownLoader(false)
                    })
            } catch (error) {
                setDropdownLoader(false)
                console.log("Extra Bed Type Dropdown Error", error.message)
            }
            return
        }
        setExtraBedTypeID(value)
        setEditExtraBedTypeID(value)
    }

    const roomViewDropdown = () => {
        setDropdownLoader(true)
        try {
            const roomViewDropdownBody = {
                LoginID: userId,
                Token: "123",
                Seckey: "abc",
                Event: "select"
            }
            axios.post('/getdata/bookingdata/roomviewdetails', roomViewDropdownBody)
                .then(response => {
                    setRoomViewsList(response?.data[0])
                    setDropdownLoader(false)
                })

        } catch (error) {
            setDropdownLoader(false)
            console.log("Room View Dropdown Error", error.message)
        }
    }
    const roomViewOptions = roomViewsList?.length > 0 && roomViewsList[0]?.RoomView ? roomViewsList?.map(function (roomview) {
        return { value: roomview.RoomViewID, label: roomview.RoomView }
    }) : [{ value: 'reload', label: 'Error loading, click to reload again' }]

    const handleRoomView = (value) => {
        if (value === 'reload') {
            setDropdownLoader(true)
            try {
                const roomViewDropdownBody = {
                    LoginID: userId,
                    Token: "123",
                    Seckey: "abc",
                    Event: "select"
                }
                axios.post('/getdata/bookingdata/roomviewdetails', roomViewDropdownBody)
                    .then(response => {
                        setRoomViewsList(response?.data[0])
                        setDropdownLoader(false)
                    })

            } catch (error) {
                setDropdownLoader(false)
                console.log("Room View Dropdown Error", error.message)
            }
            return
        }
        setRoomViewID(value)
        setEditRoomViewID(value)
    }
    useEffect(() => {
        roomViewDropdown()
        extraBedTypeDropdown()
        bedTypeDropdown()
        roomTypeDropdown()
        roomStatusDropdown()
    }, [])

    const roomDetailTable = [
        {
            name: 'ID',
            width: '220px',
            selector: row => row.RoomID
        },
        {
            name: 'Name',
            left: true,
            width: '200px',
            selector: row => row.RoomDisplayName
        },
        {
            name: 'Room Type',
            width: '200px',
            selector: row => row.RoomType
        },
        {
            name: 'Bed Type',
            width: '150px',
            selector: row => row.BedType
        },
        {
            name: 'Extra Bed Type',
            width: '150px',
            selector: row => row.ExtraBedType
        },
        {
            name: 'View',
            width: '150px',
            selector: row => row.RoomView
        },
        {
            name: 'Rate',
            selector: row => row.TotalAmount
        },
        {
            name: 'Status',
            selector: row => {
                return (
                    <>
                        {
                            row.Status === 'Active' ? (
                                <Badge color='light-success'> {row.Status}</Badge>
                            ) : (
                                <Badge color='light-danger'> {row.Status}</Badge>
                            )
                        }
                    </>
                )
            }
        },
        {
            name: 'Actions',
            selector: row => {
                return (
                    <>
                        <Col>
                            <Edit className='me-50 pe-auto'
                                size={15}
                                onClick={() => {
                                    handleUpdate()
                                    setSel_id(row.RoomID)
                                }}
                            />
                            <Trash
                                className='me-50'
                                size={15}
                                onClick={() => {
                                    handleDelete()
                                    setSel_id(row.RoomID)
                                }}
                            />
                        </Col>
                    </>
                )
            }
        }
    ]

    return (
        <>
            <Row>
                <Col md='12' className='mb-1'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Room Details</CardTitle>
                            <Button color='primary' onClick={() => {
                                handleNewRoom()
                                roomTypeDropdown()
                                roomStatusDropdown()
                                bedTypeDropdown()
                                extraBedTypeDropdown()
                                roomViewDropdown()
                            }}>Add Room</Button>
                        </CardHeader>
                        <CardBody>
                            <CardText>
                                <DataTable
                                    noHeader
                                    pagination
                                    data={roomTypes}
                                    columns={roomDetailTable}
                                    className='react-dataTable'
                                    sortIcon={<ChevronDown size={10} />}
                                    paginationRowsPerPageOptions={[10, 25, 50, 100]}
                                    progressPending={loader}
                                />
                            </CardText>
                            <div>
                                <Button className='me-2' color='primary' onClick={roomDetailsList}>Reload</Button>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            {newRoom ? <AddNewRoom open={newRoom} handleNewRoom={handleNewRoom} roomTypes={roomTypes} setRoomTypes={setRoomTypes} roomDetailsList={roomDetailsList} roomTypeDropDownOptions={roomTypeDropDownOptions} bedTypeDropDownOptions={bedTypeDropDownOptions} extraBedTypeDropDownOptions={extraBedTypeDropDownOptions} roomViewOptions={roomViewOptions} statusOptions={statusOptions} dropdownLoader={dropdownLoader} handleRoomType={handleRoomType} RoomTypeID={RoomTypeID} setRoomTypeID={setRoomTypeID} handleBedType={handleBedType} setBedTypeID={setBedTypeID} BedTypeID={BedTypeID} handleExtraBedType={handleExtraBedType} setExtraBedTypeID={setExtraBedTypeID} ExtraBedTypeID={ExtraBedTypeID} handleRoomView={handleRoomView} setRoomViewID={setRoomViewID} RoomViewID={RoomViewID} handleRoomStatus={handleRoomStatus} setRoomStatusID={setRoomStatusID} RoomStatusID={RoomStatusID} /> : <></>}
            {update ? <UpdateRoom open={update} handleUpdate={handleUpdate} roomTypes={roomTypes} id={sel_id} roomDetailsList={roomDetailsList} roomTypeDropDownOptions={roomTypeDropDownOptions} bedTypeDropDownOptions={bedTypeDropDownOptions} extraBedTypeDropDownOptions={extraBedTypeDropDownOptions} roomViewOptions={roomViewOptions} statusOptions={statusOptions} dropdownLoader={dropdownLoader} handleRoomType={handleRoomType} editRoomTypeID={editRoomTypeID} setEditRoomTypeID={setEditRoomTypeID} handleBedType={handleBedType} editBedTypeID={editBedTypeID} handleExtraBedType={handleExtraBedType} editExtraBedTypeID={editExtraBedTypeID} handleRoomView={handleRoomView} editRoomViewID={editRoomViewID} handleRoomStatus={handleRoomStatus} editRoomStatusID={editRoomStatusID} /> : <></>}
            {deleteRoom ? <DeleteRoom open={deleteRoom} handleDelete={handleDelete} roomTypes={roomTypes} id={sel_id} roomDetailsList={roomDetailsList} /> : <></>}
        </>
    )
}

export default RoomType

