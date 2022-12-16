import { React, useEffect, useState } from 'react'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { ChevronDown, Edit, Trash } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Badge, Button, Input, Label, Modal, ModalBody, ModalHeader, Card, CardBody, CardHeader, CardTitle, Col, Row, Spinner } from 'reactstrap'
import axios from '../../../API/axios'
import toast from "react-hot-toast"

const Floor = () => {
  const [roomList, setRoomList] = useState([])

  const [sel_room, setSel_room] = useState()

  const [show, setShow] = useState(false)
  const handleModal = () => setShow(!show)

  const [showEdit, setShowEdit] = useState(false)
  const handleEditModal = () => setShowEdit(!showEdit)

  const [del, setDel] = useState(false)

  const [roomTypeDropDown, setRoomTypeDropDown] = useState([])

  const [loader, setLoader] = useState(false)

  const [dropdownLoader, setDropdownLoader] = useState(false)
  const [roomStatusDropDown, setRoomStatusDropDown] = useState([])

  const userId = localStorage.getItem('user-id')

  const roomTypeDropDownList = () => {
    setDropdownLoader(true)
    const roomTypeDropDownBody = {
      LoginID: userId,
      Token: "123",
      Seckey: "abc",
      Event: "select"
    }
    try {
      axios.post(`/getdata/bookingdata/roomtype`, roomTypeDropDownBody)
        .then(response => {
          setRoomTypeDropDown(response?.data[0])
          setDropdownLoader(false)
        })
    } catch (error) {
      setDropdownLoader(false)
      console.log("Room Type DropDown Error", error.message)
    }
  }
  const roomTypeDropDownOptions = roomTypeDropDown?.length && roomTypeDropDown[0]?.RoomType ? roomTypeDropDown?.map((roomType) => {
    return { value: roomType.RoomTypeID, label: roomType.RoomType }
  }) : [{ value: 'reload', label: 'Error loading, click to reload again' }]

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
        })
    } catch (error) {
      setDropdownLoader(false)
      console.log("Room Type Dropdown Error", error.message)
    }
  }
  const statusOptions = roomStatusDropDown?.length > 0 && roomStatusDropDown[0]?.Status ? roomStatusDropDown?.map((status) => {
    return { value: status.StatusID, label: status.Status }
  }) : [{ value: 'reload', label: 'Error loading, click to reload again' }]

  const floorList = () => {
    setLoader(true)
    const floorListBody = {
      LoginID: userId,
      Token: "123",
      Seckey: "abc",
      Event: "select"
    }
    try {
      axios.post(`/getdata/bookingdata/floordetails`, floorListBody)
        .then(response => {
          setRoomList(response?.data[0])
          setLoader(false)
        })
    } catch (error) {
      setLoader(false)
      console.log("Floor List Error", error.message)
    }
  }
  // const statusOptions = roomList?.map((status) => {
  //   return { value: status.StatusID, label: status.Status }
  // })

  useEffect(() => {
    floorList()
    roomTypeDropDownList()
    roomStatusDropdown()
  }, [])

  const NewFloorModal = () => {
    const [FloorNo, setFloorNo] = useState('')
    const [RoomNo, setRoomNo] = useState('')
    const [RoomTypeID, setRoomTypeID] = useState('')
    const [StatusID, setStatusID] = useState('')
    const [display, setDisplay] = useState(false)

    const handleRoomStatus = (value) => {
      if (value === 'reload') {
        roomStatusDropdown()
        return
      }
      setStatusID(value)
    }

    const handleRoomTypeDropDownList = (value) => {
      if (value === 'reload') {
        roomTypeDropDownList()
        return
      }
      setRoomTypeID(value)
    }

    const insertFloor = () => {
      const insertFloorBody = {
        LoginID: userId,
        Token: "123",
        Seckey: "abc",
        Event: "insert",
        PropertyID: null,
        FloorNo,
        FloorDesc: "",
        RoomID: "RDT004",
        RoomNo,
        RoomTypeID,
        Description: "",
        StatusID
      }
      try {
        axios.post(`/getdata/bookingdata/floordetails`, insertFloorBody)
          .then(() => {
            floorList()
          })
      } catch (error) {
        console.log("Floor Insert Error", error.message)
      }
    }

    const reset = () => {
      setFloorNo('')
      setRoomNo('')
      setRoomTypeID('')
      setStatusID('')
      setDisplay(false)
    }

    const handleSubmit = () => {
      setDisplay(true)
      if (FloorNo.trim() && RoomTypeID && RoomNo.trim() && StatusID !== '') {
        insertFloor()
        handleModal()
        toast.success('Form Submitted!', { position: "top-center" })
        reset()
      }
    }
    console.log("Modal show")

    return (
      <>
        <Modal
          isOpen={show}
          toggle={() => {
            reset()
          }}
          className='modal-dialog-centered modal-lg'
        >
          <ModalHeader className='bg-transparent' toggle={handleModal}>
            Add Room to Floor
          </ModalHeader>
          {
            !dropdownLoader ? (
              <>
                <ModalBody className='px-sm-2 mx-50'>
                  <>
                    <Row className='mb-1'>
                      <Col>
                        <Label className='form-label'>
                          <span className='text-danger'>*</span>Floor</Label>
                        <Input
                          type='text'
                          placeholder='Floor Number'
                          value={FloorNo}
                          onChange={e => setFloorNo(e.target.value)}
                          invalid={display ? FloorNo.trim() === '' : false}
                        />
                        {display && FloorNo.trim() === '' && <span className='text-danger'>Floor is required</span>}
                      </Col>
                      <Col>
                        <Label className='form-label'>
                          <span className='text-danger'>*</span>Room Type</Label>
                        <Select
                          theme={selectThemeColors}
                          className='react-select w-100'
                          classNamePrefix='select'
                          placeholder='Select Room Type'
                          options={roomTypeDropDownOptions}
                          value={roomTypeDropDownOptions?.filter(c => c.value === RoomTypeID)}
                          onChange={e => {
                            handleRoomTypeDropDownList(e.value)
                          }
                          }
                        />
                        {display && RoomTypeID === '' && <p className='text-danger'>Room Type is required</p>}
                      </Col>
                    </Row>
                    <Row className='mb-1'>
                      <Col>
                        <Label className='form-label'>
                          <span className='text-danger'>*</span>Room Number</Label>
                        <Input
                          type='text'
                          placeholder='Room Number'
                          value={RoomNo}
                          onChange={e => setRoomNo(e.target.value)}
                          invalid={display ? RoomNo.trim() === '' : false}
                        />
                        {display && RoomNo.trim() === '' && <span className='text-danger'>Room Number is required</span>}
                      </Col>
                      <Col>
                        <Label className='form-label'>
                          <span className='text-danger'>*</span>Room Status</Label>
                        <Select
                          theme={selectThemeColors}
                          className='react-select w-100'
                          classNamePrefix='select'
                          placeholder='Select Room status'
                          options={statusOptions}
                          value={statusOptions?.filter(c => c.value === StatusID)}
                          onChange={e => {
                            handleRoomStatus(e.value)
                          }}
                        />
                        {display && StatusID === '' && <span className='text-danger'>Room Status is required</span>}
                      </Col>
                    </Row>
                    <Row className='mb-1'>
                      <Col className='text-center'>
                        <Button color='primary me-2' onClick={handleSubmit}>Submit</Button>
                        <Button color='secondary' className='me-2' onClick={
                          () => {
                            setShow(!show)
                            reset()
                          }
                        }
                          outline>Cancel</Button>
                      </Col>
                    </Row>
                  </>
                </ModalBody>
              </>
            ) : (
              <div style={{ height: '150px' }}>
                <Spinner color="primary" style={{ marginTop: '50px', marginLeft: '50%' }} />
              </div>
            )
          }

        </Modal>
      </>
    )
  }

  const EditFloorModal = ({ id }) => {
    const data = roomList?.filter(floor => floor.FloorID === id)

    // const [editStatusID] = useState(data[0]?.StatusID)
    const [editRoomID] = useState(data[0]?.RoomID)
    const [editFloorNo, setEditFloorNo] = useState(data[0]?.FloorNo)
    const [editRoomNo, setEditRoomNo] = useState(data[0]?.RoomNo)
    const [editRoomTypeID, setEditRoomTypeID] = useState(data[0]?.RoomTypeID)
    const [editStatusID, setEditStatusID] = useState(data[0]?.StatusID)
    const [editDisplay, setEditDisplay] = useState(false)

    const editFloor = () => {
      const editFloorBody = {
        LoginID: userId,
        Token: "123",
        Seckey: "abc",
        Event: "update",
        FloorID: id,
        PropertyID: null,
        FloorNo: editFloorNo,
        FloorDesc: "",
        RoomID: editRoomID,
        RoomNo: editRoomNo,
        RoomTypeID: editRoomTypeID,
        Description: "",
        StatusID: editStatusID
      }
      try {
        axios.post(`/getdata/bookingdata/floordetails`, editFloorBody)
          .then(() => {
            floorList()
          })
      } catch (error) {
        console.log("Edit Floor Error", error.message)
      }
    }

    const handleRoomStatus = (value) => {
      if (value === 'reload') {
        roomStatusDropdown()
        return
      }
      // setStatusID(value)
      setEditStatusID(value)
    }

    const handleRoomTypeDropDownList = (value) => {
      if (value === 'reload') {
        roomTypeDropDownList()
        return
      }
      setEditRoomTypeID(value)
    }

    const handleUpdate = () => {
      setEditDisplay(true)
      if (editFloorNo && editRoomNo.trim() && editRoomTypeID && editStatusID !== '') {
        editFloor()
        handleEditModal()
        toast.success("Floor Updated Successfully", { position: 'top-center' })
      }
    }

    return (
      <>
        <Modal
          isOpen={showEdit}
          className='modal-dialog-centered modal-lg'
        >
          <ModalHeader className='bg-transparent' toggle={handleEditModal}>
            Update Floor Details
          </ModalHeader>
          {
            !dropdownLoader ? (
              <>
                <ModalBody className='px-sm-2 mx-50'>
                  <>
                    <Row className='mb-1'>
                      <Col>
                        <Label className='form-label'>
                          <span className='text-danger'>*</span>Floor</Label>
                        <Input
                          type='text'
                          placeholder='Floor Number'
                          value={editFloorNo}
                          onChange={e => setEditFloorNo(e.target.value)}
                          invalid={editDisplay ? editFloorNo === '' : false}
                        />
                        {editDisplay && editFloorNo === '' && <span className='text-danger'>Floor is required</span>}
                      </Col>
                      <Col>
                        <Label className='form-label'>
                          <span className='text-danger'>*</span>Room Type</Label>
                        <Select
                          theme={selectThemeColors}
                          className='react-select w-100'
                          classNamePrefix='select'
                          placeholder='Select Room Type'
                          options={roomTypeDropDownOptions}
                          value={roomTypeDropDownOptions.filter(c => c.value === editRoomTypeID)}
                          onChange={e => {
                            handleRoomTypeDropDownList(e.value)
                          }
                          }
                        />
                        {editDisplay && editRoomTypeID === '' && <p className='text-danger'>Room Type is required</p>}
                      </Col>
                    </Row>
                    <Row className='mb-1'>
                      <Col>
                        <Label className='form-label'>
                          <span className='text-danger'>*</span>Room Number</Label>
                        <Input
                          type='text'
                          placeholder='Room Number'
                          value={editRoomNo}
                          onChange={e => setEditRoomNo(e.target.value)}
                          invalid={editDisplay && editRoomNo.trim() === ''}
                        />
                        {editDisplay && editRoomNo.trim() === '' && <span className='text-danger'>Room Number is required</span>}
                      </Col>
                      <Col>
                        <Label className='form-label'>
                          <span className='text-danger'>*</span>Room Status</Label>
                        <Select
                          theme={selectThemeColors}
                          className='react-select w-100'
                          classNamePrefix='select'
                          placeholder='Select Room status'
                          options={statusOptions}
                          value={statusOptions?.filter(c => c.value === editStatusID)}
                          onChange={e => {
                            handleRoomStatus(e.value)
                          }}
                        />
                        {editDisplay && editStatusID === '' && <span className='text-danger'>Room Status is required</span>}
                      </Col>
                    </Row>
                    <Row className='mb-1'>
                      <Col className='text-center'>
                        <Button color='primary me-2' onClick={() => handleUpdate()}>Submit</Button>
                        <Button color='secondary' className='me-2' onClick={
                          () => {
                            setShowEdit(handleEditModal)
                          }
                        }
                          outline>Cancel</Button>
                      </Col>
                    </Row>
                  </>
                </ModalBody>
              </>
            ) : (
              <div style={{ height: '150px' }}>
                <Spinner color="primary" style={{ marginTop: '50px', marginLeft: '50%' }} />
              </div>
            )
          }
        </Modal>
      </>
    )
  }

  const DeleteFloorModal = ({ id }) => {

    const deleteFloor = () => {
      const deleteFloorBody = {
        LoginID: userId,
        Token: "123",
        Seckey: "abc",
        Event: "delete",
        FloorID: id
      }
      try {
        axios.post(`/getdata/bookingdata/floordetails`, deleteFloorBody)
          .then(() => {
            floorList()
          })
      } catch (error) {
        console.log("Floor Delete Error", error.message)
      }
    }
    const deleteRoom = () => {
      deleteFloor()
      setDel(!del)
    }

    return (
      <>
        <Modal
          className='modal-dialog-centered'
          isOpen={del}
        >
          <ModalHeader className='bg-transparent' toggle={() => setDel(!del)}>
            Are you sure to delete permanently?
          </ModalHeader>
          <ModalBody>
            <Row className='text-center'>
              <Col xs={12}>
                <Button className='m-1' color='danger' onClick={() => deleteRoom()}>Delete</Button>
                <Button className='mx-1' color='secondary' outline onClick={() => setDel(!del)}>Cancel</Button>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      </>
    )
  }

  const roomListColumns = [
    {
      name: 'ID',
      width: '220px',
      selector: row => row.FloorID
    },
    {
      name: 'Floor',
      width: '120px',
      sortable: true,
      selector: row => row.FloorNo
    },
    {
      name: 'Room No.',
      width: '120px',
      sortable: true,
      selector: row => row.RoomNo
    },
    {
      name: 'Room Type',
      width: '220px',
      sortable: true,
      selector: row => row.RoomType
    },
    {
      name: 'Status',
      sortable: true,
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
      sortable: true,
      center: true,
      selector: row => {
        return (
          <>
            <Col>
              <Edit
                className='me-50 pe-auto'
                size={15}
                onClick={() => {
                  setShowEdit(true)
                  setSel_room(row.FloorID)
                }}
              />
              <Trash
                className='me-50'
                size={15}
                onClick={() => {
                  setDel(true)
                  setSel_room(row.FloorID)
                }}
              />
            </Col>
          </>
        )
      }
    }
  ]
  console.log("show", show)

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            Floor Master
          </CardTitle>
          <Button color='primary' onClick={() => {
            setShow(true)
            roomTypeDropDownList()
            roomStatusDropdown()
          }}>Add Room</Button>
        </CardHeader>
        <CardBody>
          <Row className='my-1'>
            <Col>
              <DataTable
                noHeader
                pagination
                data={roomList}
                columns={roomListColumns}
                className='react-dataTable'
                sortIcon={<ChevronDown size={10} />}
                paginationRowsPerPageOptions={[10, 25, 50, 100]}
                progressPending={loader}
              />
            </Col>
          </Row>
          <div>
            <Button className='me-2' color='primary' onClick={floorList}>Reload</Button>
          </div>
        </CardBody>
      </Card>
      {show ? <NewFloorModal /> : <></>}
      {showEdit ? <EditFloorModal id={sel_room} /> : <></>}
      {del ? <DeleteFloorModal id={sel_room} /> : <></>}
    </>
  )
}

export default Floor