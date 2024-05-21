import { RiShutDownLine } from 'react-icons/ri';
import { api } from '../../../../../api/src/services/api';
import avatarPlaceHolder from '../../assets/avatar_placeholder.svg';
import { useNavigate } from 'react-router-dom';


import { useAuth } from '../../hooks/auth';

import { Container, Profile, Logout } from './styles';

export function Header() {
    const { signOut, user } = useAuth();

    const navigate = useNavigate();

    function handleSignOut(){
        navigate("/")
        signOut();
    }

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceHolder;
    
    return (
        <Container>
            <Profile to="/profile">
                <img src={avatarUrl} alt={user.name} />

                <div>
                    <span>Bem-vindo</span>
                    <strong>{user.name}</strong>
                </div>
            </Profile>

            <Logout onClick={handleSignOut}>
                <RiShutDownLine/>
            </Logout>

        </Container>
    );
}