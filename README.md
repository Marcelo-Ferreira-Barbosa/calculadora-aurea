# Calculadora Áurea

> Faça as contas. Encontre o 67. Farme áurea.

Calculadora interativa inspirada no meme **67 (six seven)**. Ela funciona como uma calculadora comum e, quando o resultado final de uma operação é exatamente **67**, desbloqueia a conquista **"Você farmou áurea!"**. Abaixo da calculadora, a seção **"Como chegar aos 67?"** mostra exemplos de contas com o passo a passo.

Projeto de portfólio, 100% frontend: sem backend, banco de dados, login ou APIs externas.

<!--
DEMONSTRAÇÃO (descomente quando o deploy estiver no ar e troque o link):
**[Acesse a demonstração online](https://SEU-LINK-AQUI)**
-->

<!--
CAPTURAS DE TELA (descomente depois de adicionar as imagens em docs/screenshots/):

| Desktop | Conquista desbloqueada |
| :---: | :---: |
| ![Calculadora no desktop](docs/screenshots/desktop.png) | ![Conquista desbloqueada](docs/screenshots/conquista.png) |

| Celular | Como chegar aos 67? |
| :---: | :---: |
| ![Calculadora no celular](docs/screenshots/mobile.png) | ![Seção educativa com filtros](docs/screenshots/exemplos.png) |
-->

## Objetivo

Reunir três ideias em um projeto pequeno e bem organizado:

- **Diversão:** a conquista ao chegar no 67, por qualquer caminho.
- **Aprendizado:** exemplos de adição, subtração, multiplicação, divisão e contas combinadas que resultam em 67, com explicação passo a passo.
- **Visual:** tema escuro com detalhes dourados, responsivo e com animações discretas.

## Funcionalidades

**Calculadora**

- Adição, subtração, multiplicação e divisão, com números decimais.
- Operações encadeadas com precedência correta: `8 × 8 + 3` resulta em 67, e não em 192.
- Botão de limpar tudo (`C`) e de apagar o último caractere (`⌫`).
- Display com a expressão em andamento e o resultado.
- Digitação pelo teclado do computador, além dos botões.
- Tratamento de divisão por zero (mensagem de erro, sem travar) e de entradas inválidas: segundo ponto decimal, operadores seguidos e zeros à esquerda.
- Cálculo feito por um avaliador de expressões próprio, **sem `eval` e sem `new Function`**.

**Conquista áurea**

- Dispara somente ao pressionar `=` com resultado 67 depois de uma operação. Digitar apenas `67` e `=` não conta.
- Comparação com uma tolerância minúscula (`1e-11`), só para absorver o ruído do ponto flutuante: `20.1 ÷ 0.3` vale `67.00000000000001` internamente e conta, mas `67.001` não.
- Painel de conquista com animação, display em destaque dourado e botão "Fazer outra operação".
- A conquista some ao iniciar uma nova conta e pode ser conquistada de novo.
- No celular, a tela rola até o painel quando a conquista é desbloqueada.

**Como chegar aos 67?**

- 17 exemplos em 5 categorias (adição, subtração, multiplicação, divisão e combinada).
- Filtro por categoria.
- Passo a passo nas contas com mais de uma etapa.
- Os exemplos vêm de um arquivo de dados (`src/data/waysTo67.ts`) e são conferidos automaticamente pelos testes (`npm run test`).

**Interface e acessibilidade**

- Layout responsivo, testado de 320px até desktop.
- Botões reais com `aria-label`, foco visível, resultado em `<output>` e filtros com `aria-pressed`.
- Respeita `prefers-reduced-motion`.

## Regras de funcionamento

| Tema | Comportamento |
| --- | --- |
| Precedência | `×` e `÷` são resolvidos antes de `+` e `−` |
| Tamanho dos números | Até 15 dígitos por número digitado |
| Exibição | Resultados arredondados para 12 dígitos significativos; notação científica para valores muito grandes (a partir de 1e12) ou muito pequenos (abaixo de 1e-6) |
| Depois do `=` | Digitar um número começa uma conta nova; digitar um operador continua a partir do resultado exibido |
| Continuação | Como a continuação usa o valor **exibido**, `1 ÷ 3 = × 3 =` resulta em `0.999999999999` |
| Operador primeiro | `− 5 =` é calculado como `0 − 5` |
| `=` incompleto | `8 + =` não faz nada |

**Atalhos de teclado**

| Tecla | Ação |
| --- | --- |
| `0`–`9` | Dígitos |
| `+`, `-`, `*` (ou `x`), `/` | Operadores |
| `.` ou `,` | Ponto decimal |
| `Enter` ou `=` | Calcular |
| `Backspace` | Apagar o último caractere |
| `Delete` ou `Esc` | Limpar tudo |

## Tecnologias

- [React](https://react.dev/) para a interface
- [TypeScript](https://www.typescriptlang.org/) em modo estrito
- [Vite](https://vite.dev/) para desenvolvimento e build
- CSS puro, com variáveis CSS e um arquivo por componente
- [Vitest](https://vitest.dev/) para os testes automatizados
- [Oxlint](https://oxc.rs/docs/guide/usage/linter) para análise do código

## Estrutura de pastas

```
calculadora-aurea/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Achievement/       # painel da conquista (bloqueada e desbloqueada)
│   │   ├── Calculator/        # Calculator, Display, Keypad e Key
│   │   ├── GoldenWays/        # GoldenWays, CategoryFilter e WayCard
│   │   └── Header/
│   ├── data/
│   │   └── waysTo67.ts        # exemplos da seção educativa
│   ├── hooks/
│   │   └── useCalculator.ts   # liga o reducer aos botões e ao teclado
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   ├── calculatorReducer.ts  # estado e regras da calculadora
│   │   ├── evaluate.ts           # avaliador de expressões (sem eval)
│   │   ├── formatNumber.ts       # formatação do resultado
│   │   ├── isGoldenResult.ts     # comparação com tolerância
│   │   ├── keyMapping.ts         # mapeamento das teclas
│   │   └── *.test.ts             # testes (Vitest)
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
└── vite.config.ts
```

A lógica matemática fica em `src/utils/`, em funções puras, sem React. Isso permite testá-la sozinha. A tela apenas desenha o estado que o hook `useCalculator` entrega.

## Pré-requisitos

- [Node.js](https://nodejs.org/) **20.19+ ou 22.12+** (requisito do Vite; recomendado: a versão LTS atual)
- npm (já vem com o Node.js).
- [Git](https://git-scm.com/) para clonar o repositório.

Para conferir:

```bash
node -v
npm -v
```

## Instalação e execução local

```bash
# 1. Clone o repositório
git clone https://github.com/Marcelo-Ferreira-Barbosa/calculadora-aurea.git

# 2. Entre na pasta
cd calculadora-aurea

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

Abra o endereço mostrado no terminal (normalmente `http://localhost:5173`).

## Scripts disponíveis

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Verifica os tipos e gera a versão de produção em `dist/` |
| `npm run preview` | Serve localmente a versão gerada pelo build |
| `npm run lint` | Analisa o código com o Oxlint |
| `npm run test` | Roda os testes automatizados uma vez |
| `npm run test:watch` | Roda os testes e reexecuta a cada alteração |

## Exemplos de operações que resultam em 67

| Tipo | Operação |
| --- | --- |
| Adição | `60 + 7`, `45 + 22`, `50 + 10 + 7` |
| Subtração | `100 − 33`, `80 − 13`, `200 − 133` |
| Multiplicação | `67 × 1`, `33.5 × 2`, `6.7 × 10` |
| Divisão | `134 ÷ 2`, `201 ÷ 3`, `670 ÷ 10` |
| Combinada | `8 × 8 + 3`, `12 × 6 − 5`, `150 ÷ 3 + 17`, `100 − 3 × 11`, `2 + 5 × 13` |

Existem infinitas combinações que resultam em 67: para qualquer número `n`, a conta `n + (67 − n)` já dá 67. A lista acima é uma seleção, e não o conjunto completo. Curiosidade: como 67 é primo, nenhum produto de dois números inteiros maiores que 1 chega nele, por isso os exemplos de multiplicação usam o 1 ou decimais.

## Testes

Os testes automatizados cobrem a lógica da calculadora:

- avaliador de expressões: precedência, decimais, divisão por zero e entradas inválidas;
- reducer: encadeamento, limpar, apagar, comportamento depois do `=`, limites e notação científica;
- formatação de números e comparação com tolerância;
- conquista: casos que devem e que não devem disparar (66, 68, `67.001` e `67 =` sozinho, entre outros);
- exemplos da seção educativa: toda conta e todo passo conferidos com o avaliador da calculadora.

```bash
npm run test
```

## Melhorias futuras

Ideias ainda **não implementadas**:

- Modo científico (parênteses, potências, raízes, trigonometria, fatorial).
- Histórico das últimas contas.
- Modo desafio: "ache uma conta que dê 67 usando determinados números ou operações".
- Gerador automático de combinações que resultam em 67, dentro de limites definidos.
- Repetir a última operação ao pressionar `=` novamente.
- Testes de componentes e testes de ponta a ponta.
- Integração contínua (GitHub Actions) rodando lint, testes e build a cada push.

## Autor

Desenvolvido por Marcelo Ferreira Barbosa — [@Marcelo-Ferreira-Barbosa](https://github.com/Marcelo-Ferreira-Barbosa).
