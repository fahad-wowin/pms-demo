import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { Button, Card, CardBody, Col, Form, Input, Label, Modal, ModalBody, ModalHeader, Row, Spinner } from 'reactstrap'
import { Edit, Trash } from 'react-feather'
import toast from 'react-hot-toast'
import axios from '../../../API/axios'

const MealPlan = () => {

  const [showEdit, setShowEdit] = useState(false)
  const handleEditModal = () => setShowEdit(!showEdit)

  const [selected_mealPlan, setSelected_mealPlan] = useState()

  const [del, setDel] = useState(false)

  const [MealName, setMealName] = useState('')
  const [MealDesc, setMealDesc] = useState('')
  const [MealDisplayName, setMealDisplayName] = useState('')
  const [MealType, setMealType] = useState('')
  const [Price, setPrice] = useState('')

  const [display, setDisplay] = useState(false)

  const [meals, setMeals] = useState([])
  const [isData, setIsData] = useState(false)
  const [loader, setLoader] = useState(false)

  const userId = localStorage.getItem('user-id')

  const mealDetailsList = () => {
    setLoader(true)
    try {
      const mealDetailsListBody = {
        LoginID: userId,
        Token: "123",
        Seckey: "abc",
        Event: "select"
      }
      axios.post('/getdata/bookingdata/mealdetails', mealDetailsListBody)
        .then(response => {
          setMeals(response?.data[0])
          setLoader(false)
          if (meals !== []) { setIsData(true) }
        })
    } catch (error) {
      setLoader(false)
      console.log("State Error", error.message)
    }
  }

  useEffect(() => {
    mealDetailsList()
  }, [isData])

  const mealDetailsInsert = () => {
    const mealDetailsInsertBody = {
      LoginID: userId,
      Token: "123",
      Seckey: "abc",
      Event: "insert",
      MealType,
      MealDesc,
      MealDisplayName,
      MealName,
      Price
    }
    try {
      axios.post(`/getdata/bookingdata/mealdetails`, mealDetailsInsertBody)
        .then(() => {
          mealDetailsList()
        })
    } catch (error) {
      console.log("Meal Details Insert Error", error.message)
    }
  }

  const handleSubmit = () => {
    setDisplay(true)
    if (MealName.trim() && MealDisplayName.trim() && MealType.trim() && Price.trim() !== '') {
      mealDetailsInsert()
      setMealName('')
      setMealDesc('')
      setMealDisplayName('')
      setMealType('')
      setPrice('')
      setDisplay(false)
      toast.success('Meal Plan Added!', { position: "top-center" })
    }
  }

  const EditMealPlanModal = ({ id }) => {
    const mealData = meals?.filter(meal => meal.MealID === id)

    const [editMealId] = useState(mealData[0]?.MealID)
    const [editStatusId] = useState(mealData[0]?.StatusID)
    const [editMealName, setEditMealName] = useState(mealData[0]?.MealName)
    const [editMealDesc, setEditMealDesc] = useState(mealData[0]?.MealDesc)
    const [editMealDisplayName, setEditMealDisplayName] = useState(mealData[0]?.MealDisplayName)
    const [editMealType, setEditMealType] = useState(mealData[0]?.MealType)
    const [editPrice, setEditPrice] = useState(mealData[0]?.Price)

    const [editDisplay, setEditDisplay] = useState(false)

    const mealDetailsEdit = () => {
      const mealDetailsEditBody = {
        LoginID: userId,
        Token: "123",
        Seckey: "abc",
        Event: "update",
        MealID: editMealId,
        MealType: editMealType,
        MealDesc: editMealDesc,
        MealDisplayName: editMealDisplayName,
        MealName: editMealName,
        Price: editPrice,
        StatusID: editStatusId
      }
      try {
        axios.post(`/getdata/bookingdata/mealdetails`, mealDetailsEditBody)
          .then(() => {
            mealDetailsList()
          })
      } catch (error) {
        console.log("Meal Plan Edit Error", error.message)
      }
    }

    const editHandleSubmit = () => {
      setEditDisplay(true)
      if (editMealName.trim() && editMealDisplayName.trim() && editMealType.trim() && editPrice !== '') {
        mealDetailsEdit()
        handleEditModal()
        toast.success('Meal Plan Edited Successfully!', { position: "top-center" })
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
          <span className=' mb-1'>Edit Meal Plan</span>
        </ModalHeader>
        <ModalBody className='px-sm-2 mx-50 pb-5'>
          <>
            <Form>
              {/* <Row>
                <Col lg='6' md='6 mb-2'>
                  <div className='d-flex'>
                    <Label for='bookingSourceName'>
                      <span className='text-danger'>*</span>Name
                    </Label>
                    <Input
                      className='ms-3'
                      type='text'
                      name='editMealName'
                      id='editMealName'
                      value={editMealName}
                      onChange={e => setEditMealName(e.target.value)}
                      invalid={editDisplay && editMealName.trim() === ''}
                    />
                  </div>
                  {editDisplay === true && !editMealName.trim() ? <span className='error_msg_lbl editMealName'>Name is required </span> : <></>}
                </Col>
                <Col lg='6' md='6 mb-2'>
                  <div className='d-flex'>
                    <Label className='mt-1' for='MealDesc'>Description</Label>
                    <Input
                      className='ms-1'
                      type='text'
                      name='MealDesc'
                      id='MealDesc'
                      value={editMealDesc}
                      onChange={e => setEditMealDesc(e.target.value)}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg='6' md='6 mb-2'>
                  <div className='d-flex'>
                    <Label className='mt-1' for='MealDisplayName'>
                      <span className='text-danger'>*</span>Display Name
                    </Label>
                    <Input
                      className='ms-1'
                      type='text'
                      name='MealDisplayName'
                      id='MealDisplayName'
                      value={editMealDisplayName}
                      onChange={e => setEditMealDisplayName(e.target.value)}
                      invalid={editDisplay && editMealDisplayName.trim() === ''}
                    />
                  </div>
                  {editDisplay === true && !editMealDisplayName.trim() ? <span className='error_msg_lbl editMealName'>Display Name is required </span> : null}
                </Col>
                <Col lg='3' md='3 mb-2'>
                  <div className='d-flex'>
                    <Label className='mt-1' for='MealType'>
                      <span className='text-danger'>*</span>Type
                    </Label>
                    <Input
                      className='ms-5'
                      type='text'
                      name='MealType'
                      id='MealType'
                      value={editMealType}
                      onChange={e => setEditMealType(e.target.value)}
                      invalid={editDisplay && editMealType.trim() === ''}
                    />
                  </div>
                  {editDisplay === true && !editMealType.trim() ? <span className='error_msg_lbl editMealType'>Type required</span> : null}
                </Col>
                <Col lg='3' md='3 mb-2'>
                  <div className='d-flex'>
                    <Label className='mt-1' for='Price'>
                      <span className='text-danger'>*</span>Price
                    </Label>
                    <Input
                      className='ms-1'
                      type='number'
                      name='Price'
                      id='Price'
                      value={editPrice}
                      onChange={e => setEditPrice(e.target.value)}
                      invalid={editDisplay && editPrice === ''}
                    />
                  </div>
                  {editDisplay === true && !editPrice ? <span className='error_msg_lbl ms-5'>Price required </span> : null}
                </Col>
              </Row>
              <Row>
                <Col md='12 mb-2 text-center'>
                  <Button className='me-3' color='primary' onClick={editHandleSubmit}>Submit</Button>
                  <Button
                    color='secondary'
                    outline
                    onClick={handleEditModal}
                  >
                    Cancel
                  </Button>
                </Col>
              </Row> */}
              <Row>
                <Col lg='6' md='12' sm='12' className='mb-lg-1'>
                  <Row>
                    <Col lg='2' md='12' sm='12'>
                      <Label for='bookingSourceName'>
                        <span className='text-danger'>*</span>Name
                      </Label>
                    </Col>
                    <Col lg='10' md='12' sm='12'>
                      <Input
                        className='w-100'
                        type='text'
                        name='editMealName'
                        id='editMealName'
                        value={editMealName}
                        onChange={e => setEditMealName(e.target.value)}
                        invalid={editDisplay && editMealName.trim() === ''}
                      />
                      {editDisplay === true && !editMealName.trim() ? <span className='error_msg_lbl'>Name is required </span> : <></>}
                    </Col>
                  </Row>
                </Col>
                <Col lg='6' md='12' sm='12' className='mb-lg-1'>
                  <Row>
                    <Col lg='2' md='12' sm='12'>
                      <Label className='mt-1' for='MealDesc'>Description</Label>
                    </Col>
                    <Col lg='10' md='12' sm='12'>
                      <Input
                        className='ms-lg-1 mb-sm-1'
                        type='text'
                        name='MealDesc'
                        id='MealDesc'
                        value={editMealDesc}
                        onChange={e => setEditMealDesc(e.target.value)}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col lg='6' md='12' sm='12' className='mb-lg-1'>
                  <Row>
                    <Col lg='2' md='12' sm='12'>
                      <Label for='MealDisplayName'>
                        <span className='text-danger'>*</span>Display Name
                      </Label>
                    </Col>
                    <Col lg='10' md='12' sm='12'>
                      <Input
                        // className='ms-1'
                        type='text'
                        name='MealDisplayName'
                        id='MealDisplayName'
                        value={editMealDisplayName}
                        onChange={e => setEditMealDisplayName(e.target.value)}
                        invalid={editDisplay && editMealDisplayName.trim() === ''}
                      />
                      {editDisplay === true && !editMealDisplayName.trim() ? <span className='error_msg_lbl'>Display Name is required </span> : null}
                    </Col>
                  </Row>
                </Col>
                <Col lg='6' md='12' sm='12' className='mb-md-1 mb-lg-1'>
                  <Row>
                    <Col lg='6' md='12' sm='12'>
                      <Row>
                        <Col lg='4' md='4' sm='12'>
                          <Label className='mt-1' for='MealType'>
                            <span className='text-danger'>*</span>Type
                          </Label>
                        </Col>
                        <Col lg='8' md='12' sm='12' className='mb-sm-1'>
                          <Input
                            className='ms-lg-1'
                            type='text'
                            name='MealType'
                            id='MealType'
                            value={editMealType}
                            onChange={e => setEditMealType(e.target.value)}
                            invalid={editDisplay && editMealType.trim() === ''}
                          />
                          {editDisplay === true && !editMealType.trim() ? <span className='error_msg_lbl ms-lg-1'>Type req</span> : null}
                        </Col>
                      </Row>
                    </Col>
                    <Col lg='6' md='12' sm='12'>
                      <Row>
                        <Col lg='2' md='12' sm='12'>
                          <Label for='Price'>
                            <span className='text-danger'>*</span>Price
                          </Label>
                        </Col>
                        <Col lg='10' md='12' sm='12' className='mb-sm-1'>
                          <Input
                            className='ms-lg-1'
                            type='number'
                            name='Price'
                            id='Price'
                            value={editPrice}
                            onChange={e => setEditPrice(e.target.value)}
                            invalid={editDisplay && editPrice === ''}
                          />
                          {editDisplay === true && !editPrice ? <span className='error_msg_lbl ms-lg-1'>Price required </span> : null}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col md='12 mb-2 text-center'>
                  <Button className='me-3' color='primary' onClick={editHandleSubmit}>Submit</Button>
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
      </Modal >
    )
  }

  const DeleteMealPlanModel = ({ id }) => {

    const data = meals?.filter(meal => meal.MealID === id)
    const [mealId] = useState(data[0]?.MealID)

    const mealDetailsDelete = () => {
      const mealDetailsDeleteBody = {
        LoginID: userId,
        Token: "123",
        Seckey: "abc",
        Event: "delete",
        MealID: mealId
      }
      try {
        axios.post(`/getdata/bookingdata/mealdetails`, mealDetailsDeleteBody)
          .then(() => {
            mealDetailsList()
          })
      } catch (error) {
        console.log("Meal Details Delete Error", error.message)
      }
    }

    const handleDeleteMealPlan = () => {
      mealDetailsDelete()
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
          Are you sure to delete  {data[0]?.MealName} permanently?
        </ModalHeader>
        <ModalBody>
          <Row className='text-center'>
            <Col xs={12}>
              <Button color='danger' className='m-1' onClick={handleDeleteMealPlan}>
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

  const mealPlanTable = [
    {
      name: 'ID',
      width: '200px',
      selector: row => row.MealID
    },
    {
      name: 'Name',
      width: '310px',
      selector: row => row.MealName
    },
    {
      name: 'Description',
      width: '310px',
      selector: row => row.MealDesc
    },
    {
      name: 'Display Name',
      width: '290px',
      selector: row => row.MealDisplayName
    },
    {
      name: 'Type',
      selector: row => row.MealType
    },
    {
      name: 'Price',
      selector: row => row.Price
    },
    {
      name: 'Action',
      cell: row => (
        <>
          <Edit className='me-50 pe-auto' size={15} onClick={() => {
            setShowEdit(true)
            setSelected_mealPlan(row.MealID)
          }} />
          <Trash className='me-50' name={row.age} size={15} onClick={() => {
            setDel(true)
            setSelected_mealPlan(row.MealID)
          }} />

        </>
      )
    }
  ]

  return (
    <Card>
      <Card className='bg-light mb-0'>
        <CardBody>
          <Row>
            <Col lg='4' md='6 mb-50'>
              <Row>
                <Col md='3 text-md-end mt-md-50'>
                  <Label for='MealName'>
                    <span className='text-danger'>*</span>Name
                  </Label>
                </Col>
                <Col md='9'>
                  <Input
                    type='text'
                    name='MealName'
                    id='MealName'
                    value={MealName}
                    onChange={e => setMealName(e.target.value)}
                    invalid={display && MealName.trim() === ''}
                  />
                  {display === true && !MealName.trim() ? <span className='error_msg_lbl'>Name is required </span> : null}
                </Col>
              </Row>
            </Col>

            <Col lg='4' md='6 mb-50'>
              <Row>
                <Col md='3 text-md-start mt-md-50'>
                  <Label for='MealDesc'>Description</Label>
                </Col>
                <Col md='9'>
                  <Input
                    type='text'
                    name='MealDesc'
                    id='MealDesc'
                    value={MealDesc}
                    onChange={e => setMealDesc(e.target.value)}
                  />
                </Col>
              </Row>
            </Col>

            <Col lg='4' md='6 mb-50'>
              <Row>
                <Col md='3 text-md-end mt-md-50 pe-lg-0'>
                  <Label for='MealDisplayName'>
                    <span className='text-danger'>*</span>Display Name
                  </Label>
                </Col>
                <Col md='9'>
                  <Input
                    type='text'
                    name='MealDisplayName'
                    id='MealDisplayName'
                    value={MealDisplayName}
                    onChange={e => setMealDisplayName(e.target.value)}
                    invalid={display && MealDisplayName.trim() === ''}
                  />
                  {display === true && !MealDisplayName.trim() ? <span className='error_msg_lbl'>Display Name is required </span> : null}
                </Col>
              </Row>
            </Col>

            <Col lg='4' md='6 mb-50'>
              <Row>
                <Col md='3 text-md-end mt-md-50'>
                  <Label for='MealType'>
                    <span className='text-danger'>*</span>Type
                  </Label>
                </Col>
                <Col md='9'>
                  <Input
                    type='text'
                    name='MealType'
                    id='MealType'
                    value={MealType}
                    onChange={e => setMealType(e.target.value)}
                    invalid={display && MealType.trim() === ''}
                  />
                  {display === true && !MealType.trim() ? <span className='error_msg_lbl'>Type is required </span> : null}
                </Col>
              </Row>
            </Col>

            <Col lg='4' md='6 mb-50'>
              <Row>
                <Col md='3 text-md-end mt-md-50'>
                  <Label for='Price'>
                    <span className='text-danger'>*</span>Price
                  </Label>
                </Col>
                <Col md='9'>
                  <Input
                    type='number'
                    name='Price'
                    id='Price'
                    value={Price}
                    onChange={e => setPrice(e.target.value)}
                    invalid={display && Price.trim() === ''}
                  />
                  {display === true && !Price.trim() ? <span className='error_msg_lbl'>Price is required </span> : null}
                </Col>

              </Row>
            </Col>

            <Col lg='4' md='6 mb-50 text-center'>

              <Button color='primary' className='mt-1 mt-sm-0' onClick={handleSubmit}>Submit</Button>

            </Col>
          </Row>
          {/* <Row> */}
          {/* <Col md='6 mb-2'>
              <div className='d-flex'>
                <Label className='mt-1 w-25' for='MealName'>
                  <span className='text-danger'>*</span>Name
                </Label>
                <Input
                  className='ms-3'
                  type='text'
                  name='MealName'
                  id='MealName'
                  value={MealName}
                  onChange={e => setMealName(e.target.value)}
                  invalid={display && MealName.trim() === ''}
                />
              </div>
              {display === true && !MealName.trim() ? <span className='error_msg_lbl mealName'>Name is required </span> : null}
            </Col> */}
          {/* <Col md='6 mb-2'>
              <div className='d-flex'>
                <Label className='mt-1' for='MealDesc'>Description</Label>
                <Input
                  className='ms-1'
                  type='text'
                  name='MealDesc'
                  id='MealDesc'
                  value={MealDesc}
                  onChange={e => setMealDesc(e.target.value)}
                />
              </div>
            </Col>
          </Row> */}
          {/* <Row> */}
          {/* <Col md='6 mb-2'>
              <div className='d-flex'>
                <Label className='mt-1 w-25' for='MealDisplayName'>
                  <span className='text-danger'>*</span>Display Name
                </Label>
                <Input
                  className=' w-75 ms-1'
                  type='text'
                  name='MealDisplayName'
                  id='MealDisplayName'
                  value={MealDisplayName}
                  onChange={e => setMealDisplayName(e.target.value)}
                  invalid={display && MealDisplayName.trim() === ''}
                />
              </div>
              {display === true && !MealDisplayName.trim() ? <span className='error_msg_lbl mealName'>Display Name is required </span> : null}
            </Col> */}
          {/* <Col md='3 mb-2'>
          <div className='d-flex'>
            <Label className='mt-1 typeLabel' for='MealType'>
              <span className='text-danger'>*</span>Type
            </Label>
            <Input
              className='ms-1 w-75'
              type='text'
              name='MealType'
              id='MealType'
              value={MealType}
              onChange={e => setMealType(e.target.value)}
              invalid={display && MealType.trim() === ''}
            />
          </div>
          {display === true && !MealType.trim() ? <span className='error_msg_lbl mealType'>Type is required </span> : null}
        </Col> */}
          {/* <Col md='3 mb-2'>
              <div className='d-flex'>
                <Label className='mt-1' for='Price'>
                  <span className='text-danger'>*</span>Price
                </Label>
                <Input
                  className='ms-1'
                  type='number'
                  name='Price'
                  id='Price'
                  value={Price}
                  onChange={e => setPrice(e.target.value)}
                  invalid={display && Price.trim() === ''}
                />
              </div>
              {display === true && !Price.trim() ? <span className='error_msg_lbl mealTypePrice'>Price is required </span> : null}
            </Col>
          </Row> */}
          {/* <Row>
            <Col md='12 mb-2 text-center'>
              <Button color='primary' onClick={handleSubmit}>Submit</Button>
            </Col>
          </Row> */}
        </CardBody>
      </Card >

      <CardBody>
        <div className='text-center'>
          <DataTable
            noHeader
            data={meals}
            columns={mealPlanTable}
            className='react-dataTable'
            pagination
            progressPending={loader}
          />
        </div>
        <div>
          <Button className='me-2' color='primary' onClick={mealDetailsList}>Reload</Button>
        </div>
      </CardBody>
      {showEdit ? <EditMealPlanModal id={selected_mealPlan} /> : <></>}
      {del ? <DeleteMealPlanModel id={selected_mealPlan} /> : <></>}
      {
        showEdit | del ? (
          <div class="modal-backdrop fade show" ></div>
        ) : null
      }
    </Card >
  )
}

export default MealPlan