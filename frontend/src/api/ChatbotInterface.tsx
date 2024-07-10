import {DatabaseLanguage} from "../DatabaseLanguage.tsx";

type TranslationResult = {
    inputCode: string;
    outputCode: string;
}

interface ChatbotInterface {
    translate(inputCode: string, inputLang: DatabaseLanguage, outputLang: DatabaseLanguage): Promise<TranslationResult>
    sampleQuery(language: DatabaseLanguage): Promise<string>
}

export default ChatbotInterface;