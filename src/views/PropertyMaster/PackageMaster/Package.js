import { React, useState } from 'react'
import { Button, Card, CardTitle, CardBody, CardText, Input, Row, Col, Modal, ModalHeader, ModalBody, Label, Form, CardHeader } from 'reactstrap'
import DataTable from 'react-data-table-component'
import { Edit, Trash } from 'react-feather'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import toast from 'react-hot-toast'

// let data
// axios.get('https://jsonplaceholder.typicode.com/users').then(response => {
//     data = response.data
// })

const venderOptions = [
    { value: '-', label: '-' },
    { value: 'Vendor 1', label: 'Vendor 1' },
    { value: 'Vendor 2', label: 'Vendor 2' },
    { value: 'Vendor 3', label: 'Vendor 3' }
]
const roomTypes = [
    { value: 'Deluxe', label: 'Deluxe' },
    { value: 'Normal', label: 'Normal' },
    { value: 'Executive', label: 'Executive' }
]
const colorOptions = [
    { value: 'WiFi', label: 'WiFi', color: '#00B8D9' },
    { value: 'Swimming Pool', label: 'Swimming Pool', color: '#0052CC' },
    { value: 'Theartre', label: 'Theartre', color: '#5243AA' },
    { value: 'Pool', label: 'Pool', color: '#FF5630' },
    { value: 'Full Day Sight Seeing', label: 'Full Day Sight Seeing', color: '#FF8B00' },
    { value: 'TV', label: 'TV', color: '#FFC400' },
    { value: 'Pickup', label: 'Pickup', color: '#FFC400' },
    { value: 'Half Day Sight Seeing', label: 'Half Day Sight Seeing', color: '#FFC400' },
    { value: 'K', label: 'K', color: '#FFC400' },
    { value: 'Candle Light Dinner', label: 'Candle Light Dinner', color: '#FFC400' },
    { value: 'Monument Tickets', label: 'Monument Tickets', color: '#FFC400' },
    { value: 'Tea Party', label: 'Tea Party', color: '#FFC400' },
    { value: 'Late Check-Out', label: 'Late Check-Out', color: '#FFC400' }
]

const Package = () => {

    const [show, setShow] = useState(false)
    const handleModal = () => setShow(!show)

    const [showEdit, setShowEdit] = useState(false)
    const handleEditModal = () => setShowEdit(!showEdit)

    const [selected_package, setSelected_package] = useState()

    const [del, setDel] = useState(false)

    const [packages, setPackages] = useState([
        {
            id: '1',
            packageName: 'abc',
            roomType: 'abc',
            adult: '4',
            child: '2',
            dayRange: '5',
            bookings: 'All Bookings',
            specificBookings: '4',
            addOnService: 'abc',
            amount: '2000',
            description: 'abc',
            cancelPolicy: 'xyz'
        }
    ])

    const NewPackageModal = () => {
        const [packageName, setPackageName] = useState('')
        const [roomType, setRoomType] = useState('')
        const [adult, setAdult] = useState('')
        const [child, setChild] = useState('')
        const [dayRange, setDayRange] = useState('')
        const [bookings, setBookings] = useState('')
        const [arrivals, setArrivals] = useState('')
        const [addOnService, setAddOnService] = useState('')
        const [amount, setAmount] = useState('')
        const [description, setDescription] = useState('')
        const [cancelPolicy, setCancelPolicy] = useState('')

        const [display, setDisplay] = useState(false)

        const Bookings = (e) => {
            setBookings(e.target.value)
        }

        const Arrivals = (e) => {
            setArrivals(e.target.value)
        }

        const packageObj = {
            id: Math.floor(Math.random() * 100),
            packageName,
            roomType,
            adult,
            child,
            dayRange,
            bookings,
            arrivals,
            addOnService,
            amount,
            description,
            cancelPolicy
        }

        const handleSubmit = () => {
            setDisplay(true)
            if (packageName && amount && bookings && dayRange !== '') {
                setPackages([...packages, packageObj])
                handleModal()
                toast.success('Package Added!', { position: "top-center" })
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
                    isOpen={show}
                    toggle={handleModal}
                    className='modal-dialog-centered modal-lg'
                    backdrop={false}
                >
                    <ModalHeader className='bg-transparent' toggle={handleModal}>
                       Package Master
                    </ModalHeader>
                    <ModalBody className='px-sm-2 mx-50 pb-5'>
                        <Form>
                            <Row>
                                <Col md='6' className='mb-2'>
                                    <Label className='form-label' for='packageName'>
                                        <span className='text-danger'>*</span>Package Name
                                    </Label>
                                    <Input type='text' name='packageName' id='packageName' placeholder='Enter Name' value={packageName} onChange={e => setPackageName(e.target.value)} invalid={display && packageName === ''} />
                                    {display && !packageName ? <span className='error_msg_lbl'>Enter Package Name </span> : null}
                                </Col>
                                <Col md='6' className='mb-2'>
                                    <Label className='form-label' for='roomType'>
                                        <span className='text-danger'>*</span>Room Type
                                    </Label>
                                    <Select
                                        theme={selectThemeColors}
                                        className='react-select w-100'
                                        classNamePrefix='select'
                                        defaultValue={roomTypes}
                                        options={roomTypes}
                                        isClearable={false}
                                        onChange={e => setRoomType(e.value)}
                                        invalid={display && roomType === ''}
                                    />
                                    {display && !roomType ? <span className='error_msg_lbl'>Enter Room Type </span> : null}
                                </Col>

                                <Col md='6' className='mb-2'>
                                    <Label className='form-label' for='adult'>Max Adult</Label>
                                    <Input type='text' name='adult' id='adult' placeholder='Count' value={adult} onChange={e => setAdult(e.target.value)} />
                                </Col>
                                <Col md='6' className='mb-2'>
                                    <Label className='form-label' for='child'>Max Child</Label>
                                    <Input type='text' name='child' id='child' placeholder='Count' value={child} onChange={e => setChild(e.target.value)} />
                                </Col>
                                <Col md='6' className='mb-2'>
                                    <Label className='form-label' for='dayRange'>
                                        <span className='text-danger'>*</span>Stay Day Range
                                    </Label>
                                    <Input type='text' name='dayRange' id='dayRange' placeholder='Count' value={dayRange} onChange={e => setDayRange(e.target.value)} invalid={display && dayRange === ''} />
                                    {display && !dayRange ? <span className='error_msg_lbl'>Enter Day Range </span> : null}
                                </Col>
                                <Col md='6' className='mb-2'>
                                    <Label className='form-label' for='bookingMethod'>Booking Method</Label>
                                    <div className='form-check'>
                                        <Input type='radio' name='bookingMethod' id='booking1' value="All Bookings" checked={bookings === "All Bookings"} onChange={(e) => {
                                            Bookings(e)
                                        }} />
                                        <Label className='form-check-label' for='yes'>
                                            For All Bookings
                                        </Label>
                                        <br />
                                        <Input type='radio' name='bookingMethod' id='booking2' className='mt-1' value="Specific Bookings" checked={bookings === "Specific Bookings"} onChange={(e) => Bookings(e)} />
                                        <Label className='form-check-label mt-1' for='no' >
                                            For Specific Booking Dates
                                        </Label>
                                        {display && !bookings ? <span className='error_msg_lbl d-block'>Please Select Something </span> : null}
                                    </div>
                                </Col>
                                <Col md='6' className='mb-2'>
                                    <Label className='form-label'>Arrival Method</Label>
                                    <div className='form-check'>
                                        <Input type='radio' name='arrivalMethod' id='arrivalMethod1' value="All Arrivals" checked={arrivals === "All Arrivals"} onChange={(e) => {
                                            Arrivals(e)
                                        }} />
                                        <Label className='form-check-label' for='yes'>
                                            For All Arrivals
                                        </Label>
                                        <br />
                                        <Input type='radio' name='arrivalMethod' id='arrivalMethod2' className='mt-1' value="Specific Arrivals" checked={arrivals === "Specific Arrivals"} onChange={(e) => Arrivals(e)} />
                                        <Label className='form-check-label mt-1' for='no' >
                                            For Specific Arrival Dates
                                        </Label>
                                    </div>
                                </Col>
                                <Col md='6' className='mb-2'>
                                    <Label className='form-label' for='addOnService'>AddOn Services</Label>
                                    <Select
                                        isClearable={false}
                                        theme={selectThemeColors}
                                        defaultValue={[colorOptions[2], colorOptions[3]]}
                                        isMulti
                                        name='colors'
                                        options={colorOptions}
                                        className='react-select'
                                        classNamePrefix='select'
                                        value={addOnService}
                                        onChange={e => setAddOnService(e.value)}
                                    />
                                </Col>
                                <Col md='6' className='mb-2'>
                                    <Label className='form-label' for='amount'>
                                        <span className='text-danger'>*</span>Amount
                                    </Label>
                                    <Input type='number' name='amount' id='amount' placeholder='Amount' value={amount} onChange={e => setAmount(e.target.value)} invalid={display && amount === ''} />
                                    {display && !amount ? <span className='error_msg_lbl'>Enter Amount </span> : <></>}
                                </Col>
                                <Col md='6' className='mb-2'>
                                    <Label className='form-label' for='description'>Description</Label>
                                    <Input type='text' name='description' id='description' placeholder='Package Details' value={description} onChange={e => setDescription(e.target.value)} />
                                </Col>
                                <Col md='6' className='mb-2'>
                                    <Label className='form-label' for='cancelPolicy'>Cancel Policy</Label>
                                    <Select
                                        theme={selectThemeColors}
                                        className='react-select w-100'
                                        classNamePrefix='select'
                                        defaultValue={venderOptions}
                                        options={venderOptions}
                                        isClearable={false}
                                        value={cancelPolicy}
                                        onChange={e => setCancelPolicy(e.value)}
                                    />
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
                                        onClick={() => {
                                            setShow(!show)
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
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

    const EditPackageModal = ({ id }) => {

        const packageData = packages.filter(pack => pack.id === id)

        const [editPackageName, setEditPackageName] = useState(packageData[0]?.packageName)
        const [editRoomType, setEditRoomType] = useState(packageData[0]?.roomType)
        const [editAdult, setEditAdult] = useState(packageData[0]?.adult)
        const [editChild, setEditChild] = useState(packageData[0]?.child)
        const [editDayRange, setEditDayRange] = useState(packageData[0]?.dayRange)
        const [editBookings, setEditBookings] = useState(packageData[0]?.bookings)
        const [editArrivals, setEditArrivals] = useState(packageData[0]?.arrivals)
        const [editAddOnService, setEditAddOnService] = useState(packageData[0]?.addOnService)
        const [editAmount, setEditAmount] = useState(packageData[0]?.amount)
        const [editDescription, setEditDescription] = useState(packageData[0]?.description)
        const [editCancelPolicy, setEditCancelPolicy] = useState(packageData[0]?.cancelPolicy)

        const [editDisplay, setEditDisplay] = useState(false)

        const EditBookings = (e) => {
            setEditBookings(e.target.value)
        }

        const EditArrivals = (e) => {
            setEditArrivals(e.target.value)
        }

        const editHandleSubmit = () => {
            setEditDisplay(true)
            if (editPackageName && editDayRange && editBookings && editAmount !== '') {
                packages.map(pack => {
                    if (pack.id === id) {
                        pack.packageName = editPackageName
                        pack.roomType = editRoomType
                        pack.adult = editAdult
                        pack.child = editChild
                        pack.dayRange = editDayRange
                        pack.bookings = editBookings
                        pack.arrivals = editArrivals
                        pack.addOnService = editAddOnService
                        pack.amount = editAmount
                        pack.description = editDescription
                        pack.cancelPolicy = editCancelPolicy
                    }
                })
                handleEditModal()
                toast.success('Package Edited Succesfully!', { position: "top-center" })
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
                       Edit Package Master
                    </ModalHeader>
                    <ModalBody className='px-sm-2 mx-50 pb-5'>
                        <Form>
                            <Row>
                                <Col md='6' className='mb-2'>
                                    <Label className='form-label' for='packageName'>
                                        <span className='text-danger'>*</span>Package Name
                                    </Label>
                                    <Input type='text' name='packageName' id='packageName' placeholder='Enter Name' value={editPackageName} onChange={e => setEditPackageName(e.target.value)} invalid={editDisplay && editPackageName === ''} />
                                    {editDisplay && !editPackageName ? <span className='error_msg_lbl'>Enter Package Name </span> : null}
                                </Col>
                                <Col md='6' className='mb-2'>
                                    <Label className='form-label' for='roomType'>Room Type</Label>
                                    <Select
                                        theme={selectThemeColors}
                                        className='react-select w-100'
                                        classNamePrefix='select'
                                        defaultValue={roomTypes}
                                        options={roomTypes}
                                        isClearable={false}
                                        onChange={e => setEditRoomType(e.value)}
                                        invalid={editDisplay && editRoomType === ''}
                                    />
                                    {editDisplay && !editRoomType ? <span className='error_msg_lbl'>Enter Room Type </span> : null}
                                </Col>

                                <Col md='6' className='mb-2'>
                                    <Label className='form-label' for='adult'>Max Adult</Label>
                                    <Input type='text' name='adult' id='adult' placeholder='Count' value={editAdult} onChange={e => setEditAdult(e.target.value)} />
                                </Col>
                                <Col md='6' className='mb-2'>
                                    <Label className='form-label' for='child'>Max Child</Label>
                                    <Input type='text' name='child' id='child' placeholder='Count' value={editChild} onChange={e => setEditChild(e.target.value)} />
                                </Col>
                                <Col md='6' className='mb-2'>
                                    <Label className='form-label' for='dayRange'>
                                        <span className='text-danger'>*</span>Stay Day Range
                                    </Label>
                                    <Input type='text' name='dayRange' id='dayRange' placeholder='Count' value={editDayRange} onChange={e => setEditDayRange(e.target.value)} invalid={editDisplay && editDayRange === ''} />
                                    {editDisplay && !editDayRange ? <span className='error_msg_lbl'>Enter Day Range </span> : null}
                                </Col>
                                <Col md='6' className='mb-2'>
                                    <Label className='form-label' for='bookingMethod'>Booking Method</Label>
                                    <div className='form-check'>
                                        <Input type='radio' name='bookingMethod' id='booking1' value="All Bookings" checked={editBookings === "All Bookings"} onChange={(e) => {
                                            EditBookings(e)
                                        }} />
                                        <Label className='form-check-label' for='yes'>
                                            For All Bookings
                                        </Label>
                                        <br />
                                        <Input type='radio' name='bookingMethod' id='booking2' className='mt-1' value="Specific Bookings" checked={editBookings === "Specific Bookings"} onChange={(e) => EditBookings(e)} />
                                        <Label className='form-check-label mt-1' for='no' >
                                            For Specific Booking Dates
                                        </Label>
                                    </div>
                                    {editDisplay && !editBookings ? <span className='error_msg_lbl d-block'>Please Select Something </span> : null}
                                </Col>
                                <Col md='6' className='mb-2'>
                                    <Label className='form-label'>Arrival Method</Label>
                                    <div className='form-check'>
                                        <Input type='radio' name='arrivalMethod' id='arrivalMethod1' value="All Arrivals" checked={editArrivals === "All Arrivals"} onChange={(e) => {
                                            EditArrivals(e)
                                        }} />
                                        <Label className='form-check-label' for='yes'>
                                            For All Arrivals
                                        </Label>
                                        <br />
                                        <Input type='radio' name='arrivalMethod' id='arrivalMethod2' className='mt-1' value="Specific Arrivals" checked={editArrivals === "Specific Arrivals"} onChange={(e) => EditArrivals(e)} />
                                        <Label className='form-check-label mt-1' for='no' >
                                            For Specific Arrival Dates
                                        </Label>
                                    </div>
                                </Col>
                                <Col md='6' className='mb-2'>
                                    <Label className='form-label' for='addOnService'>AddOn Services</Label>
                                    <Select
                                        isClearable={false}
                                        theme={selectThemeColors}
                                        defaultValue={[colorOptions[2], colorOptions[3]]}
                                        isMulti
                                        name='colors'
                                        options={colorOptions}
                                        className='react-select'
                                        classNamePrefix='select'
                                        onChange={e => setEditAddOnService(e.value)}
                                    />
                                </Col>
                                <Col md='6' className='mb-2'>
                                    <Label className='form-label' for='amount'>
                                        <span className='text-danger'>*</span>Amount
                                    </Label>
                                    <Input type='number' name='amount' id='amount' placeholder='Amount' value={editAmount} onChange={e => setEditAmount(e.target.value)} invalid={editDisplay && editAmount === ''} />
                                    {editDisplay && !editAmount ? <span className='error_msg_lbl'>Enter Amount </span> : null}
                                </Col>
                                <Col md='6' className='mb-2'>
                                    <Label className='form-label' for='description'>Description</Label>
                                    <Input type='text' name='description' id='description' placeholder='Package Details' value={editDescription} onChange={e => setEditDescription(e.target.value)} />
                                </Col>
                                <Col md='6' className='mb-2'>
                                    <Label className='form-label' for='cancelPolicy'>Cancel Policy</Label>
                                    <Select
                                        theme={selectThemeColors}
                                        className='react-select w-100'
                                        classNamePrefix='select'
                                        defaultValue={venderOptions}
                                        options={venderOptions}
                                        isClearable={false}
                                        onChange={e => setEditCancelPolicy(e.value)}
                                    />
                                </Col>
                            </Row>
                            <Row className='gy-1 gx-2 mt-75' >
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
                        </Form>
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

    const DeletePackageModal = ({ id }) => {

        const data = packages.filter(packages => packages.id === id)

        const handleDeletePackage = () => {
            setPackages(packages.filter(packages => packages.id !== id))
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
                        Are you sure to delete  {data[0]?.packageName} permanently?
                    </ModalHeader>
                    <ModalBody>
                        <Row className='text-center'>
                            <Col xs={12}>
                                <Button color='danger' className='m-1' onClick={handleDeletePackage}>
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

    const packageTable = [
        {
            name: 'ID',
            width: '120px',
            sortable: true,
            selector: row => row.id
        },
        {
            name: "Package Name",
            selector: row => row.packageName
        },
        {
            name: 'Room RatePlan',
            selector: row => row.amount
        },
        {
            name: 'Day Range',
            selector: row => row.dayRange
        },
        {
            name: 'Booking Method',
            selector: row => row.bookings
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
                            setSelected_package(row.id)
                        }} size={15} />
                        <Trash className='me-50' size={15} onClick={() => {
                            setDel(true)
                            setSelected_package(row.id)
                        }} />
                    </Col>
                    <EditPackageModal id={selected_package} />
                    <DeletePackageModal id={selected_package} />
                </>
            )

        }
    ]
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Package
                    </CardTitle>
                    <Button color='primary' onClick={() => setShow(true)}>Add New Package</Button>
                </CardHeader>
                <CardBody>
                    <Row className='my-1'>
                        <Col>
                            <DataTable
                                noHeader
                                data={packages}
                                columns={packageTable}
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
                                <h2>Package</h2>
                                <Button color='primary' onClick={() => setShow(true)}>Add New Package</Button>
                            </CardTitle>
                            <CardText>
                                <DataTable
                                    noHeader
                                    data={packages}
                                    columns={packageTable}
                                    className='react-dataTable'
                                />
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row> */}
            <NewPackageModal />
            <EditPackageModal />
            <DeletePackageModal />
        </>
    )
}

export default Package