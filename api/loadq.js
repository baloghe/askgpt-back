const { MongoClient } = require('mongodb');

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PW}@${process.env.MONGODB_URL}/${process.env.MONGODB_DB}`;

const mockTests = [
{title: "Sen hep gülümse",
sentences: [{TR: "Gülmeyeceksin!", EN:"You won't laugh!"}
,{TR: "Gülerim", EN:"I laugh."}
,{TR: "Gülmeyeceksin işte!", EN:"Well you won't laugh!"}
,{TR: "Ya ne olmuş ya güldüysek?", EN:"So what if we laughed?"}
,{TR: "Arkadaşlar ne oluyor?", EN:"What's happening, guys?"}
,{TR: "Ne olacak, durduk yere her şeye gülüyor işte!", EN:"What will happen? He laughs at everything for no reason!"}
,{TR: "Öyle mi? Bak sen!", EN:"Really? Watch!"}
,{TR: "Ya, sanki sen hiç gülmüyorsun?", EN:"Oh, it's like you never laugh?"}
,{TR: "Hiç de bile gülmüyorum.", EN:"I don't even laugh at all."}
,{TR: "Kendi kendine gülene ne derler biliyor musun?", EN:"Do you know what they say about someone who laughs at himself?"}
,{TR: "Bilmem, ne derler?", EN:"I don't know, what do they say?"}
,{TR: "Sen de yerli yersiz gülenlerdensin galiba amca!", EN:"I guess you're one of those who laugh all the time, uncle!"}
,{TR: "Gülmek fena mi ya?", EN:"Is it bad to laugh?"}
,{TR: "Ben mümkünse hep gülerim.", EN:"I always laugh if possible."}
,{TR: "Kemal Sunal değil mi o?", EN:"He's Kemal Sunal, isn't he?"}
,{TR: "Evet! Kemal Sunal yaşiyor mu?", EN:"Yes! Is Kemal Sunal alive?"}
,{TR: "Evet, ayıptır söylemesi o benim.", EN:"Yes, it's a shame for me to say that."}
,{TR: "Bakma sen bunlara Kemal abi.", EN:"Don't look at these, Kemal bro."}
,{TR: "Gülmek hiç fena olur mu?", EN:"Is it ever bad to laugh?"}
,{TR: "Hem zaten sen gülünce herkes gülüyor.", EN:"Besides, when you laugh, everyone laughs."}
,{TR: "Ama herkes derken herkes!", EN:"I do mean everyone!"}
,{TR: "Evet! Ailem, mahallem, yurdum, milletim...", EN:"Yes! My family, my neighborhood, my country, my nation..."}
,{TR: "Hatta bütün dünya!", EN:"Even the whole world!"}
,{TR: "Ve sen öyle güzel gülüyorsun ki Kemal abi, gülüşün unutulmuyor.", EN:"And you smile so beautifully, Kemal bro, your smile is unforgettable."}
,{TR: "Ah canım benim, sağ olasin...", EN:"Oh my dear, thank you..."}
,{TR: "Bizim için gülmeye devam et, tamam mı?", EN:"Keep smiling for us, okay?"}
,{TR: "Merak etme sen, o iş bende.", EN:"Don't worry, that's my job."}
]},
{title: "Tuğçe Tenbel - 1",
sentences: [{TR: "En başta her şey çok zordu.", EN: "Everything was very difficult at first."}
,{TR: "İlk başta bulunan işler Türkiye'de burun kıvıracağınız işler oluyor.", EN: "The first jobs you find are the ones you would turn your nose up at in Turkey."}
,{TR: "Ben ilk olarak okul temizliğine gittim.", EN: "First, I went to school cleaning."}
,{TR: "Elime 600 euro civarı geçiyordu.", EN: "I received around 600 euros."}
,{TR: "Sonrasında Burger King'te çalıştım.", EN: "Afterwards, I worked at Burger King."}
,{TR: "Orası benim için çok zordu.", EN: "It was very difficult for me there."}
,{TR: "Hayatım boyunca beni o kadar tüketen bir işte çalışmadım.", EN: "I have never in my life worked in a job that drained me so much."}
,{TR: "Şu an büyük bir market zincirinde çalışıyorum.", EN: "I currently work in a large grocery chain."}
,{TR: "Elime haftalık 400 euro kadar bir para geçiyor, bu da beni rahat geçindiriyor.", EN: "I get about 400 euros a week, which allows me to live comfortably."}
,{TR: "Şu an Cork şehrindeyim.", EN: "I'm currently in Cork city."}
,{TR: "O röportajın yapıldığı sırada Dublin'de bisiklet ile yemek dağıtıyordum.", EN: "At the time of that interview, I was delivering food on a bicycle in Dublin."}
,{TR: "Yağmurun altında çalıştığım da oldu, kaza da geçirdim.", EN: "I sometimes worked in the rain and had an accident."}
,{TR: "Irkçılar tarafından saldırıya uğradığım da oldu.", EN: "I have also been attacked by racists."}
,{TR: "Burada bisiklet ile yemek dağıtanlar dışarıdan gelen öğrenciler olur.", EN: "Here, those who deliver food on bicycles are foreign students."}
,{TR: "Irkçı gruplar en çok onları hedef alıyor.", EN: "Racist groups target them the most."}
]},
{title: "Tuğçe Tenbel - 2",
sentences: [{TR: "Burada öğrenciler yüksek lisans eğitim için gereken parayı bu tip işlerle çıkarır.", EN: "Here, students earn the money needed for graduate education through such jobs."}
,{TR: "O yüzden de çalışmak istedim, bisiklet sürmeyi de zaten seviyordum. ", EN: "That's why I wanted to work, and I loved cycling anyway."}
,{TR: "Sonra arkadaşım böyle bir video çekmek istedi.", EN: "Then my friend wanted to shoot such a video."}
,{TR: "O zaman bu kadar yayılacağını düşünmedim.", EN: "At that time I didn't think it would spread this much."}
,{TR: "Geçenlerde arkadaşım videonun o kısmını tekrar paylaştı.", EN: "Recently, my friend shared that part of the video again."}
,{TR: "Marmara Hukuk mezunu avukat kuryelik yapıyor, şeklinde yayıldı.", EN: "It was spread that the Marmara Law graduate lawyer is working as a courier."}
,{TR: "Tepkiler daha çok olumlu yönde miydi yoksa olumsuz mu?", EN: "Were the reactions mostly positive or negative?"}
,{TR: "Üzülerek söylüyorum genelde olumlu tepkiler geldi.", EN: "I'm sorry to say that the reactions were generally positive."}
,{TR: "Tek tek yorumlara baktım.", EN: "I looked at the comments one by one."}
,{TR: "Herkes ne demek istediğimi açmaya çalışmış.", EN: "Everyone tried to explain what I meant."}
,{TR: "Kimse mutlu değil, insanlar bana hak vermiş.", EN: "Nobody is happy, people agreed with me."}
,{TR: "Ülkemiz aslında güzel, şöyle fırsatlar var.", EN: "Our country is actually beautiful, there are such opportunities."}
]},
{title: "Tuğçe Tenbel - 3",
sentences: [{TR: "Geceleri arkama bakmadan yürüyorum, bunun parasal bir karşılığı yok.", EN: "I walk at night without looking back, there is no financial reward for this."}
,{TR: "Ben herhangi bir para karşılığı Türkiye'ye dönmem.", EN: "I would not return to Turkey for any money."}
,{TR: "İçimi rahatlatacak bir noktaya gelmem lazım.", EN: "I need to get to a point where I feel comfortable."}
,{TR: "O kadar emek verdim, burada yüksek lisans yapmam lazım.", EN: "I worked so hard, I need to get a master's degree here."}
,{TR: "Ayrıca buranın da kendine göre sorunları var.", EN: "Also, this place has its own problems."}
,{TR: "Henüz İngilizceyi tam olarak öğrenemedim.", EN: "I haven't learned English fully yet."}
,{TR: "Şu an daha yeni yüksek lisans başvurumu yaptım.", EN: "I've just applied for a master's degree."}
,{TR: "Bana yazanlardan nasıl gelebileceğini soranlardan bile bunu fark ediyorum.", EN: "I notice this even from those who write to me and ask how they can come."}
,{TR: "Tekrardan burada okul okumam ve ruhsat almam gerekiyor.", EN: "I need to study here again and get a license."}
,{TR: "Tabii ki zoruma gidiyor.", EN: "Of course it bothers me."}
,{TR: "Ama Türkiye'de hayalini bile kuramayacağım şeyleri burada yapabileceğimi gördüm.", EN: "But I saw that I could do things here that I could not even dream of in Turkey."}
,{TR: "O çatışmayı yaşadığım oluyor.", EN: "I sometimes experience that conflict."}
]},
{title: "Doğu - Betül Eczanesi",
 sentences: [{TR: "Buna ne kadardı?", EN:"How much does this cost?"}
,{TR: "Fiyatlar üstünde yazıyor.", EN:"The price is written on."}
,{TR: "Prezervatif. Aynı şekilde burada.", EN:"Condom. Something alike."}
,{TR: "Prezervatif demeye neden utandın?", EN:"Why were you embarrassed to say condom?"}
,{TR: "Tesettürlüyüm diye mi?", EN:"Because of my hijab?"}
,{TR: "Ayıp olmasın diye.", EN:"Just to avoid shame."}
,{TR: "Bıktım artık sizin şu ataerkil sığ zihniyetinizden ya.", EN:"I'm fed up with your shallow patriarchal mentality."}
,{TR: "Temassız var mıydı?", EN:"Contactless (payment) is available?"}
,{TR: "Vardı temassız vardı.", EN:"Sure, there is contactless."}
,{TR: "Öyle tercih edersiniz daha da az günah olur.", EN:"If you prefer that way, it will be even less of a sin."}
,{TR: "Ne diyorsun ya?", EN:"What are you saying?"}
,{TR: "Ne diyorum ya?", EN:"What am I saying?"}
,{TR: "Anlamadım hayırdır? Niye yükleniyorsun bana?", EN:"I don't get it, what's the problem? Why are you so hard on me?"}
,{TR: "Acaba ne yaptın?", EN:"I wonder what you did."}
,{TR: "Acaba niye? Almıyorum ya.", EN:"I wonder why. I don't take it."}
,{TR: "Gerçekten vazgeçtim almayacağım.", EN:"Really, I give up, I don't take it."}
,{TR: "Sen bilirsin alma.", EN:"Your choice, leave it."}
,{TR: "Bakın duydunuz. Alma diyor bana.", EN:"Could you hear it? She says me not to take it."}
,{TR: "Ben almıyorum diyorum alma diyor bana. Bu çalışanınızın yüzünden.", EN:"I say I won't buy it and she says I shouldn't. Because of this employee of yours."}
,{TR: "Kimi arıyorsun? Kime bakıyorsun? Yetkili mi arıyorsun?", EN:"Who are you looking for? Who are you looking at? Are you looking for authority?"}
,{TR: "Hesap verirsin.", EN:"You will pay for it."}
,{TR: "Yetkili arıyorsan burada bana konuşacaksın. Ama sen ne yaptın?", EN: "If you're looking for authority, just talk to me. But what did you do?"}
,{TR: "Dışarıdan gördün tabii tesettürlü başörtülü.", EN:"You peeked in from outside (and said, of course) hijab, headscarf."}
,{TR: "Anca dedin kalfadır çıraktır burada.", EN:"You just said it's a journeyman, an apprentice here."}
,{TR: "Senin problemini ben çözemem ya.", EN:"I can't solve your problems."}
]},
{title: "Doğu - Zeka geriliği",
 sentences: [{TR: "Kaç yaşına gelmiş adamsın yani? Belanı benden bulma tamam mı?", EN:"So, how old are you? Don't take trouble from me, okay?"}
,{TR: "Sen ne biçim konuşuyorsun lan?", EN:"What the hell are you talking about?"}
,{TR: "Pezevenge bak ya. Kızı yaşındaki insanlar.", EN:"Look at the pimp. People his daughter's age."}
,{TR: "Allah allah kardeşim, ne oldu, hayırdır?", EN:"Oh my God, brother, what happened, what's wrong?"}
,{TR: "Kardeşim ne oluyor burada, ben anlamadığım şey o.", EN:"What's going on here brother? I don't get it."}
,{TR: "Ne oluyor burada ya? Bir dakika!", EN:"What's going on here? Wait a minute!"}
,{TR: "Abi iki dakika şurada ben gittim, şurada iki dakika neler olmuş ya?", EN:"Bro, I was there for 2 minutes, what happened there for 2 minutes?"}
,{TR: "Sanat. Burası sanat. Burası asla kavga değil.", EN:"Art. This is art. This is never a fight."}
,{TR: "Yavşak! Sen de onunla aynı konuşmuyor muydun.", EN:"Arsehole! Weren't you talking the same way to him?"}
,{TR: "Abi hayır vallahi ben bir şey demedim.", EN:"Brother, no, I swear I didn't say anything."}
,{TR: "Bende kalp pili var abi. Ben ameliyatlıyım.", EN:"I have a pacemaker, brother. I have surgery."}
,{TR: "Kardeş bu çocuğun bir hatası varsa ben özür dilerim abi.", EN:"Brother, if this child made a mistake, I apologize."}
,{TR: "Yürü çık gidiyoruz. Çıkalım.", EN:"Go ahead, we're going. Let's go out."}
,{TR: "Bu çocuğun engelli raporu var. Özür dilerim.", EN:"This child has a disability report. I apologize."}
 ]},
 {title: "Terzi - Otoparkta",
 sentences: [{TR: "Biraz daha uzağa park etseydin keşke.", EN:"I wish you parked a little further away."}
,{TR: "Bir an tanıyamıyordum seni.", EN:"I didn't recognize you for a moment."}
,{TR: "Dün bayağı sarhoştun.", EN:"You were pretty drunk yesterday."}
,{TR: "Şimdi ayık kafayla görünce normal.", EN:"Now you're sober, it's understandable."}
,{TR: "Ayık kafa olduğumu kim söylüyor?", EN:"Who says I'm sober?"}
,{TR: "Burada mı kalıyorsun?", EN:"Are you staying here?"}
,{TR: "Evet, şimdilik öyle.", EN:"Yes, for now."}
,{TR: "Oteller güzel ya.", EN:"Hotels are nice."}
,{TR: "Hiç sessiz olmuyor.", EN:"It never gets quiet."}
,{TR: "Sürekli insanlar geliyor. Giriyorlar, çıkıyorlar.", EN:"People arrive all the time. They come in, they go out."}
,{TR: "Beyaz giymen gerekli demiştim.", EN:"I told you to wear white."}
,{TR: "Evet, doğru. O konuyla ilgili şöyle bir şey var.", EN:"Right, you did. The thing about that..."}
,{TR: "Beyaz hiç benim olayım değil. İçimi karartıyor.", EN:"White isn't for me. I find it depressing."}
,{TR: "Ya, nedir beyaz giyinmek ya?", EN:"Why would anyone wear white?"}
,{TR: "Ölünce filan giyiyor insanlar.", EN:"People wear it when they're dead."}
,{TR: "Hiç hoşlanmıyorum.", EN:"I hate it."}
,{TR: "Al, kötü mü olmuş bu?", EN:"Is this so bad?"}
,{TR: "Ama şöyle bir şey yapabiliriz.", EN:"Here's what we can do."}
,{TR: "Çünkü seni kırmak hiç istemiyorum.", EN:"Because I don't want to disappoint you."}
,{TR: "Şöyle ufak, beyaz bir detay.", EN:"A small white detail."}
,{TR: "Oldu mu? Tamam mıyız? Gidelim mi?", EN:"Is this okay? All good now? Should we go?"}
,{TR: "Nereye gidiyoruz diye sormayacak mısın?", EN:"You don't even ask where we go?"}
,{TR: "Açıkçası... sikimde değil.", EN:"Frankly, I don't fucking care."}
,{TR: "Nereye götürürsen oraya.", EN:"I'll go wherever you take me."}
 ]},
{title: "Terzi - Düğüne varış",
 sentences: [{TR: "Hayda! Şaka yapıyorsun herhâlde!", EN:"Come on! You've got to be kidding me!"}
,{TR: "Seni bir konuda uyarmam gerekiyor.", EN:"I have to warn you about something."}
,{TR: "Ben düğünlere çağrılmaması istenen o kızımdır.", EN:"I'm the girl people don't want at their wedding."}
,{TR: "Rolüm ne peki?", EN:"What's my role, then?"}
,{TR: "Yani beni buraya çağırdığına göre birilerine bir şey anlatmaya çalışıyorsun.", EN:"Since you invited me here, you must be trying to make a statement."}
,{TR: "Ne diye tanıtacaksın beni?", EN:"What are you introducing me as?"}
,{TR: "Hayır, yani sevgilin olabilirim, uzaktan bir kuzenin olabilirim, bir çalışanın olabilirim.", EN:"I mean, I could be your girlfriend, a distant cousin, or an employee."}
,{TR: "Ne istiyorsun?", EN:"What will it be?"}
,{TR: "Kendin ol yeter.", EN:"Just be yourself."}
,{TR: "Emin misin?", EN:"Are you sure?"}
 ]},
{title: "Terzi - Cemre ve Dimitri",
 sentences: [{TR: "Selam. Cemre ben.", EN:"Hi. I'm Cemre."}
,{TR: "Evet Dimitri, Cemre arkadaşım.", EN:"Yes, Dimitri. Cemre is my friend."}
,{TR: "Tamam, arkadaş da nasıl arkadaş?", EN:"Okay, but what kind of friend?"}
,{TR: "Yani normal arkadaş, özel arkadaş?", EN:"A regular friend or a special one?"}
,{TR: "Anlaşıldı, özel arkadaş. Ne zamandan beri?", EN:"Got it. Special friend. Since when?"}
,{TR: "Sana ayıptır Peyami.", EN:"Shame on you, Peyami."}
,{TR: "Kan kardeşinin düğününe kız arkadaşını getiriyorsun ama tanıştırmıyorsun bile.", EN:"You bring your girlfriend to your blood brother's wedding, and you don't even introduce us."}
,{TR: "Üstündekiyle dikkatimi çekmese hiç haberimiz bile olmayacak belki.", EN:"If she hadn't drawn my attention with her dress I might have never known."}
,{TR: "Yalnız biz konukları beyaz giymeyi konusunda uyarmıştık diye hatırlıyorum.", EN:"But I remember asking our guests to dress in all white."}
,{TR: "Ya, o konuda… evet, haberim var ama ben maalesef beyaz giyemiyorum.", EN:"Yes, I'm aware of that, but I'm afraid I can't wear white."}
,{TR: "Niçin? Basıyor bana.", EN:"Why not? It's depressing."}
,{TR: "Ya, ne bileyim işte, ölüm, kefen…", EN:"I don't know. Death, shrouds…"}
,{TR: "Ben çok sevdim bu kızı.", EN:"I really like this girl."}
,{TR: "Yani böyle çok güzel kafası.", EN:"She's absolutely hilarious."}
,{TR: "Tebrikler bu arada.", EN:"Congrats, by the way."}
 ]},
{title: "Kefir mi Yoğurt mu - 1",
 sentences: [{TR: "Kefir ve yoğurt, içerdikleri faydalı bakteriler nedeniyle oldukça sağlıklıdırlar.", EN: "Kefir and yoghurt are very healthy due to the beneficial bacteria they contain."}
,{TR: "Kefir daha iyi bir seçim olabilir.", EN: "Kefir may be a better choice."}
,{TR: "Aralarında birçok fark vardır.", EN: "There are many differences between them."}
,{TR: "Kefir ve yoğurt her ikisi ekşi bir tada sahiptirler.", EN: "Kefir and yoghurt both have a sour taste."}
,{TR: "Yüzyıllar boyunca insanlar kefir taneleri ve inek sütü kullanarak kefir yapmıştır.", EN: "For centuries, people have made kefir using kefir grains and cow's milk."}
,{TR: "Keçi veya koyun sütü ile yapmak da mümkündür.", EN: "It is also possible to make it with goat or sheep milk."}
,{TR: "Kefir taneleri küçük karnabahar çiçeklerine benzemektedir.", EN: "Kefir grains look like small cauliflower flowers."}
,{TR: "Üreticiler fermente etmek için kefir tanelerini süte ekler, sonra onları çıkarırlar.", EN: "Manufacturers add kefir grains to milk to ferment it, then remove them."}
,{TR: "Geri kalan ürün kefirdir.", EN: "The remaining product is kefir."}
,{TR: "Taneler bir sonraki mayalama işleminde tekrar kullanılabilir.", EN: "The grains can be reused in the next brewing process."}
,{TR: "Hem kefir hem de yoğurt bağırsakları iyi bakterilerle doldurmaya yardımcı olabilir.", EN: "Both kefir and yogurt can help populate the intestines with good bacteria."}
,{TR: "Araştırmalara göre kefir bağışıklık sistemini desteklemekte.", EN: "According to research, kefir supports the immune system."}
 ]},
{title: "Kefir mi Yoğurt mu - 2",
 sentences: [{TR: "Probiyotikler, bir kişinin sağlığına yararlı olabilecek bakterilerdir.", EN: "Probiotics are bacteria that may benefit a person's health."}
,{TR: "İnsanlar kefir ve yoğurdu olduğu gibi yiyebilir veya içebilirler.", EN: "People can eat or drink kefir and yogurt as they are."}
,{TR: "İnsanlar fermente süt ürünlerini her zaman buzdolabında tutmalıdır.", EN: "People should always keep fermented milk products in the refrigerator."}
,{TR: "İnsanlar genellikle fermente süt ürünlerini güvenle tüketebilir.", EN: "People can generally consume fermented milk products safely."}
,{TR: "Bunun nedeni fermantasyon sürecinin laktoz içeriğini azaltmasıdır.", EN: "This is because the fermentation process reduces the lactose content."}
,{TR: "Fermente gıdalar histamin adı verilen yüksek miktarda madde içerir.", EN: "Fermented foods contain high amounts of a substance called histamine."}
,{TR: "Bazı insanlar yoğurdu ilk kez tükettiklerinde şişkinlik yaşayabilirler.", EN: "Some people may experience swelling when they consume yogurt for the first time."}
,{TR: "Kişinin bağırsağı yeni gıdalara alıştığında bunlar azalır.", EN: "These decrease as the person's intestine gets used to new foods."}
,{TR: "İlaçlar alan kişiler yeni ürünler denemeden önce bir doktora danışmalıdır.", EN: "People taking medications should consult a doctor before trying new products."}
,{TR: "Kefirin sağlık açısından yoğurttan daha fazla faydası olabilir.", EN: "Kefir may have more benefits for the health than yogurt."}
,{TR: "İnsanlar marketlerden uygun fermente ürünleri satın alabilirler.", EN: "People can buy suitable fermented products from markets."}
,{TR: "İnsanlar evde kendi kefir veya yoğurt yapma seçeneklerine sahiptir.", EN: "People have the option of making their own kefir or yogurt at home."}
]},
{title: "Uğurlugiller 1",
 sentences: [{TR: "Bakar mısınız, hesabı rica edebilir miyim?", EN: "Excuse me, may I ask for the bill?"}
,{TR: "Yemekler de nefisti çok teşekkür ederim Leylacım.", EN: "The food was delicious too, thank you very much, Leyla."}
,{TR: "Asıl ben teşekkür ederim Nebahat abla!", EN: "I really thank you, sister Nebahat!"}
,{TR: "Derdimle biraz başınızı ağrıttım ama ben de ferahladı.", EN: "I gave you a little headache with my trouble, but I was relieved too."}
,{TR: "Telefonda bayağı merak etmiştim.", EN: "I was quite curious on the phone."}
,{TR: "Üzme böyle şeylere canını Leylacım.", EN: "Don't worry about such things, my dear Leyla."}
,{TR: "Bunlar gelip geçici problemler.", EN: "These are temporary problems."}
,{TR: "Bak sağlıklıyız, yaşıyoruz.", EN: "Look, we are healthy, we are alive."}
,{TR: "Benim için ne öyle güzel bir değişiklik oldu ki bu çok teşekkür ederim, sağ ol.", EN: "It was such a nice change for me, thank you very much, thank you."}
,{TR: "Bu seni kaçıncı davet edişim Nebahat abla, hep bir bahane buluyorsun.", EN: "This is the first time I've invited you, sister Nebahat, you always find an excuse."}
,{TR: "Salim akşamları çok yorgun dönüyor oluyor işte.", EN: "Salim usually comes back very tired in the evenings."}
,{TR: "Türken bildiğin gibi çalışıp duruyor sözüm ona çalışmak denirse.", EN: "As you know, Turks work hard, so to speak."}
,{TR: "Doğan´ı görüyorum arasıra bizim tarafta, bir defasında İnci´nin arabasında eden.", EN: "I see Doğan from time to time on our side, once in İnci's car."}
,{TR: "Ah bak, geçen gün de lokantada gördük. Bizi fark etmedi bile.", EN: "Oh look, we saw it at the restaurant the other day. He didn't even notice us."}
,{TR: "Ee tabii insan İnci´nin yanındayken başkasını zor fark eder doğrusu.", EN: "Well, of course, when you're next to İnci, you can barely notice anyone else."}
]},
{title: "Uğurlugiller 2",
sentences: [{TR: "Anne sen bu akşam iyice neşesiz sin.", EN: "Mom, you are looking very unhappy this evening."}
,{TR: "Biraz başım ağrıyor kızım. Hiç iyi değilim.", EN: "I have a little headache, girl. I'm not okay at all."}
,{TR: "Karıcığım yoksa gümüşlere mi üzüldün?", EN: "Wife, are you upset about the silver?"}
,{TR: "Ama Salim rica ederim Allah aşkına!", EN: "But Salim, please, for God's sake!"}
,{TR: "Yoksa senin de derdin bacım gibi inciler mi?", EN: "Or are you also worried about pearls like my sister?"}
,{TR: "Evet kızım. Benim derdim de inciler. Vallah, hem Vallaha hem billaha inciler.", EN: "Yes my daughter. My problem is pearls. I swear, I swear, pearls."}
,{TR: "Hoppala! Anlayan biri gelsin.", EN: "Whoops! Let someone who understands come."}
,{TR: "Abim bu akşam yine dışarıda yemek zorundaymış, yemeğe gelemeyecek.", EN: "My brother has to eat out again tonight, he can't come for dinner."}
,{TR: "Özür diliyor, hepimizi öpüyor.", EN: "He apologizes and kisses us all."}
,{TR: "Çocuklar ben de özür diliyorum. Yemek yiyemeyeceğim.", EN: "Guys, I apologize too. I won't be able to eat."}
,{TR: "Hiç canım istemiyor. Allah rahatlık versin, başım çok ağrıyor.", EN: "I don't feel like it at all. May God give me comfort, my head hurts so much."}
,{TR: "Baba! Annemin bir derdi var, farkında mısın?", EN: "Father! My mother has a problem, are yu aware?"}
,{TR: "Olmaz olur muyum.", EN: "No way can I?"}
,{TR: "Şimdi üstüne varsak, saklar. Ben gece anlarım.", EN: "Now if we get to it, she will hide it. I find it out tonight."}
]},
{title: "Uğurlugiller 3",
sentences: [{TR: "Niye öksürdün?", EN: "Why did you cough?"}
,{TR: "Bana bak diye.", EN: "Just to look at me."}
,{TR: "Baktım. Ne olmuş?", EN: "I looked. So what?"}
,{TR: "Bir derdin var bana söylemiyorsun.", EN: "You have a problem, you don't tell me."}
,{TR: "İyi işte ben de deminden beri ne diye sormuyorsun diye şaşıp duruyordum.", EN: "Well, I've been wondering why you didn't ask since."}
,{TR: "Diye sordum işte. Demek ki mesele yok.", EN: "That's what I asked. So there is no issue."}
,{TR: "Mesele var.", EN: "There is an issue."}
,{TR: "Doğan mesele olmaz karıcım, aklı başında çocuktur.", EN: "Doğan is not an issue, my wife, he is a sensible child."}
,{TR: "Mutlaka boşuna üzüyorsun gene kendini. Hadi yat artık.", EN: "You're definitely making yourself sad for nothing. Go to bed now."}
,{TR: "Dün öğle yemeğine götürdüm İnciyi, ağzından girdim, burnundan çıktım, şaklabanlıklar yaptım, sonunda razı ettim.", EN: "I took İnci to lunch yesterday, I twisted her arm, I played jokes, and finally I got her to agree."}
,{TR: "Bir dakika! Bu Ekrem Bey nişanlısının adı ne dedin?", EN: "One minute! What did you say, the name of this Ekrem Bey's fiancée?"}
,{TR: "Onun da adı İnci. Sakın benim İnciyle karıştırmayın!", EN: "Her name is İnci too. Don't confuse with my İnci!"}
]},	
{title: "1 kadın 1 erkek - Babalar haklı cıkmalı",
 sentences: [{TR: "Eğer soracak bir şeyiniz yoksa o zaman dersimize geçelim.", EN:"If you have nothing to ask, then let's move on to our lesson."}
,{TR: "Evli misiniz?", EN:"Are you married?"}
,{TR: "Hayir değilim, nişanlıyım.", EN:"No, I am not, I am engaged."}
,{TR: "Sevgiliniz şansli hödüğün teki olmalı.", EN:"Your lover must be a lucky bastard."}
,{TR: "Ay, ne kadar ayıp. Öyle denir mi ne kadar ayıp.", EN:"Ah, what a shame. How shameful is it to say that."}
,{TR: "Valla babam öyle dedi. Güzel kadınlar hep şansli hödükler kaparmış.", EN:"I swear my father told me so. Beautiful women always pick up lucky bastards."}
,{TR: "Ozan? Ne haber aşkım? Ne işin var burada?", EN:"Ozan? What happened my love? What are you doing here?"}
,{TR: "Telefonunu unutmuşsun da.", EN:"You forgot your phone."}
,{TR: "Zeynep, şu velet bana hödük dedi ya.", EN:"Zeynep, this brat called me a bastard."}
,{TR: "Ben nişanlınıza dedim vallahi.", EN:"I said to your fiancee, I swear."}
,{TR: "Ama Ozan benim nişanlım, hayatım.", EN:"But Ozan is my fiancee, my dear."}
,{TR: "Ehh, işte babam haklıymış.", EN:"Ehh, my father was right."}
]},
{title: "Karakomik - Lokantada",
 sentences: [{TR: "Taksi sizin mi, dışarıdaki?", EN: "Is it your taxi outside?"}
,{TR: "Çalışmıyorum abi ben.", EN: "I don't work."}
,{TR: "Öyle mi? Böyle durumlarda hemen güvenlik birimlerine haber vermek lazım.", EN: "Really? In such cases, it is necessary to notify the security units immediately."}
,{TR: "Alo, 155 mi? Bir saniye Memur Bey.", EN: "Hello, 155? Wait a second, Officer."}
,{TR: "Neresi oğlum burası?", EN: "Where are we, my son?"}
,{TR: "İyi nöbetler efendim.", EN: "Good watch sir."}
,{TR: "Taksici bir esnafımız burada yol beğenmiyor, müşteri seçiyor.", EN: "The taxi driver doesn't like the road here, cherry-picks his customers."}
,{TR: "Nasıl yardımcı olabilirsiniz?", EN: "How can you help?"}
,{TR: "Ben Tuncay Uğurlu, Dışişleri’nden.", EN: "I'm Tuncay Uğurlu from the Foreign Office."}
,{TR: "Paris Büyükelçisi Fuat Uğurlu’nun kardeşiyim. Ortanca, evet.", EN: "I am the brother of Paris Ambassador Fuat Uğurlu. The middle one, yes."}
,{TR: "Tamam, siz memur gönderin ben bekliyorum.", EN: "Okay, send some officers, I'm waiting."}
,{TR: "Adresi verseydim.", EN: "I could have given the address."}
,{TR: "Uydudan bulurlar. Sen dalga mı geçiyorsun yavrum?", EN: "They find it by satellite. Are you kidding my dear?"}
,{TR: "Şu aleti her yerden okuyorlar. Tuncay Uğurlu, tak bitti.", EN: "They read this instrument from everywhere. Tuncay Uğurlu, the plug is over."}
,{TR: "Polisi karıştırmak istemezdim ama gelsinler işlem yapılsın, her şey ortaya çıksın.", EN: "I wouldn't want to mix the police in, but let them come and take action, let everything come out."}
,{TR: "Siz nereye gideceksiniz abi?", EN: "Where will you go, man?"}
,{TR: "Hah, şöyle ya.", EN: "Oh, that's it."}
,{TR: "Valla nereye gideceğiz yavrum, tek yön var, aşağıya doğru gideceğiz işte.", EN: "Well, where are we going, boy? there is only one way, we will go down."}
,{TR: "Çayı şuradan alıver yavrum.", EN: "Take the tea from there, son."}
,{TR: "Abi, çorbaların parası?", EN: "The money for the soups?"}
,{TR: "Rica edeceğim, sizden para mı alacağız?", EN: "I beg you, will we take money from you?"}
 ]},
{title: "Asuman Tatlısının Hikayesi",
sentences: [{TR: "Yılmaz Cihan, 1985 Çorum doğumluyum.", EN:"Yılmaz Cihan, I was born in Çorum in 1985."}
,{TR: "Ya üniversite için geldim ben İstanbul'la ama cocukluğumun önemli bir kısmı da Almanya'da geçti.", EN:"Well, I came to Istanbul for university, but I spent a significant part of my childhood in Germany."}
,{TR: "Marmara Üniversitesi'nde İşletme bölümünü okudum.", EN:"I studied Business Administration at Marmara University."}
,{TR: "Bilgi Üniversitesi'nde pazarlama iletişimi master'ı yaptım.", EN:"I completed my master's degree in marketing communications at Bilgi University."}
,{TR: "Ondan sonra da pazar araştırmacılığı ve reklamcılık yaptım.", EN:"After that, I did market research and advertising."}
,{TR: "En son da cıkolatacı oldum.", EN:"Finally, I became a chocolate maker."}
,{TR: "Aslında keyifli işlerdi ama çok da benlik değildi.", EN:"Actually, it was fun work, but it wasn't very personal."}
,{TR: "Çok bana gerçek gibi gelmiyordu.", EN:"It didn't seem real to me."}
,{TR: "Daha gerçek bir dünyanın işini yapıyormuşum gibi gelmiyordu.", EN:"It didn't feel like I was doing the work of a real world yet."}
,{TR: "Hafta sonunu finanse etmek için sabah 9'dan akşam 6'ya kadar çalışma fikri benim çok barışabileceğim bir fikri değildi.", EN:"The idea of working from 9 a.m. to 6 p.m. to fund the weekend was not something I could quite reconcile with."}
,{TR: "Biraz daha gerçek bir hayat istedim.", EN:"I wanted a more real life."}
,{TR: "Biraz daha sokakta bir hayat istedim.", EN:"I wanted a little more life on the streets."}
,{TR: "Ben önce bir esnaf olmaya karar verdim.", EN:"I first decided to become a tradesman."}
,{TR: "Çikolata da ondan sonra bir yöntem olarak geldi.", EN:"Chocolate came as a method after that."}
,{TR: "Bir yöntem olarak doğdu.", EN:"It was born as a method."}
,{TR: "Dolayısıyla aşımalığım çok daha fazlaydı.", EN:"Therefore, my immunization rate was much higher."}
,{TR: "Bir Almanya'dan Türkiye'ye çikolata getiren aileydik.", EN:"We were a family that brought chocolate to Turkey from Germany."}
,{TR: "Kaliteli çikolatayla ilgili bir hassasiyetim vardı.", EN:"I was sensitive about quality chocolate."}
,{TR: "Yaptığım işlerden ötürü de çikolata pazarına hakim oldum.", EN:"Because of the work I did, I became familiar with the chocolate market."}
,{TR: "Çünkü piyasada ne kadar bildiğimiz büyük çikolata firması varsa bir şekilde benim müşterim oldu.", EN:"Because all the big chocolate companies we know in the market somehow became my customers."}
,{TR: "Onlara pazarını anlatırken ben de pazarı öğrenmiş oldum.", EN:"While I was telling them about the market, I also learned about the market."}
]},
{title: "Gözde Karakaya - Doğum Hikayesi",
sentences: [{TR: "Bana verdiler belden epidürali.", EN:"They gave me a waist epidural."}
,{TR: "Böyle alttan ritmik bir şekilde ittiriliyorum.", EN:"I am being pushed rhythmically from below."}
,{TR: "Yatay pozisyondayım.", EN:"I am in a horizontal position."}
,{TR: "Demek ki, dedim, ben sevişiyorum.", EN:"So, I said, I am making love."}
,{TR: "Yine daha önceki tecrübelerime dayanarak dedim ki sevişiyorum.", EN:"Again, based on my previous experiences, I said, I am making love."}
,{TR: "Bir de malak gibi yatıyorum!", EN:"And I'm lying like a buffalo!"}
,{TR: "Sonra sola baktım, kocam.", EN:"Then I looked to the left, to my husband."}
,{TR: "Dedim ki, ben aldatıyorum.", EN:"I said, I am cheating him."}
,{TR: "Ama kocam çok mutlu. Daha önce hiç görmediğim kadar mutlu.", EN:"But my husband is happy. Happier than ever."}
,{TR: "Yani... ben sevişiyorum, kocam mutlu.", EN:"Well, I'm making love, my husband is happy."}
,{TR: "Demek ki dedim ben, swinger'dayım.", EN:"Which means, I said, I'm at a swinger party."}
,{TR: "Tecrübe değil bu arada. Tamamen hayal gücü. Yanlış anlamayında.", EN:"This is not experience, by the way. Full imagination. Don't get me wrong."}
,{TR: "Sonra dedim ki kocam niye boşta?", EN:"Then I said, why is my husband idle?"}
,{TR: "O şapkayı takarsan tabii kimse seninle sevişmez.", EN:"If you wear that hat, of course no one will make love to you."}
]},

{title: "Özel ders - 01",
 sentences: [{TR: "Hepimiz sürekli bir şeylere yetişmeye çalışıyoruz.", EN: "We're always trying to keep up with stuff."}
,{TR: "Okul, aşk, arkadaşlar, aile, dersler…", EN: "Studies, love, friends, family, classes..."}
,{TR: "Liste uzun, hayat kısa.", EN: "The list is long, life is short."}
,{TR: "Yetişkin olmak, yetişmekten geliyordur belki.", EN: "Being an adult may be all about development."}
,{TR: "Peki ya hayat dersleri?", EN: "What about life lessons?"}
,{TR: "İşte bu kısımda devreye ben giriyorum ve öğrencilerin en ihtiyaç duydukları kişi oluyorum. That's where I step in and become the person the clients need the most.", EN: ""}
 ]},
 {title: "Özel ders - 02",
 sentences: [{TR: "Bir de sen vardın, doğru ya.", EN: "There was also you, right."}
,{TR: "Ne Merkür retrosuymuş arkadaş!", EN: "What a Mercury retrograde!"}
,{TR: "Daha çok göktaşı sanki!", EN: "More like a meteorite!"}
,{TR: "Efendim? Düştün resme. Sorry? You crashed into my life.", EN: ""}
,{TR: "Anlamıyorum dediklerini.", EN: "I don't get it."}
,{TR: "Ben de onu diyorum. Bir de özel ders istiyorsun.", EN: "That's what I'm talking about. Yet you want tutoring."}
,{TR: "Ha yok, ben derslerde çok iyiyimdir.", EN: "I excel at classes, though."}
,{TR: "Hatta şöyle gelmeden önce ufak da bir araştırma yaptım.", EN: "I even did a little research before I came here."}
,{TR: "Bayağı ufak olmuş.", EN: "A little, sure."}
,{TR: "Gerçi tabii çok da değişip değişmemekle ilgili değil olay…", EN: "Although, of course, changing is not the key…"}
,{TR: "Yavaş. Sakin. Kahve? Yok, ben kahve içemem.", EN: "Easy. Calm down. Coffee? I don't take coffee."}
,{TR: "Kahve içersem hareketlenirim, çok konuşurum.", EN: "Coffee makes me all energetic and talkative."}
,{TR: "Stimülatörler bende öyle… Tamam. Papatya çayı.", EN: "Stimulants have the same effect on me… OK. Chamomile tea."}
 ]},
{title: "Özel Ders - Hande ve Azra",
 sentences: [{TR: "Vay be, gerçekten çalışıyormuş.", EN: "Wow, she does work a lot."}
,{TR: "Bu mesleğin bir adı falan var mı?", EN: "Does this profession have a name?"}
,{TR: "Tamam, söz.", EN: "Okay, I promise."}
,{TR: "Hayatı kitaplardan öğrenemezsin.", EN: "You can't learn life from books."}
,{TR: "Pratik lazım sana. Şu saçmalıkları da kaldır.", EN: "You need practice. Remove that bullshit."}
 ]},
{title: "Yedi kocalı Hürmüz açılış sahnesi",
sentences: [{TR: "Koca dediğiniz nedir ki, kızlar?", EN:"What's a husband, girls?"}
,{TR: "Evin geçimini yapan, sonra geceleri sırtını dönüp kıçında pireleri uçustura uçustura uyuyan adama koca denir.", EN:"A husband is a man who provides for the household, then turns his back at night and sleeps with fleas flying up his arse."}
,{TR: "Koca sedir gibi, mangal gibi, evin demirbaşıdır.", EN:"The husband is a fixture of the house, like a big cedar, like a brazier."}
,{TR: "Ah, kızlar, devir eski devir değil.", EN:"Ah, girls, it ain't the old days."}
,{TR: "Eski zamanın adamları deve benzerdi.", EN:"The men of the old days were like giants."}
,{TR: "Yaşadıkları yer eve benzerdi.", EN:"The place they lived in looked like a house."}
,{TR: "Yanına yatınca bir şeye benzerdi.", EN:"Lying next to him looked like something."}
,{TR: "Bir herif dört karıyla yetinmez fazlasını da ipe dizerdi.", EN:"A guy would not be content with four wives, would string on more."}
,{TR: "Ne oldu? Zaman değıştır.", EN:"What happened? Time changes."}
,{TR: "Herifleri küçüldü, karılara bir heybet geldi.", EN:"The blokes got smaller, the wives got bigger."}
,{TR: "Haliyle bir karının işini dört herif göremez hale geldi.", EN:"As it stands, four guys can't do the work of a wife."}
,{TR: "Şimdiki zamanın kocaları et diye sütlüye karışmaz, alacağını alır vereceğini verir erkenden ölür gölge etmez.", EN:"Today's husbands keep their nose clean, they take what they get and give what they give, they die early and do not cast a shadow."}
,{TR: "Bakın bu Hürmüz'ün rahmetlik kocası, bu koskoca konağın sahibi Fettah Paşa.", EN:"Look, this is Hürmüz's late husband, Fettah Pasha, the owner of this huge mansion."}
,{TR: "'Hürmüüüz' diye bağırır.", EN:"He shouts 'Hürmüüüz'."}
,{TR: "Hürmüz yanına gidince de 'Bak bakalım vaziyet nedir' derdi.", EN:"When Hürmüz went to him, he said, 'See what the situation is'."}
,{TR: "Hürmüz bunun üzerine adamın sağını solunu yoklar, 'Ay Paşa hazretleri zümrüdü anka kuşunuz bugün de görünürlerde yok' deyince.", EN:"Hürmüz then looked around the man and said, 'Your Highness, your Emerald Phoenix is nowhere to be seen today either'."}
,{TR: "Herif dediğiniz ilk fırsatta seni bırakıp gidecek bir kuştur.", EN:"A guy is a bird that will leave you the first chance it gets."}
,{TR: "Sen onu yakalıp yuvaya bağlayacaksın.", EN:"You're going to catch him and tie him to the nest."}
,{TR: "Nasıl? Şefkat göstereceksın ya: fazla sıkarsan - hop - kaçar.", EN:"How? You have to show affection: if you squeeze it too tightly - hop - it runs away."}
,{TR: "Sırtını sıvazlarsan 'İyidin, aslanım' dersen, aynı yapar...", EN:"If you pat his back and say 'You were fine, my lion', they'll do the same."}
,{TR: "Şimdi artık tavuklar eşelenir ibikler neşelenir.", EN:"Now the chickens are paired and the crests are cheering."}
,{TR: "Ne o öyle ikide bir harezlenmeler hışıl demeler bilmem neler.", EN:"What's all this harping and huffing and puffing and whatnot?"}
,{TR: "Allah allah! Boş olun lan eski herifler. Bize yeni herifler!", EN:"Oh my god! Fuck off, you old bastards. New blokes to us!"}
]},
{title: "Özdemir Erdoğan: Gurbet",
sentences: [{TR: "Kime desem derdimi ben, bulutlar", EN:"To whom should I tell my sorrow, clouds?"}
,{TR: "Bizi dost bildiklerimiz vurdular", EN:"Those regarded as friends hurt us"}
,{TR: "Bir de gurbet yarası var hepsinden derin", EN:"And then there is homesickness, which hurts the most"}
,{TR: "Söyleyin memleketten bir haber mi var?", EN:"Tell me, are there news from the homeland?"}
,{TR: "Yoksa yârin gözyaşları mı bu yağmurlar?", EN:"Are these rains perhaps the tears of my beloved?"}
,{TR: "İçerim yanıyor yar yar", EN:"I am burning inside"}
,{TR: "Yaram pek derin", EN:"My wound is deep"}
,{TR: "Bana nazlı yardan aman bir haber verin", EN:"Bring me somе good news from my delicate beloved"}
,{TR: "Bulutlar yârime selam söyleyin", EN:"Clouds, say hello to my love"}
,{TR: "Kavuşma günümüz yakınmış deyin", EN:"Tell her that the day of reunion is near"}
,{TR: "Felek yardan ırak koyduysa bizi", EN:"If fate set me far away from my love"}
,{TR: "Gurbet elde bir başıma neyleyim?", EN:"What can I do abroad all alone?"}
,{TR: "Yârdan ırak yaşanır mı söyleyin", EN:"Tell me, is it possible to live far away from love?"}
]},
{title: "Esmeray Diriker: Unutama beni",
sentences: [{TR: "Boğazında düğümlenen hıçkırık olayım", EN:"Let me be the sob which is stuck in your troat"}
,{TR: "Gözünden damlayamayan gözyaşın olayım", EN:"Let me be the tear which can't weep from your eyes"}
,{TR: "Unutma beni", EN:"Don't forget me"}
,{TR: "Gölgen gibi adım adım", EN:"Like your shadow step step"}
,{TR: "Her solukta benim adım", EN:"In every breath always my name"}
,{TR: "Ben nasıl ki unutmadım", EN:"I didn't forget you"}
,{TR: "Bitmek bilmez kapkaranlık geceler boyunca", EN:"During the endless, dark nights"}
,{TR: "Ayrılığın acısını kalbinde duyunca", EN:"When you feel the bitter grief in your heart"}
,{TR: "Sevişirken, Öpüşürken", EN:"While making love, while kissing"}
,{TR: "Yapayalnız dolaşırken", EN:"While walking alone"}
,{TR: "Unutmaya çalışırken", EN:"While trying to forget"}
,{TR: "Sen de unutma beni", EN:"You also don't forget me"}
]},
{title: "Ajda Pekkan - Boşvermişim Dünyaya",
 sentences: [{TR: "Temmuz, Ağustos, Eylül her mevsimde durma gül", EN: "July, August, September, keep laughing in all seasons"}
,{TR: "Hayat inan çok kısa belki çıkmayız yaza", EN: "Remember, life is short, we may not leave summer"}
,{TR: "Boşvermişim, boşvermişim, boşvermişim dünyaya", EN: "I don't care about the world"}
,{TR: "Ağlamak istemiyorsan sen de boşver dünyaya", EN: "If you don't want to cry, take no care either"}
,{TR: "Ahmet, Mehmet, Süreyya hepsi boş hepsi hülya", EN: "Ahmet, Mehmet, Süreyya - all empty dreams"}
,{TR: "Bir gün hayat bitecek dersin görmüşüm rüya", EN: "One day life is over, I've only seen a dream"}
,{TR: "Aldatırlar aç gözünü unut artık geçmiş dünü", EN: "They cheat, open your eyes, forget the past"}
,{TR: "Her akşam ayrı güzelle sen de geçir her gününü", EN: "A different beaty every night, spend the days like that"}
,{TR: "Boşvermişim, boşvermişim dünyaya ben boşvermiş", EN: "I don't care about the world"}
,{TR: "Vallahi aldırmıyorum elalem ne söylermiş", EN: "I swear I ignore what people say"}
]},
{title: "Meyhanenin Sesi - Kalamar",
sentences: [{TR: "Merhaba. Ben Meyhanenin Sesi.", EN:"Hello. I am the Voice of the Tavern."}
,{TR: "Bugün sizlere, kalabalık bir masaya en son gelmenin bedeli isimli prezentasyonun yapacak.", EN:"Today, he will make a presentation called the price of being the last to come to a crowded table."}
,{TR: "Mesela bu arkadaş. Kendisi geç geldiği için kolonun altına oturmak durumunda kaldı.", EN:"For instance, this guy. He had to sit under the column because he was late."}
,{TR: "Masanın en soğuk noktasından ara sıcaklara doğru hamle yapmakta.", EN:"He moves from the coldest point of the table to the warmer temperatures."}
,{TR: "Sürekli duymadığı şakalara sanki anlıyormuş gibi kafa sallamakta.", EN:"He constantly nods to jokes he hasn't heard, as if he understands them."}
,{TR: "Biz sorun bakalım neye gülmekten...", EN:"Let's see what we're laughing at..."}
,{TR: "Toplumda kabul görmeye çalışmakta toplum onu görememekte.", EN:"He is trying to be accepted in the community, but the community cannot see him."}
,{TR: "Bireyin yalnızlığını iliklerinde hissetmekte.", EN:"He feels the loneliness of the individual in his bones."}
,{TR: "Ahmet bey, ben bu çocuk burda verimsiz bir gece geçirsin istememekte.", EN:"Ahmet Bey, I do not want this child to spend an unproductive night here."}
,{TR: "Herhalde, sen de istememekte.", EN:"Probably you don't want it either."}
,{TR: "Hatırla bakalım sabah ne aldırdım sana.", EN:"Remember what I bought you in the morning."}
,{TR: "Akşama lazım olacak.", EN:"Will need it tonight."}
,{TR: "Abim, ben sana ızgara bebek kalamar vereyim.", EN:"Brother, I'll give you grilled baby squid."}
,{TR: "Taptaze, parmaklarını yersin.", EN:"Fresh, you'll lick your fingers."}
,{TR: "Ustam bir ızgara bebek kalamar çek!", EN:"Master make a grilled baby squid!"}
,{TR: "Sıparış üç güzel adımla şefe iletilde.", EN:"The order is forwarded to the chef in three beautiful steps."}
,{TR: "Biz buna kendi aramızda siparişin üç tonu diyoruz.", EN:"We call it three tones of order among ourselves."}
,{TR: "Şimdi koyalım arkadaşımın önüne, ve...", EN:"Now let's put it in front of my friend and..."}
,{TR: "Ali görüldü.", EN:"Ali was seen."}
,{TR: "Şakacı jonglörler Ali kabullendi.", EN:"Playful jugglers accept Ali."}
,{TR: "Kolonlar görünmez olduğu, masa bütünleşti.", EN:"Columns are invisible, the table is unified."}
,{TR: "Böylece kodadı baby operasyonumuz başarıyla tamamlanmış oldu.", EN:"Thus, our codename 'Baby Operation' was successfully completed."}
,{TR: "Ahmetciğim bu ikimizin başarısı. Bu hepimizin başarısı.", EN:"Ahmet, this is the success of both of us. This is our success."}
]},
{title: "Gestion projet 1",
 sentences: [{TR: "ils avaient réussi à faire adopter la leur, avec des postérités diverses", EN:"they managed to create their own, with various results"}
,{TR: "vous gagnez du temps et vous vous épargnez de nombreux problèmes par la suite", EN:"you save time and spare yourself many problems afterwards"}
,{TR: "Comment se fixer des objectifs et réussir à les atteindre?", EN:"How to set goals and achieve them afterwards?"}
,{TR: "l’objectif concerné doit être conforme à la portée du projet", EN:"the goal concerned must be in line with the scope of the project"}
,{TR: "tout le monde doit s’entendre sur les tâches à faire par chacun et leurs échéances", EN:"everybody must agree an the task of everyone along with their schedule"}
,{TR: "les objectifs représentent les résultats escomptés", EN:"the goals represent the expected results"}
,{TR: "cela lève le voile sur le pourquoi du projet", EN:"this unveils the WHY of the project"}
,{TR: "cela permet à tous les acteurs de rester sur la même longueur d’onde", EN:"this enables all participants to stay tuned"}
,{TR: "focaliser sur les résultats à atteindre", EN:"focus on the goals to achieve"}
,{TR: "déploiement de nouveaux équipements", EN:"deployment of new equipment"}
,{TR: "afin d’y parvenir sans accroc", EN:"in order to deliver without difficulties"}
]},
{title: "Gestion projet 2",
 sentences: [{TR: "indicateurs de réussite", EN:"performance indicators"}
,{TR: "transformer des visions en résultats tangibles", EN:"transform visions into tangible assets"}
,{TR: "cette méthode polyvalente vous guide dans la définition d’objectifs spécifiques", EN:"this versatile method helps you to define specific objectivrs"}
,{TR: "la méthode SMART préconise de ne pas se fixer d’objectifs totalement irréalisables", EN:"the method SMART advises you not to set unattainable goals"}
,{TR: "pendant six semaines d’affilée", EN:"for six weeks in a row"}
,{TR: "vous risquez de voir votre projet s’éterniser", EN:"you risk seeing your project drag on"}
,{TR: "le jeu en vaut la chandelle", EN:"it’s worth it"}
,{TR: "les objectifs doivent faire partie intégrante du processus de planification", EN:"the goals must form an integrant part of the planning process"}
,{TR: "voici les avantages que tirera votre équipe des objectifs SMART", EN:"here are the advantages your team would benefit"}
,{TR: "ne vous en faites pas si vous n’avez pas atteint tous vos objectifs", EN:"don’t worry if you haven’t achieved all your goals"}
,{TR: "pour n’en nommer que quelques-uns", EN:"only to name a few"}
]},
{title: "Gestion projet 3",
 sentences: [{TR: "nous partons du principe que", EN:"we assume that"}
,{TR: "en prenant sous mon aile au moins deux mentorés", EN:"taking at least two mentees under my wings"}
,{TR: "l’objectif est pertinent pour votre contexte", EN:"the objective is relevant to your context"}
,{TR: "dans le temps imparti", EN:"within the allotted time"}
,{TR: "un puissant besoin de prendre ses désirs pour des réalités", EN:"a powerful need to take one’s desires for realities"}
,{TR: "faire dresser les cheveux sur la tête", EN:"hair-raising"}
,{TR: "concentrer sur la réalisation de l’objectif dans un délai précis", EN:"focus on achieving the goal within a specified time"}
,{TR: "ils font l’impossible pour leur venir en aide", EN:"they do their best to help them"}
,{TR: "je te laisse la parole", EN:"you have the floor"}
,{TR: "une tâche doit compter un seul et unique responsable", EN:"a task must have a single responsible"}
,{TR: "veiller à ce que chacun connaisse ses responsabilités", EN:"ensure everyone knows their responsibilities"}
]},
{title: "Serge Gainsbourg - Laetitia",
 sentences: [{TR: "Sur ma Remington portative j’ai écrit ton nom Lætitia", EN: "On my portable Remington I wrote your name Laetitia"}
,{TR: "Lætitia les jours qui se suivent hélas ne se ressemblent pas", EN: "Laetitia, recent days are not the same"}
,{TR: "C’est ma douleur que je cultive en frappant ces huit lettres-là", EN: "That's my pain I develop while I'm typing those eight very letters"}
,{TR: "C’est une fleur bien maladive je la touche du bout des doigts", EN: "This is a quite sickly flower I touch her with my fingertips"}
,{TR: "S’il faut aller à la dérive je veux bien y aller pour toi", EN: "If it must be going to drift, I am glad to go for you"}
,{TR: "Ma raison en définitive se perd dans ces huit lettres-là", EN: "My reason ultimately loses itself in those eight very letters"}
 ]}
];

const mongoClient = new MongoClient(uri);
//console.log("Mongo DB URL: ", mongoClient.s.url);

async function deleteAll(){
  let result = {};
	await mongoClient.connect()
    .then(connection=>connection.db(process.env.MONGODB_DB))
	.then(db=>db.collection('quiz'))
	.then(quiz=>quiz.deleteMany({}))
    .then(listing=>{ result = listing})
    .catch(error => console.log(error))
	;
  return result;
}

async function addMany(what){
  let result = {};
	await mongoClient.connect()
    .then(connection=>connection.db(process.env.MONGODB_DB))
	.then(db=>db.collection('quiz'))
	.then(quiz=>quiz.insertMany(what))
    .then(listing=>{ result = listing})
    .catch(error => console.log(error))
	;
  return result;
}

async function findListing(criteria){
  let result = [];
  await mongoClient.connect()
    .then(connection=>connection.db(process.env.MONGODB_DB))
	.then(db=>db.collection('quiz'))
	.then(quiz=>quiz.findOne(criteria))
    .then(listing=>{ result = listing})
    .catch(error => console.log(error))
	;
  return result;
}

async function getTitles(){
  let result = [];
  await mongoClient.connect()
    .then(connection=>connection.db(process.env.MONGODB_DB))
	.then(db=>db.collection('quiz'))
	.then(q=>q.find({}, {projection: {title: 1} } ))
	.then(cursor=>cursor.toArray())
    .then(listing=>{ result = listing.map(a=>a.title)})
    .catch(error => console.log(error))
	;
  return result;
}

async function loadQuizzes (req, res) {
	
	try {
		const del=await deleteAll();
		const add=await addMany(mockTests);
		//const fir=await findListing({});
		const tit=await getTitles();
		res.status(200).json({deleted: del.deletedCount , inserted: add.insertedCount , titles: tit});
	} catch (error) {
        res.status(500).json({ message: error.message })
    }
	
}

module.exports = loadQuizzes;