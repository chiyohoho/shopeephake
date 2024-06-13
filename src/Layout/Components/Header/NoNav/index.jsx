import { Flex } from "antd"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

const HeaderNonav = () => {
    const location = useLocation()
    const [title, setTitle] = useState("")


    useEffect(() => {
        switch (location.pathname) {
            case "/user/login":
                setTitle("Đăng Nhập");
                break
            case "/user/register":
                setTitle("Đăng Ký");
                break
            default:
                setTitle("")
        }
    }, [location])

    return (
        <div className="py-5">
            <div className="container max-w-[1400px] mx-auto px-5">
                <Flex className="items-end justify-start gap-5">
                    <Link to="/" className="header_logo">
                        <img
                            className="w-[160px]"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Shopee.svg/1200px-Shopee.svg.png"
                            alt="shopeelogo"
                        />
                    </Link>
                    <p className="text-[24px] font-[500]">{title}</p>
                </Flex>
            </div>
        </div>
    );
};

export default HeaderNonav;
