import { useState, useEffect } from 'react';
import { Drawer } from 'antd';
import { CiBoxList } from 'react-icons/ci';
import SortBar from '../SortBar';

const SortDrawer = () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (open) {
                onClose()
            }
        };

        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        };
    }, [open])

    const showDrawer = () => {
        setOpen(true)
    };

    const onClose = () => {
        setOpen(false)
    }

    return (
        <>
            <button
                className="flex items-center justify-center gap-1 rounded-md h-10 px-2 border-2 border-gray-500 hover:border-orange-600"
                onClick={showDrawer}
            >
                <CiBoxList />
                <p>Sắp xếp</p>
            </button>

            <Drawer
                title="Sắp xếp sản phẩm"
                placement={'right'}
                closable={true}
                onClose={onClose}
                open={open}
                width={300}
            >
                <SortBar />
            </Drawer>
        </>
    );
};
export default SortDrawer;
