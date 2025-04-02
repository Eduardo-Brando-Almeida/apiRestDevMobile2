import { useState } from "react";
import { StyleSheet, SafeAreaView, Text, TextInput } from "react-native";
import { css } from "./css/style"
import { Button } from 'react-native-paper'

export default ViaCep =()=>{
  const[ cep, setCep  ] = useState('xxxx');
  let [ dados, setDados ] = useState([]);

  //----------------------------------------------------------------
  const buscaCep=(arg)=>{
    let url = `https://viacep.com.br/ws/${arg}/json/`;
    fetch(url)
      .then(
        ( resp )=> { return resp.json() }
      ).then(
        ( xjson )=> { 
            console.log(xjson);
            setDados(xjson);
          }
      ).catch(
        ()=> { 
          console.log(erro);
         }
      )
    
  }  

  return(
    <>
    <TextInput 
        placeholder='Digite o Cep'
        onChangeText={(value)=> { setCep(value) }}
        /*style={{
          border: '2px',
          margin: 5
        }}*/
      />
      <Text>{cep}</Text>
      <Button 
        mode="contained" onPress={()=>{buscaCep( cep )}}
      > Buscar </Button>
      <Text style={css.text}> Logradouro: {dados.logradouro}</Text>
      <Text style={css.text}> Bairro: {dados.bairro}</Text>
      <Text style={css.text}> Cidade: {dados.localidade}</Text>
      <Text style={css.text}> Estado: {dados.estado}</Text>
    </>
  );
}