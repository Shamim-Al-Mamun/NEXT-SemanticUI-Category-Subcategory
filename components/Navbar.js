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
        
        <nav className={style.navbar}>
            <Link href="/new">
                <a className={style.create}>Add catagory</a>
            </Link>
            <Link href="/">
                <a className={style.create}>All Catagories</a>
            </Link>
            </nav>
                  <nav className={style.navbar}>
        <Menu color='blue' widths={2}>
            <Menu.Item
            name='New Category'
            active={activeItem === 'New Category'}
            onClick={(e, { name }) => {setactiveItem(name); router.push('https://next-category-subcategory-cnj96ktno-shamimalmamunaiub-gmailcom.vercel.app/new'); }}
            />
            <Menu.Item
            name='All Category'
            active={activeItem === 'All Category'}
            onClick={(e, { name }) => {setactiveItem(name); router.push('https://next-category-subcategory-cnj96ktno-shamimalmamunaiub-gmailcom.vercel.app/') }}
            />
      </Menu>
        </nav>
        </>

    );
}

export default Navbar;