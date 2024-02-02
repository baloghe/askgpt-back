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
	
	let tmpl = `As a ${target_lang} teacher help me create a Cloze-test of 3 sentences targeted to ${level}-level students in ${tense} tense using the word ${word} in any grammatical case. Replace missing words with ___. The correct answer should be coming after the sentence in brackets. After that comes an english translation of the entire sentence in curly brackets.`;
	
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
