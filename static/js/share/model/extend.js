// Generated by LiveScript 1.3.1
var base;
base = function(model){
  base.dataset = new model({
    name: 'dataset',
    types: ['csv', 'json'],
    base: {
      owner: {
        required: true,
        type: model.type.key({
          type: model.type.user
        })
      },
      parent: {
        required: false,
        type: model.type.key({
          type: base.theme
        })
      },
      name: {
        max: 100,
        min: 1,
        required: true,
        type: model.type.string
      },
      description: {
        max: 512,
        required: false,
        type: model.type.string
      },
      rows: {
        require: true,
        type: model.type.number
      },
      size: {
        require: true,
        type: model.type.number
      },
      tags: {
        required: false,
        type: model.type.array({
          max: 50,
          min: 1,
          type: model.type.string
        })
      },
      likes: {
        required: false,
        type: model.type.number
      },
      searchable: {
        required: false,
        type: model.type.boolean
      },
      createdtime: {
        required: false,
        type: model.type.date
      },
      modifiedtime: {
        required: false,
        type: model.type.date
      },
      permission: {
        type: model.type.permission
      },
      type: {
        required: true,
        type: model.type.string
      },
      format: {
        required: true,
        type: model.type.string
      },
      config: {
        required: false,
        max: 1024,
        type: model.type.json
      }
    }
  });
  base.datafield = new model({
    name: 'datafield',
    base: {
      dataset: {
        required: true,
        type: model.type.key({
          type: base.dataset
        })
      },
      datasetname: {
        required: true,
        type: model.type.string
      },
      name: {
        required: true,
        type: model.type.string
      },
      location: {
        required: true,
        type: model.type.string
      },
      datatype: {
        type: model.type.string
      },
      hash: {
        type: model.type.string
      },
      data: {
        type: model.type.json
      }
    }
  });
  base.dataset.config.base.fields = {
    require: true,
    type: model.type.array({
      type: base.datafield
    })
  };
  base.file = new model({
    name: 'file',
    base: {
      name: {
        max: 100,
        min: 1,
        required: false,
        type: model.type.string
      },
      type: {
        max: 20,
        min: 1,
        required: false,
        type: model.type.string
      },
      content: {
        required: false,
        type: model.type.string
      }
    }
  });
  base.theme = new model({
    name: 'theme',
    defaultFields: true,
    base: {
      name: {
        max: 100,
        min: 1,
        required: true,
        type: model.type.string
      },
      owner: {
        required: true,
        type: model.type.key({
          type: model.type.user
        })
      },
      chart: {
        require: false,
        type: model.type.number
      },
      parent: {
        required: false,
        type: model.type.key({
          type: base.theme
        })
      },
      description: {
        max: 512,
        required: false,
        type: model.type.string
      },
      tags: {
        required: false,
        type: model.type.array({
          max: 50,
          min: 1,
          type: model.type.string
        })
      },
      likes: {
        required: false,
        type: model.type.number
      },
      searchable: {
        required: false,
        type: model.type.boolean
      },
      createdtime: {
        required: false,
        type: model.type.date
      },
      modifiedtime: {
        required: false,
        type: model.type.date
      },
      doc: {
        type: base.file
      },
      style: {
        type: base.file
      },
      code: {
        type: base.file
      },
      assets: {
        required: false,
        type: model.type.array({
          type: base.file
        })
      },
      permission: {
        type: model.type.permission
      }
    }
  });
  base.chart = new model({
    name: 'chart',
    defaultFields: true,
    base: {
      name: {
        max: 100,
        min: 1,
        required: true,
        type: model.type.string
      },
      owner: {
        required: true,
        type: model.type.key({
          type: model.type.user
        })
      },
      theme: {
        required: false,
        type: model.type.key({
          type: base.theme
        })
      },
      parent: {
        required: false,
        type: model.type.key({
          type: base.chart
        })
      },
      description: {
        max: 500,
        required: false,
        type: model.type.string
      },
      basetype: {
        max: 20,
        required: false,
        type: model.type.array({
          max: 20,
          type: model.type.string
        })
      },
      visualencoding: {
        max: 10,
        required: false,
        type: model.type.array({
          max: 20,
          type: model.type.string
        })
      },
      category: {
        max: 10,
        required: false,
        type: model.type.array({
          max: 20,
          type: model.type.string
        })
      },
      tags: {
        required: false,
        type: model.type.array({
          max: 50,
          type: model.type.string
        })
      },
      likes: {
        required: false,
        type: model.type.number
      },
      searchable: {
        required: false,
        type: model.type.boolean
      },
      dimlen: {
        required: true,
        type: model.type.number
      },
      dimension: {
        required: false,
        type: model.type.json
      },
      config: {
        required: false,
        type: model.type.json
      },
      createdtime: {
        required: false,
        type: model.type.date
      },
      modifiedtime: {
        required: false,
        type: model.type.date
      },
      doc: {
        type: base.file
      },
      style: {
        type: base.file
      },
      code: {
        type: base.file
      },
      assets: {
        required: false,
        type: model.type.array({
          type: base.file
        })
      },
      permission: {
        required: false,
        type: model.type.permission
      },
      library: {
        required: false,
        type: model.type.array({
          type: model.type.string
        })
      }
    }
  });
  base.palette = new model({
    name: 'palette',
    defaultFields: true,
    base: {
      name: {
        max: 100,
        min: 1,
        required: true,
        type: model.type.string
      },
      owner: {
        required: true,
        type: model.type.key({
          type: model.type.user
        })
      },
      description: {
        max: 200,
        required: false,
        type: model.type.string
      },
      colors: {
        required: false,
        type: model.type.json
      },
      createdtime: {
        required: false,
        type: model.type.date
      },
      modifiedtime: {
        required: false,
        type: model.type.date
      },
      permission: {
        required: false,
        type: model.type.permission
      }
    }
  });
  base.request = new model({
    name: 'request',
    defaultFields: true,
    base: {
      owner: {
        required: true,
        type: model.type.key({
          type: model.type.user
        })
      },
      name: {
        max: 100,
        min: 1,
        required: true,
        type: model.type.string
      },
      config: {
        required: false,
        type: model.type.json
      }
    }
  });
  base.comment = new model({
    name: 'discussion',
    defaultFields: true,
    base: {
      owner: {
        required: true,
        type: model.type.key({
          type: model.type.user
        })
      },
      content: {
        required: true,
        type: model.type.stirng
      },
      request: {
        required: false,
        type: model.type.key({
          type: model.type.request
        })
      },
      main: {
        required: false,
        type: model.type.boolean
      }
    }
  });
  return base;
};
module.exports = base;