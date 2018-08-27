import fixture from './fixture.json'
import Model from './model'

async function importation() {
  new Model().truncate()
  for (let index in fixture) {
    for (let indx in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
      fixture[index].segment = indx
      fixture[index].description = `this is description of ${
        fixture[index].chapter
      } and number ${indx}`
      let sample = new Model(fixture[index])
      sample.save()
    }
  }
}

export default importation
