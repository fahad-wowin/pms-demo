import React, { useState, useEffect } from 'react'
import {
  Card, CardBody, Row, Col, Label, Input, Form, Accordion, AccordionBody, AccordionHeader, AccordionItem
} from 'reactstrap'
import { ChevronDown } from 'react-feather'
import Avatar from '@components/avatar'
import axios from '../../API/axios'
// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import ProformaInVoice from './pages/ProformaInVoice'
import Cashiering from './pages/Cashiering'
import AssignRoom from './pages/AssignRoom'
import RoomTransfer from './pages/RoomTransfer'
import ExtendDeparture from './pages/ExtendDeparture'
import BookingVoucher from './pages/BookingVoucher'
import BookingModal from '../FrontDesk/BookingModal'

const states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary']

const Express = () => {
  const [status, setStatus] = useState('')
  const [open, setOpen] = useState(false)
  
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [searchName, setSearchName] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [filteredData, setFilteredData] = useState([])
  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [roomData, setRoomData] = useState([])

  console.log(checkIn)
  console.log(checkOut)

  const getRooms = (i) => {
    console.log('data i > ', data[i]) // TODO - getroom data for the selected reservation
    try {
      const bookingsBody = {
        LoginID: "LDT001",
        Token: "123",
        Seckey: "abc"
      }
      axios.post(`/getdata/bookingdata/roomnumber`, bookingsBody)
        .then(response => {
          console.log("Bookings room num response", response?.data[0])
          console.log('123qqq')
          setRoomData(response?.data[0])
        })
    } catch (error) {
      console.log('123qqq2222')
      console.log("Bookings Error=====", error.message)
    }
  }

  const handleOpen = (i) => {
    console.log(data[i])
    getRooms(i)
    setOpen(!open)
  }


  const userId = localStorage.getItem('user-id')
  useEffect(() => {
    try {
      const bookingsBody = {
        LoginID: userId,
        Token: "123",
        Seckey: "abc",
        CheckInDate: "2022-01-01",
        CheckOutDate: "2022-12-30"
      }
      axios.post(`/getdata/bookingdata/roomchart`, bookingsBody)
        .then(response => {
          console.log("express Bookings room chart response", response?.data[0])
          setData(response?.data[0])
        })
    } catch (error) {
      console.log("Bookings Error=====", error.message)
    }
    if (data === []) {
      setRefresh(true)
    }
  }, [refresh])

  // const toggle = id => {
  //   open === id ? setOpen() : setOpen(id)
  // }
  // ** Function to handle Pagination
  const handlePagination = page => setCurrentPage(page.selected)

  // ** Table data to render
  const dataToRender = () => {
    if (
      searchName.length || status.length || checkIn.length || checkOut.length
    ) {
      return filteredData
    } else {
      return data
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
    const value = e.target.value
    let updatedData = []
    const dataToFilter = () => {
      if (searchName.length || status.length) {
        return filteredData
      } else {
        return data
      }
    }

    setSearchName(value)
    if (value.length) {
      updatedData = dataToFilter().filter(item => {
        const startsWith = item.GuestName.toLowerCase().startsWith(value.toLowerCase())

        const includes = item.GuestName.toLowerCase().includes(value.toLowerCase())

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
  const handleCheckInFilter = e => {
    const value = e.target.value
    console.log(value)
    let updatedData = []
    const dataToFilter = () => {
      if (searchName.length || status.length || checkIn.length) {
        return filteredData
      } else {
        return data
      }
    }

    setCheckIn(value)
    if (value.length) {
      updatedData = dataToFilter().filter(item => {
        const startsWith = item.CheckInDate.toLowerCase().startsWith(value.toLowerCase())

        const includes = item.CheckInDate.toLowerCase().includes(value.toLowerCase())
        console.log(item.CheckInDate.toLowerCase())
        console.log(value.toLowerCase())
        console.log(startsWith)
        console.log(includes)
        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData([...updatedData])
      setCheckIn(value)
    }
  }

  const handleCheckOutFilter = e => {
    const value = e.target.value
    let updatedData = []
    const dataToFilter = () => {
      if (searchName.length || status.length || checkOut.length) {
        return filteredData
      } else {
        return data
      }
    }

    setCheckOut(value)
    if (value.length) {
      updatedData = dataToFilter().filter(item => {
        const startsWith = item.CheckOutDate.toLowerCase().startsWith(value.toLowerCase())

        const includes = item.CheckOutDate.toLowerCase().includes(value.toLowerCase())

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData([...updatedData])
      setCheckOut(value)
    }
  }
  const handleStatusFilter = e => {
    setStatus('')
    const value = e.target.value
    let updatedData = []
    const dataToFilter = () => {
      if (searchName.length || status.length) {
        return filteredData
      } else {
        return data
      }
    }

    setStatus(value)
    if (value.length) {
      updatedData = dataToFilter().filter(item => {
        const startsWith = item.status?.toLowerCase().startsWith(value.toLowerCase())

        const includes = item.status?.toLowerCase().includes(value.toLowerCase())

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData([...updatedData])
      setStatus(value)
    }
  }

  const columns = [
    {
      name: 'Booking Through',
      sortable: row => row.GuestName,
      cell: (row, i) => (
        <div className='d-flex align-items-center cursor-pointer' onClick={() => handleOpen(i)}>
          {row.avatar === '' ? (
            <Avatar img={require(`../../assets/images/logo/hostynnist-logo.png`).default} />

          ) : (
            <Avatar color={`light-${states[i]}`} content={row.RoomID} initials />

          )}

        </div>
      )
    },
    {
      name: 'Booking ID',
      sortable: true,
      minWidth: '200px',
      selector: row => row.RoomAllocationID
    },
    {
      name: 'Guest Name',
      sortable: true,
      minWidth: '150px',
      selector: row => (
        <>
        <p>{row.GuestName}</p>
        <p>{row.GuestMobileNumber}</p>
        </>
      )
    },
    {
      name: 'Room',
      sortable: true,
      minWidth: '100px',
      selector: row => (
        <>
          <p>{row.RoomID}</p>
          <p>{row.Description}</p>
        </>
      )
    },
    {
      name: 'Check-In',
      sortable: true,
      minWidth: '150px',
      selector: row => row.CheckInDate
    },
    {
      name: 'Check-Out',
      sortable: true,
      minWidth: '150px',
      selector: row => row.CheckOutDate
    }
    
  ]
  return (
    <>
    <div>
      <Card className='paper'>
        <Row>
          <Col sm='12' className='d-flex border-bottom pb-50'>
            <Form className='col'>
                <div className='demo-inline-spacing pb-50 justify-content-around'>
                <div className='form-check'>
                  <Input type='radio' name='ex5' id='ex5-inactive' value=""
                    checked={status === ""} onChange={handleStatusFilter} />
                  <Label className='form-check-label' for='ex5-inactive'>
                    All
                  </Label>
                </div>
                <div className='form-check'>
                  <Input type='radio' id='ex1-active' name='ex1' value="reserved"
                    checked={status === "reserved"} onChange={handleStatusFilter} />
                  <Label className='form-check-label' for='ex1-active'>
                    Reserved
                  </Label>
                </div>
                <div className='form-check'>
                  <Input type='radio' name='ex2' id='ex2-inactive' value="check in"
                    checked={status === "check in"} onChange={handleStatusFilter} />
                  <Label className='form-check-label' for='ex2-inactive'>
                    Check In
                  </Label>
                </div>
                <div className='form-check'>
                  <Input type='radio' name='ex3' id='ex3-inactive' value="check out"
                    checked={status === "check out"} onChange={handleStatusFilter} />
                  <Label className='form-check-label' for='ex3-inactive'>
                    Check Out
                  </Label>
                </div>
                <div className='form-check'>
                  <Input type='radio' name='ex4' id='ex4-inactive' value="cancelled"
                    checked={status === "cancelled"} onChange={handleStatusFilter} />
                  <Label className='form-check-label' for='ex4-inactive'>
                    Cancelled
                  </Label>
                </div>
                <div className='form-check'>
                  <Input type='radio' name='ex6' id='ex6-inactive' value="group booking"
                    checked={status === "group booking"} onChange={handleStatusFilter} />
                  <Label className='form-check-label' for='ex6-inactive'>
                    Group Booking
                  </Label>
                </div>
                <div className='form-check'>
                  <Input type='radio' name='ex7' id='ex7-inactive' value="ibebooking"
                    checked={status === "ibebooking"} onChange={handleStatusFilter} />
                  <Label className='form-check-label' for='ex7-inactive'>
                    IBE Booking
                  </Label>
                </div>
              </div>
            </Form>
          </Col>
        </Row>
        <CardBody>
          <Row className='mt-1 mb-50'>
            <Col lg='4' md='6' className='mb-1'>
              <Label className='form-label' for='name'>
                Name:
              </Label>
              <Input id='name' placeholder='Bruce Wayne' value={searchName} onChange={handleNameFilter} />
            </Col>
            <Col lg='4' md='6' className='mb-1'>
              <Label className='form-label' for='name'>
                Check In Date:
              </Label>
              <Input type='date' id='name' placeholder='check in date' value={checkIn} onChange={handleCheckInFilter} />
            </Col>
            <Col lg='4' md='6' className='mb-1'>
              <Label className='form-label' for='name'>
                Check Out Date:
              </Label>
              <Input type='date' id='name' placeholder='Check Out Date' value={checkOut} onChange={handleCheckOutFilter} />
            </Col>
          </Row>
        </CardBody>
        <div className='react-dataTable'>
          <DataTable
            noHeader
            pagination
            columns={columns}
            paginationPerPage={7}
            className='react-dataTable'
            sortIcon={<ChevronDown size={10} />}
            paginationDefaultPage={currentPage + 1}
            paginationComponent={CustomPagination}
            data={dataToRender()}
          />
        </div>
      </Card>
      {/* <Accordion className='accordion-margin' open={open} toggle={toggle}>
        <AccordionItem>
          <AccordionHeader targetId='1'>Proforma InVoice</AccordionHeader>
          <AccordionBody accordionId='1'>
            <ProformaInVoice />
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId='3'>Assign Room</AccordionHeader>
          <AccordionBody accordionId='3'>
            <AssignRoom />
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId='4'>Room Transfer</AccordionHeader>
          <AccordionBody accordionId='4'>
            <RoomTransfer />
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId='5'>Extend Departure</AccordionHeader>
          <AccordionBody accordionId='5'>
            <ExtendDeparture />
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId='6'>Booking Voucher</AccordionHeader>
          <AccordionBody accordionId='6'>
            <BookingVoucher />
          </AccordionBody>
        </AccordionItem>
      </Accordion> */}
    </div>

    <BookingModal open={open} handleOpen={handleOpen} roomData={roomData} />
    </>
  )
}

export default Express