import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import Select from 'react-select'
import { toast } from 'react-hot-toast'

// ** Third Party Components
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { selectThemeColors } from '@utils'

import axios from '../../API/axios'

const defaultValues = {
    name: '',
    last_name: '',
    prefix: '',
    mobile_number: '',
    email: '',
    dob: '',
    address: '',
    pincode: '',
    country: '',
    state: '',
    city: ''
}

const RegisterGuest = ({ open, handleOpen }) => {

    const [stateList, setStateList] = useState([])
    const [countryList, setCountryList] = useState([])
    const [districtList, setDistrictList] = useState([])
    const [cityList, setCityList] = useState([])
    const [countryStatus, setCountryStatus] = useState(false)
    const [guestName, setGuestName] = useState('')
    const [guestLastName, setGuestLastName] = useState('')
    const [mobPrefix, setMobPrefix] = useState('')
    const [mobNumber, setMobNumber] = useState('')
    const [guestEmail, setGuestEmail] = useState('')
    const [guestDob, setGuestDob] = useState('')
    const [pinCode, setPinCode] = useState('')
    const [address, setAddress] = useState('')
    const [countryId, setCountryId] = useState('')
    const [stateId, setStateId] = useState('')
    const [districtId, setDistrictId] = useState('')
    const [cityId, setCityId] = useState('')
    const [display, setDisplay] = useState(false)

    const userId = localStorage.getItem('user-id')

    // COUNTRY API
    useEffect(() => {
        axios.post(`/getdata/regiondata/countrydetails`, { LoginID: userId, Token: "123", Seckey: "abc", Event: "select" })
            .then(countryDropDownResponse => {
                console.log('country . ', countryDropDownResponse?.data[0])
                setCountryList(countryDropDownResponse?.data[0])
                if (countryList !== []) { setCountryStatus(true) }
            })
    }, [countryStatus])

    const countryOptions = countryList?.map(function (country) {
        return { value: country.CountryID, label: country.CountryName }
    })

    // STATE API
    const stateDetailsList = (value) => {
        try {
            const stateDetailsBody = {
                LoginID: userId,
                Token: "123",
                Seckey: "abc",
                CountryID: value,
                Event: "select"
            }
            axios.post(`/getdata/regiondata/statedetails`, stateDetailsBody)
                .then(stateDropDownResponse => {
                    setStateList(stateDropDownResponse?.data[0])
                })
        } catch (error) {
            console.log("State Details Error", error.message)
        }
    }
    const stateOptions = stateList?.map(function (state) {
        return { value: state.StateID, label: state.StateName }
    })

    // DISTRICT API
    const districtDetailsList = (value) => {
        try {
            const districtDetailsBody = {
                LoginID: userId,
                Token: "123",
                Seckey: "abc",
                StateID: value,
                Event: "select"
            }
            axios.post(`/getdata/regiondata/districtdetails`, districtDetailsBody)
                .then(districtDropDownResponse => {
                    setDistrictList(districtDropDownResponse?.data[0])
                })
        } catch (error) {
            console.log("District Details Error", error.message)
        }
    }
    const districtOptions = districtList?.map(function (district) {
        return { value: district.DistrictID, label: district.DistrictName }
    })

    // CITY API
    const cityDetailsList = (value) => {
        try {
            const cityListBody = {
                LoginID: userId,
                Token: "123",
                Seckey: "abc",
                DistrictID: value,
                Event: "select"
            }
            axios.post(`/getdata/regiondata/citydetails`, cityListBody)
                .then(cityDropDownResponse => {
                    console.log("cityDropDownResponse", cityDropDownResponse?.data[0])
                    setCityList(cityDropDownResponse?.data[0])
                })
        } catch (error) {
            console.log("City Details Error", error.message)
        }
    }
    const cityOptions = cityList?.map(function (city) {
        return { value: city.CityID, label: city.CityName }
    })

    const GuestSchema = yup.object().shape({
        name: yup.string().required(),
        last_name: yup.string().required(),
        prefix: yup.number().min(2).required(),
        mobile_number: yup.number().min(10).required(),
        email: yup.string().email().required(),
        dob: yup.date().required(),
        pincode: yup.number().required(),
        address: yup.string().required(),
        country: yup.string().required(),
        state: yup.string().required(),
        city: yup.string().required()
    })

    const {
        handleSubmit,
        reset
        // formState: { errors }
    } = useForm({
        defaultValues,
        resolver: yupResolver(GuestSchema)
    })

    const handleReset = () => {
        reset({
            name: '',
            last_name: '',
            prefix: '',
            mobile_number: '',
            email: '',
            dob: '',
            address: '',
            pincode: '',
            country: '',
            state: '',
            city: ''
        })
        handleOpen()
    }

    const guestRegister = () => {
        try {
            const guestRegisterBody = {
                LoginID: userId,
                Token: "123",
                Seckey: "abc",
                Name: guestName,
                LastName: guestLastName,
                PrefixN: mobPrefix,
                MobileNumber: mobNumber,
                Type: "Normal User",
                Email: guestEmail,
                DOB: guestDob,
                Address: address,
                CityID: districtId,
                FloorID: null,
                SpecialNote: "Just Test"
            }
            axios.post(`/setdata/guestdetails`, guestRegisterBody)
                .then(() => {
                })
        } catch (error) {
            console.log("Guest Register Error", error.message)
        }
    }

    const onSubmit = () => {
        setDisplay(true)
        if (guestName.trim() && guestLastName.trim() && mobPrefix.trim() && mobNumber.trim() && guestEmail.trim() && guestDob && countryId && stateId && districtId && cityId && pinCode.trim() && address.trim() !== '') {
            guestRegister()
            handleOpen()
            setGuestName('')
            setGuestLastName('')
            setMobPrefix('')
            setMobNumber('')
            setGuestEmail('')
            setGuestDob('')
            setCountryId('')
            setStateId('')
            setDistrictId('')
            setCityId('')
            setPinCode('')
            setAddress('')
            setDisplay(false)
            toast.success('Guest registered succesfully')
        }
    }

    return (
        <>
            <Modal
                isOpen={open}
                toggle={handleOpen}
                className='moadal-dialog-centered modal-lg'
                backdrop={false}
            >
                <ModalHeader className='bg-transparent'>New Guest Details</ModalHeader>
                <Form onSubmit={handleSubmit(onSubmit)} onReset={handleReset}>
                    <ModalBody>
                        <Row className='d-flex flex-column justify-content-center align-items-center'>
                            <Col className='mt-1 d-flex flex-md-row flex-column'>
                                <Col md='4' sm='12' className='mx-1'>
                                    <Label className='form-label' for='name'>
                                        Guest Name
                                    </Label>
                                    <Input
                                        placeholder='Enter name here'
                                        id='name'
                                        type='text'
                                        value={guestName}
                                        onChange={e => setGuestName(e.target.value)}
                                        invalid={display && guestName.trim() === ''}
                                    />
                                    {display === true && !guestName.trim() ? <span className='error_msg_lbl'>Guest Name is required </span> : null}
                                </Col>
                                <Col className='mx-1'>
                                    <Label className='form-label' for='last_name'>
                                        Guest Last Name
                                    </Label>
                                    <Input
                                        placeholder='Enter last name here'
                                        type='text'
                                        id='last_name'
                                        value={guestLastName}
                                        onChange={e => setGuestLastName(e.target.value)}
                                        invalid={display && guestLastName.trim() === ''}
                                    />
                                    {display === true && !guestLastName.trim() ? <span className='error_msg_lbl'>Last Name is required </span> : null}
                                </Col>
                                <Col className='mx-1 d-flex flex-row'>
                                    <Col className='me-1'>
                                        <Label className='form-label' for='prefix'>
                                            Prefix
                                        </Label>
                                        <Input
                                            placeholder='91'
                                            id='prefix'
                                            type='phone'
                                            maxLength={3}
                                            value={mobPrefix}
                                            onChange={e => setMobPrefix(e.target.value)}
                                            invalid={display && mobPrefix.trim() === ''}
                                        />
                                        {display === true && !mobPrefix.trim() ? <span className='error_msg_lbl'>Enter Prefix </span> : null}
                                    </Col>
                                    <Col>
                                        <Label className='form-label' for='mobile_number'>
                                            Mobile Number
                                        </Label>
                                        <Input
                                            placeholder='XXXXX-XXXXX'
                                            id='mobile_number'
                                            type='phone'
                                            maxLength={10}
                                            value={mobNumber}
                                            onChange={e => setMobNumber(e.target.value)}
                                            invalid={display && mobNumber.trim() === ''}
                                        />
                                        {display === true && !mobNumber.trim() ? <span className='error_msg_lbl'>Mob required </span> : null}
                                    </Col>
                                </Col>
                            </Col>
                            <Col className='mt-1 d-flex flex-md-row flex-column'>
                                <Col md='4' sm='12' className='mx-1'>
                                    <Label className='form-label' for='email'>
                                        Email
                                    </Label>
                                    <Input
                                        placeholder='Enter email here'
                                        id='email'
                                        type='email'
                                        value={guestEmail}
                                        onChange={e => setGuestEmail(e.target.value)}
                                        invalid={display && guestEmail.trim() === ''}
                                    />
                                    {display === true && !guestEmail.trim() ? <span className='error_msg_lbl'>Email is required </span> : null}
                                </Col>
                                <Col className='mx-1' >
                                    <Label className='form-label' for='dob'>
                                        Date of Birth
                                    </Label>
                                    <Input
                                        type='date'
                                        placeholder='Select Date of Birth'
                                        onChange={e => setGuestDob(e.target.value)}
                                        invalid={display && guestDob === ''}
                                    />
                                    {display === true && !guestDob ? <span className='error_msg_lbl'>DOB is required </span> : null}
                                </Col>
                                <Col className='mx-1'>
                                    <Label className='form-label' for='country'>
                                        Country
                                    </Label>
                                    <Select
                                        placeholder='Select Country'
                                        menuPlacement='auto'
                                        theme={selectThemeColors}
                                        className='react-select'
                                        classNamePrefix='select'
                                        options={countryOptions}
                                        value={countryOptions?.filter(c => c.value === countryId)}
                                        onChange={val => {
                                            setCountryId(val.value)
                                            stateDetailsList(val.value)
                                        }}
                                        invalid={display && countryId === ''}
                                    />
                                    {display === true && !countryId ? <span className='error_msg_lbl'>Country is required </span> : null}
                                </Col>
                            </Col>
                            <Col className='mt-1 d-flex flex-md-row flex-column'>
                                <Col md='3' sm='12' className='mx-1'>
                                    <Label className='form-label' for='state'>
                                        State
                                    </Label>
                                    <Select
                                        placeholder='Select State'
                                        menuPlacement='auto'
                                        theme={selectThemeColors}
                                        className='react-select'
                                        classNamePrefix='select'
                                        options={stateOptions}
                                        value={stateOptions?.filter(c => c.value === stateId)}
                                        onChange={val => {
                                            setStateId(val.value)
                                            districtDetailsList(val.value)
                                        }}
                                        invalid={display && stateId === ''}
                                    />
                                    {display === true && !stateId ? <span className='error_msg_lbl'>State is required </span> : null}
                                </Col>
                                <Col className='mx-1'>
                                    <Label className='form-label' for='city'>
                                        District
                                    </Label>
                                    <Select
                                        placeholder='Select Dist'
                                        menuPlacement='auto'
                                        theme={selectThemeColors}
                                        className='react-select'
                                        classNamePrefix='select'
                                        options={districtOptions}
                                        value={districtOptions?.filter(c => c.value === districtId)}
                                        onChange={val => {
                                            setDistrictId(val.value)
                                            cityDetailsList(val.value)
                                        }}
                                        invalid={display && districtId === ''}
                                    />
                                    {display === true && !districtId ? <span className='error_msg_lbl'>District is required </span> : null}
                                </Col>
                                <Col className='mx-1'>
                                    <Label className='form-label' for='city'>
                                        City
                                    </Label>
                                    <Select
                                        placeholder='Select City'
                                        menuPlacement='auto'
                                        theme={selectThemeColors}
                                        className='react-select'
                                        classNamePrefix='select'
                                        options={cityOptions}
                                        value={cityOptions?.filter(c => c.value === cityId)}
                                        onChange={val => setCityId(val.value)}
                                        invalid={display && cityId === ''}
                                    />
                                    {display === true && !cityId ? <span className='error_msg_lbl'>City is required </span> : null}
                                </Col>

                                <Col className='mx-1' >
                                    <Label className='form-label' for='pincode'>
                                        Pincode
                                    </Label>
                                    <Input
                                        placeholder='Enter Pincode here'
                                        id='pincode'
                                        type='phone'
                                        maxLength={6}
                                        value={pinCode}
                                        onChange={e => setPinCode(e.target.value)}
                                        invalid={display && pinCode.trim() === ''}
                                    />
                                    {display === true && !pinCode.trim() ? <span className='error_msg_lbl'>Pincode is required </span> : null}
                                </Col>
                            </Col>
                            <Col className='mt-1 d-flex flex-md-row flex-column'>
                                <Col className='mx-1'>
                                    <Label className='form-label' for='address'>
                                        Address
                                    </Label>
                                    <Input
                                        placeholder='Enter address here'
                                        type='textarea'
                                        id='address'
                                        value={address}
                                        onChange={e => setAddress(e.target.value)}
                                        invalid={display && address.trim() === ''}
                                    />
                                    {display === true && !address.trim() ? <span className='error_msg_lbl'>Address is required </span> : null}
                                </Col>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Col xs={12} className='text-center'>
                            <Button className='me-1' color='primary' onClick={onSubmit}>
                                Submit
                            </Button>
                            <Button type='reset' color='secondary' outline>
                                Discard
                            </Button>
                        </Col>
                    </ModalFooter>
                </Form>
            </Modal>
            {
                open ? (
                    <div class="modal-backdrop fade show" ></div>
                ) : null
            }
        </>
    )
}

export default RegisterGuest