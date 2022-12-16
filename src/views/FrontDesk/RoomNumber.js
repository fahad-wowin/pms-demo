import React, { useState, useEffect } from 'react'
import { Alert, Button, Card, CardBody, CardHeader, CardTitle, Col, Row, Table } from 'reactstrap'
import Flatpickr from 'react-flatpickr'
import moment from 'moment'

// ** Styles
import './table.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import BookingModal from './BookingModal'
import { useNavigate } from 'react-router-dom'
import axios from '../../API/axios'
import { FaUserTie } from 'react-icons/fa'
import RoomData from './RoomData'

const RoomNumber = (props) => {

  const datesArr = []
  const [selected_date, setSelected_date] = useState(props.date ?? new Date())
  const [open, setOpen] = useState(false)
  
  const [OpenRoomAllocationID, setOpenRoomAllocationID] = useState()
  const [openRoom, setOpenRoom] = useState()

  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [roomData, setRoomData] = useState([])

  const handleOpen = () => {
    //setOpenRoomAllocationID(OpenRoomAllocationID)
    setOpen(!open)
  }
  useEffect(() => {
    setOpenRoom(data.filter(room => room.RoomAllocationID === OpenRoomAllocationID)[0])
    console.log('OpenRoomAllocationID - ', OpenRoomAllocationID)

  }, [OpenRoomAllocationID])
  
  for (let i = 0; i < 15; i++) {
    if (i === 0) {
      datesArr.push(moment(selected_date).format("ddd D MMM YY"))
    } else {
      datesArr.push(moment(selected_date).add(i, 'days').format("ddd D MMM YY"))
    }
  }

  const userId = localStorage.getItem('user-id')

  const getRoomDetails = () => {
    console.log('123')
    //console.log('in room refresh> ', refresh)
    try {
      const bookingsBody = {
        LoginID: userId,
        Token: "123",
        Seckey: "abc",
        Event: 'Select'
      }
       axios.post(`/getdata/bookingdata/roomdetails`, bookingsBody) // TODO - Why
        .then(detailResponse => {
          let roomDetailsdata = detailResponse?.data[0]
          console.log("Room details response data > ", roomDetailsdata)
          // Test Data
          // TODO - Check for data, if not use hard code for test
          if (!(roomDetailsdata && roomDetailsdata.length > 0 && roomDetailsdata[0].AdultMax)) {
            roomDetailsdata = [
              {
                  RoomID: "RDT001",
                  RoomTypeID: "RTD001",
                  RoomViewID: "RVD001",
                  BedTypeID: "BEDT20221008AA00001",
                  ExtraBedTypeID: "EBD001",
                  Amenities: "AC, Bathtub",
                  Location: null,
                  RoomRate: 1800.0,
                  CGST_P: 6.0,
                  SGST_P: 6.0,
                  IGST_P: 12.0,
                  TotalTax: 15000.0,
                  TotalAmount: 16800.0,
                  CreatedDate: "2022-10-08T14:30:51.823",
                  UpdatedDate: "2022-11-30T16:22:12.183",
                  StatusID: "SDT001",
                  RoomDesc: "Single Room",
                  RoomDisplayName: "Single Room",
                  RoomSize: "10 sqmundefinedundefined",
                  AdultBase: 1,
                  AdultMax: 2,
                  InfantMax: 1,
                  ChildBase: 1,
                  ChildMax: 1,
                  GuestMax: 3,
                  ExtraAdultPrice: 200.0,
                  ExtraChildPrice: 100.0,
                  RoomStatusID: "SDT007",
                  CompanyID: "COM001",
                  RoomType: "Single Room",
                  RoomView: "City View",
                  BedType: "Single",
                  ExtraBedType: "Matress",
                  Status: "Active"
              },
              {
                  RoomID: "RDT004",
                  RoomTypeID: "RTD004",
                  RoomViewID: "RVD002",
                  BedTypeID: "BEDT20221008AA00004",
                  ExtraBedTypeID: "EBD001",
                  Amenities: "AC, Bathtub",
                  Location: null,
                  RoomRate: 3000.0,
                  CGST_P: 9.0,
                  SGST_P: 9.0,
                  IGST_P: 18.0,
                  TotalTax: 540.0,
                  TotalAmount: 3540.0,
                  CreatedDate: "2022-10-08T14:30:51.823",
                  UpdatedDate: "2022-10-08T14:30:51.823",
                  StatusID: "SDT001",
                  RoomDesc: "Executive Suite Room",
                  RoomDisplayName: "Executive Suite Room",
                  RoomSize: "30sqm",
                  AdultBase: 2,
                  AdultMax: 2,
                  InfantMax: 1,
                  ChildBase: 0,
                  ChildMax: 0,
                  GuestMax: 2,
                  ExtraAdultPrice: 350.0,
                  ExtraChildPrice: 250.0,
                  RoomStatusID: "SDT001",
                  CompanyID: "COM001",
                  RoomType: "Executive Suite Room",
                  RoomView: "Pool View1",
                  BedType: "Queen Size",
                  ExtraBedType: "Matress",
                  Status: "Active"
              },
              {
                  RoomID: "RDTI20221025AA00005",
                  RoomTypeID: "RTD004",
                  RoomViewID: "RVD002",
                  BedTypeID: "BEDT20221008AA00008",
                  ExtraBedTypeID: "EBD0202211140000002",
                  Amenities: "AC, Bathtub",
                  Location: null,
                  RoomRate: 3000.0,
                  CGST_P: 6.0,
                  SGST_P: 6.0,
                  IGST_P: 12.0,
                  TotalTax: 25000.0,
                  TotalAmount: 28000.0,
                  CreatedDate: "2022-10-08T14:30:51.823",
                  UpdatedDate: "2022-11-30T20:08:09.05",
                  StatusID: "SDT001",
                  RoomDesc: "Executive Suite Room",
                  RoomDisplayName: "Deluxe",
                  RoomSize: null,
                  AdultBase: 2,
                  AdultMax: 2,
                  InfantMax: 1,
                  ChildBase: 0,
                  ChildMax: 0,
                  GuestMax: 2,
                  ExtraAdultPrice: 350.0,
                  ExtraChildPrice: 250.0,
                  RoomStatusID: "SDT007",
                  CompanyID: "COM001",
                  RoomType: "Executive Suite Room",
                  RoomView: "Pool View1",
                  BedType: "Triple-Double",
                  ExtraBedType: "qwtest",
                  Status: "Active"
              },
              {
                  RoomID: "RDTI20221201AA00036",
                  RoomTypeID: "RTD004",
                  RoomViewID: "RVD002",
                  BedTypeID: "BEDT20221008AA00004",
                  ExtraBedTypeID: "EBD001",
                  Amenities: "AC, Bathtub",
                  Location: null,
                  RoomRate: 3000.0,
                  CGST_P: 9.0,
                  SGST_P: 9.0,
                  IGST_P: 18.0,
                  TotalTax: 540.0,
                  TotalAmount: 3540.0,
                  CreatedDate: "2022-12-01T15:59:31",
                  UpdatedDate: "2022-12-01T15:59:31",
                  StatusID: "SDT001",
                  RoomDesc: "Executive Suite Room",
                  RoomDisplayName: "Executive Suite Room",
                  RoomSize: "30sqm",
                  AdultBase: 2,
                  AdultMax: 2,
                  InfantMax: 1,
                  ChildBase: 0,
                  ChildMax: 0,
                  GuestMax: 2,
                  ExtraAdultPrice: 350.0,
                  ExtraChildPrice: 250.0,
                  RoomStatusID: "SDT001",
                  CompanyID: "COM001",
                  RoomType: "Executive Suite Room",
                  RoomView: "Pool View1",
                  BedType: "Queen Size",
                  ExtraBedType: "Matress",
                  Status: "Active"
              }
          ]
          console.log("Static Room details data > ", roomDetailsdata)
        
          }
          // Remove Test Data
          setRoomData(roomDetailsdata)

        })
    } catch (error) {
      console.log("Room Detail Response Error=====", error.message)
    }

  }

  useEffect(() => {
    console.log('in use effect for room details')

      getRoomDetails()
  }, [refresh])

  useEffect(() => {
    async function populateRoomChartData() {
    try {
      if (roomData === undefined || roomData.length === 0) {
        console.log('in use effect of room chart calling room detail')

        getRoomDetails()
      }
      console.log('moment date-', moment(selected_date).format("y-MM-DD HH:mm:ss"))
      const bookingsBody = {
        LoginID: userId,
        Token: "123",
        Seckey: "abc",
        CheckInDate: moment(selected_date).format("y-MM-DD HH:mm:ss"),
        CheckOutDate: moment(selected_date).add(15, 'days').format("y-MM-DD HH:mm:ss")
      }
      const chartResponse = await axios.post('/getdata/bookingdata/roomchart', bookingsBody)        
          let roomChartData = chartResponse?.data[0]
          // Test Data
          // TODO - Check for data, if not use hard code for test
          console.log("Static Roomchart response data- ", roomChartData)

          if (!(roomChartData && roomChartData.length > 0 && roomChartData[0].CheckInDate)) {
            roomChartData =
              [
                  {
                      RoomAllocationID: "BKID20221128AA00175",
                      CheckInDate: "2022-10-25T15:39:56.72",
                      CheckOutDate: "2022-10-27T15:39:56.72",
                      RoomID: "RDT004",
                      FloorID: null,
                      FloorNo: null,
                      FloorDesc: null,
                      RoomNo: null,
                      Description: null,
                      GuestName: "Suleman",
                      GuestMobileNumber: "9874569874",
                      GuestEmail: "abc@gmail.com"
                  },
                  {
                      RoomAllocationID: "BKID20221124AA00173",
                      CheckInDate: "2022-11-25T15:39:56.72",
                      CheckOutDate: "2022-11-26T15:39:56.72",
                      RoomID: "RDT004",
                      FloorID: "FMS005",
                      FloorNo: 0,
                      FloorDesc: "Ground Floor",
                      RoomNo: "05",
                      Description: "Double Bed Room",
                      GuestName: "Suleman",
                      GuestMobileNumber: "9874569874",
                      GuestEmail: "abc@gmail.com"
                  },
                  {
                      RoomAllocationID: "BKID20221124AA00172",
                      CheckInDate: "2022-11-15T15:39:56.72",
                      CheckOutDate: "2022-11-18T15:39:56.72",
                      RoomID: "RDT001",
                      FloorID: "FMS001",
                      FloorNo: 0,
                      FloorDesc: "Ground Floor",
                      RoomNo: "01",
                      Description: "Single Bed Room",
                      GuestName: "Suleman",
                      GuestMobileNumber: "9874569874",
                      GuestEmail: "abc@gmail.com"
                  },
                  {
                      RoomAllocationID: "BKID20221124AA00172",
                      CheckInDate: "2022-10-05T15:39:56.72",
                      CheckOutDate: "2022-10-10T15:39:56.72",
                      RoomID: "RDT001",
                      FloorID: "FMS001",
                      FloorNo: 0,
                      FloorDesc: "Ground Floor",
                      RoomNo: "01",
                      Description: "Single Bed Room",
                      GuestName: "Suleman",
                      GuestMobileNumber: "9874569874",
                      GuestEmail: "abc@gmail.com"
                  },
                  {
                      RoomAllocationID: "BKID20221030AA00017",
                      CheckInDate: "2022-10-25T15:39:56.72",
                      CheckOutDate: "2022-10-26T15:39:56.72",
                      RoomID: "RDT004",
                      FloorID: null,
                      FloorNo: null,
                      FloorDesc: null,
                      RoomNo: null,
                      Description: null,
                      GuestName: "Suleman",
                      GuestMobileNumber: "9874569874",
                      GuestEmail: "abc@gmail.com"
                  },
                  {
                      RoomAllocationID: "BKID20221030AA00016",
                      CheckInDate: "2022-12-05T15:39:56.72",
                      CheckOutDate: "2022-12-06T15:39:56.72",
                      RoomID: "RDT001",
                      FloorID: null,
                      FloorNo: null,
                      FloorDesc: null,
                      RoomNo: null,
                      Description: null,
                      GuestName: "Suleman",
                      GuestMobileNumber: "9874569874",
                      GuestEmail: "abc@gmail.com"
                  },
                  {
                      RoomAllocationID: "BKID20221030AA00015",
                      CheckInDate: "2022-12-15T15:39:56.72",
                      CheckOutDate: "2022-12-17T15:39:56.72",
                      RoomID: "RDT004",
                      FloorID: null,
                      FloorNo: null,
                      FloorDesc: null,
                      RoomNo: null,
                      Description: null,
                      GuestName: "Suleman",
                      GuestMobileNumber: "9874569874",
                      GuestEmail: "abc@gmail.com"
                  },
                  {
                      RoomAllocationID: "BKID20221029AA00012",
                      CheckInDate: "2022-10-25T15:39:56.72",
                      CheckOutDate: "2022-10-26T15:39:56.72",
                      RoomID: "RDT001",
                      FloorID: null,
                      FloorNo: null,
                      FloorDesc: null,
                      RoomNo: null,
                      Description: null,
                      GuestName: "Suleman",
                      GuestMobileNumber: "9874569874",
                      GuestEmail: "abc@gmail.com"
                  },
                  {
                      RoomAllocationID: "BKID20221029AA00011",
                      CheckInDate: "2022-10-25T15:39:56.72",
                      CheckOutDate: "2022-10-26T15:39:56.72",
                      RoomID: "RDT004",
                      FloorID: null,
                      FloorNo: null,
                      FloorDesc: null,
                      RoomNo: null,
                      Description: null,
                      GuestName: "Suleman",
                      GuestMobileNumber: "9874569874",
                      GuestEmail: "abc@gmail.com"
                  },
                  {
                      RoomAllocationID: "BKID20221029AA00010",
                      CheckInDate: "2022-10-25T15:39:56.72",
                      CheckOutDate: "2022-10-26T15:39:56.72",
                      RoomID: "RDT001",
                      FloorID: null,
                      FloorNo: null,
                      FloorDesc: null,
                      RoomNo: null,
                      Description: null,
                      GuestName: "Suleman",
                      GuestMobileNumber: "9874569874",
                      GuestEmail: "abc@gmail.com"
                  },
                  {
                      RoomAllocationID: "BKID20221029AA00009",
                      CheckInDate: "2022-10-15T15:39:56.72",
                      CheckOutDate: "2022-10-16T15:39:56.72",
                      RoomID: "RDT004",
                      FloorID: null,
                      FloorNo: null,
                      FloorDesc: null,
                      RoomNo: null,
                      Description: null,
                      GuestName: "Suleman",
                      GuestMobileNumber: "9874569874",
                      GuestEmail: "abc@gmail.com"
                  },
                  {
                      RoomAllocationID: "BKID20221029AA00008",
                      CheckInDate: "2022-10-17T15:39:56.72",
                      CheckOutDate: "2022-10-20T15:39:56.72",
                      RoomID: "RDT001",
                      FloorID: null,
                      FloorNo: null,
                      FloorDesc: null,
                      RoomNo: null,
                      Description: null,
                      GuestName: "Suleman",
                      GuestMobileNumber: "9874569874",
                      GuestEmail: "abc@gmail.com"
                  },
                  {
                      RoomAllocationID: "BKID20221026AA00007",
                      CheckInDate: "2022-10-22T15:39:56.72",
                      CheckOutDate: "2022-10-24T15:39:56.72",
                      RoomID: "RDT004",
                      FloorID: null,
                      FloorNo: null,
                      FloorDesc: null,
                      RoomNo: null,
                      Description: null,
                      GuestName: "Suleman",
                      GuestMobileNumber: "9874569874",
                      GuestEmail: "abc@gmail.com"
                  },
                  {
                      RoomAllocationID: "BKID20221026AA00006",
                      CheckInDate: "2022-10-29T15:39:56.72",
                      CheckOutDate: "2022-10-30T15:39:56.72",
                      RoomID: "RDT001",
                      FloorID: null,
                      FloorNo: null,
                      FloorDesc: null,
                      RoomNo: null,
                      Description: null,
                      GuestName: "Suleman",
                      GuestMobileNumber: "9874569874",
                      GuestEmail: "abc@gmail.com"
                  },
                  {
                      RoomAllocationID: "BKID20221026AA00005",
                      CheckInDate: "2022-12-05T15:39:56.72",
                      CheckOutDate: "2022-12-08T15:39:56.72",
                      RoomID: "RDT004",
                      FloorID: null,
                      FloorNo: null,
                      FloorDesc: null,
                      RoomNo: null,
                      Description: null,
                      GuestName: "Suleman",
                      GuestMobileNumber: "9874569874",
                      GuestEmail: "abc@gmail.com"
                  },
                  {
                      RoomAllocationID: "BKID20221025AA00002",
                      CheckInDate: "2022-11-25T15:39:56.72",
                      CheckOutDate: "2022-11-26T15:39:56.72",
                      RoomID: "RDT001",
                      FloorID: "FMS001",
                      FloorNo: 0,
                      FloorDesc: "Ground Floor",
                      RoomNo: "01",
                      Description: "Single Bed Room",
                      GuestName: "Suleman",
                      GuestMobileNumber: "9874569874",
                      GuestEmail: "abc@gmail.com"
                  }
              ]
              console.log("Static Roomchart data- ", roomChartData)

          }

          // Remove Test Data
          setData(roomChartData)
        
        } catch (error) {
          console.log("Bookings Error=====", error.message)
        }
      if (data === []) {
        setRefresh(true)
      }
    }
    populateRoomChartData()
    
  }, [selected_date])
  console.log(data)
  console.log(roomData)
  // const roomDetails = [
  //   {
  //     roomId: "RD001",
  //     roomName: 'Single Room'
  //   },
  //   {
  //     roomId: 'RTD002',
  //     roomName: 'Deluxe Room'
  //   }
  // ]

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Room Chart</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col className='d-flex flex-row'>
              <Button color='primary' onClick={() => navigate(`/reservation`)}>
                Make a reservation
              </Button>
              <div md={4} className='ms-1 flatpickr'>
                <Flatpickr
                  id='hf-picker'
                  className='form-control'
                  placeholder='Select Date'
                  options={{
                    altInput: true,
                    altFormat: 'd-m-y',
                    dateFormat: 'd-m-y'
                  }}
                  value={selected_date}
                  onChange={date => {
                    console.log(date)
                    setSelected_date(date[0])
                  }}
                />
              </div>
            </Col>
          </Row>
          <Row className='my-1'>
            <Col>
              <Table className='t_height' bordered responsive>
                <thead>
                  <tr>
                    <th className='text-nowrap'>Room & Dates</th>
                    {
                      datesArr.map((date, index) => {
                        return (
                          <th key={`${date}_${index}`} className='text-center'><span>{moment(date).format("ddd")}</span> <span className='text-nowrap'>{moment(date).format("D MMM YY")}</span></th>
                        )
                      })
                    }
                  </tr>
                </thead>
                <tbody>
                  {roomData?.map((curElm, index) => {
                    return (
                      <>
                        <RoomData key={`room_element_${index}`} roomName={curElm.RoomType} roomId={curElm.RoomID} datesArr={datesArr} data={data?.filter(elem => elem.RoomID === curElm.RoomID)} handleOpen={handleOpen} setOpenRoomAllocationID={setOpenRoomAllocationID} index={index} />
                        {/* <tr> 
                          <th>{curElm.roomName}</th>
                        </tr>
                        <tr>
                          <th><FaUserTie /> × 1</th>
                          {
                            datesArr.map((date, index) => {
                              if (moment(date).format('l') === '11/9/2022') {
                                return (
                                  <td key={index}>
                                    <Alert style={{ cursor: 'pointer' }} color='success' onClick={handleOpen}>
                                      <h6 className='alert-heading'>Guest Name</h6>
                                    </Alert>
                                  </td>
                                )
                              } else {
                                return (
                                  <td key={index}></td>
                                )
                              }
                            })
                          }
                        </tr> */}
                      </>
                    )
                  })}
                  {/* <tr>
                    <th>Executive Suite Room</th>
                  </tr>
                  <tr>
                    <th><FaUserTie /> × 1</th>
                    {
                      datesArr.map((date, index) => {
                        if (moment(date).format('l') === '11/9/2022') {
                          return (
                            <td key={index}>
                              <Alert style={{ cursor: 'pointer' }} color='success' onClick={handleOpen}>
                                <h6 className='alert-heading'>Guest Name</h6>
                              </Alert>
                            </td>
                          )
                        } else {
                          return (
                            <td key={index}></td>
                          )
                        }
                      })
                    }
                  </tr>
                  <tr>
                    <th>Deluxe Room</th>
                  </tr>
                  <tr>
                    <th><FaUserTie /> × 1</th>
                    {
                      datesArr.map((date, index) => {
                        if (moment(date).format('l') === '11/12/2022') {
                          return (
                            <td key={index}>
                              <Alert style={{ cursor: 'pointer' }} color='success' onClick={handleOpen}>
                                <h6 className='alert-heading'>Guest Name</h6>
                              </Alert>
                            </td>
                          )
                        } else {
                          return (
                            <td key={index}></td>
                          )
                        }
                      })
                    }
                  </tr>
                  <tr>
                    <th>Superior Room</th>
                  </tr>
                  <tr>
                    <th><FaUserTie /> × 1</th>
                    {
                      datesArr.map((date, index) => {
                        if (moment(date).format('l') === '11/13/2022') {
                          return (
                            <td key={index}>
                              <Alert style={{ cursor: 'pointer' }} color='success' onClick={handleOpen}>
                                <h6 className='alert-heading'>Guest Name</h6>
                              </Alert>
                            </td>
                          )
                        } else {
                          return (
                            <td key={index}></td>
                          )
                        }
                      })
                    }
                  </tr>
                  <tr>
                    <th>Normal Room</th>
                  </tr>
                  <tr>
                    <th><FaUserTie /> × 1</th>
                    {
                      datesArr.map((date, index) => {
                        if (moment(date).format('l') === '11/15/2022') {
                          return (
                            <td key={index}>
                              <Alert style={{ cursor: 'pointer' }} color='success' onClick={handleOpen}>
                                <h6 className='alert-heading'>Guest Name</h6>
                              </Alert>
                            </td>
                          )
                        } else {
                          return (
                            <td key={index}></td>
                          )
                        }
                      })
                    }
                  </tr> */}
                </tbody>
              </Table>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <BookingModal open={open} handleOpen={handleOpen} roomData={openRoom} />
    </>
  )
}

export default RoomNumber