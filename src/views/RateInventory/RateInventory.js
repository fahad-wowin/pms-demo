import React, { useEffect, useState } from 'react'
import {
  Card, CardTitle, CardBody, CardHeader, Row, Col, Label, Table, Accordion, AccordionBody, AccordionHeader, AccordionItem, Input
} from 'reactstrap'
import Inventory from './Pages/Inventory'
import Rate from './Pages/Rate'
// import Restrictions from './Pages/Restriction'
import ScynOTA from './Pages/ScynOTA'
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import moment from "moment"
import TableDetails from './Pages/TableDetails'
import { FaUserTie } from 'react-icons/fa'
import './RateInventry.scss'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import axios from '../../API/axios'

const RateInventory = () => {
  const [RoomTypeID, setRoomType] = useState('')
  const [count, setCount] = useState([])
  const [open, setOpen] = useState(1)
  const [rateRefresh, setRateRefresh] = useState(false)
  const [typeRefresh, setTypeRefresh] = useState(false)
  const [selected_date, setSelected_date] = useState(new Date())

  const [roomTypeDropdown, setRoomTypeDropdown] = useState([])
  //   {
  //     RoomID: "RDT001",
  //     RoomTypeID: "RTD001",
  //     RoomViewID: "RVD001",
  //     BedTypeID: "BEDT20221008AA00001",
  //     ExtraBedTypeID: "EBD001",
  //     Amenities: "AC, Bathtub",
  //     Location: null,
  //     RoomRate: 1800.0,
  //     CGST_P: 6.0,
  //     SGST_P: 6.0,
  //     IGST_P: 12.0,
  //     TotalTax: 15000.0,
  //     TotalAmount: 16800.0,
  //     CreatedDate: "2022-10-08T14:30:51.823",
  //     UpdatedDate: "2022-11-30T16:22:12.183",
  //     StatusID: "SDT001",
  //     RoomDesc: "Single Room",
  //     RoomDisplayName: "Single Room",
  //     RoomSize: "10 sqmundefinedundefined",
  //     AdultBase: 1,
  //     AdultMax: 3,
  //     InfantMax: 1,
  //     ChildBase: 1,
  //     ChildMax: 1,
  //     GuestMax: 3,
  //     ExtraAdultPrice: 200.0,
  //     ExtraChildPrice: 100.0,
  //     RoomStatusID: "SDT007",
  //     CompanyID: "COM001",
  //     RoomType: "Single Room",
  //     RoomView: "City View",
  //     BedType: "Single",
  //     ExtraBedType: "Matress",
  //     Status: "Active"
  //   },
  //   {
  //     RoomID: "RDT004",
  //     RoomTypeID: "RTD004",
  //     RoomViewID: "RVD002",
  //     BedTypeID: "BEDT20221008AA00004",
  //     ExtraBedTypeID: "EBD001",
  //     Amenities: "AC, Bathtub",
  //     Location: null,
  //     RoomRate: 3000.0,
  //     CGST_P: 9.0,
  //     SGST_P: 9.0,
  //     IGST_P: 18.0,
  //     TotalTax: 540.0,
  //     TotalAmount: 3540.0,
  //     CreatedDate: "2022-10-08T14:30:51.823",
  //     UpdatedDate: "2022-10-08T14:30:51.823",
  //     StatusID: "SDT001",
  //     RoomDesc: "Executive Suite",
  //     RoomDisplayName: "Executive Suite",
  //     RoomSize: "30sqm",
  //     AdultBase: 2,
  //     AdultMax: 3,
  //     InfantMax: 1,
  //     ChildBase: 0,
  //     ChildMax: 1,
  //     GuestMax: 3,
  //     ExtraAdultPrice: 350.0,
  //     ExtraChildPrice: 250.0,
  //     RoomStatusID: "SDT001",
  //     CompanyID: "COM001",
  //     RoomType: "Executive Suite Room",
  //     RoomView: "Pool View1",
  //     BedType: "Queen Size",
  //     ExtraBedType: "Matress",
  //     Status: "Active"
  //   },
  //   {
  //     RoomID: "RDTI20221025AA00005",
  //     RoomTypeID: "RTD004",
  //     RoomViewID: "RVD002",
  //     BedTypeID: "BEDT20221008AA00008",
  //     ExtraBedTypeID: "EBD0202211140000002",
  //     Amenities: "AC, Bathtub",
  //     Location: null,
  //     RoomRate: 3000.0,
  //     CGST_P: 6.0,
  //     SGST_P: 6.0,
  //     IGST_P: 12.0,
  //     TotalTax: 25000.0,
  //     TotalAmount: 28000.0,
  //     CreatedDate: "2022-10-08T14:30:51.823",
  //     UpdatedDate: "2022-11-30T20:08:09.05",
  //     StatusID: "SDT001",
  //     RoomDesc: "Executive Suite Room",
  //     RoomDisplayName: "Deluxe",
  //     RoomSize: null,
  //     AdultBase: 2,
  //     AdultMax: 4,
  //     InfantMax: 1,
  //     ChildBase: 0,
  //     ChildMax: 2,
  //     GuestMax: 4,
  //     ExtraAdultPrice: 350.0,
  //     ExtraChildPrice: 250.0,
  //     RoomStatusID: "SDT007",
  //     CompanyID: "COM001",
  //     RoomType: "Executive Suite Room",
  //     RoomView: "Pool View1",
  //     BedType: "Triple-Double",
  //     ExtraBedType: "qwtest",
  //     Status: "Active"
  //   },
  //   {
  //     RoomID: "RDTI20221201AA00036",
  //     RoomTypeID: "RTD004",
  //     RoomViewID: "RVD002",
  //     BedTypeID: "BEDT20221008AA00004",
  //     ExtraBedTypeID: "EBD001",
  //     Amenities: "AC, Bathtub",
  //     Location: null,
  //     RoomRate: 3000.0,
  //     CGST_P: 9.0,
  //     SGST_P: 9.0,
  //     IGST_P: 18.0,
  //     TotalTax: 540.0,
  //     TotalAmount: 3540.0,
  //     CreatedDate: "2022-12-01T15:59:31",
  //     UpdatedDate: "2022-12-01T15:59:31",
  //     StatusID: "SDT001",
  //     RoomDesc: "Executive Suite Room",
  //     RoomDisplayName: "Executive Suite Room",
  //     RoomSize: "30sqm",
  //     AdultBase: 2,
  //     AdultMax: 2,
  //     InfantMax: 1,
  //     ChildBase: 1,
  //     ChildMax: 3,
  //     GuestMax: 4,
  //     ExtraAdultPrice: 350.0,
  //     ExtraChildPrice: 250.0,
  //     RoomStatusID: "SDT001",
  //     CompanyID: "COM001",
  //     RoomType: "Executive Suite Room",
  //     RoomView: "Pool View1",
  //     BedType: "Queen Size",
  //     ExtraBedType: "Matress",
  //     Status: "Active"
  //   }
  // ])
  const [rateInventory, setRateInventory] = useState([])
  //   {
  //     PriceID: "EXTC20221201AA00001",
  //     RoomID: "RDT001",
  //     RoomTypeID: "RTD004",
  //     ExtraAdultPrice: 200.0,
  //     ExtraChildPrice: 50.0,
  //     ExtraBedCharges: 10.0,
  //     PriceValidOnDate: "2022-12-12T00:52:17",
  //     CreatedDate: "2022-12-12T00:52:17.013",
  //     UpdatedDate: "2022-12-09T10:25:01.463",
  //     StatusID: "SDT001",
  //     RoomRate: 2800.0,
  //     CGST_P: 9.0,
  //     SGST_P: 9.0,
  //     IGST_P: 18.0,
  //     TotalTax: 504.0,
  //     TotalAmount: 3304.0,
  //     RoomDisplayName: "Deluxe",
  //     RoomType: "Executive Suite Room",
  //     Sold: 4,
  //     Vacant: 5
  //   },
  //   {
  //     PriceID: "EXTC20221207AA00002",
  //     RoomID: "RDTI20221025AA00005",
  //     RoomTypeID: "RTD004",
  //     ExtraAdultPrice: 300.0,
  //     ExtraChildPrice: 150.0,
  //     ExtraBedCharges: 200.0,
  //     PriceValidOnDate: "2022-12-14T00:52:17",
  //     CreatedDate: "2022-12-07T02:00:39.477",
  //     UpdatedDate: "2022-12-09T10:25:01.48",
  //     StatusID: "SDT001",
  //     RoomRate: 3800.0,
  //     CGST_P: 9.0,
  //     SGST_P: 9.0,
  //     IGST_P: 18.0,
  //     TotalTax: 684.0,
  //     TotalAmount: 4484.0,
  //     RoomDisplayName: "Deluxe",
  //     RoomType: "Executive Suite Room",
  //     Sold: 14,
  //     Vacant: 3
  //   }
  // ])

  const toggle = id => {
    open === id ? setOpen('') : setOpen(id)
  }
useEffect(() => {
  const localcount = []
  for (let i = 0; i < 15; i++) {
    console.log('for called, ', i)
    if (i === 0) {
      localcount.push(moment(selected_date).format("ddd D MMM YY"))
    } else {
      localcount.push(moment(selected_date).add(i, 'days').format("ddd D MMM YY"))
    }
  }
  setCount(localcount)
  console.log('count-', count)
}, [selected_date])
  

const userId = localStorage.getItem('user-id')
console.log('User Id = ', userId)
const [roomTypeOptions, setRoomTypeOptions] = useState([])

  const roomTypeDropdownBody = () => {
    setRoomTypeDropdown([])
    try {
      const roomTypeBody = {
        LoginID: userId,
        Token: "123",
        Seckey: "abc",
        Event: "select"
      }
      console.log('roomtypebody - ', roomTypeBody)
      axios.post('/getdata/bookingdata/roomdetails', roomTypeBody)
        .then(response => {
          const roomTypeData = response?.data[0]
          if (roomTypeData && roomTypeData?.length > 0 && roomTypeData[0]?.RoomID) {
            setRoomTypeDropdown(roomTypeData)
          console.log("Room Type api Response", response?.data[0])
          } else {
            console.log("room type hard coded response", roomTypeDropdown)
            console.log("room type wrong response", roomTypeData)
          }
          
        })
    } catch (error) {
      console.log("Room Type Dropdown Error", error.message)
    }
    if (roomTypeDropdown.length === 0) {
      setTypeRefresh(true)
      console.log('type...r..e..f..r..e..s..h..i..n..g')
    }
  }
  

  useEffect(() => {
    roomTypeDropdownBody()
    console.log('ddown - ', roomTypeDropdown)
  }, [typeRefresh])

  useEffect(() => {
    setRoomTypeOptions(roomTypeDropdown?.map((roomType) => {
      return { value: roomType.RoomID, label: roomType.RoomDisplayName }
    }))
    console.log('ddown ops - ', roomTypeOptions)
  }, [roomTypeDropdown])

  const rateInventoryList = () => {
    setRateInventory([])
    try {
      const rateInventoryBody = {
        LoginID: userId,
        Token: "123",
        Seckey: "abc",
        FromDate: moment(selected_date).format("y-MM-DD HH:mm:ss"),
        Todate: moment(selected_date).add(15, 'days').format("y-MM-DD HH:mm:ss")
      }
      console.log('rateInventoryBody - ', rateInventoryBody)

      axios.post('/getdata/rateinventory', rateInventoryBody)
        .then(response => {
          const rateInventoryData = response?.data[0]
          if (rateInventoryData && rateInventoryData?.length > 0 && rateInventoryData[0].PriceValidOnDate) {
            setRateInventory(rateInventoryData)
          console.log('Rate inventory api response > ', response?.data[0])
          } else {
            console.log("Hard Coded Rate Inventory response", rateInventory)
            console.log("wrong Rate Inventory response", rateInventoryData)
          }
        })
    } catch (error) {
      console.log("Rate Inventory Error", error.message)
    }
    if (rateInventory.length === 0) {
      setRateRefresh(true)
      console.log('r..e..f..r..e..s..h..i..n..g')
    }
  }

  useEffect(() => {
    rateInventoryList()
  }, [selected_date, rateRefresh])
  
  // const roomType = rateInventory ? rateInventory[0]?.RoomType : ''
  // const extraChildPrice = rateInventory ? rateInventory[0]?.ExtraChildPrice : ''
  // const roomId = rateInventory ? rateInventory[0]?.RoomID : ''
  // const roomTypeId = rateInventory ? rateInventory[0]?.RoomTypeID : ''
  // const extraBedCharges = rateInventory ? rateInventory[0]?.ExtraBedCharges : ''
  // const statusId = rateInventory ? rateInventory[0]?.StatusID : ''

  // const roomType = rateInventory[0]?.RoomType
  // // const extraChildPrice = rateInventory[0]?.ExtraChildPrice
  // const roomId = rateInventory[0]?.RoomID
  // const roomTypeId = rateInventory[0]?.RoomTypeID
  // const extraBedCharges = rateInventory[0]?.ExtraBedCharges
  // const statusId = rateInventory[0]?.StatusID

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Rate and Inventory</CardTitle>
        </CardHeader>
        <CardBody>
          <Row className='my-1'>
            <Col md='3' sm='4' >
              <Inventory />
            </Col>
            <Col md='3' sm='4' >
              <Rate RoomTypeList={roomTypeDropdown} ReloadRateInventoryList={rateInventoryList}/>
            </Col>
            <Col md='3' sm='4' >
              <ScynOTA />
            </Col>
          </Row>
          <Row>
            <Col md='4' xl='3' sm='4'>
              <Label className='fw-bold fs-5'>Select Room Type</Label>
              <Select
                theme={selectThemeColors}
                className='react-select'
                classNamePrefix='select Doc'
                // defaultValue={idProof[0]}
                options={roomTypeOptions}
                isClearable={false}
                value={roomTypeOptions?.filter(c => c.value === RoomTypeID)}
                onChange={(e) => setRoomType(e.value)}
              />
            </Col>
            <Col md='4' xl='3' sm='4' >
              <Label className='form-label' for='hf-picker'>
                Date :
              </Label>
              <Flatpickr
                value={selected_date}
                id='hf-picker'
                className='form-control'
                onChange={date => {
                  console.log(date)
                  setSelected_date(date[0])
                  rateInventoryList()
                }}
                options={{
                  altInput: true,
                  altFormat: 'F j, Y',
                  dateFormat: 'd-m-y'
                }}
              />
            </Col>
            {/* <Col md='3' xl='2' sm='4' >
              <Rate />
            </Col>
            <Col md='3' xl='2' sm='4' >
              <Restrictions />
            </Col> */}
          </Row>

        </CardBody>
      </Card>

      <div className='rate_inventry_main'>
        <Accordion className='accordion-margin' open={open} toggle={toggle}>
          {roomTypeDropdown?.map((curElm, index) => {
            return (
              <AccordionItem key={`accordian__${index}`}>
                <AccordionHeader targetId={`${index + 1}`}>
                  <div className='accordion-img'>
                    {curElm.RoomDisplayName}
                  </div>
                </AccordionHeader>
                <AccordionBody accordionId={`${index + 1}`}>
                  <Table bordered responsive>
                    <thead>
                      <tr>
                        <th className='text-nowrap text-center align-items-center'>Room Type</th>
                        { 
                          count.map(date => {
                          
                          return (
                            <th key={date} className='text-center'><span>{moment(date).format("ddd")}</span> <span className='text-nowrap'>{moment(date).format("D MMM YY")}</span></th>
                          )
                        })
                        }
                      </tr>
                      <tr className='text-center'>
                        <th>{curElm.RoomDisplayName}</th>
                        {
                          count.map(date => {
                            let rateInventorySold = ''
                            let rateInventoryVacant = ''
                            const invItem = rateInventory?.filter(item => (item.RoomID === curElm.RoomID) && item.PriceValidOnDate && (moment(item.PriceValidOnDate).format('l') === moment(date).format('l')))
                            if (invItem) {
                              //console.log('Item > ', invItem)
                            
                             rateInventorySold = invItem[0]?.Sold
                             rateInventoryVacant = invItem[0]?.Vacant
                            }
                            return (
                              <td key={date}>
                                <p className='m-0 text-success'>Sold {rateInventorySold}</p>
                                <span className='text-nowrap'>vacant {rateInventoryVacant}</span>
                              </td>
                            )
                          })
                        }
                        {/* {deluxeData.map((curElm) => {
                            return (
                              <th key={curElm} style={{ padding: '7px' }}>
                                <p className='m-0' style={{ color: 'green' }}>Sold {curElm.sold}</p>
                                <span>vacant {curElm.vacant}</span>
                              </th>
                            )
                          })} */}
                      </tr>
                    </thead>
                    <tbody>

                      {/* <tr className='text-center' style={{ padding: '7px' }}>
                        <th style={{ background: '#FFFFFf' }}><FaUserTie /> × {curElm.AdultBase}</th>
                        {
                          count.map(date => {
                            let rateObject = null
                            const rateResponse = rateInventory.filter(item => (curElm.RoomID === item.RoomID) && item.PriceValidOnDate && (moment(date).format('l') === moment(item.PriceValidOnDate).format('l')))
                            if (rateResponse.length > 0) {
                              console.log("rateResponse > ", rateResponse)
                              rateObject = rateResponse[0]
                            } else {
                              rateObject = curElm
                            }

                            // const adultBaseRate = noOfPerson[0]?.RoomRate
                            // const extraAdultRate = noOfPerson[0]?.ExtraAdultPrice
                            // const extraChildPrice = noOfPerson[0]?.ExtraChildPrice

                            return (
                              <td key={`rateResponse_${date}_${index}__`}>
                                {/* <TableDetails rate={adultBaseRate} roomtype={roomType} extraAdultRate={extraAdultRate} extraChildRate={extraChildPrice} roomID={roomId} roomTypeID={roomTypeId} dateSelected={date} extraBedCharges={extraBedCharges} statusId={statusId} /> }
                                <TableDetails key={`TableRateResponse_${date}_${index}__0`} rateObject={rateObject} roomDetails={curElm} adults={0} childs={0} dateSelected={date} />
                              </td>
                            )
                          })
                        }
                      </tr> */}
                      
                      { Array.from({ length: (+curElm.AdultMax - +curElm.AdultBase + 1) }, (value, key) => {
                          return (
                          <tr key={`${curElm.RoomID}_${key}`} className='text-center' style={{ padding: '7px' }}>
                            <th style={{ background: '#FFFFFf' }}><FaUserTie /> × {+curElm.AdultBase + key}</th>
                                  {
                                    count.map((date, dtindx) => {
                                      let rateObject = null
                                      //console.log(key, " === ", moment(date).format('l'))
                                      const invItem = rateInventory?.filter(item => (item.RoomID === curElm.RoomID) && item.PriceValidOnDate && (moment(item.PriceValidOnDate).format('l') === moment(date).format('l')))
                                      if (invItem.length > 0) {
                                        rateObject = invItem[0]
                                        //console.log(moment(date).format('l'), " > Rate inventory>", rateObject.RoomDisplayName, rateObject.RoomRate, 'ad- ', rateObject.ExtraAdultPrice, 'ch- ', rateObject.ExtraChildPrice, moment(rateObject.PriceValidOnDate).format('l'))

                                      } else {
                                        rateObject = curElm
                                        //console.log(moment(date).format('l'), " > Room details>", rateObject.RoomDisplayName, rateObject.RoomRate, 'ad- ', rateObject.ExtraAdultPrice, 'ch- ', rateObject.ExtraChildPrice, moment(rateObject.PriceValidOnDate).format('l'))
                                      }
                                      const rateRoomRate = rateObject?.RoomRate 
                                      const rateExtraAdultPrice = rateObject?.ExtraAdultPrice
                                      const rateExtraChildPrice = rateObject?.ExtraChildPrice
                                      const rateRoomID = rateObject?.RoomID
                                      const rateRoomTypeID = rateObject?.RoomTypeID
                                      const rateStatusID = rateObject?.StatusID
                                      const ratePriceID = rateObject?.PriceID
                                      const theKey = `rateResponse_${rateRoomID}__${index}__${key}__${dtindx}`
                                      return (
                                        <td key={theKey}>
                                          
                                          <TableDetails key={theKey}
                                                        refreshList={rateInventoryList}
                                                        tableKey={theKey}
                                                        rateRoomRate={rateRoomRate} 
                                                        rateExtraAdultPrice={rateExtraAdultPrice}
                                                        rateExtraChildPrice={rateExtraChildPrice} 
                                                        rateRoomID={rateRoomID} 
                                                        rateRoomTypeID={rateRoomTypeID} 
                                                        rateStatusID={rateStatusID}  
                                                        ratePriceID = {ratePriceID}
                                                        roomDetails={curElm} adults={key} childs={0} dateSelected={date} />
                                          {/* <TableDetails rateObject={adultBaseRate} roomtype={roomType} extraAdultRate={extraAdultRate} extraChildRate={extraChildPrice} roomID={roomId} roomTypeID={roomTypeId} dateSelected={date} extraBedCharges={extraBedCharges} statusId={statusId} /> */}
                                        </td>
                                      )
                                    })
                                  }                          
                          </tr>
                          )
                          }
                          )
                      
                      }
                      
                        
                    </tbody>
                  </Table>
                </AccordionBody>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>

    </>
  )
}

export default RateInventory