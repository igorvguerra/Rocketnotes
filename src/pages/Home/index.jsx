import { FiPlus, FiSearch } from 'react-icons/fi'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

import { Container, Brand, Menu, Search, Content, NewNote} from './styles';

import { Header } from '../../components/Header';
import { ButtonText } from '../../components/ButtonText';
import { Input } from '../../components/Input';
import { Section } from '../../components/Section';
import { Note } from '../../components/Note';

export function Home() {
    const [search, setSearch] = useState("");
    const [notes, setNotes] = useState([]);
    const [tags, setTags] = useState([]);
    const [tagsSelected, setTagsSelected] = useState([]);

    const navigate = useNavigate();

    function handleTagSelected(tagName){
        if(tagName === "all"){
            return setTagsSelected([]);
        }

        const alreadySelected = tagsSelected.includes(tagName);
        
        if(alreadySelected){
            const filteredTags = tagsSelected.filter(tag => tag !== tagName);
            setTagsSelected(filteredTags);
        }else {
            setTagsSelected(prevState => [...prevState, tagName]);
        }
    }

    function handleDetails(id){
        navigate(`/details/${id}`);
    }

    useEffect(() => {
        async function fetchTags() {
            const response = await api.get("/tags");
            setTags(response.data);
        }

        fetchTags();
    }, []);

    useEffect(()=> {
        async function fetchNotes(){
            const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`);
            setNotes(response.data);
        }

        fetchNotes();
    }, [search, tagsSelected]);

    return (
        <Container>
            <Brand>
                <h1>Got Notes</h1>
            </Brand>

            <Header/>

            <Menu>
                <li><ButtonText title="All" 
                    onClick={() => handleTagSelected("all")}
                    $isActive={tagsSelected.length === 0}
                /></li>
               { 
               tags && tags.map(tag => (
                <li key={String(tag.id)}> 
                    <ButtonText 
                    title={tag.name} 
                    onClick={() => handleTagSelected(tag.name)}
                    $isActive={tagsSelected.includes(tag.name)}
                    />
                </li>
               ))
               
               }
            </Menu>

            <Search>
                <Input 
                placeholder ="Search by title" 
                icon={FiSearch} 
                onChange={(e) => setSearch(e.target.value)}
                />
            </Search>

            <Content>
                <Section title="My Notes">
                    {
                    notes.map(note => (
                        <Note 
                            key={String(note.id)}
                            data={note}
                            onClick={() => handleDetails(note.id)}
                        />
                    ))
                }
                </Section>
            </Content>

            <NewNote to="/new">
                <FiPlus />
                    Create New Note
            </NewNote>
        </Container>
    );
};