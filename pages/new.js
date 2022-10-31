import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, Card } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import style from '../components/css/style.module.css';
import { Message, Icon } from 'semantic-ui-react';
import Head from 'next/head';

const New = ({ categories }) => {
    const [formState, setformState] = useState({ label: '', parentId:null, description: '', id: 0 })
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                createCatagory(); //post request
            }
            else {
                setIsSubmitting(false);
            }
        }
    }, [errors]);

    const createCatagory = async () => {
        try {
            const res = await fetch('/api/notes', {
                method: 'POST',
                headers : {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formState)
            })
            
            location.reload(); 
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setformState({...formState, id:uuidv4()})
        let errs = validate();
        setErrors(errs);
        setIsSubmitting(true)
    };

    const validate = () => {
        let err = {};

        if (!formState.label) {
            err.title = 'Title is Required'
        }

        if (!formState.description) {
            err.description = 'Description is Required'
        }
        return err;
    };
    
    var options =[];

        const Recursive = (data, cap="-") => {
            !!categories.length && categories.map((each) => {
                if (data.id === each.parentId) {
                    options.push({key: each._id, text: cap + each.label, value: each.id})
                    Recursive(each, cap + "-")
                }
            })
        }
    
        categories.map((data) => {
            if (!data.parentId) {
                options.push({key: data._id, text: data.label, value: data.id})
                Recursive(data);
            }
        })

    return (
	<div>
	    <Head>
        <title>Category/Sub</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Card className={style.container}>
            <h1 style={{marginBottom:"50px"}}>Create category</h1>
            <div>
                {
                    isSubmitting ?   
                    <Message icon>
                        <Icon name='circle notched' loading />
                        <Message.Content>
                        <Message.Header >Just one second</Message.Header>
                            Creating new category !
                        </Message.Content>
                    </Message>
                        : <Form onSubmit={handleSubmit}>
                            <Form.Input
                                fluid
                                error={errors.title ? { content: 'Please enter a title', pointing: 'below' } : null}
                                label='Catagory Name'
                                placeholder='Title'
                                name='title'
                                onChange={(e) =>setformState({...formState, label: e.target.value })}
                            />
                            <Form.Select
                                fluid
                                // error={errors.description ? { content: 'Please enter a description', pointing: 'below' } : null}
                                label='Parent Catagory'
                                options={options}
                                placeholder='No parent'
                                name='description'
                                onChange={(e, {value}) => setformState({...formState, parentId: value})}
                            />
                            <Form.TextArea
                                fluid
                                error={errors.description ? { content: 'Please enter a description', pointing: 'below' } : null}
                                label='Description'
                                placeholder='Description'
                                name='description'
                                onChange={(e) => setformState({...formState, description: e.target.value})}
                            />

                            <Button  color='instagram' type='submit'>Create</Button>
                        </Form>
                }
            </div>
        </Card>
	</div>

    );
}

New.getInitialProps = async () => {
    //.env problem 
    
    const res = await fetch(`https://next-category-subcategory-cnj96ktno-shamimalmamunaiub-gmailcom.vercel.app/api/notes`);
    const { data } = await res.json();
  
    return { categories: data }
  }

export default New;
