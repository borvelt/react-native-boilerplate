import Realm from 'realm'
import merge from 'lodash/merge'
import isUndefined from 'lodash/isUndefined'

class ObstacleHiringModel {
  schema = {
    name: 'ObstacleHiring',
    primaryKey: 'id',
    properties: {
      id: 'int', // Primary Key
      chapter: {
        type: 'string',
        indexed: true,
      },
      segment: 'string?',
      paragraph: 'string?',
      description: 'string?',
    },
  }

  config = {
    schema: [this.schema],
    // deleteRealmIfMigrationNeeded: true,
    schemaVersion: 1.0,
  }

  constructor(props = {}) {
    merge(this, {
      ...props,
    })
  }

  save() {
    try {
      let realm = new Realm(this.config)
      this.id = realm.objects(this.schema.name).length + 1
      let created = {}
      realm.write(() => {
        created = realm.create(this.schema.name, {
          id: this.id,
          chapter: this.chapter,
          segment: this.segment,
          paragraph: this.paragraph,
          description: this.description,
        })
      })
      realm.close()
      return created
    } catch (exception) {
      throw new Error(exception)
    }
  }

  fetch(condition) {
    // let realm = await Realm.openOneTime(ObstacleHiringModel.config)
    let objects = []
    try {
      let realm = new Realm(this.config)
      objects = realm.objects(this.schema.name)
      if (isUndefined(condition)) {
        realm.close()
        return objects
      }
      let filtered = objects.filtered(condition)
      let results = []
      for (let item of filtered) {
        results.push(JSON.parse(JSON.stringify(item)))
      }
      realm.close()
      return results
    } catch (exception) {
      throw new Error(exception)
    }
  }

  truncate() {
    let realm = new Realm(this.config)
    realm.write(() => {
      try {
        realm.deleteAll()
      } catch (exception) {
        //Empty Block
      }
    })
    realm.close()
  }
}

export default ObstacleHiringModel
