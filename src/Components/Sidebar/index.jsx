import { Flex, Input } from "antd"
import axios from "axios"
import { CiCircleList, CiFilter, } from "react-icons/ci"
import { FaPlay, } from "react-icons/fa";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { API } from "../../Constant/API"
import { useEffect, useState } from "react"

const SideBar = () => {
    const [dataCategories, setDataCategories] = useState([])
    const [active, setActive] = useState('-1')


    const callCategories = async () => {
        await axios.get(`${API}/categories`)
            .then(res => {
                const dataResponse = res.data.data
                setDataCategories(dataResponse)
            })
            .catch(err => console.log('check err:', err))
    }
    useEffect(() => {
        callCategories()
    }, [])

    return (
        <div className="sidebar min-w-[240px] w-[100%] mb-10 max-[900px]:hidden">
            <div className="categories">
                <Flex className={`items-center gap-2 text-[20px] ${active == '-1' ? 'text-[#fb5731]' : 'text-black'} border-b-[1px] border-b-gray-300 pb-3`}>
                    <CiCircleList />
                    <p onClick={() => setActive('-1')} className="cursor-pointer">Tất cả danh mục</p>
                </Flex>

                <Flex className="sidebar_categories flex-col gap-3 px-5 py-3">
                    {dataCategories.map((item, index) => {
                        return (
                            <Flex key={index} className="items-center gap-2  transition-all duration-300 ease-in-out ">
                                <div className={`text-[8px] text-[#fb5731] ${active == index ? 'opacity-1' : 'opacity-0'} `}>
                                    <FaPlay />
                                </div>
                                <p onClick={() => setActive(index)} className={`font-[500] ${active == index ? 'text-[#fb5731]' : 'text-black'} cursor-pointer`} >{item.name}</p>
                            </Flex>
                        )
                    })}
                </Flex>
            </div>

            <div className="filter border-b-[1px] border-b-gray-300 pb-5">
                <Flex className={`items-center gap-2 text-[20px] text-[#fb5731] border-b-[1px] border-b-gray-300 pb-3`}>
                    <CiFilter />
                    <p onClick={() => setActive('-1')} className="cursor-pointer text-[24px] font-[600]">Bộ lọc tìm kiếm</p>
                </Flex>

                <div>
                    <p className="my-3">Khoảng giá</p>
                    <Flex className="items-center gap-2">
                        <Input placeholder="₫ From" />
                        <p className="text-[#ccc]">-</p>
                        <Input placeholder="₫ To" />
                    </Flex>
                    <button className="bg-[#fb5731] p-3 w-[100%] rounded-sm mt-5 text-white hover:bg-[#ec6c53]">Áp Dụng</button>
                </div>
            </div>

            <div className="rating ">
                <p className="my-3">Đánh giá</p>

                <Flex className="flex-col gap-2 px-5">
                    <Flex className="gap-1">
                        <FaStar className="text-orange-300" />
                        <FaStar className="text-orange-300" />
                        <FaStar className="text-orange-300" />
                        <FaStar className="text-orange-300" />
                        <FaStar className="text-orange-300" />
                    </Flex>

                    <Flex className="items-center gap-2">
                        <Flex className="gap-1">
                            <FaStar className="text-orange-300" />
                            <FaStar className="text-orange-300" />
                            <FaStar className="text-orange-300" />
                            <FaStar className="text-orange-300" />
                            <FaRegStar className="text-orange-300" />
                        </Flex>

                        <p>Trở lên</p>
                    </Flex>

                    <Flex className="items-center gap-2">
                        <Flex className="gap-1">
                            <FaStar className="text-orange-300" />
                            <FaStar className="text-orange-300" />
                            <FaStar className="text-orange-300" />
                            <FaRegStar className="text-orange-300" />
                            <FaRegStar className="text-orange-300" />
                        </Flex>

                        <p>Trở lên</p>
                    </Flex>


                    <Flex className="items-center gap-2">
                        <Flex className="gap-1">
                            <FaStar className="text-orange-300" />
                            <FaStar className="text-orange-300" />
                            <FaRegStar className="text-orange-300" />
                            <FaRegStar className="text-orange-300" />
                            <FaRegStar className="text-orange-300" />
                        </Flex>
                        <p>Trở lên</p>
                    </Flex>


                    <Flex className="items-center gap-2">
                        <Flex className="gap-1">
                            <FaStar className="text-orange-300" />
                            <FaRegStar className="text-orange-300" />
                            <FaRegStar className="text-orange-300" />
                            <FaRegStar className="text-orange-300" />
                            <FaRegStar className="text-orange-300" />
                        </Flex>
                        <p>Trở lên</p>
                    </Flex>
                </Flex>

                <div className=" border-y-[1px] border-[#ccc] py-5 mt-5">
                    <button className="bg-[#fb5731] p-3 w-[100%] rounded-sm text-white hover:bg-[#ec6c53]">Xóa tất cả</button>
                </div>
            </div>
        </div>
    )
}

export default SideBar
