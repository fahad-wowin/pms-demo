import { React, useState } from 'react'
import { Button, Card, CardTitle, CardBody, CardText, Input, Row, Col, Modal, ModalHeader, ModalBody, Label, InputGroupText, InputGroup, CardHeader } from 'reactstrap'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import Flatpickr from 'react-flatpickr'
import DataTable from 'react-data-table-component'
import { Edit, Trash } from 'react-feather'
import toast from 'react-hot-toast'
import AccountSetupModal from './AccountSetupModal'

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

// let data
// axios.get('https://jsonplaceholder.typicode.com/users').then(response => {
//     data = response.data
// })

const AccountSetup = () => {
    const [show, setShow] = useState(false)

    const [showEdit, setShowEdit] = useState(false)
    const handleEditModal = () => setShowEdit(!showEdit)

    const [selected_account, setSelected_account] = useState()

    const [del, setDel] = useState(false)

    const [accounts, setAccounts] = useState([
        {
            id: '1',
            title: 'Ms',
            accountType: 'Accounts',
            firstName: 'WowInfobiz',
            midName: 'abc',
            lastName: 'xyz',
            prefName: 'abc',
            gender: 'female',
            aadhaar: '123456',
            picker: '1/1/2001',
            age: '20',
            address: 'abc',
            mobile: '9876543210',
            email: 'abc',
            gst: 'abc'
        }
    ])

    const EditAccountModal = ({ id }) => {
        const accountData = accounts.filter(account => account.id === id)

        const [editTitle, setEditTitle] = useState(accountData[0]?.title)
        const [editAccountType, setEditAccountType] = useState(accountData[0]?.accountType)
        const [editFirstName, setEditFirstName] = useState(accountData[0]?.firstName)
        const [editMidName, setEditMidName] = useState(accountData[0]?.midName)
        const [editLastName, setEditLastName] = useState(accountData[0]?.lastName)
        const [editPrefName, setEditPrefName] = useState(accountData[0]?.prefName)
        const [editGender, setEditGender] = useState(accountData[0]?.gender)
        const [editAadhaar, setEditAadhaar] = useState(accountData[0]?.aadhaar)
        const [editPicker, setEditPicker] = useState(accountData[0]?.picker)
        const [editAge, setEditAge] = useState(accountData[0]?.age)
        const [editAddress, setEditAddress] = useState(accountData[0]?.address)
        const [editMobile, setEditMobile] = useState(accountData[0]?.mobile)
        const [editEmail, setEditEmail] = useState(accountData[0]?.email)
        const [editGst, setEditGst] = useState(accountData[0]?.gst)
        console.log(editGender, editAccountType, editTitle)

        const [editDisplay, setEditDisplay] = useState(false)

        const ageCalculator = (date) => {
            const ageDiff = Date.now() - date[0]
            const ageDate = new Date(ageDiff)
            setEditAge(Math.abs(ageDate.getUTCFullYear() - 1970))
        }

        const editHandleSubmit = () => {
            setEditDisplay(true)
            if (editAccountType && editFirstName && editAadhaar && editMobile && editEmail !== '') {
                accounts.map(account => {
                    if (account.id === id) {
                        account.title = editTitle
                        account.accountType = editAccountType
                        account.firstName = editFirstName
                        account.midName = editMidName
                        account.lastName = editLastName
                        account.prefName = editPrefName
                        account.gender = editGender
                        account.aadhaar = editAadhaar
                        account.picker = editPicker
                        account.age = editAge
                        account.address = editAddress
                        account.mobile = editMobile
                        account.email = editEmail
                        account.gst = editGst
                    }
                })
                handleEditModal()
                toast.success('Account Edited Successfully!', { position: "top-center" })
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

        return (
            <>
                <Modal
                    isOpen={showEdit}
                    toggle={handleEditModal}
                    className='modal-dialog-centered modal-lg'
                    backdrop={false}
                >
                    <ModalHeader className='bg-transparent' toggle={handleEditModal}>
                        Edit Account Details
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
                                    // value={editTitle}
                                    onChange={e => setEditTitle(e.value)}
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
                                    // value={editAccountType}
                                    onChange={e => setEditAccountType(e.value)}
                                    invalid={editDisplay && editAccountType === ''}
                                />
                                {editDisplay && !editAccountType ? <span className='error_msg_lbl'>Enter Account Type </span> : null}
                            </Col>
                            <Col md='6' className='mb-2'>
                                <Label className='form-label' for='firstName'>
                                    <span className='text-danger'>*</span>First Name
                                </Label>
                                <Input type='text' placeholder='Enter First Name' name='firstName' id='firstName' value={editFirstName} onChange={e => setEditFirstName(e.target.value)} invalid={editDisplay && editFirstName === ''} />
                                {editDisplay && !editFirstName ? <span className='error_msg_lbl'>Enter First Name </span> : null}
                            </Col>
                            <Col md='6' className='mb-2'>
                                <Label className='form-label' for='midName'>Middle Name</Label>
                                <Input type='text' placeholder='Enter Middle Name' name='midName' id='midName' value={editMidName} onChange={e => setEditMidName(e.target.value)} />
                            </Col>
                            <Col md='6' className='mb-2'>
                                <Label className='form-label' for='lastName'>Last Name</Label>
                                <Input type='text' placeholder='Enter Last Name' name='lastName' id='lastName' value={editLastName} onChange={e => setEditLastName(e.target.value)} />
                            </Col>
                            <Col md='6' className='mb-2'>
                                <Label className='form-label' for='prefName'>Preferred Name</Label>
                                <Input type='text' placeholder='Enter Name' name='prefName' id='prefName' value={editPrefName} onChange={e => setEditPrefName(e.target.value)} />
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
                                    // value={editGender}
                                    onChange={e => setEditGender(e.value)}
                                />
                            </Col>
                            <Col md='6' className='mb-2'>
                                <Label className='form-label' for='aadhaar'>
                                    <span className='text-danger'>*</span>Aadhaar Number
                                </Label>
                                <Input type='text' placeholder='Enter Aadhaar Num' name='aadhaar' id='aadhaar' value={editAadhaar} onChange={e => setEditAadhaar(e.target.value)} invalid={editDisplay && editAadhaar === ''} />
                                {editDisplay && !editAadhaar ? <span className='error_msg_lbl'>Enter Aadhaar Number </span> : null}
                            </Col>
                            <Col md='6' className='mb-2'>
                                <Label className='form-label'>Date of Birth</Label>
                                <InputGroup className='input-group-merge'>
                                    <Flatpickr className='form-control' value={editPicker} onChange={date => {
                                        setEditPicker(date)
                                        ageCalculator(date)
                                    }} id='startDate' />
                                </InputGroup>
                            </Col>
                            <Col md='6' className='mb-2'>
                                <Label className='form-label' for='age'>Age</Label>
                                <Input type='text' disabled placeholder='Enter Age' name='age' id='age' value={editAge} />
                            </Col>
                            <h3>Address Details</h3>
                            <Col md='12' className='mb-2'>
                                <Label className='form-label' for='address'>Address</Label>
                                <Input type='textarea' placeholder='Enter Address' name='address' id='address' value={editAddress} onChange={e => setEditAddress(e.target.value)} />
                            </Col>
                            <Col md='6' className='mb-2'>
                                <Label className='form-label' for='mobile'>
                                    <span className='text-danger'>*</span>Mobile Number
                                </Label>
                                <Input type='number' placeholder='Enter Mobile Num' name='mobile' id='mobile' value={editMobile} onChange={e => setEditMobile(e.target.value)} invalid={editDisplay && editMobile === ''} />
                                {editDisplay && !editMobile ? <span className='error_msg_lbl'>Enter Mobile Number </span> : null}
                            </Col>
                            <Col md='6' className='mb-2'>
                                <Label className='form-label' for='email'>
                                    <span className='text-danger'>*</span>Email ID
                                </Label>
                                <Input type='text' placeholder='Enter Email' name='email' id='email' value={editEmail} onChange={e => setEditEmail(e.target.value)} invalid={editDisplay && editEmail === ''} />
                                {editDisplay && !editEmail ? <span className='error_msg_lbl'>Enter Email </span> : null}
                            </Col>
                            <Col md='6' className='mb-2'>
                                <Label className='form-label' for='gst'>GST</Label>
                                <Input type='text' name='gst' id='gst' value={editGst} onChange={e => setEditGst(e.target.value)} />
                            </Col>
                        </Row>
                        <Row tag='form' className='gy-1 gx-2 mt-75' >
                            <Col className='text-center mt-1' xs={12}>
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

    const DeleteAccountModal = ({ id }) => {
        const data = accounts.filter(accounts => accounts.id === id)

        const handleDeleteAccount = () => {
            setAccounts(accounts.filter(accounts => accounts.id !== id))
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
                    <ModalHeader className='bg-transparent' toggle={() => setDel(!del)}>
                        Are you sure to delete  {data[0]?.firstName} permanently?
                    </ModalHeader>
                    <ModalBody>
                        <Row className='text-center'>
                            <Col xs={12}>
                                <Button color='danger' className='m-1' onClick={handleDeleteAccount}>
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

    const accountSetUpTable = [
        {
            name: '#',
            width: '60px',
            sortable: true,
            selector: row => row.id
        },
        {
            name: "Emp Name",
            sortable: true,
            selector: row => row.firstName
        },
        {
            name: 'Mobile Number',
            selector: row => row.mobile
        },
        {
            name: 'Email Id',
            selector: row => row.email
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
                            setSelected_account(row.id)
                        }} size={15} />
                        <Trash className='me-50' size={15} onClick={() => {
                            setDel(true)
                            setSelected_account(row.id)
                        }} />
                    </Col>
                    <EditAccountModal id={selected_account} />
                    <DeleteAccountModal id={selected_account} />
                </>
            )

        }
    ]
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Account Setup
                    </CardTitle>
                    <Button color='primary' onClick={() => setShow(true)}>Add New Account</Button>
                </CardHeader>
                <CardBody>
                    <Row className='my-1'>
                        <Col>
                            <DataTable
                                noHeader
                                data={accounts}
                                columns={accountSetUpTable}
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
                                <h2>Account Setup</h2>
                                <Button color='primary' onClick={() => setShow(true)}>Add New Account</Button>
                            </CardTitle>
                            <CardText>
                                <DataTable
                                    noHeader
                                    data={accounts}
                                    columns={accountSetUpTable}
                                    className='react-dataTable'
                                />
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row> */}
            <AccountSetupModal open={show} setOpen={setShow} accounts={accounts} setAccounts={setAccounts} />
            <EditAccountModal />
            <DeleteAccountModal />
        </>
    )
}

export default AccountSetup