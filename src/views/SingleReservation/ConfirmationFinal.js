import React, { useState, useEffect } from 'react'
import { Button, Col, Form, FormFeedback, Input, Label, Row, Spinner } from 'reactstrap'
import Select from 'react-select'
import toast from 'react-hot-toast'

// ** Utils
import { selectThemeColors } from '@utils'
import { ArrowLeft, ArrowRight } from 'react-feather'

// ** Store & Actions
import { store } from '@store/store'
import { setPaymentTypeStore, setPaymentModeStore, setBookingCreatedByStore, setPaymentTypeDropdownStore, setLoaderStore, setPaymentModeDropdownStore } from '@store/booking'
import axios from '../../API/axios'
import { useSelector } from 'react-redux'
import BookingDetailPreview from './BookingDetailPreview'

const ConfirmationFinal = ({ stepper }) => {
    console.log('init confirm final')
    const bookingStore = useSelector(state => state.booking)
    const paymentTypeDropDown = bookingStore.paymentTypeDropdown_store
    const paymentModeDropDown = bookingStore.paymentModeDropdown_store
    const drop_downLoader = bookingStore.loader_store

    const [showBookingDetails, setShowBookingDetails] = useState(false)
    const handleFinalModal = () => setShowBookingDetails(!showBookingDetails)


    const [loader, setLoader] = useState(false)
    const [status, setStatus] = useState(true)

    const [pstatus, setPstatus] = useState("")
    const [ctype, setCtype] = useState("")
    const [amount, setAmount] = useState("")
    const [pref, setPref] = useState("")
    const [inote, setInote] = useState("")
    const [cgst, setCgst] = useState("")
    const [cname, setCname] = useState("")
    const [cadd, setCadd] = useState("")
    const [booker, setBooker] = useState("")
    const [newBooker, setNewBooker] = useState("")
    const [payFull, setPayFull] = useState("No")
    const [userDetails, setUserDetails] = useState([])
    const [userDetailsStatus, setUserDetailsStatus] = useState(false)
    const [bookingOption, setBookingOption] = useState('confirm')

    const [dropdownLoader, setDropdownLoader] = useState(false)

    const [bookingError, setBookingError] = useState('')

    const paymentTypeOptions = paymentTypeDropDown?.length > 0 && paymentTypeDropDown[0].PaymentType ? paymentTypeDropDown?.map(function (payment) {
        return { value: payment?.PaymentTypeID, label: payment?.PaymentType }
    }) : [{ value: 'reload', label: 'Error loading, click to reload again' }]

    const paymentModeOptions = paymentModeDropDown?.length > 0 && paymentModeDropDown[0].PaymentMode ? paymentModeDropDown?.map(function (paymentMode) {
        return { value: paymentMode?.PaymentModeID, label: paymentMode?.PaymentMode }
    }) : [{ value: 'reload', label: 'Error loading, click to reload again' }]

    const userDetailObject = [
        {
            UserID: "0",
            FirstName: "Others",
            Email: ""
        }
    ]

    const userId = localStorage.getItem('user-id')

    const userDetailsData = async () => {
        try {
            const userDetailsBody = { LoginID: userId, Token: "123", Seckey: "abc", Event: "select" }
            const response = await axios.post(`/getdata/userdata/userdetails`, userDetailsBody)
            const userDetailResponse = response.data[0]?.concat(userDetailObject)
            const userDetailsOption = userDetailResponse?.map(function (userDetail) {
                return { value: userDetail.UserID, label: `${userDetail.FirstName} : ${userDetail.Email}` }
            })
            setUserDetails(userDetailsOption)
            if (userDetails !== []) { setUserDetailsStatus(true) }
        } catch (error) {
            console.log("UserDetails Error", error.message)
        }
    }

    useEffect(() => {
        userDetailsData()
    }, [userDetailsStatus])

    const handleBooking = () => {
        try {
            setLoader(true)
            const bookingBody = {
                LoginID: userId,
                Token: "123",
                Seckey: "abc",
                bookingDetails: bookingStore.bookingDetail_store,
                transactionDetails: [
                    {
                        CheckInDate: bookingStore.CheckInDate,
                        CheckOutDate: bookingStore.CheckOutDate,
                        BookingSourceID: bookingStore.bookingSource_store,
                        SourceTypeID: bookingStore.sourceType_store,
                        isCompany: "0",
                        PaymentTypeID: bookingStore.paymentType_store,
                        PaymentModeID: bookingStore.paymentMode_store,
                        BookingCreatedBy_UserID: bookingStore.bookingCreatedBy_store,
                        isFullPaid: payFull === "Yes"
                    }
                ],
                paymentDetails: [
                    {
                        PaymentTypeID: bookingStore.paymentType_store,
                        PaymentModeID: bookingStore.paymentMode_store,
                        isFullPaid: payFull === "Yes",
                        RoomAmount: bookingStore.cost,
                        Discount: bookingStore.discount,
                        CGST: "9",
                        SGST: "9",
                        IGST: "18",
                        TotalTax: bookingStore.gst,
                        TotalAmount: bookingStore.total,
                        PendingAmount: bookingStore.total - amount,
                        RecievedAmount: amount,
                        CustID: bookingStore.customerId_store
                    }
                ]
            }
            setBookingError('')
            console.log('bookingBody', bookingBody)
            axios.post(`/setdata/bookingdetails`, bookingBody)
                .then(response => {
                    const responseData = response.data[0]
                    console.log("Booking Response", response)
                    console.log("Booking Response json", JSON.stringify(response))
                    console.log("Booking Response data", responseData[0])
                    console.log("Booking Response data json", JSON.stringify(responseData[0]))

                    if (responseData[0]?.Name === "Error") {
                        toast.error("Error while booking!!!", { position: 'top-center' })
                        // TODO - Error Booking
                        setBookingError(responseData[0].Result)

                    } else {
                        toast.success("Booked!!!", { position: 'top-center' })
                        //navigate('/reservation')
                        //store.dispatch(setBookingID(responseData.BookingID))
                    }
                    setLoader(false)

                })
        } catch (error) {
            console.log("Booking Error", error.message)
            toast.error("Something went WRONG!")
            setBookingError(error.message)

            setLoader(false)

        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        setLoader(true)
        if (pstatus && ctype && booker) {
            handleBooking()
            setLoader(false)
            setShowBookingDetails(true)
        }

    }

    // TODO - reload indivividual dropdowns // Fahad
    const handlePaymentType = async (value) => {
        if (value === 'reload') {
            console.log('need to ', value)
            setDropdownLoader(true)
            try {
                const paymentTypeBody = { LoginID: userId, Token: "123", Seckey: "abc", Event: "select" }
                axios.post(`/getdata/bookingdata/paymenttype`, paymentTypeBody)
                    .then(response => {
                        setDropdownLoader(false)
                        store.dispatch(setPaymentTypeDropdownStore(response?.data[0]))
                        console.log("paymnt type data - ", response?.data[0])
                        store.dispatch(setLoaderStore(dropdownLoader))
                    })
            } catch (error) {
                setDropdownLoader(false)
                store.dispatch(setLoaderStore(dropdownLoader))
                console.log("Payment Type Error", error.message)
            }
            return
        }
        setPstatus(value)
        store.dispatch(setPaymentTypeStore(value))
    }

    const handlePaymentMode = async (value) => {
        if (value === 'reload') {
            console.log('need to ', value)
            setDropdownLoader(true)
            try {
                const paymentModeBody = { LoginID: userId, Token: "123", Seckey: "abc", PaymentTypeID: "PTI001", Event: "select" }
                axios.post(`/getdata/bookingdata/paymentmode`, paymentModeBody)
                    .then(paymentModeResponse => {
                        setDropdownLoader(false)
                        store.dispatch(setPaymentModeDropdownStore(paymentModeResponse?.data[0]))
                        store.dispatch(setLoaderStore(dropdownLoader))
                    })
            } catch (error) {
                setDropdownLoader(false)
                store.dispatch(setLoaderStore(dropdownLoader))
                console.log("Payment Mode Error", error.message)
            }
        }
        setCtype(value)
        store.dispatch(setPaymentModeStore(value))
    }

    return (
        <>
            <Row className='d-flex flex-column'>
                <Col className='d-flex flex-row justify-content-center'>
                    <h4>Booking Status:</h4>
                    <div className='d-flex flex-row justify-content-around'>
                        <Col className='form-check mx-1 mb-1'>
                            <Input
                                type='radio'
                                id='confirm'
                                name='confirm'
                                checked={bookingOption === 'confirm'}
                                onChange={() => {
                                    setStatus(true)
                                    setBookingOption('confirm')
                                }}
                            />
                            <Label className='form-check-label' for='confirm'>Confirm</Label>
                        </Col>
                        <Col className='form-check mx-1 mb-1'>
                            <Input
                                type='radio'
                                id='hold'
                                name='hold'
                                checked={bookingOption === 'hold'}
                                onChange={() => {
                                    setStatus(false)
                                    setBookingOption('hold')
                                }}
                            />
                            <Label className='form-check-label' for='hold'>Hold</Label>
                        </Col>
                    </div>
                </Col>
                {
                    !drop_downLoader ? (
                        <>
                            {
                                status ? <Col>
                                    <Form onSubmit={e => onSubmit(e)}>
                                        <Row>
                                            <Col>
                                                <Label>
                                                    Payment Type
                                                </Label>
                                                <Col>
                                                    <Select
                                                        placeholder=''
                                                        menuPlacement='auto'
                                                        menuPortalTarget={document.body}
                                                        theme={selectThemeColors}
                                                        className='react-select'
                                                        classNamePrefix='select'
                                                        options={paymentTypeOptions}
                                                        value={paymentTypeOptions?.filter(c => c.value === pstatus)}
                                                        
                                                        onChange={val => {
                                                            handlePaymentType(val.value)
                                                        }}
                                                        invalid={pstatus === '' && loader}
                                                    />
                                                </Col>
                                                {pstatus === '' && loader && <Label className='text-danger'>Payment Status is required!</Label>}
                                            </Col>
                                            {
                                                pstatus !== 'company' && <Col>
                                                    <Label>
                                                        Payment Mode
                                                    </Label>
                                                    <Col>
                                                        <Select
                                                            placeholder=''
                                                            menuPlacement='auto'
                                                            menuPortalTarget={document.body}
                                                            theme={selectThemeColors}
                                                            className='react-select'
                                                            classNamePrefix='select'
                                                            options={paymentModeOptions}
                                                            value={paymentModeOptions?.filter(c => c.value === ctype)}
                                                            onChange={val => {
                                                                handlePaymentMode(val.value)
                                                                
                                                            }}
                                                            invalid={ctype === '' && loader}
                                                        />
                                                    </Col>
                                                    {ctype === '' && loader && <Label className='text-danger'>Collection Type is required!</Label>}
                                                </Col>
                                            }

                                            {
                                                pstatus !== 'hotel' && pstatus !== 'company' ? (
                                                    <>
                                                        <Col>
                                                            <Col className='mt-2'>
                                                                <div>
                                                                    <Input type='radio' name='payFull' id='fullAmount' value="Yes" checked={payFull === "Yes"} onChange={e => (setPayFull(e.target.value), setAmount(bookingStore.total))} />
                                                                    <Label className='Amount' for='fullAmount'>
                                                                        Full Amt
                                                                    </Label>
                                                                    <Input type='radio' className='ms-2' name='payFull' id='partialAmount' value="No" checked={payFull === "No"} onChange={e => (setPayFull(e.target.value), setAmount(bookingStore.total === amount ? 0 : amount))} />
                                                                    <Label className='Amount' for='partialAmount'>
                                                                        Partial Amt
                                                                    </Label>
                                                                </div>
                                                            </Col>
                                                            {payFull === '' && loader && <Label className='text-danger'>Payment Type is required!</Label>}
                                                        </Col>
                                                        <Col>
                                                            <Label>
                                                                Collected Amount
                                                            </Label>
                                                            <Col>
                                                                <Input
                                                                    type='text'
                                                                    onChange={e => setAmount(e.target.value)}
                                                                    value={amount}
                                                                    disabled={!payFull}
                                                                />
                                                            </Col>
                                                        </Col>
                                                    </>
                                                ) : pstatus === 'company' && pstatus !== 'hotel' ? (
                                                    <>
                                                        <Col>
                                                            <Label>
                                                                Company GST
                                                            </Label>
                                                            <Col>
                                                                <Input
                                                                    type='text'
                                                                    value={cgst}
                                                                    invalid={cgst === '' && loader}
                                                                    onChange={e => setCgst(e.target.value)}
                                                                />
                                                            </Col>
                                                            {cgst === '' && loader && <FormFeedback>Gst is required!</FormFeedback>}
                                                        </Col>
                                                        <Col>
                                                            <Label>
                                                                Company Name
                                                            </Label>
                                                            <Col>
                                                                <Input
                                                                    type='text'
                                                                    value={cname}
                                                                    invalid={cname === '' && loader}
                                                                    onChange={e => setCname(e.target.value)}
                                                                />
                                                            </Col>
                                                            {cname === '' && loader && <FormFeedback>Company Name is required!</FormFeedback>}
                                                        </Col>
                                                        <Col>
                                                            <Label>
                                                                Company Address
                                                            </Label>
                                                            <Col>
                                                                <Input
                                                                    type='text'
                                                                    value={cadd}
                                                                    invalid={cadd === '' && loader}
                                                                    onChange={e => setCadd(e.target.value)}
                                                                />
                                                            </Col>
                                                            {cadd === '' && loader && <FormFeedback>Company Address is required!</FormFeedback>}
                                                        </Col>
                                                    </>
                                                ) : null
                                            }

                                        </Row>
                                        <Row>
                                            <Col>
                                                <Label>
                                                    Payment Reference
                                                </Label>
                                                <Col>
                                                    <Input
                                                        type='textarea'
                                                        value={pref}
                                                        onChange={e => setPref(e.target.value)}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col>
                                                <Label>
                                                    Internal Note
                                                </Label>
                                                <Col>
                                                    <Input
                                                        type='textarea'
                                                        value={inote}
                                                        onChange={e => setInote(e.target.value)}
                                                    />
                                                </Col>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Label>
                                                    Booking Created By
                                                </Label>
                                                <Col>
                                                    <Select
                                                        placeholder=''
                                                        menuPlacement='auto'
                                                        menuPortalTarget={document.body}
                                                        theme={selectThemeColors}
                                                        className='react-select'
                                                        classNamePrefix='select'
                                                        options={userDetails}
                                                        value={userDetails?.filter(c => c.value === booker)}
                                                        onChange={val => {
                                                            setBooker(val.value)
                                                            store.dispatch(setBookingCreatedByStore(val.value))
                                                        }}
                                                        invalid={booker === '' && loader}
                                                    />
                                                </Col>
                                                {booker === '' && loader && <Label className='text-danger'>Booker is required!</Label>}
                                            </Col>
                                            <Col>
                                                <Label>
                                                    Created By
                                                </Label>
                                                <Col>
                                                    <Input
                                                        type='text'
                                                        disabled={booker !== '0'}
                                                        onChange={e => setNewBooker(e.target.value)}
                                                    />
                                                </Col>
                                                {newBooker === '' && loader && <FormFeedback>Created by cannot be blank!</FormFeedback>}
                                            </Col>
                                        </Row>
                                        <div className='mt-1 d-flex justify-content-between'>
                                            <Button color='secondary' className='btn-prev' outline onClick={() => stepper.previous()}>
                                                <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
                                                <span className='align-middle d-sm-inline-block d-none'>Previous</span>
                                            </Button>
                                            <Button type='submit' color='primary' className='btn-next' onClick={onSubmit}>
                                                <span className='align-middle d-sm-inline-block d-none'>
                                                    Create Booking
                                                </span>
                                                <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
                                            </Button>
                                        </div>
                                    </Form>
                                </Col> : <>
                                    <div className='text-center mt-2'>
                                        <Button color='primary' >Save On Hold</Button>
                                    </div>
                                </>
                            }
                        </>
                    ) : (
                        <div style={{ height: '150px' }}>
                            <Spinner color="primary" style={{ marginTop: '50px', marginLeft: '50%' }} />
                        </div>
                    )
                }

            </Row>
            {showBookingDetails ? <BookingDetailPreview BookingError={bookingError} handleFinalModal={handleFinalModal} showBookingDetails={showBookingDetails} /> : <></>}
        </>
    )
}

export default ConfirmationFinal