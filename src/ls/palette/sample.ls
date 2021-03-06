angular.module \plotDB
  ..service \samplePalette, <[$rootScope]> ++ ($rootScope) ->
    ret = [
      * name: "Default", key: "default", colors: <[#1d3263 #226c87 #f8d672 #e48e11 #e03215 #ab2321]>
      * name: "Purple", key: "purple", colors: <[#d9a301 #cd3313 #ba0c69 #8b278f #403f83]>
      * name: "Code for Africa", key: "cfa", colors: <[#f4502a #f1c227 #008a6d #00acdb #0064a8]>
      * name: "Chart", key: "chart", colors: <[#3a66cb #0ebeba #fee476 #feae01 #e62b0f]>
      * name: "PlotDB", key: "plotdb", colors: <[#ed1d78 #c59b6d #8cc63f #28aae2]>
      * name: "The Reporter", key: "reporter", colors: <[#7a322a #d52c2a #f93634 #dddb83 #ede6de #fdfffa #dbdbdb #48462d]>
      * name: "Pinky", key: "pinky", colors: <[#F29C98 #F5B697 #F5E797 #A2E4F5 #009DD3]>
      * name: "Sequential / Blue", key: "S/B", colors: <[#ecedd9 #bbd7bd #7dc1b5 #39a8bb #008abf]>
      * name: "Sequential / Red", key: "S/R", colors: <[#f9f4eb #e8c7a0 #db975e #ce6128 #bf0000]>
      * name: "Sequential / Green", key: "S/G", colors: <[#f9f9eb #dae4b6 #b2d287 #7ec05d #2eaf3a]>
      * name: "Sequential / Purple", key: "S/P", colors: <[#ffe8e9 #f0b3c1 #d97fa7 #b74c99 #881793]>
      * name: "Sequential / Cyan", key: "S/C", colors: <[#f4f7df #c6ddc1 #94c3ad #5ea9a1 #168e9b]>
      * name: "Sequential / Yellow", key: "S/Y", colors: <[#fcffe7 #dcdcb3 #beba80 #a2984e #887619]>
      * name: "Diverging / Red-Blue", key: "D/RB", colors: <[#ac2b2b #dd8c81 #ffe8e4 #e7eeff #8ea3cf #295ea0]>
      * name: "Diverging / Orange-Purple", key: "D/OP", colors: <[#b1792a #dbb383 #fff0e0 #f4e9fa #b68dd1 #7432a8]>
      * name: "Diverging / Red-Green", key: "D/RG", colors: <[#c2425a #e698a0 #ffe9eb #daf7fb #8cc2c9 #358f99]>
      * name: "Diverging / Yellow-Blue", key: "D/YB", colors: <[#aa9f00 #d6c97f #faf5e2 #e9f2ff #9eb8de #4f81be]>
    ]
    ret.map ->
      it.colors = it.colors.map (d,i) -> { hex: d, idx: i }
      it._type = location: \sample, name: \palette
    ret
