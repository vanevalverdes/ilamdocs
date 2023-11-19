  // Función para construir el TabNav o el Card con FormFields
  function construirElementoBootstrap(section, url) {
    const divSection = document.getElementById("divConstructor");
    if (section.type === "tab") {
      // Construir el TabNav
      const tabNav = document.createElement("ul");
      tabNav.classList.add("nav", "nav-tabs");
      const tabContent = document.createElement("div");
      tabContent.classList.add("tab-content");
      section.tabs.forEach((tab, index) => {
        const tabItem = document.createElement("li");
        tabItem.classList.add("nav-item");
        const tabLink = document.createElement("a");
        tabLink.classList.add("nav-link");
        tabLink.setAttribute("id", `tab-${index}`);
        tabLink.setAttribute("data-toggle", "tab");
        tabLink.setAttribute("href", `#tab-content-${index}`);
        tabLink.innerText = tab.title;
        tabItem.appendChild(tabLink);
        tabNav.appendChild(tabItem);
        
        const tabContentElement = document.createElement("div");
        tabContentElement.classList.add("tab-pane");
        tabContentElement.classList.add("fade"); 
        if(index == "0"){
          tabContentElement.classList.add("active"); 
          tabContentElement.classList.add("show"); 
        }
        tabContentElement.setAttribute("id", `tab-content-${index}`);
        tabContent.appendChild(tabContentElement)
        const form = document.createElement("form");
        form.setAttribute("action", url);
        form.setAttribute("method", "POST");
        tab.fields.forEach((field, index) => {
        // Construir el FormField dentro del TabContent
        const formField = construirFormField(field);
        formField.id = `tab-content-${index}`;
        form.appendChild(formField);
        });
      });
      if (section.editable === "true"){
        // create a submit button
        var s = document.createElement("input");
        s.setAttribute("type", "submit");
        s.setAttribute("value", "Guardar");
        s.classList.add("btn");
        s.classList.add("btn-success");
        s.classList.add("mt-3");
        form.appendChild(s);
        } else {
            // create a submit button
            var s = document.createElement("a");
            s.setAttribute("href", "?editable=true");
            var text = document.createTextNode("Editar");
            s.classList.add("btn");
            s.classList.add("btn-secondary");
            s.classList.add("mt-3");
            s.appendChild(text);
            form.appendChild(s);
      }
      tabNav.appendChild(form);
      divSection.appendChild(tabNav);
      divSection.appendChild(tabContent);
    } else if (section.type === "paragraph") {
      // Construir el Card
      section.tabs.forEach((tab, index) => {
        const card = document.createElement("div");
        card.classList.add("card", "m-3");
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        const cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");
        cardTitle.innerText = tab.title;
        cardBody.appendChild(cardTitle);
        const form = document.createElement("form");
        form.action = url;
        form.method = "POST";
        tab.fields.forEach((field) => {
          // Construir el FormField dentro del CardBody
          const formField = construirFormField(field);
          form.appendChild(formField);
        });
        if (section.editable === "true"){
            // create a submit button
            var s = document.createElement("input");
            s.setAttribute("type", "submit");
            s.setAttribute("value", "Guardar");
            s.classList.add("btn");
            s.classList.add("btn-success");
            s.classList.add("mt-3");
            form.appendChild(s);
        } else {
            // create a submit button
            var s = document.createElement("a");
            s.setAttribute("href", "?editable=true");
            var text = document.createTextNode("Editar");
            s.classList.add("btn");
            s.classList.add("btn-secondary");
            s.classList.add("mt-3");
            s.appendChild(text);
            form.appendChild(s);
        }
        cardBody.appendChild(form);
        card.appendChild(cardBody);
        divSection.appendChild(card);
      });
    }
  }

  // Función para construir un FormField
  function construirFormField(field) {
    const formField = document.createElement("div");
    formField.classList.add("form-group");
    const label = document.createElement("label");
    label.innerText = field.field.label;
    formField.appendChild(label);

    switch (field.field.type) {
      case "textarea":
        const textarea = document.createElement("textarea");
        textarea.classList.add(field.field.class);
        if(field.field.editable === "false"){
            textarea.setAttribute("readonly","readonly");
            textarea.classList.add("form-control-plaintext"); 
        } else {
            textarea.classList.add("form-control"); 
        }
        textarea.value = field.field.value;
        Object.keys(field.field.attr).forEach((attr) => {
          textarea.setAttribute(attr, field.field.attr[attr]);
        });
        formField.appendChild(textarea);
        break;
      case "text":
      case "number":
      case "email":
      case "date":
      case "file":
        const input = document.createElement("input");
        input.type = field.field.type;
        if (field.field.required === "true") {
          input.required = true;
        }
        input.classList.add(field.field.class); 
        if(field.field.editable === "false"){
            input.setAttribute("readonly","readonly");
            input.classList.add("form-control-plaintext"); 
        } else {
            input.classList.add("form-control"); 
        }
        input.value = field.field.value;
        Object.keys(field.field.attr).forEach((attr) => {
          input.setAttribute(attr, field.field.attr[attr]);
        });
        formField.appendChild(input);
        break;
      case "select":
        const select = document.createElement("select");
        select.classList.add(field.field.class);
        Object.keys(field.field.attr).forEach((attr) => {
          select.setAttribute(attr, field.field.attr[attr]);
        });
        if(field.field.editable === "false"){
            select.setAttribute("readonly","readonly");
            select.classList.add("form-control-plaintext"); 
        } else {
            select.classList.add("form-control"); 
        }
        // Asumiendo que field.field.options es un array de opciones
        if (Array.isArray(field.field.options)) {
          field.field.options.forEach((option) => {
            const optionElement = document.createElement("option");
            optionElement.value = option.value;
            optionElement.innerText = option.label;
            if (option.selected) {
              optionElement.selected = true;
            }
            select.appendChild(optionElement);
          });
        }

        formField.appendChild(select);
        break;
      // Puedes agregar más casos según sea necesario
      default:
        console.log(`${field.field.label} tiene un tipo desconocido.`);
        // Puedes manejar otros tipos aquí
    }

    return formField;
  }