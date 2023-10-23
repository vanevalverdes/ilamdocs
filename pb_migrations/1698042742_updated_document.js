/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xc29e15895cpu0s")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nprjl56m",
    "name": "embedCode",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xc29e15895cpu0s")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nprjl56m",
    "name": "embedVideo",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
