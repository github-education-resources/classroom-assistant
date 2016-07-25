jest.disableAutomock()

import { Application } from "spectron"

describe("application", function () {
  it("can be started and stopped", (done) => {
    let app = new Application({
      path: "node_modules/.bin/electron",
      args: [
        "main.js"
      ]
    })

    app.start().then(() => {
      return app.stop()
    }).then(() => {
      done()
    })
  })
})
