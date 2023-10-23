/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "q5h1i8jskb6nqmb",
    "created": "2023-10-04 05:17:54.133Z",
    "updated": "2023-10-04 05:17:54.133Z",
    "name": "category",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "2uvqnaqz",
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
        "id": "c5hosei8",
        "name": "description",
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
  const collection = dao.findCollectionByNameOrId("q5h1i8jskb6nqmb");

  return dao.deleteCollection(collection);
})
