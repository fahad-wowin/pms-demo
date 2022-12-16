import React, { useState } from 'react'
import { Badge, Button, Card, CardBody, CardHeader, CardText, CardTitle, Col, Form, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import DataTable from 'react-data-table-component'
import { Edit, Trash } from 'react-feather'
import { GrStatusInfo } from "react-icons/gr"
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import toast from 'react-hot-toast'

const WakeUpCall = () => {

  const [show, setShow] = useState(false)
  const handleModal = () => setShow(!show)

  const [showEdit, setShowEdit] = useState(false)
  const handleEditModal = () => setShowEdit(!showEdit)

  const [status, setStatus] = useState(false)
  const handleStatus = () => setStatus(!status)

  const [selected_wakeUpCall, setSelected_wakeUpCall] = useState()

  const [del, setDel] = useState(false)

  const options = [
    { value: 'Done', label: 'Done' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Not Answered', label: 'Not Answered' },
    { value: 'Cancelled', label: 'Cancelled' }
  ]

  const [wakeUpCalls, setWakeUpCalls] = useState([
    {
      id: '1',
      guestName: 'abc',
      roomNo: '43',
      wakeUpDate: '2022-10-20',
      wakeUpTime: '5:30',
      option: 'Pending'
    }
  ])

  const NewWakeUpCallModal = () => {

    const [guestName, setGuestName] = useState('')
    const [roomNo, setRoomNo] = useState('')
    const [wakeUpDate, setWakeUpDate] = useState('')
    const [wakeUpTime, setWakeUpTime] = useState('')
    const [display, setDisplay] = useState(false)

    const wakeUpCallObj = {
      id: Math.floor(Math.random() * 100),
      guestName,
      roomNo,
      wakeUpDate,
      wakeUpTime,
      option: 'Pending'
    }

    const handleSubmit = () => {
      setDisplay(true)
      if (guestName && roomNo && wakeUpDate && wakeUpTime !== '') {
        setWakeUpCalls([...wakeUpCalls, wakeUpCallObj])
        handleModal()
        toast.success('WakeUp Call Added!', { position: "top-center" })
      }
      // else {
      //   toast.error('Fill All Fields!', {
      //     position: "top-center",
      //     style: {
      //       minWidth: '250px'
      //     },
      //     duration: 3000
      //   })
      // }
    }

    return (
      <>
        <Modal
          isOpen={show}
          toggle={handleModal}
          className='modal-dialog-centered modal-lg'
          backdrop={false}
        >
          <ModalHeader className='bg-transparent' toggle={handleModal}>
            Arrange new Wake-Up Call
          </ModalHeader>
          <ModalBody>
            <>
              <Row>
                <Col>
                  <Label>Search Customer by Room Number</Label>
                  <Input type='text' />
                </Col>
              </Row>
              <Row className='my-1'>
                <Form>
                  <Row className='mb-1 d-flex flex-md-row flex-column flex-wrap'>
                    <Col>
                      <Label for='guestName'>
                        <span className='text-danger'>*</span>Guest name
                      </Label>
                      <Input
                        type='text'
                        name='guestName'
                        id='guestName'
                        value={guestName}
                        onChange={e => setGuestName(e.target.value)}
                        invalid={display ? guestName === '' : false}
                      />
                      {display === true && !guestName ? <span className='error_msg_lbl'>Enter Guest Name </span> : <></>}
                    </Col>
                    <Col>
                      <Label for='roomNo'>
                        <span className='text-danger'>*</span>Room No.
                      </Label>
                      <Input
                        type='text'
                        name='roomNo'
                        id='roomNo'
                        value={roomNo}
                        onChange={e => setRoomNo(e.target.value)}
                        invalid={display ? roomNo === '' : false}
                      />
                      {display === true && !roomNo ? <span className='error_msg_lbl'>Enter Room No </span> : <></>}
                    </Col>
                    <Col>
                      <Label for='wakeUpDate'>
                        <span className='text-danger'>*</span>Wake-up Call Date
                      </Label>
                      <Input
                        type='date'
                        name='wakeUpDate'
                        id='wakeUpDate'
                        value={wakeUpDate}
                        onChange={e => setWakeUpDate(e.target.value)}
                        invalid={display ? wakeUpDate === '' : false}
                      />
                      {display === true && !wakeUpDate ? <span className='error_msg_lbl'>Enter WakeUp Date </span> : <></>}
                    </Col>
                    <Col>
                      <Label for='wakeUpTime'>
                        <span className='text-danger'>*</span>Wake-up Call Time
                      </Label>
                      <Input
                        type='time'
                        name='wakeUpTime'
                        value={wakeUpTime}
                        onChange={e => setWakeUpTime(e.target.value)}
                        invalid={display ? wakeUpTime === '' : false}
                      />
                      {display === true && !wakeUpTime ? <span className='error_msg_lbl'>Enter WakeUp Time </span> : <></>}
                    </Col>
                  </Row>
                  <Row className='d-flex flex-row justify-content-center align-items-center'>
                    <Col className='text-center'>
                      <Button className='m-1' color='primary' onClick={handleSubmit}>Arrange Call</Button>
                    </Col>
                    <Col className='text-center'>
                      <Button className='m-1' color='danger' onClick={handleModal}>Cancel</Button>
                    </Col>
                  </Row>
                </Form>
              </Row>
            </>
          </ModalBody>
        </Modal>
        {
          show ? (
            <div class="modal-backdrop fade show" ></div>
          ) : null
        }
      </>
    )
  }

  const EditWakeUpCallModal = ({ id }) => {
    const wakeUpCallData = wakeUpCalls.filter(wakeUpCall => wakeUpCall.id === id)

    const [editGuestName, setEditGuestName] = useState(wakeUpCallData[0]?.guestName)
    const [editRoomNo, setEditRoomNo] = useState(wakeUpCallData[0]?.roomNo)
    const [editWakeUpDate, setEditWakeUpDate] = useState(wakeUpCallData[0]?.wakeUpDate)
    const [editWakeUpTime, setEditWakeUpTime] = useState(wakeUpCallData[0]?.wakeUpTime)
    const [editDisplay, setEditDisplay] = useState(false)

    const editHandleSubmit = () => {
      setEditDisplay(true)
      if (editGuestName && editRoomNo && editWakeUpDate && editWakeUpTime !== '') {
        wakeUpCalls.map(wakeUpCall => {
          if (wakeUpCall.id === id) {
            wakeUpCall.guestName = editGuestName
            wakeUpCall.roomNo = editRoomNo
            wakeUpCall.wakeUpDate = editWakeUpDate
            wakeUpCall.wakeUpTime = editWakeUpTime
          }
        })
        handleEditModal()
        toast.success('WakeUp Call Edited Succesfully!', { position: "top-center" })
      }
      // else {
      //   toast.error('Fill All Fields!', {
      //     position: "top-center",
      //     style: {
      //       minWidth: '250px'
      //     },
      //     duration: 3000
      //   })
      // }
    }

    return (
      <>
        <Modal
          isOpen={showEdit}
          toggle={handleEditModal}
          className='modal-dialog-centered modal-lg'
          backdrop={false}
        >
          <ModalHeader className='bg-transparent' toggle={handleEditModal}>
           Edit Wake-Up Call
          </ModalHeader>
          <ModalBody>
            <>
              <Row>
                <Col>
                  <Label>Search Customer by Room Number, Name or email</Label>
                  <Input type='text' />
                </Col>
              </Row>
              <Row className='my-1'>
                <Form>
                  <Row className='mb-1 d-flex flex-md-row flex-column flex-wrap'>
                    <Col>
                      <Label for='guestName'>
                        <span className='text-danger'>*</span>Guest name
                      </Label>
                      <Input
                        type='text'
                        name='guestName'
                        id='guestName'
                        value={editGuestName}
                        onChange={e => setEditGuestName(e.target.value)}
                        invalid={editDisplay ? editGuestName === '' : false}
                      />
                      {editDisplay === true && !editGuestName ? <span className='error_msg_lbl'>Enter Guest Name </span> : <></>}
                    </Col>
                    <Col>
                      <Label for='roomNo'>
                        <span className='text-danger'>*</span>Room No.
                      </Label>
                      <Input
                        type='text'
                        name='roomNo'
                        id='roomNo'
                        value={editRoomNo}
                        onChange={e => setEditRoomNo(e.target.value)}
                        invalid={editDisplay ? editRoomNo === '' : false}
                      />
                      {editDisplay === true && !editRoomNo ? <span className='error_msg_lbl'>Enter Room No </span> : <></>}
                    </Col>
                    <Col>
                      <Label for='wakeUpDate'>
                        <span className='text-danger'>*</span>Wake-up Call Date
                      </Label>
                      <Input
                        type='date'
                        name='wakeUpDate'
                        id='wakeUpDate'
                        value={editWakeUpDate}
                        onChange={e => setEditWakeUpDate(e.target.value)}
                        invalid={editDisplay ? editWakeUpDate === '' : false}
                      />
                      {editDisplay === true && !editWakeUpDate ? <span className='error_msg_lbl'>Enter WakeUp Date </span> : <></>}
                    </Col>
                    <Col>
                      <Label for='wakeUpTime'>
                        <span className='text-danger'>*</span>Wake-up Call Time
                      </Label>
                      <Input
                        type='time'
                        name='wakeUpTime'
                        value={editWakeUpTime}
                        onChange={e => setEditWakeUpTime(e.target.value)}
                        invalid={editDisplay ? editWakeUpTime === '' : false}
                      />
                      {editDisplay === true && !editWakeUpTime ? <span className='error_msg_lbl'>Enter WakeUp Time </span> : <></>}
                    </Col>
                  </Row>
                  <Row className='d-flex flex-row justify-content-center align-items-center'>
                    <Col className='text-center'>
                      <Button className='m-1' color='success' onClick={editHandleSubmit}>Arrange Call</Button>
                    </Col>
                    <Col className='text-center'>
                      <Button className='m-1' color='danger' onClick={handleEditModal}>Cancel</Button>
                    </Col>
                  </Row>
                </Form>
              </Row>
            </>
          </ModalBody>
        </Modal>
        {
          showEdit ? (
            <div class="modal-backdrop fade show" ></div>
          ) : null
        }
      </>
    )
  }

  const StatusModal = ({ id }) => {
    const statusValueData = wakeUpCalls.filter(wakeUpCall => wakeUpCall.id === id)
    const [newOption, setNewOption] = useState(statusValueData[0]?.statusValue)
    const [optionDisplay, setOptionDisplay] = useState('')
    const statusHandleSubmit = () => {
      setOptionDisplay(true)
      if (newOption !== '') {
        wakeUpCalls.map(wakeUpCall => {
          if (wakeUpCall.id === id) {
            if (newOption === 'Pending') {
              // setWakeUpCalls({ ...wakeUpCalls, option: newOption })
              wakeUpCall.option = 'Pending'
            } else if (newOption === 'Done') {
              wakeUpCall.option = 'Done'
            } else if (newOption === 'Not Answered') {
              wakeUpCall.option = 'Not Answered'
            } else if (newOption === 'Cancelled') {
              wakeUpCall.option = 'Cancelled'
            }
          }
        })
        handleStatus()
        toast.success('Status Saved!', { position: "top-center" })
      }
      // else {
      //   toast.error('Fill All Fields!', {
      //     position: "top-center",
      //     style: {
      //       minWidth: '250px'
      //     },
      //     duration: 3000
      //   })
      // }
    }

    return (
      <>
        <Modal
          isOpen={status}
          toggle={handleStatus}
          className='modal-dialog-centered modal-sm'
          backdrop={false}
        >
          <ModalHeader className='bg-transparent' toggle={handleStatus}>
          </ModalHeader>
          <ModalBody>
            <>
              <Form>
                <Row>
                  <Col md='12' className='mb-1'>
                    <Label className='form-label' for='option'>
                      <span className='text-danger'>*</span>Status
                    </Label>
                    <Select
                      theme={selectThemeColors}
                      className='react-select w-100 me-1'
                      classNamePrefix='select'
                      options={options}
                      isClearable={false}
                      onChange={e => setNewOption(e.value)}
                      invalid={optionDisplay ? newOption === '' : false}
                    />
                    {optionDisplay === true && !newOption ? <span className='error_msg_lbl'>Please Select Status </span> : <></>}
                  </Col>
                </Row>
                <Row className='d-flex flex-row justify-content-center align-items-center'>
                  <Col className='text-center'>
                    <Button className='m-1' color='success' onClick={statusHandleSubmit}>Save</Button>
                  </Col>
                  <Col className='text-center'>
                    <Button className='m-1' color='danger' onClick={handleStatus}>Cancel</Button>
                  </Col>
                </Row>
              </Form>
            </>
          </ModalBody>
        </Modal >
        {
          status ? (
            <div class="modal-backdrop fade show" ></div>
          ) : null
        }
      </>
    )
  }

  const DeleteWakeUpCallModal = ({ id }) => {

    const data = wakeUpCalls.filter(wakeUpCall => wakeUpCall.id === id)

    const handleDeleteWakeUpCall = () => {
      setWakeUpCalls(wakeUpCalls.filter(wakeUpCall => wakeUpCall.id !== id))
      setDel(!del)
    }

    return (
      <>
        <Modal
          isOpen={del}
          toggle={() => setDel(!del)}
          className='modal-dialog-centered'
          backdrop={false}
        >
          <ModalHeader className='bg-transparent' toggle={() => setDel(!del)}>
            Are you sure to delete  {data[0]?.guestName} permanently?
          </ModalHeader>
          <ModalBody>
            <Row className='text-center'>
              <Col xs={12}>
                <Button color='danger' className='m-1' onClick={handleDeleteWakeUpCall}>
                  Delete
                </Button>
                <Button className='m-1' color='secondary' outline onClick={() => setDel(!del)}>
                  Cancel
                </Button>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
        {
          del ? (
            <div class="modal-backdrop fade show" ></div>
          ) : null
        }
      </>
    )
  }

  const wakeUpColumns = [
    {
      name: 'ID',
      sortable: true,
      width: '120px',
      selector: row => row.id
    },
    {
      name: 'Guest Name',
      sortable: true,
      selector: row => row.guestName
    },
    {
      name: 'Room No.',
      sortable: true,
      selector: row => row.roomNo
    },
    {
      name: 'Wake-up Date',
      sortable: true,
      selector: row => row.wakeUpDate
    },
    {
      name: 'Wake-up Time',
      sortable: true,
      selector: row => row.wakeUpTime
    },
    {
      name: 'Set Status',
      sortable: true,
      selector: row => {
        return (
          <>
            <Col>
              {console.log(row)}
              <GrStatusInfo className='me-50 pe-auto' onClick={() => {
                setSelected_wakeUpCall(row.id)
                setStatus(true)
              }} size={15} />
            </Col>
            <StatusModal id={selected_wakeUpCall} />
          </>
        )
      }
    },
    {
      name: 'Status Value',
      sortable: true,
      selector: row => row.option
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
              setSelected_wakeUpCall(row.id)
            }} size={15} />
            <Trash className='me-50' size={15} onClick={() => {
              setDel(true)
              setSelected_wakeUpCall(row.id)
            }} />
          </Col>
          <EditWakeUpCallModal id={selected_wakeUpCall} />
          <DeleteWakeUpCallModal id={selected_wakeUpCall} />
        </>
      )
    }
  ]

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
          Wake-Up Calls
          </CardTitle>
          <Button color='primary' onClick={() => setShow(true)}>New Wake-Up Call</Button>
        </CardHeader>
        <CardBody>
          <Row className='my-1'>
            <Col>
            <DataTable
                  noHeader
                  data={wakeUpCalls}
                  columns={wakeUpColumns}
                  className='react-dataTable'
                />
            </Col>
          </Row>
        </CardBody>
      </Card>
      {/* <Row>
        <Col md='12' className='mb-1'>
          <Card>
            <CardBody>
              <CardTitle tag='h1' className='fw-bold fs-2 d-flex justify-content-between'>
                <h2>Wake-Up Calls</h2>
                <Button color='primary' onClick={() => setShow(true)}>New Wake-Up Call</Button>
              </CardTitle>
              <CardText>
                <DataTable
                  noHeader
                  data={wakeUpCalls}
                  columns={wakeUpColumns}
                  className='react-dataTable'
                />
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row> */}
      <NewWakeUpCallModal />
      <EditWakeUpCallModal />
      <StatusModal />
      <DeleteWakeUpCallModal />
    </>
  )
}

export default WakeUpCall