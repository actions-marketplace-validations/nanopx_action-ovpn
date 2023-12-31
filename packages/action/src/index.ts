import * as core from '@actions/core'
import { run as main } from './main'
import { run as cleanup } from './post'

const isPost = core.getState('isPost')

async function run() {
  if (!isPost) {
    core.saveState('isPost', 'true')

    try {
      const pid = await main()
      core.saveState('pid', pid)
    } catch (e) {
      if (e instanceof Error) {
        core.setFailed(e.message)
      }
    }
  } else {
    try {
      const pid = core.getState('pid')
      await cleanup(pid)
    } catch (e) {
      if (e instanceof Error) {
        core.setFailed(e.message)
      }
    }
  }
}

run()
