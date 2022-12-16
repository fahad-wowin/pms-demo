import { React, useState } from 'react'
import { Accordion } from 'reactstrap'
import PropertyAccordion from './PropertyAccordion'
import RoomAccordion from './RoomAccordion'
import './accordion.scss'
import { LabelList } from 'recharts'

const PropertyPhotos = () => {

  const [open, setOpen] = useState('property_1')

    const toggle = id => {
      open === id ? setOpen() : setOpen(id)
    }
    
  const [propertData] = useState(
    {
      id: '1',
      hotelName: 'Wowinfobiz',
      rooms: ['Delux Room', 'Executive Delux', 'Normal'],
      labels: 'Lobby, Lawn, Front Desk, Restaurent',
      photos: [
        {filename: 'Lobby photo', src: require(`@src/assets/images/property/demo/property-1.jpg`), labels: 'Lobby'},
        {filename: 'lawn photo', src: require(`@src/assets/images/property/demo/property-2.jpg`), labels: 'Lawn'},
        {filename: 'Front desk photo', src: require(`@src/assets/images/property/demo/property-3.jpg`), labels: 'Front Desk'},
        {filename: 'Restaurent photo', src: require(`@src/assets/images/property/demo/property-4.jpg`), labels: 'Restaurent'}
      ]
      

    }
  )

  const [RoomsData] = useState(
    {
      id: '1',
      hotelName: 'Wowinfobiz',
      rooms: [
        {
          id: '1',
          type: 'Delux Room', 
          labels: 'Bed, TV, Front Door',
          photos: [
            {id: '1', roomNumber: '101', filename: 'Lobby photo', src: require(`@src/assets/images/property/demo/property-5.jpg`), labels: 'Bed, TV'},
            {id: '2', roomNumber: '102', filename: 'Kitchen photo', src: require('../../../assets/images/property/demo/property-6.jpg'), labels: 'Kitchen'},
            {id: '3', roomNumber: '101', filename: 'Front door photo', src: require('../../../assets/images/property/demo/property-7.jpg'), labels: 'Front Door'},
            {id: '4', roomNumber: '101', filename: 'Ameneties photo', src: require('../../../assets/images/property/demo/property-8.jpg'), labels: 'Ameneties'}
          ]
        }, 
        {
          id: '2',
          type: 'Executive Delux',
          labels: 'Front Door, Kitchen',
          photos: [
            {id: '5', roomNumber: '202', filename: 'Lobby photo', src: require(`@src/assets/images/property/demo/property-9.jpg`), labels: 'Bed, TV'},
            {id: '6', roomNumber: '202', filename: 'Kitchen photo', src: require('../../../assets/images/property/demo/property-10.jpg'), labels: 'Kitchen'},
            {id: '7', roomNumber: '201', filename: 'Front door photo', src: require('../../../assets/images/property/demo/property-11.jpg'), labels: 'Front Door'},
            {id: '8', roomNumber: '203', filename: 'Ameneties photo', src: require('../../../assets/images/property/demo/property-12.jpg'), labels: 'Ameneties'}
          ]
        }, 
        {
          id: '3',
          type: 'Normal', 
          labels: 'Front Door, Kitchen, Ameneties',
          photos: [
            {id: '9', roomNumber: '302', filename: 'Lobby photo', src: require(`@src/assets/images/property/demo/property-13.jpg`), labels: 'Bed, TV'},
            {id: '10', roomNumber: '302', filename: 'Kitchen photo', src: require('../../../assets/images/property/demo/property-14.jpg'), labels: 'Kitchen'},
            {id: '11', roomNumber: '302', filename: 'Front door photo', src: require('../../../assets/images/property/demo/property-15.jpg'), labels: 'Front Door'},
            {id: '12', roomNumber: '303', filename: 'Ameneties photo', src: require('../../../assets/images/property/demo/property-16.jpg'), labels: 'Front Door, Kitchen, Ameneties'}
          ]
        }
      ],
      labels: 'Bed, TV, Front Door, Kitchen, Ameneties'
    }
  )

  return (
    <>
    <h4 className='mb-1'>Photos</h4>
    <p>Add quality photos showcase all your property. Good photos attract potential customers. Better the photo quality, higher the score will be. </p>
    <Accordion className='accordion-margin' open={open} toggle={toggle}>
      <PropertyAccordion data={propertData}/>
      <RoomAccordion data={RoomsData} />
    </Accordion>
    </>
  )
}

export default PropertyPhotos
