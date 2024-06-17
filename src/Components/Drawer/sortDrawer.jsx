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
                className="flex items-center justify-center rounded-md h-8 px-2 border-[1px] border-orange-600"
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
            >
                <SortBar />
            </Drawer>
        </>
    );
};
export default SortDrawer;
