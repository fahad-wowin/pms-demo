import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { Edit, Trash } from 'react-feather'
import { Button, Card, CardBody, CardText, Input, CardTitle, Col, Label, Modal, ModalBody, ModalHeader, Row, Form, FormFeedback, CardHeader } from 'reactstrap'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import toast from 'react-hot-toast'
import Flatpickr from 'react-flatpickr'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'


// let data
// axios.get('https://jsonplaceholder.typicode.com/users').then(response => {
//   data = response.data
// })

const countries = [
  { value: 'India', label: 'India' },
  { value: 'USA', label: 'USA' },
  { value: 'Russia', label: 'Russia' }
]

const states = [
  { value: 'Maharashtra', label: 'Maharashtra' },
  { value: 'Goa', label: 'Goa' },
  { value: 'Kerla', label: 'Kerla' }
]

const cities = [
  { value: 'Thane', label: 'Thane' },
  { value: 'Mumbai', label: 'Mumbai' },
  { value: 'Delhi', label: 'Delhi' }
]

const currency = [
  { value: 'INR', label: 'INR' },
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' }
]

// const start = [
//   { value: '...', label: '...' },
//   { value: 'abc', label: 'abc' },
//   { value: 'abc', label: 'abc' }
// ]

// const end = [
//   { value: '...', label: '...' },
//   { value: 'abc', label: 'abc' },
//   { value: 'abc', label: 'abc' }
// ]

// const title = [
//   { value: 'Company Logo', label: 'Company Logo' },
//   { value: 'Gallery', label: 'Gallery' },
//   { value: 'Floor', label: 'Floor' }
// ]

// const uploadAttachment = {
//   width: '400px'
// }

const Hotel = () => {
  const [show, setShow] = useState(false)
  const handleModal = () => setShow(!show)

  const [showEdit, setShowEdit] = useState(false)
  const handleEditModal = () => setShowEdit(!showEdit)

  const [selected_hotel, setSelected_hotel] = useState()

  const [del, setDel] = useState(false)

  const [hotels, setHotels] = useState([
    {
      id: '1',
      hotelName: 'Wowinfobiz',
      address: 'Bhiwandi',
      noOfFloor: '3',
      country: 'India',
      state: 'Maharashtra',
      city: 'Bhiwandi',
      contact: '98765434210',
      email: 'wow@wowinfobiz.com',
      baseCurrency: 'INR',
      acc_startDate: '01/01/22',
      acc_endDate: '31/12/22',
      gst: 'GST09876544321',
      bankName: 'Kotak',
      accountNumber: 'ACC0987654321',
      branch: 'Bhiwandi',
      ifsc: 'KOT0001',
      website: 'www.wowinfobiz.com',
      logo: '../../../assets/images/logo/hostynnist-logo.png'
    }
  ])

  const NewHotelModal = () => {

    const [hotelName, setHotelName] = useState('')
    const [address, setAddress] = useState('')
    const [noOfFloor, setNoOfFloor] = useState('')
    const [country, setCountry] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [contact, setContact] = useState('')
    const [email, setEmail] = useState('')
    const [baseCurrency, setBaseCurrency] = useState('')
    const [acc_startDate, setAcc_startDate] = useState('')
    const [acc_endDate, setAcc_endDate] = useState('')
    const [gst, setGst] = useState('')
    const [bankName, setBankName] = useState('')
    const [accountNumber, setAccountNumber] = useState('')
    const [branch, setBranch] = useState('')
    const [ifsc, setIfsc] = useState('')
    const [website, setWebsite] = useState('')
    const [logo, setLogo] = useState('')

    const [display, setDisplay] = useState(false)

    const hotelObj = {
      id: Math.floor(Math.random() * 100),
      hotelName,
      address,
      noOfFloor,
      country,
      state,
      city,
      contact,
      email,
      baseCurrency,
      acc_startDate,
      acc_endDate,
      gst,
      bankName,
      accountNumber,
      branch,
      ifsc,
      website,
      logo
    }

    const handleSubmit = () => {
      setDisplay(true)
      if (hotelName && address && noOfFloor && country && state && city && email && baseCurrency && gst && bankName && accountNumber && branch && ifsc !== '') {
        setHotels([...hotels, hotelObj])
        handleModal()
        toast.success('Hotel Added!', { position: "top-center" })
      }
      // else {
      //   toast.error('Fill All Fields!', {
      //     position: "top-center",
      //     style: {
      //       minWidth: '250px'
      //     },
      //     duration: 3000
      //   })
      // }
    }

    return (
      <>
        <Modal
          isOpen={show}
          toggle={handleModal}
          className='modal-dialog-centered modal-lg'
          backdrop={false}
        >
          <ModalHeader className='bg-transparent' toggle={handleModal}>
            <span className=' mb-1'>Add Hotel</span>
          </ModalHeader>
          <ModalBody className='px-sm-2 mx-50 pb-5'>
            <>
              <Form>
                <Row>
                  <Col className='mb-1'>
                    <Label className='form-label' for='hotel'><span className='text-danger'>*</span>Hotel Name</Label>
                    <Input
                      type='text'
                      name='hotel'
                      id='hotel'
                      value={hotelName}
                      onChange={e => setHotelName(e.target.value)}
                      invalid={display && hotelName === ''}
                    />
                    {display && !hotelName ? <span className='error_msg_lbl'>Enter Hotel Name </span> : null}
                  </Col>
                  <Col className='mb-1'>
                    <Label className='form-label' for='address'><span className='text-danger'>*</span>Address </Label>
                    <Input
                      type='text'
                      name='address'
                      id='address'
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      invalid={display && address === ''}

                    />
                    {display && !address ? <span className='error_msg_lbl'>Enter Address </span> : null}
                  </Col>
                </Row>
                <Row>
                  <Col className='mb-1'>
                    <Label className='form-label' for='floor'><span className='text-danger'>*</span>No Of Floor </Label>
                    <Input
                      type='text'
                      name='floor'
                      id='floor'
                      value={noOfFloor}
                      onChange={e => setNoOfFloor(e.target.value)}
                      invalid={display && noOfFloor === ''}
                    />
                    {display && !noOfFloor ? <span className='error_msg_lbl'>Enter No Of Floor </span> : null}
                  </Col>
                  <Col className='mb-1'>
                    <Label className='form-label' for='countries'><span className='text-danger'>*</span>Country</Label>
                    <Select
                      theme={selectThemeColors}
                      className='react-select'
                      classNamePrefix='select'
                      placeholder="Select Country"
                      options={countries}
                      isClearable={false}
                      onChange={e => setCountry(e.value)}
                      invalid={display && country === ''}
                    />
                    {display && !country ? <span className='error_msg_lbl'>Enter Country </span> : null}
                  </Col>
                </Row>
                <Row>
                  <Col className='mb-1'>
                    <Label className='form-label' for='states'><span className='text-danger'>*</span>State</Label>
                    <Select
                      theme={selectThemeColors}
                      className='react-select'
                      classNamePrefix='select'
                      placeholder="Select State"
                      options={states}
                      isClearable={false}
                      onChange={e => setState(e.value)}
                      invalid={display && state === ''}
                    />
                    {display && !state ? <span className='error_msg_lbl'>Enter State </span> : null}
                  </Col>
                  <Col className='mb-1'>
                    <Label className='form-label' for='cities'><span className='text-danger'>*</span>City</Label>
                    <Select
                      theme={selectThemeColors}
                      className='react-select'
                      classNamePrefix='select'
                      placeholder="Select City"
                      options={cities}
                      isClearable={false}
                      onChange={e => setCity(e.value)}
                      invalid={display && city === ''}
                    />
                    {display && !city ? <span className='error_msg_lbl'>Enter City </span> : null}
                  </Col>
                </Row>
                <Row>
                  <Col className='mb-1'>
                    <Label className='form-label' for='contact'><span className='text-danger'>*</span>Contact</Label>
                    <Input
                      type='text'
                      name='contact'
                      id='contact'
                      value={contact}
                      onChange={e => setContact(e.target.value)}
                      invalid={display && contact === ''}
                    />
                    {display && !contact && <FormFeedback>Contact is required</FormFeedback>}
                  </Col>
                  <Col className='mb-1'>
                    <Label className='form-label' for='email'>Email<span className='text-danger'>*</span></Label>
                    <Input
                      type='email'
                      name='email'
                      id='email'
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      invalid={display && email === ''}
                    />
                    {display && !email && <FormFeedback>Email is required</FormFeedback>}
                  </Col>
                </Row>
                <Row>
                  <Col className='mb-1'>
                    <Label className='form-label' for='baseCountry'><span className='text-danger'>*</span>Base Currency</Label>
                    <Select
                      theme={selectThemeColors}
                      className='react-select'
                      classNamePrefix='select'
                      placeholder='Select Base Currency'
                      options={currency}
                      isClearable={false}
                      onChange={e => setBaseCurrency(e.value)}
                      invalid={display ? baseCurrency === '' : false}
                    />
                    {display === true && !baseCurrency ? <span className='error_msg_lbl'>Enter Base Currency </span> : <></>}
                  </Col>
                  <Col className='mb-1'>
                    <Label className='form-label' for='account'>Accounting Period</Label>
                    <Row>
                      <Col md='6'>
                        <Label className='form-label' for='start'>Start</Label>
                        <Flatpickr
                          id='start_date'
                          className='form-control'
                          placeholder='Select Date'
                          options={{
                            altInput: true,
                            // altFormat: 'F, j, Y',
                            altFormat: 'd-m-y',
                            dateFormat: 'd-m-y'
                          }}
                          value={acc_startDate}
                          onChange={date => setAcc_startDate(date[0])}
                        />
                      </Col>
                      <Col md='6 mb-1'>
                        <Label className='form-label' for='end'>End</Label>
                        <Flatpickr
                          id='start_date'
                          className='form-control'
                          placeholder='Select Date'
                          options={{
                            altInput: true,
                            // altFormat: 'F, j, Y',
                            altFormat: 'd-m-y',
                            dateFormat: 'd-m-y'
                          }}
                          value={acc_endDate}
                          onChange={date => setAcc_endDate(date[0])}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col className='mb-1'>
                    <Label className='form-label' for='gst'><span className='text-danger'>*</span>GST</Label>
                    <Input
                      type='text'
                      name='gst'
                      id='gst'
                      value={gst}
                      onChange={e => setGst(e.target.value)}
                      invalid={display && gst === ''}
                    />
                    {display && !gst && <FormFeedback>GST is required</FormFeedback>}
                  </Col>
                  <Col className='mb-1'>
                    <Label className='form-label' for='bankName'><span className='text-danger'>*</span>Bank Name</Label>
                    <Input
                      type='text'
                      name='bankName'
                      id='bankName'
                      value={bankName}
                      onChange={e => setBankName(e.target.value)}
                      invalid={display && bankName === ''} />
                    {display && !bankName ? <span className='error_msg_lbl'>Enter Bank Name </span> : null}
                  </Col>
                </Row>
                <Row>
                  <Col className='mb-1'>
                    <Label className='form-label' for='accountNo'><span className='text-danger'>*</span>Account No</Label>
                    <Input
                      type='text'
                      name='accountNo'
                      id='accountNo'
                      value={accountNumber}
                      onChange={e => setAccountNumber(e.target.value)}
                      invalid={display && accountNumber === ''} />
                    {display && !accountNumber ? <span className='error_msg_lbl'>Enter Account Number </span> : null}
                  </Col>
                  <Col className='mb-1'>
                    <Label className='form-label' for='branch'><span className='text-danger'>*</span>Branch</Label>
                    <Input
                      type='text'
                      name='branch'
                      id='branch'
                      value={branch}
                      onChange={e => setBranch(e.target.value)}
                      invalid={display && branch === ''} />
                    {display && !branch ? <span className='error_msg_lbl'>Enter Branch </span> : null}
                  </Col>
                </Row>
                <Row>
                  <Col className='mb-1'>
                    <Label className='form-label' for='ifsc'><span className='text-danger'>*</span>IFSC</Label>
                    <Input
                      type='text'
                      name='ifsc'
                      id='ifsc'
                      value={ifsc}
                      onChange={e => setIfsc(e.target.value)}
                      invalid={display && ifsc === ''} />
                    {display && !ifsc ? <span className='error_msg_lbl'>Enter IFSC </span> : null}
                  </Col>
                  <Col className='mb-1'>
                    <Label className='form-label' for='website'>Web Site</Label>
                    <Input
                      type='text'
                      name='website'
                      id='website'
                      value={website}
                      onChange={e => setWebsite(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md='6'>
                    <Label className='form-label me-2' for='logo' >Logo</Label>
                    <Input
                      type='file'
                      name='logo'
                      id='logo'
                      // value={logo}
                      onChange={e => setLogo(e.target.files[0])}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md='12 text-end mt-1'>
                    <Button className='me-1' color='primary' onClick={handleSubmit}>
                      Submit
                    </Button>
                    <Button
                      color='secondary'
                      outline
                      onClick={() => {
                        setShow(!show)
                      }}
                    >
                      Cancel
                    </Button>
                  </Col>
                </Row>
              </Form>
            </>
          </ModalBody>
        </Modal>
        {
          show ? (
            <div class="modal-backdrop fade show" ></div>
          ) : null
        }
      </>
    )
  }

  const EditHotelModal = ({ id }) => {

    const hotelData = hotels.filter(hotel => hotel.id === id)

    const [editHotelName, setEditHotelName] = useState(hotelData[0]?.hotelName)
    const [editAddress, setEditAddress] = useState(hotelData[0]?.address)
    const [editNoOfFloor, setEditNoOfFloor] = useState(hotelData[0]?.noOfFloor)
    const [editCountry, setEditCountry] = useState(hotelData[0]?.country)
    const [editState, setEditState] = useState(hotelData[0]?.state)
    const [editCity, setEditCity] = useState(hotelData[0]?.city)
    const [editContact, setEditContact] = useState(hotelData[0]?.contact)
    const [editEmail, setEditEmail] = useState(hotelData[0]?.email)
    const [editBaseCurrency, setEditBaseCurrency] = useState(hotelData[0]?.baseCurrency)
    const [editAcc_startDate, setEditAcc_startDate] = useState(hotelData[0]?.acc_startDate)
    const [editAcc_endDate, setEditAcc_endDate] = useState(hotelData[0]?.acc_endDate)
    const [editGst, setEditGst] = useState(hotelData[0]?.gst)
    const [editBankName, setEditBankName] = useState(hotelData[0]?.bankName)
    const [editAccountNumber, setEditAccountNumber] = useState(hotelData[0]?.accountNumber)
    const [editBranch, setEditBranch] = useState(hotelData[0]?.branch)
    const [editIfsc, setEditIfsc] = useState(hotelData[0]?.ifsc)
    const [editWebsite, setEditWebsite] = useState(hotelData[0]?.website)
    const [editLogo, setEditLogo] = useState(hotelData[0]?.logo)

    console.log('logo', editLogo)
    const [editDisplay, setEditDisplay] = useState(false)

    const editHandleSubmit = () => {
      setEditDisplay(true)
      if (editHotelName && editAddress && editNoOfFloor && editCountry && editState && editCity && editEmail && editBaseCurrency && editGst && editBankName && editAccountNumber && editBranch && editIfsc !== '') {
        hotels.map(hotel => {
          if (hotel.id === id) {
            hotel.hotelName = editHotelName
            hotel.address = editAddress
            hotel.noOfFloor = editNoOfFloor
            hotel.country = editCountry
            hotel.state = editState
            hotel.city = editCity
            hotel.contact = editContact
            hotel.email = editEmail
            hotel.baseCurrency = editBaseCurrency
            hotel.acc_startDate = editAcc_startDate
            hotel.acc_endDate = editAcc_endDate
            hotel.gst = editGst
            hotel.bankName = editBankName
            hotel.accountNumber = editAccountNumber
            hotel.branch = editBranch
            hotel.ifsc = editIfsc
            hotel.website = editWebsite
            hotel.logo = editLogo
          }
        })
        handleEditModal()
        toast.success('Hotel Edited Succesfully!', { position: "top-center" })
      }
      // else {
      //   toast.error('Fill All Fields!', {
      //     position: "top-center",
      //     style: {
      //       minWidth: '250px'
      //     },
      //     duration: 3000
      //   })
      // }
    }

    return (
      <>
        <Modal
          isOpen={showEdit}
          toggle={handleEditModal}
          className='modal-dialog-centered modal-lg'
          backdrop={false}
        >
          <ModalHeader className='bg-transparent' toggle={handleEditModal}>
            <span className=' mb-1'>Edit Hotel</span>
          </ModalHeader>
          <ModalBody className='px-sm-2 mx-50 pb-5'>
            <>
              <Form>
                <Row>
                  <Col className='mb-1'>
                    <Label className='form-label' for='hotel'><span className='text-danger'>*</span>Hotel Name</Label>
                    <Input
                      type='text'
                      name='hotel'
                      id='hotel'
                      value={editHotelName}
                      onChange={e => setEditHotelName(e.target.value)}
                      invalid={editDisplay && editHotelName === ''}
                    />
                    {editDisplay && !editHotelName ? <span className='error_msg_lbl'>Enter Hotel Name </span> : null}
                  </Col>
                  <Col className='mb-1'>
                    <Label className='form-label' for='address'><span className='text-danger'>*</span>Address </Label>
                    <Input
                      type='text'
                      name='address'
                      id='address'
                      value={editAddress}
                      onChange={e => setEditAddress(e.target.value)}
                      invalid={editDisplay && editAddress === ''}

                    />
                    {editDisplay && !editAddress ? <span className='error_msg_lbl'>Enter Address </span> : null}
                  </Col>
                </Row>
                <Row>
                  <Col className='mb-1'>
                    <Label className='form-label' for='floor'><span className='text-danger'>*</span>No Of Floor </Label>
                    <Input
                      type='text'
                      name='floor'
                      id='floor'
                      value={editNoOfFloor}
                      onChange={e => setEditNoOfFloor(e.target.value)}
                      invalid={editDisplay && editNoOfFloor === ''}
                    />
                    {editDisplay && !editNoOfFloor ? <span className='error_msg_lbl'>Enter No Of Floor </span> : null}
                  </Col>
                  <Col className='mb-1'>
                    <Label className='form-label' for='countries'><span className='text-danger'>*</span>Country</Label>
                    <Select
                      theme={selectThemeColors}
                      className='react-select'
                      classNamePrefix='select'
                      value={countries.filter(c => c.value === editCountry)}
                      options={countries}
                      isClearable={false}
                      onChange={e => setEditCountry(e.value)}
                      invalid={editDisplay && editCountry === ''}
                    />
                    {editDisplay && !editCountry ? <span className='error_msg_lbl'>Enter Country </span> : null}
                  </Col>
                </Row>
                <Row>
                  <Col className='mb-1'>
                    <Label className='form-label' for='states'><span className='text-danger'>*</span>State</Label>
                    <Select
                      theme={selectThemeColors}
                      className='react-select'
                      classNamePrefix='select'
                      value={states.filter(c => c.value === editCountry)}
                      options={states}
                      isClearable={false}
                      onChange={e => setEditState(e.value)}
                      invalid={editDisplay && editState === ''}
                    />
                    {editDisplay && !editState ? <span className='error_msg_lbl'>Enter State </span> : null}
                  </Col>
                  <Col className='mb-1'>
                    <Label className='form-label' for='cities'><span className='text-danger'>*</span>City</Label>
                    <Select
                      theme={selectThemeColors}
                      className='react-select'
                      classNamePrefix='select'
                      value={cities.filter(c => c.value === editCountry)}
                      options={cities}
                      isClearable={false}
                      onChange={e => setEditCity(e.value)}
                      invalid={editDisplay && editCity === ''}
                    />
                    {editDisplay && !editCity ? <span className='error_msg_lbl'>Enter City </span> : null}
                  </Col>
                </Row>
                <Row>
                  <Col className='mb-1'>
                    <Label className='form-label' for='contact'><span className='text-danger'>*</span>Contact</Label>
                    <Input
                      type='text'
                      name='contact'
                      id='contact'
                      value={editContact}
                      onChange={e => setEditContact(e.target.value)}
                      invalid={editDisplay && editContact === ''}
                    />
                    {editDisplay && !editContact && <FormFeedback>Contact is required</FormFeedback>}
                  </Col>
                  <Col className='mb-1'>
                    <Label className='form-label' for='email'>Email<span className='text-danger'>*</span></Label>
                    <Input
                      type='email'
                      name='email'
                      id='email'
                      value={editEmail}
                      onChange={e => setEditEmail(e.target.value)}
                      invalid={editDisplay && editEmail === ''}
                    />
                    {editDisplay && !editEmail && <FormFeedback>Email is required</FormFeedback>}
                  </Col>
                </Row>
                <Row>
                  <Col className='mb-1'>
                    <Label className='form-label' for='baseCountry'><span className='text-danger'>*</span>Base Currency</Label>
                    <Select
                      theme={selectThemeColors}
                      className='react-select'
                      classNamePrefix='select'
                      value={currency.filter(c => c.value === editCountry)}
                      options={currency}
                      isClearable={false}
                      onChange={e => setEditBaseCurrency(e.value)}
                      invalid={editDisplay ? editBaseCurrency === '' : false}
                    />
                    {editDisplay === true && !editBaseCurrency ? <span className='error_msg_lbl'>Enter Base Currency </span> : <></>}
                  </Col>
                  <Col className='mb-1'>
                    <Label className='form-label' for='account'>Accounting Period</Label>
                    <Row>
                      <Col md='6'>
                        <Label className='form-label' for='start'>Start</Label>
                        <Flatpickr
                          id='start_date'
                          className='form-control'
                          placeholder='Select Date'
                          // options={{
                          //   altInput: true,
                          //   // altFormat: 'F, j, Y',
                          //   dateFormat: 'd-m-y'
                          // }}
                          options={{
                            altInput: true,
                            altFormat: 'd-m-y',
                            dateFormat: 'd-m-y'
                          }}
                          value={editAcc_startDate}
                          onChange={date => setEditAcc_startDate(date[0])}
                        />
                      </Col>
                      <Col md='6 mb-1'>
                        <Label className='form-label' for='end'>End</Label>
                        <Flatpickr
                          id='start_date'
                          className='form-control'
                          placeholder='Select Date'
                          options={{
                            altInput: true,
                            altFormat: 'd-m-y',
                            dateFormat: 'd-m-y'
                          }}
                          value={editAcc_endDate}
                          onChange={date => setEditAcc_endDate(date[0])}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col className='mb-1'>
                    <Label className='form-label' for='gst'>GST</Label>
                    <Input
                      type='text'
                      name='gst'
                      id='gst'
                      value={editGst}
                      onChange={e => setEditGst(e.target.value)}
                      invalid={editDisplay && editGst === ''}
                    />
                    {editDisplay && !editGst && <FormFeedback>GST is required</FormFeedback>}
                  </Col>
                  <Col className='mb-1'>
                    <Label className='form-label' for='bankName'><span className='text-danger'>*</span>Bank Name</Label>
                    <Input
                      type='text'
                      name='bankName'
                      id='bankName'
                      value={editBankName}
                      onChange={e => setEditBankName(e.target.value)}
                      invalid={editDisplay && editBankName === ''} />
                    {editDisplay && !editBankName ? <span className='error_msg_lbl'>Enter Bank Name </span> : null}
                  </Col>
                </Row>
                <Row>
                  <Col className='mb-1'>
                    <Label className='form-label' for='accountNo'><span className='text-danger'>*</span>Account No</Label>
                    <Input
                      type='text'
                      name='accountNo'
                      id='accountNo'
                      value={editAccountNumber}
                      onChange={e => setEditAccountNumber(e.target.value)}
                      invalid={editDisplay && editAccountNumber === ''} />
                    {editDisplay && !editAccountNumber ? <span className='error_msg_lbl'>Enter Account Number </span> : null}
                  </Col>
                  <Col className='mb-1'>
                    <Label className='form-label' for='branch'><span className='text-danger'>*</span>Branch</Label>
                    <Input
                      type='text'
                      name='branch'
                      id='branch'
                      value={editBranch}
                      onChange={e => setEditBranch(e.target.value)}
                      invalid={editDisplay && editBranch === ''} />
                    {editDisplay && !editBranch ? <span className='error_msg_lbl'>Enter Branch </span> : null}
                  </Col>
                </Row>
                <Row>
                  <Col className='mb-1'>
                    <Label className='form-label' for='ifsc'><span className='text-danger'>*</span>IFSC</Label>
                    <Input
                      type='text'
                      name='ifsc'
                      id='ifsc'
                      value={editIfsc}
                      onChange={e => setEditIfsc(e.target.value)}
                      invalid={editDisplay && editIfsc === ''} />
                    {editDisplay && !editIfsc ? <span className='error_msg_lbl'>Enter IFSC </span> : null}
                  </Col>
                  <Col className='mb-1'>
                    <Label className='form-label' for='website'>Web Site</Label>
                    <Input
                      type='text'
                      name='website'
                      id='website'
                      value={editWebsite}
                      onChange={e => setEditWebsite(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md='6'>
                    <Label className='form-label me-2' for='logo' >Logo</Label>
                    <Input
                      type='file'
                      name='logo'
                      id='logo'
                      onChange={e => setEditLogo(e.target.files[0])}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md='12 text-end mt-1'>
                    <Button className='me-1' color='primary' onClick={editHandleSubmit}>
                      Submit
                    </Button>
                    <Button
                      color='secondary'
                      outline
                      onClick={handleEditModal}
                    >
                      Cancel
                    </Button>
                  </Col>
                </Row>
              </Form>
            </>
          </ModalBody>
        </Modal>
        {
          showEdit ? (
            <div class="modal-backdrop fade show" ></div>
          ) : null
        }
      </>
    )
  }

  const DeleteHotelModal = ({ id }) => {

    const data = hotels.filter(hotel => hotel.id === id)

    const handleDeleteHotel = () => {
      setHotels(hotels.filter(hotel => hotel.id !== id))
      setDel(!del)
    }

    return (
      <>
        <Modal
          isOpen={del}
          toggle={() => setDel(!del)}
          className='modal-dialog-centered'
          backdrop={false}
        >
          <ModalHeader className='bg-transparent text-center' toggle={() => setDel(!del)}>
            Are you sure to delete this permanently {data[0]?.hotelName}?
          </ModalHeader>
          <ModalBody>
            <Row className='text-center'>
              <Col xs={12}>
                <Button color='danger' className='m-1' onClick={handleDeleteHotel}>
                  Delete
                </Button>
                <Button className='m-1' color='secondary' outline onClick={() => setDel(!del)}>
                  Cancel
                </Button>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
        {
          del ? (
            <div class="modal-backdrop fade show" ></div>
          ) : null
        }
      </>
    )
  }

  const hotelTable = [
    {
      name: '#',
      width: '60px',
      sortable: true,
      selector: row => row.id
    },
    {
      name: 'Hotel Name',
      sortable: true,
      selector: row => row.hotelName
    },
    {
      name: "Address",
      selector: row => row.address
    },
    {
      name: "No Of Floor",
      selector: row => row.noOfFloor
    },
    {
      name: "Country",
      selector: row => row.country
    },
    {
      name: 'Action',
      sortable: true,
      center: true,
      selector: row => (
        <>
          <Col>
            <Edit className='me-50 pe-auto' onClick={() => {
              setShowEdit(true)
              setSelected_hotel(row.id)
            }} size={15} />
            <Trash className='me-50' size={15} onClick={() => {
              setDel(true)
              setSelected_hotel(row.id)
            }} />
          </Col>
          <EditHotelModal id={selected_hotel} />
          <DeleteHotelModal id={selected_hotel} />
        </>
      )
    }
  ]

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            Hotel
          </CardTitle>
          <Button color='primary' onClick={() => setShow(true)}>Add Hotel</Button>
        </CardHeader>
        <CardBody>
          <Row className='my-1'>
            <Col>
            <DataTable
                  noHeader
                  data={hotels}
                  columns={hotelTable}
                  className='react-dataTable'
                />
            </Col>
          </Row>
        </CardBody>
      </Card>
      {/* <Row>
        <Col md='12' className='mb-1'>
          <Card>
            <CardBody>
              <CardTitle tag='h1' className='fw-bold fs-2 d-flex justify-content-between'>
                Hotel
                <Button color='primary' onClick={() => setShow(true)}>Add Hotel</Button>
              </CardTitle>
              <CardText>
                <DataTable
                  noHeader
                  data={hotels}
                  columns={hotelTable}
                  className='react-dataTable'
                />
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row> */}
      <NewHotelModal />
      <EditHotelModal />
      <DeleteHotelModal />
    </>
  )
}

export default Hotel
