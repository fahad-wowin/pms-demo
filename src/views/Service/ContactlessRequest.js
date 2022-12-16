import React, { useState } from 'react'
import {
  Card, CardTitle, CardText, CardBody, CardSubtitle, CardHeader, Row, Col, Label, Input, UncontrolledDropdown, DropdownToggle, DropdownMenu,
  DropdownItem, Modal, ModalHeader, ModalBody,
  Button, Form, Table, Badge
} from 'reactstrap'
import { MoreVertical, Edit, Trash, ChevronDown } from 'react-feather'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { selectThemeColors } from '@utils'
import Select from 'react-select'


const ContactlessRequest = () => {
  const ContactlessData = [
    {
        code: 'HVPO10638',
        full_name: 'alam khan',
        email: 'khanalam165@gmail.com',
        is_request: 'no',
        rate_plan: 'Room Only',
        mobile_number: 7276765423,
        room_type: 'Deluxe',
        start_date: '08/25/2022',
        status: 'confirm',
        room: '205'
    },
    {
        code: 'HVPO10639',
        full_name: 'alam khan',
        email: 'mohdalam165@gmail.com',
        is_request: 'yes',
        rate_plan: 'Room Only',
        mobile_number: 8149180058,
        room_type: 'Deluxe',
        start_date: '08/25/2022',
        status: 'reject',
        room: '206'
    },
    {
        code: 'HVPO10640',
        full_name: 'alam khan',
        email: 'mohdalam165@gmail.com',
        is_request: 'no',
        rate_plan: 'Room Only',
        mobile_number: 7276765423,
        room_type: 'Standered',
        start_date: '08/25/2022',
        status: 'confirm',
        room: '207'
    },
    {
        code: 'HVPO10641',
        full_name: 'bhai',
        email: 'mohdalam165@gmail.com',
        is_request: 'yes',
        rate_plan: 'Breakfast Included',
        mobile_number: 8149180058,
        room_type: 'Executive',
        start_date: '08/30/2022',
        status: 'pending',
        room: '208'
    }
]
  const [searchName, setSearchName] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [filteredData, setFilteredData] = useState([])


  // ** Function to handle Pagination
  const handlePagination = page => setCurrentPage(page.selected)

  // ** Table data to render
  const dataToRender = () => {
    if (
      searchName.length 
    ) {
      return filteredData
    } else {
      return ContactlessData
    }
  }

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel={''}
      nextLabel={''}
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={Math.ceil(dataToRender().length / 7) || 1}
      breakLabel={'...'}
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName='active'
      pageClassName='page-item'
      breakClassName='page-item'
      nextLinkClassName='page-link'
      pageLinkClassName='page-link'
      breakLinkClassName='page-link'
      previousLinkClassName='page-link'
      nextClassName='page-item next-item'
      previousClassName='page-item prev-item'
      containerClassName={'pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1'}
    />
  )

  // ** Function to handle name filter
  const handleNameFilter = e => {
    const value = e.value
    let updatedData = []
    const dataToFilter = () => {
      if (searchName.length) {
        return filteredData
      } else {
        return ContactlessData
      }
    }

    setSearchName(value)
    if (value.length) {
      updatedData = dataToFilter().filter(item => {
        const startsWith = item.full_name.toLowerCase().startsWith(value.toLowerCase())

        const includes = item.full_name.toLowerCase().includes(value.toLowerCase())

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData([...updatedData])
      setSearchName(value)
    }
  }

  const colourOptions = [
    { value: '', label: 'All' },
    { value: 'alam', label: 'Today Arrival' },
    { value: 'bhai', label: 'Today Departure' }
  ]

  const ContactlessColumn = [
    {
        name: 'Booking Code',
        minWidth: '140px',
        sortable: row => row.code,
        selector: row => row.code
    },
    {
        name: 'Customer Name',
        sortable: true,
        minWidth: '160px',
        sortable: row => row.full_name,
        selector: row => row.full_name
    },
    {
        name: 'Mobile Number',
        sortable: true,
        minWidth: '160px',
        sortable: row => row.mobile_number,
        selector: row => row.mobile_number
    },
    {
        name: 'Email',
        sortable: true,
        minWidth: '200px',
        sortable: row => row.email,
        selector: row => row.email
    },
    {
        name: 'Room Number',
        sortable: true,
        minWidth: '150px',
        sortable: row => row.room,
        selector: row => row.room
    },

    {
        name: 'isRequest',
        sortable: true,
        minWidth: '100px',
        sortable: row => row.is_request,
        selector: row => row.is_request
    },
    {
        name: 'Room Type',
        sortable: true,
        minWidth: '130px',
        sortable: row => row.room_type,
        selector: row => row.room_type
    },
    {
        name: 'Rate Plan',
        sortable: true,
        minWidth: '200px',
        selector: row => row.rate_plan
    }
]
  return (
    <div>
      <Card className='paper'>
      <CardHeader>
        <CardTitle>Online Booking</CardTitle>
      </CardHeader>
        <CardBody>
          <Row className='mt-1 mb-50'>
            <Col lg='4' md='6' className='mb-1'>
              <Label className='form-label' for='name'>
                Select:
              </Label>
              <div className="head align-items-center">
                <Select
                  theme={selectThemeColors}
                  className='react-select'
                  classNamePrefix='select'
                  defaultValue={colourOptions[1]}
                  name='clear'
                  options={colourOptions}
                  onChange={handleNameFilter}
                />
              </div>
            </Col>
          </Row>
        </CardBody>
        <div>
          <DataTable
            noHeader
            pagination
            columns={ContactlessColumn}
            paginationPerPage={7}
            sortIcon={<ChevronDown size={10} />}
            paginationDefaultPage={currentPage + 1}
            paginationComponent={CustomPagination}
            data={dataToRender()}
          />
        </div>
      </Card>
    </div>
  )
}

export default ContactlessRequest