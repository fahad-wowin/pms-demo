import { React, useState } from 'react'
import { Row, Col, Button, Card, CardHeader, CardTitle, CardBody, Label, Input, Modal, ModalBody, ModalHeader, Form, FormFeedback, Badge, InputGroupText, InputGroup } from 'reactstrap'
import DataTable from 'react-data-table-component'
import { ChevronDown, Edit, Trash, Trash2 } from 'react-feather'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import Flatpickr from 'react-flatpickr'
import { MdDateRange } from "react-icons/md"
import moment from "moment"
// ** Styles
import '@styles/react/libs/editor/editor.scss'

const roomOption = [
  { value: '', label: 'Select Room' },
  { value: '101', label: '101' },
  { value: '102', label: '102' },
  { value: '103', label: '103' },
  { value: '104', label: '104' },
  { value: '105', label: '105' }
]
const invoiceNo = [
  { value: '', label: 'Select Invoice' },
  { value: '201', label: '201' },
  { value: '202', label: '202' },
  { value: '203', label: '203' },
  { value: '204', label: '204' },
  { value: '205', label: '205' }
]
const History = () => {

  const data = [
    {
      id: 1,
      gender: 'male',
      user_name: 'alam',
      cloth_name: 'jacket',
      service_type: 'Washing',
      rate_amount: '5200'
    },
    {
      id: 2,
      gender: 'female',
      user_name: 'taha',
      cloth_name: 'shirt',
      service_type: 'Washing',
      rate_amount: '3600'
    }
  ]
  const [searchRoom, setSearchRoom] = useState('')
  const [searchInvoice, setSearchInvoice] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [searchStartDate, setSearchStartDate] = useState(new Date())
  const [searchEndDate, setSearchEndDate] = useState(new Date())

  console.log('start date', moment(searchStartDate).format("ddd D MMM YY"))
  console.log('end date', moment(searchEndDate).format("ddd D MMM YY"))
  const dataToRender = () => {
    if (
      searchRoom || searchInvoice
    ) {
      return filteredData
    } else {
      return data
    }
  }

  // ** Function to handle name filter
  const handleRoomFilter = e => {
    const value = e.value
    let updatedData = []
    const dataToFilter = () => {
      if (searchRoom.length) {
        return filteredData
      } else {
        return data
      }
    }

    setSearchRoom(value)
    console.log(value)
    if (value) {
      updatedData = dataToFilter().filter(item => {
        const startsWith = item.gender.toLowerCase().startsWith(value.toLowerCase())
        const includes = item.gender.toLowerCase().includes(value.toLowerCase())

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData(updatedData)
      setSearchRoom(value)

    }
  }
  const handleInvoiceFilter = e => {
    const value = e.value
    let updatedData = []
    const dataToFilter = () => {
      if (searchRoom || searchInvoice) {
        return filteredData
      } else {
        return data
      }
    }

    setSearchInvoice(value)
    console.log(value)
    if (value) {
      updatedData = dataToFilter().filter(item => {
        const startsWith = item.gender.toLowerCase().startsWith(value.toLowerCase())
        const includes = item.gender.toLowerCase().includes(value.toLowerCase())

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData(updatedData)
      setSearchInvoice(value)

    }
  }

  const UsersColumns = [
    {
      name: 'ID',
      sortable: true,
      selector: row => row.id
    },
    {
      name: 'Gender',
      sortable: true,
      selector: row => row.gender
    },
    {
      name: 'Cloth Name',
      sortable: true,
      selector: row => row.cloth_name
    },
    {
      name: 'Service',
      sortable: true,
      selector: row => row.service_type
    },
    {
      name: 'Rate Amount',
      sortable: true,
      selector: row => row.rate_amount
    }
  ]

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Laundry History</CardTitle>
        </CardHeader>
        <CardBody>
          <Row className='mt-1 mb-50'>
            <Col lg='3' md='4' sm='12' className='mb-1'>
              <Label className='form-label' for='nameVertical'>
                Room Number
              </Label>
              <Select
                theme={selectThemeColors}
                className='react-select w-100'
                classNamePrefix='select'
                defaultValue={roomOption[0]}
                options={roomOption}
                isClearable={false}
                onChange={ handleRoomFilter}
              />
            </Col>
            <Col lg='3' md='4' sm='12' className='mb-1'>
              <Label className='form-label' for='nameVertical'>
                Invoice Number
              </Label>
              <Select
                theme={selectThemeColors}
                className='react-select w-100'
                classNamePrefix='select'
                defaultValue={invoiceNo[0]}
                options={invoiceNo}
                isClearable={false}
                onChange={handleInvoiceFilter}
              />
            </Col>
            <Col md='4' className='mb-1 d-none d-lg-none d-md-block'>

            </Col>
            <Col lg='3' md='4' className='mb-1'>
              <Label className='form-label' for='searchStartDate'>
                Start Date
              </Label>
              <div className='datePicker'>
                <InputGroup className='input-group-merge'>
                  <Flatpickr className='form-control' selected={searchStartDate} value={searchStartDate} onChange={date => setSearchStartDate(date)} id='searchStartDate' />
                  <InputGroupText>
                    <MdDateRange size={15} />
                  </InputGroupText>
                </InputGroup>
              </div>
            </Col>
            <Col className='mb-1' lg='3' md='4' sm='12'>
              <Label className='form-label' for='searchEndDate'>
                End Date :
              </Label>
              <div className='datePicker'>
                <InputGroup className='input-group-merge'>
                  <Flatpickr className='form-control' selected={searchEndDate} value={searchEndDate} onChange={date => setSearchEndDate(date)} id='endtDate' />
                  <InputGroupText>
                    <MdDateRange size={15} />
                  </InputGroupText>
                </InputGroup>
              </div>
            </Col>
            <Col className='mb-1 justify-content-center text-center'>
              {/* <div className='text-center'>
                <Button.Ripple color='primary'>SEARCH</Button.Ripple>
              </div> */}
              <div className='text-center mx-1'>
                <Button.Ripple color='danger'>CLEAR</Button.Ripple>
              </div>
            </Col>
            {/*<Col className='mb-1 justify-content-center align-item-center align-self-end' xl='3' md='4' sm='12'>
              <div className='w-100'>
              <div className='d-flex'>
                <span>Room Number : </span>
                <span className='ms-1'>{searchRoom}</span>
              </div>
              <div className='d-flex '>
                <span>Invoice Number : </span>
                <span className='ms-1'>{searchInvoice}</span>
              </div>
              </div>
          </Col>*/}

          </Row>
          <Row>
            <Col>
              <DataTable
                noHeader
                pagination
                data={dataToRender()}
                columns={UsersColumns}
                className='react-dataTable'
                sortIcon={<ChevronDown size={10} />}
                paginationRowsPerPageOptions={[10, 25, 50, 100]}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  )
}

export default History