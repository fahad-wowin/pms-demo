import { React, useState } from 'react'
import { Row, Col, Button, Input, Table, Modal, ModalHeader, ModalBody, Label, InputGroupText, InputGroup } from 'reactstrap'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
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
const Category = () => {
  const [showEdit, setShowEdit] = useState(false)
  const [del, setDel] = useState(false)

  const categoryTable = [
    {
      name: 'Ref ID',
      selector: row => row.id,
      style: {
        color: 'black'
      }
    },
    {
      name: "Category Name",
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
        <Col md='3' className='mb-1 text-end'>
          <h5>Product Category</h5>
        </Col>
        <Col md='5' className='mb-1'>
          <Input type='text' placeholder='Enter Product Category' />
        </Col>
        <Col md='4' className='mb-1'>
          <Button color='primary me-1' >Submit</Button>
          <Button color='danger'>Reset</Button>
        </Col>
      </Row>
      <DataTable
        noHeader
        data={data}
        columns={categoryTable}
        className='react-dataTable'
        pagination
      />
      <Modal
        isOpen={showEdit}
        toggle={() => setShowEdit(!showEdit)}
        className='modal-dialog-centered modal-lg'
        backdrop={false}
      >
        <ModalHeader className='bg-transparent' toggle={() => setShowEdit(!showEdit)}>
          Edit Category
        </ModalHeader>
        <ModalBody className='px-sm-2 mx-50 pb-5'>
          <Row>
            <Col md='12' className='mb-2'>
              <Label className='form-label'>Product Category</Label>
              <Select
                theme={selectThemeColors}
                className='react-select w-100'
                classNamePrefix='select'
                defaultValue={venderOptions[0]}
                options={venderOptions}
                isClearable={false}
              />
            </Col>


          </Row>
          <Row tag='form' className='gy-1 gx-2 mt-75' >
            <Col className='text-end mt-1' xs={12}>
              <Button type='submit' className='me-1' color='primary'>
                Submit
              </Button>
              <Button
                color='secondary'
                outline
                onClick={() => {
                  setShowEdit(!showEdit)
                }}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
      {/* <Modal
        isOpen={del}
        toggle={() => setDel(!del)}
        className='modal-dialog-centered'
        backdrop={false}
      >
        <ModalHeader className='bg-transparent' toggle={() => setDel(!del)}>
          Are you sure to delete this permanently?
        </ModalHeader>
        <ModalBody className='px-sm-2 mx-50'>
          <Row tag='form' className='gy-1 gx-2 mt-75' >
            <Col className='text-end mt-1' xs={12}>
              <Button type='submit' className='me-1' color='primary'>
                OK
              </Button>
              <Button
                color='secondary'
                outline
                onClick={() => {
                  setDel(!del)
                }}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal> */}
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
        showEdit | del ? (
          <div class="modal-backdrop fade show" ></div>
        ) : null
      }
    </>
  )
}

export default Category