function carregarIdioma(campo) {
    const idiomas = `
af-Afrikaans
sq-Albanian
am-Amharic
ar-Arabic
hy-Armenian
as-Assamese
ay-Aymara
az-Azerbaijani
bm-Bambara
ba-Bashkir
eu-Basque
be-Belarusian
bn-Bengali
bho-Bhojpuri
bs-Bosnian
bg-Bulgarian
yue-Cantonese
ca-Catalan
ceb-Cebuano
ny-Chichewa
lzh-Chinese (Literary)
zh-CN-Chinese (Simplified)
zh-TW-Chinese (Traditional)
cv-Chuvash
co-Corsican
hr-Croatian
cs-Czech
da-Danish
prs-Dari
dv-Dhivehi
doi-Dogri
nl-Dutch
mhr-Eastern Mari
en-English
eo-Esperanto
et-Estonian
ee-Ewe
fo-Faroese
fj-Fijian
tl-Filipino
fi-Finnish
fr-French
fr-CA-French (Canadian)
fy-Frisian
gl-Galician
ka-Georgian
de-German
el-Greek
gn-Guarani
gu-Gujarati
ht-Haitian Creole
ha-Hausa
haw-Hawaiian
he-Hebrew
mrj-Hill Mari
hi-Hindi
hmn-Hmong
hu-Hungarian
is-Icelandic
ig-Igbo
ilo-Ilocano
id-Indonesian
ikt-Inuinnaqtun
iu-Inuktitut
iu-Latn-Inuktitut (Latin)
ga-Irish
it-Italian
ja-Japanese
jv-Javanese
kn-Kannada
kk-Kazakh
km-Khmer
rw-Kinyarwanda
tlh-Latn-Klingon
gom-Konkani
ko-Korean
kri-Krio
ckb-Kurdish (Central)
ku-Kurdish (Northern)
ky-Kyrgyz
lo-Lao
la-Latin
lv-Latvian
ln-Lingala
lt-Lithuanian
lg-Luganda
lb-Luxembourgish
mk-Macedonian
mai-Maithili
mg-Malagasy
ms-Malay
ml-Malayalam
mt-Maltese
mi-Maori
mr-Marathi
mni-Mtei-Meiteilon
lus-Mizo
mn-Mongolian
mn-Mong-Mongolian (Traditional)
my-Myanmar
ne-Nepali
no-Norwegian
or-Odia
om-Oromo
pap-Papiamento
ps-Pashto
fa-Persian
pl-Polish
pt-BR-Portuguese (Brazilian)
pt-PT-Portuguese (European)
pa-Punjabi
qu-Quechua
otq-Querétaro Otomi
ro-Romanian
ru-Russian
sm-Samoan
sa-Sanskrit
gd-Scots Gaelic
nso-Sepedi
sr-Cyrl-Serbian (Cyrillic)
sr-Latn-Serbian (Latin)
st-Sesotho
sn-Shona
sd-Sindhi
si-Sinhala
sk-Slovak
sl-Slovenian
so-Somali
es-Spanish
su-Sundanese
sw-Swahili
sv-Swedish
ty-Tahitian
tg-Tajik
ta-Tamil
tt-Tatar
te-Telugu
th-Thai
bo-Tibetan
ti-Tigrinya
to-Tongan
ts-Tsonga
tr-Turkish
tk-Turkmen
tw-Twi
udm-Udmurt
uk-Ukrainian
hsb-Upper Sorbian
ur-Urdu
ug-Uyghur
uz-Uzbek
vi-Vietnamese
cy-Welsh
xh-Xhosa
sah-Yakut
yi-Yiddish
yo-Yoruba
yua-Yucatec Maya
zu-Zulu
  `.trim().split('\n');

    idiomas.forEach(idioma => {
        const option = document.createElement('option');
        const parts = idioma.split('-');

        let value;
        if (parts.length > 2) {
            value = parts.slice(0, parts.length - 1).join('-'); // pt-BR, zh-CN, etc.
        } else {
            value = parts[0]; // af, sq, etc.
        }

        option.value = value;
        option.textContent = idioma;
        document.getElementById(campo).appendChild(option);
    });
}

carregarIdioma('cboIdioma');

document.getElementById('cboTraduzir').innerHTML = document.getElementById('cboIdioma').innerHTML