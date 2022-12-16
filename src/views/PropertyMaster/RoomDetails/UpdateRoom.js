import React, { useState } from 'react'
import Select from 'react-select'
import toast from "react-hot-toast"
import { selectThemeColors } from '@utils'
import { Button, Col, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, Row, Spinner } from 'reactstrap'
import axios from '../../../API/axios'

const roomSize = [
    { value: 'sq ft', label: 'sq ft' },
    { value: 'sq m', label: 'sq m' }
]

const UpdateRoom = ({ open, handleUpdate, roomTypes, id, roomDetailsList, roomTypeDropDownOptions, bedTypeDropDownOptions, extraBedTypeDropDownOptions, roomViewOptions, statusOptions, dropdownLoader, handleRoomType, editRoomTypeID, handleBedType, editBedTypeID, handleExtraBedType, editExtraBedTypeID, handleRoomView, editRoomViewID, handleRoomStatus, editRoomStatusID }) => {

    const data = roomTypes?.filter(roomDetail => roomDetail.RoomID === id)
    const [statusId] = useState(data[0]?.StatusID)
    const [roomDesc] = useState(data[0]?.RoomDesc)

    // const [editRoomTypeID, setEditRoomTypeID] = useState(data[0]?.RoomTypeID)
    const [editRoomDisplayName, SetEditRoomDisplayName] = useState(data[0]?.RoomDisplayName)
    // const [editBedTypeID, setEditBedTypeID] = useState(data[0]?.BedTypeID)
    // const [editRoomViewID, setEditRoomViewID] = useState(data[0]?.RoomViewID)
    // const [editExtraBedTypeID, setEditExtraBedTypeID] = useState(data[0]?.ExtraBedTypeID)
    const [editRoomRate, setEditRoomRate] = useState(data[0]?.RoomRate)
    const [editSubmit, setEditSubmit] = useState(false)
    const sizeArray = data[0]?.RoomSize ? data[0]?.RoomSize.split('!@$') : ''
    const [editRoomSizeInput, setEditRoomSizeInput] = useState(sizeArray[0])
    const [editRoomSizeSelect, setEditRoomSizeSelect] = useState(sizeArray.length > 1 ? sizeArray[1] : "")
    const [editAdultBase, setEditAdultBase] = useState(data[0]?.AdultBase)
    const [editChildBase, setEditChildBase] = useState(data[0]?.ChildBase)
    const [editAdultMax, setEditAdultMax] = useState(data[0]?.AdultMax)
    const [editChildMax, setEditChildMax] = useState(data[0]?.ChildMax)
    const [editInfantMax, setEditInfantMax] = useState(data[0]?.InfantMax)
    const [editGuestMax, setEditGuestMax] = useState(data[0]?.GuestMax)
    const [editExtraAdultPrice, setEditExtraAdultPrice] = useState(data[0]?.ExtraAdultPrice)
    const [editExtraChildPrice, setEditExtraChildPrice] = useState(data[0]?.ExtraChildPrice)
    // const [editRoomStatusID, setEditRoomStatusID] = useState(data[0]?.RoomStatusID)

    const userId = localStorage.getItem('user-id')

    let gstRate = 0
    if (editRoomRate >= 0 && editRoomRate <= 999) {
        gstRate = 0
    } else if (editRoomRate >= 1000 && editRoomRate <= 7499) {
        gstRate = 12
    } else if (editRoomRate >= 7500) {
        gstRate = 18
    }

    const halfGst = gstRate / 2


    const editTotalTax = editRoomRate * 100 / gstRate

    const editTotalAmount = editTotalTax + editRoomRate

    // const RoomSize = roomSizeInput.concat(`!@$${roomSizeSelect}`)

    const editRoomDetails = () => {
        const editRoomSize = editRoomSizeInput?.concat(`!@$${editRoomSizeSelect}`)

        try {
            const editRoomDetailsBody = {
                LoginID: userId,
                Token: "123",
                Seckey: "abc",
                Event: "update",
                RoomID: id,
                RoomTypeID: editRoomTypeID,
                RoomViewID: editRoomViewID,
                BedTypeID: editBedTypeID,
                ExtraBedTypeID: editExtraBedTypeID,
                Amenities: "AC, Bathtub",
                Location: null,
                RoomRate: editRoomRate,
                CGST_P: halfGst,
                SGST_P: halfGst,
                IGST_P: gstRate,
                TotalTax: editTotalTax,
                TotalAmount: editTotalAmount,
                StatusID: statusId,
                RoomDesc: roomDesc,
                RoomDisplayName: editRoomDisplayName,
                RoomSize: editRoomSize,
                AdultBase: editAdultBase,
                AdultMax: editAdultMax,
                InfantMax: editInfantMax,
                ChildBase: editChildBase,
                ChildMax: editChildMax,
                GuestMax: editGuestMax,
                ExtraAdultPrice: editExtraAdultPrice,
                ExtraChildPrice: editExtraChildPrice,
                RoomStatusID: editRoomStatusID,
                CompanyID: "COM001"
            }
            axios.post(`/getdata/bookingdata/roomdetails`, editRoomDetailsBody)
                .then(response => {
                    console.log("update response", response?.data[0])
                    roomDetailsList()
                })
        } catch (error) {
            console.log("Room Details Update Error")
        }
    }

    const updateRoom = () => {
        setEditSubmit(!editSubmit)
        if (editRoomTypeID && editRoomDisplayName.trim() && editBedTypeID && editExtraBedTypeID && editRoomViewID && editRoomRate && editRoomSizeInput !== '') {
            editRoomDetails()
            toast.success("Room Details Updated Successfully", { position: 'top-center' })
            handleUpdate()
            setEditSubmit(!editSubmit)
        }
    }

    return (
        <>
            <Modal
                isOpen={open}
                toggle={handleUpdate}
                className='modal-dialog-centered modal-lg'
                backdrop={false}
            >
                <ModalHeader className='bg-transparent' toggle={handleUpdate}>
                    Edit Room Details
                </ModalHeader>
                {
                    !dropdownLoader ? (
                        <>
                            <ModalBody className='px-sm-2 mx-50 pb-5'>
                                <Row>
                                    <Col md='6' className='mb-2'>
                                        <Label className='form-label'>Room Type</Label>
                                        <Select
                                            theme={selectThemeColors}
                                            className='react-select w-100'
                                            classNamePrefix='select'
                                            options={roomTypeDropDownOptions}
                                            defaultInputValue={data[0]?.RoomType}
                                            value={roomTypeDropDownOptions?.filter(c => c.value === editRoomTypeID)}
                                            onChange={data => {
                                                handleRoomType(data.value)
                                            }}
                                            invalid={editSubmit && editRoomTypeID === ''}
                                        />
                                        {editSubmit && editRoomTypeID === "" && <p className='text-danger'>Room Type is required</p>}
                                    </Col>
                                    <Col md='6' className='mb-2'>
                                        <Label className='form-label'>Display Name</Label>
                                        <Input
                                            type='text'
                                            placeholder='Display Name goes here'
                                            value={editRoomDisplayName}
                                            onChange={e => SetEditRoomDisplayName(e.target.value)}
                                            invalid={editSubmit && editRoomDisplayName.trim() === ''}
                                        />
                                        {editSubmit && editRoomDisplayName.trim() === '' && <FormFeedback>Display Name is required</FormFeedback>}
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
                                            defaultInputValue={data[0]?.BedType}
                                            value={bedTypeDropDownOptions?.filter(c => c.value === editBedTypeID)}
                                            onChange={e => {
                                                handleBedType(e.value)
                                            }}
                                            invalid={editSubmit && editBedTypeID === ''}
                                        />
                                        {editSubmit && editBedTypeID === '' && <p className='text-danger'>Bed Type is required</p>}
                                    </Col>
                                    <Col md='6' className='mb-2'>
                                        <Label className='form-label'>Extra Bed Type</Label>
                                        <Select
                                            theme={selectThemeColors}
                                            className='react-select w-100'
                                            classNamePrefix='select'
                                            options={extraBedTypeDropDownOptions}
                                            defaultInputValue={data[0]?.ExtraBedType}
                                            value={extraBedTypeDropDownOptions?.filter(c => c.value === editExtraBedTypeID)}
                                            onChange={e => {
                                                handleExtraBedType(e.value)
                                            }}
                                            invalid={editSubmit && editExtraBedTypeID === ''}
                                        />
                                        {editSubmit && editExtraBedTypeID === '' && <p className='text-danger'>Extra Bed Type is required</p>}
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
                                            defaultInputValue={data[0]?.RoomView}
                                            value={roomViewOptions?.filter(c => c.value === editRoomViewID)}
                                            onChange={e => {
                                                handleRoomView(e.value)
                                            }}
                                            invalid={editSubmit && editRoomViewID === ''}
                                        />
                                        {editSubmit && editRoomViewID === '' && <p className='text-danger'>Room View is required</p>}
                                    </Col>
                                    <Col md='6'>
                                        <Label className='form-label'>Room Rate</Label>
                                        <Input
                                            type='number'
                                            placeholder='Enter Room Rate'
                                            value={editRoomRate}
                                            onChange={e => setEditRoomRate(e.target.value)}
                                            invalid={editSubmit && editRoomRate === ''}
                                        />
                                        {editSubmit && editRoomRate.trim() === '' && <FormFeedback>Room Rate is required</FormFeedback>}
                                    </Col>
                                    <Col md='6' className='mb-2'>
                                        <Label className='form-label' for='ExtraAdultPrice'>Extra Adult Price</Label>
                                        <Input type='text' name='ExtraAdultPrice' id='ExtraAdultPrice' value={data[0]?.ExtraAdultPrice} onChange={e => setEditExtraAdultPrice(e.target.value)} />
                                    </Col>
                                    <Col md='6' className='mb-2'>
                                        <Label className='form-label' for='ExtraChildPrice'>Extra Child Price</Label>
                                        <Input type='text' name='ExtraChildPrice' id='ExtraChildPrice' value={data[0]?.ExtraChildPrice} onChange={e => setEditExtraChildPrice(e.target.value)} />
                                    </Col>
                                    <Col md='6' className='mb-2'>
                                        <Label className='form-label'>Room Size</Label>
                                        <div className='d-flex'>
                                            <div>
                                                <Input type='number' placeholder='Enter size' className='me-2' value={editRoomSizeInput} onChange={e => setEditRoomSizeInput(e.target.value)} invalid={editSubmit && editRoomSizeInput === ''} />
                                                {editSubmit && editRoomSizeInput === '' && <FormFeedback>Room Size is required</FormFeedback>}
                                            </div>
                                            <Select
                                                theme={selectThemeColors}
                                                className='react-select w-100'
                                                classNamePrefix='select'
                                                defaultValue={roomSize[0]}
                                                options={roomSize}
                                                isClearable={false}
                                                value={roomSize?.filter(c => c.value === editRoomSizeSelect)}
                                                onChange={e => setEditRoomSizeSelect(e.value)}
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
                                            defaultInputValue={data[0]?.RoomStatus}
                                            value={statusOptions?.filter(c => c.value === editRoomStatusID)}
                                            onChange={e => {
                                                handleRoomStatus(e.value)
                                            }}
                                        />
                                        {editSubmit && editRoomStatusID === '' && <span className='text-danger'>Room Status is required</span>}
                                    </Col>
                                </Row>
                                <Row>
                                    <h2 className=' mb-1'>Room Occupancy</h2>
                                    <Col md='6' className='mb-2'>
                                        <Label className='form-label' for='adultsBase'>Adults (Base)</Label>
                                        <Input type='text' name='editAdultBase' id='editAdultBase' value={data[0]?.AdultBase} onChange={e => setEditAdultBase(e.target.value)} />
                                    </Col>
                                    <Col md='6' className='mb-2'>
                                        <Label className='form-label' for='childBase'>Child (Base)</Label>
                                        <Input type='text' name='editChildBase' id='editChildBase' value={data[0]?.ChildBase} onChange={e => setEditChildBase(e.target.value)} />
                                    </Col>
                                    <Col md='6' className='mb-2'>
                                        <Label className='form-label' for='adultsMax'>Adults (Max)</Label>
                                        <Input type='text' name='editAdultMax' id='editAdultMax' value={data[0]?.AdultMax} onChange={e => setEditAdultMax(e.target.value)} />
                                    </Col>
                                    <Col md='6' className='mb-2'>
                                        <Label className='form-label' for='childMax'>Child (Max)</Label>
                                        <Input type='text' name='editChildMax' id='editChildMax' value={data[0]?.ChildMax} onChange={e => setEditChildMax(e.target.value)} />
                                    </Col>
                                    <Col md='6' className='mb-2'>
                                        <Label className='form-label' for='infantMax'>Infant (Max)</Label>
                                        <Input type='text' name='editInfantMax' id='editInfantMax' value={data[0]?.InfantMax} onChange={e => setEditInfantMax(e.target.value)} />
                                    </Col>
                                    <Col md='6' className='mb-2'>
                                        <Label className='form-label' for='guestMax'>Guest (Max)</Label>
                                        <Input type='text' name='editGuestMax' id='editGuestMax' value={data[0]?.GuestMax} onChange={e => setEditGuestMax(e.target.value)} />
                                    </Col>
                                </Row>
                                <Row tag='form' className='gy-1 gx-2 mt-75' >
                                    <Col className='text-center mt-1' xs={12}>
                                        <Button className='me-1' color='primary' onClick={updateRoom}>
                                            Submit
                                        </Button>
                                        <Button
                                            color='secondary'
                                            outline
                                            onClick={() => handleUpdate()}
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
            {
                open ? (
                    <div class="modal-backdrop fade show" ></div>
                ) : null
            }
        </>
    )
}

export default UpdateRoom