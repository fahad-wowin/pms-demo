import React, { useState, useEffect } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Form, Badge, UncontrolledDropdown, Input, DropdownToggle, Modal, ModalBody, ModalHeader, Row, DropdownMenu, DropdownItem } from 'reactstrap'
import { Edit, Trash, MoreVertical, FileText } from 'react-feather'
import toast from 'react-hot-toast'
//import axios from '../../../API/axios'

const UploadedPhoto = ({photo, setPhoto, allLabels, photos, setPhotos, onClick}) => {

    const [labelColor] = useState([
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'dark'
      ])

    //const [showEdit, setShowEdit] = useState(false)
    //const handleEditModal = () => setShowEdit(!showEdit)

//    const [del, setDel] = useState(false)

    const [labels, setLabels] = useState(photo.labels?.split(',')?.map(element => element.trim()))

    const [display, setDisplay] = useState(false)
    const [swich] = useState(`switchStatus_${photo.id}`) // unique id for the switch button
    const [checked, setChecked] = useState(true) // checked is valid, on switch

    const [status, setStatus] = useState(false)
//    const [loader, setLoader] = useState(false)

    const [fullTagList, setFullTagList] = useState(allLabels?.split(',')?.map(element => element.trim()))
    
    const [refresh, setRefresh] = useState(false)

  //  const userId = localStorage.getItem('user-id')

    useEffect(() => {
        /*axios.post(`/getdata/propertymaster/photos`, {
            LoginID: userId,
            Token: "123",
            Seckey: "abc",
            Event: "select"
        })
            .then(tagsResponse => {
                setFullTagList(tagsResponse?.data[0])
                if (fullTagList !== []) { setRefresh(true) }
            })*/
            setStatus(true)
            setRefresh(true) 
            //setFfullTagList = ['Property', 'Hall', 'Kitchen']

    }, [refresh])
    

    const photoEdit = () => {
        console.log(photos)
        console.log(labels)
        console.log(display)
        console.log(status)
        console.log(swich)
        setPhotos(photos)
        setPhoto(photo)
        setLabels(labels)
        setFullTagList(fullTagList)
        try {
            /*const photoInsertBody = {
                LoginID: userId,
                Token: "123",
                Seckey: "abc",
                TagsID,
                Event: "insert",
                Photo? object?
            }
            axios.post(`/getdata/propertymaster/propertyphoto`, photoInsertBody)
                .then(() => {
                    photoList()
                })
                */
                //toast.success('Photo details Edited!', { position: "top-center" })

        } catch (error) {
            console.log("Photo Edit Error", error.message)
            toast.error('Photo Edit error!', { position: "top-center" })

        }

    }

    const handleSubmit = (e) => {
        console.log("->", e.target.checked)
        setChecked(e.target.checked)
        setDisplay(true)
        if (labels !== '') {
            try {
            photoEdit()
            //setPhoto('')
            //setLabels('')
            setDisplay(false)
            } catch {
            setDisplay(true) // TODO - check if logical

            }
        }
    }

    return (
            
            <Card className='mb-50 overflow-hidden'>
                
                <CardHeader className='justify-content-center align-content-center p-0 overflow-hidden ' style={{maxHeight: '175px'}} >
                    
                    <img src={photo.src} alt={photo.filename} width='100%' onClick={onClick}  style={{height: '175px', objectFit: 'cover', mixBlendMode: checked ? 'normal' : 'luminosity', opacity: checked ? '1' : '0.5'}} />
                    {
                        checked ? null : (
                            <div className='me-25 mb-25 position-absolute bottom-0 end-0'>
                                <Badge className='text-secondary opacity-50' color='light'>In-active</Badge>
                            </div>
                        )
                    }
                    <div className='form-check form-switch ps-0 position-absolute bottom-0 start-0'>
                        <Input type='switch' className='ms-25 mb-25'  style={{width: '28px', height: '16px'}} name={swich} id={swich} onChange={handleSubmit} checked={checked}/>
                    </div>
                   
                </CardHeader>
                <CardBody className='px-25 pb-50 pt-25 text-center'>
                {
                    labels.map((label, i) => {
                    return (
                            <Badge key={`${photo.id}_label_${i}`} className={`px-75 me-25 mb-25 cursor-default`} color={labelColor[i < 7 ? i : i % 7]} pill>{label}</Badge>
                        ) 
                    })
                }
                </CardBody>
                {  <>
                     {
                        photo.roomNumber ? ( 
                            <div className='ms-25 mt-25 position-absolute'>
                                <Badge color='dark'>{photo.roomNumber}</Badge>
                            </div>
                        ) : null
                    }
                   </>
                }
                <div className='position-absolute end-0 d-flex'>
                    <UncontrolledDropdown>
                    <DropdownToggle className='ps-50' tag='span'>
                        <MoreVertical size={16} className='m-25 bg-light bg-opacity-50 rounded-circle fs-6 '/>
                    </DropdownToggle>
                    <DropdownMenu end>
                        <DropdownItem className='w-100' onClick={onClick}>
                        <FileText size={15} />
                        <span className='align-middle ms-50'>Open</span>
                        </DropdownItem>

                        <DropdownItem className='w-100' onClick={e => e.preventDefault()}>
                        <Edit size={15} />
                        <span className='align-middle ms-50'>Update</span>
                        </DropdownItem>
                        
                        <DropdownItem className='w-100' onClick={e => e.preventDefault('Validate')}>
                        <Trash color='red' size={15} />
                        <span className='align-middle text-danger ms-50'>Remove</span>
                        </DropdownItem>

                    </DropdownMenu>
                    </UncontrolledDropdown>
                </div> 
            </Card>
    )
}

export default UploadedPhoto