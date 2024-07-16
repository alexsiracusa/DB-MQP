export const databaseLanguages = ["PL/SQL", "PL/pgSQL", "MQL", "Raw MQL"]
export type DatabaseLanguage = typeof databaseLanguages[number]

// "Raw MQL" language doesn't work with the chatbot. It's meant to be the
// raw mongodb query language, but I couldn't find a formal name

// MongoDB Command docs:
// https://www.mongodb.com/docs/manual/reference/command/#std-label-database-commands