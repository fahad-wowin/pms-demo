import React from 'react'
import toast from "react-hot-toast"
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import axios from '../../../API/axios'

const DeleteRoom = ({ open, handleDelete, roomTypes, id, roomDetailsList }) => {

    const userId = localStorage.getItem('user-id')

    const data = roomTypes.filter(roomDetail => roomDetail.RoomID === id)

    const deleteRoomDetails = () => {
        try {
            const deleteRoomDetailsBody = {
                LoginID: userId,
                Token: "123",
                Seckey: "abc",
                Event: "delete",
                RoomID: id
            }
            axios.post(`/getdata/bookingdata/roomdetails`, deleteRoomDetailsBody)
                .then(() => {
                    roomDetailsList()
                })
        } catch (error) {
            console.log("Room Details Delete Error", error.message)
        }
    }

    const handleDeleteRoom = () => {
        deleteRoomDetails()
        toast.success("Deleted Successfully", { position: 'top-center' })
        handleDelete()
    }

    return (
        <>
            <Modal className='modal-dialog-centered' isOpen={open} toggle={handleDelete} backdrop={false}>
                <ModalHeader className='bg-transparent' toggle={handleDelete}>
                    Are you sure you want to Delete {data[0]?.RoomDisplayName}?
                </ModalHeader>
                <ModalBody>
                    <Row className='text-center'>
                        <Col xs={12}>
                            <Button className='m-1' color='danger' onClick={handleDeleteRoom}>Delete</Button>
                            <Button className='m-1' color='secondary' outline onClick={handleDelete}>Cancel</Button>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
            {
                open ? (
                    <div class="modal-backdrop fade show" ></div>
                ) : null
            }
        </>
    )
}

export default DeleteRoom