// Copyright (C) 2024-2026 Murilo Gomes Julio
// SPDX-License-Identifier: GPL-2.0-only

// Site: https://mugomes.github.io

package main

import (
	"log"
	"net/url"
	"os/exec"
	"strings"

	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/app"
	"fyne.io/fyne/v2/container"
	"fyne.io/fyne/v2/widget"

	"github.com/mugomes/mgsmartflow"

	c "mugomes/mitranslate/controls"
)

const VERSION_APP string = "3.0.0"

func main() {
	c.LoadTranslations()
	
	app := app.NewWithID("br.com.mugomes.mitranslate")
	app.Settings().SetTheme(&myDarkTheme{})

	window := app.NewWindow("MiTranslate")
	window.SetFixedSize(true)
	window.CenterOnScreen()
	window.Resize(fyne.NewSize(800, 374))

	mnuAbout := fyne.NewMenu(c.T("About"),
		fyne.NewMenuItem(c.T("Check Update"), func() {
			url, _ := url.Parse("https://github.com/mugomes/mitranslate/releases")
			app.OpenURL(url)
		}),
		fyne.NewMenuItemSeparator(),
		fyne.NewMenuItem(c.T("Support MiTranslate"), func() {
			url, _ := url.Parse("https://mugomes.github.io/apoie.html")
			app.OpenURL(url)
		}),
		fyne.NewMenuItemSeparator(),
		fyne.NewMenuItem(c.T("About MiTranslate"), func() {
			showAbout(app)
		}),
	)

	window.SetMainMenu(fyne.NewMainMenu(mnuAbout))

	flow := mgsmartflow.New()

	lblIdioma := widget.NewLabel(c.T("Language"))
	lblIdioma.TextStyle = fyne.TextStyle{Bold: true}
	cboIdioma := widget.NewSelect(listIdiomas, nil)
	cboIdioma.PlaceHolder = " "
	cboIdioma.SetSelected("pt-BR-Portuguese (Brazilian)")

	txtIdioma := widget.NewEntry()
	txtIdioma.MultiLine = true
	txtIdioma.Wrapping = fyne.TextWrapBreak

	lblTraduzirPara := widget.NewLabel(c.T("Translate to"))
	lblTraduzirPara.TextStyle = fyne.TextStyle{Bold: true}
	cboTraduzirPara := widget.NewSelect(listIdiomas, nil)
	cboTraduzirPara.PlaceHolder = " "
	cboTraduzirPara.SetSelected("en-English")

	txtTraduzirPara := widget.NewEntry()
	txtTraduzirPara.MultiLine = true
	txtTraduzirPara.Wrapping = fyne.TextWrapBreak

	flow.AddColumn(
		container.NewVBox(lblIdioma, cboIdioma),
		container.NewVBox(lblTraduzirPara, cboTraduzirPara),
	)

	flow.AddColumn(txtIdioma, txtTraduzirPara)

	flow.SetResize(txtIdioma, fyne.NewSize(392, 200))
	flow.SetResize(txtTraduzirPara, fyne.NewSize(400, 200))

	btnTraduzir := widget.NewButton(c.T("Translate"), func() {
		sIdioma := strings.Split(cboIdioma.Selected, "-")
		sTraduzirPara := strings.Split(cboTraduzirPara.Selected, "-")

		go func() {
			var out strings.Builder
			cmd := exec.Command("/usr/bin/trans", "-b", strings.Join([]string{sIdioma[0], sTraduzirPara[0]}, ":"), txtIdioma.Text)
			cmd.Stdout = &out

			err := cmd.Run()

			if err != nil {
				log.Fatal(err)
			}

			fyne.Do(func() {
				txtTraduzirPara.Text = out.String()
				txtTraduzirPara.Refresh()
			})
		}()
	})

	btnAlternar := widget.NewButton(c.T("Switch"), func() {
		sIdioma := cboIdioma.Selected
		sTextIdioma := txtIdioma.Text

		cboIdioma.SetSelected(cboTraduzirPara.Selected)
		cboTraduzirPara.SetSelected(sIdioma)

		txtIdioma.Text = txtTraduzirPara.Text
		txtTraduzirPara.Text = sTextIdioma
		txtIdioma.Refresh()
		txtTraduzirPara.Refresh()
	})

	flow.AddColumn(btnTraduzir, btnAlternar)

	window.SetContent(flow.Container)
	window.ShowAndRun()
}
