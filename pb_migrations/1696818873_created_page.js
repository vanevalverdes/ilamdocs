/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "d8b1ybu1tnugtww",
    "created": "2023-10-09 02:34:33.565Z",
    "updated": "2023-10-09 02:34:33.565Z",
    "name": "page",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "zhjbeyzz",
        "name": "title",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "brde3rqm",
        "name": "content_one",
        "type": "editor",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "convertUrls": false
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("d8b1ybu1tnugtww");

  return dao.deleteCollection(collection);
})
