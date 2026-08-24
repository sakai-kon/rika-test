const QUIZ_DATA = {
  japanese: {
    name: '国語', icon: '📖', description: '漢字・文法・古文・読解を中1範囲で学ぶ',
    units: [
      {id:'kanji', name:'漢字・語句', icon:'✍️'},
      {id:'bunpo', name:'文法・品詞', icon:'🔤'},
      {id:'kobun', name:'古文・古典', icon:'🏯'},
      {id:'reading', name:'読解・表現', icon:'📚'}
    ]
  },
  math: {
    name: '数学', icon: '📐', description: '正負の数・文字式・方程式・比例反比例など',
    units: [
      {id:'positive', name:'正の数・負の数', icon:'➕'},
      {id:'expression', name:'文字と式', icon:'🔣'},
      {id:'equation', name:'一元一次方程式', icon:'🧮'},
      {id:'proportion', name:'比例・反比例', icon:'📈'},
      {id:'geometry', name:'平面図形', icon:'📏'},
      {id:'space', name:'空間図形', icon:'🧊'},
      {id:'statistics', name:'データの活用', icon:'📊'}
    ]
  },
  science: {
    name: '理科', icon: '🔬', description: '植物・物質・光・音・力・地学の基礎',
    units: [
      {id:'biology', name:'生物の観察と植物', icon:'🌱'},
      {id:'matter', name:'身のまわりの物質', icon:'⚗️'},
      {id:'force', name:'光・音・力', icon:'🌈'},
      {id:'earth', name:'大地の変化', icon:'🌋'}
    ]
  },
  social: {
    name: '社会', icon: '🗾', description: '地理・歴史を中1向けに整理',
    units: [
      {id:'geography-japan', name:'日本の地域・地形', icon:'🗾'},
      {id:'geography-world', name:'世界の地域・気候', icon:'🌍'},
      {id:'history-ancient', name:'古代日本・古代文明', icon:'🏺'},
      {id:'history-medieval', name:'中世の日本', icon:'⚔️'}
    ]
  },
  english: {
    name: '英語', icon: '🔤', description: 'be動詞・一般動詞・疑問文・三単現など',
    units: [
      {id:'be', name:'be動詞', icon:'🟦'},
      {id:'verb', name:'一般動詞', icon:'🟩'},
      {id:'question', name:'疑問文・否定文', icon:'❓'},
      {id:'third', name:'三人称単数', icon:'3️⃣'},
      {id:'pronoun', name:'代名詞・名詞', icon:'👤'},
      {id:'can', name:'can・命令文', icon:'💬'},
      {id:'vocabulary', name:'語彙・基本表現', icon:'📒'}
    ]
  }
};

const QUESTIONS = [
  // 国語
  {id:'j1',subject:'japanese',unit:'kanji',difficulty:'基礎',q:'「故郷」の「郷」の読みとして正しいものは？',a:['きょう','ごう','さと','こう'],answer:0,e:'「故郷」は「ふるさと」と読みます。漢字一字の音読みでは「きょう」があります。'},
  {id:'j2',subject:'japanese',unit:'kanji',difficulty:'基礎',q:'「努力」の「努」の読みは？',a:['ど','ぬ','つと','の'],answer:0,e:'「努力」は「どりょく」と読みます。'},
  {id:'j3',subject:'japanese',unit:'kanji',difficulty:'標準',q:'「確か」の読みとして正しいものは？',a:['たしか','かくか','たし','しか'],answer:0,e:'「確か」は「たしか」です。'},
  {id:'j4',subject:'japanese',unit:'kanji',difficulty:'標準',q:'「観察」の意味に最も近いものは？',a:['よく見て調べること','想像して作ること','暗記すること','大声で読むこと'],answer:0,e:'観察は対象を注意深く見て、その様子や変化を調べることです。'},
  {id:'j5',subject:'japanese',unit:'kanji',difficulty:'応用',q:'「原因」の対になる言葉として最も適切なのは？',a:['結果','理由','方法','目的'],answer:0,e:'原因によって生じたものが結果です。'},
  {id:'j6',subject:'japanese',unit:'kanji',difficulty:'標準',q:'「静か」の類義語として最も近いものは？',a:['穏やか','激しい','にぎやか','危険'],answer:0,e:'「静か」と「穏やか」は状況によって近い意味になります。'},
  {id:'j7',subject:'japanese',unit:'bunpo',difficulty:'基礎',q:'「美しい花」の「美しい」は何の品詞？',a:['形容詞','形容動詞','名詞','副詞'],answer:0,e:'「美しい」は「〜い」で終わり、形容詞です。'},
  {id:'j8',subject:'japanese',unit:'bunpo',difficulty:'基礎',q:'「静かな町」の「静かな」は何の品詞？',a:['形容動詞','形容詞','連体詞','名詞'],answer:0,e:'「静かだ」の形をとる語で、名詞を修飾すると「静かな」になります。'},
  {id:'j9',subject:'japanese',unit:'bunpo',difficulty:'標準',q:'「学校へ行く」の「へ」は何？',a:['助詞','助動詞','接続詞','副詞'],answer:0,e:'「へ」は方向を表す格助詞です。'},
  {id:'j10',subject:'japanese',unit:'bunpo',difficulty:'標準',q:'「本を読む」の「を」は何？',a:['助詞','助動詞','接頭語','形容詞'],answer:0,e:'「を」は動作の対象を表す助詞です。'},
  {id:'j11',subject:'japanese',unit:'bunpo',difficulty:'標準',q:'「とても速く走る」の「とても」は何の品詞？',a:['副詞','連体詞','形容詞','接続詞'],answer:0,e:'「とても」は「速く」を修飾している副詞です。'},
  {id:'j12',subject:'japanese',unit:'bunpo',difficulty:'応用',q:'「しかし、雨はやまなかった。」の「しかし」は何の品詞？',a:['接続詞','副詞','感動詞','助詞'],answer:0,e:'前後の内容を逆接でつなぐ接続詞です。'},
  {id:'j13',subject:'japanese',unit:'kobun',difficulty:'基礎',q:'古文で「いと」の意味としてよく使われるものは？',a:['とても','少し','すぐに','まったく'],answer:0,e:'古文の「いと」は「とても・たいそう」という意味で使われます。'},
  {id:'j14',subject:'japanese',unit:'kobun',difficulty:'基礎',q:'古文の「をかし」の意味として近いものは？',a:['趣がある・おもしろい','悲しい','恐ろしい','眠い'],answer:0,e:'「をかし」は趣がある、興味深い、おもしろいなどの意味です。'},
  {id:'j15',subject:'japanese',unit:'kobun',difficulty:'標準',q:'「春はあけぼの」で知られる作品は？',a:['枕草子','徒然草','竹取物語','平家物語'],answer:0,e:'「春はあけぼの」は清少納言の『枕草子』です。'},
  {id:'j16',subject:'japanese',unit:'kobun',difficulty:'標準',q:'『枕草子』の作者は？',a:['清少納言','紫式部','紀貫之','兼好法師'],answer:0,e:'『枕草子』の作者は清少納言です。'},
  {id:'j17',subject:'japanese',unit:'reading',difficulty:'基礎',q:'文章の中心となる最も重要な考えを何という？',a:['中心主題','比喩','情景','修辞'],answer:0,e:'文章の中心となる考えや主張を中心主題と考えます。'},
  {id:'j18',subject:'japanese',unit:'reading',difficulty:'標準',q:'「まるで雪のように白い」は何の表現？',a:['直喩','隠喩','擬人法','反復'],answer:0,e:'「〜のように」「まるで〜」などを使う比喩が直喩です。'},
  {id:'j19',subject:'japanese',unit:'reading',difficulty:'標準',q:'人ではないものを人間のように表す表現は？',a:['擬人法','直喩','倒置法','体言止め'],answer:0,e:'人でないものに人間の性質や動作を与える表現を擬人法といいます。'},
  {id:'j20',subject:'japanese',unit:'reading',difficulty:'応用',q:'段落の最初に置かれ、段落の話題を示す文を何と考えることが多い？',a:['中心文','結論文','引用文','感想文'],answer:0,e:'段落の中心的な内容を示す文を中心文と呼ぶことがあります。'},

  // 数学
  {id:'m1',subject:'math',unit:'positive',difficulty:'基礎',q:'(-3)+5 の値は？',a:['2','-2','8','-8'],answer:0,e:'数直線で右に5進むので2です。'},
  {id:'m2',subject:'math',unit:'positive',difficulty:'基礎',q:'(-7)-(-4) の値は？',a:['-3','-11','3','11'],answer:0,e:'負の数を引くことは正の数を足すことなので、-7+4=-3です。'},
  {id:'m3',subject:'math',unit:'positive',difficulty:'基礎',q:'|-8| は？',a:['8','-8','0','16'],answer:0,e:'絶対値は0からの距離なので8です。'},
  {id:'m4',subject:'math',unit:'positive',difficulty:'標準',q:'(-2)×(-6) の値は？',a:['12','-12','8','-8'],answer:0,e:'負×負は正、2×6=12です。'},
  {id:'m5',subject:'math',unit:'positive',difficulty:'標準',q:'(-18)÷6 の値は？',a:['-3','3','-12','12'],answer:0,e:'負÷正は負で、18÷6=3です。'},
  {id:'m6',subject:'math',unit:'positive',difficulty:'応用',q:'a=-2,b=3のとき、|a|+b は？',a:['5','1','-1','-5'],answer:0,e:'|-2|=2なので2+3=5です。'},
  {id:'m7',subject:'math',unit:'expression',difficulty:'基礎',q:'3x+2x を簡単にすると？',a:['5x','6x','5x²','x+5'],answer:0,e:'同類項をまとめて3x+2x=5xです。'},
  {id:'m8',subject:'math',unit:'expression',difficulty:'基礎',q:'2(a+3) を展開すると？',a:['2a+6','2a+3','a+6','2a+9'],answer:0,e:'分配法則で2a+6です。'},
  {id:'m9',subject:'math',unit:'expression',difficulty:'標準',q:'5x-2-(2x+3) を簡単にすると？',a:['3x-5','3x+1','7x-5','7x+1'],answer:0,e:'かっこを外すと5x-2-2x-3=3x-5です。'},
  {id:'m10',subject:'math',unit:'expression',difficulty:'標準',q:'縦x cm、横4 cmの長方形の面積は？',a:['4x cm²','x+4 cm²','8x cm²','4+x cm²'],answer:0,e:'長方形の面積は縦×横なので4x cm²です。'},
  {id:'m11',subject:'math',unit:'equation',difficulty:'基礎',q:'x+5=12 の解は？',a:['7','17','-7','5'],answer:0,e:'両辺から5を引くとx=7です。'},
  {id:'m12',subject:'math',unit:'equation',difficulty:'基礎',q:'3x=21 の解は？',a:['7','18','24','3'],answer:0,e:'両辺を3で割るとx=7です。'},
  {id:'m13',subject:'math',unit:'equation',difficulty:'標準',q:'2x-3=9 の解は？',a:['6','3','12','-6'],answer:0,e:'2x=12なのでx=6です。'},
  {id:'m14',subject:'math',unit:'equation',difficulty:'標準',q:'5x+2=3x+10 の解は？',a:['4','6','-4','8'],answer:0,e:'2x=8よりx=4です。'},
  {id:'m15',subject:'math',unit:'equation',difficulty:'応用',q:'ある数xの3倍から4を引くと17。xは？',a:['7','5','9','11'],answer:0,e:'3x-4=17なので3x=21、x=7です。'},
  {id:'m16',subject:'math',unit:'proportion',difficulty:'基礎',q:'比例 y=3x でx=4のときyは？',a:['12','7','1','-12'],answer:0,e:'y=3×4=12です。'},
  {id:'m17',subject:'math',unit:'proportion',difficulty:'標準',q:'比例 y=-2x でx=5のときyは？',a:['-10','10','-7','7'],answer:0,e:'y=-2×5=-10です。'},
  {id:'m18',subject:'math',unit:'proportion',difficulty:'標準',q:'比例 y=ax でx=2,y=10。aは？',a:['5','8','12','20'],answer:0,e:'10=2aよりa=5です。'},
  {id:'m19',subject:'math',unit:'proportion',difficulty:'基礎',q:'反比例 y=12/x でx=3のときyは？',a:['4','9','36','-4'],answer:0,e:'12÷3=4です。'},
  {id:'m20',subject:'math',unit:'proportion',difficulty:'標準',q:'反比例 y=a/x でx=4,y=3。aは？',a:['12','7','1/12','-12'],answer:0,e:'xy=aなので4×3=12です。'},
  {id:'m21',subject:'math',unit:'geometry',difficulty:'基礎',q:'直線上の角の和は何度？',a:['180°','90°','360°','270°'],answer:0,e:'一直線上の角の和は180°です。'},
  {id:'m22',subject:'math',unit:'geometry',difficulty:'基礎',q:'三角形の内角の和は？',a:['180°','90°','270°','360°'],answer:0,e:'三角形の内角の和は180°です。'},
  {id:'m23',subject:'math',unit:'geometry',difficulty:'標準',q:'垂直な2直線がつくる角は？',a:['90°','45°','180°','360°'],answer:0,e:'垂直な2直線は90°で交わります。'},
  {id:'m24',subject:'math',unit:'geometry',difficulty:'標準',q:'半径5cmの円の直径は？',a:['10cm','5cm','2.5cm','25cm'],answer:0,e:'直径は半径の2倍なので10cmです。'},
  {id:'m25',subject:'math',unit:'space',difficulty:'基礎',q:'立方体の面の数は？',a:['6','4','8','12'],answer:0,e:'立方体には6つの正方形の面があります。'},
  {id:'m26',subject:'math',unit:'space',difficulty:'標準',q:'立方体の頂点の数は？',a:['8','6','12','4'],answer:0,e:'立方体の頂点は8個です。'},
  {id:'m27',subject:'math',unit:'statistics',difficulty:'基礎',q:'データ5,7,8の平均値は？',a:['20/3','6','7','8'],answer:0,e:'(5+7+8)÷3=20/3です。'},
  {id:'m28',subject:'math',unit:'statistics',difficulty:'標準',q:'データ2,3,3,5,8の中央値は？',a:['3','2','4','5'],answer:0,e:'小さい順に並べた中央の値は3です。'},

  // 理科
  {id:'s1',subject:'science',unit:'biology',difficulty:'基礎',q:'植物の根・茎・葉のうち、光合成を主に行う器官は？',a:['葉','根','茎','種子'],answer:0,e:'葉には葉緑体があり、光合成を主に行います。'},
  {id:'s2',subject:'science',unit:'biology',difficulty:'基礎',q:'植物が光合成で取り入れる気体は？',a:['二酸化炭素','酸素','窒素','水素'],answer:0,e:'光合成では二酸化炭素と水から養分をつくり、酸素を放出します。'},
  {id:'s3',subject:'science',unit:'biology',difficulty:'標準',q:'気孔が主に存在する器官は？',a:['葉','根','花粉','種子'],answer:0,e:'気孔は葉などにあり、気体の出入りを行います。'},
  {id:'s4',subject:'science',unit:'biology',difficulty:'標準',q:'被子植物で、子房の中にあるものは？',a:['胚珠','花粉','がく','やく'],answer:0,e:'被子植物では胚珠が子房の中にあります。'},
  {id:'s5',subject:'science',unit:'biology',difficulty:'標準',q:'単子葉類の葉脈として代表的なものは？',a:['平行脈','網状脈','放射脈','円形脈'],answer:0,e:'単子葉類には平行脈が多く見られます。'},
  {id:'s6',subject:'science',unit:'biology',difficulty:'標準',q:'双子葉類の根の特徴は？',a:['主根と側根','ひげ根','仮根だけ','根がない'],answer:0,e:'双子葉類では主根とそこから分かれる側根が見られます。'},
  {id:'s7',subject:'science',unit:'matter',difficulty:'基礎',q:'物体の質量を測る器具は？',a:['上皿てんびん','メスシリンダー','温度計','顕微鏡'],answer:0,e:'質量はてんびんで測ります。'},
  {id:'s8',subject:'science',unit:'matter',difficulty:'基礎',q:'液体の体積を測る器具は？',a:['メスシリンダー','てんびん','電流計','ばねばかり'],answer:0,e:'液体の体積はメスシリンダーで測ります。'},
  {id:'s9',subject:'science',unit:'matter',difficulty:'標準',q:'酸素の性質として正しいものは？',a:['物質を燃やす働きを助ける','水に非常によく溶ける','可燃性が非常に強い','無色でない'],answer:0,e:'酸素はものの燃焼を助ける気体です。'},
  {id:'s10',subject:'science',unit:'matter',difficulty:'標準',q:'二酸化炭素を石灰水に通すとどうなる？',a:['白くにごる','青くなる','赤くなる','変化しない'],answer:0,e:'二酸化炭素を石灰水に通すと炭酸カルシウムが生じ白くにごります。'},
  {id:'s11',subject:'science',unit:'matter',difficulty:'標準',q:'水の沸点は標準大気圧で何℃？',a:['100℃','0℃','50℃','212℃'],answer:0,e:'標準大気圧では水の沸点は100℃です。'},
  {id:'s12',subject:'science',unit:'matter',difficulty:'標準',q:'水の凝固点は？',a:['0℃','-100℃','50℃','100℃'],answer:0,e:'標準的な条件で水は0℃で凍ります。'},
  {id:'s13',subject:'science',unit:'force',difficulty:'基礎',q:'光は空気中でどのように進む？',a:['直進する','必ず曲がる','止まる','円を描く'],answer:0,e:'均一な媒質中では光は直進します。'},
  {id:'s14',subject:'science',unit:'force',difficulty:'基礎',q:'鏡で光がはね返る現象を何という？',a:['反射','屈折','散乱','蒸発'],answer:0,e:'光が物体の表面ではね返る現象を反射といいます。'},
  {id:'s15',subject:'science',unit:'force',difficulty:'標準',q:'空気から水へ光が進むとき、進む向きが変わる現象は？',a:['屈折','反射','凝結','拡散'],answer:0,e:'異なる物質の境界で光の進む向きが変わることを屈折といいます。'},
  {id:'s16',subject:'science',unit:'force',difficulty:'基礎',q:'音を伝えるものを何という？',a:['媒質','光源','磁石','電池'],answer:0,e:'音は空気や水、固体などの媒質を通して伝わります。'},
  {id:'s17',subject:'science',unit:'force',difficulty:'標準',q:'音の高さを決める主な要素は？',a:['振動数','振幅','速さ','距離'],answer:0,e:'振動数が大きいほど音は高く聞こえます。'},
  {id:'s18',subject:'science',unit:'force',difficulty:'基礎',q:'物体を動かすなど、力の大きさを測る器具は？',a:['ばねばかり','メスシリンダー','顕微鏡','温度計'],answer:0,e:'ばねばかりは力の大きさを測る器具です。'},
  {id:'s19',subject:'science',unit:'earth',difficulty:'基礎',q:'地震が発生した地下の場所を何という？',a:['震源','震央','断層面','火口'],answer:0,e:'地下で地震が発生した場所が震源です。'},
  {id:'s20',subject:'science',unit:'earth',difficulty:'基礎',q:'震源の真上の地表の地点は？',a:['震央','震源','火口','海溝'],answer:0,e:'震源の真上の地表の地点を震央といいます。'},
  {id:'s21',subject:'science',unit:'earth',difficulty:'標準',q:'地震による最初の小さな揺れを引き起こす波は？',a:['P波','S波','表面波','音波'],answer:0,e:'P波はS波より速く到達し、最初の小さな揺れを起こします。'},
  {id:'s22',subject:'science',unit:'earth',difficulty:'標準',q:'P波より遅く到着し、大きな揺れを起こすのは？',a:['S波','P波','光波','水面波'],answer:0,e:'S波はP波より遅く、主要動を起こします。'},

  // 社会
  {id:'so1',subject:'social',unit:'geography-japan',difficulty:'基礎',q:'日本列島を構成する大きな4島に含まれないものは？',a:['沖縄本島','北海道','本州','九州'],answer:0,e:'大きな4島は北海道・本州・四国・九州です。'},
  {id:'so2',subject:'social',unit:'geography-japan',difficulty:'基礎',q:'日本で最も面積が大きい都道府県は？',a:['北海道','岩手県','長野県','福島県'],answer:0,e:'北海道が最も広い都道府県です。'},
  {id:'so3',subject:'social',unit:'geography-japan',difficulty:'標準',q:'日本の国土で山地が占める割合はおよそ？',a:['約4分の3','約4分の1','約半分','約10分の1'],answer:0,e:'日本は国土の約4分の3が山地です。'},
  {id:'so4',subject:'social',unit:'geography-japan',difficulty:'標準',q:'日本で最も長い川は？',a:['信濃川','利根川','石狩川','北上川'],answer:0,e:'信濃川が日本最長の河川です。'},
  {id:'so5',subject:'social',unit:'geography-japan',difficulty:'標準',q:'日本の標準時の基準となる経線は？',a:['東経135度','東経120度','西経135度','東経150度'],answer:0,e:'兵庫県明石市付近を通る東経135度が日本の標準時の基準です。'},
  {id:'so6',subject:'social',unit:'geography-japan',difficulty:'基礎',q:'冬に日本海側で雪が多くなる主な理由は？',a:['季節風が日本海で水蒸気を含むから','太平洋から乾いた風が吹くから','赤道に近いから','台風だけが原因だから'],answer:0,e:'冬の季節風は日本海を通る間に水蒸気を含み、日本海側で雪を降らせます。'},
  {id:'so7',subject:'social',unit:'geography-world',difficulty:'基礎',q:'赤道が通る大陸はどれ？',a:['アフリカ・南アメリカ・アジア','ヨーロッパのみ','北アメリカのみ','オーストラリアのみ'],answer:0,e:'赤道はアフリカ、南アメリカ、アジアの一部を通ります。'},
  {id:'so8',subject:'social',unit:'geography-world',difficulty:'基礎',q:'世界で面積が最も大きい大陸は？',a:['ユーラシア大陸','アフリカ大陸','北アメリカ大陸','南アメリカ大陸'],answer:0,e:'ユーラシア大陸が最も大きい大陸です。'},
  {id:'so9',subject:'social',unit:'geography-world',difficulty:'標準',q:'一年中高温で雨が多い地域に見られる気候帯は？',a:['熱帯','乾燥帯','冷帯','寒帯'],answer:0,e:'熱帯は一年を通して高温で、降水量が多い地域が多いです。'},
  {id:'so10',subject:'social',unit:'geography-world',difficulty:'標準',q:'降水量が極端に少ない地域に見られる気候帯は？',a:['乾燥帯','熱帯','温帯','寒帯'],answer:0,e:'乾燥帯は降水量が少なく、砂漠などが広がります。'},
  {id:'so11',subject:'social',unit:'geography-world',difficulty:'標準',q:'地中海沿岸などで、夏に乾燥し冬に雨が多い気候は？',a:['地中海性気候','西岸海洋性気候','ツンドラ気候','サバナ気候'],answer:0,e:'地中海性気候は夏に乾燥し、冬に雨が多いのが特徴です。'},
  {id:'so12',subject:'social',unit:'geography-world',difficulty:'基礎',q:'世界で最も面積が大きい海洋は？',a:['太平洋','大西洋','インド洋','北極海'],answer:0,e:'太平洋が最も大きい海洋です。'},
  {id:'so13',subject:'social',unit:'history-ancient',difficulty:'基礎',q:'古代エジプト文明が栄えた川は？',a:['ナイル川','インダス川','黄河','メコン川'],answer:0,e:'古代エジプト文明はナイル川流域で栄えました。'},
  {id:'so14',subject:'social',unit:'history-ancient',difficulty:'基礎',q:'古代中国文明の中心となった代表的な川は？',a:['黄河','ナイル川','アマゾン川','ドナウ川'],answer:0,e:'黄河流域では古代文明が発達しました。'},
  {id:'so15',subject:'social',unit:'history-ancient',difficulty:'基礎',q:'日本で米づくりが広まった時代は？',a:['弥生時代','縄文時代','平安時代','鎌倉時代'],answer:0,e:'弥生時代には大陸から稲作が伝わり、広まりました。'},
  {id:'so16',subject:'social',unit:'history-ancient',difficulty:'標準',q:'古墳時代に大王を中心として成立した政治勢力は？',a:['ヤマト政権','鎌倉幕府','江戸幕府','室町幕府'],answer:0,e:'古墳時代にはヤマト政権が勢力を拡大しました。'},
  {id:'so17',subject:'social',unit:'history-ancient',difficulty:'標準',q:'聖徳太子が定めたとされる、役人の心構えを示したものは？',a:['十七条の憲法','御成敗式目','大宝律令','五箇条の御誓文'],answer:0,e:'603年に定められたとされる十七条の憲法です。'},
  {id:'so18',subject:'social',unit:'history-ancient',difficulty:'標準',q:'大化の改新でめざされた基本方針は？',a:['中央集権的な国家づくり','武士による幕府政治','鎖国','参勤交代'],answer:0,e:'豪族中心の政治から天皇中心の中央集権国家をめざしました。'},
  {id:'so19',subject:'social',unit:'history-medieval',difficulty:'基礎',q:'鎌倉幕府を開いた人物は？',a:['源頼朝','足利尊氏','徳川家康','平清盛'],answer:0,e:'源頼朝が鎌倉幕府を開きました。'},
  {id:'so20',subject:'social',unit:'history-medieval',difficulty:'標準',q:'武士の社会で、主君と家臣の結びつきを何と表現する？',a:['御恩と奉公','楽市楽座','参勤交代','班田収授'],answer:0,e:'将軍が御恩を与え、御家人が奉公で応える関係です。'},
  {id:'so21',subject:'social',unit:'history-medieval',difficulty:'標準',q:'鎌倉時代、元が日本に攻めてきた出来事を何という？',a:['元寇','応仁の乱','承久の乱','壬申の乱'],answer:0,e:'1274年と1281年の元による襲来を元寇といいます。'},
  {id:'so22',subject:'social',unit:'history-medieval',difficulty:'標準',q:'室町幕府を開いた人物は？',a:['足利尊氏','源頼朝','織田信長','徳川家康'],answer:0,e:'足利尊氏が室町幕府を開きました。'},

  // 英語
  {id:'e1',subject:'english',unit:'be',difficulty:'基礎',q:'「私は学生です。」に最も適切な英文は？',a:['I am a student.','I are a student.','I is a student.','I student am.'],answer:0,e:'主語Iにはbe動詞amを使います。'},
  {id:'e2',subject:'english',unit:'be',difficulty:'基礎',q:'「彼は元気です。」は？',a:['He is fine.','He am fine.','He are fine.','He fine is.'],answer:0,e:'主語Heにはisを使います。'},
  {id:'e3',subject:'english',unit:'be',difficulty:'標準',q:'「あなたたちは学生です。」は？',a:['You are students.','You is students.','You am students.','You students are.'],answer:0,e:'Youにはareを使います。'},
  {id:'e4',subject:'english',unit:'be',difficulty:'標準',q:'「私は先生ではありません。」は？',a:["I am not a teacher.","I is not a teacher.","I do not a teacher.","I not am a teacher."],answer:0,e:'be動詞の否定はbe動詞の後ろにnotを置きます。'},
  {id:'e5',subject:'english',unit:'be',difficulty:'標準',q:'「彼女はあなたの友達ですか。」は？',a:['Is she your friend?','Does she your friend?','Are she your friend?','She is your friend?'],answer:0,e:'be動詞の疑問文はbe動詞を主語の前に出します。'},
  {id:'e6',subject:'english',unit:'verb',difficulty:'基礎',q:'「私はテニスをします。」は？',a:['I play tennis.','I plays tennis.','I am play tennis.','I playing tennis.'],answer:0,e:'I + 一般動詞の原形で表します。'},
  {id:'e7',subject:'english',unit:'verb',difficulty:'基礎',q:'「彼らは英語を勉強します。」は？',a:['They study English.','They studies English.','They are study English.','They studying English.'],answer:0,e:'Theyには一般動詞の原形studyを使います。'},
  {id:'e8',subject:'english',unit:'verb',difficulty:'標準',q:'「私は毎日走ります。」は？',a:['I run every day.','I runs every day.','I am run every day.','I running every day.'],answer:0,e:'Iなのでrunの原形を使います。'},
  {id:'e9',subject:'english',unit:'question',difficulty:'基礎',q:'「あなたはサッカーをしますか。」は？',a:['Do you play soccer?','Are you play soccer?','Does you play soccer?','You do play soccer?'],answer:0,e:'一般動詞の疑問文はDo/Doesを文頭に置きます。'},
  {id:'e10',subject:'english',unit:'question',difficulty:'基礎',q:'「あなたは犬を飼っていません。」は？',a:["You do not have a dog.","You are not have a dog.","You does not have a dog.","You not have a dog."],answer:0,e:'Youの一般動詞否定はdo not + 動詞の原形です。'},
  {id:'e11',subject:'english',unit:'question',difficulty:'標準',q:'「彼は野球をしません。」は？',a:["He does not play baseball.","He do not play baseball.","He is not play baseball.","He does not plays baseball."],answer:0,e:'Heなのでdoes notを使い、その後ろはplayの原形です。'},
  {id:'e12',subject:'english',unit:'third',difficulty:'基礎',q:'「彼は毎日学校へ行きます。」は？',a:['He goes to school every day.','He go to school every day.','He going to school every day.','He is go to school every day.'],answer:0,e:'三人称単数現在ではgo→goesとなります。'},
  {id:'e13',subject:'english',unit:'third',difficulty:'基礎',q:'「彼女は英語を話します。」は？',a:['She speaks English.','She speak English.','She speaking English.','She is speak English.'],answer:0,e:'Sheなのでspeakに-sを付けます。'},
  {id:'e14',subject:'english',unit:'third',difficulty:'標準',q:'「Tom plays tennis.」の否定文は？',a:['Tom does not play tennis.','Tom do not play tennis.','Tom does not plays tennis.','Tom is not play tennis.'],answer:0,e:'三人称単数の否定はdoes not + 動詞の原形です。'},
  {id:'e15',subject:'english',unit:'third',difficulty:'標準',q:'「Ken plays soccer.」を疑問文にすると？',a:['Does Ken play soccer?','Do Ken play soccer?','Is Ken play soccer?','Does Ken plays soccer?'],answer:0,e:'三人称単数の疑問文はDoes + 主語 + 動詞原形です。'},
  {id:'e16',subject:'english',unit:'pronoun',difficulty:'基礎',q:'「これは私の本です。」は？',a:['This is my book.','This is me book.','This am my book.','This are my book.'],answer:0,e:'所有を表す「私の」はmyです。'},
  {id:'e17',subject:'english',unit:'pronoun',difficulty:'基礎',q:'「私は彼を知っています。」の「彼を」は？',a:['him','he','his','they'],answer:0,e:'目的格で「彼を」はhimです。'},
  {id:'e18',subject:'english',unit:'pronoun',difficulty:'標準',q:'「これは彼女のペンです。」は？',a:['This is her pen.','This is she pen.','This is hers pen.','This are her pen.'],answer:0,e:'名詞の前で「彼女の」はherです。'},
  {id:'e19',subject:'english',unit:'can',difficulty:'基礎',q:'「私は泳ぐことができます。」は？',a:['I can swim.','I can to swim.','I am can swim.','I can swims.'],answer:0,e:'canの後ろは動詞の原形です。'},
  {id:'e20',subject:'english',unit:'can',difficulty:'標準',q:'「ここで写真を撮ってはいけません。」に近い表現は？',a:["Don't take pictures here.","Doesn't take pictures here.","Not take pictures here.","Don't to take pictures here."],answer:0,e:'命令文の否定はDon’t + 動詞の原形です。'},
  {id:'e21',subject:'english',unit:'can',difficulty:'基礎',q:'「ドアを開けなさい。」は？',a:['Open the door.','Opens the door.','Opening the door.','Do open the door?'],answer:0,e:'命令文は動詞の原形から始めます。'},
  {id:'e22',subject:'english',unit:'vocabulary',difficulty:'基礎',q:'「library」の意味は？',a:['図書館','病院','駅','体育館'],answer:0,e:'libraryは「図書館」です。'},
  {id:'e23',subject:'english',unit:'vocabulary',difficulty:'基礎',q:'「usually」の意味は？',a:['たいてい・ふつうは','決して〜ない','今すぐ','ときどき'],answer:0,e:'usuallyは「たいてい、ふつうは」です。'},
  {id:'e24',subject:'english',unit:'vocabulary',difficulty:'標準',q:'「favorite」の意味は？',a:['お気に入りの','難しい','新しい','静かな'],answer:0,e:'favoriteは「お気に入りの」という意味です。'}
];

window.QUIZ_DATA = QUIZ_DATA;
window.QUESTIONS = QUESTIONS;
