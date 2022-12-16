import React from 'react'
import moment from 'moment'
import { FaArrowLeft, FaUserTie } from 'react-icons/fa'
import { Alert, Card, UncontrolledTooltip } from 'reactstrap'
import { ArrowLeft, ChevronLeft, ChevronRight } from 'react-feather'

const RoomData = (props) => {

    const roomId = props.roomId
    console.log('roomId', roomId)
    console.log('The Data> ', props.data)

    const roomData = props.data
    console.log('roomData', roomData)

    return (
        <>
            <tr key={`roomitem_row_${props.roomId}`} className="bg-light-primary">
                <th className='bg-primary text-light'>{props.roomName}</th>
                {
                    props.datesArr?.map((dte) => {
                        const thisdate = moment(dte).format('l')
                        const count = roomData.filter(rmItem => (rmItem.CheckInDate && moment(rmItem.CheckInDate).format('l') === thisdate) 
                        || (rmItem.CheckInDate && rmItem.CheckOutDate && moment(dte).isBetween(moment(rmItem.CheckInDate), moment(rmItem.CheckOutDate)))
                        || (rmItem.CheckOutDate && moment(rmItem.CheckOutDate).format('l') === thisdate)).length
                        return (
                            <td>{count}</td>
                        )
                    })
                }
            </tr>
            {
                    roomData?.map((roomItem, index) => {
                        let totalcolspan = 0
                        let colsprint = props.datesArr?.length
                        const colLength = props.datesArr?.length
                        //let columns = props.datesArr?.length
                        return (
                            <>
                            
                            <tr key={`roomitemrow_${index}`} >
                                <th><FaUserTie /> × {roomItem.RoomNo}</th>
                                {
                                    
                                    props.datesArr?.map((dte, indx) => {
                                        //const showData = roomData.filter(elem => moment(moment(date).format('l')).isBetween(moment(moment(elem.CheckInDate).format('l')), moment(moment(elem.CheckOutDate).format('l'))) || moment(date).format('l') === moment(elem.CheckInDate).format('l') || moment(date).format('l') === moment(elem.CheckOutDate).format('l')) 
                                        //console.log('in format == ', roomItem.CheckInDate)
                                        let dispStartDate = roomItem.CheckInDate
                                        const dispEndDate = roomItem.CheckOutDate
                                        const doDate = moment(dte).format('l')
                                        let left = false
                                        let more = false
                                        let days = false
                                        if (indx === 0 && dispStartDate && dispEndDate && moment(dte).isAfter(moment(dispStartDate)) && moment(dte).isBefore(moment(dispEndDate))) {
                                            left = true
                                            days = moment(dte).diff(moment(roomItem.CheckInDate), 'days') + 1
                                            dispStartDate = doDate
                                        }
                                        
                                        if (dispStartDate && doDate === moment(dispStartDate).format('l')) {
                                        
                                            console.log('rm - - ', roomItem)
                                            const colspan = moment(roomItem?.CheckOutDate).diff(dispStartDate, 'day') + 1
                                            totalcolspan = totalcolspan + colspan
                                            colsprint = colsprint - colspan

                                            if ((indx + colspan) > colLength) {
                                                more = true
                                                days = indx + colspan - colLength
                                            }
                                            const posid = roomItem.RoomAllocationID
                                            return (
                                                <td key={`roomitemtd_${indx}`} colSpan={colspan}>
                                                    
                                                    <Alert className='mb-0' id={posid} style={{ cursor: 'pointer' }} color='success' onClick={() => (props.setOpenRoomAllocationID(roomItem.RoomAllocationID), props.handleOpen())}>
                                                    {
                                                        left ? <span  className='position-absolute start-0' >{days}<ChevronLeft style={{scale: '0.75'}} /></span> : null
                                                    }
                                                        <h6 className='alert-heading' title={`${roomItem.GuestName} (${roomItem.GuestMobileNumber})`} >{roomItem.GuestName}</h6>
                                                        <sup>{roomItem.GuestMobileNumber}</sup>
                                                        <sup>{roomItem.RoomID}</sup>
                                                    {
                                                        more ? <span  className='position-absolute end-0 top-0' ><ChevronRight style={{scale: '0.75'}} />{days}</span> : null
                                                    }
                                                    </Alert>
                                                    <UncontrolledTooltip placement='top' target={posid} className="bg-success">
                                                        <div>{roomItem.GuestName} </div>
                                                        <div>({roomItem.GuestMobileNumber})</div>
                                                    </UncontrolledTooltip>
                                                </td>
                                            )

                                        } else {
                                                if (colsprint < indx) {

                                                } else {
                                                    return (
                                                        <td key={`roomitemtd_${indx}`} ></td>
                                                    )
                                                }
                                            
                                        }
                                        
                                    })
                                }
                            </tr>

                            </>
                        )
                    })
                
            }
        </>
    )
}

export default RoomData