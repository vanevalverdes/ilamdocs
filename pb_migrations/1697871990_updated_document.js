/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xc29e15895cpu0s")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rmm7r5yq",
    "name": "sourceVideo",
    "type": "url",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xyseg0ut",
    "name": "resume",
    "type": "editor",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oyd9ehhe",
    "name": "tableContents",
    "type": "editor",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qafekhgq",
    "name": "titleReview",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qy0vyst2",
    "name": "translateTitle",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dr1e1mys",
    "name": "volume",
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

  // remove
  collection.schema.removeField("rmm7r5yq")

  // remove
  collection.schema.removeField("xyseg0ut")

  // remove
  collection.schema.removeField("oyd9ehhe")

  // remove
  collection.schema.removeField("qafekhgq")

  // remove
  collection.schema.removeField("qy0vyst2")

  // remove
  collection.schema.removeField("dr1e1mys")

  return dao.saveCollection(collection)
})
