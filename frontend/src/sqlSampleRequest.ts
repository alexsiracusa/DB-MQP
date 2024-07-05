import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from '@google/generative-ai';

  
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


  
  const model  = genAI.getGenerativeModel({
    model: 'gemini-1.5-pro',
    systemInstruction: "You are an assistant that gives sample SQL Queries. This is the only thing you will do. You will start your response with \"```sql\"",
  });
  
  async function SQLRequest(): Promise<string> {
    const chatSession = model.startChat({
      generationConfig,
      safetySettings,
      history: [],
    });
    const inputCode = "Give me a moderately complex SQL query"
    const result = await chatSession.sendMessage(inputCode);
    const outputCode = result.response.text();
    console.log(inputCode);
    console.log(outputCode);
    return outputCode
  }
  
  export default SQLRequest;