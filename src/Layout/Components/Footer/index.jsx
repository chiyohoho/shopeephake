import { Divider, Flex } from "antd"

const Footer = () => {
    return (
        <div className="footer mt-[-25px]">
            <div className='container max-w-[70vw] mx-auto'>
                <Divider />

                <Flex className="items-center justify-between gap-5 text-[rgba(0,0,0,.54)]">
                    <p>© 2024 Shopee. Tất cả các quyền được bảo lưu.</p>

                    <p>Quốc gia & Khu vực: Singapore | Indonesia | Thái Lan | Malaysia | Việt Nam | Philippines | Brazil | México | Colombia | Chile | Đài Loan</p>
                </Flex>

                <Flex className="flex-wrap items-center justify-center text-center gap-5 text-[rgba(0,0,0,.54)] mt-20 text-[14px] font-[500]">
                    <div className="cursor-pointer">
                        CHÍNH SÁCH BẢO MẬT
                    </div>

                    <div className="cursor-pointer">
                        QUY CHẾ HOẠT ĐỘNG
                    </div>


                    <div className="cursor-pointer">
                        CHÍNH SÁCH VẬN CHUYỂN
                    </div>


                    <div className="cursor-pointer">
                        CHÍNH SÁCH TRẢ HÀNG VÀ HOÀN TIỀN
                    </div>
                </Flex>

                <Flex className="flex-col gap-2 text-center text-[rgba(0,0,0,.54)] mt-10">
                    <p>Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình,
                        Thành phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn</p>

                    <p>Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Bùi Anh Tuấn - Điện thoại liên hệ: 0974181435</p>

                    <p>Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015</p>

                    <p>© 2015 - Bản quyền thuộc về Công ty TNHH Shopee</p>
                </Flex>
            </div>
        </div>
    )
}

export default Footer
