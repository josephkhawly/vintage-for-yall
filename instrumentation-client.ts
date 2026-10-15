import { initBotId } from 'botid/client/core'

// Protect Server Actions invoked from the homepage newsletter form.
initBotId({
  protect: [
    {
      path: '/',
      method: 'POST',
    },
  ],
})
