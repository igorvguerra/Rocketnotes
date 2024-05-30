import { useNavigate } from 'react-router-dom';

import { Container, Form } from './styles';
import { useState } from 'react';
import { api } from '../../services/api';

import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Textarea } from '../../components/Textarea';
import { NoteItem } from '../../components/NoteItem';
import { Section } from '../../components/Section';
import { Button } from '../../components/Button';
import { ButtonText } from '../../components/ButtonText';


export function New() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [links, setLinks] = useState([]);
    const [newLink, setNewLink] = useState("");

    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");

    const navigate = useNavigate();

    function handleReturn(){
        navigate(-1);
    }

    function handleAddLink(){
        setLinks(prevState => [...prevState, newLink])
        setNewLink("");
    }

    function handleRemoveLink(deleted){
        setLinks(prevState => prevState.filter(link => link !== deleted));
    }

    function handleAddTag(){
        setTags(prevState => [...prevState, newTag]);
        setNewTag("");
    }

    function handleRemoveTag(deleted) {
        setTags(prevState => prevState.filter(tag => tag !== deleted));
    }


    async function handleNewNote(){
        if(!title){
            return alert("Attention! Insert the note title.")
        }
        
        if(newLink){
            return alert("Attention! You have one unconfirmed Link.")
        }
        
        if(newTag){
            return alert("Attention! You have one unconfirmed Tag.")
        }

        if (!newLink && links.length === 0) {
            return alert("Insert at least one link.")
          }
          
        if (!newTag && tags.length === 0) {
            return alert("Insert at least one tag.")
          }
        await api.post("/notes", {
            title,
            description,
            links,
            tags
        
        });

        alert("New note successfully created!");
        handleReturn();
    }
    return(
        <Container>
            <Header />

            <main>
                <Form>
                    <header>
                        <h1>Create New Note</h1>
                        <ButtonText 
                            title="Return"
                            onClick={handleReturn}
                        />
                    </header>

                    <Input 
                    placeholder="Title" 
                    onChange={e => setTitle(e.target.value)}
                    />
                    <Textarea 
                    placeholder="Description" 
                    onChange={e => setDescription(e.target.value)}
                    />

                    <Section title="Links" >
                        {
                            links.map((link, index) => (
                                <NoteItem 
                                key={String(index)}
                                value={link}
                                onClick={() => handleRemoveLink(link)}
                                />
                            ))
                        }
                        <NoteItem 
                            isNew
                            placeholder="New link"
                            value={newLink}
                            onChange={e => setNewLink(e.target.value)}
                            onClick={handleAddLink}
                        />
                        
                    </Section>
                    <Section title="Tags">
                        <div className='tags'>
                            {
                                tags.map((tag, index) => (
                                    <NoteItem 
                                    key={String(index)}
                                    value={tag} 
                                    onClick={() => handleRemoveTag(tag)}
                                    />
                                ))
                            }
                            <NoteItem 
                            isNew 
                            placeholder="New tag" 
                            onChange={e => setNewTag(e.target.value)}
                            value={newTag}
                            onClick={handleAddTag}
                            />
                        </div>
                    </Section>
                    <Button 
                    title="Save" 
                    onClick={handleNewNote}
                    />
                </Form>
            </main>
        </Container>

    );
}