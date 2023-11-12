routerAdd("get", "/", (c) => {
  try {
    const html = $template.loadFiles(
      `${__hooks}/views/layout.html`,
    `${__hooks}/views/index.html`,
    ).render({
    })
    return c.html(200, html)
  }
  catch (error) {
    return console.log(error)
  }
})
routerAdd("get", "/cat/:publicId/", (c) => {
  const publicId = c.pathParam("publicId")
  let record;

  if (Number.isInteger(parseInt(publicId))) {
    record = $app.dao().findFirstRecordByFilter(
      "category", "publicId = {:publicId}",
      { publicId: parseInt(publicId) }
    );
  } else {
    record = $app.dao().findFirstRecordByFilter(
      "category", "id = {:publicId}",
      { publicId: publicId }
    );
  }
  
  const parent = record.getBool("is_parent")
  if (parent === true) {
    const id = record.get("id")
    const catExport = record.publicExport()

    const result = arrayOf(new DynamicModel({
      "id":    "",
      "title": "",
      "portada": "",
      "publicId":"",
    }))

    $app.dao().db()
      .select("id", "title", "portada", "publicId")
      .from("category")
      .where($dbx.exp("parent = {:parent}", { parent: id }))
      .orderBy("created ASC")
      .all(result)

    try {
      const html = $template.loadFiles(
        `${__hooks}/views/layout.html`,
        `${__hooks}/views/category-parent.html`,
      ).render({
        "records": result,
        "catExport": catExport,
      })
      return c.html(200, html)
    }
    catch (error) {
      return console.log(error)
    }
  } else {
    const id = record.get("id")
    const catTitle = record.get("title")
    const catDescription = record.get("description")

    const result = arrayOf(new DynamicModel({
      "id":    "",
      "title": "",
      "portada": "",
      "category": "",
      "publicId": "",
    }))

    $app.dao().db()
      .select("id", "title", "portada", "category", "publicId")
      .from("document")
      .where($dbx.exp("category = {:category}", { category: id }))
      .andWhere($dbx.exp("published = true"))
      .orderBy("created ASC")
      .all(result)

    try {
      const html = $template.loadFiles(
        `${__hooks}/views/layout.html`,
        `${__hooks}/views/category.html`,
      ).render({
        "records": result,
        "catTitle": catTitle,
        "catDescription": catDescription,
      })
      return c.html(200, html)
    }
    catch (error) {
      return console.log(error)
    }
  }
  

})

routerAdd("get", "/doc/:publicId/", (c) => {
 const publicId = c.pathParam("publicId")
  let record;

  if (Number.isInteger(parseInt(publicId))) {
    record = $app.dao().findFirstRecordByFilter(
      "document", "publicId = {:publicId}",
      { publicId: parseInt(publicId) }
    );
  } else {
    record = $app.dao().findFirstRecordByFilter(
      "document", "id = {:publicId}",
      { publicId: publicId }
    );
  }
  
  const recordExport = record.publicExport()

try {
  const html = $template.loadFiles(
    `${__hooks}/views/layout.html`,
    `${__hooks}/views/document.html`,
  ).render({
    "record": recordExport,
    "descriptionA": record.getString("description"),
  })
  return c.html(200, html)
}
catch (error) {
	return console.log(error)
}

})


routerAdd("get", "/documento/:publicId/", (c) => {
 const publicId = c.pathParam("publicId")
  let record;

  if (Number.isInteger(parseInt(publicId))) {
    record = $app.dao().findFirstRecordByFilter(
      "document", "publicId = {:publicId}",
      { publicId: parseInt(publicId) }
    );
  } else {
    record = $app.dao().findFirstRecordByFilter(
      "document", "id = {:publicId}",
      { publicId: publicId }
    );
  }
  
  const recordExport = record.publicExport()

try {
  const html = $template.loadFiles(
    `${__hooks}/views/layout.html`,
    `${__hooks}/views/document.html`,
  ).render({
    "record": recordExport,
    "descriptionA": record.getString("description"),
  })
  return c.html(200, html)
}
catch (error) {
	return console.log(error)
}
})

routerAdd("get", "/que-es-ilamdocs/", (c) => {
  let record;

    record = $app.dao().findRecordById("page", "ro6yyg6oqoha9ei")
    const recordExport = record.publicExport()

 try {
   const html = $template.loadFiles(
     `${__hooks}/views/layout.html`,
     `${__hooks}/views/about.html`,
   ).render({
     "record": recordExport,
   })
   return c.html(200, html)
 }
 catch (error) {
   return console.log(error)
 }
 
 })
routerAdd("get", "/tu-doc-en-linea/", (c) => {
  let record;

    record = $app.dao().findRecordById("page", "urnjsvjc9rubhns")
    const recordExport = record.publicExport()

 try {
   const html = $template.loadFiles(
     `${__hooks}/views/layout.html`,
     `${__hooks}/views/tu-doc.html`,
   ).render({
     "record": recordExport,
   })
   return c.html(200, html)
 }
 catch (error) {
   return console.log(error)
 }
 
 })
$app.rootCmd.addCommand(new Command({
  use: "import_category",
  run: (cmd, args) => {
      
      // input_json_data file path is input parameter 1
      const input_json_data = require(args[0])
      // console.log("input_json_data", JSON.stringify(input_json_data))

      const collection = $app.dao().findCollectionByNameOrId("category");

      $app.dao().runInTransaction((txDao) => {
          // loop through all items of input_json_data
          for (let input_data of input_json_data) {
              const collection_record = new Record(collection, {
                  title: input_data.Nombre,
                  description: input_data.Description,
                  publicId: input_data.Id,
                  parent: input_data.Parent,
              });
              // console.log("collection_record", JSON.stringify(collection_record))
              txDao.saveRecord(collection_record);
          }
      });
  }
}));

routerAdd("get", "/all-cats/", (c) => {
    const result = arrayOf(new DynamicModel({
      "id":    "",
      "title": "",
      "publicId": "",
    }))

    $app.dao().db()
      .select("id", "title", "publicId")
      .from("category")
      .orderBy("created ASC")
      .all(result)

    try {
      const html = $template.loadFiles(
        `${__hooks}/views/layout.html`,
        `${__hooks}/views/all-cats.html`,
      ).render({
        "records": result,
      })
      return c.html(200, html)
    }
    catch (error) {
      return console.log(error)
    }
})

$app.rootCmd.addCommand(new Command({
  use: "import_document",
  run: (cmd, args) => {
      
      // input_json_data file path is input parameter 1
      const input_json_data = require(args[0])
      // console.log("input_json_data", JSON.stringify(input_json_data))

      const collection = $app.dao().findCollectionByNameOrId("document");

      $app.dao().runInTransaction((txDao) => {
          // loop through all items of input_json_data
          for (let input_data of input_json_data) {
              const collection_record = new Record(collection, {
                publicId: input_data.publicId,
                originalImage: input_data.originalImage,
                portada: input_data.originalImage,
                title: input_data.title,
                category: input_data.category,
                pages: input_data.pages,
                author: input_data.author,
                date_published: input_data.date_published,
                downloads: input_data.downloads,
                originalFile: input_data.originalFile,
                attachment: input_data.originalFile,
                videoLength: input_data.videoLength,
                editor: input_data.editor,
                sourceWeb: input_data.sourceWeb,
                language: input_data.language,
                isbn_issn: input_data.isbn_issn,
                sourceVideo: input_data.sourceVideo,
                place_published: input_data.place_published,
                description: input_data.description,
                tableContents: input_data.tableContents,
                titleReview: input_data.titleReview,
                translateTitle: input_data.translateTitle,
                views: input_data.views,
                volume: input_data.volume,
                published: input_data.published,
              });
              // console.log("collection_record", JSON.stringify(collection_record))
              txDao.saveRecord(collection_record);
          }
      });
  }
}));

routerAdd("get", "/all-docs/", (c) => {
    const result = arrayOf(new DynamicModel({
      "id":    "",
      "title": "",
      "publicId": "",
    }))
  $app.dao().db()
    .select("id", "title", "publicId")
    .from("document")
    .orderBy("created ASC")
    .all(result)

  try {
    const html = $template.loadFiles(
      `${__hooks}/views/layout.html`,
      `${__hooks}/views/all-cats.html`,
    ).render({
      "records": result,
    })
    return c.html(200, html)
  }
  catch (error) {
    return console.log(error)
  }
})

routerAdd("get", "/lector/:publicId/", (c) => {
  const publicId = c.pathParam("publicId")
   let record;
 
   if (Number.isInteger(parseInt(publicId))) {
     record = $app.dao().findFirstRecordByFilter(
       "document", "publicId = {:publicId}",
       { publicId: parseInt(publicId) }
     );
   } else {
     record = $app.dao().findFirstRecordByFilter(
       "document", "id = {:publicId}",
       { publicId: publicId }
     );
   }
   
   const recordExport = record.publicExport()
 
 try {
   const html = $template.loadFiles(
     `${__hooks}/views/viewer.html`,
   ).render({
     "record": recordExport,
     "descriptionA": record.getString("description"),
   })
   return c.html(200, html)
 }
 catch (error) {
   return console.log(error)
 }
})