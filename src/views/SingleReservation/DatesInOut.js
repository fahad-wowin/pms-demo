import React, { useState, useRef } from 'react'
import { ArrowLeft, ArrowRight, Calendar, UserCheck, UserX } from 'react-feather'
import { Button, Col, Form, Label, Row } from 'reactstrap'
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'

// ** Third Party Components
import moment from 'moment'
// import toast from 'react-hot-toast'
import Flatpickr from 'react-flatpickr'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

// ** Store & Actions
import { store } from '@store/store'
import { setCheckInDate, setCheckOutDate, setRoomsAvailViewStore } from '@store/booking'
import { useSelector } from 'react-redux'
import axios from '../../API/axios'

const DatesInOut = ({ stepper }) => {

    const outDateRef = useRef(null)

    const bookingStore = useSelector(state => state.booking)

    const [inDate, setInDate] = useState('')
    const [outDate, setOutDate] = useState('')

    const [loader, setLoader] = useState(false)

    //const [nextDate, setNextDate] = useState('')

    const duration = outDate ? (moment(outDate).diff(moment(inDate), 'days')) : (moment(outDate).diff(moment(inDate), 'days'))

    const userId = localStorage.getItem('user-id')
    const roomData = () => {
        try {
            const bookingsBody = {
                LoginID: userId,
                Token: "123",
                Seckey: "abc",
                CheckInDate: moment(bookingStore.CheckInDate).format(),
                CheckOutDate: moment(bookingStore.CheckOutDate).format()
            }
            axios.post(`/getdata/bookingdata/roomavailability`, bookingsBody).then(response => {
                store.dispatch(setRoomsAvailViewStore(response?.data[0]))
            })

        } catch (error) {
            console.log("Bookings Error :", error.message)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoader(true)
        if (inDate !== '' && inDate !== undefined && outDate !== '' && outDate !== undefined) {
            roomData()
            store.dispatch(setCheckInDate(inDate))
            store.dispatch(setCheckOutDate(outDate))
            stepper.next()
        }
    }

    return (
        <>
            <Form onSubmit={e => handleSubmit(e)}>
                <Row className='mb-2'>
                    <Col>
                        <Label className='form-label' for='checkIn_date'>
                            Check-In Date:
                        </Label>
                        <Flatpickr
                            id='checkIn_date'
                            name='checkIn_date'
                            placeholder='Select Check-In Date'
                            options={{
                                altInput: true,
                                altFormat: 'd-m-y',
                                dateFormat: 'd-m-y'
                            }}
                            value={inDate}
                            onChange={date => {
                                setInDate(date[0])
                                //setNextDate(moment(date[0]).add(24, 'hours')._d)
                                //console.log(outDateRef)
                                outDateRef.current.flatpickr.open()
                            }}
                        />
                        {loader && (inDate === '' || inDate === undefined) && <p className='text-danger'>Check-In Date is required</p>}
                    </Col>
                    <Col>
                        <Label className='form-label' for='checkOut_date'>
                            Check-Out Date:
                        </Label>
                        <Flatpickr
                            id='checkOut_date'
                            name='checkOut_date'
                            ref={outDateRef}
                            placeholder='Select Check-Out Date'
                            options={{
                                altInput: true,
                                altFormat: 'd-m-y',
                                dateFormat: 'd-m-y',
                                minDate: new Date(inDate).fp_incr(1)
                                // defaultDate: `${moment(nextDate).format('DD-MM-YY')}`
                            }}
                            value={outDate}
                            onChange={date => {
                                setOutDate(date[0])
                                // nextDate()
                            }}
                        />
                        {loader && (outDate === '' || outDate === undefined) && <p className='text-danger'>Check-Out Date is required</p>}
                    </Col>
                </Row>
                {
                    duration > 0 ? (
                        <Col className='mt-2 d-flex flex-sm-row flex-column justify-content-center align-item-center'>
                            <Col className='mx-1 pt-1'>
                                <StatsHorizontal icon={<UserCheck size={21} />} color='success' stats={moment(inDate).format("DD/MM/YYYY")} statTitle='Check-In Date' />
                            </Col>
                            <Col className='mx-1 pt-1'>
                                <StatsHorizontal icon={<UserX size={21} />} color='warning' stats={moment(outDate).format("DD/MM/YYYY")} statTitle='Check-Out Date' />
                            </Col>
                            <Col className='mx-1 pt-1'>

                                <StatsHorizontal icon={<Calendar size={21} />} color='primary' stats={duration === 1 ? `${duration} Night` : `${duration} Nights`} statTitle='Duration of Booking' />

                            </Col>
                        </Col>
                    ) : null
                }
                <div className='mt-1 d-flex justify-content-between'>
                    <Button color='secondary' className='btn-prev ' outline disabled>
                        <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
                        <span className='align-middle d-sm-inline-block d-none'>Previous</span>
                    </Button>
                    <Button type='submit' color='primary' className='btn-next' onClick={handleSubmit} >Check Availability
                        <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
                    </Button>
                </div>
            </Form>
        </>
    )
}

export default DatesInOut