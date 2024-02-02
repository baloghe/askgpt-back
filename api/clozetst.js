const ChatGPT_Key	= process.env.REACT_APP_CHATGPT_KEY;

const { OpenAI } = require('openai');

//ChatGPT config
const openai = new OpenAI({
  apiKey: ChatGPT_Key
});

async function clozeTst(req, res){
	
	let target_lang='Turkish';
	let word='tabanca';
	let tense='present';
	let level='beginner';
	
	let tmpl = `You are a language teacher. Generate 3 turkish sentences for beginner-level students. The sentences should contain the word "${word}" or its modified version. Replace the occurences of ${word} by ____ and write it in brackets after each sentence. Provide an English translation for each sentence in curly brackets.`;
	
	const completion = await openai.chat.completions.create({
		model: 		'gpt-3.5-turbo',
		max_tokens: 512,
		temperature:0.2,
		messages: 	[{"role": "system", "content": 'be concise'},
					 {"role": "user", "content": tmpl}
					]
	  });
	
    res.json(completion.choices[0].message.content);
}

module.exports = clozeTst;
