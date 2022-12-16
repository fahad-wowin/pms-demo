import { React, useState } from 'react'
import { Button, Card, CardTitle, CardBody, CardText, CardSubtitle, CardLink, Input, Row, Col, Table, Modal, ModalHeader, ModalBody, Label, InputGroupText, InputGroup, CardHeader } from 'reactstrap'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import Flatpickr from 'react-flatpickr'
import { MdDateRange } from "react-icons/md"
import DataTable from 'react-data-table-component'
import axios from 'axios'
import { Edit, Trash } from 'react-feather'

const venderOptions = [
  { value: '-', label: '-' },
  { value: 'Vendor 1', label: 'Vendor 1' },
  { value: 'Vendor 2', label: 'Vendor 2' },
  { value: 'Vendor 3', label: 'Vendor 3' }
]
let data
axios.get('https://jsonplaceholder.typicode.com/users').then(response => {
  data = response.data
})
function PurchaseReceive() {
  // const [cardType, setCardType] = useState('')
  const [show, setShow] = useState(false)
  const [showEdit, setShowEdit] = useState(false)

  const [del, setDel] = useState(false)

  const productRecieveTable = [
    {
      name: 'Sr.No',
      selector: row => row.id,
      style: {
        color: 'black'
      }
    },
    {
      name: "PO.No",
      selector: row => row.id
    },
    {
      name: "PO.Date",
      cell: row => (
        <p name={row.age}>10/09/2022</p>
      )
    },
    {
      name: "Product Category",
      selector: row => row.name
    },
    {
      name: "Product Name",
      selector: row => row.name
    },
    {
      name: "Vendor",
      selector: row => row.name
    },
    {
      name: "Demand Qty",
      selector: row => row.name
    },
    {
      name: "Rates/Qty",
      selector: row => row.name
    },
    {
      name: "Product Name",
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
  const addPurchaseReceiveTable = [
    {
      name: "PO.No",
      selector: row => row.id
    },
    {
      name: "PO.Date",
      cell: row => (
        <p name={row.age}>10/09/2022</p>
      )
    },
    {
      name: "Vendor",
      selector: row => row.name,
      width: '200px'
    },
    {
      name: "Product Count",
      cell: row => (
        <p name={row.age}>50</p>
      ),
      width: "130px"
    },
    {
      name: "Action",
      cell: row => (
        <>
          <div className='text-center mt-1'>
            <Button color='primary' name={row.id} className='mb-1 w-150'>Add Receive</Button>
          </div>
        </>
      ),
      width: '200px'
    }
  ]
  return (
    <>
      <Row>
        <Col md='12'>
          <Card>
            <CardHeader>
              <CardTitle className='mb-1'>Received Local Purchase</CardTitle>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md='3' className='mb-1 text-end'>
                  <h5>PO Number</h5>
                </Col>
                <Col md='4' className='mb-1'>
                  <Select
                    theme={selectThemeColors}
                    className='react-select w-100'
                    classNamePrefix='select'
                    defaultValue={venderOptions[0]}
                    options={venderOptions}
                    isClearable={false}
                  />
                </Col>
                <Col md='2' className='mb-1'>
                  <Button color='primary me-1' >Search</Button>
                </Col>
                <Col md='3' className='mb-1'>
                  <Button color='primary me-1' onClick={() => setShow(true)} >Add Purchase Receive</Button>
                </Col>
              </Row>
              <CardText>
                {/* <Table responsive className='mt-2'>
                  <thead>
                    <tr>
                      <th scope='col' className='text-nowrap'>
                        Sr.No
                      </th>
                      <th scope='col' className='text-nowrap'>
                        PO.No
                      </th>
                      <th scope='col' className='text-nowrap'>
                        PO.Date
                      </th>
                      <th scope='col' className='text-nowrap'>
                        Product Name
                      </th>
                      <th scope='col' className='text-nowrap'>
                        Supplier Name
                      </th>
                      <th scope='col' className='text-nowrap'>
                        Demand Qty
                      </th>
                      <th scope='col' className='text-nowrap'>
                        Rates/Qty
                      </th>
                      <th scope='col' className='text-nowrap'>
                        Action Items
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='text-nowrap'>1</td>
                      <td className='text-nowrap'>123</td>
                      <td className='text-nowrap'>16/04/2022</td>
                      <td className='text-nowrap'>Abc</td>
                      <td className='text-nowrap'>xyz</td>
                      <td className='text-nowrap'>1</td>
                      <td className='text-nowrap'>12</td>
                      <td className='text-nowrap'>
                        <Button color='primary me-1'>Edit</Button>
                        <Button color='danger'>Delete</Button>
                      </td>
                    </tr>
                    <tr>
                      <td className='text-nowrap'>1</td>
                      <td className='text-nowrap'>123</td>
                      <td className='text-nowrap'>16/04/2022</td>
                      <td className='text-nowrap'>Abc</td>
                      <td className='text-nowrap'>xyz</td>
                      <td className='text-nowrap'>1</td>
                      <td className='text-nowrap'>12</td>
                      <td className='text-nowrap'>
                        <Button color='primary me-1'>Edit</Button>
                        <Button color='danger'>Delete</Button>
                      </td>
                    </tr>
                  </tbody>
                </Table> */}
                <DataTable
                  noHeader
                  data={data}
                  columns={productRecieveTable}
                  className='react-dataTable'
                // customStyles={roomAvailabilityStyles}
                />
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className='modal-dialog-centered modal-lg'
        backdrop={false}
      >
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}>
          Add Purchase Receive
        </ModalHeader>
        <ModalBody>
          <>
            <DataTable
              noHeader
              data={data}
              columns={addPurchaseReceiveTable}
              className='react-dataTable'
            />
          </>
        </ModalBody>
      </Modal>

      <Modal
        isOpen={showEdit}
        toggle={() => setShowEdit(!showEdit)}
        className='modal-dialog-centered modal-lg'
        backdrop={false}
      >
        <ModalHeader className='bg-transparent' toggle={() => setShowEdit(!showEdit)}>
          Edit Purchase Receive
        </ModalHeader>
        <ModalBody>
          <>
            <DataTable
              noHeader
              data={data}
              columns={addPurchaseReceiveTable}
              className='react-dataTable'
            />
          </>
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

export default PurchaseReceive