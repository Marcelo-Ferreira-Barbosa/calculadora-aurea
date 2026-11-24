import { useCallback, useEffect, useReducer } from 'react'
import {
  calculatorReducer,
  getDisplay,
  hasEarnedAchievement,
  initialState,
} from '../utils/calculatorReducer'
import { keyboardKeyToAction, labelToAction } from '../utils/keyMapping'

export function useCalculator() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState)

  // Evento 1: clique nos botões do Keypad.
  const pressKey = useCallback((label: string) => {
    const action = labelToAction(label)
    if (action !== null) dispatch(action)
  }, [])

  // Usado pelo botão "Fazer outra operação" da conquista.
  const reset = useCallback(() => dispatch({ type: 'clear' }), [])

  // Evento 2: teclado físico.
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // Não interfere em atalhos do navegador (Ctrl+R, Ctrl+C etc.).
      if (event.ctrlKey || event.metaKey || event.altKey) return

      // Se o foco está em outro botão da página (ex.: "Fazer outra operação"),
      // deixa o Enter funcionar normalmente nele.
      const target = event.target
      if (target instanceof Element) {
        const inOtherButton =
          target.closest('button') !== null && target.closest('.calculator') === null
        if (inOtherButton) return
      }

      const action = keyboardKeyToAction(event.key)
      if (action === null) return

      // Evita que o Enter "clique" de novo no último botão focado, e que o "/"
      // abra a busca rápida do Firefox.
      event.preventDefault()
      dispatch(action)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return {
    ...getDisplay(state),
    isGolden: hasEarnedAchievement(state),
    pressKey,
    reset,
  }
}