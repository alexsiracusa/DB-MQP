import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai';

interface ConversionResult {
  inputCode: string;
  outputCode: string;
}


//const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI("AIzaSyAlD6FrN_42aVGKlVlEnKrAgsVeY7yx-u4");


const generationConfig = {
  temperature: 0.5,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

async function geminiInst(inputCode: string, inputLang: string, outputLang: string): Promise<ConversionResult> {

  const instructions = "You are an assistant that aids in converting "+ inputLang + " code into " + outputLang + ". You will only convert from "+ inputLang + " into " + outputLang +". You will also provide a explanation and key differences tag to your answer, because you want to teach the user how to write their own code. You will always use ``` to separate the Code from the Explanation and the Key Differences, like so:"+ outputLang + "``` ```Explanation``` ```Key Differences``` . That is the only format you are allowed to output in. It MUST contain the Explanation AND the Key Differences section. If prompted for a sample query, you will say \"```sql Please press the Sample SQL Button to receive a sample SQL query.\"" 

  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-pro',
    systemInstruction: instructions,
  });

  const chatSession = model.startChat({
    generationConfig,
    safetySettings,
    history: [],
  });

  const result = await chatSession.sendMessage(inputCode);
  const outputCode = result.response.text();
  console.log(instructions);
  console.log(inputCode);
  console.log(outputCode);
  return {
    inputCode,
    outputCode,
  };
}

export default geminiInst;