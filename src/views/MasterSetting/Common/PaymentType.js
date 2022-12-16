import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { Button, Card, CardBody, Col, Form, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { Edit, Trash } from 'react-feather'
import toast from 'react-hot-toast'
import axios from '../../../API/axios'

const PaymentType = ({ paymentTypeList, loader, refreshPaymentTpeList }) => {

  const [showEdit, setShowEdit] = useState(false)
  const handleEditModal = () => setShowEdit(!showEdit)

  const [showAdd] = useState(true) // false


  const [selected_paymentType, setSelected_paymentType] = useState()

  const [del, setDel] = useState(false)

  const [PaymentType, setPaymentType] = useState('')

  const [display, setDisplay] = useState(false)

  const userId = localStorage.getItem('user-id')

  const paymentTypeInsert = () => {

    const paymentTypeInsertBody = {
      LoginID: userId,
      Token: "123",
      Seckey: "abc",
      Event: "insert",
      PaymentType
    }
    try {
      axios.post(`/getdata/bookingdata/paymenttype`, paymentTypeInsertBody)
        .then(() => {
          refreshPaymentTpeList()
        })
    } catch (error) {
      console.log("Payment Type Insert Error", error.message)
    }
  }

  const handleSubmit = () => {
    setDisplay(true)
    // Check for existing record - Fahad
    const paymentTypeExists = paymentTypeList?.filter(paymentsType => paymentsType.PaymentType?.toString().toLowerCase() === PaymentType?.toLowerCase())?.length
    if (paymentTypeExists > 0) {
      toast.error('Payment Type already exists!', { position: "top-center" })

      return
    }
    // End. Check for existing record

    if (PaymentType.trim() !== '') {
      paymentTypeInsert()
      setPaymentType('')
      setDisplay(false)
      toast.success('Payment Type Added!', { position: "top-center" })
    }
  }

  const EditPaymentTypeModal = ({ id }) => {
    const paymentTypeData = paymentTypeList?.filter(paymentsType => paymentsType.PaymentTypeID === id)

    const [editPaymentType, setEditPaymentType] = useState(paymentTypeData[0]?.PaymentType)
    const [editPaymentTypeId] = useState(paymentTypeData[0]?.PaymentTypeID)
    const [editStatusId] = useState(paymentTypeData[0]?.StatusID)

    const [editDisplay, setEditDisplay] = useState(false)

    const paymentTypeEdit = () => {
      const paymentTypeEditBody = {
        LoginID: userId,
        Token: "123",
        Seckey: "abc",
        Event: "update",
        PaymentTypeID: editPaymentTypeId,
        PaymentType: editPaymentType,
        StatusID: editStatusId
      }
      try {
        axios.post(`/getdata/bookingdata/paymenttype`, paymentTypeEditBody)
          .then(() => {
            refreshPaymentTpeList()
          })
      } catch (error) {
        console.log("Payment Type Edit Error", error.message)
      }
    }

    const editHandleSubmit = () => {
      setEditDisplay(true)
      if (editPaymentType.trim() !== '') {
        paymentTypeEdit()
        handleEditModal()
        toast.success('Payment Type Edited Successfully!', { position: "top-center" })
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
          <h1 className=' mb-1'>Edit Payment Type</h1>
        </ModalHeader>
        <ModalBody className='px-sm-2 mx-50 pb-3'>
          <>
            <Form>
              <Row>
                <Col lg='8'>
                  <Row>
                    <Col md='3  text-md-end  mt-md-50'>

                      <Label for='editPaymentType'>
                        <span className='text-danger'>*</span>Name
                      </Label>
                    </Col>

                    <Col md='9'>

                      <Input
                        type='text'
                        name='editPaymentType'
                        id='editPaymentType'
                        value={editPaymentType}
                        onChange={e => setEditPaymentType(e.target.value)}
                        invalid={editDisplay && editPaymentType.trim() === ''}
                      />
                      {editDisplay === true && !editPaymentType.trim() ? <span className='error_msg_lbl'>Name is required </span> : <></>}

                    </Col>

                  </Row>
                </Col>
                <Col lg='4' className='text-lg-start text-end pt-1 pt-lg-0'>

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

  const DeletePaymentTypeModal = ({ id }) => {

    const data = paymentTypeList?.filter(paymentsType => paymentsType.PaymentTypeID === id)

    const [PaymentTypeID] = useState(data[0]?.PaymentTypeID)

    const paymentTypeDelete = () => {
      const paymentTypeDeleteBody = {
        LoginID: userId,
        Token: "123",
        Seckey: "abc",
        Event: "delete",
        PaymentTypeID
      }
      try {
        axios.post(`/getdata/bookingdata/paymenttype`, paymentTypeDeleteBody)
          .then(() => {
            refreshPaymentTpeList()
          })
      } catch (error) {
        console.log("Payment Type Delete Error", error.message)
      }
    }

    const handleDeletePaymentType = () => {
      paymentTypeDelete()
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
          Are you sure to delete  {data[0]?.PaymentType} permanently?
        </ModalHeader>
        <ModalBody>
          <Row className='text-center'>
            <Col xs={12}>
              <Button color='danger' className='m-1' onClick={handleDeletePaymentType}>
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

  const paymentTypeTable = [
    {
      name: 'ID',
      selector: row => row.PaymentTypeID
    },
    {
      name: 'Name',
      selector: row => row.PaymentType
    },
    {
      name: 'Action',
      cell: row => (
        <>
          <Edit className='me-50 pe-auto' size={15} onClick={() => {
            setShowEdit(true)
            setSelected_paymentType(row.PaymentTypeID)
          }} />
          <Trash className='me-50' name={row.age} size={15} onClick={() => {
            setDel(true)
            setSelected_paymentType(row.PaymentTypeID)
          }} />
        </>
      )
    }
  ]

  return (
    <>
      <Card>
        {
          showAdd ? (
            <Card className='bg-light mb-0'>
              <CardBody>
                <Row>
                  <Col md='8' lg='6'>
                    <Row>
                      <Col md='3 text-md-end mt-md-50'>
                        <Label for='PaymentType'>
                          <span className='text-danger'>*</span>Name
                        </Label>
                      </Col>
                      <Col md='9'>

                        <Input
                          type='text'
                          name='PaymentType'
                          id='PaymentType'
                          value={PaymentType}
                          onChange={e => setPaymentType(e.target.value)}
                          invalid={display && PaymentType.trim() === ''}
                        />
                        {display === true && !PaymentType.trim() ? <span className='error_msg_lbl'>Name is required </span> : null}
                      </Col>
                    </Row>
                  </Col>
                  <Col md='4' lg='6' className='pt-1 pt-md-0 text-md-start text-center'>

                    <Button className='me-3' color='primary' onClick={handleSubmit}>Submit</Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          ) : <></>
        }
        <CardBody>

          <div className='text-center'>
            {
              <DataTable
                noHeader
                data={paymentTypeList}
                columns={paymentTypeTable}
                className='react-dataTable'
                pagination
                progressPending={loader}
              />
            }
          </div>
          <div>
              <Button className='me-2' color='primary' onClick={refreshPaymentTpeList}>Reload</Button>
          </div>
        </CardBody>
      </Card>

      {showEdit ? <EditPaymentTypeModal id={selected_paymentType} /> : <></>}
      {del ? <DeletePaymentTypeModal id={selected_paymentType} /> : <></>}
      {
        showEdit | del ? (
          <div class="modal-backdrop fade show" ></div>
        ) : null
      }
    </>
  )
}

export default PaymentType