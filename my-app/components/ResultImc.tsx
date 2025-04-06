import React from "react";
import { View } from "react-native";
import { ThemedText } from '@/components/ThemedText';

// Define o tipo das props
interface ResultImcProps {
    resultImc: string | number | null; // Aceita string, number ou null
    messageResultImc: string;
}

export default function ResultImc(props: ResultImcProps) {
    // Converte o resultado para string (se for number) e verifica se não é null/undefined
    const resultString = props.resultImc !== null ? props.resultImc.toString() : "";

    function verifyImc(result: string) {
        const formattedText = result.replace(',', '.');
        const number = parseFloat(formattedText);

        if (number < 18.5) return "Grilo";
        if (number >= 18.5 && number <= 24.9) return "Padrão";
        if (number >= 25 && number <= 29.9) return "Acima do peso papai";
        if (number >= 30 && number <= 39.9) return "Gordalho"; // Adicionei esta linha para completar a lógica
        if (number >= 40) return "Imenso";
    }

    return (
        <View>
            <ThemedText>{props.messageResultImc}</ThemedText>
            <ThemedText>{verifyImc(resultString)}</ThemedText>
        </View>
    );
}