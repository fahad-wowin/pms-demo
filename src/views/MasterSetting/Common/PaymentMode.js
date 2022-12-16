import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { Button, Card, CardBody, Col, Input, Row, Label, Modal, ModalHeader, ModalBody, Form, Spinner } from 'reactstrap'
import { Edit, Trash } from 'react-feather'
import toast from 'react-hot-toast'
import { selectThemeColors } from '@utils'
import Select from 'react-select'
import axios from '../../../API/axios'

const PaymentMode = ({ paymentModeList, loader, refreshPaymentModeList, paymentTypeList, refreshPaymentTpeList }) => {

  const [showEdit, setShowEdit] = useState(false)
  const handleEditModal = () => setShowEdit(!showEdit)

  const [selected_paymentMode, setSelected_paymentMode] = useState()

  const [del, setDel] = useState(false)

  const [PaymentMode, setPaymentMode] = useState('')
  const [PaymentTypeID, setPaymentTypeID] = useState('')

  const [display, setDisplay] = useState(false)

  const userId = localStorage.getItem('user-id')

  const paymentTypeOptions = paymentTypeList?.length > 0 && paymentTypeList[0]?.PaymentType ? paymentTypeList?.map(function (paymentType) {
    return { value: paymentType.PaymentTypeID, label: paymentType.PaymentType }
  }) : [{ value: 'reload', label: 'Error loading, click to reload again' }]


  const handlePaymentTypeList = (value) => {
    if (value === 'reload') {
      refreshPaymentTpeList()
      return
    }
    setPaymentTypeID(value)
  }

  const paymentModeInsert = () => {
    const paymentModeInsertBody = {
      LoginID: userId,
      Token: "123",
      Seckey: "abc",
      Event: "insert",
      PaymentMode,
      PaymentTypeID
    }
    try {
      axios.post(`/getdata/bookingdata/paymentmode`, paymentModeInsertBody)
        .then(() => {
          refreshPaymentModeList()
        })
    } catch (error) {
      console.log("Payment Mode Insert Error", error.message)
    }
  }

  const handleSubmit = () => {
    setDisplay(true)
    if (PaymentMode.trim() !== '') {
      paymentModeInsert()
      setPaymentMode('')
      setPaymentTypeID('')
      setDisplay(false)
      toast.success('Payment Mode Added!', { position: "top-center" })
    }
  }

  const EditPaymentModeModal = ({ id }) => {
    const paymentModeData = paymentModeList?.filter(paymentMode => paymentMode.PaymentModeID === id)

    const [editPaymentModeId] = useState(paymentModeData[0]?.PaymentModeID)
    const [editStatusId] = useState(paymentModeData[0]?.StatusID)

    const [editPaymentMode, setEditPaymentMode] = useState(paymentModeData[0]?.PaymentMode)
    const [editPaymentTypeID, setEditPaymentTypeID] = useState(paymentModeData[0]?.PaymentTypeID)

    const [editDisplay, setEditDisplay] = useState(false)

    const PaymentModeEdit = () => {
      const paymentModeEditBody = {
        LoginID: userId,
        Token: "123",
        Seckey: "abc",
        PaymentModeID: editPaymentModeId,
        Event: "update",
        PaymentMode: editPaymentMode,
        StatusID: editStatusId,
        PaymentTypeID: editPaymentTypeID
      }
      try {
        axios.post(`/getdata/bookingdata/paymentmode`, paymentModeEditBody)
          .then(() => {
            refreshPaymentModeList()
          })
      } catch (error) {
        console.log("Payment Mode Update Error", error.message)
      }
    }

    const editHandleSubmit = () => {
      setEditDisplay(true)
      if (editPaymentMode.trim() && editPaymentTypeID !== '') {
        PaymentModeEdit()
        handleEditModal()
        toast.success('Collection Type Edited Successfully!', { position: "top-center" })
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
          <h1 className=' mb-1'>Edit Payment Mode</h1>
        </ModalHeader>
        <ModalBody className='px-sm-2 mx-50 pb-5'>
          <>
            <Form>
              <Row>
                <Col md='6'>
                  <Row>
                    <Col lg='4' className='pe-lg-0 text-lg-end text-start'>
                      <Label className='mt-1' for='bookingSource'>
                        <span className='text-danger'>*</span>Payment Type
                      </Label>
                    </Col>
                    <Col lg='8'>
                      <Select
                        theme={selectThemeColors}
                        className='react-select'
                        classNamePrefix='select'
                        options={paymentTypeOptions}
                        isClearable={false}
                        value={paymentTypeOptions?.filter(c => c.value === editPaymentTypeID)}
                        onChange={e => setEditPaymentTypeID(e.value)}
                        invalid={editDisplay && editPaymentTypeID === ''}
                      />
                      {editDisplay === true && !editPaymentTypeID ? <span className='error_msg_lbl float-end'>Select Payment Type</span> : <></>}
                    </Col>
                  </Row>
                </Col>
                <Col md='6'>
                  <Row>
                    <Col lg='4' className='pe-lg-0 text-lg-end text-start'>
                      <Label for='editPaymentMode'>
                        <span className='text-danger'>*</span>Name
                      </Label>
                    </Col>
                    <Col lg='8'>
                      <Input
                        type='text'
                        name='editPaymentMode'
                        id='editPaymentMode'
                        value={editPaymentMode}
                        onChange={e => setEditPaymentMode(e.target.value)}
                        invalid={editDisplay && editPaymentMode.trim() === ''}
                      />
                      {editDisplay === true && !editPaymentMode.trim() ? <span className='error_msg_lbl'>Name is required </span> : <></>}
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
        </ModalBody >
      </Modal >
    )
  }

  const DeletePaymentModeModal = ({ id }) => {

    const data = paymentModeList?.filter(paymentMode => paymentMode.PaymentModeID === id)
    const [paymentModeId] = useState(data[0]?.PaymentModeID)

    const paymentModeDelete = () => {
      const paymentModeDeleteBody = {
        LoginID: userId,
        Token: "123",
        Seckey: "abc",
        Event: "delete",
        PaymentModeID: paymentModeId
      }
      try {
        axios.post(`/getdata/bookingdata/paymentmode`, paymentModeDeleteBody)
          .then(() => {
            refreshPaymentModeList()
          })
      } catch (error) {
        console.log("Payment Mode Delete Error", error.message)
      }
    }

    const handleDeletePaymentMode = () => {
      paymentModeDelete()
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
          Are you sure to delete  {data[0]?.PaymentMode} permanently?
        </ModalHeader>
        <ModalBody>
          <Row className='text-center'>
            <Col xs={12}>
              <Button color='danger' className='m-1' onClick={handleDeletePaymentMode}>
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

  const paymentModeTable = [
    {
      name: 'ID',
      selector: row => row.PaymentModeID
    },
    {
      name: 'Name',
      selector: row => row.PaymentMode
    },
    {
      name: 'Payment Type',
      selector: row => row.PaymentType
    },
    {
      name: 'Action',
      cell: row => (
        <>
          <Edit className='me-50 pe-auto' size={15} onClick={() => {
            setShowEdit(true)
            setSelected_paymentMode(row.PaymentModeID)
          }} />
          <Trash className='me-50' name={row.age} size={15} onClick={() => {
            setDel(true)
            setSelected_paymentMode(row.PaymentModeID)
          }} />
        </>
      )
    }
  ]

  return (
    <>
      {
        !loader ? (
          <>
            <Card className='bg-light mb-0'>
              <CardBody>
                <Row>
                  <Col lg='5' >
                    <Row>
                      <Col md='4 pe-lg-0 text-md-end text-start'>
                        <Label className='mt-1' for='bookingSource'>
                          <span className='text-danger'>*</span>Payment Type
                        </Label>
                      </Col>

                      <Col md='8'>
                        <Select
                          theme={selectThemeColors}
                          className='react-select'
                          classNamePrefix='select'
                          options={paymentTypeOptions}
                          isClearable={false}
                          value={paymentTypeOptions?.filter(c => c.value === PaymentTypeID)}
                          onChange={e => {
                            handlePaymentTypeList(e.value)
                          }}
                          invalid={display && PaymentTypeID === ''}
                        />
                        {display === true && !PaymentTypeID ? <span className='error_msg_lbl'>Select Payment Type </span> : null}
                      </Col>
                    </Row>
                  </Col>
                  <Col lg='5'>
                    <Row>
                      <Col md='4 test-lg-start text-md-end text-start'>
                        <Label className='mt-1' for='PaymentMode'>
                          <span className='text-danger'>*</span>Name
                        </Label>
                      </Col>
                      <Col md='8 mt-md-1 mt-lg-0'>
                        <Input
                          type='text'
                          name='PaymentMode'
                          id='PaymentMode'
                          value={PaymentMode}
                          onChange={e => setPaymentMode(e.target.value)}
                          invalid={display && PaymentMode.trim() === ''}
                        />
                        {display === true && !PaymentMode.trim() ? <span className='error_msg_lbl'>Name is required </span> : null}
                      </Col>
                    </Row>
                  </Col>
                  <Col lg='2 mt-1 mt-lg-0 text-center'>
                    <Button color='primary' onClick={handleSubmit}>Submit</Button>
                  </Col>
                </Row>
              </CardBody>
            </Card >
          </>
        ) : (
          <div className='bg-light mb-0'>
            <Spinner color='primary' style={{ marginLeft: '45%' }} />
          </div>
        )
      }

      <Card>
        <CardBody>
          <div className='text-center'>
            {
              <DataTable
                noHeader
                data={paymentModeList}
                columns={paymentModeTable}
                className='react-dataTable'
                pagination
                progressPending={loader}
              />
            }
          </div>
          <div>
            <Button className='me-2' color='primary' onClick={refreshPaymentModeList}>Reload</Button>
          </div>
        </CardBody>
        {showEdit ? <EditPaymentModeModal id={selected_paymentMode} /> : <></>}
        {del ? <DeletePaymentModeModal id={selected_paymentMode} /> : <></>}
        {
          showEdit | del ? (
            <div class="modal-backdrop fade show" ></div>
          ) : null
        }
      </Card >
    </>
  )
}

export default PaymentMode