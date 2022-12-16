import { useEffect, useState } from 'react'
// ** Reactstrap Imports
import { Row, Col, Form, Label, Button, Spinner, Input } from 'reactstrap'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { toast } from 'react-hot-toast'
import axios from '../../API/axios'

// ** Third Party Components
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Utils
import { selectThemeColors } from '@utils'
import { ArrowLeft, ArrowRight } from 'react-feather'
import RegisterGuest from './RegisterGuest'

// ** Store & Actions
import { store } from '@store/store'
import {
    setGuest,
    setBookingSourceStore,
    setSourceTypeStore,
    setPaymentTypeDropdownStore,
    setPaymentModeDropdownStore,
    setCustomerIdStore,
    setLoaderStore,
    setBookingSourceDropdownStore,
    setGuestDetailDropdownStore
} from '@store/booking'

import { useSelector } from 'react-redux'

const defaultValues = {
    bookingSource: '',
    sourceType: '',
    guestDetails: '',
    specialNote: ''
}


const guestOptions = []

const GuestDetails = ({ stepper }) => {

    const GuestDetails = useSelector(state => state.booking.guest_created)
    const booking = useSelector(state => state.booking)
    const bookingSourceDropDown = booking.bookingSourceDropdown_store
    const guestDetailDropDown = booking.guestDetailDropdown_store
    const drop_downLoader = booking.loader_store

    console.log(guestDetailDropDown)
    console.log(bookingSourceDropDown)
    const [loader, setLoader] = useState(false)

    //** For New User Registeration
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(!open)
    const [sourceType, setSourceType] = useState([])
    const [bookingSourceId, setBookingSourceId] = useState('')
    const [selGuestDetail, setSelGuestDetail] = useState('')
    const [note, setNote] = useState('')
    const [display, setDisplay] = useState(false)

    const [dropdownLoader, setDropdownLoader] = useState(false)

    const userId = localStorage.getItem('user-id')

    // source type dropdown option api
    const handleSourceType = (value) => {
        if (value === 'reload') {
            console.log('need to ', value)
            setDropdownLoader(true)
            try {
                const bookinSourceBody = { LoginID: localStorage.getItem('user-id'), Token: "123", Seckey: "abc", Event: "select" }
                axios.post(`/getdata/bookingdata/bookingsource`, bookinSourceBody).then(response => {
                    store.dispatch(setBookingSourceDropdownStore(response?.data[0]))
                    setDropdownLoader(false)
                    store.dispatch(setLoaderStore(dropdownLoader))
                })
            } catch (error) {
                setDropdownLoader(false)
                store.dispatch(setLoaderStore(dropdownLoader))
                console.log("Booking Source", error.message)
            }
        return
        }
        setBookingSourceId(value)
        try {
            const sourceTypeBody = {
                LoginID: userId,
                Token: "123",
                Seckey: "abc",
                BookingSourceID: value,
                Event: "select"
            }
            axios.post('/getdata/bookingdata/sourcetype', sourceTypeBody)
                .then(response => {
                    if (response?.data[0]) {
                    setSourceType(response?.data[0])
                    } else {
                        setSourceType([{ value: 'reload', label: 'Please reload' }])
                    }
                })
        } catch (error) {
            console.log("State Error", error.message)
        }
        store.dispatch(setBookingSourceStore(value))
    }
    const sourceTypesError = [{ label: 'Please Select Booking Source' }]

    const sourceTypes = sourceType?.map(function (sourceType) {
        return { value: sourceType?.SourceTypeID, label: sourceType?.SourceType }
    })

    useEffect(() => {
        if (GuestDetails) {
            GuestDetails.map(g => {
                guestOptions.push({ value: g, label: `${g.name}` })
            })
        }
    }, [open])

    const guestDetailOptions = guestDetailDropDown?.length > 0 && guestDetailDropDown[0].GuestName ? guestDetailDropDown?.map(function (guest) {
        return { value: guest?.GuestID, label: `${guest.GuestName} : ${guest.GuestEmail} : ${guest.GuestMobileNumber}` }
    }) : [{ value: 'reload', label: 'Error loading, click to reload again' }]

    // TODO - reload indivividual dropdowns // Fahad
    const bookingSourceOptions =  bookingSourceDropDown?.length > 0 && bookingSourceDropDown[0].BookingSource ? bookingSourceDropDown?.map(function (book) {
        return { value: book.BookingSourceID, label: book.BookingSource }
    }) : [{ value: 'reload', label: 'Error loading, click to reload again' }]

    // booking Source 
    const DetailsSchema = yup.object().shape({
        bookingSource: yup.string().required(),
        sourceType: yup.string().required(),
        guestDetails: yup.object().required(),
        specialNote: yup.string()
    })

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm({
        defaultValues,
        resolver: yupResolver(DetailsSchema)
    })

    const details = watch("guestDetails")

    const paymentTypeData = () => {
        setDropdownLoader(true)
        try {
            const paymentTypeBody = { LoginID: userId, Token: "123", Seckey: "abc", Event: "select" }
            axios.post(`/getdata/bookingdata/paymenttype`, paymentTypeBody)
                .then(response => {
                    store.dispatch(setPaymentTypeDropdownStore(response?.data[0]))
                    setDropdownLoader(false)
                    store.dispatch(setLoaderStore(dropdownLoader))
                })
        } catch (error) {
            setDropdownLoader(false)
            store.dispatch(setLoaderStore(dropdownLoader))
            console.log("Payment Type Error", error.message)
        }
    }

    const paymentModeData = () => {
        setDropdownLoader(true)
        try {
            const paymentModeBody = { LoginID: userId, Token: "123", Seckey: "abc", PaymentTypeID: "PTI001", Event: "select" }
            axios.post(`/getdata/bookingdata/paymentmode`, paymentModeBody)
                .then(paymentModeResponse => {
                    store.dispatch(setPaymentModeDropdownStore(paymentModeResponse?.data[0]))
                    setDropdownLoader(false)
                    store.dispatch(setLoaderStore(dropdownLoader))
                })
        } catch (error) {
            setDropdownLoader(false)
            store.dispatch(setLoaderStore(dropdownLoader))
            console.log("Payment Mode Error", error.message)
        }
    }

    const onSubmit = () => {
        setDisplay(true)
        setLoader(true)
        // if (isObjEmpty(errors)) {
        if (sourceType, bookingSourceId, selGuestDetail) {
            console.log('A ok')
            store.dispatch(setGuest(details))
            stepper.next()
            setLoader(false)
            paymentTypeData()
            paymentModeData()
        } else {
            toast.error('Something went wrong')
            setLoader(false)
        }
    }

    const handleGuestDetail = async (value) => {
        if (value === 'reload') {
            console.log('need to ', value)
            setDropdownLoader(true)
            
            try {
                const guestDetailBody = { LoginID: localStorage.getItem('user-id'), Token: "123", Seckey: "abc", SearchPhrase: "abc", Event: "select" }
                const guestResponse = await axios.post(`/getdata/bookingdata/guestdetails`, guestDetailBody)
                console.log("Guest data - OK > ", guestResponse?.ok)

                store.dispatch(setGuestDetailDropdownStore(guestResponse?.data[0]))
                console.log("Guest data - ", guestResponse?.data[0])
                setDropdownLoader(false)
                store.dispatch(setLoaderStore(dropdownLoader))
            } catch (error) {
                setDropdownLoader(false)
                store.dispatch(setLoaderStore(dropdownLoader))
                console.log("Guest Detail Error", error.message)
            }
            return
        }
        setSelGuestDetail(value)
        store.dispatch(setCustomerIdStore(value))
    }

    return (
        !drop_downLoader ? (
            <>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row className='d-flex flex-column'>
                        <Col className='d-flex flex-md-row flex-column justify-content-around align-items-center '>
                            <div className='me-md-1 me-0 my-1  w-100'>
                                <Label>
                                    Booking Source
                                </Label>
                                <Select
                                    //id= 'bookingSource'
                                    placeholder=''
                                    menuPlacement='auto'
                                    theme={selectThemeColors}
                                    className='react-select'
                                    classNamePrefix='select'
                                    options={bookingSourceOptions}
                                    value={bookingSourceOptions?.filter(c => c.value === bookingSourceId)}
                                    onChange={val => {
                                        handleSourceType(val.value)
                                    }}
                                    invalid={display && bookingSourceId === ''}
                                />
                                {
                                    display && !bookingSourceId ? <Label className='text-danger'>select Booking Source !</Label> : null
                                }
                            </div>
                            <div className='ms-md-1 ms-0 w-100'>
                                <Label className='form-label' for='sourceType'>
                                    Source Type
                                </Label>
                                <Controller
                                    defaultValue=''
                                    id='sourceType'
                                    name='sourceType'
                                    control={control}
                                    render={
                                        ({ field: { onChange, value, ref } }) => <Select
                                            placeholder=''
                                            menuPlacement='auto'
                                            theme={selectThemeColors}
                                            className='react-select'
                                            classNamePrefix='select'
                                            options={bookingSourceId ? sourceTypes : sourceTypesError}
                                            inputRef={ref}
                                            value={sourceTypes?.filter(c => value.includes(c.value))}
                                            onChange={val => {
                                                onChange(val.value)
                                                store.dispatch(setSourceTypeStore(val.value))
                                            }}
                                            invalid={errors.sourceType && true}
                                        />
                                    }
                                />
                                {
                                    errors.sourceType ? <Label className='text-danger'>{errors.sourceType.message}!</Label> : null
                                }
                            </div>
                        </Col>
                        <Col className='my-1'>
                            <Label className='form-label' for='guestDetails'>
                                Guest Details (Search With Name, Email, Mobile)
                            </Label>
                            <CreatableSelect
                                placeholder=''
                                menuPlacement='auto'
                                theme={selectThemeColors}
                                className='react-select'
                                classNamePrefix='select'
                                options={guestDetailOptions}
                                formatCreateLabel={userInput => `Create new Guest '${userInput}'`}
                                value={guestDetailOptions?.filter(c => c.value === selGuestDetail)}
                                onChange={val => {
                                    handleGuestDetail(val.value)
                                }}
                                invalid={display && selGuestDetail === ''}
                                onCreateOption={handleOpen}
                            />
                            {
                                display && !selGuestDetail ? <Label className='text-danger'>select guest details !</Label> : null
                            }
                        </Col>
                        <Col className='my-1'>
                            <Label className='form-label' for='specialNote'>
                                Special Note
                            </Label>
                            <Input
                                type='textarea'
                                value={note}
                                onChange={e => setNote(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <div className='mt-1 d-flex justify-content-between'>
                        <Button color='secondary' className='btn-prev' outline onClick={() => stepper.previous()}>
                            <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
                            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
                        </Button>
                        <Button type='submit' color='primary' className='btn-next' onClick={onSubmit}>
                            <span className='align-middle d-sm-inline-block d-none'>
                                {
                                    loader ? (
                                        <Spinner color='#FFF' />
                                    ) : 'Book Rooms'
                                }
                            </span>
                            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
                        </Button>
                    </div>
                </Form>
                <RegisterGuest open={open} handleOpen={handleOpen} />
            </>
        ) : (
            <div style={{ height: '150px' }}>
                <Spinner color="primary" style={{ marginTop: '50px', marginLeft: '50%' }} />
            </div>
        )

    )
}

export default GuestDetails
