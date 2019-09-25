import { termStoreId } from "../../constants";
export const JSOM = function(url) {
  const SP = window.SP;
  const Microsoft = window.Microsoft;
  let context;
  if (url) {
    context = new SP.ClientContext(url);
  } else {
    context = new SP.ClientContext.get_current();
  }
  const web = context.get_web();
  const user = web.get_currentUser();

  const publicFunctions = {
    lists: {
      listObj: {},
      setListObj: (listName, listId) => {
        if (listName && listId)
          publicFunctions.lists.listObj[listName] = listId;
      },
      get: listTitleOrId => {
        return new Promise((resolve, reject) => {
          const targetList = getList(listTitleOrId);
          const fields = targetList.get_fields();
          context.load(targetList);
          context.load(fields);
          context.executeQueryAsync(
            () => {
              if (targetList) {
                publicFunctions.lists.setListObj(
                  targetList.get_title(),
                  targetList.get_id().toString()
                );
              }
              resolve({ targetList, fields });
            },
            (sender, args) => {
              console.log(sender);
              console.log(
                "Request failed. " +
                  args.get_message() +
                  "\n" +
                  args.get_stackTrace()
              );
              reject(args);
            }
          );
        });
      },
      getItems: (listTitleOrId, caml, position, viewFields) => {
        return new Promise((resolve, reject) => {
          const targetList = getList(listTitleOrId);
          let query;
          if (caml) {
            query = caml;
          } else {
            query =
              "<View Scope='RecursiveAll'><Query><OrderBy><FieldRef Name='ID' Ascending='FALSE'></FieldRef></OrderBy></Query></View>";
          }
          const camlQuery = new SP.CamlQuery();
          camlQuery.set_listItemCollectionPosition(position);
          camlQuery.set_viewXml(query);
          const targetListItems = targetList.getItems(camlQuery);
          context.load(targetList);
          let fieldsText = "";
          if (viewFields) {
            const l = viewFields.length;
            let i = 1;
            viewFields.map(value => {
              fieldsText += value + (i < l ? ", " : "");
              i++;
            });
            context.load(targetListItems, "Include(" + fieldsText + ")");
          } else {
            context.load(targetListItems);
          }
          context.executeQueryAsync(
            () => {
              if (targetList) {
                publicFunctions.lists.setListObj(
                  targetList.get_title(),
                  targetList.get_id().toString()
                );
              }
              resolve({targetListItems, targetList});
            },
            (sender, args) => {
              console.log(sender);
              console.log(
                "Request failed. " +
                  args.get_message() +
                  "\n" +
                  args.get_stackTrace()
              );
              reject(args);
            }
          );
        });
      },
      addItems: (listTitleOrId, arr) => {
        return new Promise((resolve, reject) => {
          const targetList = getList(listTitleOrId);
          const listItemInfo = new SP.ListItemCreationInformation();
          let targetListItems;
          arr.map(arrValue => {
            targetListItems = targetList.addItem(listItemInfo);
            Object.keys(arrValue).map(fieldName => {
              if (fieldName !== "ID") {
                targetListItems.set_item(fieldName, arrValue[fieldName]);
              }
            });
            targetListItems.update();
          });
          context.executeQueryAsync(
            () => {
              resolve(targetListItems);
            },
            (sender, args) => {
              console.log(sender);
              console.log(
                "Request failed. " +
                  args.get_message() +
                  "\n" +
                  args.get_stackTrace()
              );
              reject(args);
            }
          );
        });
      },
      updateItems: (listTitleOrId, arr) => {
        return new Promise((resolve, reject) => {
          var targetList = getList(listTitleOrId);
          let targetListItems;
          arr.map(arrValue => {
            targetListItems = targetList.getItemById(arrValue.ID);
            Object.keys(arrValue).map(fieldName => {
              if (fieldName !== "ID") {
                targetListItems.set_item(fieldName, arrValue[fieldName]);
              }
            });
            targetListItems.update();
          });
          context.executeQueryAsync(
            () => {
              if (targetList) {
                publicFunctions.lists.setListObj(
                  targetList.get_title(),
                  targetList.get_id().toString()
                );
              }
              resolve(targetListItems);
            },
            (sender, args) => {
              console.log(sender);
              console.log(
                "Request failed. " +
                  args.get_message() +
                  "\n" +
                  args.get_stackTrace()
              );
              reject(args);
            }
          );
        });
      },
      deleteItems: (listTitleOrId, arr) => {
        return new Promise((resolve, reject) => {
          var targetList = getList(listTitleOrId);
          var targetListItems;
          arr.map(arrValue => {
            targetListItems = targetList.getItemById(arrValue.ID);
            targetListItems.deleteObject();
          });
          context.executeQueryAsync(
            () => {
              if (targetList) {
                publicFunctions.lists.setListObj(
                  targetList.get_title(),
                  targetList.get_id().toString()
                );
              }
              resolve(targetListItems);
            },
            (sender, args) => {
              console.log(sender);
              console.log(
                "Request failed. " +
                  args.get_message() +
                  "\n" +
                  args.get_stackTrace()
              );
              reject(args);
            }
          );
        });
      },
      getListTitle: listId => {
        return new Promise((resolve, reject) => {
          var targetList = getList(listId);
          context.load(targetList);
          context.executeQueryAsync(
            () => {
              if (targetList) {
                publicFunctions.lists.setListObj(
                  targetList.get_title(),
                  targetList.get_id().toString()
                );
              }
              resolve(targetList);
            },
            (sender, args) => {
              console.log(sender);
              console.log(
                "Request failed. " +
                  args.get_message() +
                  "\n" +
                  args.get_stackTrace()
              );
              reject(args);
            }
          );
        });
      }
    },
    terms: {
      get: termSetIdArr => {
        return new Promise((resolve, reject) => {
          var session = SP.Taxonomy.TaxonomySession.getTaxonomySession(context);
          var termStore = session.get_termStores().getById(termStoreId);
          var termsList = [];
          var termSet = [];
          var i = 0;
          termSetIdArr.map(value => {
            termSet[i] = termStore.getTermSet(value);
            termsList[i] = termSet[i].getAllTerms();
            context.load(termSet[i]);
            context.load(
              termsList[i],
              "Include(IsRoot, Labels, TermsCount, CustomSortOrder, Id, Name, PathOfTerm, TermSet.Name, LocalCustomProperties, IsDeprecated)"
            );
            i++;
          });
          context.executeQueryAsync(
            () => {
              resolve({ termsList, termSet });
            },
            (sender, args) => {
              console.log(sender);
              console.log(
                "Request failed. " +
                  args.get_message() +
                  "\n" +
                  args.get_stackTrace()
              );
              reject(args);
            }
          );
        });
      }
    },
    files: {
      createDocFolder: function(libName, folderName) {
        return new Promise((resolve, reject) => {
          var folder = context
            .get_web()
            .getFolderByServerRelativeUrl("/" + libName + "/" + folderName);
          context.load(folder, "Exists", "Name");
          context.executeQueryAsync(
            () => {
              resolve();
              console.log("Папка уже существует");
            },
            () => {
              console.log("Папки нет, создаем ее");
              var oList = context
                .get_web()
                .get_lists()
                .getByTitle(libName);
              var itemCreateInfo = new SP.ListItemCreationInformation();
              itemCreateInfo.set_underlyingObjectType(
                SP.FileSystemObjectType.folder
              );
              itemCreateInfo.set_leafName(folderName);
              var item = oList.addItem(itemCreateInfo);
              item.set_item("ContentTypeId", "0x0120");
              item.set_item("Title", folderName);
              item.update();
              context.load(item);
              context.executeQueryAsync(
                function() {
                  resolve();
                },
                function() {
                  reject();
                }
              );
            }
          );
        });
      },
      update: arr => {
        return new Promise((resolve, reject) => {
          let file;
          let listItem;
          arr.map(obj => {
            file = web.getFileByServerRelativeUrl(obj.filePath);
            listItem = file.get_listItemAllFields();
            Object.keys(obj).map(fieldName => {
              if (
                fieldName !== "" &&
                obj[fieldName] &&
                fieldName !== "filePath"
              ) {
                listItem.set_item(fieldName, obj[fieldName]);
              }
            });
            listItem.update();
          });
          context.executeQueryAsync(
            () => {
              resolve(listItem);
            },
            (sender, args) => {
              console.log(sender);
              console.log(
                "Request failed. " +
                  args.get_message() +
                  "\n" +
                  args.get_stackTrace()
              );
              reject(args);
            }
          );
        });
      }
    },
    users: {
      getCurrent: () => {
        return new Promise((resolve, reject) => {
          context.load(user);
          context.executeQueryAsync(
            () => {
              resolve(user);
            },
            (sender, args) => {
              console.log(sender);
              console.log(
                "Request failed. " +
                  args.get_message() +
                  "\n" +
                  args.get_stackTrace()
              );
              reject(args);
            }
          );
        });
      },
      get: usersArr => {
        const self = publicFunctions.users;
        return new Promise((resolve, reject) => {
          var requestSearchUserArr = [];
          var requestUserArr = [];
          usersArr.map(userId => {
            if (userId) {
              if (typeof userId == "string" && userId.indexOf("|") > -1) {
                requestSearchUserArr.push(userId);
              } else {
                requestUserArr.push(userId);
              }
            }
          });
          if (requestSearchUserArr.length > 0) {
            var collListItemArr = [];
            requestSearchUserArr.map(userID => {
              var currentUser = web.ensureUser(userID.replace(/_/, "\\"));
              collListItemArr.push(currentUser);
              context.load(currentUser);
            });
            context.executeQueryAsync(
              () => {
                collListItemArr.map(acitem => {
                  var check = true;
                  if (requestUserArr.indexOf(acitem.get_id()) !== -1) {
                    check = false;
                  }
                  if (check) {
                    requestUserArr.push(acitem.get_id());
                  }
                });
                self.userFullInfo(requestUserArr).then(data => {
                  const groups = groupsList(data.groups);
                  resolve(data, groups);
                });
              },
              (sender, args) => {
                console.log(sender);
                console.log(
                  "Request failed. " +
                    args.get_message() +
                    "\n" +
                    args.get_stackTrace()
                );
                reject(args);
              }
            );
          } else if (requestUserArr.length > 0) {
            self.userFullInfo(requestUserArr).then(data => {
              const groups = groupsList(data.groups);
              resolve(data, groups);
            });
          } else {
            resolve();
          }
          function groupsList(groups) {
            if (groups) {
              var groupUserEnumerator = groups.getEnumerator();
              const groups = [];
              while (groupUserEnumerator.moveNext()) {
                var groupUser = groupUserEnumerator.get_current();
                groups.push({
                  name: groupUser.get_title(),
                  id: groupUser.get_id()
                });
              }
              return groups;
            }
          }
        });
      },
      userFullInfo: userArr => {
        return new Promise((resolve, reject) => {
          var userInfoList = web.get_siteUserInfoList();
          var camlQuery = new SP.CamlQuery();
          var collListItemArr = [];
          var collListItem;
          var groups = user.get_groups();
          userArr.map(userID => {
            camlQuery.set_viewXml(
              "<View><Query><Where><Eq><FieldRef Name='ID'/><Value Type='Number'>" +
                userID +
                "</Value></Eq></Where></Query><RowLimit>1</RowLimit></View>"
            );
            collListItem = userInfoList.getItems(camlQuery);
            collListItemArr.push(collListItem);
            context.load(collListItem);
          });
          context.load(groups);
          context.executeQueryAsync(
            () => {
              resolve(collListItemArr, groups);
            },
            (sender, args) => {
              console.log(sender);
              console.log(
                "Request failed. " +
                  args.get_message() +
                  "\n" +
                  args.get_stackTrace()
              );
              reject(args);
            }
          );
        });
      }
    },
    search: {
      people: (key, searchFields) => {
        return new Promise((resolve, reject) => {
          var keywordQuery = new Microsoft.SharePoint.Client.Search.Query.KeywordQuery(
            context
          );
          keywordQuery.set_queryText(key);
          var properties = keywordQuery.get_selectProperties();
          if (searchFields) {
            searchFields.map(value => {
              properties.add(value);
            });
          }
          keywordQuery.set_sourceId("b09a7990-05ea-4af9-81ef-edfab16c4e31");
          var searchExecutor = new Microsoft.SharePoint.Client.Search.Query.SearchExecutor(
            context
          );
          var results = searchExecutor.executeQuery(keywordQuery);
          context.executeQueryAsync(
            () => {
              resolve(results);
            },
            (sender, args) => {
              console.log(sender);
              console.log(
                "Request failed. " +
                  args.get_message() +
                  "\n" +
                  args.get_stackTrace()
              );
              reject(args);
            }
          );
        });
      },
      mentionSearch: function(key) {
        return new Promise((resolve, reject) => {
          var keywordQuery = new Microsoft.SharePoint.Client.Search.Query.KeywordQuery(
            context
          );
          key = key.trim();
          var keyText = key;
          key = "";
          key =
            key +
            "(LastName:" +
            keyText +
            "* OR " +
            "FirstName:" +
            keyText +
            "*)";
          keywordQuery.set_queryText(key);
          var properties = keywordQuery.get_selectProperties();
          properties.add("LastName");
          properties.add("FirstName");
          keywordQuery.set_startRow(0);
          keywordQuery.set_trimDuplicates(true);
          keywordQuery.set_rowLimit(500);
          keywordQuery.set_sourceId("b09a7990-05ea-4af9-81ef-edfab16c4e31");
          var searchExecutor = new Microsoft.SharePoint.Client.Search.Query.SearchExecutor(
            context
          );
          const results = searchExecutor.executeQuery(keywordQuery);
          context.executeQueryAsync(
            () => {
              resolve(results);
            },
            (sender, args) => {
              console.log(sender);
              console.log(
                "Request failed. " +
                  args.get_message() +
                  "\n" +
                  args.get_stackTrace()
              );
              reject(args);
            }
          );
        });
      },
      text: function(
        text,
        contentTypeId,
        propertiesArr,
        quantity,
        startRow,
        orderByFieldNames,
        pathArr,
        sourceid
      ) {
        return new Promise((resolve, reject) => {
          var ctypeText = "";
          quantity = quantity || 10;
          startRow = startRow || 0;
          if (contentTypeId) {
            var ctypeLength = contentTypeId.length;
            ctypeText += " AND (";
            contentTypeId.map((value, index) => {
              ctypeText += "ContentTypeId:" + value + "*";
              if (index < ctypeLength - 1) {
                ctypeText += " OR ";
              }
            });
            ctypeText += ")";
          }
          var pathText = "";
          if (pathArr) {
            var pathLength = pathArr.length;
            pathText += " AND (";
            pathArr.map((value, index) => {
              pathText += "Path:" + value;
              if (index < pathLength - 1) {
                pathText += " OR ";
              }
            });
            pathText += ")";
          }
          let key = "(" + text + ") " + pathText + ctypeText;

          var keywordQuery = new Microsoft.SharePoint.Client.Search.Query.KeywordQuery(
            context
          );
          keywordQuery.set_trimDuplicates(false);
          keywordQuery.set_queryText(key);
          var properties = keywordQuery.get_selectProperties();
          if (propertiesArr) {
            propertiesArr.map(propertie => {
              properties.add([propertie]);
            });
          }
          keywordQuery.set_rowLimit(quantity);
          keywordQuery.set_enableSorting(true);
          keywordQuery.set_startRow(startRow);
          keywordQuery.set_enablePhonetic(true);
          var culture = 1049;
          keywordQuery.set_culture(culture);
          if (sourceid) {
            keywordQuery.set_sourceId(sourceid);
          }
          var sort = keywordQuery.get_sortList();
          if (typeof orderByFieldNames == "object") {
            orderByFieldNames.map(value => {
              if (value.asc === true) {
                value.asc = 1;
              } else {
                value.asc = 0;
              }
              sort.add(value.name, value.asc);
            });
          }
          var searchExecutor = new Microsoft.SharePoint.Client.Search.Query.SearchExecutor(
            context
          );
          var results = searchExecutor.executeQuery(keywordQuery);

          context.executeQueryAsync(
            () => {
              resolve(results);
            },
            (sender, args) => {
              console.log(sender);
              console.log(
                "Request failed. " +
                  args.get_message() +
                  "\n" +
                  args.get_stackTrace()
              );
              reject(args);
            }
          );
        });
      }
    }
  };
  function getList(listTitleOrId) {
    var testListTitleId = listTitleOrId.trim().split("-");
    if (
      testListTitleId.length === 5 &&
      testListTitleId[0].length === 8 &&
      testListTitleId[1].length === 4 &&
      testListTitleId[2].length === 4 &&
      testListTitleId[3].length === 4 &&
      testListTitleId[4].length === 12
    ) {
      return web.get_lists().getById(listTitleOrId);
    } else {
      return web.get_lists().getByTitle(listTitleOrId);
    }
  }
  return publicFunctions;
};
