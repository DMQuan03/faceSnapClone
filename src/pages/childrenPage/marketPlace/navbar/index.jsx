import React from 'react'
import classNames from "classnames/bind"
import styles from "./index.module.scss"
import {
    AiFillCar,
    AiFillTool,
    AiFillHeart
} from "react-icons/ai"
import {
    MdAddHome
} from "react-icons/md"
import {
    ImVideoCamera
} from "react-icons/im"
import {
    FaToolbox,
    FaGuitar,
    FaTag,
    FaPenAlt,
    FaGamepad,
    FaShopify
} from "react-icons/fa"
import {
    BsTagsFill,
    BsPhone
} from "react-icons/bs"
import {
    FcSportsMode,
    FcHome
} from "react-icons/fc"
import {
    MdPets
} from "react-icons/md"
import {
    GiUnderwearShorts
} from "react-icons/gi"
import {
    HiUserGroup,
} from "react-icons/hi"
import {
    HiBellAlert
} from "react-icons/hi2"
import {
    RiMailSendFill
} from "react-icons/ri"

const cx = classNames.bind(styles)
const NAVBARMARKETPLACE = () => {

    const MENU_PRODUCT = [
        {
            title : "Xe cộ",
            id : 1,
            icon : <AiFillCar className={cx("icon_market_place")} />,
            handleClick : () => {

            }
        },

        {
            title : "Tài sản cho thuê",
            id : 2,
            icon : <MdAddHome className={cx("icon_market_place")} />,
            handleClick : () => {

            }
        },

        {
            title : "Bán nhà",
            id : 3,
            icon : <MdAddHome className={cx("icon_market_place")} />,
            handleClick : () => {

            }
        },

        {
            title : "Dụng cụ sửa chữa nhà",
            id : 4,
            icon : <AiFillTool className={cx("icon_market_place")} />,
            handleClick : () => {

            }
        },

        {
            title : "Gia đình",
            id : 5,
            icon : <AiFillHeart className={cx("icon_market_place")} />,
            handleClick : () => {

            }
        },

        {
            title : "Giải trí",
            id : 6,
            icon : <ImVideoCamera className={cx("icon_market_place")} />,
            handleClick : () => {

            }
        },

        {
            title : "Làm vườn và hoạt động ngoài trời",
            id : 7,
            icon : <FaToolbox className={cx("icon_market_place")} />,
            handleClick : () => {

            }
        },

        {
            title : "Nhạc cụ",
            id : 8,
            icon : <FaGuitar className={cx("icon_market_place")} />,
            handleClick : () => {

            }
        },

        {
            title : "Rao vặt",
            id : 9,
            icon : <BsTagsFill className={cx("icon_market_place")} />,
            handleClick : () => {

            }
        },

        {
            title : "Sản phẩm miễn phí",
            id : 10,
            icon : <FaTag className={cx("icon_market_place")} />,
            handleClick : () => {

            }
        },

        {
            title : "Sản phẩm thể thao",
            id : 11,
            icon : <FcSportsMode className={cx("icon_market_place")} />,
            handleClick : () => {

            }
        },

        {
            title : "Sở thích",
            id : 12,
            icon : <FaPenAlt className={cx("icon_market_place")} />,
            handleClick : () => {

            }
        },

        {
            title : "Văn phòng phẩm",
            id : 13,
            icon : <BsTagsFill className={cx("icon_market_place")} />,
            handleClick : () => {

            }
        },

        {
            title : "Đồ trơi & trò chơi",
            id : 14,
            icon : <FaGamepad className={cx("icon_market_place")} />,
            handleClick : () => {

            }
        },

        {
            title : "Đồ dùng cho thú cưng",
            id : 15,
            icon : <MdPets className={cx("icon_market_place")} />,
            handleClick : () => {

            }
        },
        
        {
            title : "Đồ gia dụng",
            id : 16,
            icon : <FcHome className={cx("icon_market_place")} />,
            handleClick : () => {

            }
        },
        
        {
            title : "Đồ may mặc",
            id : 17,
            icon : <GiUnderwearShorts className={cx("icon_market_place")} />,
            handleClick : () => {

            }
        },
        
        {
            title : "Đồ điện tử",
            id : 18,
            icon : <BsPhone className={cx("icon_market_place")} />,
            handleClick : () => {

            }
        },
        
        {
            title : "Nhóm mua và bán",
            id : 19,
            icon : <HiUserGroup className={cx("icon_market_place")} />,
            handleClick : () => {

            }
        },
    ]


    const NAVBAR_PRODUCT_USER = [
        {
            title : "Lướt xem tất cả",
            icon : <FcHome className={cx("icon_market_place")} />,
            handleMenu : () => {

            },
            id : 1
        },
        {
            title : "Thông báo",
            icon : <HiBellAlert className={cx("icon_market_place")} />,
            handleMenu : () => {

            },
            id : 2
        },
        {
            title : "Hộp thư",
            icon : <RiMailSendFill className={cx("icon_market_place")} />,
            handleMenu : () => {

            },
            id : 3
        },
        {
            title : "Đang mua",
            icon : <FaShopify className={cx("icon_market_place")} />,
            handleMenu : () => {

            },
            id : 4
        },
        {
            title : "Bán hàng",
            icon : <BsTagsFill className={cx("icon_market_place")} />,
            handleMenu : () => {

            },
            id : 5
        },
    ]
  return (
    <div className={cx("wrapper")}>
        <div className={cx("header_navbar_marketplace")}>
            <h2>
                Marketplace
            </h2>
            <div>
                icon
            </div>
        </div>
        <div className={cx("search_navbar_marketplace")}>
            <button style={
                {
                    width : 30,
                    height : 32,
                    border : "none",
                    outline : "none",
                    borderTopLeftRadius : 10,
                    borderBottomLeftRadius : 10
                }
            }></button>
            <input style={
                {
                    width : "90%",
                    height : 30,
                    border :"none",
                    outline : "none",
                    borderTopRightRadius : 10,
                    borderBottomRightRadius : 10,
                    backgroundColor : "gray"
                }
            } />
        </div>
        <div className={cx("show_category_product")}>
            <div style={
                {
                    width : "100%",
                    height : "auto",
                    minHeight : 200,
                    marginBottom : 40
                }
            }>
                {NAVBAR_PRODUCT_USER.map(el => (
                    <div key={el.id} className={cx("wrapper_product")}>
                    <div style={
                        {
                            width : 50,
                            height : "100%",
                            display :"flex",
                            justifyContent : "center",
                            textAlign : "center",
                            alignItems : "center"
                        }
                    }>{el.icon}</div>
                    <div>{el.title}</div>
                </div>
                ))}
            </div>
            {MENU_PRODUCT.map(el => (
                <div key={el.id} className={cx("wrapper_product")}>
                    <div style={
                        {
                            width : 50,
                            height : "100%",
                            display :"flex",
                            justifyContent : "center",
                            textAlign : "center",
                            alignItems : "center"
                        }
                    }>{el.icon}</div>
                    <div>{el.title}</div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default NAVBARMARKETPLACE