import {DatabaseLanguage} from "../DatabaseLanguage.tsx";

export type TranslationResult = {
    code: string;
    explanation: string;
    keyDifferences: string;
}

interface ChatbotInterface {
    translate(inputCode: string, inputLang: DatabaseLanguage, outputLang: DatabaseLanguage): Promise<TranslationResult>
    sampleQuery(language: DatabaseLanguage): Promise<string>
}

export default ChatbotInterface;