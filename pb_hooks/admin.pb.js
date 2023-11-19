
routerAdd("POST", "/login-verify/", (c) => {
    try {
        const users = $app.dao().findCollectionByNameOrId("users")

        const form = new RecordPasswordLoginForm($app, users);

        c.bind(form);
        // this will perform validation and will try to find an auth record matching the submitted credentials
        const authRecord = form.submit();

        const token = $tokens.recordAuthToken($app, authRecord)

        const rawCookie = `pb_auth=${token}; Max-Age=${$app.settings().recordAuthToken.duration}; Path=/; SameSite=Strict; Secure; HttpOnly`;

        c.response().header().add("Set-Cookie", rawCookie);
        console.log("verificado");
        return c.redirect(303, "/admin/");
      } catch (err) {
        // maybe redirect to an error page?
        console.log(err);
        return c.redirect(400, "/login/");
    }
});

routerAdd("post", "/logout/", (c) => {

    try {
        const token = c.request().cookie("pb_auth")?.value           
        if (token) {
            const record = $app.dao().findAuthRecordByToken(
                token,
                $app.settings().recordAuthToken.secret,
                );
                const rawCookie = `pb_auth=""; Max-Age="Thu, 01 Jan 1970 00:00:00 UTC"; Path=/; SameSite=Strict; Secure; HttpOnly`;
                c.response().header().add("Set-Cookie", rawCookie);
        }
        return c.redirect(303, "/");
    } catch (err) {
        // maybe redirect to an error page?
        return c.redirect(400, "/");
        console.log(err)
    }
});

routerAdd("get", "/login/", (c) => {
    try {
      const html = $template.loadFiles(
        `${__hooks}/views/layout.html`,
      `${__hooks}/views/login.html`,
      ).render({
      })
      return c.html(200, html)
    }
    catch (error) {
      return console.log(error)
    }
  })
routerUse((next) => {
    return (c) => {
        try {
            const token = c.request().cookie("pb_auth")?.value           
            if (token) {
                const record = $app.dao().findAuthRecordByToken(
                    token,
                    $app.settings().recordAuthToken.secret,
                    )
                c.set("authRecord", record)
            }
        } catch(_) {        }

        return next(c)
    }
})
routerAdd("get", "/admin/", (c) => {
    try {
      const html = $template.loadFiles(
        `${__hooks}/views/admin-layout.html`,
        `${__hooks}/views/admin.html`,
      ).render({
      })
      return c.html(200, html)
    }
    catch (error) {
      return console.log(error)
    }
  }, $apis.requireAdminOrRecordAuth()
)

routerAdd("get", "/admin/cats/", (c) => {
    const result = arrayOf(new DynamicModel({
      "id":    "",
      "title": "",
      "publicId": "",
    }))
    $app.dao().db()
      .select("id", "title", "publicId")
      .from("category")
      .where($dbx.exp("is_parent = {:status}", { status: true }))
      .orderBy("created ASC")
      .all(result)

    try {
      const html = $template.loadFiles(
        `${__hooks}/views/admin-layout.html`,
        `${__hooks}/views/admin-cats.html`,
      ).render({
        "records": result,
      })
      return c.html(200, html)
    }
    catch (error) {
      return console.log(error)
    }
 }, $apis.requireAdminOrRecordAuth()
)

routerAdd("get", "/admin/cat/new/", (c) => {
  const parents = arrayOf(new DynamicModel({
    "id":    "",
    "title": "",
  }))
  $app.dao().db()
      .select("id", "title")
      .from("category")
      .where($dbx.exp("is_parent = {:status}", { status: true }))
      .orderBy("created ASC")
      .all(parents)
  try {
    const html = $template.loadFiles(
      `${__hooks}/views/admin-layout.html`,
      `${__hooks}/views/admin-cat-new.html`,
    ).render({
      "parents": parents,
    })
    return c.html(200, html)
  }
  catch (error) {
    return console.log(error)
  }
}, $apis.requireAdminOrRecordAuth()
)
routerAdd("post", "/admin/cat/delete/", (c) => {
  const idRequest = c.request().formValue("id")
  const record = $app.dao().findRecordById("category", idRequest)
  let parentId = record.get("parent")
  $app.dao().deleteRecord(record)
  try {
    if(parentId == null || parentId == undefined || parentId == ""){
      return c.redirect(303, `/admin/cats/?result=deleted`);
    } else {
      return c.redirect(303, `/admin/cat/${parentId}/?result=deleted`);
    }
  } catch (err) {
    console.log(err)
    throw new BadRequestError("failed to create record", err)
  }
}, $apis.requireAdminOrRecordAuth()
)

routerAdd("get", "/admin/cat/:publicId/", (c) => {
    const result = c.request().formValue("result");
    let alertMessage;
    if (result === "success") {
      alertMessage = "<div class='alert alert-success'>Se ha guardado correctamente</div>"
    } else if (result === "deleted") {
      alertMessage = "<div class='alert alert-warning'>Se ha eliminado correctamente</div>"
    }
    let varedit = c.request().formValue("editable");
    let editable
    if (varedit == "true"){
        editable = "true"
    } else {
        editable = "false";
    }
  const idRequest = c.pathParam("publicId")
  let record;
  const parsedId = idRequest;
  if (isNaN(parsedId) === false) {
    record = $app.dao().findFirstRecordByFilter(
      "category", "publicId = {:id}",
      { id: parseInt(idRequest) }
      );
    } else {
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
            `${__hooks}/views/admin-layout.html`,
            `${__hooks}/views/admin-category-parent.html`,
            ).render({
              "records": result,
              "catExport": catExport,
              "editable": editable,
              "result": alertMessage,
            })
            return c.html(200, html)
          }
          catch (error) {
            return console.log(error)
          }
        } else {
          const id = record.get("id")
          const parent = $app.dao().findRecordById("category", record.get("parent"))
          const parentTitle = parent.get("title")
          const parentId = parent.get("id")
          
          const catExport = record.publicExport()
  
      const result = arrayOf(new DynamicModel({
        "id":    "",
        "title": "",
        "portada": "",
        "category": "",
        "publicId": "",
      }))
      const parents = arrayOf(new DynamicModel({
        "id":    "",
        "title": "",
      }))
      $app.dao().db()
          .select("id", "title")
          .from("category")
          .where($dbx.exp("is_parent = {:status}", { status: true }))
          .orderBy("created ASC")
          .all(parents)
  
      $app.dao().db()
        .select("id", "title", "portada", "category", "publicId")
        .from("document")
        .where($dbx.exp("category = {:category}", { category: id }))
        .andWhere($dbx.exp("published = true"))
        .orderBy("created ASC")
        .all(result)
      

        
      try {
        const html = $template.loadFiles(
          `${__hooks}/views/admin-layout.html`,
          `${__hooks}/views/admin-category.html`,
        ).render({
          "records": result,
          "catExport": catExport,
          "editable": editable,
          "parentId": parentId,
          "parentTitle": parentTitle,
          "parents": parents,
          "result": alertMessage,
        })
        return c.html(200, html)
      }
      catch (error) {
        return console.log(error)
      }
    }
  }, $apis.requireAdminOrRecordAuth()
)

routerAdd("post", "/admin/cat/save/", (c) => {
  const typeRequest = c.request().formValue("cmd");
  let record;
  let idRequest;
  let collection;

  if (typeRequest === "new"){
    collection = $app.dao().findCollectionByNameOrId("category")  
    record = new Record(collection)
  } else if (typeRequest === "update") {
    idRequest = c.request().formValue("id");
    record = $app.dao().findRecordById("category", idRequest);
  }
  const form = new RecordUpsertForm($app, record)
  
  // regular fields
  form.loadData({
    "title": c.request().formValue("title"),
    "description": c.request().formValue("description"),
    "parent": c.request().formValue("parent"),
    "is_parent": c.request().formValue("is_parent"),
    "publicId": c.request().formValue("publicId"),
  })

  form.submit()
  if(!idRequest){
    idRequest = record.get("id");
  }
    try {
        return c.redirect(303, `/admin/cat/${idRequest}/?editable=true&result=success`);
      } catch (err) {
        console.log(err)
        throw new BadRequestError("failed to create record", err)
  }
  
}, $apis.requireAdminOrRecordAuth()
)