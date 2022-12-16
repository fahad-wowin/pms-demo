import { React, useState } from "react"
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Badge,
  Row,
  Col,
  Button,
  Card,
  Modal,
  ModalBody,
  ModalHeader
} from "reactstrap"
import "./accordion.scss"
import PhotoCarousel from "./PhotoCarousel"

import PhotoUploadModal from "./PhotoUploadModal"
import UploadedPhoto from "./UploadedPhoto"
const RoomAccordion = ({ data }) => {
  console.log("rooooom> ", data.rooms)
  const [rooms] = useState(data.rooms)
  const [labels] = useState(
    data.labels.split(",")?.map((element) => element.trim())
  )

  const [selctedFilterLabel, setSelctedFilterLabel] = useState("")

  const [newPhoto, setNewPhoto] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [showPhotoGallery, setShowPhotoGallery] = useState(false)
  const [photoGallery, setPhotoGallery] = useState()

  const handlePhotoUpload = () => {
    
    setNewPhoto(!newPhoto)
  }

  const [labelColor] = useState([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "dark"  
  ])

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
      {rooms ? (
        rooms.map((room, i) => {
          const [photos, setPhotos] = useState(room.photos)
          const [allLabels] = useState(room.labels)

          return (
            <AccordionItem key={`${room.type}_${i}`}>
              <AccordionHeader color="white" targetId={`room_${i}`}>
                {room.type.toLowerCase().includes("room") ? room.type : `${room.type} Room`}
              </AccordionHeader>
              <AccordionBody accordionId={`room_${i}`} className="p-2">
                This is an apportunity for you to showcase your rooms. Add
                amazing photos that detail out how the room looks and what it
                offers. Quality photos help set the right customer expectations.
                Tip: Upload photos for the available tags below and consider
                your work done!
                <Row className="">
                  <Col className="col-12 text-center my-1">
                    <Button color="primary" onClick={handlePhotoUpload}>
                      Upload Photo
                    </Button>
                    <PhotoUploadModal
                      open={newPhoto}
                      handlePhotoUpload={handlePhotoUpload}
                      isRoom={true}
                      allLabels={allLabels}
                      roomType={room.type}
                      photos={photos}
                      setPhotos={setPhotos}
                    />
                  </Col>

                  <Col className="col-12 align-self-center text-center mb-1">
                    <Badge
                      className={`px-2 me-1 my-50 cursor-pointer ${selctedFilterLabel === "" ? "bg-secondary badge-glow" : "" }`}
                      onClick={() => filterPhoto("")}
                      key={`label_`}
                      color="light-secondary"
                      pill
                    >
                      All
                    </Badge>

                    {labels.map((label, i) => {
                      return (
                        <Badge
                          className={`px-1 me-1 my-50 cursor-pointer ${
                            selctedFilterLabel === label ? "badge-glow" : ""
                          }`}
                          onClick={() => filterPhoto(label)}
                          key={`label_${i}`}
                          color={labelColor[i < 7 ? i : i % 7]}
                          pill
                        >
                          {label}
                        </Badge>
                      )
                    })}
                  </Col>
                </Row>
                <Row>
                  {photos.map((img, i) => {
                    //console.log("avat >", photo.src)
                    const [photo, setPhoto] = useState(img)
                    return (
                      <Col
                        lg="3"
                        sm="6"
                        md="4 px-25"
                        key={`photo_${photo.id}_${i}`}
                        className={
                          selctedFilterLabel.trim() === "" ||
                          photo.labels.includes(selctedFilterLabel) ? `d-block` : `d-none`
                        }
                      >
                        <UploadedPhoto
                          photo={photo}
                          setPhoto={setPhoto}
                          allLabels={room.labels}
                          photos={photos}
                          setPhotos={setPhotos}
                          onClick={() => handleClick(i, photos)}

                        />
                      </Col>
                    )
                  })}
                </Row>
              </AccordionBody>
              
            </AccordionItem>
          )
        })
      ) : (
        <span>No rooms available</span>
      )}
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

export default RoomAccordion
