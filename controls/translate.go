package controls

import "github.com/mugomes/mglang"

func LoadTranslations() {
	lang := mglang.GetLang()
	switch lang {
	case "pt":
		mglang.Set("About", "Sobre")
		mglang.Set("Check Update", "Verificar Atualização")
		mglang.Set("Support MiTranslate", "Apoie MiTranslate")
		mglang.Set("About MiTranslate", "Sobre MiTranslate")
		mglang.Set("Language", "Idioma")
		mglang.Set("Translate to", "Traduzir para")
		mglang.Set("Translate", "Traduzir")
		mglang.Set("Switch", "Alternar")
	}
}

func T(key string, args ...interface{}) string {
	return mglang.T(key, args...)
}
