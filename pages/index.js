import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import style from '../components/css/style.module.css';
import { Card } from 'semantic-ui-react'
import Tree from '@naisutech/react-tree'
import Head from 'next/head';

const Index = ({ categories }) => {

  console.log(categories)

  const myThemes = {
    modifiedDarkLarge: {
      text: 'red', // text color
      bg: '#2d3439', // background color of whole tree
      indicator: 'gold', // open folder indicator color
      separator: 'gold', // row seperator color
      icon: 'gold', // fill & stroke color of default icons - has no effect when using custom icons
      selectedBg: '#3f464e', // background of selected element
      selectedText: '#fafafa', // text color of selected element
      hoverBg: '#505a63', // background of hovered element
      hoverText: '#fafafa', // text color of hovered element
      accentBg: '#2d3439', // background of empty folder element
      accentText: '#999', // text color of empty folder element
      textSize: 'large' // preferred text size
    }
  }
  
  return (
    <Card className={style.container}>
      	<Head>
        <title>Category/Sub</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <h1 style={{marginBottom:"50px"}}>All Catagory</h1>
        <div className={style.wrapper}>
        <Tree nodes={categories} theme="light"  />
      </div>
    </Card>
  );
}

Index.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/notes');
  const { data } = await res.json();

  return { categories: data }
}
export default Index;