import { useState } from "react"
import Select from 'react-select'
import toast from "react-hot-toast"
import { selectThemeColors } from '@utils'
import { Button, Col, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, Row, Spinner } from "reactstrap"
import axios from '../../../API/axios'

const roomSize = [
    { value: 'sq ft', label: 'sq ft' },
    { value: 'sq m', label: 'sq m' }
]

const AddNewRoom = ({ open, handleNewRoom, roomDetailsList, roomTypeDropDownOptions, bedTypeDropDownOptions, extraBedTypeDropDownOptions, roomViewOptions, statusOptions, dropdownLoader, handleRoomType, setRoomTypeID, RoomTypeID, handleBedType, setBedTypeID, BedTypeID, handleExtraBedType, setExtraBedTypeID, ExtraBedTypeID, handleRoomView, setRoomViewID, RoomViewID, handleRoomStatus, setRoomStatusID, RoomStatusID }) => {

    // const [RoomTypeID, setRoomTypeID] = useState("")
    const [RoomDisplayName, SetRoomDisplayName] = useState("")
    // const [BedTypeID, setBedTypeID] = useState("")
    // const [RoomViewID, setRoomViewID] = useState("")
    // const [ExtraBedTypeID, setExtraBedTypeID] = useState("")
    const [RoomRate, setRoomRate] = useState("")
    const [submit, setSubmit] = useState(false)
    const [roomSizeInput, setRoomSizeInput] = useState('')
    const [roomSizeSelect, setRoomSizeSelect] = useState('')
    const [AdultBase, setAdultBase] = useState('')
    const [ChildBase, setChildBase] = useState('')
    const [AdultMax, setAdultMax] = useState('')
    const [ChildMax, setChildMax] = useState('')
    const [InfantMax, setInfantMax] = useState('')
    const [GuestMax, setGuestMax] = useState('')
    const [ExtraAdultPrice, setExtraAdultPrice] = useState('')
    const [ExtraChildPrice, setExtraChildPrice] = useState('')
    // const [RoomStatusID, setRoomStatusID] = useState('')

    const userId = localStorage.getItem('user-id')

    let gstRate = 0
    if (RoomRate >= 0 && RoomRate <= 999) {
        gstRate = 0
    } else if (RoomRate >= 1000 && RoomRate <= 7499) {
        gstRate = 12
    } else if (RoomRate >= 7500) {
        gstRate = 18
    }

    const halfGst = gstRate / 2

    const RoomSize = roomSizeInput.concat(`!@$${roomSizeSelect}`)

    const totalTax = RoomRate / gstRate * 100

    const totalAmount = totalTax + RoomRate

    const reset = () => {
        setRoomTypeID('')
        SetRoomDisplayName('')
        setBedTypeID('')
        setRoomViewID('')
        setExtraBedTypeID('')
        setRoomRate('')
        setRoomSizeInput('')
        setRoomSizeSelect('')
        setAdultBase('')
        setChildBase('')
        setAdultMax('')
        setChildMax('')
        setInfantMax('')
        setGuestMax('')
        setExtraAdultPrice('')
        setExtraChildPrice('')
        setRoomStatusID('')
        // setSubmit(false)
    }

    const roomDetailsInsert = () => {
        try {
            const roomDetailsInsertBody = {
                LoginID: userId,
                Token: "123",
                Seckey: "abc",
                Event: "insert",
                RoomTypeID,
                RoomViewID,
                BedTypeID,
                ExtraBedTypeID,
                Amenities: "AC, Bathtub",
                Location: null,
                RoomRate,
                CGST_P: halfGst,
                SGST_P: halfGst,
                IGST_P: gstRate,
                TotalTax: totalTax,
                TotalAmount: totalAmount,
                RoomDesc: "abc",
                RoomDisplayName,
                RoomSize,
                AdultBase,
                AdultMax,
                InfantMax,
                ChildBase,
                ChildMax,
                GuestMax,
                ExtraAdultPrice,
                ExtraChildPrice,
                RoomStatusID,
                CompanyID: "COM001"
            }
            axios.post(`/getdata/bookingdata/roomdetails`, roomDetailsInsertBody)
                .then(() => {
                    roomDetailsList()
                })
        } catch (error) {
            console.log("Room Details Error", error.message)
        }
    }

    const handleAddRoom = () => {
        setSubmit(true)
        if (RoomTypeID && RoomDisplayName.trim() && BedTypeID && ExtraBedTypeID && RoomViewID && RoomRate && roomSizeInput !== '') {
            roomDetailsInsert()
            handleNewRoom()
            toast.success("New Room Details Added", { position: 'top-center' })
            // setSubmit(false)
            reset()
        }
    }

    return (
        <>
            <Modal
                isOpen={open}
                className='modal-dialog-centered modal-lg'
            >
                <ModalHeader className='bg-transparent' toggle={() => {
                    handleNewRoom()
                }}>
                    Room Details
                </ModalHeader>
                {
                    !dropdownLoader ? (
                        <>
                            <ModalBody className='px-sm-2 mx-50 pb-5'>
                                {
                                    // !(roomTypeDropDown && bedTypeDropDown && extraBedTypeDropDown && roomViewsList) ? (
                                    //     <span color="danger">Error fetching dropdown data</span>
                                    // ) : <></>
                                }
                                <Row>
                                    <Col md='6' className='mb-2'>
                                        <Label className='form-label'>Room Type</Label>
                                        <Select
                                            theme={selectThemeColors}
                                            className='react-select w-100'
                                            classNamePrefix='select'
                                            options={roomTypeDropDownOptions}
                                            value={roomTypeDropDownOptions?.filter(c => c.value === RoomTypeID)}
                                            onChange={data => {
                                                handleRoomType(data.value)
                                            }}
                                            invalid={submit && RoomTypeID === ''}
                                        />
                                        {submit && RoomTypeID === "" && <p className='text-danger'>Room Type is required</p>}
                                    </Col>
                                    <Col md='6' className='mb-2'>
                                        <Label className='form-label'>Display Name</Label>
                                        <Input
                                            type='text'
                                            placeholder='Display Name goes here'
                                            value={RoomDisplayName}
                                            onChange={e => SetRoomDisplayName(e.target.value)}
                                            invalid={submit && RoomDisplayName.trim() === ''}
                                        />
                                        {submit && RoomDisplayName.trim() === '' && <FormFeedback>Display Name is required</FormFeedback>}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md='6' className='mb-2'>
                                        <Label className='form-label'>Bed Type</Label>
                                        <Select
                                            theme={selectThemeColors}
                                            className='react-select w-100'
                                            classNamePrefix='select'
                                            options={bedTypeDropDownOptions}
                                            value={bedTypeDropDownOptions?.filter(c => c.value === BedTypeID)}
                                            onChange={e => {
                                                handleBedType(e.value)
                                            }}
                                            invalid={submit && BedTypeID === ''}
                                        />
                                        {submit && BedTypeID === '' && <p className='text-danger'>Bed Type is required</p>}
                                    </Col>
                                    <Col md='6' className='mb-2'>
                                        <Label className='form-label'>Extra Bed Type</Label>
                                        <Select
                                            theme={selectThemeColors}
                                            className='react-select w-100'
                                            classNamePrefix='select'
                                            options={extraBedTypeDropDownOptions}
                                            value={extraBedTypeDropDownOptions?.filter(c => c.value === ExtraBedTypeID)}
                                            onChange={e => {
                                                handleExtraBedType(e.value)
                                            }}
                                            invalid={submit && ExtraBedTypeID === ''}
                                        />
                                        {submit && ExtraBedTypeID === '' && <p className='text-danger'>Extra Bed Type is required</p>}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md='6' className='mb-2'>
                                        <Label className='form-label'>Room view</Label>
                                        <Select
                                            theme={selectThemeColors}
                                            className='react-select w-100'
                                            classNamePrefix='select'
                                            options={roomViewOptions}
                                            value={roomViewOptions?.filter(c => c.value === RoomViewID)}
                                            onChange={e => {
                                                handleRoomView(e.value)
                                            }}
                                            invalid={submit && RoomViewID === ''}
                                        />
                                        {submit && RoomViewID === '' && <p className='text-danger'>Room View is required</p>}
                                    </Col>
                                    <Col md='6'>
                                        <Label className='form-label'>Room Rate</Label>
                                        <Input
                                            type='number'
                                            placeholder='Enter Room Rate'
                                            value={RoomRate}
                                            onChange={e => setRoomRate(e.target.value)}
                                            invalid={submit && RoomRate.trim() === ''}
                                        />
                                        {submit && RoomRate.trim() === '' && <FormFeedback>Room Rate is required</FormFeedback>}
                                    </Col>
                                    <Col md='6' className='mb-2'>
                                        <Label className='form-label' for='ExtraAdultPrice'>Extra Adult Price</Label>
                                        <Input type='text' name='ExtraAdultPrice' id='ExtraAdultPrice' value={ExtraAdultPrice} onChange={e => setExtraAdultPrice(e.target.value)} />
                                    </Col>
                                    <Col md='6' className='mb-2'>
                                        <Label className='form-label' for='ExtraChildPrice'>Extra Child Price</Label>
                                        <Input type='text' name='ExtraChildPrice' id='ExtraChildPrice' value={ExtraChildPrice} onChange={e => setExtraChildPrice(e.target.value)} />
                                    </Col>
                                    <Col md='6' className='mb-2'>
                                        <Label className='form-label'>Room Size</Label>
                                        <div className='d-flex'>
                                            <div>
                                                <Input type='number' placeholder='Enter size' className='me-2' value={roomSizeInput} onChange={e => setRoomSizeInput(e.target.value)} invalid={submit && roomSizeInput === ''} />
                                                {submit && roomSizeInput === '' && <FormFeedback>Room Size is required</FormFeedback>}
                                            </div>
                                            <Select
                                                theme={selectThemeColors}
                                                className='react-select w-100'
                                                classNamePrefix='select'
                                                defaultValue={roomSize[0]}
                                                options={roomSize}
                                                isClearable={false}
                                                value={roomSize?.filter(c => c.value === roomSizeSelect)}
                                                onChange={e => setRoomSizeSelect(e.value)}
                                            />
                                        </div>
                                    </Col>
                                    <Col>
                                        <Label className='form-label'>Room Status</Label>
                                        <Select
                                            theme={selectThemeColors}
                                            className='react-select w-100'
                                            classNamePrefix='select'
                                            placeholder='Select Room status'
                                            options={statusOptions}
                                            value={statusOptions?.filter(c => c.value === RoomStatusID)}
                                            onChange={e => {
                                                handleRoomStatus(e.value)
                                            }}
                                        />
                                        {submit && RoomStatusID === '' && <span className='text-danger'>Room Status is required</span>}
                                    </Col>
                                    <h2 className=' mb-1'>Room Occupancy</h2>
                                    <Col md='6' className='mb-2'>
                                        <Label className='form-label' for='AdultBase'>Adults (Base)</Label>
                                        <Input type='text' name='AdultBase' id='AdultBase' value={AdultBase} onChange={e => setAdultBase(e.target.value)} />
                                    </Col>
                                    <Col md='6' className='mb-2'>
                                        <Label className='form-label' for='ChildBase'>Child (Base)</Label>
                                        <Input type='text' name='ChildBase' id='ChildBase' value={ChildBase} onChange={e => setChildBase(e.target.value)} />
                                    </Col>
                                    <Col md='6' className='mb-2'>
                                        <Label className='form-label' for='AdultMax'>Adults (Max)</Label>
                                        <Input type='text' name='AdultMax' id='AdultMax' value={AdultMax} onChange={e => setAdultMax(e.target.value)} />
                                    </Col>
                                    <Col md='6' className='mb-2'>
                                        <Label className='form-label' for='ChildMax'>Child (Max)</Label>
                                        <Input type='text' name='ChildMax' id='ChildMax' value={ChildMax} onChange={e => setChildMax(e.target.value)} />
                                    </Col>
                                    <Col md='6' className='mb-2'>
                                        <Label className='form-label' for='InfantMax'>Infant (Max)</Label>
                                        <Input type='text' name='InfantMax' id='InfantMax' value={InfantMax} onChange={e => setInfantMax(e.target.value)} />
                                    </Col>
                                    <Col md='6' className='mb-2'>
                                        <Label className='form-label' for='GuestMax'>Guest (Max)</Label>
                                        <Input type='text' name='GuestMax' id='GuestMax' value={GuestMax} onChange={e => setGuestMax(e.target.value)} />
                                    </Col>
                                </Row>
                                <Row tag='form' className='gy-1 gx-2 mt-75' >
                                    <Col className='text-center mt-1' xs={12}>
                                        <Button className='me-1' color='primary' onClick={handleAddRoom}>
                                            Submit
                                        </Button>
                                        <Button
                                            color='secondary'
                                            outline
                                            onClick={() => {
                                                handleNewRoom()
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </Col>
                                </Row>
                            </ModalBody>
                        </>
                    ) : (

                        <div style={{ height: '150px' }}>
                            <Spinner color="primary" style={{ marginTop: '50px', marginLeft: '50%' }} />
                        </div>
                    )

                }

            </Modal>
        </>
    )
}

export default AddNewRoom