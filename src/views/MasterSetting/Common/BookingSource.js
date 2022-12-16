import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { Button, Card, CardBody, Col, Form, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { Edit, Trash } from 'react-feather'
import { toast } from 'react-hot-toast'
import axios from '../../../API/axios'

const BookingSource = ({bookingSourceList, refreshList, loader}) => {

  const [showEdit, setShowEdit] = useState(false)
  const handleEditModal = () => setShowEdit(!showEdit)

  const [showAdd] = useState(true) // false

  const [selected_bookingSource, setSelected_bookingSource] = useState()

  const [del, setDel] = useState(false)

  const [BookingSource, setBookingSource] = useState('')
  const [display, setDisplay] = useState(false)

  const userId = localStorage.getItem('user-id')

  const bookingSourceInsert = () => {
    const bookingSourceInsertBody = {
      LoginID: userId,
      Token: "123",
      Seckey: "abc",
      Event: "insert",
      BookingSource
    }
    try {
      axios.post(`/getdata/bookingdata/bookingsource`, bookingSourceInsertBody)
        .then(() => {
          refreshList()
        })

    } catch (error) {
      console.log("Booking Source Insert Error", error.message)
    }
  }

  const handleSubmit = () => {
    setDisplay(true)
    if (BookingSource.trim() !== '') {
      bookingSourceInsert()
      setBookingSource('')
      // setDisplay(false)
      toast.success('Booking Source Added!', { position: "top-center" })
    setDisplay(false)

    }
  }


  const EditBookingSourceModal = ({ id }) => {

    const bookingSourceData = bookingSourceList?.filter(bookingSource => bookingSource.BookingSourceID === id)

    const [editBookingSource, setEditBookingSource] = useState(bookingSourceData[0]?.BookingSource)
    const [editBookingSourceId] = useState(bookingSourceData[0]?.BookingSourceID)
    const [editStatusId] = useState(bookingSourceData[0]?.StatusID)
    const [editDisplay, setEditDisplay] = useState(false)

    const bookingSourceUpdate = () => {
      const bookingSourceUpdateBody = {
        LoginID: userId,
        Token: "123",
        Seckey: "abc",
        Event: "update",
        BookingSourceID: editBookingSourceId,
        BookingSource: editBookingSource,
        StatusID: editStatusId
      }
      try {
        axios.post(`/getdata/bookingdata/bookingsource`, bookingSourceUpdateBody)
          .then(() => {
            refreshList()
          })
      } catch (error) {
        console.log("Booking Source Update Error", error.message)
      }
    }

    const editHandleSubmit = () => {
      setEditDisplay(true)
      if (editBookingSource.trim() !== '') {
        bookingSourceUpdate()
        handleEditModal()
        toast.success('Booking Source Edited Successfully!', { position: "top-center" })
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
          <h1 className=' mb-1'>Edit Booking Source</h1>
        </ModalHeader>
        <ModalBody className='px-sm-2 mx-50 pb-3'>
          <>
            <Form>
              <Row>
                <Col lg='8'>
                  <Row>
                    <Col md='3  text-md-end  mt-md-50'>

                      <Label for='BookingSource'>
                        <span className='text-danger'>*</span>Name
                      </Label>
                    </Col>

                    <Col md='9'>

                      <Input
                        type='text'
                        name='BookingSource'
                        id='BookingSource'
                        value={editBookingSource}
                        onChange={e => setEditBookingSource(e.target.value)}
                        invalid={editDisplay && editBookingSource.trim() === ''}
                      />
                      {editDisplay && !editBookingSource.trim() ? <span className='error_msg_lbl'>Name is required </span> : null}

                    </Col>

                  </Row>
                </Col>
                <Col lg='4' className='text-lg-start text-end pt-1 pt-lg-0'>

                  <Button color='primary' className='me-2' onClick={editHandleSubmit}>Submit</Button>
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

  const DeleteBookingSourceModal = ({ id }) => {

    const data = bookingSourceList?.filter(bookingSource => bookingSource.BookingSourceID === id)
    const [bookingSourceId] = useState(data[0]?.BookingSourceID)

    const bookingSourceDel = () => {
      const bookingSourceDelBody = {
        LoginID: userId,
        Token: "123",
        Seckey: "abc",
        Event: "delete",
        BookingSourceID: bookingSourceId
      }
      try {
        axios.post(`/getdata/bookingdata/bookingsource`, bookingSourceDelBody)
          .then(() => {
            refreshList()
          })
      } catch (error) {
        console.log("Booking Source Delete Error", error.message)
      }
    }

    const handleDeleteBookingSource = () => {
      setDel(!del)
      bookingSourceDel()
    }

    return (
      <Modal
        isOpen={del}
        toggle={() => setDel(!del)}
        className='modal-dialog-centered'
        backdrop={false}
      >
        <ModalHeader className='bg-transparent' toggle={() => setDel(!del)}>
          Are you sure to delete  {data[0]?.BookingSource} permanently?
        </ModalHeader>
        <ModalBody>
          <Row className='text-center'>
            <Col xs={12}>
              <Button color='danger' className='m-1' onClick={handleDeleteBookingSource}>
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

  const bookingSourceTable = [
    {
      name: 'ID',

      selector: row => row.BookingSourceID
    },
    {
      name: 'Name',
      selector: row => row.BookingSource
    },
    {
      name: 'Action',
      selector: row => (
        <>
          <Edit className='me-1 pe-auto' size={15} onClick={() => {
            setShowEdit(true)
            setSelected_bookingSource(row.BookingSourceID)
          }} />
          <Trash className='ms-1' name={row.age} size={15} onClick={() => {
            setDel(true)
            setSelected_bookingSource(row.BookingSourceID)
          }} />

        </>
      )
    }
  ]

  return (
    <>
      <Card>
        {//<Button onClick={handleAddCard}></Button>
        }
        {
          showAdd ? (
            <Card className='bg-light mb-0'>

              <CardBody>

                <Row>
                  <Col md='8' lg='6'>
                    <Row>
                      <Col md='3 text-md-end mt-md-50'>

                        <Label for='BookingSource'>
                          <span className='text-danger'>*</span>Name
                        </Label>
                      </Col>

                      <Col md='9'>

                        <Input
                          type='text'
                          name='BookingSource'
                          id='BookingSource'
                          value={BookingSource}
                          onChange={e => setBookingSource(e.target.value)}
                          invalid={display && BookingSource.trim() === ''}
                        />
                        {display && BookingSource.trim() === '' ? <span className='error_msg_lbl'>Name is required </span> : null}

                      </Col>

                    </Row>
                  </Col>
                  <Col md='4' lg='6' className='pt-1 pt-md-0 text-md-start text-center'>

                    <Button color='primary' onClick={handleSubmit}>Submit</Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>

          ) : <></>}
        <CardBody>

          <div className='text-center'>
            {
              <DataTable
                noHeader
                pagination
                data={bookingSourceList}
                columns={bookingSourceTable}
                className='react-dataTable'
                progressPending={loader}
              />
            }
          </div>
          <div>
              <Button className='me-2' color='primary' onClick={refreshList}>Reload</Button>
          </div>
        </CardBody>
      </Card>
      {showEdit ? <EditBookingSourceModal id={selected_bookingSource} /> : <></>}
      {del ? <DeleteBookingSourceModal id={selected_bookingSource} /> : <></>}
      {
        showEdit | del ? (
          <div class="modal-backdrop fade show" ></div>
        ) : null
      }
    </>
  )
}

export default BookingSource
