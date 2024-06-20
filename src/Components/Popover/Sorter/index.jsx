import { useEffect, useState } from 'react';
import { Flex, Popover } from 'antd';
import { CiBoxList } from 'react-icons/ci';
import { IoMdClose } from "react-icons/io";
import MiniSortBar from '../../SortBar/secondSize';
const Sorter = () => {
    const [open, setOpen] = useState(false);
    const hide = () => {
        setOpen(false);
    }
    useEffect(() => {
        const handleResize = () => {
            if (open) {
                hide()
            }
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [open])

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    }
    return (
        <Popover
            content={<MiniSortBar />}
            title={<Flex className='justify-end'><a className='hover:text-orange-600' onClick={hide}><IoMdClose size={24} /></a></Flex>}
            trigger="click"
            placement="bottomRight"
            open={open}
            onOpenChange={handleOpenChange}
        >
            <button className='flex items-center justify-center gap-1 rounded-md h-10 px-2 border-2 border-gray-500 hover:border-orange-600'>
                <CiBoxList />
                <p>Sắp xếp</p>
            </button>
        </Popover>
    );
};
export default Sorter