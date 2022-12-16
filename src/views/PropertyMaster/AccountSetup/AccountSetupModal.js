import { React, useState } from 'react'
import { Button, Card, CardTitle, CardBody, CardText, Input, Row, Col, Modal, ModalHeader, ModalBody, Label, InputGroupText, InputGroup } from 'reactstrap'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import Flatpickr from 'react-flatpickr'
import toast from 'react-hot-toast'

const titleOptions = [
    { value: 'Mr.', label: 'Mr.' },
    { value: 'Ms.', label: 'Ms.' },
    { value: 'Mrs.', label: 'Mrs.' }
]

const accountTypes = [
    { value: 'HouseKeeping', label: 'HouseKeeping' },
    { value: 'FoodBeverage', label: 'Food & Beverage' },
    { value: 'FrontOffice', label: 'Front Office' },
    { value: 'KitchenService', label: 'Kitchen Service' },
    { value: 'Accounts', label: 'Accounts' },
    { value: 'Purchase', label: 'Purchase' },
    { value: 'SalesMarketing', label: 'Sales & Marketing' },
    { value: 'Vendor', label: 'Vendor' },
    { value: 'Debtor Account', label: 'Debtor Account' },
    { value: 'Travel Agent', label: 'Travel Agent' }
]

const genderOptions = [
    { value: '-', label: '-' },
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' }
]


const AccountSetupModal = ({ open, setOpen, accounts, setAccounts, flag }) => {

    const [title, setTitle] = useState('')
    const [accountType, setAccountType] = useState('')
    const [firstName, setFirstName] = useState('')
    const [midName, setMidName] = useState('')
    const [lastName, setLastName] = useState('')
    const [prefName, setPrefName] = useState('')
    const [gender, setGender] = useState('')
    const [aadhaar, setAadhaar] = useState('')
    const [picker, setPicker] = useState('')
    const [age, setAge] = useState('')
    const [address, setAddress] = useState('')
    const [mobile, setMobile] = useState('')
    const [email, setEmail] = useState('')
    const [gst, setGst] = useState('')

    const [display, setDisplay] = useState(false)

    const accountObj = {
        id: Math.floor(Math.random() * 100),
        title,
        accountType,
        firstName,
        midName,
        lastName,
        prefName,
        gender,
        aadhaar,
        picker,
        age,
        address,
        mobile,
        email,
        gst
    }

    const reset = () => {
        setTitle('')
        setAccountType('')
        setFirstName('')
        setMidName('')
        setLastName('')
        setPrefName('')
        setGender('')
        setAadhaar('')
        setPicker('')
        setAge('')
        setAddress('')
        setMobile('')
        setEmail('')
        setGst('')
        setDisplay(false)
    }
    const ageCalculator = (date) => {
        const ageDiff = Date.now() - date[0]
        const ageDate = new Date(ageDiff)
        setAge(Math.abs(ageDate.getUTCFullYear() - 1970))
    }


    const handleSubmit = () => {
        if (flag === 1) {
            setDisplay(true)
            if (accountType && firstName && aadhaar && mobile && email !== '') {
                setOpen(false)
                reset()
                toast.success('Account Added!', { position: "top-center" })
            }
            // else {
            //     toast.error('Fill All Fields!', {
            //         position: "top-center",
            //         style: {
            //             minWidth: '250px'
            //         },
            //         duration: 3000
            //     })
            // }
        } else {
            setDisplay(true)
            if (accountType && firstName && aadhaar && mobile && email !== '') {
                setAccounts([...accounts, accountObj])
                setOpen(false)
                reset()
                toast.success('Account Added!', { position: "top-center" })
            }
            // else {
            //     toast.error('Fill All Fields!', {
            //         position: "top-center",
            //         style: {
            //             minWidth: '250px'
            //         },
            //         duration: 3000
            //     })
            // }
        }
    }

    return (
        <>
            <Modal
                isOpen={open}
                toggle={() => setOpen(false)}
                className='modal-dialog-centered modal-lg'
                backdrop={false}
            >
                <ModalHeader className='bg-transparent' toggle={() => setOpen(!open)}>
                    Account Details
                </ModalHeader>
                <ModalBody className='px-sm-2 mx-50 pb-5'>
                    <Row>
                        <Col md='6' className='mb-2'>
                            <Label className='form-label' for='title'>Title</Label>
                            <Select
                                theme={selectThemeColors}
                                className='react-select w-100'
                                classNamePrefix='select'
                                defaultValue={titleOptions[0]}
                                options={titleOptions}
                                isClearable={false}
                                // value={title}
                                onChange={e => setTitle(e.value)}
                            />
                        </Col>
                        <Col md='6' className='mb-2'>
                            <Label className='form-label' for='accountType'>
                                <span className='text-danger'>*</span>Account Type
                            </Label>
                            <Select
                                theme={selectThemeColors}
                                className='react-select w-100'
                                classNamePrefix='select'
                                // defaultValue={accountTypes}
                                options={accountTypes}
                                isClearable={false}
                                // value={accountType}
                                onChange={e => setAccountType(e.value)}
                                invalid={display && accountType === ''}
                            />
                            {display && !accountType ? <span className='error_msg_lbl'>Enter Account Type </span> : null}
                        </Col>
                        <Col md='6' className='mb-2'>
                            <Label className='form-label' for='firstName'>
                                <span className='text-danger'>*</span>First Name
                            </Label>
                            <Input type='text' placeholder='Enter First Name' name='firstName' id='firstName' value={firstName} onChange={e => setFirstName(e.target.value)} invalid={display && firstName === ''} />
                            {display && !firstName ? <span className='error_msg_lbl'>Enter First Name </span> : null}
                        </Col>
                        <Col md='6' className='mb-2'>
                            <Label className='form-label' for='midName'>Middle Name</Label>
                            <Input type='text' placeholder='Enter Middle Name' name='midName' id='midName' value={midName} onChange={e => setMidName(e.target.value)} />
                        </Col>
                        <Col md='6' className='mb-2'>
                            <Label className='form-label' for='lastName'>Last Name</Label>
                            <Input type='text' placeholder='Enter Last Name' name='lastName' id='lastName' value={lastName} onChange={e => setLastName(e.target.value)} />
                        </Col>
                        <Col md='6' className='mb-2'>
                            <Label className='form-label' for='prefName'>Preferred Name</Label>
                            <Input type='text' placeholder='Enter Name' name='prefName' id='prefName' value={prefName} onChange={e => setPrefName(e.target.value)} />
                        </Col>
                        <Col md='6' className='mb-2'>
                            <Label className='form-label' for='gender'>Gender</Label>
                            <Select
                                theme={selectThemeColors}
                                className='react-select w-100'
                                classNamePrefix='select'
                                defaultValue={genderOptions[0]}
                                options={genderOptions}
                                isClearable={false}
                                // value={gender}
                                onChange={e => setGender(e.value)}
                            />
                        </Col>
                        <Col md='6' className='mb-2'>
                            <Label className='form-label' for='aadhaar'>
                                <span className='text-danger'>*</span>Aadhaar Number
                            </Label>
                            <Input type='text' placeholder='Enter Aadhaar Num' name='aadhaar' id='aadhaar' value={aadhaar} onChange={e => setAadhaar(e.target.value)} invalid={display && aadhaar === ''} />
                            {display && !aadhaar ? <span className='error_msg_lbl'>Enter Aadhaar Number </span> : null}
                        </Col>
                        <Col md='6' className='mb-2'>
                            <Label className='form-label'>Date of Birth</Label>
                            <InputGroup className='input-group-merge'>
                                <Flatpickr className='form-control' value={picker} onChange={date => {
                                    setPicker(date)
                                    ageCalculator(date)
                                }} id='startDate'
                                />
                            </InputGroup>
                        </Col>
                        <Col md='6' className='mb-2'>
                            <Label className='form-label' for='age'>Age</Label>
                            <Input type='text' disabled placeholder='Enter Age' name='age' id='age' value={age} />
                        </Col>
                        <h3>Address Details</h3>
                        <Col md='12' className='mb-2'>
                            <Label className='form-label' for='address'>Address</Label>
                            <Input type='textarea' placeholder='Enter Address' name='address' id='address' value={address} onChange={e => setAddress(e.target.value)} />
                        </Col>
                        <Col md='6' className='mb-2'>
                            <Label className='form-label' for='mobile'>
                                <span className='text-danger'>*</span>Mobile Number
                            </Label>
                            <Input type='number' placeholder='Enter Mobile Num' name='mobile' id='mobile' value={mobile} onChange={e => setMobile(e.target.value)} invalid={display && mobile === ''} />
                            {display && !mobile ? <span className='error_msg_lbl'>Enter Mobile Number </span> : null}
                        </Col>
                        <Col md='6' className='mb-2'>
                            <Label className='form-label' for='email'>
                                <span className='text-danger'>*</span>Email ID
                            </Label>
                            <Input type='text' placeholder='Enter Email' name='email' id='email' value={email} onChange={e => setEmail(e.target.value)} invalid={display && email === ''} />
                            {display && !email ? <span className='error_msg_lbl'>Enter Email </span> : null}
                        </Col>
                        <Col md='6' className='mb-2'>
                            <Label className='form-label' for='gst'>GST</Label>
                            <Input type='text' name='gst' id='gst' value={gst} onChange={e => setGst(e.target.value)} />
                        </Col>
                    </Row>
                    <Row tag='form' className='gy-1 gx-2 mt-75' >
                        <Col className='text-center mt-1' xs={12}>
                            <Button className='me-1' color='primary' onClick={handleSubmit}>
                                Submit
                            </Button>
                            <Button
                                color='secondary'
                                outline
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
            {
                open ? (
                    <div className="modal-backdrop fade show" ></div>
                ) : null
            }
        </>
    )

}
export default AccountSetupModal