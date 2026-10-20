---
name: Instituto Dr. Lucas Abrahão
description: Prontuário aberto em papel, tinta e latão, com a fotografia real do médico.
colors:
  ink: "#1A1612"
  paper: "#F3EEE6"
  paper-deep: "#E6DFD2"
  ink-soft: "#3F3832"
  brass: "#6B4F2E"
  brass-bright: "#E0C48A"
  line: "#D4CBBD"
  danger: "#8D2C2C"
typography:
  display:
    fontFamily: "Bricolage Grotesque, Segoe UI, sans-serif"
    fontSize: "clamp(2.7rem, 6vw, 5.25rem)"
    fontWeight: 500
    lineHeight: 0.94
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Atkinson Hyperlegible, Segoe UI, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
rounded:
  none: "0px"
spacing:
  section: "6rem"
  page: "1.25rem"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "0 1.25rem"
    height: "3rem"
  button-primary-hover:
    backgroundColor: "{colors.brass}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "0 1.25rem"
    height: "3rem"
  button-inverse:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 1.25rem"
    height: "3rem"
---

## Overview

O site lê como um prontuário: blocos separados por papel, uma janela fotográfica principal e o agendamento no WhatsApp. A marca publicada (monograma dourado, fundo quente, tinta escura) permanece reconhecível. O verde do botão antigo não é cor de marca.

## Colors

Tinta `#1A1612` carrega faixas escuras, botões e texto. Papel `#F3EEE6` é o fundo de leitura. Latão `#6B4F2E` só entra em texto pequeno sobre papel, porque o dourado original `#C5A059` não sustenta contraste. Sobre tinta, o latão claro é `#E0C48A`. Erro de formulário usa `#8D2C2C`.

## Typography

Títulos em Bricolage Grotesque, com tracking não mais fechado que -0.03em. Texto em Atkinson Hyperlegible. A manchete não passa de 5.25rem. Não há rótulo pequeno acima do título.

## Layout

Cabeçalho fixo de 4.5rem. Conteúdo em até 72rem, com respiro largo entre seções. A primeira dobra é assimétrica: texto e ação à esquerda, fotografia em sangria à direita. No celular, a manchete e o botão vêm antes da foto.

## Elevation & Depth

Quase não há sombra. A única elevação é o botão flutuante de WhatsApp, `0 10px 24px rgba(26,22,18,0.18)`. Separação vem de faixas de papel e fios `#D4CBBD`.

## Shapes

Cantos retos. Botões e campos são retângulos. Fotografias ocupam a caixa inteira, sem máscara decorativa.

## Components

Botão principal em tinta, inverso em papel sobre fundo escuro, contorno para ação secundária. Menu mobile em tela cheia, na tinta. Formulário com rótulo visível, erro junto ao campo e envio que abre o WhatsApp sem gravar dados. FAQ em `details`.

## Do's and Don'ts

Faça o texto aparecer no primeiro quadro, sem depender de animação. Use só fatos publicados: CRM GO 19862, o endereço de Catalão, o WhatsApp e a formação listada no site original. Não invente horário, e-mail, endereço em Goiânia, protocolo clínico ou depoimento. Não pinte categorias com cores diferentes. Não prometa cura ou resultado garantido.
