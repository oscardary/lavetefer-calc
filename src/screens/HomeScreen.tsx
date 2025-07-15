import { View, Text, StyleSheet, FlatListComponent } from 'react-native';
import { useState } from 'react';
import { iMedicamento } from '../types/medicamento';
import { FlatList, TextInput } from 'react-native-gesture-handler';

const medicamentoDemo: iMedicamento[] = [
    {id: '1', nombre: 'Medicamento 1', dosisPorKg: 5, unidad: 'mg'},
    {id: '2', nombre: 'Medicamento 2', dosisPorKg: 0.03, unidad: 'ml'}
];

export default function HomeScreen() {
    const [peso, setPeso] = useState<number | null>(null);

    const calcularDosis = (medicamento: iMedicamento): string => {
        if (peso === null) return '?';
        const dosis = peso * medicamento.dosisPorKg;
        return `${dosis.toFixed(2)} ${medicamento.unidad}`;
    };

    return (
        <View style={style.container}>
            <Text style={style.title}>Calculadora de medicamentos</Text>

            <TextInput 
            placeholder='Peso del animal'
            keyboardType='numeric'
            style={style.input}
            onChangeText={(value)=> setPeso(parseFloat(value))} />

            <FlatList
                data={medicamentoDemo}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <Text style={style.medicamento}>
                        {item.nombre}: {calcularDosis(item)} 
                    </Text>
                )} />
        </View>        
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#f2f2f2'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        fontSize: 16,
    },
    medicamento: {
        fontSize: 10,
        marginVertical: 5,
    }
});