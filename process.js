
const fs = require('fs')
const path = require('path')
const titles = require('./assets/titles.json')

fs.readFile('./assets/gre.txt', (err, data) => {
  if (err) {
    console.log(err)
    return 
  }

  const filter = (ctx => ctx.replace(/\s/, '').length > 10)

  const parseQuestions = (question) => {
    const matches = question.split(/^\(?[A-G]\)? ?\.?/mg);
    if (!matches) return "{}"

    return {
      subject: matches[0],
      options: matches.slice(1)
    }
  }
  
  const parsePaggage = (passage, uindex, pindex) => {
    // return passage;
    const matches = passage.split(/^\d+\./mg);

    if (!matches) return "{}"

    return {
      title: titles[uindex].passages[pindex],
      passage: matches[0],
      questions: matches.slice(1).map(m => parseQuestions(m))
    }
  }


  const f = data.toString()
  const units = f.split(/Unit \d/g).filter(filter).map((unit, uindex) => {

    const dir = `assets/passages/unit${uindex+1}`

    if (!fs.existsSync(dir)) fs.mkdirSync(dir)
    
    return unit.split(/Passage \d/g).filter(filter).map((passage, pindex) => {
      const file = fs.openSync(path.join(dir, `passage${pindex+1}.json`), 'w+')
      const json = parsePaggage(passage, uindex, pindex)
      fs.writeSync(file, JSON.stringify(json))
      fs.closeSync(file)

      return json.title
    })
  })

  console.log(units)
  

})