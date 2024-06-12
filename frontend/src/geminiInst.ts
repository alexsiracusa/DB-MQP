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
    systemInstruction: "You are a helpful assistant that aids in converting SQL(Oracle) code into NOSQL(MongoDB). You will only convert from Oracle into MongoDB, if asked to so anything else, respond with \"I am incapable of doing so at the moment, please try again later when I am updated and stronger.\". You will also provide a explanation and key differences tag to your answer, because you want to teach the user how to write their own code. You will always use ``` to separate the Code from the Explanation and the Key Differences, like so:```javascript``` ```Explanation``` ```Key Differences``` . You will use the following schema if prompted for a sample query:\n\nCREATE TABLE Media (\n\tid\t\t\tINT\t\tPrimary Key,\n\ttitle_english\tTEXT,\n\ttype\t\t\tMEDIA_TYPE,\n\tformat\t\tMEDIA_FORMAT,\n\tdescription\t\tTEXT,\n\tstart_date \t\tINT,\t-- Integer date in YYYYMMDD format\n\tend_date\t\tINT,\t-- Integer date in YYYYMMDD format\n\tepisodes\t\tINT,\n\tchapters\t\tINT,\n\tmean_score\t\tINT,\n);\n\n\n\n\n\n\n\nCREATE TABLE Character (\n\tid\t\t\tINT\t\tPrimary Key,\n\tname_full\t\tTEXT,\t\n\tgender\t\tTEXT, \t-- Usually \"Male\", or \"Female\"\n\tdate_of_birth\tINT,\t\t-- Integer date in YYYYMMDD format\n\tblood_type\t\tTEXT,\t\n\tfavorites\t\tINT,\n);\n\nCREATE TABLE Character_Name_Alternatives (\n\tcharacter_id\tINT\t\tREFERENCES Character (id),\n\talternative_name\tTEXT,\t\n\tis_spoiler\t\tBOOLEAN,\n\t\n\tPrimary Key (character_id, alternative_name)\n);\n\nCREATE TABLE Staff (\n\tid\t\t\tINT\t\tPrimary Key,\n\tname_full\t\tTEXT,\t\n\tlanguage\t\tLANGUAGE,\n\tgender\t\tTEXT,\t\t-- Usually “Male”, or “Female”\n\tdate_of_birth\tINT,\t\t-- Integer date in YYYYMMDD format\n\tdate_of_death\tINT,\t\t-- Integer date in YYYYMMDD format\n\tblood_type\t\tTEXT,\n);\n\nCREATE TABLE Staff_Name_Alternatives (\n\tstaff_id\t\tINT\t\tREFERENCES Staff (id),\n\talternative_name\tTEXT,\n\t\n\tPrimary Key (staff_id, alternative_name)\n);\n\nCREATE TABLE Staff_Occupations (\n\tstaff_id\t\tINT\t\tREFERENCES Staff (id),\n\toccupation\t\tTEXT,\t\n\t\n\tPrimary Key (staff_id, occupation)\n);\n\n\n\nCREATE TABLE Character_Cast (\n\tid\t\t\tINT \tUNIQUE,\n\tmedia_id\t\tINT \tREFERENCES Media (id),\t\n\tcharacter_id\tINT \tREFERENCES Character (id),\n\tcharacter_role\tCHARACTER_ROLE,\t\n\t\n\tPrimary Key (id, media_id, character_id)\t\n);\n\nCREATE TABLE Character_Cast_Voice (\n\tcharacter_cast_id\t\tINT\t\tREFERENCES Character_Cast (id),\n\tvoice_actor_id\t\tINT \t\tREFERENCES Staff (id),\t\n\trole_notes\t\t\tTEXT,\t\n\tdub_group\t\t\tTEXT,\t\t-- Used when multiple dubs exist \t\t\t\t\t\n\tPrimary Key (character_cast_id, voice_actor_id)\n);\n",
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