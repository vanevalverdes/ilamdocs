/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xc29e15895cpu0s")

  collection.listRule = null
  collection.viewRule = null

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mgugj3zp",
    "name": "date_published",
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
    "id": "2vvozwes",
    "name": "author",
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
    "id": "ww1k5d26",
    "name": "place_published",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "z2h7thb3",
    "name": "description",
    "type": "editor",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "agmlm77b",
    "name": "portada",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": [],
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xc29e15895cpu0s")

  collection.listRule = ""
  collection.viewRule = ""

  // remove
  collection.schema.removeField("mgugj3zp")

  // remove
  collection.schema.removeField("2vvozwes")

  // remove
  collection.schema.removeField("ww1k5d26")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "z2h7thb3",
    "name": "description",
    "type": "editor",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": true
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "agmlm77b",
    "name": "portada",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [
        "image/vnd.mozilla.apng",
        "image/png",
        "image/jpeg"
      ],
      "thumbs": [],
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
})
