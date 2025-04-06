import React, { useState } from "react";
import { View, TextInput, StyleSheet, Button } from "react-native";
import { ThemedText } from '@/components/ThemedText';
import ResultImc from "./ResultImc";

export default function Form() {
    // Estados como string (para permitir digitação livre)
    const [height, setHeight] = useState<string>("");
    const [weight, setWeight] = useState<string>("");
    const [messageImc, setMessageImc] = useState<string>("Preencha o peso e altura");
    const [imc, setImc] = useState<number | null>(null);
    const [textButton, setTextButton] = useState<string>("Calcular");

    // Converte string para number (tratando vírgulas e pontos)
    const parseNumber = (text: string): number | null => {
        const formattedText = text.replace(',', '.');
        const number = parseFloat(formattedText);
        return isNaN(number) ? null : number;
    };

    // Calcula IMC
    const imcCalculator = () => {
        const heightNumber = parseNumber(height);
        const weightNumber = parseNumber(weight);

        if (!weightNumber || !heightNumber || heightNumber === 0) {
            setMessageImc("Preencha o peso e altura corretamente");
            return;
        }

        const calculatedImc = weightNumber / (heightNumber * heightNumber);
        setImc(calculatedImc);
        setMessageImc(`Seu IMC é: ${calculatedImc.toFixed(2)}`);
    };

    // Validação
    const validationImc = () => {
        if (height && weight) {
            imcCalculator();
            setHeight("");
            setWeight("");
            setTextButton("Calcular novamente");
            return;
        }
        setImc(null);
        setTextButton("Calcular");
        setMessageImc("Preencha o peso e altura");
    };

    return (
        <View>
            <View>
                <ThemedText>Altura</ThemedText>
                <TextInput
                    onChangeText={setHeight}
                    value={height}
                    placeholder="Ex. 1.75"
                    keyboardType="decimal-pad" // Melhor para decimais
                    placeholderTextColor="gray"
                    style={styles.input}
                />
                <ThemedText>Peso</ThemedText>
                <TextInput
                    onChangeText={setWeight}
                    value={weight}
                    placeholder="Ex. 80.5"
                    keyboardType="decimal-pad"
                    placeholderTextColor="gray"
                    style={styles.input}
                />
                <Button 
                    onPress={validationImc}
                    title={textButton}
                />
            </View>
            <ResultImc resultImc={imc} messageResultImc={messageImc} />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        color: 'white',
        backgroundColor: '#333',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
});