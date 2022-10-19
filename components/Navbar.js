import Link from 'next/link';
import style from './css/style.module.css';
import { Menu } from 'semantic-ui-react'
import { useState } from 'react';
import { useRouter } from 'next/router';

const Navbar = () => {
    const router = useRouter()
    const [activeItem, setactiveItem] = useState("All Category");

    return (
        <>
        {/* <nav className={style.navbar}>
            <a href="/new" className={style.create}>Add catagory</a>
            <a  href="/" className={style.create}>All Catagories</a>
        </nav> */}
        <nav className={style.navbar}>
            <Menu color='blue' widths={2}>
                <Menu.Item
                href="https://next-category-subcategory.vercel.app/new"
                name='New Category'
                active={activeItem === 'New Category'}
                onClick={(e, { name }) => {setactiveItem(name) }}
                />
                <Menu.Item
                href="https://next-category-subcategory.vercel.app/"
                name='All Category'
                active={activeItem === 'All Category'}
                onClick={(e, { name }) => {setactiveItem(name)}}
                />
            </Menu>
        </nav>
        </>
    );
}

export default Navbar;