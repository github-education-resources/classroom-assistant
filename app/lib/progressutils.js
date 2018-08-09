const byline = require('byline')

const steps = [
  { title: 'remote: Compressing objects', weight: 0.1 },
  { title: 'Receiving objects', weight: 0.6 },
  { title: 'Resolving deltas', weight: 0.3 },
 ]

 const tryParse = (str) => {
	const value = /(\d+)\%/.exec(str)
  if (value) {
    const percentValue = value[1]
    const percent = parseInt(percentValue, 10)
    if (!isNaN(percent)) {
      return percent
    }
  }

  return null
}

class ProgressParser {

	constructor(progressCallback){
		this.progressCallback = progressCallback
	}

	parseProgressFromProcess (process) {
		const progressCallback = this.progressCallback
	  byline(process.stderr).on('data', (chunk) => {
	  	steps.forEach((step, index) => {
	  		if (chunk.startsWith(step.title)) {
			  const percentOfStep = tryParse(chunk)
			  if (percentOfStep) {
			  	let percent = steps.slice(index).reduce((sum, step) => sum + step.weight, 0)
			  	percent += percentOfStep*step.weight
			    progressCallback(percent*100)
			  }
			  return
			}
	  	})
	    
	    if (chunk.startsWith('Resolving deltas: ')) {
	      const percent = tryParse(chunk)
	      if (percent) {
	        progressCallback(percent)
	      }
	      return
	    }
	  })
	}
}
	
export default ProgressParser