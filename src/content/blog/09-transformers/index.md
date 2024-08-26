---
title: "شرح دقیق و بصری ترانسفورمر"
description: "در مورد ترنسفورمر"
date: "2021-08-07"
author: "Taha Samavati"
rtl: true
---


ترانسفورمر در مقاله [Attention is All You Need](https://arxiv.org/abs/1706.03762) معرفی شد. پیاده سازی آن در فریمورک TensorFlow در این [این لینک](https://github.com/tensorflow/tensor2tensor) قابل دسترسی است. در این پست سعی داریم تا یک نگاه کلی و در عین حال به دور از پیچیدگی به مدل ترنسفورمر، اجزای آن و نحوه کارکرد آن داشته باشیم.

## نگاه سطح بالا به ترنسفورمر

ترانسفورمر را می‌توان به صورت یک جعبه سیاه در نظر گرفت. مانند یک مدل ترجمه زیانی که از یک طرف جمله‌ای به آن وارد و در طرف دیگر یعنی خروجی جمله‌ای دیگر به عنوان ترجمه تولید می‌شود.

![Transformer Overview](/blog/transformer/the_transformer_3.png)

اگر یک قدم جلوتر برویم و اصطلاحاً در جعبه سیاه را باز کنیم، یک رمزنگار و رمزگشا خواهیم دید که به شکل زیر به هم متصل شده‌اند.

![Encoder-Decoder Structure](/blog/transformer/The_transformer_encoders_decoders.png)

بخش رمزنگار خود از ۶ رمزنگار کوچک تشکیل شده است (دلیلی برای ۶تا وجود ندارد. شما می‌توانید هر چندتا در مدل خود داشته باشید). مجموعه این رمزنگارهای کوچک در قالب یک پشته یا استک بلوک رمزنگار را می‌سازند. در مقابل و در بخش رمزگشا همین تعداد رمزگشا کوچک داریم که با استک خروجی‌هایشان خروجی نهایی بلوک رمزگشا بدست می‌آید.

![Encoder Decoder Stack](/blog/transformer/The_transformer_encoder_decoder_stack.png)

رمزنگارها ساختار یکسانی دارند اما هر کدام وزن‌های مختص به خود را دارند. هر کدام از این رمزنگارها دارای دو بخش است:

![Transformer Encoder](/blog/transformer/Transformer_encoder.png)

ورودی‌های رمزگشا ابتدا از یک لایه خود-توجه عبور می‌کنند. لایه خود-توجه به رمزنگار کمک می‌کند تا در هنگام رمزنگاری هر کلمه به کلمات دیگر موجود در جمله ورودی نیز توجه کند. در ادامه توضیحات مفصل‌تری در مورد این بخش خواهم آورد.

خروجی‌های لایه خود توجه به یک شبکه feed-forward ورودی داده می‌شوند. در واقع بردار مربوط به هر کلمه ورودی به صورت مجزا به این شبکه ورودی داده می‌شود. هر رمزگشا یا دیکودر نیز مانند رمزنگار دو لایه مذکور را دارد. با این تفاوت که بین این دو لایه یک لایه توجه وجود دارد که به رمزگشا کمک می‌کند تا تمرکز خود را بر روی بخش‌های مربوط جمله ورودی قرار دهد (شبیه مکانیزم توجه در مدل‌های sequence2sequence).

![Transformer Decoder](/blog/transformer/Transformer_decoder.png)

## شرح نحوه محاسبه خروجی با استفاده از مثال

تا اینجا با بخش‌های اصلی ترانسفورمر به صورت کلی آشنا شدیم. حال برای بررسی دقیق‌تر ببینیم چه عملیاتی روی تنسورهای ورودی انجام می‌شود تا خروجی مورد نظر ما بدست آید.

همانطور که می‌دانید برای آنکه کلمات را به یک بردار قابل درک برای یک شبکه عصبی تبدیل کنیم، از یک [embedding algorithm](https://medium.com/deeper-learning/glossary-of-deep-learning-word-embedding-f90c3cec34ca) استفاده می‌کنیم.

![Embeddings](/blog/transformer/embeddings.png)

به هر کلمه یک بردار با سایز ۵۱۲ اختصاص داده می‌شود. برای سادگی ما این بردارها را به شکل بالا نمایش می‌دهیم.

هر کدام از رمزنگارها با دریافت یک لیست از بردارهای ۵۱۲تایی خروجی مربوط به خود را تولید می‌کند. لازم به ذکر است اولین رمزنگار در توالی رمزنگارها لیستی از بردارهای امبدینگ را دریافت می‌کند و خروجی آن نیز لیستی به همان طول از بردارهای ۵۱۲تایی خواهد بود. لیست خروجی این رمزنگار به رمزنگار بعدی در توالی ورودی داده می‌شود. طول لیست مذکور یکی از ابرپارامترهای مدل ترنسفورمر است که معمولاً ما آن را به اندازه طول بزرگترین جمله موجود در مجموعه داده انتخاب می‌کنیم.

![Encoder with Tensors](/blog/transformer/encoder_with_tensors.png)

در این مرحله می‌توانیم یک ویژگی کلیدی از ترنسفورمر را مشاهده کنیم، که کلمه در هر موقعیت از طریق مسیر مخصوص خود در رمزنگار جریان می‌یابد. در لایه خود-توجه، وابستگی‌هایی بین این مسیرها وجود دارد. اما لایه feed-forward این وابستگی‌ها را ندارد و بنابراین مسیرهای مختلف می‌توانند به صورت موازی در حین عبور از لایه feed-forward اجرا شوند.

در مرحله بعد قصد داریم تا با استفاده از یک جمله کوتاه‌تر ببینیم چه اتفاقی در هر زیرلایه رمزنگار می‌افتد.

## رمزنگار

همانطور که پیشتر گفتیم رمزنگار با دریافت لیستی از بردارها آنها را از دو لایه خود-توجه و سپس feed-forward عبور داده و خروجی را به انکودر بعدی که در توالی قرار دارد می‌دهد.

![Encoder with Tensors 2](/blog/transformer/encoder_with_tensors_2.png)

هر کلمه که در مکانی مشخص از جمله قرار دارد از لایه خود توجه عبور می‌کند. سپس هر کدام از بردارها به صورت مستقل از یک شبکه feed-forward عبور می‌کند.

## نگاهی کلی به مکانیزم خود توجه

فرض کنید نمونه زیر جمله‌ای باشد که ما قصد ترجمه آن را داریم:

“`The animal didn't cross the street because it was too tired`”

برای ترجمه صحیح این جمله ابتدا باید مشخص کرد که کلمه "it" به چه چیزی اشاره می‌کند، خیابان یا حیوان. تشخیص این امر برای ما انسان‌ها کار ساده‌ای است ولی برای الگوریتم به این سادگی‌ها نیست.

مکانیزم خود-توجه به مدل ترنسفورمر کمک می‌کند تا در هنگام پردازش کلمه "it" آن را به حیوان نسبت دهد.

به بیان مفهومی‌تر مکانیزم خود توجه به مدل کمک می‌کند تا هنگام رمزنگاری هر کلمه از جمله به کلمات دیگر همان جمله هم توجه کند و به رمزنگاری بهتر و دقیق‌تری برای این کلمه دست یابد.

اگر شما به شبکه‌های عصبی بازگشتی یا RNN آشنا باشید حتما می‌دانید که وضعیت hidden state ها می‌تواند در پردازش کلمه یا بردار جدید نقش تعیین‌کننده‌ای داشته باشد و به نوعی مانند حافظه عمل کند. در ترنسفورمر نیز مکانیزم خود-توجه چنین کاری را انجام می‌دهد.

اگر با RNN ها آشنا هستید، می‌دانید که حفظ یک وضعیت مخفی به RNN اجازه می‌دهد تا نمایش خود از کلمات/بردارهای قبلی را که پردازش کرده است با بردار کنونی که در حال پردازش است ترکیب کند. خود-توجه روشی است که ترنسفورمر از آن برای بکارگیری “درک” کلمات مرتبط دیگر در آنچه که هم اکنون پردازش می‌شود، استفاده می‌کند.

![Self-Attention Visualization](/blog/transformer/transformer_self-attention_visualization.png)

همانطور که مشاهده می‌شود در هنگام رمزنگاری کلمه "it" در رمزنگار پنجم (از 6) مکانیزم خود-توجه به بردار کلمات "The Animal" وزن بیشتری اختصاص می‌دهد و آنها را در پروسه رمزنگاری کلمه "it" بیشتر دخالت می‌دهد.

حتما به [Tensor2Tensor notebook](https://colab.research.google.com/github/tensorflow/tensor2tensor/blob/master/tensor2tensor/notebooks/hello_t2t.ipynb) سر بزنید. در آنجا می‌توانید خروجی لایه‌های مختلف یک مدل ترنسفورمر را به صورت تعاملی مشاهده و بررسی کنید.

## نگاهی دقیق‌تر به مکانیزم خود-توجه

در این بخش اول نحوه محاسبه خروجی لایه مکانیزم خود-توجه را توضیح می‌دهیم. می‌خواهیم ببینیم چه عملیاتی روی بردارهای ورودی انجام شده تا بردارهای خروجی لایه مذکور بدست آید. بعد از آن نیز مراحل پیاده‌سازی ماتریسی آن را شرح می‌دهیم.

قدم اول در محاسبه خروجی لایه خود-توجه، ساخت 3 بردار "Key"،"Query" و "Value" به ازای هر بردار کلمه ورودی است. همانطور که قبلا گفتیم در اینجا منظور از بردار کلمات همان بردار امبدینگ کلمات است. هر کدام از این سه بردار (Key, Query, value) وزن مختص به خود را دارد که در طول آموزش مدل تنظیم می‌شود. این بردارهای وزن با ضرب در بردار امبدینگ هر کلمه مقداردهی می‌شوند.

The **first step** in calculating self-attention is to create three vectors from each of the encoder’s input vectors (in this case, the embedding of each word). So for each word, we create a Query vector, a Key vector, and a Value vector. These vectors are created by multiplying the embedding by three matrices that we trained during the training process.

لازم به ذکر است که ابعاد بردارهای سه‌گانه مذکور کمتر از ابعاد امبدینگ کلمات است و برابر با 64 است. البته این اندازه می‌تواند بسته به انتخاب شما در هنگام طراحی مدل تغییر کند.

this is an architecture choice to make the computation of multiheaded attention (mostly) constant.

![Self Attention Vectors](/blog/transformer/transformer_self_attention_vectors.png)

Multiplying `x1` by the `WQ` weight matrix produces `q1`, the "query" vector associated with that word. We end up creating a "query", a "key", and a "value" projection of each word in the input sentence.

بردارهای "Query"،"Key" و "Value" دقیقا چه تعریف و نقشی دارند؟
این بردارها انتزاع و به اصطلاح abstraction هستند که از طریق آنها مکانیزم توجه پیاده‌سازی و اعمال می‌شود. در ادامه در مورد نحوه محاسبه آنها توضیح می‌دهیم تا نقش هرکدام برایتان روشن‌تر شود.

قدم دوم در محاسبه خروجی خود-توجه محاسبه یک امتیاز برای هر کلمه نسبت به کلمات دیگر موجود در جمله است. فرض کنید جمله ورودی ما : "Thinking Machines" باشد. ما می‌خواهیم خروجی خود-توجه را برای کلمه اول یعنی "Thinking" محاسبه کنیم. بدین منظور لازم است تا به تمام کلمات موجود در جمله یک امتیاز نسبت به کلمه مورد بررسی اختصاص دهیم. جمع این امتیازها بایستی برابر 1 شود. این امتیازها در واقع مشخص می‌کند هر کلمه در جمله چه سهمی در محاسبه انکودینگ کلمه مورد نظر ما داشته باشد.

The **second step** in calculating self-attention is to calculate a score. Say we’re calculating the self-attention for the first word in this example, “Thinking”. We need to score each word of the input sentence against this word. The score determines how much focus to place on other parts of the input sentence as we encode a word at a certain position.

برای محاسبه امتیاز هر کلمه نسبت به "Thinking"، بردار "Query" این کلمه که در اینجا q1 است را در بردار "Key" آن ضرب می‌کنیم. مثلا در اینجا برای محاسبه امتیاز کلمه "Thinking" نسبت به خودش بایستی ضرب داخلی q1 و k1 را محاسبه کنیم. به همین ترتیب برای محاسبه امتیاز "Machines" نسبت به "Thinking" بایستی q1.k2 را محاسبه کنیم. این عملیات در شکل زیر نمایش داده شده است.

The score is calculated by taking the dot product of the `query vector` with the `key vector` of the respective word we’re scoring. So if we’re processing the self-attention for the word in position `#1`, the first score would be the dot product of `q1` and `k1`. The second score would be the dot product of `q1` and `k2`.

![Self Attention Score](/blog/transformer/transformer_self_attention_score.png)

قدم سوم یکی تقسیم امتیازهای بدست آمده از قدم اول بر مجذور اندازه بردار "Key" است. در اینجا این مقدار برابر با 8 می‌شود. قدم چهارم هم اعمال Softmax به امتیازات است. این مقدار امتیازها را نرمالیزه و جمع آنها را برابر با 1 قرار می‌دهد.

The **third and fourth steps** are to divide the scores by 8 (the square root of the dimension of the key vectors used in the paper – 64. This leads to having more stable gradients. There could be other possible values here, but this is the default), then pass the result through a softmax operation. Softmax normalizes the scores so they’re all positive and add up to 1.

![Self Attention Softmax](/blog/transformer/self-attention_softmax.png)

امتیاز اختصاص داده شده به هر کلمه میزان ارتباط آن را با کلمه مورد بررسی مشخص می‌کند و به همین میزان در محاسبه بردار انکودینگ کلمه مورد نظر نقش دارد. طبعا این امتیاز برای خود کلمه مورد بررسی بیشترین مقدار را دارد.

This softmax score determines how much each word will be expressed at this position. Clearly, the word at this position will have the highest softmax score, but sometimes it’s useful to attend to another word that is relevant to the current word.

قدم پنجم، ضرب بردار Value هر کلمه در امتیاز Softmax آن است. قدم ششم، جمع بردارهای وزن‌دهی شده شده است. با این کار بردار خروجی لایه خود-توجه برای کلمه "Thinking" بدست می‌آید.

The **fifth step** is to multiply each value vector by the softmax score (in preparation to sum them up). The intuition here is to keep intact the values of the word(s) we want to focus on, and drown-out irrelevant words (by multiplying them by tiny numbers like 0.001, for example).

![Self Attention Output](/blog/transformer/self-attention-output.png)

خروجی بدست آمده در مرحله بعد به شبکه feed-forward ورودی داده می‌شود. در بخش بعد خواهیم دید این عملیات چطور به صورت ماتریسی (برای پردازش سریعتر) پیاده‌سازی می‌شود.

## محاسبه ماتریسی خود-توجه

قدم اول محاسبه بردارهای Query، Key و Value است. طبق شکل زیر اگر بردارهای امبدینگ کلمات را در ماتریس X قرار دهیم، باضرب این بردار در بردارهای وزن مختص به هریک از این سه بردار یعنی (`WQ`, `WK`, `WV`) که مقادیرشان هنگام آموزش شبکه تنظیم شده‌اند می‌توان مقادیر سه بردار مذکور را برای هر کلمه محاسبه کرد.

![Self Attention Matrix Calculation](/blog/transformer/self-attention-matrix-calculation.png)

هر ردیف در ماتریس X متناظر با بردار امبدینگ مربوط به یک کلمه در جمله ورودی است. همانطور که مشاهده می‌شود ابعاد ماتریس امبدینگ کلمات (در اینجا 512) بیشتر از ابعاد بردارهای Q, K, V (در اینجا 64) است.

در نهایت، چون با ماتریس سروکار داریم قدم‌های 2 تا 6، که در بخش قبل توضیح داده شدند، در فرمول زیر خلاصه می‌شوند:

![Self Attention Matrix Calculation 2](/blog/transformer/self-attention-matrix-calculation-2.png)

## اژدهای چند سر

مقاله مورد بررسی برای بهبود عملکرد لایه خود-توجه مکانیزم جدیدی به نام توجه "چند-سر" یا همان "Multi-Headed" را معرفی کرده است. این مکانیزم عملکرد لایه خود توجه را از دو منظر بهبود می‌بخشد:

1. افزایش توانایی مدل با فراهم کردن امکان تمرکز روی بخش‌های مختلف جمله. همانطور که در مثال بالاتر دیدیم بردار `z1` جمع وزن‌دار همه بردارهای کلمات جمله بود. در چنین شرایطی ممکن است وزن خود کلمه‌ای که در حال بدست آوردن بردار خود توجه برای آن هستیم آنقدر بزرگ باشد که اثر کلمات دیگر را خنثی کند. در اینجا داشتن چند سر برای مکانیزم خود توجه کمک می‌کند تا این مشکل برطرف شود و شرایط برای در نظر گرفتن کلمات دیگر جمله نیز محیا شود.

2. این مکانیزم چند زیرفضا برای representation توجه به ما می‌دهد. این موجب می‌شود تا ما به جای یک مجموعه سه تایی Query\Key\Value چند مجموعه داشته باشیم. در واقع مدل ترنسفورمر از 8 سر برای توجه استفاده می‌کند لذا 8 مجموعه به ازای هر encoder/decoder خواهیم داشت که هر کدام به ما یک زیر فضا برای مکانیزم توجه به ما می‌دهند.

It gives the attention layer multiple “representation subspaces”. As we’ll see next, with multi-headed attention we have not only one, but multiple sets of Query/Key/Value weight matrices (the Transformer uses eight attention heads, so we end up with eight sets for each encoder/decoder). Each of these sets is randomly initialized. Then, after training, each set is used to project the input embeddings (or vectors from lower encoders/decoders) into a different representation subspace.

![Transformer Attention Heads](/blog/transformer/transformer_attention_heads_qkv.png)

با کمک توجه چند-سر، ما به ازای هر سر ماتریس وزن جداگانه‌ای برای بردارهای Q, K, V داریم که در طول آموزش منجر به بدست آمدن ماتریس‌های متفاوتی برای Q, K, V می‌شوند. مانند قبل با ضرب ماتریسی X با ضرایب بردارهای سه‌گانه یعنی `WQ`, `WK`, `WV` ماتریس‌های Q, K, V بدست می‌آیند.

با توجه به اینکه 8 سر برای محاسبه خود توجه داریم، اگر 8 بار با ماتریس‌های وزن متفاوت محاسبات لایه خود توجه را مانند توضیحات گذشته انجام دهیم به 8 ماتریس متفاوت Z خواهیم رسید.

![Transformer Attention Heads Z](/blog/transformer/transformer_attention_heads_z.png)

تا اینجا ما 8 ماتریس مختلف برای Z بدست آوردیم که هرکدام ما وزن‌های متفاوتی بردار خود توجه کلمات را محاسبه کرده‌اند. در مرحله بعد بایستی بردار Z را به لایه feed-forward ورودی بدهیم. اما چالش اینجاست که لایه خود توجه انتظار یک بردار z را به عنوان ورودی دارد. پس ما به راهی نیاز داریم تا این 8 ماتریس را در به گونه‌ای در یک ماتریس ترکیب کنیم. اما سوال اینجاست چونه این کار را انجام دهیم؟ 

جواب این است که ابتدا این 8 ماتریس را با هم concat می‌کنیم. سپس ماتریس بدست آمده را در یک بردار وزن جدید به نام `WO` ضرب می‌کنیم. این کار باعث می‌شود تا با ترکیب بردارهای مختلفی که برای Z بدست آوردیم یک بردار Z داشته باشیم. نکته جالب اینجاست که شبکه نحوه ترکیب این بردارها با هم را در طول آموزش یاد می‌گیرد.

![Transformer Attention Heads Weight Matrix O](/blog/transformer/transformer_attention_heads_weight_matrix_o.png)

خب این هم از مکانیزم خود-توجه و نحوه محاسبه آن. شکل زیر همه چیزهایی که تا الان گفتیم را جمع‌بندی می‌کند:

![Multi-Headed Self-Attention Recap](/blog/transformer/transformer_multi-headed_self-attention-recap.png)

حالا که با head های توجه آشنایی پیدا کردیم، بیایید دوباره به مثال قبل نگاه کنیم تا ببینیم در هنگام encode کلمه "it" هر کدام از سرها به چه بخش‌هایی از جمله بیشتر توجه می‌کنند: 

![Self-Attention Visualization 2](/blog/transformer/transformer_self-attention_visualization_2.png)

حین encode کلمه "it" یک head بیشترین توجه را روی "the animal" دارد در حالی که یک سر دیگر بیشترین توجه را روی "tired" دارد. به عبارتی representation مدل از کلمه "it" تحت تاثیر representation های "animal" و "tired" قرار دارد.

حال اگر به وزن‌های همه 6 سر نگاه کنیم وصف روابط سخت‌تر می‌شود.

![Self-Attention Visualization 3](/blog/transformer/transformer_self-attention_visualization_3.png)

## حفظ ترتیب در جمله با استفاده از Positional Encoding یا رمزنگاری مکانی

حال نوبت به این می‌رسد تا ببینیم مدل چگونه ترتیب کلمات در جمله ورودی را در نظر می‌گیرد.

بدین منظور ترنسفورمر یک بردار به هر embedding جمله ورودی اضافه می‌کند. این بردارها از یک الگوی مشخص که مدل در حین آموزش یاد می‌گیرد، پیروی می‌کنند. این امر به مدل توانایی درک مکان کلمات مختلف جمله و همچنین فاصله آنها از یکدیگر را می‌دهد. درک شهودی این است که با اضافه کردن این بردارها تفاوت معنی‌داری در فاصله بردار embedding کلمات جمله ایجاد می‌کند که در هنگام بدست آوردن بردارهای K/Q/V اثرگذار است.

The intuition here is that adding these values to the embeddings provides meaningful distances between the embedding vectors once they’re projected into Q/K/V vectors and during dot-product attention.

![Positional Encoding Vectors](/blog/transformer/transformer_positional_encoding_vectors.png)

برای اینکه به مدل حسی از ترتیب کلمات بدهیم، بردارهای رمزنگاری مکانی را اضافه می‌کنیم. بردارهایی که پس از آموزش مقادیر آنها از یک الگوی مشخصی پیروی می‌کند.

اگر فرض کنیم که بردار embedding کلمات ابعادی برابر با 4 دارد، بردارهای رمزنگاری مکانی به شکل زیر خواهند بود:

![Positional Encoding Example](/blog/transformer/transformer_positional_encoding_example.png)

این الگو که راجع بهش صحبت کردیم می‌تواند چه شکلی باشد؟

با توجه به شکلی که در ادامه آمده است، هر ردیف در تنسور positional encoding متناظر با رمزنگاری مکانی بردار embedding یک کلمه در جمله ورودی است. بنابراین اولین ردیف برداری است که باید به embedding اولین کلمه جمله اضافه کنیم. اگر ابعاد بردار embedding کلمات را 512 در نظر بگیریم بردار مکان آن نیز ابعادی یکسان خواهد داشت و مقادیر آن بین -1 تا 1 خواهد بود.

![Positional Encoding Tensor](/blog/transformer/attention-is-all-you-need-positional-encoding.png)

فرمول محاسبه رمزنگاری مکانی در بخش 3.5 مقاله توضیح داده شده است. کد تولید این رمزنگاری در [اینجا](https://github.com/jalammar/jalammar.github.io/blob/master/notebookes/transformer/transformer_positional_encoding_graph.ipynb) قرار دارد. قطعا راه‌های دیگری برای محاسبه رمزنگاری مکانی وجود دارد. برای نمونه تابع [get_timing_signal_1d()](https://github.com/tensorflow/tensor2tensor/blob/23bd23b9830059fbc349381b70d9429b5c40a139/tensor2tensor/layers/common_attention.py) در کدهای مربوط به Transformer2Transformer عملیات رمزنگاری مکانی را انجام می‌دهد. مزیت روش معرفی شده در قابلیت مقیاس‌پذیری آن به جملات با طول دلخواه است. یعنی پس از آموزش مدل با جمله‌هایی با طول مشخص در زمان آزمون مدل توانایی پذیرش جملات طولانی‌تر را نیز دارد. شکل زیر نمونه‌ای از بردارهای تولید شده توسط این روش را نشان می‌دهد:

![Large Positional Encoding Example](/blog/transformer/transformer_positional_encoding_large_example.png)

یک مثال واقعی از رمزنگاری‌های مکانی برای 20 کلمه (شامل 20 ردیف) با سایز embedding 512 (512 ستون)

## اتصالات بازگشتی

یکی از جزئیات دیگر در مدل Transformer که بایستی به آن اشاره کرد، وجود اتصالات بازگشتی در هر زیرلایه انکودر (شامل خود-توجه، شبکه feed-forward) است. به دنبال آن نیز عملیات [layer-normalization](https://arxiv.org/abs/1607.06450) انجام می‌شود.

![Residual Layer Norm](/blog/transformer/transformer_resideual_layer_norm.png)

شکل زیر عملیاتی را که در حین محاسبه بردارهای خود توجه روی بردارها انجام می‌شود در لایه Add and Normalize را نشان می‌دهد.

![Residual Layer Norm 2](/blog/transformer/transformer_resideual_layer_norm_2.png)

این ساختار در بخش رمزگشا یا decoder نیز صادق است. اگر فرض کنیم ترنسفورمر متشکل از یک رمزنگار و رمزگشا باشد، شکل زیر ساختار آن را نشان می‌دهد.

![Residual Layer Norm 3](/blog/transformer/transformer_resideual_layer_norm_3.png)

## رمز گشا | The Decoder

در این بخش به توضیح ساختار رمزگشا یا همان decoder می‌پردازیم.

همانطور که دیدیم، رمزنگار (Encoder) در آخرین لایه خود مجموعه‌ای از بردارهای توجه K و V را تولید می‌کند. این بردارها به تمام لایه‌های رمزنگار در بخش Decoder ورودی داده می‌شوند. با این کار رمزگشا می‌داند که بر کدام بخش‌های جمله تمرکز کند.

![Decoding 1](/blog/transformer/transformer_decoding_1.gif)

![Decoding 2](/blog/transformer/transformer_decoding_2.gif)

عملیات خود-توجه در رمزگشا به شکلی کمی متفاوت با آنچه در رمزنگار وجود دارد عمل می‌کند:

در رمزگشا، لایه خود-توجه تنها مجاز است به موقعیت‌های قبلی در توالی خروجی توجه کند. این کار با مخفی کردن موقعیت‌های آینده (تنظیم آنها به `-inf`) قبل از مرحله softmax در محاسبه خود-توجه انجام می‌شود.

لایه “Encoder-Decoder Attention” مشابه لایه خود-توجه چندسر عمل می‌کند، به جز این که ماتریس Queries خود را از لایه زیرین خود می‌سازد و ماتریس‌های Keys و Values را از خروجی استک رمزنگار می‌گیرد.

## لایه خطی و softmax آخر

خروجی نهایی رمزگشا (decoder) یک بردار عددی است. یک لایه Linear به همراه تابع فعالسازی softmax این اعداد را به کلمه تبدیل می‌کند.

The decoder stack outputs a vector of floats. How do we turn that into a word? That’s the job of the final Linear layer which is followed by a Softmax Layer.

لایه Linear آخر در واقع یک شبکه عصبی تمام متصل است که بردار خروجی رمزگشا را به یک بردار بسیار بزرگتر که شامل احتمالات اختصاص یافته به کلمات مختلف در vocabulary داده آموزش است. به این بردار بردار Logits نیز گفته می‌شود. برای مثال فرض کنید اندازه vocabulary 10000 کلمه باشد. در اینصورت اندازه بردار Logits که خروجی لایه خطی است دارای 10000 المان است. تابع فعالسازی softmax نیز این امتیازات را نرمالیزه می‌کند به طوریکه جمع همه این اعداد برابر با 1 شود. المانی که بیشترین احتمال برایش پیش‌بینی شده باشد انتخاب شده و به عنوان خروجی آن timestep در نظر گرفته می‌شود.

![Decoder Output Softmax](/blog/transformer/transformer_decoder_output_softmax.png)

## Recap Of Training

Now that we’ve covered the entire forward-pass process through a trained Transformer, it would be useful to glance at the intuition of training the model.

During training, an untrained model would go through the exact same forward pass. But since we are training it on a labeled training dataset, we can compare its output with the actual correct output.

To visualize this, let’s assume our output vocabulary only contains six words (“a”, “am”, “i”, “thanks”, “student”, and “<eos>” (short for ‘end of sentence’)).

![Vocabulary](/blog/transformer/vocabulary.png)

Once we define our output vocabulary, we can use a vector of the same width to indicate each word in our vocabulary. This also known as one-hot encoding. So for example, we can indicate the word “am” using the following vector:

![One-Hot Vocabulary Example](/blog/transformer/one-hot-vocabulary-example.png)

Following this recap, let’s discuss the model’s loss function – the metric we are optimizing during the training phase to lead up to a trained and hopefully amazingly accurate model.

## The Loss Function

Say we are training our model. Say it’s our first step in the training phase, and we’re training it on a simple example – translating “merci” into “thanks”.

What this means, is that we want the output to be a probability distribution indicating the word “thanks”. But since this model is not yet trained, that’s unlikely to happen just yet.

![Transformer Logits Output and Label](/blog/transformer/transformer_logits_output_and_label.png)

Since the model's parameters (weights) are all initialized randomly, the (untrained) model produces a probability distribution with arbitrary values for each cell/word. We can compare it with the actual output, then tweak all the model's weights using backpropagation to make the output closer to the desired output.

How do you compare two probability distributions? We simply subtract one from the other. For more details, look at [cross-entropy](https://colah.github.io/posts/2015-09-Visual-Information/) and [Kullback–Leibler divergence](https://www.countbayesie.com/blog/2017/5/9/kullback-leibler-divergence-explained).

But note that this is an oversimplified example. More realistically, we’ll use a sentence longer than one word. For example – input: “je suis étudiant” and expected output: “i am a student”. What this really means, is that we want our model to successively output probability distributions where:

- Each probability distribution is represented by a vector of width vocab_size (6 in our toy example, but more realistically a number like 30,000 or 50,000)
- The first probability distribution has the highest probability at the cell associated with the word “i”
- The second probability distribution has the highest probability at the cell associated with the word “am”
- And so on, until the fifth output distribution indicates ‘<end of sentence>’ symbol, which also has a cell associated with it from the 10,000 element vocabulary.

![Output Target Probability Distributions](/blog/transformer/output_target_probability_distributions.png)

After training the model for enough time on a large enough dataset, we would hope the produced probability distributions would look like this:

![Output Trained Model Probability Distributions](/blog/transformer/output_trained_model_probability_distributions.png)

Hopefully upon training, the model would output the right translation we expect. Of course it's no real indication if this phrase was part of the training dataset (see: [cross-validation](https://www.youtube.com/watch?v=TIgfjmp-4BA)). Notice that every position gets a little bit of probability even if it's unlikely to be the output of that time step -- that's a very useful property of softmax which helps the training process.

Now, because the model produces the outputs one at a time, we can assume that the model is selecting the word with the highest probability from that probability distribution and throwing away the rest. That’s one way to do it (called greedy decoding). Another way to do it would be to hold on to, say, the top two words (say, ‘I’ and ‘a’ for example), then in the next step, run the model twice: once assuming the first output position was the word ‘I’, and another time assuming the first output position was the word ‘a’, and whichever version produced less error considering both positions #1 and #2 is kept. We repeat this for positions #2 and #3…etc. This method is called “beam search”, where in our example, beam_size was two (meaning that at all times, two partial hypotheses (unfinished translations) are kept in memory), and top_beams is also two (meaning we’ll return two translations). These are both hyperparameters that you can experiment with.

## Go Forth And Transform

امیدوارم با خواندن این مقاله درک خوبی نسبت به ساختار و نحوه عملکرد ترنسفورمر پیدا کرده باشید. اگر تمایل به مطالعه بیشتر دارید می‌توانید از منابع زیر کمک بگیرید:

- Read the [Attention Is All You Need](https://arxiv.org/abs/1706.03762) paper, the Transformer blog post ([Transformer: A Novel Neural Network Architecture for Language Understanding](https://ai.googleblog.com/2017/08/transformer-novel-neural-network.html)), and the [Tensor2Tensor announcement](https://ai.googleblog.com/2017/06/accelerating-deep-learning-research.html).
- Watch [Łukasz Kaiser’s talk](https://www.youtube.com/watch?v=rBCqOTEfxvg) walking through the model and its details.
- Play with the [Jupyter Notebook provided as part of the Tensor2Tensor repo](https://colab.research.google.com/github/tensorflow/tensor2tensor/blob/master/tensor2tensor/notebooks/hello_t2t.ipynb).
- Explore the [Tensor2Tensor repo](https://github.com/tensorflow/tensor2tensor).

Follow-up works:

- [Depthwise Separable Convolutions for Neural Machine Translation](https://arxiv.org/abs/1706.03059)
- [One Model To Learn Them All](https://arxiv.org/abs/1706.05137)
- [Discrete Autoencoders for Sequence Models](https://arxiv.org/abs/1801.09797)
- [Generating Wikipedia by Summarizing Long Sequences](https://arxiv.org/abs/1801.10198)
- [Image Transformer](https://arxiv.org/abs/1802.05751)
- [Training Tips for the Transformer Model](https://arxiv.org/abs/1804.00247)
- [Self-Attention with Relative Position Representations](https://arxiv.org/abs/1803.02155)
- [Fast Decoding in Sequence Models using Discrete Latent Variables](https://arxiv.org/abs/1803.03382)
- [Adafactor: Adaptive Learning Rates with Sublinear Memory Cost](https://arxiv.org/abs/1804.04235)

## Acknowledgements

باتشکر از [JayAlammar](https://twitter.com/JayAlammar).
