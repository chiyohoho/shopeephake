import { useState } from 'react';
import { Drawer } from 'antd';
import SideBar from '../Sidebar';
import { CiFilter } from 'react-icons/ci';
const SideBarDrawer = () => {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    return (
        <>
            <button className='flex items-center justify-center gap-1 rounded-md h-10 px-2 border-2 border-gray-500 hover:border-orange-600' onClick={showDrawer}>
                <CiFilter />
                <p>Bộ lọc</p>
            </button>

            <Drawer
                title="Bộ lọc sản phẩm"
                placement={'left'}
                closable={true}
                onClose={onClose}
                open={open}
            >
                <SideBar />
            </Drawer>
        </>
    );
};
export default SideBarDrawer