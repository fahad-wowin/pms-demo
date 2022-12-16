import React, { useState } from 'react'
import {
    Card, CardTitle, CardText, CardBody, CardSubtitle, CardHeader, Row, Col, Label, Input, UncontrolledDropdown, DropdownToggle, DropdownMenu,
    DropdownItem, Modal, ModalHeader, ModalBody,
    Button, Form, Alert, Accordion, AccordionBody, AccordionHeader, AccordionItem
} from 'reactstrap'
import Flatpickr from 'react-flatpickr'
import axios from '../../../API/axios'
import moment from 'moment'
import RateItem from './RateItem'
import toast from 'react-hot-toast'

function Rate({RoomTypeList, ReloadRateInventoryList}) {
    const [show, setShow] = useState(false)
    const [cardType, setCardType] = useState('')
    const [fromDate, setFromDate] = useState(new Date())
    const [toDate, setToDate] = useState(new Date())
    const [monday, setMonday] = useState(true)
    const [tuesday, setTuesday] = useState(true)
    const [wednesday, setWednesday] = useState(true)
    const [thursday, setThursday] = useState(true)
    const [friday, setFriday] = useState(true)
    const [saturday, setSaturday] = useState(true)
    const [sunday, setSunday] = useState(true)
    const [open, setOpen] = useState('')

    const toggle = id => {
        open === id ? setOpen() : setOpen(id)
    }
    const userId = localStorage.getItem('user-id')

    const [updateRateArray] = useState(
        RoomTypeList?.map((roomType) => {
            return { roomid: roomType.RoomID, rate: roomType.RoomRate, child: roomType.ExtraChildPrice, adult: roomType.ExtraAdultPrice }
          })
    )
    
    const rateInventoryInsert = () => {
        try {
            const rateInserArray = []
            let arrayIndex = 0
            const firstDate = moment(fromDate).format("y-MM-DD HH:mm:ss")
            const lastDate = moment(toDate).format("y-MM-DD HH:mm:ss")

            const days = moment(lastDate).diff(moment(firstDate), 'days') + 1
            
            console.log('days > ', days)

            if (days <= 0 || (!monday && !tuesday && !wednesday && !thursday && !friday && !saturday && !sunday)) {
                toast.error('Select a valid date range and days', { position: "top-center" })
                
                return
            }

            for (let index = 0; index < days; index++) {
                
                const theDate = moment(firstDate).add(index, 'days')
                const theDay = moment(theDate).format('ddd').toLocaleLowerCase()

                console.log('day > ', theDay)

                if (theDay === 'mon' && !monday) continue
                if (theDay === 'tue' && !tuesday) continue
                if (theDay === 'wed' && !wednesday) continue
                if (theDay === 'thu' && !thursday) continue
                if (theDay === 'fri' && !friday) continue
                if (theDay === 'sat' && !saturday) continue
                if (theDay === 'sun' && !sunday) continue

                
                RoomTypeList.map(curElm => {

                    const rateItem = updateRateArray.filter(rateItem => rateItem.roomid === curElm.RoomID)[0]
                    const totalTax = +rateItem.rate * +curElm.IGST_P / 100
                    const totalAmount = +totalTax + +rateItem.rate

                    rateInserArray[arrayIndex] = {
                        RoomID: curElm.RoomID,
                        RoomTypeID: curElm.RoomTypeID,
                        ExtraAdultPrice: parseInt(rateItem.adult),
                        ExtraChildPrice: parseInt(rateItem.child),
                        ExtraBedCharges: curElm.ExtraBedCharges ?? 0,
                        PriceValidOnDate: moment(theDate).format('y-MM-DDT00:00:00'),
                        StatusID: curElm.StatusID,
                        RoomRate: parseInt(rateItem.rate),
                        CGST_P: curElm.CGST_P,
                        SGST_P: curElm.SGST_P,
                        IGST_P: curElm.IGST_P,
                        TotalTax: parseFloat(Number(totalTax).toFixed(2)),
                        TotalAmount: parseFloat(Number(totalAmount).toFixed(2))
                    }
                    arrayIndex++
                })                
            }
            console.log(arrayIndex, " :Iinsert Items > ", rateInserArray)
            if (rateInserArray.length === 0) {
                toast.error('Nothing to add, select a valid date range and days', { position: "top-center" })
                
                return
            }
            const rateInventoryInsertBody = {
                LoginID: userId,
                Token: "123",
                Seckey: "abc",
                rateandinventory: rateInserArray
            }
            console.log("rateInventoryInsertBody", JSON.stringify(rateInventoryInsertBody))
            console.log("rateInventoryInsertBody", rateInventoryInsertBody)
            axios.post(`/setdata/rateinventory`, rateInventoryInsertBody)
                .then((res) => {
                    console.log("rate inventory update response", res?.data[0])
                })
            
            ReloadRateInventoryList()
            setShow(false)
        } catch (error) {
            console.log("Rate Inventory Insert Error", error.message)
        }
    }

    return (
        <>
            <Card color='success' inverse onClick={() => setShow(!show)}>
                <CardHeader className='rate_inventry_card_header'>
                    Rate
                </CardHeader>
            </Card>
            <Modal
                isOpen={show}
                toggle={() => {
                    setShow(!show)
                }}
                className='modal-dialog-centered'
                onClosed={() => setCardType('')}
                size='lg'
                backdrop={false}
            >
                <ModalHeader className='bg-transparent border-bottom' toggle={() => {
                    setShow(!show)
                }}>
                    <span>Bulk Update Rates</span>
                </ModalHeader>
                <ModalBody className='rate_inventry'>
                    {cardType !== '' && cardType !== 'unknown' ? (
                        <InputGroupText className='p-25'>
                            <span className='add-card-type'>
                                <img height='24' alt='card-type' src={cardsObj[cardType]} />
                            </span>
                        </InputGroupText>
                    ) : null}
                    <Row>
                        <Col lg='6' md='6' className='mb-1'>
                            <Label className='form-label' for='hf-picker'>
                                From Date :
                            </Label>
                            <Flatpickr
                                value={fromDate}
                                id='hf-picker'
                                className='form-control'
                                onChange={date => { setFromDate(date[0]) }}
                                options={{
                                    altInput: true,
                                    altFormat: 'F j, Y',
                                    dateFormat: 'd-m-Y'
                                }}
                            />
                        </Col>
                        <Col lg='6' md='6' className='mb-1'>
                            <Label className='form-label' for='hf-picker1'>
                                To Date :
                            </Label>
                            
                            <Flatpickr
                                value={toDate}
                                id='hf-picker1'
                                className='form-control'
                                onChange={date => {
                                console.log(date)
                                setToDate(date[0])
                                }}
                                options={{
                                altInput: true,
                                altFormat: 'F j, Y',
                                dateFormat: 'd-m-Y'
                                }}
                            />
                        </Col>
                        <Col lg='12' md='12' className='mb-1'>
                        <div className='form-check form-check-inline'>
                                <Input type='checkbox' id='basic-cb-unchecked' onChange={() => setMonday(!monday)} value='monday' checked={monday === true} />
                                <Label for='basic-cb-unchecked' className='form-check-label'>
                                    Mon
                                </Label>
                            </div>
                            <div className='form-check form-check-inline'>
                                <Input type='checkbox' id='basic-cb-unchecked1' onChange={() => setTuesday(!tuesday)} checked={tuesday === true} value='tue' />
                                <Label for='basic-cb-unchecked1' className='form-check-label'>
                                    Tue
                                </Label>
                            </div>
                            <div className='form-check form-check-inline'>
                                <Input type='checkbox' id='basic-cb-unchecked2' onChange={() => setWednesday(!wednesday)} checked={wednesday === true} value='wed' />
                                <Label for='basic-cb-unchecked2' className='form-check-label'>
                                    Wed
                                </Label>
                            </div>
                            <div className='form-check form-check-inline'>
                                <Input type='checkbox' id='basic-cb-unchecked3' onChange={() => setThursday(!thursday)} checked={thursday === true} value='thu' />
                                <Label for='basic-cb-unchecked3' className='form-check-label'>
                                    Thu
                                </Label>
                            </div>
                            <div className='form-check form-check-inline'>
                                <Input type='checkbox' id='basic-cb-unchecked4' onChange={() => setFriday(!friday)} checked={friday === true} value='fri' />
                                <Label for='basic-cb-unchecked4' className='form-check-label'>
                                    Fri
                                </Label>
                            </div>
                            <div className='form-check form-check-inline'>
                                <Input type='checkbox' id='basic-cb-unchecked5' onChange={() => setSaturday(!saturday)} checked={saturday === true} value='sat' />
                                <Label for='basic-cb-unchecked5' className='form-check-label'>
                                    Sat
                                </Label>
                            </div>
                            <div className='form-check form-check-inline'>
                                <Input type='checkbox' id='basic-cb-unchecked6' onChange={() => setSunday(!sunday)} checked={sunday === true} value='sun' />
                                <Label for='basic-cb-unchecked6' className='form-check-label'>
                                    Sun
                                </Label>
                            </div>
                        </Col>
                    </Row>
                    <Accordion className='accordion-margin' open={open} toggle={toggle}>
                        {
                            RoomTypeList?.map((curElm, index) => {
                                
                                //updateRateArray[index] = {}
                                const theKey = `${curElm.RoomID}__${index}`
                                //console.log('element - ', curElm)
                                return (
                                    <RateItem index={index} rateItem={updateRateArray[index]} defaultItem={curElm} theKey={theKey} key={theKey} displayName={curElm.RoomDisplayName}/>
                                )
                            })
                        }
                        {/* <AccordionItem>
                            <AccordionHeader targetId='12'>Executive Room( EP )</AccordionHeader>
                            <AccordionBody accordionId='12'>
                            <Row>
                                <Col md='4' className='my-50'>
                                <span>Set Rate</span>
                                    <Input type='number' />
                                </Col>
                                <Col md='4' className='my-50'>
                                <span>Extra Adult Rate</span>
                                    <Input type='number' />
                                </Col>
                                <Col md='4' className='my-50'>
                                <span>Extra Child Rate</span>
                                    <Input type='number' />
                                </Col>
                                </Row>
                            </AccordionBody>
                        </AccordionItem> */}
                    </Accordion>
                    <div className='text-end mt-1'>
                        <Button className='me-1' color='primary' type='submit' onClick={() => {
                            rateInventoryInsert()
                        }}>
                            Save
                        </Button>
                        <Button className='me-1' color='danger' type='submit' onClick={(e) => {
                            e.preventDefault()
                            setShow(!show)
                        }}>
                            Close
                        </Button>
                    </div>
                </ModalBody>

            </Modal>
            {
                show ? (
                    <div className="modal-backdrop fade show" ></div>
                ) : null
            }
        </>
    )
}

export default Rate