const ChatGPT_Key	= process.env.REACT_APP_CHATGPT_KEY;

const { OpenAI } = require('openai');

//ChatGPT config
const openai = new OpenAI({
  apiKey: ChatGPT_Key
});

async function clozeTst(req, res){
	
	let target_lang='Turkish';
	let word='şahıs';
	let tense='present';
	let level='beginner';
	
	let tmpl = `create 1 Cloze-test in ${target_lang} targeted to ${level}-level students in ${tense} tense using this word: ${word}. Place a $ sign before the test. Mark the hidden word with ##. Provide the completed test in brackets, followed by an English translation in curly brackets`;
	
	const completion = await openai.chat.completions.create({
		model: 		'gpt-3.5-turbo',
		max_tokens: 512,
		temperature:0.2,
		messages: 	[{"role": "system", "content": 'explain things like a language teacher'},
					 {"role": "user", "content": tmpl}
					]
	  });
	
    res.json(completion.choices[0].message.content);
}

module.exports = clozeTst;
