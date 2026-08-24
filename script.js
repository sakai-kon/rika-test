const QUESTIONS = [
  {id:'f1',cat:'flower',diff:'基礎',q:'花を外側から中心に向かって並べたとき、正しい順番はどれ？',a:['がく → 花弁 → おしべ → めしべ','花弁 → がく → めしべ → おしべ','がく → おしべ → 花弁 → めしべ','おしべ → 花弁 → がく → めしべ'],e:'花の基本的な並びは、外側から「がく、花弁、おしべ、めしべ」です。'},
  {id:'f2',cat:'flower',diff:'基礎',q:'花粉をつくる器官はどれ？',a:['おしべ','めしべ','子房','がく'],e:'おしべのやくで花粉がつくられます。'},
  {id:'f3',cat:'flower',diff:'基礎',q:'めしべの先端にある部分を何という？',a:['柱頭','花柱','子房','胚珠'],e:'めしべの先端は柱頭、その下が花柱、根元のふくらみが子房です。'},
  {id:'f4',cat:'flower',diff:'標準',q:'子房の中にあるものはどれ？',a:['胚珠','花粉','やく','花弁'],e:'子房の中には胚珠があります。'},
  {id:'f5',cat:'flower',diff:'標準',q:'受精後、胚珠は何になる？',a:['種子','果実','花粉','がく'],e:'受精後は胚珠が種子になり、子房が果実になります。'},
  {id:'f6',cat:'flower',diff:'標準',q:'受精後、子房は何になる？',a:['果実','種子','花粉','胚珠'],e:'子房が成長して果実になります。'},
  {id:'f7',cat:'flower',diff:'標準',q:'がくの主な役割として適切なのはどれ？',a:['つぼみのときに花を包んで守る','花粉をつくる','胚珠をつくる','受精後に種子になる'],e:'がくはつぼみの時期に花を包み、保護する働きがあります。'},
  {id:'f8',cat:'flower',diff:'応用',q:'「子房の中に胚珠がある」という特徴が直接示す植物の分類はどれ？',a:['被子植物','裸子植物','シダ植物','コケ植物'],e:'被子植物では胚珠が子房に包まれています。'},

  {id:'c1',cat:'classification',diff:'基礎',q:'種子をつくってふえる植物を何という？',a:['種子植物','シダ植物','コケ植物','菌類'],e:'種子をつくる植物を種子植物といいます。'},
  {id:'c2',cat:'classification',diff:'標準',q:'胚珠が子房の中にある植物はどれ？',a:['被子植物','裸子植物','シダ植物','コケ植物'],e:'被子植物では胚珠が子房に包まれています。'},
  {id:'c3',cat:'classification',diff:'標準',q:'胚珠が子房に包まれていない植物はどれ？',a:['裸子植物','被子植物','シダ植物','コケ植物'],e:'裸子植物では胚珠がむき出しの状態です。'},
  {id:'c4',cat:'classification',diff:'基礎',q:'マツはどの分類に入る？',a:['裸子植物','被子植物','シダ植物','コケ植物'],e:'マツは代表的な裸子植物です。'},
  {id:'c5',cat:'classification',diff:'基礎',q:'アサガオはどの分類に入る？',a:['被子植物','裸子植物','シダ植物','コケ植物'],e:'アサガオは花をつくる被子植物です。'},
  {id:'c6',cat:'classification',diff:'標準',q:'シダ植物とコケ植物に共通する特徴はどれ？',a:['種子をつくらず胞子でふえる','胚珠が子房にある','花をつくる','種子をつくる'],e:'シダ植物とコケ植物はともに種子をつくらず、胞子でふえます。'},
  {id:'c7',cat:'classification',diff:'標準',q:'根・茎・葉の区別がある、胞子でふえる植物はどれ？',a:['シダ植物','コケ植物','裸子植物','被子植物'],e:'シダ植物は根・茎・葉の区別があり、胞子でふえます。'},
  {id:'c8',cat:'classification',diff:'標準',q:'根・茎・葉の区別がはっきりしない、胞子でふえる植物はどれ？',a:['コケ植物','シダ植物','裸子植物','被子植物'],e:'コケ植物は根・茎・葉の区別がはっきりせず、胞子でふえます。'},
  {id:'c9',cat:'classification',diff:'応用',q:'次の条件をすべて満たす植物はどれ？「種子をつくる・胚珠が子房に包まれていない」',a:['裸子植物','被子植物','シダ植物','コケ植物'],e:'種子植物のうち、胚珠が子房に包まれていないのが裸子植物です。'},
  {id:'c10',cat:'classification',diff:'応用',q:'次のうち、胞子でふえ、根・茎・葉の区別があるものはどれ？',a:['イヌワラビ','ゼニゴケ','マツ','アブラナ'],e:'イヌワラビはシダ植物で、根・茎・葉の区別があります。'},

  {id:'m1',cat:'mono',diff:'基礎',q:'単子葉類の子葉は何枚？',a:['1枚','2枚','3枚','4枚'],e:'単子葉類は子葉が1枚です。'},
  {id:'m2',cat:'mono',diff:'基礎',q:'双子葉類の子葉は何枚？',a:['2枚','1枚','3枚','4枚'],e:'双子葉類は子葉が2枚です。'},
  {id:'m3',cat:'mono',diff:'標準',q:'単子葉類に多く見られる葉脈はどれ？',a:['平行脈','網状脈','放射脈','らせん脈'],e:'単子葉類では葉脈が平行に並ぶ平行脈が基本です。'},
  {id:'m4',cat:'mono',diff:'標準',q:'双子葉類に多く見られる葉脈はどれ？',a:['網状脈','平行脈','円形脈','分岐しない脈'],e:'双子葉類では葉脈が網目状に広がる網状脈が基本です。'},
  {id:'m5',cat:'mono',diff:'標準',q:'単子葉類の根の特徴はどれ？',a:['ひげ根','主根と側根','太い主根だけ','根をつくらない'],e:'単子葉類の根は細い根が多数出るひげ根です。'},
  {id:'m6',cat:'mono',diff:'標準',q:'双子葉類の根の特徴はどれ？',a:['主根と側根','ひげ根','根がなく仮根のみ','主根がない'],e:'双子葉類では太い主根と、そこから出る側根が見られます。'},
  {id:'m7',cat:'mono',diff:'基礎',q:'イネは単子葉類・双子葉類のどちら？',a:['単子葉類','双子葉類','裸子植物','シダ植物'],e:'イネは単子葉類の代表例です。'},
  {id:'m8',cat:'mono',diff:'基礎',q:'アブラナは単子葉類・双子葉類のどちら？',a:['双子葉類','単子葉類','裸子植物','コケ植物'],e:'アブラナは双子葉類の代表例です。'},
  {id:'m9',cat:'mono',diff:'応用',q:'「子葉1枚・平行脈・ひげ根」の組み合わせに当てはまるのはどれ？',a:['トウモロコシ','アサガオ','マツ','イヌワラビ'],e:'トウモロコシは単子葉類で、子葉1枚・平行脈・ひげ根という特徴があります。'},
  {id:'m10',cat:'mono',diff:'応用',q:'「子葉2枚・網状脈・主根と側根」の組み合わせに当てはまるのはどれ？',a:['アサガオ','イネ','マツ','スギゴケ'],e:'アサガオは双子葉類で、これらの特徴が見られます。'},

  {id:'all1',cat:'all',diff:'総合',q:'「花をつくる・胚珠が子房の中にある」植物の分類は？',a:['被子植物','裸子植物','シダ植物','コケ植物'],e:'花をつくり、胚珠が子房に包まれているのは被子植物です。'},
  {id:'all2',cat:'all',diff:'総合',q:'「種子をつくる・胚珠がむき出し」に当てはまるのは？',a:['裸子植物','被子植物','シダ植物','コケ植物'],e:'胚珠がむき出しの種子植物は裸子植物です。'},
  {id:'all3',cat:'all',diff:'総合',q:'「胞子・根茎葉あり」に当てはまるのは？',a:['シダ植物','コケ植物','被子植物','裸子植物'],e:'胞子でふえ、根・茎・葉の区別があるのはシダ植物です。'},
  {id:'all4',cat:'all',diff:'総合',q:'「胞子・仮根・根茎葉の区別がはっきりしない」に当てはまるのは？',a:['コケ植物','シダ植物','被子植物','裸子植物'],e:'コケ植物には仮根があり、根・茎・葉の区別がはっきりしません。'},
  {id:'all5',cat:'all',diff:'総合',q:'花の中心にあり、子房と胚珠をもつ器官は？',a:['めしべ','おしべ','花弁','がく'],e:'めしべには柱頭・花柱・子房があり、子房の中に胚珠があります。'},
  {id:'all6',cat:'all',diff:'総合',q:'受精後に「種子」になる部分はどれ？',a:['胚珠','子房','柱頭','花弁'],e:'胚珠が種子になります。子房は果実になります。'},
  {id:'all7',cat:'all',diff:'総合',q:'受精後に「果実」になる部分はどれ？',a:['子房','胚珠','やく','花柱'],e:'子房が成長して果実になります。'},
  {id:'all8',cat:'all',diff:'総合',q:'単子葉類と双子葉類を分ける特徴として不適切なのはどれ？',a:['胞子でふえるかどうか','子葉の数','葉脈の形','根のつくり'],e:'単子葉類・双子葉類はいずれも被子植物の分類で、種子をつくります。'},
  {id:'all9',cat:'all',diff:'総合',q:'平行脈の葉をもち、ひげ根をもつ植物の仲間は？',a:['単子葉類','双子葉類','裸子植物','コケ植物'],e:'平行脈とひげ根は単子葉類の代表的な特徴です。'},
  {id:'all10',cat:'all',diff:'総合',q:'次の分類順として正しいのはどれ？',a:['植物 → 種子植物 → 被子植物 → 単子葉類','植物 → 単子葉類 → 種子植物 → 被子植物','植物 → 被子植物 → 種子植物 → 単子葉類','植物 → シダ植物 → 被子植物 → 単子葉類'],e:'単子葉類は被子植物に含まれ、被子植物は種子植物に含まれます。'},
  {id:'all11',cat:'all',diff:'総合',q:'「マツ・イネ・イヌワラビ・ゼニゴケ」を種子植物と種子をつくらない植物に分けると、種子植物は？',a:['マツとイネ','イヌワラビとゼニゴケ','マツとイヌワラビ','イネとゼニゴケ'],e:'マツとイネは種子植物、イヌワラビとゼニゴケは種子をつくらず胞子でふえます。'},
  {id:'all12',cat:'all',diff:'総合',q:'「子葉2枚・網状脈・主根と側根」がすべて当てはまるのは？',a:['双子葉類','単子葉類','裸子植物だけ','シダ植物'],e:'この3つは双子葉類の代表的な特徴です。'}
];

const MODE_INFO={all:{label:'総合テスト',count:12},flower:{label:'花のつくり',count:8},classification:{label:'分類マスター',count:8},mono:{label:'単子葉 vs 双子葉',count:8}};
let state={mode:'all',questions:[],index:0,score:0,answers:[],answered:false};

const $=id=>document.getElementById(id);
function shuffle(arr){return [...arr].sort(()=>Math.random()-0.5)}
function show(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));$(id).classList.add('active')}
function saveBest(score){const key='plantQuizBest';const best=Number(localStorage.getItem(key)||0);if(score>best)localStorage.setItem(key,String(score));renderBest()}
function renderBest(){const best=Number(localStorage.getItem('plantQuizBest')||0);$('bestScore').textContent=best?`最高得点：${best}点`:'最高得点：—'}
function buildQuiz(mode){
  state.mode=mode;state.index=0;state.score=0;state.answers=[];state.answered=false;
  const pool=QUESTIONS.filter(q=>mode==='all'?q.cat==='all':q.cat===mode);
  state.questions=shuffle(pool).slice(0, mode==='all'?12:8);
  $('categoryLabel').textContent=MODE_INFO[mode].label;
  show('quizScreen');renderQuestion();
}
function renderQuestion(){
  const q=state.questions[state.index];state.answered=false;
  $('questionNo').textContent=` / ${state.questions.length}`;
  $('questionNo').insertAdjacentText('beforebegin',`${state.index+1}`);
  $('scoreLive').textContent=`${state.score}点`;
  $('progressBar').style.width=`${(state.index/state.questions.length)*100}%`;
  $('difficulty').textContent=q.diff;
  $('questionText').textContent=q.q;
  $('feedback').className='feedback hidden';$('feedback').textContent='';
  $('nextButton').disabled=true;$('nextButton').textContent=state.index===state.questions.length-1?'結果を見る':'次の問題';
  const options=shuffle(q.a);
  $('choices').innerHTML='';
  options.forEach(text=>{const b=document.createElement('button');b.className='choice';b.textContent=text;b.addEventListener('click',()=>answer(q,text,b));$('choices').appendChild(b)});
}
function answer(q,chosen,button){
  if(state.answered)return;state.answered=true;
  const correct=q.a[0];const ok=chosen===correct;
  state.answers.push({q:q.q,chosen,correct});
  if(ok)state.score+=Math.round(100/state.questions.length);
  document.querySelectorAll('.choice').forEach(b=>{b.disabled=true;if(b.textContent===correct)b.classList.add('correct');else if(b===button)b.classList.add('wrong');else b.classList.add('reveal')});
  $('feedback').className=`feedback ${ok?'good':'bad'}`;
  $('feedback').textContent=(ok?'正解！ ':'不正解。 ')+q.e;
  $('nextButton').disabled=false;$('scoreLive').textContent=`${Math.min(state.score,100)}点`;
  $('progressBar').style.width=`${((state.index+1)/state.questions.length)*100}%`;
}
function next(){if(!state.answered)return;if(state.index<state.questions.length-1){state.index++;renderQuestion()}else finish()}
function finish(){
  state.score=Math.min(100,state.answers.filter(x=>x.chosen===x.correct).length/state.questions.length*100);
  const correct=state.answers.filter(x=>x.chosen===x.correct).length;saveBest(state.score);
  $('resultScore').textContent=Math.round(state.score);$('scoreRing').style='--score:'+state.score+'%';
  $('correctCount').textContent=correct;$('totalCount').textContent=state.questions.length;$('accuracy').textContent=Math.round(state.score)+'%';
  $('resultTitle').textContent=state.score===100?'植物分類マスター！':state.score>=80?'かなりできてる！':state.score>=60?'あと少し！':'復習するとさらに伸びる！';
  $('resultSummary').textContent=`${correct} / ${state.questions.length} 問正解。`;
  const misses=state.answers.filter(x=>x.chosen!==x.correct);
  $('mistakeReview').innerHTML=misses.length?`<h3>復習ポイント</h3>`+misses.map((x,i)=>`<div class="review-item"><div class="q">${i+1}. ${x.q}</div><div class="a">あなたの答え：${x.chosen}<br>正解：${x.correct}</div></div>`).join(''):'<h3>全問正解！</h3><p>復習ポイントはありません。別モードにも挑戦してみよう。</p>';
  show('resultScreen');
}

$('scoreLive').textContent='0点';
$('startAll').addEventListener('click',()=>buildQuiz('all'));
document.querySelectorAll('.mode-card').forEach(b=>b.addEventListener('click',()=>buildQuiz(b.dataset.mode)));
$('nextButton').addEventListener('click',next);
$('quitButton').addEventListener('click',()=>show('homeScreen'));
$('homeButton').addEventListener('click',()=>show('homeScreen'));
$('retryButton').addEventListener('click',()=>buildQuiz(state.mode));
renderBest();
