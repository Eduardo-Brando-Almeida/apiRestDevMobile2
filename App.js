import { useState } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Button, TextInput, List, Dialog, Modal, Portal, PaperProvider } from 'react-native-paper';
import { css } from './assets/css/style'
import ViaCep from './assets/ViaCep'

export default function App() {
  
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 50};

  const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
    'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  const[ cep, setCep  ] = useState('');
  let [ dados, setDados ] = useState([]);

  const [expanded, setExpanded] = useState(false);
  const [ selectedValue, setSelectedValue ] = useState(null);
  const [ selectedSex, setSelectedSex ] = useState(null);

  // Ciar uma função para mudar o estado

  const handleAccordionPress = () => setExpanded(!expanded) 

  // Pegar o valor do selection e mostrar na tela

  const handleItemPress=(x)=>{
    setSelectedValue(x);
    setExpanded(false);
  }

  const handleSexPress=(x)=>{
    setSelectedSex(x);
    setExpanded(false);
  }


  const buscaCep=(xcep)=>{
    let url = `https://viacep.com.br/ws/${xcep}/json/`;

    fetch(url)
      .then(
        ( resp )=> { return resp.json() }
      ).then(
        ( dados )=> { 
            console.log(dados);
            setDados(dados);
            setSelectedValue(dados.uf)
          }
      ).catch(
        ()=> { 
          showModal();
         }
      )
  
  }  
  return (
    <PaperProvider>
      <ScrollView>
        <View style={styles.container}>
          <TextInput
            label='Nome'
            mode='outlined'
          />
          <TextInput
            label='Email'
            mode='outlined'
          />
          <List.Section title='Sexo'>
            <List.Accordion title={selectedSex == null ? 'Selecione o Sexo' : selectedSex} expanded={expanded} onPress={handleAccordionPress}>
              <List.Item title="Maculino" onPress={()=> {handleSexPress("Masculino")}}/>
              <List.Item title="Feminino" onPress={()=> {handleSexPress("Feminino")}}/>
              <List.Item title="Outro" onPress={()=> {handleSexPress("Outro")}}/>
            </List.Accordion>
          </List.Section>

          <TextInput
            placeholder='Digite o CEP'
            onChangeText={(x) => {setCep(x)}}
            onBlur={() => {buscaCep(cep)}}
            style={{
              borderColor: 'black',
              borderWidth: 1,
              borderStyle: 'Solid',
              borderRadius: 4,
              margin: 5,
            }}
          />
          <TextInput
            label='Rua'
            mode='outlined'
            value={dados.logradouro}
            onChangeText={(value) => {setDados(dados.logradouro = value)}}
          />
          <TextInput
            label='Complemento'
            mode='outlined'
            value={dados.complemento}
            onChangeText={(value) => {setDados(dados.complemento = value)}}
          />
          <TextInput
            label='Bairro'
            mode='outlined'
            value={dados.bairro}
            onChangeText={(value) => {setDados(dados.bairro = value)}}
          />
          <TextInput
            label='Cidade'
            mode='outlined'
            value={dados.localidade}
            onChangeText={(value) => {setDados(dados.localidade = value)}}
          />
          <List.Section title="Estado">
            <List.Accordion
              title={selectedValue == null ? 'Selecione o Estado' : selectedValue}
              expanded={expanded}
              onPress={handleAccordionPress}
            >
              <ScrollView style={{ maxHeight: 200 }}>
                {estados.map((estado) => (
                  <List.Item
                    key={estado}
                    title={estado}
                    onPress={() => { handleItemPress(estado); }}
                  />
                ))}
              </ScrollView>
            </List.Accordion>
          </List.Section>

          <Button
            mode='outlined'
          >Cadastrar</Button>

          <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
              <Text>Este CEP não existe</Text>
              <Button onPress={hideModal}>Fechar</Button>
            </Modal>
          </Portal>
        </View>
      </ScrollView>
    </PaperProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 8,
    justifyContent: 'center',
  },
});
