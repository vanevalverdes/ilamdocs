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
  const idRequest = c.pathParam("publicId")
  let record;
  const parsedId = idRequest;
  console.log(isNaN(parsedId))
  if (isNaN(parsedId) === false) {
    record = $app.dao().findFirstRecordByFilter(
      "category", "publicId = {:id}",
      { id: parseInt(idRequest) }
      );
    } else {
    console.log(parsedId)
    record = $app.dao().findRecordById("category", idRequest);
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
 const idRequest = c.pathParam("publicId")
  let record;

  const parsedId = idRequest;
  console.log(isNaN(parsedId))
  if (isNaN(parsedId) === false) {
    record = $app.dao().findFirstRecordByFilter(
      "document", "publicId = {:id}",
      { id: parseInt(idRequest) }
      );
    } else {
    console.log(parsedId)
    record = $app.dao().findRecordById("document", idRequest);
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
 const idRequest = c.pathParam("publicId")
  let record;

  const parsedId = idRequest;
  console.log(isNaN(parsedId))
  if (isNaN(parsedId) === false) {
    record = $app.dao().findFirstRecordByFilter(
      "document", "publicId = {:id}",
      { id: parseInt(idRequest) }
      );
    } else {
    console.log(parsedId)
    record = $app.dao().findRecordById("document", idRequest);
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
routerAdd("get", "/search/", (c) => {
    const key = c.request().formValue("s")
    let str = key
    let arr = str.split(' ');
    
    const result = arrayOf(new DynamicModel({
      "id":    "",
      "title": "",
      "description": "",
      "author": "",
    }))
    
    for (var i = 0; i < arr.length; i++) {
      $app.dao().db()
      .select("id", "title", "description", "author")
      .from("document")
      .where($dbx.or($dbx.orLike("title",arr[i]),$dbx.orLike("description",arr[i])))
      .andWhere($dbx.exp("published = true"))
      .orderBy("created ASC")
      .all(result)
    }


  try {
    const html = $template.loadFiles(
      `${__hooks}/views/layout.html`,
      `${__hooks}/views/results.html`,
    ).render({
      "records": result,
      "searchtext": arr,
    })
    return c.html(200, html)
  }
  catch (error) {
    return console.log(error)
  }
})

routerAdd("get", "/lector/:publicId/", (c) => {
  const idRequest = c.pathParam("publicId")
   let record;
 
   const parsedId = idRequest;
   if (isNaN(parsedId) === false) {
     record = $app.dao().findFirstRecordByFilter(
       "document", "publicId = {:id}",
       { id: parseInt(idRequest) }
       );
     } else {
     record = $app.dao().findRecordById("document", idRequest);
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

routerAdd("post", "/upload", (c) => {
  const collection = $app.dao().findCollectionByNameOrId("received_document")
  
  const record = new Record(collection)
  
  const form = new RecordUpsertForm($app, record)
  
  // regular fields
  form.loadData({
      "title": c.request().formValue("title"),
      "author": c.request().formValue("author"),
      "description": c.request().formValue("description"),
      "date": c.request().formValue("date"),
      "country": c.request().formValue("country"),
      "email": c.request().formValue("email"),
      "category": c.request().formValue("category"),
      "url": c.request().formValue("url"),
      "contact": c.request().formValue("contact"),
    })

    // multipart uploaded files
    const [multipartFile, multipartHeader] = c.request().formFile("file")
    
    form.addFiles("file", $filesystem.fileFromMultipart(multipartHeader))
    form.submit()
    let recordPage;
    recordPage = $app.dao().findRecordById("page", "urnjsvjc9rubhns")
    const recordExport = recordPage.publicExport()
    try {
      const html = $template.loadFiles(
        `${__hooks}/views/layout.html`,
        `${__hooks}/views/tu-doc.html`,
        ).render({
          "recordSuccess": record.getString("id"),
          "record": recordExport,
        })
        return c.html(200, html)
      } catch (err) {
        console.log(err)
        throw new BadRequestError("failed to create record", err)
  }
  
})