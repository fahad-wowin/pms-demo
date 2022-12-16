// import { BiCurrentLocation } from "react-icons/bi"
import { AiOutlineArrowRight } from "react-icons/ai"
import { TbReportSearch } from "react-icons/tb"

export default [
  {
    id: 'reports',
    title: 'Reports',
    icon: <TbReportSearch size={20} />,
    navLink: '/reports',
    children: [
      {
        id: 'guestList',
        title: 'Guest List',
        icon: <AiOutlineArrowRight size={20} />,
        navLink: '/guestList'
      },
      {
        id: 'guestWithRate',
        title: 'Guest With Rate',
        icon: <AiOutlineArrowRight size={20} />,
        navLink: '/guestWithRate'
      },
      {
        id: 'guestWithoutRate',
        title: 'Guest Without Rate',
        icon: <AiOutlineArrowRight size={20} />,
        navLink: '/guestWithoutRate'
      },
      {
        id: 'cashieringReport',
        title: 'Cashiering',
        icon: <AiOutlineArrowRight size={20} />,
        navLink: '/cashieringReport'
      },
      {
        id: 'houseKeepingReport',
        title: 'House Keeping',
        icon: <AiOutlineArrowRight size={20} />,
        navLink: '/houseKeepingReport'
      },
      {
        id: 'laundryReport',
        title: 'Laundry',
        icon: <AiOutlineArrowRight size={20} />,
        navLink: '/laundryReport'
      },
      {
        id: 'adminReport',
        title: 'Admin',
        icon: <AiOutlineArrowRight size={20} />,
        navLink: '/adminReport'
      }
    ]
  }
]
