const ChatGPT_Key	= process.env.REACT_APP_CHATGPT_KEY;

const { OpenAI } = require('openai');

//ChatGPT config
const openai = new OpenAI({
  apiKey: ChatGPT_Key
});

async function testAI(req, res){
	
	const completion = await openai.chat.completions.create({
		model: 		'gpt-3.5-turbo',
		max_tokens: 512,
		temperature:0.2,
		messages: 	[{"role": "system", "content": 'Explain things to a fourth grader'},
					 {"role": "user", "content": 'What is weather?'}
					]
	  });
	
    res.json(completion.choices[0].message.content);
}

module.exports = testAI;
