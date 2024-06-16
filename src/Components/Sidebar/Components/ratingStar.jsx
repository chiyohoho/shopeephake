import { Flex } from "antd";
import { FaStar } from "react-icons/fa";

const StarRating = ({ rating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <FaStar
                key={i}
                className={`text-orange-500 ${i <= rating ? "" : "opacity-30"}`}
            />
        );
    }
    return <Flex className="gap-1 cursor-pointer">{stars}</Flex>;
};

export default StarRating