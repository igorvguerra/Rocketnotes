import { Container, Links, Content } from './styles';

import { Button } from '../../components/Button';
import { ButtonText } from '../../components/ButtonText';
import { Header } from '../../components/Header';
import { Section } from '../../components/Section';
import { Tag } from '../../components/Tag';


export function Details() {
  return(
    <Container>
      <Header/>
      <main>
        <Content>
          <ButtonText title="Excluir nota" />
            <h1>
              Introdução ao React
            </h1>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto minima at earum recusandae ut ipsam impedit repellat. Veniam, mollitia maiores. Dolore est animi commodi mollitia quisquam aliquid odit, delectus repellat.
            </p>
          <Section title= "Links Úteis">
            <Links>
              <li><a href='#'>https://rocketseat.com.br</a></li>
              <li><a href='#'>https://rocketseat.com.br</a></li>
            </Links>
          </Section>

          <Section title="Marcadores">
          <Tag title= "express"/>
          <Tag title= "nodejs"/>
          </Section>
      
          <Button title= "Entrar" />
        </Content>
      </main>  
    </Container>
  )
}