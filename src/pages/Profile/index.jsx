import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { Container, Form, Avatar } from './styles';
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi';
import avatarPlaceHolder from '../../assets/avatar_placeholder.svg';
import { api } from '../../services/api';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';


export function Profile() {
    const { user, updateProfile } = useAuth();
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [passwordOld, setPasswordOld] = useState();
    const [passwordNew, setPasswordNew] = useState();

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceHolder;
    const [avatar, setAvatar] = useState(avatarUrl);
    const [avatarFile, setAvatarFile] = useState(null);

    async function handleUpdate(){
        if (passwordOld && !passwordNew) {
            alert("Insert a new password!");
            return;
          }
        
        const updated = {
            name,
            email,
            password: passwordNew,
            old_password: passwordOld,
            
        }

        const userUpdated = Object.assign(user, updated);
        

        await updateProfile({ user: userUpdated, avatarFile });
    }

    function handleChangeAvatar(event){
        const file = event.target.files[0];
        setAvatarFile(file);

        const imagePreview = URL.createObjectURL(file);
        setAvatar(imagePreview);
    }

    const navigate = useNavigate();
    
    function handleReturn(){
        navigate(-1);
    }

    return(
        <Container>
            <header>
                <button type='button' onClick={handleReturn}>
                    <FiArrowLeft />
                </button>

            </header>

            <Form>

                <Avatar>
                    <img src={avatar} alt="user picture" />
                    <label htmlFor="avatar">
                        <FiCamera />
                        <input type="file" id='avatar' onChange={handleChangeAvatar} />

                    </label>
                </Avatar>
                <Input 
                    placeholder="Name"
                    type="text"
                    icon={FiUser}
                    value={name}
                    onChange={e=> setName(e.target.value)}
                />

                <Input 
                    placeholder="E-mail"
                    type="text"
                    icon={FiMail}
                    value={email}
                    onChange={e=> setEmail(e.target.value)}
                />

                <Input 
                    placeholder="Current Password"
                    type="password"
                    icon={FiLock}
                    onChange={e=> setPasswordOld(e.target.value)}
                />
                
                <Input 
                    placeholder="New Password"
                    type="password"
                    icon={FiLock}
                    onChange={e=> setPasswordNew(e.target.value)}
                />

                <Button title="Save" onClick={handleUpdate} />
            </Form>
        </Container>
    );
};