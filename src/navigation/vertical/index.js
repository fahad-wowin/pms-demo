// import { Mail, Home } from "react-feather"

// export default [
//   {
//     id: "home",
//     title: "Home",
//     icon: <Home size={20} />,
//     navLink: "/home"
//   },
//   {
//     id: "secondPage",
//     title: "Second Page",
//     icon: <Mail size={20} />,
//     navLink: "/second-page"
//   }
// ]

import dashboard from './dashboard'
import reservation from './reservation'
// import service from './service'
import frontDesk from './frontDesk'
import housekeeping from './houseKeeping'
import laundry from './laundry'
import WakeUpCall from './wakeUpCall'
import pos from './pos'
import rateInventory from './rateInventory'
import promotions from './promotions'
import ratingsReviews from './ratingsReviews'
import Audit from './Audit'
import masterSetting from './masterSetting'
import propertyMaster from './propertyMaster'
import regionMaster from './regionMaster'
import roomInventory from './roomInventory'
import reports from './reports'
import webcheckin from './webcheckin'
import help from './help'

// ** Merge & Export
export default [...dashboard, ...reservation, ...frontDesk, ...housekeeping, ...laundry, ...WakeUpCall, ...pos, ...rateInventory, ...promotions, ...ratingsReviews, ...Audit, ...masterSetting, ...propertyMaster, ...regionMaster, ...roomInventory, ...reports, ...webcheckin, ...help]

// ...service,