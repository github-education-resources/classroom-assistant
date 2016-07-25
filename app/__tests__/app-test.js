jest.disableAutomock()

import path from "path"

import { Application } from "spectron"

describe("application", function () {
  it("can be started and stopped", (done) => {
    const app = new Application({
      path: path.join(__dirname, "../../node_modules/.bin/electron"),
      args: [
        "main.js"
      ]
    })

    const promise = app.start()

    promise.then(() => {
      console.log("APP STARTED")
      return app.stop()
    }).then(() => {
      console.log("APP STOPPED")
      done()
    })
  })
})
