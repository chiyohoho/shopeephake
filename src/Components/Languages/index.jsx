import { Flex, Popover } from "antd"
import { useState } from "react"
import { CiGlobe } from "react-icons/ci"
import { FaAngleDown } from "react-icons/fa6"
import { showToast } from "../Toast"

const ContentPopover = ({ languages, onLanguageSelect }) => (
    <div>
        {languages.map((language) => (
            <Flex
                key={language.code}
                className="items-center gap-2 cursor-pointer hover:bg-gray-300 px-2 rounded-sm"
                onClick={() => onLanguageSelect(language)}
            >
                <img
                    className="w-[24px] h-[24px]"
                    src={language.flagUrl}
                    alt={language.name}
                />
                <p>{language.name}</p>
            </Flex>
        ))}
    </div>
)

const Languages = () => {
    const [languagesTitle, setLanguagesTitle] = useState("Ngôn Ngữ")
    const languagesData = [
        {
            code: "vi",
            name: "Tiếng Việt",
            flagUrl: "https://purecatamphetamine.github.io/country-flag-icons/3x2/VN.svg",
        },
        {
            code: "en",
            name: "English",
            flagUrl: "https://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg",
        },
    ]

    const handleLanguageSelect = (language) => {

        if (language.name === 'English') {
            showToast('error', 'ngôn ngữ Tiếng Anh chưa có!')
        } else {
            setLanguagesTitle(language.name)
        }

    }

    return (
        <Popover
            content={<ContentPopover languages={languagesData} onLanguageSelect={handleLanguageSelect} />}
            trigger="hover"
        >
            <Flex className="items-center gap-1 cursor-pointer">
                <CiGlobe size={"24px"} />
                <div>{languagesTitle}</div>
                <FaAngleDown />
            </Flex>
        </Popover>
    )
}

export default Languages
