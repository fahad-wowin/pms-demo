
import {React, useState} from 'react'
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Badge, Button, Label, Modal, ModalBody, ModalHeader, Input, Row, Col } from 'reactstrap'
import RoomAccordion from './RoomAccordion'
import './accordion.scss'
import PhotoUploadModal from './PhotoUploadModal'
import UploadedPhoto from './UploadedPhoto'
import PhotoCarousel from './PhotoCarousel'


const PropertyAccordion = ({data}) => {

    console.log('data > ', data)
    const [labels] = useState(data.labels.split(',')?.map(element => element.trim()))
    const [selctedFilterLabel, setSelctedFilterLabel] = useState('')

    const [newPhoto, setNewPhoto] = useState(false)
    const [photos, setPhotos] = useState(data.photos)

    const handlePhotoUpload = () => {
      setNewPhoto(!newPhoto)
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
    const [activeIndex, setActiveIndex] = useState(0)
    const [showPhotoGallery, setShowPhotoGallery] = useState(false)
    const [photoGallery, setPhotoGallery] = useState()

    const handleClick = (i, photos) => {
      setShowPhotoGallery(true)
      setPhotoGallery(photos)
      setActiveIndex(i)
    }  
    const filterPhoto = (filterLabel) => {
      setSelctedFilterLabel(filterLabel)
      //alert(filterLabel)
    }
  return (
    <>
      <AccordionItem>
        <AccordionHeader targetId='property_1' >Property Photos</AccordionHeader>
        <AccordionBody accordionId='property_1' className='p-2'>
          This is an apportunity for you to showcase your property. Add amazing photos that detail out how the property looks
          and what it offers. Quality photos help set the right customer expectations. Tip: Upload photos for the available tags below and consider your work done!
          <Row className=''>
            <Col className='col-12 text-center my-1'>

              <Button color='primary' onClick={handlePhotoUpload}>Upload Photo</Button>
              <PhotoUploadModal open={newPhoto} handlePhotoUpload={handlePhotoUpload} allLabels={data.labels} roomType={'Property'} photos={photos} setPhotos={setPhotos} />
           
            </Col>

            <Col className='col-12 align-self-center text-center mb-1'>
              <Badge className={`px-2 me-1 my-50 cursor-pointer ${selctedFilterLabel === '' ? 'badge-glow bg-secondary ' : '' }`} onClick={() => filterPhoto('')} key={`label_`} color='light-secondary' pill>All</Badge>

              {
                labels.map((label, i) => {
                   return (
                      <Badge className={`px-1 me-1 my-50 cursor-pointer ${selctedFilterLabel === label ? 'badge-glow' : '' }`} onClick={() => filterPhoto(label)} key={`label_${i}`} color={labelColor[i < 7 ? i : i % 7]} pill>{label}</Badge>
                   ) 
                })
              }
            </Col>
          </Row>
          <Row>
              
              {
                photos.map((img, i) => {
                  //console.log("avat >", photo.src)
                  const [photo, setPhoto] = useState(img)
                  return (
                    <Col lg='3' sm='6' md='4 px-25' key={`photo_${i}`} className={selctedFilterLabel === '' || photo.labels.includes(selctedFilterLabel) ? `d-block` : `d-none`} >
                      <UploadedPhoto 
                        photo={photo} 
                        setPhoto={setPhoto}
                        isRoom={false} 
                        allLabels={data.labels} 
                        photos={photos} 
                        setPhotos={setPhotos} 
                        onClick={() => handleClick(i, photos)}
                        />
                  </Col>
                  )
                })
              }
            </Row>
            
        </AccordionBody>
      </AccordionItem>
      {
                showPhotoGallery ? (
                  <Modal id='PhotoGalleryModal' isOpen={showPhotoGallery} className='modal-dialog-centered modal-xl transparent' >
                    <ModalHeader className='bg-transparent p-0' toggle={() => {
                          setPhotoGallery(null)
                          setShowPhotoGallery(false)
                        }}>
                    </ModalHeader>
                    <ModalBody className="" style={{marginTop: `${(window.innerHeight - 60 - (window.innerHeight * .8)) / 2}px`}}>
                      <PhotoCarousel photos={photoGallery} size='50%' activeIndex={activeIndex} />
                    </ModalBody>
                  </Modal>
                ) : null
              }
    </>
  )
}

export default PropertyAccordion