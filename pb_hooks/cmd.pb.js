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