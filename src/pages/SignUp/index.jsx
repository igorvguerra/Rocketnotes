import { useState } from "react";
import { Container, Form, Background } from './styles';

import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

import { api } from "../../services/api";

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';


export function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function HandleSingUp(){
        if(!name || !email || !password){
           return alert("Favor preencher todos os campos.");
        }

        api.post("/users", { name, email, password }).then(() => {
            alert("Usuário cadastrado com sucesso.");
            navigate("/");
        }).catch(error => {
            if(error.response){
                alert(error.response.data.message);
            }else {
                alert("Não foi possível cadastrar.");
            }
        });
    };

    return(
        <Container>
            <Background/>
            <Form>
                <h1>Got Notes</h1>
                <p>Save your important notes here!</p>

                <h2>Create an account</h2>

                <Input 
                    placeholder="Name"
                    type="text"
                    icon={FiUser}
                    onChange={e => setName(e.target.value)}
                />

                <Input 
                    placeholder="E-mail"
                    type="text"
                    icon={FiMail}
                    onChange={e => setEmail(e.target.value)}
                />

                <Input 
                    placeholder="Password"
                    type="password"
                    icon={FiLock}
                    onChange={e => setPassword(e.target.value)}
                />

                <Button title="Register" onClick={HandleSingUp} />

                <Link to="/">
                    Return to login
                </Link>
            </Form>
        </Container>
    );
}