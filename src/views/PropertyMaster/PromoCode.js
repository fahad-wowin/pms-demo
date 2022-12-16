import { React, useState } from 'react'
import {
  Card, CardBody, CardTitle, Input, InputGroupText, InputGroup, Row, Col, Button, Modal, ModalHeader, ModalBody, Form, Label, CardText, Badge, CardHeader
} from 'reactstrap'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import DataTable from 'react-data-table-component'
import Flatpickr from 'react-flatpickr'
import { Edit, Trash } from 'react-feather'
import toast from 'react-hot-toast'

const roomTypes = [
  { value: 'Super', label: 'Super' },
  { value: 'Deluxe', label: 'Deluxe' },
  { value: 'Normal', label: 'Normal' }

]

const ratePlans = [
  { value: 'All', label: 'All' },
  { value: 'xyz', label: 'xyz' }
]

const discounts = [
  { value: 'Rs', label: 'Rs' },
  { value: 'xyz', label: 'xyz' }
]

const statusOptions = [
  { value: true, label: 'ACTIVE' },
  { value: false, label: 'INACTIVE' }
]

// let data
// axios.get('https://jsonplaceholder.typicode.com/users').then(response => {
//   data = response.data
// })

const PromoCode = () => {

  const [show, setShow] = useState(false)
  const handleModal = () => setShow(!show)

  const [showEdit, setShowEdit] = useState(false)
  const handleEditModal = () => setShowEdit(!showEdit)

  const [selected_promoCode, setSelected_promoCode] = useState()

  const [del, setDel] = useState(false)

  const [promoCodes, setPromoCodes] = useState([
    {
      id: '1',
      rateCode: '121',
      roomType: 'Super Deluxe',
      ratePlan: 'abc',
      promoName: 'abc',
      promoCode: '321',
      fromDate: '2022-10-12',
      toDate: '2022-10-27',
      noOfUse: '6',
      noOfPeopleFrom: 'Mumbai',
      noOfPeopleTo: 'Goa',
      minRooms: '3',
      discount: '5',
      discountDropDown: '3',
      blackOutDates: '2',
      blackOutDatesInput: '5',
      status: true
    }
  ])

  const NewPromoCodeModal = () => {

    const [rateCode, setRateCode] = useState('')
    const [roomType, setRoomType] = useState('')
    const [ratePlan, setRatePlan] = useState('')
    const [promoName, setPromoName] = useState('')
    const [promoCode, setPromoCode] = useState('')
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const [noOfUse, setNoOfUse] = useState('')
    const [noOfPeopleFrom, setNoOfPeopleFrom] = useState('')
    const [noOfPeopleTo, setNoOfPeopleTo] = useState('')
    const [minRooms, setMinRooms] = useState('')
    const [discount, setDiscount] = useState('')
    const [discountDropDown, setDiscountDropDown] = useState('')
    const [blackOutDates, setBlackOutDates] = useState('')
    const [blackOutDatesInput, setBlackOutDatesInput] = useState('')

    const [display, setDisplay] = useState(false)

    const promoCodeObj = {
      id: Math.floor(Math.random() * 100),
      rateCode,
      roomType,
      ratePlan,
      promoName,
      promoCode,
      fromDate,
      toDate,
      noOfUse,
      noOfPeopleFrom,
      noOfPeopleTo,
      minRooms,
      discount,
      discountDropDown,
      blackOutDates,
      blackOutDatesInput,
      status: true
    }

    const handleSubmit = () => {
      setDisplay(true)
      if (promoCode && promoName && fromDate && toDate && roomType !== '') {
        setPromoCodes([...promoCodes, promoCodeObj])
        handleModal()
        toast.success('PromoCode Added!', { position: "top-center" })
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
            Promo Code Details
          </ModalHeader>
          <ModalBody className='px-sm-2 mx-50 pb-5'>
            <>
              <Form>
                <Row>
                  <Col className='d-flex mb-2' md='12'>
                    <Col md='2'>
                      <Label className='form-label' for='rate'>Rate Code</Label>
                      <Input type='text' name='rate' id='rate' placeholder='Rate Code' value={rateCode} onChange={e => setRateCode(e.target.value)} />
                    </Col>
                    <Col md='2 ms-2'>
                      <Label className='form-label' for='rateCode'>
                        <span className='text-danger'>*</span>Room Type
                      </Label>
                      <Select
                        theme={selectThemeColors}
                        className='react-select w-100 me-1'
                        classNamePrefix='select'
                        defaultValue={roomTypes[0]}
                        options={roomTypes}
                        isClearable={false}
                        onChange={e => setRoomType(e.value)}
                        invalid={display ? roomType === '' : false}
                      />
                      {display === true && !roomType ? <span className='error_msg_lbl'>Enter Room Type </span> : <></>}
                    </Col>
                    <Col md='2 ms-2'>
                      <Label className='form-label' for='rateCode'>Rate Plan</Label>
                      <Select
                        theme={selectThemeColors}
                        className='react-select w-100 me-1'
                        classNamePrefix='select'
                        defaultValue={ratePlans[0]}
                        options={ratePlans}
                        isClearable={false}
                        onChange={e => setRatePlan(e.value)}
                      />
                    </Col>
                    <Col md='2 ms-2'>
                      <Label className='form-label' for='promoName'>
                        <span className='text-danger'>*</span>Promo Name
                      </Label>
                      <Input type='text' name='promoName' id='promoName' placeholder='Promo Name' value={promoName} onChange={e => setPromoName(e.target.value)} invalid={display ? promoName === '' : false} />
                      {display === true && !promoName ? <span className='error_msg_lbl'>Enter Promo Name </span> : <></>}
                    </Col>
                    <Col md='2 ms-2'>
                      <Label className='form-label' for='promoCode'>
                        <span className='text-danger'>*</span>Promo Code
                      </Label>
                      <Input type='text' name='promoCode' id='promoCode' placeholder='Promo Code' value={promoCode} onChange={e => setPromoCode(e.target.value)} invalid={display ? promoCode === '' : false} />
                      {display === true && !promoCode ? <span className='error_msg_lbl'>Enter Promo Code </span> : <></>}
                    </Col>
                  </Col>
                </Row>
                <Row>
                  <Col md='12 mt-2' className='fw-bold fs-2'>
                    <h4>Promo Code Validity</h4>
                  </Col>
                </Row>
                <Row>
                  <Col md='4 mb-2'>
                    <Label for='fromDate'>
                      <span className='text-danger'>*</span>From Date
                    </Label>
                    {/* <InputGroup className='input-group-merge'>
                    <Flatpickr className='form-control' value={fromDate} onChange={date => setFromDate(date)} id='fromDate' />
                  </InputGroup> */}
                    <Input type='date' name='fromDate' id='fromDate' value={fromDate} onChange={e => setFromDate(e.target.value)} invalid={display ? fromDate === '' : false} />
                    {display === true && !fromDate ? <span className='error_msg_lbl'>Enter From Date </span> : <></>}
                  </Col>
                  <Col md='4 mb-2'>
                    <Label for='toDate'>
                      <span className='text-danger'>*</span>To Date
                    </Label>
                    {/* <InputGroup className='input-group-merge'>
                    <Flatpickr className='form-control' value={toDate} onChange={date => setToDate(date)} id='toDate' />
                  </InputGroup> */}
                    <Input type='date' name='toDate' id='toDate' value={toDate} onChange={e => setToDate(e.target.value)} invalid={display ? toDate === '' : false} />
                    {display === true && !toDate ? <span className='error_msg_lbl'>Enter To Date </span> : <></>}
                  </Col>
                </Row>
                <Row>
                  <Col md='2 mt-2' className='fw-bold fs-2'>
                    <h4>Applicability</h4>
                  </Col>
                </Row>
                <Row className='mb-2'>
                  <Col md='4'>
                    <Label className='w-50' for='noOfUse'>No Of Use</Label>
                    <Input type='text' name='noOfUse' id='noOfUse' placeholder='eg: 20' value={noOfUse} onChange={e => setNoOfUse(e.target.value)} />
                  </Col>
                  <Col md='4'>
                    <Label className='w-75' for='noOfPeople'>No Of People</Label>
                    <div className='d-flex'>
                      <Input type='text' name='noOfpeopleFrom' id='noOfpeopleFrom' placeholder='From' className='w-10' value={noOfPeopleFrom} onChange={e => setNoOfPeopleFrom(e.target.value)} />
                      <Input type='text' name='noOfPeopleTo' id='noOfPeopleTo' placeholder='To' className='w-10 ms-1' value={noOfPeopleTo} onChange={e => setNoOfPeopleTo(e.target.value)} />
                    </div>
                  </Col>
                  <Col md='4'>
                    <Label className='w-100' for='minRooms'>Min no. of Rooms to be Booked</Label>
                    <Input type='text' name='minRooms' id='minRooms' placeholder='1' className='w-10' value={minRooms} onChange={e => setMinRooms(e.target.value)} />
                  </Col>
                </Row>
                <Row>
                  <Col md='12 mt-2' className='fw-bol fs-2'>
                    <h4>Promo Code Discount</h4>
                  </Col>
                </Row>
                <Row className='mb-1 '>
                  <Col md='8'>
                    <div className='d-flex'>
                      <Label className='mt-1'>Discount</Label>
                      <Input type='text' placeholder='1' className='ms-2' value={discount} onChange={e => setDiscount(e.target.value)} />
                      <Select
                        theme={selectThemeColors}
                        className='react-select w-100 ms-2'
                        classNamePrefix='select'
                        defaultValue={discounts[0]}
                        options={discounts}
                        isClearable={false}
                        onChange={e => setDiscountDropDown(e.value)}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md='12'>
                    <div className='d-flex'>
                      <Label className='mt-1' for='blackOutDates'>Black Out Date</Label>
                      <Input type='date' name='blackOutDates' id='blackOutDates' className='w-25 ms-2' value={blackOutDates} onChange={e => setBlackOutDates(e.target.value)} />
                      <Input type='text' placeholder='Enter Dates' className='ms-2 w-25' value={blackOutDatesInput} onChange={e => setBlackOutDatesInput(e.target.value)} />
                    </div>
                  </Col>
                </Row>
                <Row className='gy-1 gx-2 mt-75' >
                  <Col className='text-center mt-1' xs={12}>
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
              </Form>
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

  const EditPromoCodeModal = ({ id }) => {
    const promoCodeData = promoCodes.filter(promoCode => promoCode.id === id)

    const [editRateCode, setEditRateCode] = useState(promoCodeData[0]?.rateCode)
    const [editRoomType, setEditRoomType] = useState(promoCodeData[0]?.roomType)
    const [editRatePlan, setEditRatePlan] = useState(promoCodeData[0]?.ratePlan)
    const [editPromoName, setEditPromoName] = useState(promoCodeData[0]?.promoName)
    const [editPromoCode, setEditPromoCode] = useState(promoCodeData[0]?.promoCode)
    const [editFromDate, setEditFromDate] = useState(promoCodeData[0]?.fromDate)
    const [editToDate, setEditToDate] = useState(promoCodeData[0]?.toDate)
    const [editNoOfUse, setEditNoOfUse] = useState(promoCodeData[0]?.noOfUse)
    const [editNoOfPeopleFrom, setEditNoOfPeopleFrom] = useState(promoCodeData[0]?.noOfPeopleFrom)
    const [editNoOfPeopleTo, setEditNoOfPeopleTo] = useState(promoCodeData[0]?.noOfPeopleTo)
    const [editMinRooms, setEditMinRooms] = useState(promoCodeData[0]?.minRooms)
    const [editDiscount, setEditDiscount] = useState(promoCodeData[0]?.discount)
    const [editDiscountDropDown, setEditDiscountDropDown] = useState(promoCodeData[0]?.discountDropDown)
    const [editBlackOutDates, setEditBlackOutDates] = useState(promoCodeData[0]?.blackOutDates)
    const [editBlackOutDatesInput, setEditBlackOutDatesInput] = useState(promoCodeData[0]?.blackOutDatesInput)
    const [newStatus, setNewStatus] = useState(promoCodeData[0]?.status)

    const [editDisplay, setEditDisplay] = useState(false)

    const editHandleSubmit = () => {
      setEditDisplay(true)
      if (editPromoCode && editPromoName && editFromDate && editToDate && editRoomType !== '') {
        promoCodes.map(promoCode => {
          if (promoCode.id === id) {
            promoCode.rateCode = editRateCode
            promoCode.roomType = editRoomType
            promoCode.ratePlan = editRatePlan
            promoCode.promoName = editPromoName
            promoCode.promoCode = editPromoCode
            promoCode.fromDate = editFromDate
            promoCode.toDate = editToDate
            promoCode.noOfUse = editNoOfUse
            promoCode.noOfPeopleFrom = editNoOfPeopleFrom
            promoCode.noOfPeopleTo = editNoOfPeopleTo
            promoCode.minRooms = editMinRooms
            promoCode.discount = editDiscount
            promoCode.discountDropDown = editDiscountDropDown
            promoCode.blackOutDates = editBlackOutDates
            promoCode.blackOutDatesInput = editBlackOutDatesInput
            if (newStatus === true) {
              promoCode.status = true
            } else {
              promoCode.status = false
            }
          }
        })
        handleEditModal()
        toast.success('PromoCode Edited Succesfully!', { position: "top-center" })
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
            Edit Promo Code Details
          </ModalHeader>
          <ModalBody className='px-sm-2 mx-50 pb-5'>
            <>
              <Form>
                <Row>
                  <Col className='d-flex mb-2' md='12'>
                    <Col md='2'>
                      <Label className='form-label' for='rate'>Rate Code</Label>
                      <Input type='text' name='rate' id='rate' placeholder='Rate Code' value={editRateCode} onChange={e => setEditRateCode(e.target.value)} />
                    </Col>
                    <Col md='2 ms-2'>
                      <Label className='form-label' for='rateCode'>
                        <span className='text-danger'>*</span>Room Type
                      </Label>
                      <Select
                        theme={selectThemeColors}
                        className='react-select w-100 me-1'
                        classNamePrefix='select'
                        defaultValue={roomTypes[0]}
                        options={roomTypes}
                        isClearable={false}
                        onChange={e => setEditRoomType(e.value)}
                        invalid={editDisplay ? editRoomType === '' : false}
                      />
                      {editDisplay === true && !editRoomType ? <span className='error_msg_lbl'>Enter Room Type </span> : <></>}
                    </Col>
                    <Col md='2 ms-2'>
                      <Label className='form-label' for='rateCode'>Rate Plan</Label>
                      <Select
                        theme={selectThemeColors}
                        className='react-select w-100 me-1'
                        classNamePrefix='select'
                        defaultValue={ratePlans[0]}
                        options={ratePlans}
                        isClearable={false}
                        onChange={e => setEditRatePlan(e.value)}
                      />
                    </Col>
                    <Col md='2 ms-2'>
                      <Label className='form-label' for='promoName'>
                        <span className='text-danger'>*</span>Promo Name
                      </Label>
                      <Input type='text' name='promoName' id='promoName' placeholder='Promo Name' value={editPromoName} onChange={e => setEditPromoName(e.target.value)} invalid={editDisplay ? editPromoName === '' : false} />
                      {editDisplay === true && !editPromoName ? <span className='error_msg_lbl'>Enter Promo Name </span> : <></>}
                    </Col>
                    <Col md='2 ms-2'>
                      <Label className='form-label' for='promoCode'>
                        <span className='text-danger'>*</span>Promo Code
                      </Label>
                      <Input type='text' name='promoCode' id='promoCode' placeholder='Promo Code' value={editPromoCode} onChange={e => setEditPromoCode(e.target.value)} invalid={editDisplay ? editPromoCode === '' : false} />
                      {editDisplay === true && !editPromoCode ? <span className='error_msg_lbl'>Enter Promo Code </span> : <></>}
                    </Col>
                  </Col>
                </Row>
                <Row>
                  <Col md='12 mt-2' className='fw-bold fs-2'>
                    <h4>Promo Code Validity</h4>
                  </Col>
                </Row>
                <Row>
                  <Col md='4 mb-2'>
                    <Label for='fromDate'>
                      <span className='text-danger'>*</span>From Date
                    </Label>
                    {/* <InputGroup className='input-group-merge'>
                    <Flatpickr className='form-control' value={picker} onChange={date => setPicker(date)} id='startDate' />
                  </InputGroup> */}
                    <Input type='date' name='fromDate' id='fromDate' value={editFromDate} onChange={e => setEditFromDate(e.target.value)} invalid={editDisplay ? editFromDate === '' : false} />
                    {editDisplay === true && !editFromDate ? <span className='error_msg_lbl'>Enter From Date </span> : <></>}
                  </Col>
                  <Col md='4 mb-2'>
                    <Label for='toDate'>
                      <span className='text-danger'>*</span>To Date
                    </Label>
                    <Input type='date' name='toDate' id='toDate' value={editToDate} onChange={e => setEditToDate(e.target.value)} invalid={editDisplay ? editToDate === '' : false} />
                    {editDisplay === true && !editToDate ? <span className='error_msg_lbl'>Enter To Date </span> : <></>}
                  </Col>
                </Row>
                <Row>
                  <Col md='2 mt-2' className='fw-bold fs-2'>
                    <h4>Applicability</h4>
                  </Col>
                </Row>
                <Row className='mb-2'>
                  <Col md='4'>
                    <Label className='w-50' for='noOfUse'>No Of Use</Label>
                    <Input type='text' name='noOfUse' id='noOfUse' placeholder='eg: 20' value={editNoOfUse} onChange={e => setEditNoOfUse(e.target.value)} />
                  </Col>
                  <Col md='4'>
                    <Label className='w-75' for='noOfPeople'>No Of People</Label>
                    <div className='d-flex'>
                      <Input type='text' name='noOfpeopleFrom' id='noOfpeopleFrom' placeholder='From' className='w-10' value={editNoOfPeopleFrom} onChange={e => setEditNoOfPeopleFrom(e.target.value)} />
                      <Input type='text' name='noOfPeopleTo' id='noOfPeopleTo' placeholder='To' className='w-10 ms-1' value={editNoOfPeopleTo} onChange={e => setEditNoOfPeopleTo(e.target.value)} />
                    </div>
                  </Col>
                  <Col md='4'>
                    <Label className='w-100' for='minRooms'>Min no. of Rooms to be Booked</Label>
                    <Input type='text' name='minRooms' id='minRooms' placeholder='1' className='w-10' value={editMinRooms} onChange={e => setEditMinRooms(e.target.value)} />
                  </Col>
                </Row>
                <Row>
                  <Col md='12 mt-2' className='fw-bold fs-2'>
                    <h4>Promo Code Discount</h4>
                  </Col>
                </Row>
                <Row className='mb-1 '>
                  <Col md='8'>
                    <div className='d-flex'>
                      <Label className='mt-1'>Discount</Label>
                      <Input type='text' placeholder='1' className='ms-2' value={editDiscount} onChange={e => setEditDiscount(e.target.value)} />
                      <Select
                        theme={selectThemeColors}
                        className='react-select w-100 ms-2'
                        classNamePrefix='select'
                        defaultValue={discounts[0]}
                        options={discounts}
                        isClearable={false}
                        onChange={e => setEditDiscountDropDown(e.value)}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md='12'>
                    <div className='d-flex mb-2'>
                      <Label className='mt-1' for='blackOutDates'>Black Out Date</Label>
                      <Input type='date' name='blackOutDates' id='blackOutDates' className='w-25 ms-2' value={editBlackOutDates} onChange={e => setEditBlackOutDates(e.target.value)} />
                      <Input type='text' placeholder='Enter Dates' className='ms-2 w-25' value={editBlackOutDatesInput} onChange={e => setEditBlackOutDatesInput(e.target.value)} />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md='4' className='mb-2'>
                    <Label className='form-label'>Select Status</Label>
                    <Select
                      placeholder=''
                      menuPlacement='auto'
                      theme={selectThemeColors}
                      className='react-select'
                      classNamePrefix='select'
                      options={statusOptions}
                      onChange={e => setNewStatus(e.value)}
                    />
                  </Col>
                </Row>
                <Row className='gy-1 gx-2 mt-75' >
                  <Col className='text-center mt-1' xs={12}>
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
              </Form>
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

  const DeletePromoCodeModal = ({ id }) => {

    const data = promoCodes.filter(promoCodes => promoCodes.id === id)

    const handleDeletePromoCode = () => {
      setPromoCodes(promoCodes.filter(promoCodes => promoCodes.id !== id))
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
            Are you sure to delete  {data[0]?.promoName} permanently?
          </ModalHeader>
          <ModalBody>
            <Row className='text-center'>
              <Col xs={12}>
                <Button color='danger' className='m-1' onClick={handleDeletePromoCode}>
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

  const promoCodeTable = [
    {
      name: '#',
      selector: row => row.id,
      width: '80px'
    },
    {
      name: "Promo Code",
      selector: row => row.promoCode,
      width: '130px'
    },
    {
      name: 'Promo Name',
      selector: row => row.promoName,
      width: '150px'
    },
    {
      name: 'Start Date',
      selector: row => row.fromDate
    },
    {
      name: 'End Date',
      selector: row => row.toDate
    },
    {
      name: 'Room Type',
      selector: row => row.roomType,
      width: '120px'
    },
    {
      name: 'Status',
      sortable: true,
      selector: row => {
        return (
          <>
            {
              row.status ? (
                <Badge color='light-success'>
                  ACTIVE
                </Badge>
              ) : (
                <Badge color='light-danger'>
                  INACTIVE
                </Badge>
              )
            }
          </>
        )
      }
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
              setSelected_promoCode(row.id)
            }} size={15} />
            <Trash className='me-50' size={15} onClick={() => {
              setDel(true)
              setSelected_promoCode(row.id)
            }} />
          </Col>
          <EditPromoCodeModal id={selected_promoCode} />
          <DeletePromoCodeModal id={selected_promoCode} />
        </>
      )

    }
  ]

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            Promo Code
          </CardTitle>
          <Button color='primary' onClick={() => setShow(true)}>Create New Code</Button>
        </CardHeader>
        <CardBody>
          <Row className='my-1'>
            <Col>
              <DataTable
                noHeader
                data={promoCodes}
                columns={promoCodeTable}
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
                <h2>Promo Code</h2>
                <Button color='primary' onClick={() => setShow(true)}>Create New Code</Button>
              </CardTitle>
              <CardText>
                <DataTable
                  noHeader
                  data={promoCodes}
                  columns={promoCodeTable}
                  className='react-dataTable'
                />
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row> */}
      <NewPromoCodeModal />
      <EditPromoCodeModal />
      <DeletePromoCodeModal />
    </>
  )
}

export default PromoCode