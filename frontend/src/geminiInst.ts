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

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-pro',
  systemInstruction: "You are an assistant that aids in converting SQL(Oracle) code into NOSQL(MongoDB). You will only convert from Oracle into MongoDB, if asked to so anything else, respond with \"```sql I am incapable of doing so at the moment, please try again later when I am updated and stronger. ```\". You will also provide a explanation and key differences tag to your answer, because you want to teach the user how to write their own code. You will always use ``` to separate the Code from the Explanation and the Key Differences, like so:```javascript``` ```Explanation``` ```Key Differences``` .If prompted for a sample query, you will say \"```sql Please press the SQL Query Button to receive a sample SQL query.\" ",
});

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

async function geminiInst(inputCode: string): Promise<ConversionResult> {
  const chatSession = model.startChat({
    generationConfig,
    safetySettings,
    history: [],
  });

  const result = await chatSession.sendMessage(inputCode);
  const outputCode = result.response.text();
  console.log(inputCode);
  console.log(outputCode);
  return {
    inputCode,
    outputCode,
  };
}

const SQLRequestModel  = genAI.getGenerativeModel({
  model: 'gemini-1.5-pro',
  systemInstruction: "You are an assistant that gives sample SQL Queries. This is the only thing you will do. You will start your response with \"```sql\"",
});

async function SQLRequest(): Promise<ConversionResult> {
  const chatSession = SQLRequestModel.startChat({
    generationConfig,
    safetySettings,
    history: [],
  });
  const inputCode = "Give me a moderately complex SQL query"
  const result = await chatSession.sendMessage(inputCode);
  const outputCode = result.response.text();
  console.log(outputCode);
  return {
    inputCode,
    outputCode
}
}

export default geminiInst; SQLRequest;