import ConfigRoutes from "../config/routes"
import LOGIN from "../auth/login/login"
import HOME from "../pages/home/home"
import CHATROOM from "../chat/chatRooms/chatroom"
import SEARCHUSER from "../searchUser/searchUser"
import FACEBOOK from "../pages/faceBook/fb"
import HOMEFACE from "../pages/childrenPage/home/home"
import PAGEGROUP from "../pages/childrenPage/pageGroup"
import MARKETPLACE from "../pages/childrenPage/marketPlace"
import WATCH from "../pages/childrenPage/video"
import PROFILE from "../pages/Profiles"
import ACCOUNTUSER from "../pages/Account/account"
const publicRoutes = [
    {path : ConfigRoutes.Login , component : LOGIN },
    {path : ConfigRoutes.Home , component : HOME },
    {path : ConfigRoutes.Profiles , component : PROFILE },
    {path : ConfigRoutes.chat , component : CHATROOM },
    {path : ConfigRoutes.searchUser , component : SEARCHUSER },
    {path : ConfigRoutes.facebook , component : HOMEFACE , Layout : FACEBOOK },
    {path : ConfigRoutes.watch , component : WATCH , Layout : FACEBOOK },
    {path : ConfigRoutes.pageGroup , component : PAGEGROUP , Layout : FACEBOOK },
    {path : ConfigRoutes.marketPlace , component : MARKETPLACE , Layout : FACEBOOK },
    {path : ConfigRoutes.accountuser , component : ACCOUNTUSER , Layout : FACEBOOK },
]

export default publicRoutes