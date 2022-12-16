import React, { useState } from 'react'
import { Button, Card, CardBody, CardHeader, CardText, CardTitle, Col, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import DataTable from 'react-data-table-component'
import { Edit, Trash } from 'react-feather'
import toast from 'react-hot-toast'

const AddOnServices = () => {
  const [show, setShow] = useState(false)
  const handleModal = () => setShow(!show)

  const [showEdit, setShowEdit] = useState(false)
  const handleEditModal = () => setShowEdit(!showEdit)

  const [selected_service, setSelected_service] = useState()

  const [del, setDel] = useState(false)

  const [addOnServices, setAddOnServices] = useState([
    {
      id: '1',
      serviceName: 'abc',
      serviceCharge: '200',
      serviceGst: '8',
      serviceType: 'Per Person'
    }
  ])

  const NewAddOnServiceModal = () => {

    const [serviceName, setServiceName] = useState('')
    const [serviceCharge, setServiceCharge] = useState('')
    const [serviceGst, setServiceGst] = useState('')
    const [serviceType, setServiceType] = useState('')

    const [display, setDisplay] = useState(false)

    const addOnServiceObj = {
      id: Math.floor(Math.random() * 100),
      serviceName,
      serviceCharge,
      serviceGst,
      serviceType
    }

    const handleSubmit = () => {
      setDisplay(true)
      if (serviceName && serviceCharge && serviceGst && serviceType !== '') {
        setAddOnServices([...addOnServices, addOnServiceObj])
        handleModal()
        toast.success('Service Added!', { position: "top-center" })
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
            Add Service
          </ModalHeader>
          <ModalBody className='px-sm-2 mx-50 pb-5'>
            <>
              <Row>
                <Col md='3' className='mb-2'>
                  <Label className='form-label' for='serviceName'>
                    <span className='text-danger'>*</span>Service Name</Label>
                </Col>
                <Col md='9' className='mb-2'>
                  <Input type='text' placeholder='Service Name' name='serviceName' id='serviceName' value={serviceName} onChange={e => setServiceName(e.target.value)} invalid={display && serviceName === ''} />
                  {display === true && !serviceName ? <span className='error_msg_lbl'>Enter Service Name </span> : <></>}
                </Col>
                <Col md='3' className='mb-2'>
                  <Label className='form-label' for='serviceCharge'>
                    <span className='text-danger'>*</span>Service Charge</Label>
                </Col>
                <Col md='9' className='mb-2'>
                  <Input type='text' placeholder='Service Charge' name='serviceCharge' id='serviceCharge' value={serviceCharge} onChange={e => setServiceCharge(e.target.value)} invalid={display && serviceCharge === ''} />
                  {display === true && !serviceCharge ? <span className='error_msg_lbl'>Enter Service Charge </span> : <></>}
                </Col>
                <Col md='3' className='mb-2'>
                  <Label className='form-label' for='serviceGst'>
                    <span className='text-danger'>*</span>Service GST</Label>
                </Col>
                <Col md='9' className='mb-2'>
                  <Input type='text' placeholder='Service GST' name='serviceGst' id='serviceGst' value={serviceGst} onChange={e => setServiceGst(e.target.value)} invalid={display && serviceGst === ''} />
                  {display === true && !serviceGst ? <span className='error_msg_lbl'>Enter GST </span> : <></>}
                </Col>
                <Col md='3' className='mb-2'>
                  <Label className='form-label' for='serviceType'>
                    <span className='text-danger'>*</span>Service Type</Label>
                </Col>
                <Col md='9' className='mb-2'>
                  <div>
                    <Input type='radio' name='serviceType' id='perNight' value="Per Night" checked={serviceType === "Per Night"} onChange={e => setServiceType(e.target.value)} />
                    <Label className='ms-1' for='perNight'>
                      Per Night
                    </Label>
                    <Input type='radio' className='ms-3' name='serviceType' id='perPerson' value="Per Person" checked={serviceType === "Per Person"} onChange={e => setServiceType(e.target.value)} />
                    <Label className='ms-1' for='perPerson'>
                      Per Person
                    </Label>
                  </div>
                  {display === true && !serviceType ? <span className='error_msg_lbl'>Please Select Something </span> : <></>}
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
        {
          show ? (
            <div class="modal-backdrop fade show" ></div>
          ) : null
        }
      </>
    )
  }

  const EditAddOnServiceModal = ({ id }) => {

    const addOnServiceData = addOnServices.filter(addOnService => addOnService.id === id)

    const [editServiceName, setEditServiceName] = useState(addOnServiceData[0]?.serviceName)
    const [editServiceCharge, setEditServiceCharge] = useState(addOnServiceData[0]?.serviceCharge)
    const [editServiceGst, setEditServiceGst] = useState(addOnServiceData[0]?.serviceGst)
    const [editServiceType, setEditServiceType] = useState(addOnServiceData[0]?.serviceType)

    const [editDisplay, setEditDisplay] = useState(false)

    const editHandleSubmit = () => {
      setEditDisplay(true)
      if (editServiceName && editServiceCharge && editServiceGst && editServiceType !== '') {
        addOnServices.map(addOnService => {
          if (addOnService.id === id) {
            addOnService.serviceName = editServiceName
            addOnService.serviceCharge = editServiceCharge
            addOnService.serviceGst = editServiceGst
            addOnService.serviceType = editServiceType
          }
        })
        handleEditModal()
        toast.success('Add On Services Edited Succesfully!', { position: "top-center" })
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
          Edit Service
          </ModalHeader>
          <ModalBody className='px-sm-2 mx-50 pb-5'>
            <>
              <Row>
                <Col md='3' className='mb-2'>
                  <Label className='form-label' for='serviceName'>
                    <span className='text-danger'>*</span>Service Name</Label>
                </Col>
                <Col md='9' className='mb-2'>
                  <Input type='text' placeholder='Service Name' name='serviceName' id='serviceName' value={editServiceName} onChange={e => setEditServiceName(e.target.value)} invalid={editDisplay && editServiceName === ''} />
                  {editDisplay === true && !editServiceName ? <span className='error_msg_lbl'>Enter Service Name </span> : <></>}
                </Col>
                <Col md='3' className='mb-2'>
                  <Label className='form-label' for='serviceCharge'>
                    <span className='text-danger'>*</span>Service Charge</Label>
                </Col>
                <Col md='9' className='mb-2'>
                  <Input type='text' placeholder='Service Charge' name='serviceCharge' id='serviceCharge' value={editServiceCharge} onChange={e => setEditServiceCharge(e.target.value)} invalid={editDisplay && editServiceCharge === ''} />
                  {editDisplay === true && !editServiceCharge ? <span className='error_msg_lbl'>Enter Service Charge </span> : <></>}
                </Col>
                <Col md='3' className='mb-2'>
                  <Label className='form-label' for='serviceGst'>
                    <span className='text-danger'>*</span>Service GST</Label>
                </Col>
                <Col md='9' className='mb-2'>
                  <Input type='text' placeholder='Service GST' name='serviceGst' id='serviceGst' value={editServiceGst} onChange={e => setEditServiceGst(e.target.value)} invalid={editDisplay && editServiceGst === ''} />
                  {editDisplay === true && !editServiceGst ? <span className='error_msg_lbl'>Enter GST </span> : <></>}
                </Col>
                <Col md='3' className='mb-2'>
                  <Label className='form-label' for='serviceType'>
                    <span className='text-danger'>*</span>Service Type</Label>
                </Col>
                <Col md='9' className='mb-2'>
                  <Input type='radio' name='serviceType' id='perNight' value="Per Night" checked={editServiceType === "Per Night"} onChange={e => setEditServiceType(e.target.value)} />
                  <Label className='ms-1' for='perNight'>
                    Per Night
                  </Label>
                  <Input type='radio' className='ms-3' name='serviceType' id='perPerson' value="Per Person" checked={editServiceType === "Per Person"} onChange={e => setEditServiceType(e.target.value)} />
                  <Label className='ms-1' for='perPerson'>
                    Per Person
                  </Label>
                </Col>
                {editDisplay === true && !editServiceType ? <span className='error_msg_lbl'>Please Select Something </span> : <></>}
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
        {
          showEdit ? (
            <div class="modal-backdrop fade show" ></div>
          ) : null
        }
      </>
    )
  }

  const DeleteAddOnServiceModal = ({ id }) => {

    const data = addOnServices.filter(addOnService => addOnService.id === id)

    const handleDeleteAddOnService = () => {
      setAddOnServices(addOnServices.filter(addOnService => addOnService.id !== id))
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
            Are you sure to delete  {data[0]?.serviceName} permanently?
          </ModalHeader>
          <ModalBody>
            <Row className='text-center'>
              <Col xs={12}>
                <Button color='danger' className='m-1' onClick={handleDeleteAddOnService}>
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

  const addOnServiceTable = [
    {
      name: 'ID',
      width: '120px',
      sortable: true,
      selector: row => row.id
    },
    {
      name: "Service Name",
      selector: row => row.serviceName
    },
    {
      name: "Service Charge",
      selector: row => row.serviceCharge
    },
    {
      name: "Service GST",
      selector: row => row.serviceGst
    },
    {
      name: "Service Type",
      selector: row => row.serviceType
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
              setSelected_service(row.id)
            }} size={15} />
            <Trash className='me-50' size={15} onClick={() => {
              setDel(true)
              setSelected_service(row.id)
            }} />
          </Col>
          <EditAddOnServiceModal id={selected_service} />
          <DeleteAddOnServiceModal id={selected_service} />
        </>
      )
    }
  ]

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            Add On Service Master
          </CardTitle>
          <Button color='primary' onClick={() => setShow(true)}>Add New Service</Button>
        </CardHeader>
        <CardBody>
          <Row className='my-1'>
            <Col>
              <DataTable
                noHeader
                data={addOnServices}
                columns={addOnServiceTable}
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
                <h2>Add On Service Master</h2>
                <Button color='primary' onClick={() => setShow(true)}>Add New Service</Button>
              </CardTitle>
              <CardText>
                <DataTable
                  noHeader
                  data={addOnServices}
                  columns={addOnServiceTable}
                  className='react-dataTable'
                />
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row> */}
      <NewAddOnServiceModal />
      <EditAddOnServiceModal />
      <DeleteAddOnServiceModal />
    </>
  )
}

export default AddOnServices