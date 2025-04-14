import react from "react";
import { Button, View } from "react-native"
import * as SQLite from 'expo-sqlite';
import { useState } from "react";

// componentes
 const Banco = ()=>{
    const  [isnome, setnome]= useState('a');
    const  [isidade, setidade]= useState('a');

    async function criaDatabase(){
        const db = await SQLite.openDatabaseAsync('PAM2');
        
        if(db){
            console.log('banco criado');
            return db;
        }else{
            console.log('erro');
        }
        
    }

    async function CriarDados(){
        try{
        const db = await criaDatabase();
        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL, value TEXT);
            `);
            console.log('Tabela Criada')
        }catch(error){
            console.error('Não criado, erro : '+error);
        }
    }
    
    async function cadastrar(isnome: string, isidade: string){
        try{
            const db = await criaDatabase();
            await db.execAsync(`
                PRAGMA journal_mode = WAL;
                INSERT INTO test (value, intValue) VALUES (${isnome}, ${isidade});
                `);
                console.log('Tabela Cadastrada')
            }catch(error){
                console.error('Não criado, erro : '+error)
            }
    }

    return(
        <View>
            <Button
            title="Create Banco"
            onPress={criaDatabase}
            />

                <View style={{margin: 10}}></View>

            <Button
            title="Inserir dados"
            onPress={CriarDados}
            />

            <View style={{margin: 10}}></View>

            <Button
                title="Inserir dados"
                onPress={() => cadastrar(isnome,  isidade)}
                />
          </View>

    )
 }
 export default Banco;