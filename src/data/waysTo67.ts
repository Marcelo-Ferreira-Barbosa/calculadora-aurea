import type { WayCategory, WayExample } from '../types'

// Ordem em que as categorias aparecem nos filtros.
export const categories: readonly WayCategory[] = [
  'Adição',
  'Subtração',
  'Multiplicação',
  'Divisão',
  'Combinada',
]

// Regras para editar esta lista (o script `npm run verify:ways` confere tudo):
// - `expression` usa espaços entre números e operadores: "8 × 8 + 3"
// - cada item de `steps` tem o formato "conta = resultado": "8 × 8 = 64"
// - o último passo deve terminar em 67
export const waysTo67: WayExample[] = [
  // ---------- Adição ----------
  {
    id: 'adicao-1',
    category: 'Adição',
    expression: '60 + 7',
    result: 67,
    explanation: '60 mais 7 resulta em 67.',
  },
  {
    id: 'adicao-2',
    category: 'Adição',
    expression: '45 + 22',
    result: 67,
    explanation: 'Some as dezenas e depois as unidades.',
    steps: ['40 + 20 = 60', '5 + 2 = 7', '60 + 7 = 67'],
  },
  {
    id: 'adicao-3',
    category: 'Adição',
    expression: '50 + 10 + 7',
    result: 67,
    explanation: 'Com mais de duas parcelas, some da esquerda para a direita.',
    steps: ['50 + 10 = 60', '60 + 7 = 67'],
  },

  // ---------- Subtração ----------
  {
    id: 'subtracao-1',
    category: 'Subtração',
    expression: '100 − 33',
    result: 67,
    explanation: '100 menos 33 resulta em 67.',
    steps: ['100 − 30 = 70', '70 − 3 = 67'],
  },
  {
    id: 'subtracao-2',
    category: 'Subtração',
    expression: '80 − 13',
    result: 67,
    explanation: 'Tire 13 em duas partes: primeiro 10, depois 3.',
    steps: ['80 − 10 = 70', '70 − 3 = 67'],
  },
  {
    id: 'subtracao-3',
    category: 'Subtração',
    expression: '200 − 133',
    result: 67,
    explanation: 'Tire primeiro as centenas, depois o resto.',
    steps: ['200 − 100 = 100', '100 − 33 = 67'],
  },

  // ---------- Multiplicação ----------
  {
    id: 'multiplicacao-1',
    category: 'Multiplicação',
    expression: '67 × 1',
    result: 67,
    explanation: 'Qualquer número multiplicado por 1 continua o mesmo.',
  },
  {
    id: 'multiplicacao-2',
    category: 'Multiplicação',
    expression: '33.5 × 2',
    result: 67,
    explanation:
      'O dobro de 33,5 é 67. Como 67 é primo, nenhum produto de dois inteiros maiores que 1 chega nele; por isso entram decimais.',
  },
  {
    id: 'multiplicacao-3',
    category: 'Multiplicação',
    expression: '6.7 × 10',
    result: 67,
    explanation: 'Multiplicar por 10 desloca a vírgula uma casa para a direita.',
  },

  // ---------- Divisão ----------
  {
    id: 'divisao-1',
    category: 'Divisão',
    expression: '134 ÷ 2',
    result: 67,
    explanation: '134 dividido por 2 resulta em 67.',
  },
  {
    id: 'divisao-2',
    category: 'Divisão',
    expression: '201 ÷ 3',
    result: 67,
    explanation: 'Três vezes 67 é 201, então 201 dividido por 3 volta a 67.',
  },
  {
    id: 'divisao-3',
    category: 'Divisão',
    expression: '670 ÷ 10',
    result: 67,
    explanation: 'Dividir por 10 desloca a vírgula uma casa para a esquerda.',
  },

  // ---------- Combinadas ----------
  {
    id: 'combinada-1',
    category: 'Combinada',
    expression: '8 × 8 + 3',
    result: 67,
    explanation: 'A multiplicação vem antes da soma.',
    steps: ['8 × 8 = 64', '64 + 3 = 67'],
  },
  {
    id: 'combinada-2',
    category: 'Combinada',
    expression: '12 × 6 − 5',
    result: 67,
    explanation: 'A multiplicação vem antes da subtração.',
    steps: ['12 × 6 = 72', '72 − 5 = 67'],
  },
  {
    id: 'combinada-3',
    category: 'Combinada',
    expression: '150 ÷ 3 + 17',
    result: 67,
    explanation: 'A divisão vem antes da soma.',
    steps: ['150 ÷ 3 = 50', '50 + 17 = 67'],
  },
  {
    id: 'combinada-4',
    category: 'Combinada',
    expression: '100 − 3 × 11',
    result: 67,
    explanation: 'Atenção: a multiplicação é resolvida antes da subtração.',
    steps: ['3 × 11 = 33', '100 − 33 = 67'],
  },
  {
    id: 'combinada-5',
    category: 'Combinada',
    expression: '2 + 5 × 13',
    result: 67,
    explanation: 'Mesmo com a soma escrita primeiro, a multiplicação vem antes.',
    steps: ['5 × 13 = 65', '2 + 65 = 67'],
  },
]