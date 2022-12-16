import { FaCalendarAlt } from "react-icons/fa"
import { AiOutlineArrowRight } from "react-icons/ai"

export default [
  {
    id: 'reservation',
    title: 'Booking',
    icon: <FaCalendarAlt size={20} />,
    navLink: '/reservation',
    children: [
      {
        id: 'singleReservation',
        title: 'Reservation',
        icon: <AiOutlineArrowRight size={20} />,
        navLink: '/reservation'
      },
      {
        id: 'expressService',
        title: 'Booking History',
        icon: <AiOutlineArrowRight size={20} />,
        navLink: '/bookinghistory'
      },
      {
        id: 'onlinebooking',
        title: 'Online Booking',
        icon: <AiOutlineArrowRight size={20} />,
        navLink: '/contactlessRequest'
      }
    ]
  }
]
