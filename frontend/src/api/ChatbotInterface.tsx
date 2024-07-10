
type DatabaseLanguage = "PL/pgSQL" | "PL/SQL" | "MQL" | "MongoDBCommand";

// MongoDB Command docs:
// https://www.mongodb.com/docs/manual/reference/command/#std-label-database-commands

type TranslationResult = {
    inputCode: string;
    outputCode: string;
}

interface ChatbotInterface {
    translate(inputCode: string, inputLang: DatabaseLanguage, outputLang: DatabaseLanguage): Promise<TranslationResult>
    sampleQuery(language: DatabaseLanguage): Promise<string>
}

export default ChatbotInterface;