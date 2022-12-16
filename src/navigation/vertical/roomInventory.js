// import { BiCurrentLocation } from "react-icons/bi"
import { MdOutlineInventory } from "react-icons/md"
import { AiOutlineArrowRight } from "react-icons/ai"

export default [  
  {
    id: 'roomInventory',
    title: 'Room Inventory',
    icon: <MdOutlineInventory size={20} />,
    navLink: '/roomInventory',
    children: [
        // {
        //   id: 'vendorMaster',
        //   title: 'Vendor Master',
        //   icon: <AiOutlineArrowRight size={20} />,
        //   navLink: '/vendorMaster'
        // },
        {
            id: 'productMaster',
            title: 'Product Master',
            icon: <AiOutlineArrowRight size={20} />,
            navLink: '/productMaster'
        },
        {
            id: 'purchaseInvoice',
            title: 'Purchase Invoice',
            icon: <AiOutlineArrowRight size={20} />,
            navLink: '/purchaseInvoice'
        },
        {
            id: 'purchaseReceive',
            title: 'Purchase Receive',
            icon: <AiOutlineArrowRight size={20} />,
            navLink: '/purchaseReceive'
        },
        {
            id: 'stockCount',
            title: 'Stock Count',
            icon: <AiOutlineArrowRight size={20} />,
            navLink: '/stockCount'
        }
    ]
  }
]
