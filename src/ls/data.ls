angular.module \plotDB

  ..service \sampleData, <[$rootScope]> ++ ($rootScope) ->
    [
      {
        key: "/dataset/sample/:joblesstaiwan"
        name: "台灣五都失業率與低收入戶", size: \1765, rows: 71, color: \#99f
        type: name: \sample
        fields: [
          * name: "縣市名", type: \String, dataset: "/dataset/sample/:joblesstaiwan"
          * name: "年度", type: \Date, dataset: "/dataset/sample/:joblesstaiwan"
          * name: "失業率", type: \Number, dataset: "/dataset/sample/:joblesstaiwan"
          * name: "低收入戶數", type: \Number, dataset: "/dataset/sample/:joblesstaiwan"
        ]
        data: [{"縣市名":"臺北市","年度":1998,"失業率":2.6,"低收入戶數":17270},{"縣市名":"臺北市","年度":1999,"失業率":2.9,"低收入戶數":19843},{"縣市名":"臺北市","年度":2000,"失業率":2.7,"低收入戶數":22706},{"縣市名":"臺北市","年度":2001,"失業率":3.9,"低收入戶數":24760},{"縣市名":"臺北市","年度":2002,"失業率":4.6,"低收入戶數":27184},{"縣市名":"臺北市","年度":2003,"失業率":4.6,"低收入戶數":33071},{"縣市名":"臺北市","年度":2004,"失業率":4.2,"低收入戶數":40184},{"縣市名":"臺北市","年度":2005,"失業率":3.9,"低收入戶數":32146},{"縣市名":"臺北市","年度":2006,"失業率":3.7,"低收入戶數":33437},{"縣市名":"臺北市","年度":2007,"失業率":3.7,"低收入戶數":34752},{"縣市名":"臺北市","年度":2008,"失業率":4,"低收入戶數":36274},{"縣市名":"臺北市","年度":2009,"失業率":5.8,"低收入戶數":40708},{"縣市名":"臺北市","年度":2010,"失業率":5.2,"低收入戶數":43823},{"縣市名":"臺北市","年度":2011,"失業率":4.4,"低收入戶數":47597},{"縣市名":"新北市","年度":1998,"失業率":2.8,"低收入戶數":12811},{"縣市名":"新北市","年度":1999,"失業率":3,"低收入戶數":14386},{"縣市名":"新北市","年度":2000,"失業率":3,"低收入戶數":17196},{"縣市名":"新北市","年度":2001,"失業率":4.9,"低收入戶數":18351},{"縣市名":"新北市","年度":2002,"失業率":5.5,"低收入戶數":20741},{"縣市名":"新北市","年度":2003,"失業率":5.2,"低收入戶數":20579},{"縣市名":"新北市","年度":2004,"失業率":4.6,"低收入戶數":22396},{"縣市名":"新北市","年度":2005,"失業率":4.1,"低收入戶數":24563},{"縣市名":"新北市","年度":2006,"失業率":3.8,"低收入戶數":26887},{"縣市名":"新北市","年度":2007,"失業率":3.8,"低收入戶數":27399},{"縣市名":"新北市","年度":2008,"失業率":4.1,"低收入戶數":24835},{"縣市名":"新北市","年度":2009,"失業率":5.9,"低收入戶數":32357},{"縣市名":"新北市","年度":2010,"失業率":5.2,"低收入戶數":38172},{"縣市名":"新北市","年度":2011,"失業率":4.4,"低收入戶數":49389},{"縣市名":"臺中市","年度":1998,"失業率":2.6,"低收入戶數":4795},{"縣市名":"臺中市","年度":1999,"失業率":3.1,"低收入戶數":5352},{"縣市名":"臺中市","年度":2000,"失業率":3.4,"低收入戶數":6056},{"縣市名":"臺中市","年度":2001,"失業率":4.9,"低收入戶數":6695},{"縣市名":"臺中市","年度":2002,"失業率":5.4,"低收入戶數":8108},{"縣市名":"臺中市","年度":2003,"失業率":5.3,"低收入戶數":8731},{"縣市名":"臺中市","年度":2004,"失業率":4.6,"低收入戶數":10275},{"縣市名":"臺中市","年度":2005,"失業率":4.2,"低收入戶數":12333},{"縣市名":"臺中市","年度":2006,"失業率":4.1,"低收入戶數":13531},{"縣市名":"臺中市","年度":2007,"失業率":4,"低收入戶數":13894},{"縣市名":"臺中市","年度":2008,"失業率":4.2,"低收入戶數":14666},{"縣市名":"臺中市","年度":2009,"失業率":5.9,"低收入戶數":18790},{"縣市名":"臺中市","年度":2010,"失業率":5.2,"低收入戶數":19414},{"縣市名":"臺中市","年度":2011,"失業率":4.4,"低收入戶數":21217},{"縣市名":"臺南市","年度":1998,"失業率":3.2,"低收入戶數":7193},{"縣市名":"臺南市","年度":1999,"失業率":3.7,"低收入戶數":7229},{"縣市名":"臺南市","年度":2000,"失業率":3.6,"低收入戶數":8007},{"縣市名":"臺南市","年度":2001,"失業率":4.8,"低收入戶數":7889},{"縣市名":"臺南市","年度":2002,"失業率":5,"低收入戶數":8727},{"縣市名":"臺南市","年度":2003,"失業率":4.9,"低收入戶數":9555},{"縣市名":"臺南市","年度":2004,"失業率":4.5,"低收入戶數":9678},{"縣市名":"臺南市","年度":2005,"失業率":4.1,"低收入戶數":10481},{"縣市名":"臺南市","年度":2006,"失業率":3.8,"低收入戶數":11669},{"縣市名":"臺南市","年度":2007,"失業率":3.9,"低收入戶數":12282},{"縣市名":"臺南市","年度":2008,"失業率":4.1,"低收入戶數":13411},{"縣市名":"臺南市","年度":2009,"失業率":5.8,"低收入戶數":16801},{"縣市名":"臺南市","年度":2010,"失業率":5.1,"低收入戶數":19185},{"縣市名":"臺南市","年度":2011,"失業率":4.3,"低收入戶數":23771},{"縣市名":"高雄市","年度":1998,"失業率":3.1,"低收入戶數":17849},{"縣市名":"高雄市","年度":1999,"失業率":3.7,"低收入戶數":20150},{"縣市名":"高雄市","年度":2000,"失業率":3.9,"低收入戶數":22431},{"縣市名":"高雄市","年度":2001,"失業率":5,"低收入戶數":18253},{"縣市名":"高雄市","年度":2002,"失業率":5.5,"低收入戶數":20432},{"縣市名":"高雄市","年度":2003,"失業率":5.3,"低收入戶數":21498},{"縣市名":"高雄市","年度":2004,"失業率":4.6,"低收入戶數":23391},{"縣市名":"高雄市","年度":2005,"失業率":4.2,"低收入戶數":24965},{"縣市名":"高雄市","年度":2006,"失業率":4.1,"低收入戶數":25675},{"縣市名":"高雄市","年度":2007,"失業率":4.1,"低收入戶數":26860},{"縣市名":"高雄市","年度":2008,"失業率":4.3,"低收入戶數":30573},{"縣市名":"高雄市","年度":2009,"失業率":5.9,"低收入戶數":35514},{"縣市名":"高雄市","年度":2010,"失業率":5.2,"低收入戶數":38702},{"縣市名":"高雄市","年度":2011,"失業率":4.4,"低收入戶數":50426}]
      },
      {
        key: "/dataset/sample/:goldprice2000"
        name: "Gold Price(2000)", size: \481, rows: 12, color: \#f99
        type: name: \sample
        fields: [
          * name: "date", type: \Date, dataset: "/dataset/sample/:goldprice2000"
          * name: "price", type: \Number, dataset: "/dataset/sample/:goldprice2000"
        ]
        data: [{"date":"2000-01-01","price":"284.590"},{"date":"2000-02-01","price":"300.855"},{"date":"2000-03-01","price":"286.704"},{"date":"2000-04-01","price":"279.961"},{"date":"2000-05-01","price":"275.293"},{"date":"2000-06-01","price":"285.368"},{"date":"2000-07-01","price":"282.152"},{"date":"2000-08-01","price":"274.523"},{"date":"2000-09-01","price":"273.676"},{"date":"2000-10-01","price":"270.405"},{"date":"2000-11-01","price":"265.989"},{"date":"2000-12-01","price":"271.892"}]
      },
      { 
        key: "/dataset/sample/:population2000"
        name: "World Population(2000)", size: 12355, rows: 287, color: \#f99
        type: name: \sample
        fields: [
          * name: "Country", type: \String, dataset: "/dataset/sample/:population2000"
          * name: "Population", type: \Number, dataset: "/dataset/sample/:population2000"
        ]
        data: [{"Country":"Arab World","Population":"277550423"},{"Country":"Caribbean small states","Population":"6431380"},{"Country":"Central Europe and the Baltics","Population":"108405522"},{"Country":"East Asia & Pacific (all income levels)","Population":"2043352556"},{"Country":"East Asia & Pacific (developing only)","Population":"1812175348"},{"Country":"Euro area","Population":"321107647"},{"Country":"Europe & Central Asia (all income levels)","Population":"862087806"},{"Country":"Europe & Central Asia (developing only)","Population":"246067877"},{"Country":"European Union","Population":"487975692"},{"Country":"Fragile and conflict affected situations","Population":"334545176"},{"Country":"Heavily indebted poor countries (HIPC)","Population":"472726491"},{"Country":"High income","Population":"1282297798"},{"Country":"High income: nonOECD","Population":"293059239"},{"Country":"High income: OECD","Population":"989238559"},{"Country":"Latin America & Caribbean (all income levels)","Population":"525299778"},{"Country":"Latin America & Caribbean (developing only)","Population":"438994368"},{"Country":"Least developed countries: UN classification","Population":"663076857"},{"Country":"Low & middle income","Population":"4819659593"},{"Country":"Low income","Population":"425003913"},{"Country":"Lower middle income","Population":"2293345046"},{"Country":"Middle East & North Africa (all income levels)","Population":"311780217"},{"Country":"Middle East & North Africa (developing only)","Population":"276578220"},{"Country":"Middle income","Population":"4394655680"},{"Country":"North America","Population":"312993944"},{"Country":"OECD members","Population":"1156286649"},{"Country":"Other small states","Population":"16215836"},{"Country":"Pacific island small states","Population":"1952589"},{"Country":"Small states","Population":"24599805"},{"Country":"South Asia","Population":"1382195669"},{"Country":"Sub-Saharan Africa (all income levels)","Population":"664247421"},{"Country":"Sub-Saharan Africa (developing only)","Population":"663648111"},{"Country":"Upper middle income","Population":"2101310634"},{"Country":"World","Population":"6101957391"},{"Country":"Afghanistan","Population":"20595360"},{"Country":"Albania","Population":"3089027"},{"Country":"Algeria","Population":"31719449"},{"Country":"American Samoa","Population":"57522"},{"Country":"Andorra","Population":"65399"},{"Country":"Angola","Population":"13924930"},{"Country":"Antigua and Barbuda","Population":"77648"},{"Country":"Argentina","Population":"36903067"},{"Country":"Armenia","Population":"3076098"},{"Country":"Aruba","Population":"90858"},{"Country":"Australia","Population":"19153000"},{"Country":"Austria","Population":"8011566"},{"Country":"Azerbaijan","Population":"8048600"},{"Country":"Bahamas, The","Population":"297759"},{"Country":"Bahrain","Population":"668239"},{"Country":"Bangladesh","Population":"132383265"},{"Country":"Barbados","Population":"267190"},{"Country":"Belarus","Population":"10005000"},{"Country":"Belgium","Population":"10251250"},{"Country":"Belize","Population":"238586"},{"Country":"Benin","Population":"6949366"},{"Country":"Bermuda","Population":"61833"},{"Country":"Bhutan","Population":"564350"},{"Country":"Bolivia","Population":"8495271"},{"Country":"Bosnia and Herzegovina","Population":"3834364"},{"Country":"Botswana","Population":"1755375"},{"Country":"Brazil","Population":"174504898"},{"Country":"Brunei Darussalam","Population":"331801"},{"Country":"Bulgaria","Population":"8170172"},{"Country":"Burkina Faso","Population":"11607944"},{"Country":"Burundi","Population":"6674286"},{"Country":"Cabo Verde","Population":"442426"},{"Country":"Cambodia","Population":"12222871"},{"Country":"Cameroon","Population":"15927713"},{"Country":"Canada","Population":"30769700"},{"Country":"Cayman Islands","Population":"41685"},{"Country":"Central African Republic","Population":"3638316"},{"Country":"Chad","Population":"8301151"},{"Country":"Channel Islands","Population":"148725"},{"Country":"Chile","Population":"15454402"},{"Country":"China","Population":"1262645000"},{"Country":"Colombia","Population":"39897984"},{"Country":"Comoros","Population":"528312"},{"Country":"Congo, Dem. Rep.","Population":"46949244"},{"Country":"Congo, Rep.","Population":"3126204"},{"Country":"Costa Rica","Population":"3929588"},{"Country":"Cote d'Ivoire","Population":"16131332"},{"Country":"Croatia","Population":"4426000"},{"Country":"Cuba","Population":"11138416"},{"Country":"Curacao","Population":"133860"},{"Country":"Cyprus","Population":"943287"},{"Country":"Czech Republic","Population":"10255063"},{"Country":"Denmark","Population":"5339616"},{"Country":"Djibouti","Population":"722887"},{"Country":"Dominica","Population":"69679"},{"Country":"Dominican Republic","Population":"8663421"},{"Country":"Ecuador","Population":"12533087"},{"Country":"Egypt, Arab Rep.","Population":"66136590"},{"Country":"El Salvador","Population":"5958794"},{"Country":"Equatorial Guinea","Population":"518179"},{"Country":"Eritrea","Population":"3939348"},{"Country":"Estonia","Population":"1396985"},{"Country":"Ethiopia","Population":"66024199"},{"Country":"Faeroe Islands","Population":"46491"},{"Country":"Fiji","Population":"811647"},{"Country":"Finland","Population":"5176209"},{"Country":"France","Population":"60911057"},{"Country":"French Polynesia","Population":"237267"},{"Country":"Gabon","Population":"1225527"},{"Country":"Gambia, The","Population":"1228863"},{"Country":"Georgia","Population":"4418300"},{"Country":"Germany","Population":"82211508"},{"Country":"Ghana","Population":"18825034"},{"Country":"Greece","Population":"10917482"},{"Country":"Greenland","Population":"56200"},{"Country":"Grenada","Population":"101620"},{"Country":"Guam","Population":"155328"},{"Country":"Guatemala","Population":"11204183"},{"Country":"Guinea","Population":"8746128"},{"Country":"Guinea-Bissau","Population":"1273312"},{"Country":"Guyana","Population":"744471"},{"Country":"Haiti","Population":"8578234"},{"Country":"Honduras","Population":"6235561"},{"Country":"Hong Kong SAR, China","Population":"6665000"},{"Country":"Hungary","Population":"10210971"},{"Country":"Iceland","Population":"281205"},{"Country":"India","Population":"1042261758"},{"Country":"Indonesia","Population":"208938698"},{"Country":"Iran, Islamic Rep.","Population":"65911052"},{"Country":"Iraq","Population":"23801156"},{"Country":"Ireland","Population":"3805174"},{"Country":"Isle of Man","Population":"76806"},{"Country":"Israel","Population":"6289000"},{"Country":"Italy","Population":"56942108"},{"Country":"Jamaica","Population":"2589389"},{"Country":"Japan","Population":"126843000"},{"Country":"Jordan","Population":"4797000"},{"Country":"Kazakhstan","Population":"14883626"},{"Country":"Kenya","Population":"31285050"},{"Country":"Kiribati","Population":"82788"},{"Country":"Korea, Dem. Rep.","Population":"22840225"},{"Country":"Korea, Rep.","Population":"47008111"},{"Country":"Kosovo","Population":"1700000"},{"Country":"Kuwait","Population":"1906231"},{"Country":"Kyrgyz Republic","Population":"4898400"},{"Country":"Lao PDR","Population":"5388281"},{"Country":"Latvia","Population":"2367550"},{"Country":"Lebanon","Population":"3235380"},{"Country":"Lesotho","Population":"1856225"},{"Country":"Liberia","Population":"2891968"},{"Country":"Libya","Population":"5176185"},{"Country":"Liechtenstein","Population":"33093"},{"Country":"Lithuania","Population":"3499536"},{"Country":"Luxembourg","Population":"436300"},{"Country":"Macao SAR, China","Population":"431907"},{"Country":"Macedonia, FYR","Population":"2052129"},{"Country":"Madagascar","Population":"15744811"},{"Country":"Malawi","Population":"11321496"},{"Country":"Malaysia","Population":"23420751"},{"Country":"Maldives","Population":"272745"},{"Country":"Mali","Population":"10260577"},{"Country":"Malta","Population":"381363"},{"Country":"Marshall Islands","Population":"52161"},{"Country":"Mauritania","Population":"2708095"},{"Country":"Mauritius","Population":"1186873"},{"Country":"Mexico","Population":"103873607"},{"Country":"Micronesia, Fed. Sts.","Population":"107430"},{"Country":"Moldova","Population":"3639592"},{"Country":"Monaco","Population":"32081"},{"Country":"Mongolia","Population":"2397473"},{"Country":"Montenegro","Population":"604950"},{"Country":"Morocco","Population":"28710123"},{"Country":"Mozambique","Population":"18275618"},{"Country":"Myanmar","Population":"48453000"},{"Country":"Namibia","Population":"1897953"},{"Country":"Nepal","Population":"23184177"},{"Country":"Netherlands","Population":"15925513"},{"Country":"New Caledonia","Population":"213230"},{"Country":"New Zealand","Population":"3857700"},{"Country":"Nicaragua","Population":"5100920"},{"Country":"Niger","Population":"10989815"},{"Country":"Nigeria","Population":"122876727"},{"Country":"Northern Mariana Islands","Population":"68434"},{"Country":"Norway","Population":"4490967"},{"Country":"Oman","Population":"2192535"},{"Country":"Pakistan","Population":"143832014"},{"Country":"Palau","Population":"19174"},{"Country":"Panama","Population":"3054812"},{"Country":"Papua New Guinea","Population":"5379226"},{"Country":"Paraguay","Population":"5350253"},{"Country":"Peru","Population":"26000080"},{"Country":"Philippines","Population":"77651848"},{"Country":"Poland","Population":"38258629"},{"Country":"Portugal","Population":"10289898"},{"Country":"Puerto Rico","Population":"3810605"},{"Country":"Qatar","Population":"593693"},{"Country":"Romania","Population":"22442971"},{"Country":"Russian Federation","Population":"146596557"},{"Country":"Rwanda","Population":"8395577"},{"Country":"Samoa","Population":"174614"},{"Country":"San Marino","Population":"26969"},{"Country":"Sao Tome and Principe","Population":"139428"},{"Country":"Saudi Arabia","Population":"20144584"},{"Country":"Senegal","Population":"9861679"},{"Country":"Serbia","Population":"7516346"},{"Country":"Seychelles","Population":"81131"},{"Country":"Sierra Leone","Population":"4139757"},{"Country":"Singapore","Population":"4027900"},{"Country":"Sint Maarten (Dutch part)","Population":"30519"},{"Country":"Slovak Republic","Population":"5388720"},{"Country":"Slovenia","Population":"1988925"},{"Country":"Solomon Islands","Population":"412336"},{"Country":"Somalia","Population":"7385416"},{"Country":"South Africa","Population":"44000000"},{"Country":"South Sudan","Population":"6652984"},{"Country":"Spain","Population":"40263216"},{"Country":"Sri Lanka","Population":"19102000"},{"Country":"St. Kitts and Nevis","Population":"45544"},{"Country":"St. Lucia","Population":"156949"},{"Country":"St. Martin (French part)","Population":"28384"},{"Country":"St. Vincent and the Grenadines","Population":"107897"},{"Country":"Sudan","Population":"27729798"},{"Country":"Suriname","Population":"466668"},{"Country":"Swaziland","Population":"1063715"},{"Country":"Sweden","Population":"8872109"},{"Country":"Switzerland","Population":"7184250"},{"Country":"Syrian Arab Republic","Population":"16371208"},{"Country":"Tajikistan","Population":"6186152"},{"Country":"Tanzania","Population":"34020512"},{"Country":"Thailand","Population":"62343379"},{"Country":"Timor-Leste","Population":"853585"},{"Country":"Togo","Population":"4864753"},{"Country":"Tonga","Population":"97962"},{"Country":"Trinidad and Tobago","Population":"1267980"},{"Country":"Tunisia","Population":"9552500"},{"Country":"Turkey","Population":"63174483"},{"Country":"Turkmenistan","Population":"4501419"},{"Country":"Turks and Caicos Islands","Population":"18876"},{"Country":"Tuvalu","Population":"9419"},{"Country":"Uganda","Population":"24275641"},{"Country":"Ukraine","Population":"49175848"},{"Country":"United Arab Emirates","Population":"3026352"},{"Country":"United Kingdom","Population":"58892514"},{"Country":"United States","Population":"282162411"},{"Country":"Uruguay","Population":"3320841"},{"Country":"Uzbekistan","Population":"24650400"},{"Country":"Vanuatu","Population":"185058"},{"Country":"Venezuela, RB","Population":"24407553"},{"Country":"Vietnam","Population":"77630900"},{"Country":"Virgin Islands (U.S.)","Population":"108639"},{"Country":"West Bank and Gaza","Population":"2922153"},{"Country":"Yemen, Rep.","Population":"17522537"},{"Country":"Zambia","Population":"10100981"},{"Country":"Zimbabwe","Population":"12503652"}]
      },
    ]
  ..filter \size, -> ->
    if !it or isNaN(it) => return \0B
    if it < 1000 => "#{it}B"
    else if it < 1048576 => "#{parseInt(it / 102.4)/10}KB"
    else "#{parseInt(it / 104857.6)/10}MB"
  ..service \plUtil, <[$rootScope]> ++ ($rootScope) ->
    ret = do
      format: do
        size: ->
          if it < 1000 => "#{it}bytes"
          else if it < 1048576 => "#{parseInt(it / 102.4)/10}KB"
          else "#{parseInt(it / 104857.6)/10}MB"

  ..service \dataService, <[$rootScope $http sampleData plUtil]> ++ ($rootScope, $http, sampleData, plUtil) ->
    Dataset = (config) ->
      @ <<< config
      @size = angular.toJson(config.data).length
      @rows = config.data.length
      if @key => for item in @fields => item.dataset = @key
      @

    Dataset.prototype = do
      key: 0, name: null, owner: null, size: 0, rows: 0, datatype: \csv
      type: {}, fields: {}
      permission: {switch: [], list: []}

      save: -> data-service.save @ .then ~> @key = it.key
      clone: -> 
        obj = new Dataset @
        obj.key = null
      delete: ->
      update: ->
      sync: ->
        #TODO other than local data
        @ <<< JSON.parse(localStorage.getItem @key)


    data-service = do
      Dataset: Dataset
      datasets: [] ++ sampleData.map(-> new Dataset(it))
      name: -> "/datasets/#it"
      local: rows: 0, size: 0
      local-size: ->
        for item in @datasets => 
          if item.type.name == \local => 
            @local.rows += item.rows
            @local.size += item.size
      init: ->
        @local <<< {rows: 0, size: 0}
        try
          list = JSON.parse(localStorage.getItem("/list/datasets") or null) or []
          for item in list =>
            data = JSON.parse(localStorage.getItem(item) or null)
            @datasets.push new Dataset(data)
          @local-size!
          $http do
            url: \/d/dataset/
            method: \GET
          .success (ret) ~>
            for dataset in ret => @datasets.push new Dataset(dataset)
          .error (d) ->
        catch
          console.log e.toString!

      field: do
        update: (f) ->
          dataset = @find-dataset f
          dataset.sync!
          f.data = dataset.[]data.map(->it[f.name])
        find-dataset: (f) -> dataset = data-service.find f
        #TODO better interface
        settype: (data, field) ->
          data = data.map(->it[field.name])
          types = <[Boolean Percent Number Date String]>
          for type in types =>
            if !data.map(-> plotdb[type]test it).filter(->!it).length => 
              field.type = type
              break

      find: (item) -> 
        #TODO: complete implement finder
        if item.dataset => key = item.dataset else key = item
        @datasets.filter(->it.key == key).0

      gen-key: (dataset) -> # TODO: preserve key once generated
        for i from 0 til 1000
          key = "/dataset/#{dataset.type.name}/#{Math.random!toString(36)substring 2}"
          if !@find(key) => return key
        null

      save: (dataset) -> new Promise (res, rej) ~>
        if !dataset.key and dataset.type.name == \local => 
          dataset.key = @gen-key dataset
          #TODO save to server, check for name collision
          if !dataset.key => return console.log "failed to gen key"
        key = @datasets.map(->it.key).indexOf(dataset.key)
        if key >= 0 => @datasets.splice key, 1
        if dataset.type.name == \local =>
          localStorage.setItem dataset.key, angular.toJson(dataset)
          list = JSON.parse(localStorage.getItem("/list/datasets") or null) or []
          if list.indexOf(dataset.key) < 0 => list.push dataset.key
          localStorage.setItem("/list/datasets", angular.toJson(list))
          for field in dataset.fields => field.dataset = dataset.key
          @datasets.push dataset
          return res dataset
        else =>
          $http { url: \/d/dataset/, method: \POST, data: dataset }
          .success (d) ~> 
            dataset.key = d.key
            for field in dataset.fields => field.dataset = dataset.key
            @datasets.push dataset
            res dataset
          .error (d) -> 
            console.log "[ERROR] ", d
            rej!

      delete: (dataset) ->
        key = @datasets.map(->it.key).indexOf(dataset.key) 
        if key < 0 => return
        @datasets.splice key, 1
        list = JSON.parse(localStorage.getItem(\/list/datasets))
        if !list => return
        key = list.indexOf dataset.key
        if key < 0 => return
        list.splice key, 1
        localStorage.setItem \/list/datasets, JSON.stringify(list)
        localStorage.setItem(dataset.key, null)
    data-service.init!
    data-service
  ..controller \dataEditCtrl,
  <[$scope $timeout $http dataService plUtil]> ++ ($scope, $timeout, $http, data-service, plUtil) ->
    $scope.name = null
    $scope.dataset = null #TODO preload dataset for editing feature
    $scope.save = (locally = false) ->
      config = do
        name: $scope.name
        type: name: (if locally => \local else \server)
        owner: null
        permission: switch: <[public]>, list: []
        data: $scope.data.parsed
        #TODO support more types
        datatype: \csv
        fields: [[k,v] for k,v of $scope.data.parsed.0].map(-> {name: it.0, type: \String})
      for item in config.fields =>
        data-service.field.settype $scope.data.parsed, item
      $scope.dataset = new dataService.Dataset config
      $scope.dataset.save!

    $scope.data = do
      init: -> $scope.$watch 'data.raw', (->$scope.data.parse!)
      raw: ""
      rows: 0
      size: 0
      parsed: null
      parse: ->
        if @handler => $timeout.cancel @handler
        @handler = $timeout (~>
          @handler = null
          @parsed = Papa.parse(@raw, {header:true}).data
          @rows = @parsed.length
          @size = @raw.length
        ), 1000
    $scope.data.init!
    $scope.parser = do
      encoding: \UTF-8
      csv: do
        toggle: -> setTimeout((->$(\#data-edit-csv-modal).modal \show),0)
        read: ->
          file = $(\#data-edit-csv-file).0.files.0
          reader = new FileReader!
          reader.onload = (e) ->
            $scope.$apply -> $scope.data.raw = e.target.result.trim!
            $(\#data-edit-csv-modal).modal \hide
          reader.onerror = (e) ->
          reader.readAsText(file, $scope.parser.encoding)

      gsheet: do
        url: null
        toggle: -> setTimeout((->$(\#data-edit-gsheet-modal).modal(\show)),0)
        read: ->
          ret = /\/d\/([^\/]+)/.exec($scope.parser.gsheet.url)
          if !ret => return
          key = ret.1
          url = "https://spreadsheets.google.com/feeds/list/#key/1/public/values?alt=json"
          $http url: url, method: \GET
          .success (data) ->
            fields = {}
            data.feed.entry.map (it) ->
              for key of it => if /^gsx\$(.+)$/.exec(key) => fields[that.1] = 1
            fields = [k for k of fields]
            lines = [fields.join(\,)] ++ data.feed.entry.map((it) ->
              [(it["gsx$#key"] or {$t:""}).$t for key in fields].join(\,)
            )
            $scope.data.raw = lines.join(\\n)
            setTimeout((->$(\#data-edit-gsheet-modal).modal(\hide)),0)
          #TODO error handling

      link: do
        url: null
        toggle: -> setTimeout((->$(\#data-edit-link-modal).modal(\show)),0)
        read: ->
          $http url: "http://crossorigin.me/#{$scope.parser.link.url}", method: \GET
          .success (d) ->
            $scope.data.raw = d.trim!
            $(\#data-edit-link-modal).modal \hide
          #TODO error handling

  ..controller \dataFiles, <[$scope dataService]> ++ ($scope, data-service) ->
    $scope.datasets = data-service.datasets
    $scope.removedata = (file) -> data-service.delete file
