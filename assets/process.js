const fs = require('fs')
const path = require('path')
const titles = require('./titles.json')
const answers = require('./answers.json')

fs.readFile('./assets/gre.txt', (err, data) => {
  if (err) {
    console.log(err)
    return
  }

  const filter = ctx => ctx.replace(/\s/, '').length > 10

  const parseQuestions = question => {
    const matches = question.split(/^\(?[A-G]\)? ?\.?/gm)
    if (!matches) return '{}'

    return {
      subject: matches[0],
      options: matches.slice(1)
    }
  }

  const parsePaggage = (passage, uindex, pindex) => {
    const matches = passage.split(/^\d+\./gm)

    if (!matches) return '{}'

    return {
      id: `ilvyr00${uindex + 1}00${pindex + 1}`,
      title: titles[uindex].passages[pindex],
      content: matches[0].split(/\n\n/).filter(filter),
      questions: matches.slice(1).map(m => parseQuestions(m))
    }
  }

  const dir = `static`

  const f = data.toString()
  let count = 0
  const units = f
    .split(/Unit \d/g)
    .filter(filter)
    .map((unit, uindex) => {
      const p = path.join(dir, 'passages')
      if (!fs.existsSync(p)) fs.mkdirSync(p)

      const passages = unit
        .split(/Passage \d{1,3}/g)
        .filter(filter)
        .map((passage, pindex) => {
          const json = parsePaggage(passage, uindex, pindex)
          json.answers = answers[count]

          const file = fs.openSync(
            path.join(dir, `passages/${json.id}.json`),
            'w+'
          )
          fs.writeSync(file, JSON.stringify(json))
          fs.closeSync(file)

          count++
          return {
            title: json.title,
            id: json.id
          }
        })

      return {
        unit: titles[uindex].unit,
        passages
      }
    })

  const file = fs.openSync(path.join(dir, `catalog.json`), 'w+')
  fs.writeSync(file, JSON.stringify(units))
  fs.closeSync(file)
})
