from pathlib import Path
import argparse,re,json
R=Path(__file__).resolve().parents[1]; I=R/'index.html'; A=R/'assets'; M=A/'menu-art'; Q=R/'artifacts/ui-visual-qa'
S='/* VISUAL POLISH ROUND 2026-09-24 */'; E='/* END VISUAL POLISH ROUND 2026-09-24 */'
def svg(body): return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 120"><defs><filter id="s"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#5b3927" flood-opacity=".14"/></filter></defs><rect x="2" y="2" width="176" height="116" rx="24" fill="#fff3e7"/><ellipse cx="90" cy="75" rx="62" ry="30" fill="#f7efe5" stroke="#c9ae98" stroke-width="2"/>{body}</svg>'
def meat(c,d,n=4):
 p=[(60,70,-15),(86,59,8),(112,70,17),(88,82,-5)][:n];return ''.join(f'<g transform="translate({x} {y}) rotate({r})"><rect x="-18" y="-8" width="36" height="16" rx="8" fill="{c}" stroke="{d}"/><path d="M-10 -3C-2 2 4-3 11 4" fill="none" stroke="#ffe3da" stroke-width="2"/></g>' for x,y,r in p)
def assets():
 M.mkdir(parents=True,exist_ok=True)
 arts={
 'set-seafood':svg(meat('#df8d8d','#b75e62',3)+'<path d="M37 76c10-16 25-13 30 0M118 76c10-16 25-13 29 0" fill="none" stroke="#e28d61" stroke-width="6" stroke-linecap="round"/>'),
 'set-beef':svg(meat('#b95149','#84382f')),
 'set-pork':svg(meat('#e69a98','#c66f72')),
 'set-pork-single':svg(meat('#e69a98','#c66f72',2)+'<circle cx="90" cy="43" r="9" fill="#f2cf72"/>'),
 'pork':svg(meat('#e69a98','#c66f72',3)),
 'beef':svg(meat('#b95149','#84382f',3)),
 'seafood':svg('<path d="M48 73c12-18 29-13 34 2M96 72c12-18 29-13 34 2" fill="none" stroke="#df8b60" stroke-width="7" stroke-linecap="round"/><path d="M77 88c8-12 22-12 29 0-7 8-23 8-29 0z" fill="#fff7ee" stroke="#b9a18d"/>'),
 'greens':svg('<g fill="#78905d"><ellipse cx="58" cy="68" rx="22" ry="9" transform="rotate(-24 58 68)"/><ellipse cx="92" cy="58" rx="25" ry="10"/><ellipse cx="121" cy="75" rx="22" ry="9" transform="rotate(22 121 75)"/><ellipse cx="87" cy="84" rx="25" ry="10"/></g>'),
 'noodles':svg('<g fill="none" stroke="#efc85f" stroke-width="5" stroke-linecap="round"><path d="M48 66c15-14 22 13 36 0s22 13 35 0"/><path d="M51 78c14-12 21 11 34 0s23 11 34 0"/></g>'),
 'ready-pot':svg('<path d="M48 58h84l-9 40c-2 10-12 15-24 15H81c-12 0-22-5-24-15z" fill="#4b382f"/><ellipse cx="90" cy="59" rx="42" ry="14" fill="#b87942"/><circle cx="70" cy="58" r="8" fill="#e69a98"/><circle cx="98" cy="60" r="8" fill="#f0d498"/><path d="M72 36c-8-9 8-12 0-21M94 36c-8-9 8-12 0-21M116 36c-8-9 8-12 0-21" fill="none" stroke="#8d6b59" stroke-width="3"/>'),
 'fried':svg('<g fill="#e3a64d" stroke="#bd7e33" stroke-width="2"><rect x="49" y="61" width="34" height="20" rx="8" transform="rotate(-10 66 71)"/><rect x="80" y="54" width="34" height="20" rx="8"/><rect x="104" y="72" width="31" height="18" rx="8" transform="rotate(12 120 81)"/></g>'),
 'dessert':svg('<circle cx="66" cy="70" r="15" fill="#efa7a8"/><circle cx="94" cy="61" r="16" fill="#fff0d7" stroke="#dabd96"/><circle cx="117" cy="82" r="14" fill="#dda0a0"/>')}
 for n,x in arts.items():(M/f'{n}.svg').write_text(x+'\n',encoding='utf8')
 (A/'accessory-glasses.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 80"><g fill="none" stroke="#5d3d31" stroke-width="6" stroke-linecap="round"><ellipse cx="51" cy="40" rx="32" ry="24"/><ellipse cx="129" cy="40" rx="32" ry="24"/><path d="M83 35c5-4 10-4 14 0M19 31L4 25M161 31l15-6"/></g><path d="M30 25c10-7 23-7 33-2" fill="none" stroke="#fff7ef" stroke-width="3" opacity=".8"/></svg>\n',encoding='utf8')
 (A/'accessory-white-backpack.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 230"><path d="M57 49c9-27 41-33 61-9 8 10 11 21 11 35" fill="none" stroke="#fbfaf7" stroke-width="18" stroke-linecap="round"/><path d="M44 68c9-17 25-25 45-25 29 0 49 16 53 43l10 79c3 26-15 46-41 48l-35 2c-28 2-48-17-49-45l-2-62c0-17 6-30 19-40z" fill="#fbfaf7" stroke="#8d6b59" stroke-width="4"/><rect x="57" y="129" width="70" height="49" rx="17" fill="#f1ece6" stroke="#bca89a" stroke-width="3"/></svg>\n',encoding='utf8')
 (A/'accessory-gray-fullface-helmet.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 175"><path d="M27 99c0-48 33-83 81-83 45 0 76 30 82 70 4 26-3 52-19 71H86c-39 0-59-20-59-58z" fill="#747b7f" stroke="#454b4e" stroke-width="5"/><path d="M48 58c29-27 87-29 119 1-9 31-31 48-69 50-30 2-48-12-50-51z" fill="#263139" stroke="#171e22" stroke-width="4"/><path d="M57 62c27-15 70-17 95-2-12 10-27 17-46 20-21 3-37-1-49-18z" fill="#99a8ae" opacity=".35"/><path d="M84 111h79c-2 18-9 33-23 44H91c-10-11-13-25-7-44z" fill="#565d61" stroke="#41474a" stroke-width="4"/></svg>\n',encoding='utf8')
def css():return r'''/* VISUAL POLISH ROUND 2026-09-24 */
#decor-layer{position:static!important;inset:auto!important;width:0!important;height:0!important;overflow:visible!important;z-index:auto!important;pointer-events:none!important}#app-shell{position:relative!important;z-index:auto!important}.decor-person{position:fixed!important;z-index:12!important;pointer-events:none!important;background-repeat:no-repeat!important;background-position:center!important;background-size:contain!important;mix-blend-mode:normal!important;filter:saturate(1.02) contrast(1.01) drop-shadow(0 10px 16px rgba(74,50,38,.1))!important}.hero,.menu-card,.category-title{position:relative!important;z-index:auto!important;isolation:auto!important}.hero-row,.menu-card>span,.menu-card:before,.category-title>*{position:relative!important;z-index:24!important}.decor-person:before,.decor-person:after{content:"";position:absolute;display:block;pointer-events:none;background-repeat:no-repeat;background-position:center;background-size:contain}.decor-a:after{width:44%;height:23%;left:36%;top:24%;background-image:url('assets/accessory-glasses.svg');transform:rotate(-4deg)}.decor-c:after{width:57%;height:58%;right:-7%;top:29%;background-image:url('assets/accessory-white-backpack.svg');transform:rotate(3deg)}.decor-b:before{width:58%;height:45%;left:49%;top:59%;border-radius:50%;background:radial-gradient(circle,rgba(255,248,239,.99) 0 58%,rgba(255,248,239,.84) 70%,transparent 75%)}.decor-b:after{width:60%;height:53%;left:48%;top:54%;background-image:url('assets/accessory-gray-fullface-helmet.svg');transform:rotate(-4deg)}
.menu-card{--menu-art:url('assets/menu-art/ready-pot.svg')}.menu-card[data-menu*="à¸«à¸¡à¸¹"]{--menu-art:url('assets/menu-art/pork.svg')}.menu-card[data-menu*="à¹€à¸™à¸·à¹‰à¸­"]{--menu-art:url('assets/menu-art/beef.svg')}.menu-card[data-menu="à¸›à¸¥à¸²à¸”à¸­à¸¥à¸¥à¸µà¹ˆ"],.menu-card[data-menu="à¸à¸¸à¹‰à¸‡"],.menu-card[data-menu="à¸›à¸¥à¸²à¸«à¸¡à¸¶à¸"],.menu-card[data-menu="à¸„à¸²à¸¥à¸²à¸¡à¸²à¸£à¸µ"]{--menu-art:url('assets/menu-art/seafood.svg')}.menu-card[data-menu*="à¸œà¸±à¸"],.menu-card[data-menu="à¸à¸°à¸«à¸¥à¹ˆà¸³à¸›à¸¥à¸µ"],.menu-card[data-menu="à¸œà¸±à¸à¸šà¸¸à¹‰à¸‡"],.menu-card[data-menu="à¸œà¸±à¸à¸Šà¸µà¸à¸£à¸±à¹ˆà¸‡"],¹µ•¹Ôµ…É‘m‘…Ñ„µµ•¹Ôô‹‚æ‚â¯‚â‚âÃ‚â{‚âÈ‰t°¹µ•¹Ôµ…É‘m‘…Ñ„µµ•¹Ôô‹‚æ‚â«‚æ'‚âg‚â·‚âã‚âS‚æ#‚â‰uì´µµ•¹Ôµ…ÉĞéÕÉ° …ÍÍ•ÑÌ½µ•¹Ôµ…ÉĞ½É••¹Ì¹ÍÙœœ¥ô¹µ•¹Ôµ…É‘m‘…Ñ„µµ•¹Ôô‹‚âŸ‚âã‚æ'‚âg‚æ‚â«‚æ'‚âg‚â‚æ'‚âË‚âh‰t°¹µ•¹Ôµ…É‘m‘…Ñ„µµ•¹Ôô‹‚â‡‚âË‚â‡‚æ#‚âÈ‰t°¹µ•¹Ôµ…É‘m‘…Ñ„µµ•¹Ôô‹‚â¯‚â‡‚â×‚æ#‚â¯‚â‹‚â£Š®‰B’%ÒÂæÖVçRÖ6&E¶FFÖÖVçSÒ.˜Š®˜‰ŠŞ‹‰N˜ˆr'^ËK[Y[KX\\›
	Ø\ÜÙ]ËÛY[KX\Û›ÛÙ\Ëœİ™ÉÊ_K›Y[KXØ\™Ù]K[Y[OH¸.a8. x.b8.!x.b8.*¸.%—K›Y[KXØ\™Ù]K[Y[OH¸.`x.+¸."¸.&¸.(ø.,¸.)ø.&x.c8.`8.%8.`8.%8.+x.(ø.c8.%ø.+x.%H.*¸.c—K›Y[KXØ\™Ù]K[Y[OH¸. ¸.bx.,¸.)ø.`8. x.(ø.-x.(¸.&¸.&ø.)x.,ˆ—^ËK[Y[KX\\›
	Ø\ÜÙ]ËÛY[KX\ÙœšYYœİ™ÉÊ_K›Y[KXØ\™Ù]K[Y[OH¸."ø.,¸.`¸.(x."ø.b8.,¸. x.)x.bx.)È—K›Y[KXØ\™Ù]K[Y[OH¸.*¸.)x.,8.)x.+x.(¸.`x. x.bx.)È—K›Y[KXØ\™Ù]K[Y[OH¸.)x..x. x.%ø.,¸.)x.)x.+x.(¸.`x. x.bx.)È—K›Y[KXØ\™Ù]K[Y[OH¸.`¸.(x."8.-8.a8.+x.*8.!8.(ø.-x.(H—^ËK[Y[KX\\›
	Ø\ÜÙ]ËÛY[KX\Ù\ÜÙ\œİ™ÉÊ_K›Y[KXØ\™Ù]K[Y[OH¸."¸..8.%8."8..8.bx.+x.*ø.(x..x.%ø.,8.`8.)x.`—^ËK[Y[KX\\›
	Ø\ÜÙ]ËÛY[KX\ÜÙ]\ÙXY›ÛÙœİ™ÉÊ_K›Y[KXØ\™Ù]K[Y[OH¸."¸..8.%8."8..8.bx.`8.&x.-ø.bx.+H—^ËK[Y[KX\\›
	Ø\ÜÙ]ËÛY[KX\ÜÙ]X™YY‹œİ™ÉÊ_K›Y[KXØ\™Ù]K[Y[OH¸."¸..8.%8."8..8.bx.*ø.(x..H—^ËK[Y[KX\\›
	Ø\ÜÙ]ËÛY[KX\ÜÙ]\ÜšËœİ™ÉÊ_K›Y[KXØ\™Ù]K[Y[OH¸."¸..8.%8."8..8.bx.`8.%8.-x.b8.(¸.*x.(x..H—^ËK[Y[KX\\›
	Ø\ÜÙ]ËÛY[KX\ÜÙ]\ÜšË\Ú[™ÛKœİ™ÉÊ_K›Y[KXØ\™˜™Y›Ü™^ØÛÛ[ˆˆˆZ[\Ü[Ø˜XÚÙÜ›İ[™Z[XYÙN˜\ŠK[Y[KX\
HZ[\Ü[Ø˜XÚÙÜ›İ[™\Ú^™N˜Ûİ™\ˆZ[\Ü[Ø˜XÚÙÜ›İ[™\ÜÚ][Û˜Ù[\ˆZ[\Ü[Ø˜XÚÙÜ›İ[™\™\X]››Ë\™\X]Z[\Ü[ØÛÛÜ˜[œÜ\™[Z[\Ü[Ûİ™\™›İÎšY[ˆZ[\Ü[BYYXJX^]ÚYÍÜ
^Ë™XÛÜ‹X^İÚYŒNZ[\Ü[ÚZYÚŒNLÜZ[\Ü[ÛY‹LÌ\Z[\Ü[İÜ›X^
ÌØ[Ê[ŠØY™KX\™XKZ[œÙ]]Ü
H
ÈLœ
JHZ[\Ü[Ø›İÛN˜]]ÈZ[\Ü[K™XÛÜ‹XİÚYŒNZ[\Ü[ÚZYÚŒMÍ\Z[\Ü[ÛY‹LÌ\Z[\Ü[İÜ˜]]ÈZ[\Ü[Ø›İÛN›X^
MØ[Ê[ŠØY™KX\™XKZ[œÙ]X›İÛJHHœ
JHZ[\Ü[K™XÛÜ‹XŞİÚYŒMÌZ[\Ü[ÚZYÚŒÌZ[\Ü[ÜšYÚ‹LÎZ[\Ü[İÜ˜]]ÈZ[\Ü[Ø›İÛN›X^
NØ[Ê[ŠØY™KX\™XKZ[œÙ]X›İÛJHHL
JHZ[\Ü[HØ\\Ú[ÜY[™ËX›İÛN˜Ø[ÊLLœ
È[ŠØY™KX\™XKZ[œÙ]X›İÛJJHZ[\Ü[_PYYXJZ[‹]ÚYÍ
H[™
X^]ÚYŒLŒÜ
^Ë™XÛÜ‹X^İÚYŒŒœZ[\Ü[ÚZYÚŒŒÍÜZ[\Ü[ÛY‹LÌZ[\Ü[İÜ›X^
œØ[Ê[ŠØY™KX\™XKZ[œÙ]]Ü
H
ÈMœ
JHZ[\Ü[Ø›İÛN˜]]ÈZ[\Ü[K™XÛÜ‹XİÚYŒŒÎZ[\Ü[ÚZYÚŒŒŒœZ[\Ü[ÛY‹LÌZ[\Ü[İÜ˜]]ÈZ[\Ü[Ø›İÛNŒZ[\Ü[K™XÛÜ‹XŞİÚYŒŒNZ[\Ü[ÚZYÚM\Z[\Ü[ÜšYÚ‹LZ[\Ü[İÜ˜]]ÈZ[\Ü[Ø›İÛN‹LÜZ[\Ü[_PYYXJZ[‹]ÚYŒL
^Ë™XÛÜ‹X^İÚYŒNZ[\Ü[ÚZYÚŒÌZ[\Ü[ÛY›X^
Ø[ÊLÈHŒŒ
JHZ[\Ü[İÜ›X^
ÍØ[Ê[ŠØY™KX\™XKZ[œÙ]]Ü
H
ÈN
JHZ[\Ü[Ø›İÛN˜]]ÈZ[\Ü[K™XÛÜ‹XİÚYŒLZ[\Ü[ÚZYÚŒŒÌÜZ[\Ü[ÛY›X^
œØ[ÊLÈHŒŒ
JHZ[\Ü[İÜ˜]]ÈZ[\Ü[Ø›İÛN‹MZ[\Ü[K™XÛÜ‹XŞİÚYŒŒÎZ[\Ü[ÚZYÚMZ[\Ü[ÜšYÚ›X^
Ø[ÊLÈHŒŒ
JHZ[\Ü[İÜ˜]]ÈZ[\Ü[Ø›İÛN‹NZ[\Ü[_B‹ÊˆS‘’TÕPSÓTÒ“ÕS‘Œ‹LKL
‹ÉÉÂ™Yˆ\J
N‚ˆRKœ™XYİ^
[˜ÛÙ[™ÏIİ]	ÊNÚ\™KœİXŠ™K™\ØØ\JÊJÜ‰ËŠÉÊÜ™K™\ØØ\JJJÜ‰×Ê‰Ë	ÉË›YÜÏ\™K”ÊNÚZœ™\XÙJ	ÏÜİ[O‰ËÜÜÊ
JÉ×Üİ[O‰ËJNÒKÜš]Wİ^
[˜ÛÙ[™ÏIİ]	ÊNØ\ÜÙ]Ê
B™Yˆ^˜Xİ

N‚ˆRKœ™XYİ^
[˜ÛÙ[™ÏIİ]	ÊNŞVŞˆ›Üˆˆ[ˆ™K™š[™[
‰ÏØÜš\
Î—Ö×—JŠOÏŠŠÊOÜØÜš\‰Ë™K”ß™K’JHYˆ‹œİš\

WNÔ]

KÜš]Wİ^
	×‰Ëš›Ú[Š
K[˜ÛÙ[™ÏIİ]	ÊB™YˆXJ
N‚ˆœ›ÛH^]ÜšYÚœŞ[˜×Ø\H[\ÜŞ[˜×Ü^]ÜšYÚˆK›ZÙ\Š\™[ÏUYK^\İÛÚÏUYJNÈ™XÚ\OJ‹ÉÜ™XÚ\WÛX\İ\‹šœÛÛ‰ÊKœ™XYİ^
[˜ÛÙ[™ÏIİ]	ÊNÈİ]V×BˆÚ]Ş[˜×Ü^]ÜšYÚ

H\È‚ˆ›Üˆ›ˆ[ˆ
	ØÚ›ÛZ][IË	İÙXšÚ]	ÊN‚ˆYÙ]]Š›ŠK›][˜Ú

Bˆ›ÜˆËˆ[ˆ

ÎL	Ú\Û™IÊK
ŒLN	Ú\Y\	ÊK
LNŒ	Ú\Y[	ÊJN‚ˆÏX‹›™]×ØÛÛ^
šY]ÜÜ^ÉİÚY	ÎË	ÚZYÚ	ÎšJNÜÏXË›™]×ÜYÙJ
NÜËœ›İ]J	ÊŠ‹Ü™XÚ\WÛX\İ\‹šœÛÛİJ‰Ë[X™Hœ‹™[š[
İ]\ÏLŒÛÛ[İ\OIØ\XØ][Û‹ÚœÛÛ‰Ë›ÙO\™XÚ\JJNÜË™ÛİÊ	Ú‹ËÌLËŒŒŒNÚ[™^š[	ÊNÜË›ØØ]ÜŠ	Ë›Y[KXØ\™	ÊK™š\œİØZ]Ù›ÜŠ
Bˆİ\Ë™]˜[X]JˆˆŠ
OOÛ]YØİ[Y[™Øİ[Y[[[Y[OYØİ[Y[œ]Y\TÙ[XİÜŠ	Ë™XÛÜ‹XIÊKÜÏ^O™Ù]ÛÛ\]Yİ[J
K\ÏVË‹‹™Øİ[Y[œ]Y\TÙ[XİÜ[
	Ë›Y[KXØ\™	ÊWKœÛXÙJ
K›X\
O™Ù]ÛÛ\]Yİ[J	Î˜™Y›Ü™IÊK˜˜XÚÙÜ›İ[™[XYÙJNÜ™]\›Ûİ™\™›İÎ™œØÜ›ÛÚYZ[›™\•ÚY
ÌKš^Y˜ÜÊJKœÜÚ][ÛOOIÙš^Y	ËN˜ÜÊJKœÚ[\‘]™[ÏOOIÛ›Û™IË\İ[˜İ›™]ÈÙ]
\ÊKœÚ^™OOOM\˜\ÖÌ__HˆˆŠNØ\ÜÙ\[

İÉÛİ™\™›İÉ×KİÉÙš^Y	×KİÉÜI×KİÉÙ\İ[˜İ	×JJH[™	ÜÙ]\ÙXY›ÛÙœİ™ÉÈ[ˆİÉØ\	×BˆO\Ë›ØØ]ÜŠ	Ë™XÛÜ‹XIÊK˜›İ[™[™×Ø›Ş

VÉŞI×NÜË™]˜[X]J	ÜØÜ›ÛÊL
IÊNÜËØZ]Ù›Ü—İ[Y[İ]
Œ
NØ\ÜÙ\XœÊË›ØØ]ÜŠ	Ë™XÛÜ‹XIÊK˜›İ[™[™×Ø›Ş

VÉŞI×K^JOÎÜË™]˜[X]J	ÜØÜ›ÛÊ
IÊBˆË›ØØ]ÜŠ	Ë›Y[KXØ\™	ÊK™š\œİ˜ÛXÚÊ
NÜË›ØØ]ÜŠ	ÈØØ[İ[]Ü“[Ù[	ÊKØZ]Ù›ÜŠ
NÜË›ØØ]ÜŠ	Ë™^ÛYKX‰ÊK™š\œİ˜ÛXÚÊ
NÜË›ØØ]ÜŠ	Ëœ™\XÙ[Y[]šYÙÙ\‰ÊK™š\œİØZ]Ù›ÜŠ
NÜË›ØØ]ÜŠ	ÈØÛÜÙPØ[İ[]Ü]Û‰ÊK˜ÛXÚÊ
NÜË›ØØ]ÜŠ	ÈÛX[˜YÙ\]Û‰ÊK˜ÛXÚÊ
NÜË›ØØ]ÜŠ	ÈÜ[’[œ]	ÊK™š[
	ÌŒÌÎ	ÊNÜË›ØØ]ÜŠ	Èİ™\šYT[]Û‰ÊK˜ÛXÚÊ
NÜË›ØØ]ÜŠ	ÈÛX]š^[Ù[	ÊKØZ]Ù›ÜŠ
NÜØÏ\Ë™]˜[X]JˆˆŠ
OOÛ]YØİ[Y[™Ù][[Y[RY
	İX›PÛÛZ[™\‰ÊNİœØÜ›ÛYLŒÜ™]\›–İœØÜ›ÛÚY˜ÛY[ÚYœØÜ›ÛYØİ[Y[™Øİ[Y[[[Y[œØÜ›ÛÚYZ[›™\•ÚY
ÌW_HˆˆŠNØ\ÜÙ\ØÖÌH[™ØÖÌWOŒ[™ØÖÌ—NÜË›ØØ]ÜŠ	ÈØÛÜÙSX]š^]Û‰ÊK˜ÛXÚÊ
BˆYˆOIÚ\Y\	ÎœË™]˜[X]JÚ[™İË—×ÜLHŠNÜËœÙ]İšY]ÜÜÜÚ^™JÉİÚY	ÎŒLN	ÚZYÚ	ÎŒJNÜËØZ]Ù›Ü—İ[Y[İ]

NØ\ÜÙ\Ë™]˜[X]J	İÚ[™İË—×ÜOOLH	‰ˆØİ[Y[™Øİ[Y[[[Y[œØÜ›ÛÚYZ[›™\•ÚY
ÌIÊNÜËœÙ]İšY]ÜÜÜÚ^™JÉİÚY	ÎŒ	ÚZYÚ	ÎŒLNJBˆËœØÜ™Y[œÚİ
]\İŠKÙ‰ŞØ›ŸK^ÛŸKœ™ÉÊJNÛİ]˜\[™
ÉØœ›İÜÙ\‰Î˜›‹	İšY]ÜÜ	Î™‰Şİß^ÚIË
Šœİ	ÛX]š^ØÜ›Û	ÎœØÖÌW_JNØË˜ÛÜÙJ
Bˆ‹˜ÛÜÙJ
Bˆ
KÉÜ™\İ[ËšœÛÛ‰ÊKÜš]Wİ^
œÛÛ‹™[\Êİ][œİ\™WØ\ØÚZOQ˜[ÙK[™[LŠK[˜ÛÙ[™ÏIİ]	ÊNÜš[
œÛÛ‹™[\Êİ][œİ\™WØ\ØÚZOQ˜[ÙK[™[LŠJBšYˆ×Û˜[YW×ÏOI××ÛXZ[—×ÉÎ‚ˆX\™Ü\œÙK\™İ[Y[\œÙ\Š
NÜ˜YØ\™İ[Y[
	Û[ÙIÊNÜ˜YØ\™İ[Y[
	Ø\™ÉË˜\™ÜÏIÏÉÊNØO\œ\œÙWØ\™ÜÊ
NØ\J
HYˆK›[ÙOOIØ\IÈ[ÙH^˜Xİ
K˜\™ÊHYˆK›[ÙOOIÙ^˜XİZœÉÈ[ÙHXJ
B