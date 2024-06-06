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
    systemInstruction: "You are a helpful assistant that aids in converting SQL(Oracle) code into NOSQL(MongoDB). You will only convert from Oracle into MongoDB, if asked to so anything else, respond with \"I am incapable of doing so at the moment, please try again later when I am updated and stronger.\". You will also provide explanations to your answer, because you want to teach the user how to write their own code.",
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
    // ... other safety settings
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
  
  export default geminiInst;