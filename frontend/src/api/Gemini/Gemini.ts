import ChatbotInterface, {TranslationResult} from "../ChatbotInterface.tsx";
import {DatabaseLanguage} from "../../DatabaseLanguage.tsx";
import {genAI, generationConfig, safetySettings} from "./Settings.ts";
import {ChatSession} from "@google/generative-ai";

class Gemini implements ChatbotInterface {
    private readonly modelVersion: string

    constructor(
        modelVersion: string = "gemini-1.5-pro"
    ) {
        this.modelVersion = modelVersion
    }

    private getSession(
        systemInstructions: string
    ): ChatSession {
        const model = genAI.getGenerativeModel({
            model: this.modelVersion,
            systemInstruction: systemInstructions
        });

        return model.startChat({
            generationConfig,
            safetySettings,
            history: [],
        });
    }

    private parseTranslationResponse(
        response: string
    ): TranslationResult {
        const javascriptMarker = '```';
        const explanationMarker = '```Explanation';
        const keyDifferencesMarker = '```Key Differences';

        const codeStart = response.indexOf(javascriptMarker) + javascriptMarker.length;
        const codeEnd = response.indexOf('```', codeStart);
        const explanationStart = response.indexOf(explanationMarker) + explanationMarker.length;
        const explanationEnd = response.indexOf('```', explanationStart);
        const keyDifferencesStart = response.indexOf(keyDifferencesMarker) + keyDifferencesMarker.length;
        const keyDifferencesEnd = response.indexOf('```', keyDifferencesStart);

        const outputCode = response.substring(codeStart, codeEnd).trim();
        const explanation = response.substring(explanationStart, explanationEnd).trim();
        const keyDifferences = response.substring(keyDifferencesStart, keyDifferencesEnd).trim();

        return {
            code: outputCode,
            explanation: explanation,
            keyDifferences: keyDifferences
        };
    }

    async sampleQuery(
        language: DatabaseLanguage
    ): Promise<string> {
        const systemInstructions = "" +
            "You are an assistant that gives sample SQL Queries. " +
            "This is the only thing you will do. " +
            "You will start your response with \"```sql\""

        const chatSession = this.getSession(systemInstructions);

        const input = `Give me a moderately complex ${language}} query`
        const result = await chatSession.sendMessage(input);
        return result.response.text();
    }

    async translate(
        inputCode: string,
        inputLang: DatabaseLanguage,
        outputLang: DatabaseLanguage
    ): Promise<TranslationResult> {
        const systemInstructions = "" +
            "You are an assistant that aids in converting " + inputLang + " code into " + outputLang +
            ". You will only convert from " + inputLang + " into " + outputLang + ". " +
            "You will also provide a explanation and key differences tag to your answer, " +
            "because you want to teach the user how to write their own code. " +
            "You will always use ``` to separate the Code from the Explanation and the Key Differences, " +
            "like so:" + outputLang + "``` ```Explanation``` ```Key Differences``` . " +
            "That is the only format you are allowed to output in. It MUST contain the Explanation " +
            "AND the Key Differences section. If prompted for a sample query, you will say \"```sql " +
            "Please press the Sample SQL Button to receive a sample SQL query.\""

        const chatSession = this.getSession(systemInstructions);

        const result = await chatSession.sendMessage(inputCode);
        return this.parseTranslationResponse(result.response.text());
    }
}

export default Gemini;