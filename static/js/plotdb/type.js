// Generated by LiveScript 1.3.1
var plotdb;
if (!(typeof plotdb != 'undefined' && plotdb !== null)) {
  plotdb = {};
}
plotdb.String = {
  name: 'String',
  'default': "",
  level: 2,
  basetype: [],
  test: function(){
    return true;
  },
  parse: function(it){
    return it || "";
  }
};
plotdb.Order = {
  name: 'Order',
  'default': function(k, v, i){
    return i;
  },
  level: 4,
  basetype: [plotdb.String],
  test: function(v){
    return !!plotdb.OrderTypes.map(function(type){
      return type.test(v);
    }).filter(function(it){
      return it;
    })[0];
  },
  parse: function(it){
    return it;
  },
  order: {
    Ascending: function(a, b){
      if (b > a) {
        return -1;
      } else if (b < a) {
        return 1;
      } else {
        return 0;
      }
    },
    Descending: function(a, b){
      if (b > a) {
        return 1;
      } else if (b < a) {
        return -1;
      } else {
        return 0;
      }
    }
  },
  sort: function(data, fieldname, isAscending){
    var field, types, i$, to$, i, j$, to1$, j, type, sorter;
    isAscending == null && (isAscending = true);
    field = fieldname ? data.map(function(it){
      return it[fieldname];
    }) : data;
    types = plotdb.OrderTypes.map(function(it){
      return it;
    });
    for (i$ = 0, to$ = field.length; i$ < to$; ++i$) {
      i = i$;
      for (j$ = 0, to1$ = types.length; j$ < to1$; ++j$) {
        j = j$;
        if (!types[j].test(field[i])) {
          types[j] = null;
        }
      }
      types = types.filter(fn$);
    }
    type = types[0];
    sorter = ((type || {}).order || this.order)[isAscending ? 'Ascending' : 'Descending'];
    if (fieldname) {
      if (type) {
        for (i$ = 0, to$ = data.length; i$ < to$; ++i$) {
          i = i$;
          data[i][fieldname] = type.parse(data[i][fieldname]);
        }
      }
      return data.sort(function(a, b){
        return sorter(a[fieldname], b[fieldname]);
      });
    } else {
      if (type) {
        for (i$ = 0, to$ = data.length; i$ < to$; ++i$) {
          i = i$;
          data[i] = type.parse(data[i]);
        }
      }
      return data.sort(sorter);
    }
    function fn$(it){
      return it;
    }
  }
};
plotdb.Boolean = {
  name: 'Boolean',
  'default': true,
  level: 8,
  basetype: [plotdb.Order],
  test: function(it){
    return !!/^(true|false|yes|no|[yntf01])$/.exec(it);
  },
  parse: function(it){
    if (it && typeof it === 'string') {
      if (/^(yes|true|[yt])$/.exec(it.trim())) {
        return true;
      }
      if (/\d+/.exec(it.trim()) && it.trim() !== "0") {
        return true;
      }
      return false;
    }
    return !!it;
  },
  order: {
    Descending: function(a, b){
      return b - a;
    },
    Ascending: function(a, b){
      return a - b;
    },
    index: function(it){
      if (it) {
        return 1;
      } else {
        return 0;
      }
    }
  }
};
plotdb.Bit = {
  name: 'Bit',
  'default': 0,
  level: 10,
  basetype: [plotdb.Boolean],
  test: function(it){
    return !!/^[01]$/.exec(it);
  },
  parse: function(it){
    return !it || it === "0" ? 0 : 1;
  },
  order: {
    Descending: function(a, b){
      return b - a;
    },
    Ascending: function(a, b){
      return a - b;
    },
    index: function(it){
      return it;
    }
  }
};
plotdb.Numstring = {
  name: 'Numstring',
  'default': "",
  level: 6,
  basetype: [plotdb.Order],
  test: function(it){
    return /\d+/.exec(it + "");
  },
  parse: function(it){
    var numbers, num, i$, to$, j;
    numbers = [];
    num = it.split
      ? it.split(/\.?[^0-9.]+/g)
      : [it];
    for (i$ = 0, to$ = num.length; i$ < to$; ++i$) {
      j = i$;
      if (num[j]) {
        numbers.push(parseFloat(num[j]));
      }
    }
    return {
      raw: it,
      numbers: numbers,
      len: numbers.length,
      toString: function(){
        return this.raw;
      }
    };
  },
  order: {
    Ascending: function(a, b){
      var na, nb, i$, to$, i, v;
      if (!a) {
        return !b
          ? 0
          : -1;
      }
      na = a.numbers;
      nb = b.numbers;
      for (i$ = 0, to$ = a.len; i$ < to$; ++i$) {
        i = i$;
        v = na[i] - nb[i];
        if (v) {
          return v;
        }
      }
      return a.len - b.len;
    },
    Descending: function(a, b){
      return plotdb.Numstring.order.Ascending(b, a);
    },
    index: function(it){
      return it.numbers[0];
    }
  }
};
plotdb.Number = {
  name: 'Number',
  'default': 0,
  level: 8,
  basetype: [plotdb.Numstring],
  test: function(it){
    return !isNaN(+((it || '') + "").replace(/,/g, '').replace(/%$/, ''));
  },
  parse: function(it){
    if (typeof it === 'string') {
      it = parseFloat(it.replace(/,/g, ''));
      if (/%$/.exec(it)) {
        it = (+it.replace(/%$/, '')) / 100;
      }
    }
    return +it;
  },
  order: {
    Ascending: function(a, b){
      return a - b;
    },
    Descending: function(a, b){
      return b - a;
    },
    index: function(it){
      return it;
    }
  }
};
plotdb.Date = {
  name: 'Date',
  'default': '1970/1/1',
  level: 8,
  basetype: [plotdb.Numstring],
  test: function(it){
    return !/^\d*$/.exec(it) && this.parse(it) ? true : false;
  },
  parse: function(it){
    var d, ret;
    d = new Date(it);
    if (!(d instanceof Date) || isNaN(d.getTime())) {
      ret = /^(\d{1,2})[/-](\d{4})$/.exec(it);
      if (!ret) {
        return null;
      }
      d = new Date(ret[2], parseInt(ret[1]) - 1);
    }
    return {
      raw: it,
      toString: function(){
        return this.raw;
      },
      parsed: d
    };
  },
  order: {
    Ascending: function(a, b){
      return a.parsed.getTime() - b.parsed.getTime();
    },
    Descending: function(a, b){
      return b.parsed.getTime() - a.parsed.getTime();
    },
    index: function(it){
      return it.parsed.getTime();
    }
  }
};
plotdb.Weekday = {
  name: 'Weekday',
  'default': 'Mon',
  level: 8,
  basetype: [plotdb.Order],
  values: {
    abbr: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
    en: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    zh: ['週一', '週二', '週三', '週四', '週五', '週六', '週日']
  },
  test: function(it){
    var value, k, ref$, v, idx;
    value = typeof it === 'string' ? it.toLowerCase() : it;
    for (k in ref$ = this.values) {
      v = ref$[k];
      idx = v.indexOf(value);
      if (idx >= 0) {
        return true;
      }
    }
    return false;
  },
  parse: function(it){
    return it;
  },
  order: {
    index: function(it){
      var value, k, ref$, v, idx;
      value = it.toLowerCase();
      for (k in ref$ = plotdb.Weekday.values) {
        v = ref$[k];
        idx = v.indexOf(value);
        if (idx >= 0) {
          return idx;
        }
      }
      return -1;
    },
    Ascending: function(a, b){
      a = plotdb.Weekday.order.index(a);
      b = plotdb.Weekday.order.index(b);
      return a - b;
    },
    Descending: function(a, b){
      a = plotdb.Weekday.order.index(a);
      b = plotdb.Weekday.order.index(b);
      return b - a;
    }
  }
};
plotdb.Month = {
  name: 'Month',
  'default': 'Jan',
  level: 8,
  basetype: [plotdb.Order],
  values: {
    abbr: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
    en: ['january', 'feburary', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'],
    zh: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
  },
  test: function(it){
    var value, k, ref$, v, idx;
    value = typeof it === 'string' ? it.toLowerCase() : it;
    for (k in ref$ = this.values) {
      v = ref$[k];
      idx = v.indexOf(value);
      if (idx >= 0) {
        return true;
      }
    }
    return false;
  },
  parse: function(it){
    return it;
  },
  order: {
    index: function(it){
      var value, k, ref$, v, idx;
      value = it.toLowerCase();
      for (k in ref$ = plotdb.Month.values) {
        v = ref$[k];
        idx = v.indexOf(value);
        if (idx >= 0) {
          return idx;
        }
      }
      return -1;
    },
    Ascending: function(a, b){
      a = plotdb.Month.order.index(a);
      b = plotdb.Month.order.index(b);
      return a - b;
    },
    Descending: function(a, b){
      a = plotdb.Month.order.index(a);
      b = plotdb.Month.order.index(b);
      return b - a;
    }
  }
};
plotdb.Range = {
  name: 'Range',
  'default': [0, 1],
  test: function(it){
    return !!plotdb.Range.parse(it);
  },
  parse: function(it){
    var e;
    if (typeof it === 'string') {
      try {
        it = JSON.parse(it);
      } catch (e$) {
        e = e$;
        return false;
      }
    }
    if (Array.isArray(it) && it.length === 2) {
      it[0] = parseFloat(it[0]);
      it[1] = parseFloat(it[1]);
      if (isNaN(it[0]) || isNaN(it[1])) {
        return null;
      }
      return it;
    }
    return null;
  }
};
plotdb.Choice = function(v){
  return {
    'default': "",
    name: 'Choice',
    level: 20,
    test: function(it){
      return v && v.length && in$(it, v);
    },
    values: v
  };
};
plotdb.Color = {
  name: 'Color',
  level: 10,
  test: function(it){
    return !/(rgba?|hsla?)\([0-9.,]+\)|#[0-9a-f]{3,6}|[a-z0-9]+/.exec(it.trim());
  },
  'default': '#dc4521',
  Gray: '#cccccc',
  Positive: '#3f7ab5',
  Negative: '#d93510',
  Neutral: '#cccccc',
  Empty: '#ffffff',
  subtype: {
    negative: "negative",
    positive: "positive",
    neutral: "neutral"
  }
};
plotdb.Palette = {
  name: 'Palette',
  level: 30,
  re: /^((rgb|hsl)\((\s*[0-9.]+\s*,){2}\s*[0-9.]+\s*\)|(rgb|hsl)a\((\s*[0-9.]+\s*,){3}\s*[0-9.]+\s*\)|\#[0-9a-f]{3}|\#[0-9a-f]{6}|[a-zA-Z][a-zA-Z0-9]*)$/,
  test: function(it){
    var e, this$ = this;
    if (!it) {
      return true;
    }
    if (typeof it === typeof "") {
      if (it.charAt(0) !== '[') {
        it = it.split(',');
      } else {
        try {
          it = JSON.parse(it);
        } catch (e$) {
          e = e$;
          return false;
        }
      }
    } else if (Array.isArray(it)) {
      return !it.filter(function(it){
        return !this$.re.exec(it.trim());
      }).length ? true : false;
    } else if (typeof it === 'object') {
      if (!(it.colors != null)) {
        return true;
      }
      if (it.colors.filter(function(it){
        return !it.hex;
      }).length) {
        return true;
      }
    }
    return false;
  },
  parse: function(it){
    var e;
    if (!it) {
      return it;
    }
    if (Array.isArray(it)) {
      return it;
    }
    if (typeof it === typeof "") {
      try {
        return JSON.parse(it);
      } catch (e$) {
        e = e$;
        return it.split(',').map(function(it){
          return {
            hex: it.trim()
          };
        });
      }
    }
    return it;
  },
  'default': {
    colors: ['#1d3263', '#226c87', '#f8d672', '#e48e11', '#e03215', '#ab2321'].map(function(it){
      return {
        hex: it
      };
    })
  },
  plotdb: {
    colors: ['#ed1d78', '#c59b6d', '#8cc63f', '#28aae2'].map(function(it){
      return {
        hex: it
      };
    })
  },
  qualitative: {
    colors: ['#c05ae0', '#cf2d0c', '#e9ab1e', '#86ffb5', '#64dfff', '#003f7d'].map(function(it){
      return {
        hex: it
      };
    })
  },
  binary: {
    colors: ['#ff8356', '#0076a1'].map(function(it){
      return {
        hex: it
      };
    })
  },
  sequential: {
    colors: ['#950431', '#be043e', '#ec326d', '#fc82a9', '#febed2', '#fee6ee'].map(function(it){
      return {
        hex: it
      };
    })
  },
  diverging: {
    colors: ['#74001a', '#cd2149', '#f23971', '#ff84ab', '#ffc3d7', '#f2f2dd', '#b8d9ed', '#81b1d0', '#3d8bb7', '#0071a8', '#003558'].map(function(it){
      return {
        hex: it
      };
    })
  },
  subtype: {
    qualitative: "qualitative",
    binary: "binary",
    sequential: "sequential",
    diverging: "diverging"
  },
  scale: {
    ordinal: function(pal){
      var c, range, domain;
      c = pal.colors;
      range = c.filter(function(it){
        return it.keyword;
      }).map(function(it){
        return it.hex;
      }).concat(c.filter(function(it){
        return !it.keyword;
      }).map(function(it){
        return it.hex;
      }));
      domain = c.map(function(it){
        return it.keyword;
      }).filter(function(it){
        return it;
      });
      return d3.scale.ordinal().domain(domain).range(range);
    },
    linear: function(pal, domain){
      var c, range;
      c = pal.colors;
      range = c.filter(function(it){
        return it.keyword;
      }).map(function(it){
        return it.hex;
      }).concat(c.filter(function(it){
        return !it.keyword;
      }).map(function(it){
        return it.hex;
      }));
      if (!domain) {
        domain = c.map(function(it){
          return it.keyword;
        }).filter(function(it){
          return it != null;
        });
      }
      return d3.scale.linear().domain(domain).range(range);
    }
  }
};
plotdb.OrderTypes = [plotdb.Number, plotdb.Date, plotdb.Numstring, plotdb.Month, plotdb.Weekday, plotdb.Boolean, plotdb.Bit];
plotdb.Types = {
  list: ['Number', 'Numstring', 'Weekday', 'Month', 'Date', 'Boolean', 'Bit', 'Order'],
  resolveArray: function(vals){
    var matchedTypes, i$, to$, j, type, matched, j$, to1$, k;
    matchedTypes = [[0, 'String']];
    for (i$ = 0, to$ = this.list.length; i$ < to$; ++i$) {
      j = i$;
      type = plotdb[this.list[j]];
      matched = true;
      for (j$ = 0, to1$ = vals.length; j$ < to1$; ++j$) {
        k = j$;
        if (!type.test(vals[k])) {
          matched = false;
          break;
        }
      }
      if (matched) {
        matchedTypes.push([plotdb[this.list[j]].level, this.list[j]]);
      }
    }
    matchedTypes.sort(function(a, b){
      return b[0] - a[0];
    });
    type = (matchedTypes[0] || [0, 'String'])[1];
    return type;
  },
  resolveValue: function(val){
    var matchedTypes, i$, to$, j, type;
    matchedTypes = [[0, 'String']];
    for (i$ = 0, to$ = this.list.length; i$ < to$; ++i$) {
      j = i$;
      type = plotdb[this.list[j]];
      if (type.test(val)) {
        matchedTypes.push([plotdb[this.list[j]].level, this.list[j]]);
      }
    }
    matchedTypes.sort(function(a, b){
      return b[0] - a[0];
    });
    type = (matchedTypes[0] || [0, 'String'])[1];
    return type;
  },
  resolve: function(obj){
    var headers, rows, fields, types, i$, to$, i, matchedTypes, j$, to1$, j, type, matched, k$, to2$, k;
    if (Array.isArray(obj)) {
      return this.resolveArray(obj);
    }
    if (typeof obj !== 'object') {
      return this.resolveValue(obj);
    }
    headers = obj.headers, rows = obj.rows, fields = obj.fields;
    types = [];
    for (i$ = 0, to$ = headers.length; i$ < to$; ++i$) {
      i = i$;
      matchedTypes = [];
      for (j$ = 0, to1$ = this.list.length; j$ < to1$; ++j$) {
        j = j$;
        type = plotdb[this.list[j]];
        matched = true;
        for (k$ = 0, to2$ = rows.length; k$ < to2$; ++k$) {
          k = k$;
          if (!type.test(rows[k][i])) {
            matched = false;
            break;
          }
        }
        if (matched) {
          matchedTypes.push([plotdb[this.list[j]].level, this.list[j]]);
        }
      }
      matchedTypes.sort(fn$);
      type = (matchedTypes[0] || [0, 'String'])[1];
      types.push(type);
    }
    return types;
    function fn$(a, b){
      return b[0] - a[0];
    }
  }
};
function in$(x, xs){
  var i = -1, l = xs.length >>> 0;
  while (++i < l) if (x === xs[i]) return true;
  return false;
}