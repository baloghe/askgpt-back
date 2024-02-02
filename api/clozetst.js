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
	let wcase='genitive';
	
	let tmpl = `[X] := ${wcase} case of the ${target_lang} word ${word} without any apostrophe. generate a sentence using [X], put the [X] in curly brackets. write down the ${target_lang} version. translate the entire sentence to english. write down the english version`;
	
	const completion = await openai.chat.completions.create({
		model: 		'gpt-3.5-turbo',
		max_tokens: 512,
		temperature:0.5,
		messages: 	[/*{"role": "system", "content": 'use a style appropriate for a teacher'},*/
					 {"role": "user", "content": tmpl}
					]
	  });
	
    res.json(completion.choices[0].message.content);
}

module.exports = clozeTst;
