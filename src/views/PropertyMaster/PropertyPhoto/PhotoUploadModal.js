import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { Button, Card, CardBody, Col, Form, Input, Badge, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
//import { selectThemeColors } from '@utils'
import Select from 'react-select'
import { Add, Trash, Star, XCircle } from 'react-feather'
import toast from 'react-hot-toast'

//import axios from '../../../API/axios'

const PhotoUploadModal = ({ open, isRoom, handlePhotoUpload, roomType, allLabels, photos, setPhotos }) => {

    console.log('all labels ,', allLabels)
    const [labelsArray] = useState(allLabels.split(','))
    const [filename, setFilename] = useState('')
    const [src, setSRC] = useState('')
    const [labels, setLabels] = useState('')
    const [roomNumber, setRoomNumber] = useState('')

    const [photo, setPhoto] = useState('')
    const [display, setDisplay] = useState(false)

    const reset = () => {
        setFilename('')
        setSRC('')
        setLabels('')
        setPhoto('')
        setRoomNumber('')
        setDisplay(false)
    }
    const handleSubmit = () => {
        setDisplay(true)
        setSRC(photo)

        const photoObject = {
            roomType,
            filename,
            src,
            labels,
            roomNumber: roomNumber.trim() === "" ? "0" : roomNumber
        }
        console.log('photo > ', photoObject)
        const isEmpty = Object.values(photoObject).some(x => x === null || x === '')
        console.log('isEmpty > ', isEmpty)

        if (!isEmpty) {
            toast.success('photo uploading', { position: "top-center" })
            //setPhotos([...photos])//, photoObject])
            photos.pop()
            photos.push(photoObject)
            if (false) { 
                setPhotos([...photos])//, photoObject]) 
                handlePhotoUpload()
            }
            reset()
        }
        // else {
        //     toast.error('Fill All Fields!', {
        //         position: "top-center",
        //         style: {
        //             minWidth: '250px'
        //         },
        //         duration: 4000
        //     })
        // }
    }

    const [labelColor] = useState([
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'dark'
    ])

    const setPreview = e => {
        e.preventDefault()
        const reader = new FileReader(),
            files = e.target.files
        reader.onload = function () {
            setPhoto(reader.result)
            setSRC(reader.result)
        }
        setFilename(files[0]?.File?.name)
        console.log(files, ":files:", JSON.stringify(files))
        //console.log(FileList[0]?.File?.name, '< filename >', filename)
        console.log(src, ' < photo >', photo)
        reader.readAsDataURL(files[0])
    }

    const addLabel = (lbl) => {
        labels.trim() === '' ? setLabels(lbl.trim()) : setLabels(`${labels}, ${lbl.trim()}`)
    }
    const removeLabel = (lbl) => {
        console.log('tag remove :', lbl)
        if (labels.includes(`, ${lbl.trim()}`)) {
            setLabels(labels.replace(`, ${lbl.trim()}`, ''))
        } else if (labels.includes(`${lbl.trim()}, `)) {
            setLabels(labels.replace(`${lbl.trim()}, `, ''))
        } else {
            setLabels(labels.replace(lbl.trim(), ''))
        }
    }

    return (
        <>
            <Modal
                isOpen={open}
                //toggle={() => {
                //    handlePhotoUpload()
                //    reset()
                //}}
                className='modal-dialog-centered modal-lg'
            //backdrop={false}
            >
                <ModalHeader className='bg-transparent' toggle={() => {
                    handlePhotoUpload()
                    reset()
                }}>
                    <span className=' mb-1'>Add Photo</span>
                </ModalHeader>
                <ModalBody className='px-sm-2 mx-50 pb-1'>
                    <>
                        <Form>
                            <Row>
                                <Col lg='6'>
                                    <Row>
                                        <Col>

                                            <Label className='mt-1' for='RoomType'>
                                                <span className='text-danger'>*</span>Room Type
                                            </Label>


                                            <Input
                                                type='text'
                                                name='RoomType'
                                                id='RoomType'
                                                value={roomType}
                                                readOnly
                                            />
                                            {display === true && !roomType.trim() ? <span className='error_msg_lbl'>Room Type is required </span> : <></>}
                                        </Col>

                                    </Row>
                                    {isRoom ? (
                                        <Row>
                                            <Col>

                                                <Label for='RoomNumber' className='mt-1'>
                                                    <span className='text-danger'>*</span>Room No
                                                </Label>


                                                <Input
                                                    type='text'
                                                    name='RoomNumber'
                                                    id='RoomNumber'
                                                    value={roomNumber}
                                                    onChange={e => setRoomNumber(e.target.value)}
                                                    invalid={display && roomNumber.trim() === ''}
                                                />
                                                {display === true && roomNumber.trim() === '' ? <span className='error_msg_lbl'>Room number is required </span> : <></>}
                                            </Col>

                                        </Row>
                                    ) : null
                                    }
                                    <Row>
                                        <Col>
                                            <Label for='Photo' className='mt-1'>
                                                <span className='text-danger'>*</span>Image File
                                            </Label>

                                            <Input
                                                type='file'
                                                name='Photo'
                                                id='Photo'
                                                accept='image/*'
                                                onChange={e => setPreview(e)}
                                                invalid={display && photo.trim() === ''}
                                            />
                                            {display === true && !photo.trim() ? <span className='error_msg_lbl'>Photo is required </span> : <></>}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Label for='Labels' className='mt-1 w-100'>
                                                <span className='text-danger'>*</span>Labels <span className='float-end'>(add new label separated by comma)</span>
                                            </Label>
                                            <Input
                                                type='text'
                                                name='Labels'
                                                id='Labels'
                                                value={labels}
                                                onChange={e => setLabels(e.target.value)}
                                                invalid={display && labels.trim() === ''}
                                                className='mb-25'
                                            />
                                            {
                                                labelsArray.map((label, i) => {
                                                    return (
                                                        labels.includes(label.trim()) ? (
                                                            <Badge className={` me-50 my-25 cursor-pointer`} onClick={() => removeLabel(label.trim())} key={`label_${i}`} color='light-secondary' pill>
                                                                <XCircle size={12} className='align-middle me-25 text-danger' />
                                                                {label.trim()}
                                                            </Badge>
                                                        ) : (
                                                            <Badge className={`px-1 me-50 my-25 cursor-pointer`} onClick={() => addLabel(label.trim())} key={`label_${i}`} color={labelColor[i < 7 ? i : i % 7]} pill>
                                                                {label.trim()}
                                                            </Badge>
                                                        )
                                                    )
                                                })
                                            }
                                            <br />
                                            {display === true && !labels.trim() ? <span className='error_msg_lbl'>At least one label is required </span> : <></>}

                                        </Col>

                                    </Row>
                                </Col>
                                <Col lg='6 align-self-center '>
                                    <Col className='bg-light d-flex text-center' style={{ minHeight: '300px' }}>
                                        <img src={photo} width='100%' className='align-self-center' style={{ objectFit: 'cover' }} alt='Photo Preview' />
                                    </Col>

                                </Col>

                            </Row>
                            <Row>
                                <Col md='12 my-2 d-flex justify-content-center'>
                                    <Button className='me-2' color='primary' onClick={handleSubmit}>Upload Photo</Button>
                                    <Button
                                        color='secondary'
                                        outline
                                        onClick={
                                            () => {
                                                handlePhotoUpload()
                                                reset()
                                            }
                                        }
                                    >
                                        Cancel
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </>
                </ModalBody>
            </Modal>

        </>

    )
}

export default PhotoUploadModal