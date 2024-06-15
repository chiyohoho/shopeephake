import HeaderDefault from "../Components/Header/Default"
import Footer from "../Components/Footer"
import PageNotFound from "../../Components/PageNotFound"

const ErrorLayout = () => {
    return (
        <div className="bg-[#f5f5f5]">
            <HeaderDefault />

            <div>
                <PageNotFound />
            </div>

            <Footer />
        </div>
    )
}

export default ErrorLayout
