import { React, useState } from 'react'
import { Button, Card, CardTitle, CardBody, CardText, Input, Row, Col, Modal, ModalHeader, ModalBody, CardHeader } from 'reactstrap'
import CreatePO from './CreatePO'
import EditPO from './EditPO'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import { Edit, Trash } from 'react-feather'

let data
axios.get('https://jsonplaceholder.typicode.com/users').then(response => {
  data = response.data
})
function PurchaseInvoice() {
  const [show, setShow] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [del, setDel] = useState(false)

  const purchaseInvoiceTable = [
    {
      name: 'Ref ID',
      selector: row => row.id,
      style: {
        color: 'black'
      }
    },
    {
      name: "PO.No",
      selector: row => row.name
    },
    {
      name: "PO.Date",
      selector: row => row.name
    },
    {
      name: "Vendor",
      selector: row => row.name
    },
    {
      name: "Total Amount",
      selector: row => row.name
    },
    {
      name: "Paid Amount",
      selector: row => row.name
    },
    {
      name: "Balance Amount",
      selector: row => row.name
    },
    {
      name: "Action Items",
      selector: row => row.name
    },
    {
      name: 'Action',
      selector: row => row.age,
      cell: row => (
        <>
          <Edit className='me-50 pe-auto' onClick={() => setShowEdit(true)} size={15} />
          <Trash className='me-50' onClick={() => setDel(true)} name={row.age} size={15} />
        </>
      )

    }
  ]
  return (
    <>
      <Row>
        <Col md='12'>
          <Card>
            <CardHeader>
              <CardTitle className='mb-1'>Direct/Local Purchase</CardTitle>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md='3' className='mb-1 text-end'>
                  <h5>Vendor Name</h5>
                </Col>
                <Col md='5' className='mb-1'>
                  <Input type='text' placeholder='Enter Vendor Name' />
                </Col>
                <Col md='4' className='mb-1'>
                  <Button color='primary me-1' >Search</Button>
                  <Button color='primary' onClick={() => setShow(true)}>Create PO</Button>
                </Col>
              </Row>
              <Row className='my-1'>
                <Col>
                  <DataTable
                    noHeader
                    data={data}
                    columns={purchaseInvoiceTable}
                    className='react-dataTable'
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className='modal-dialog-centered modal-xl'
        backdrop={false}
      >
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}>
          Create Purchase Invoice
        </ModalHeader>
        <ModalBody className='px-sm-2 mx-50 pb-5'>
          <CreatePO />
        </ModalBody>
      </Modal>

      <Modal
        isOpen={showEdit}
        toggle={() => setShowEdit(!showEdit)}
        className='modal-dialog-centered modal-xl'
        backdrop={false}
      >
        <ModalHeader className='bg-transparent' toggle={() => setShowEdit(!showEdit)}>
          Edit Purchase Invoice
        </ModalHeader>
        <ModalBody className='px-sm-2 mx-50 pb-5'>
          <EditPO />
        </ModalBody>
      </Modal>

      <Modal
        isOpen={del}
        toggle={() => setDel(!del)}
        className='modal-dialog-centered'
        backdrop={false}
      >
        <ModalHeader className='bg-transparent' toggle={() => setDel(!del)}>
          Are you sure to delete this permanently?
        </ModalHeader>
        <ModalBody>
          <Row className='text-center'>
            <Col xs={12}>
              <Button color='danger' className='m-1'>
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
        show | showEdit | del ? (
          <div className="modal-backdrop fade show" ></div>
        ) : null
      }
    </>
  )
}

export default PurchaseInvoice