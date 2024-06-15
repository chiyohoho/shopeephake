import { Button, Result } from "antd"
import { Link } from "react-router-dom"

const PageNotFound = () => {
    return (
        <Result
            status="404"
            title="Không tìm thấy trang này"
            extra={<Button type="primary"><Link to={'/'}>Trở về trang chủ</Link></Button>}
        />
    )
}

export default PageNotFound
