if !(plotdb?) => plotdb = {}

plotdb.{}theme.sample = do
  [
    {
      key: "/theme/sample/:default"
      name: "Default"
      _type: location: \sample, name: \theme
      code: content: '''
var module = {};
module.exports = plotdb.theme.create({
  typedef: {
    Color: {
      "default": "#222",
      "positive": "#391",
      "negative": "#b41"
    },
    Palette: {
      "default": { colors: [ {hex: "#ae4948"}, {hex: "#256b9e"} ] },
      "binary": { colors: [ {hex: "#ae4948"}, {hex: "#256b9e"} ] },
      "diverging": {
        colors: [
          {hex: "#b81673"}, {hex: "#eb7696"}, {hex: "#e0e0a0"},
          {hex: "#83b365"}, {hex: "#368239"}
        ]
      },
      "qualitative": {
        colors: [
          {hex: "#b43743"}, {hex: "#e68061"}, {hex: "#f9cb48"},
          {hex: "#3c6a9c"}, {hex: "#0c2a54"}, {hex: "#405067"},
          {hex: "#5a5e84"}
        ]
      },
    }
  }
});
'''
      style: content: """
      circle { fill: \#f00; stroke: #000; stroke-width: 1; }
      """
    },
    {
      key: "/theme/sample/:plotdb"
      name: "PlotDB"
      _type: location: \sample, name: \theme
      doc: content: '''
<link href='https://fonts.googleapis.com/css?family=Lato:200,300,400,700' rel='stylesheet' type='text/css'/>
'''
      style: content: '''
body, text {
  font-family: 'lato', 'Helvetica Neue', Helvetica, sans-serif;
}

.axis .tick line {
  stroke: #bbb;
}
.axis .domain {
  stroke: #444;
}
.axis .tick text {
  fill: #444;
  font-weight: 400;
}

line.connect {
  stroke-width: 1;
}
.axis.horizontal .tick line, .axis.horizontal .tick text {
  transform: translate(40px,-4px);
  opacity: 0.8;
}

.axis.horizontal .tick line {
  transform: translateY(10px) scaleY(1.5);
  stroke-linecap: round;
  stroke-width: 2;
  stroke-dasharray: 1 1;
  opacity: 0.4;
}

.popup {
  background: #fff;
  color: #555;
}
.popup:after {
  background: #fff;
  height: 0;
  top: 50%;
  margin-top: -1px;
  transform: rotate(0);
  border-bottom: 3px solid #ddd;
}
.popup.right:after {
  left: -11px;
}
.popup.left:after {
  background: #fff;
  right: -11px
}


'''
    }/*,
    {
      key: "/theme/sample/:playfair"
      name: "Playfair"
      _type: location: \sample, name: \theme
      style: content: """
      body { background: \#eee}
      """
    },
    {
      key: "/theme/sample/:thereporter"
      name: "The Reporter"
      _type: location: \sample, name: \theme
      code: content: '''
var module = {};
module.exports = plotdb.theme.create({
  typedef: {
    Color: {
      "default": "#7a322a",
      "positive": "#888376",
      "negative": "#d52c2a"
    },
    Palette: {
      "default": {
        colors: ["#7a322a","#d52c2a","#f93634","#dddb83","#ede6de","#fdfffa","#dbdbdb","#48462d"].map(function(it) { return {hex: it};})
      },
      "binary": {
        colors: ["#7a322a","#d52c2a"].map(function(it) { return {hex: it};})
      },
      "qualitative": {
        colors: ["#7a322a","#d52c2a","#f93634","#dddb83","#ede6de","#fdfffa","#dbdbdb","#48462d"].map(function(it) { return {hex: it};})
      }
    }
  }
});
'''
      doc: content: '''
<div id='banner'></div>
'''
      style: content: '''
@font-face {
  font-family: Noto Sans;
  src: url(/assets/fonts/noto-sans.ttf);
}

body {
  background: #fdfffa;
  color: #4a4a4a;
  font-family: 'Noto Sans', 'Noto Sans TC', 'Apple LiGothic Medium', Roboto, 'Microsoft JhengHei', Arial, sans;
}
text {
  fill: #4a4a4a;
  font-family: 'Noto Sans', 'Noto Sans TC', 'Apple LiGothic Medium', Roboto, 'Microsoft JhengHei', Arial, sans;
}

.button {
  box-shadow: none;
  border: 2px solid #f1f1f1;
  border-radius: 20px;
  padding: 5px 10px;
  font-size: 14px;
}
.button.active {
  box-shadow: none;
  background: #000;
  color: #fff;
}

#banner {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 176.6px;
  height: 32px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQkAAAAwCAYAAAACao+1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAIh9JREFUeNrsXQlYTO0Xnzvt+6ZEoci+JHy2irKmsmQrEiEpWux71nxZQvZUVCgiEZKlEkqLCFkTQoutfV/v/55pbnPnzp1ppuX/PD5zHqO7vHPvO+99z3nP+Z3lIjlmY17IzF+yX95iRghNTKyGJiQhCUlIBEKy9XVRxoaEVJbk9DleCgsW+dBlZUuEQyMkIQmJXUggCA1FURoiKlYkPmbSKXl7x8Ni6h1yhEMkJCEJhQTKcRATGNj/NaKDhgfJOzp7SvTq/Vo4VEIS0l8sJBq1COZfMol27XVLZskyTxnDUfeFQyYkIf3FQoJao0BpcAo2EeX2KdK29vvlp0wLo4mI1AqHT0hC+svMjQahQOPQKuAwUYYgUrKfJWfPO6hgbeNPl5YpEw6jkIT03yWRNV06bGcJCZIwQLh8q7Zaqe5FimnphXMO1bk/5cR79X5Nl/k/CYu6OpGakhIFEUnJyuZ8vaKiQvrH9+8aJcXFilLSUuUiIiJ1f8KDqqmpFp8+aWJy+rt3/Xv37ftClsIDVVFeLvM67eWggrx81dKSEnklZeW8tu7XwT0e7oF+vi7p7972G2FgGCNkqf8e0YlmBm5WEPcp1Q+G7YF9amuUqyJCt/ycMfHLr9WuPlUZH3q0RScrvn3rnB3gv+T1IpvQpJF6v3OCztk291pxsfcnGA0d/Hk09vnwPr0Pr7YpSUkG1tOnxcKHW5u0ly8Gr3VxDoDPx4wPvQTpCzb2SH19PZ2ftmJi4tUeBw7ZXTwbaG9qNOpVSlKiIblNxPXw2TNNTRInjx+T+uZVmt7/YwJh/TCIuh05FcZKyE7/USFBNjWwLa6CgWiOsH2nvl6yNvnhkjzbWe9+Lra5WpGYoN+STtWWl0v/unvb9MPGdYdTxox893za+C9fj+7zKX7+ZEZ9bbUiVw2nlakgP69dUsLj0fChOl9YkK/itnaN99XLIQvgk5OV1VmQ66c+TRk+aojelxNehzbDyt9U+z79+6c6urp6FBUVKtnNm3szO+tbF+L5OxE3p4PwdnBy2WM2dVrI/8VexRcMPgjrt/K2DeuP5+fntxOy3p9DoriJgTM+ykV9wHEKwpFGTYOAXyC179OmFa5dNq1ITeOxzEJ7TzlT83AanV7fxJKKlLx+NSAvOmpi0aPYiRWZHwxQtF6cXbNBGfKLeZvWmeB8toFbmo81ek5mDsxkkS8tKW1k7qLCQmVB7j9oyD8J67Zs3bDGefnZ4LMBjl4nfayGDBsWx+s7do7LPWOjo03tlzvv7aih+RU/XlJSrBAXGzsBEw4XV2/avIn4nWMHD7iFh12xhu17cY97teYEQmnU8+VTRkavhVazb8MDtF1i77XQfqmXx/ZtnqEXghdGhF+z9DsfZD5w8JBEQe4VFODvWF1dLcHNNh44aFCiHuGa0XfvTP76JbMbtrwx+jnJfHKoeoeOWd9zczUjb1yfSWMC892793hjYGR8F/9efl6eaviVUGuOSYC1FxcTq7K2XXjyrxISrBHgSz1mY5+G54RStkN/ZI0s2bM1rOzYgXRJqwUHFKzmnkMkJSvwNtW/fqrlxURPKHxwf0Lp8ycTaqsq2rPYFmUTPixBAfdEuQqyZiyDbLsPYmJMLpwNcID7btqxa2Xjb8b2b0bHDqS6xNtXrwaCeg/b7dTUvgvahSnTZwR9+/pV+9Bej13zZ02P8r94yWTYSP1YFvOXyKNMkwT/1QEXL01gnCsuVsDbhV68sBATMPFb3f91heN424cx0aZHDuzfXl9XR0eaoYJ9z83R/PL5sw7KxisNDIo29EERtotLihWTHscbwbG8X7/aH/DY/W92dhZD08n69lXrQXSUKfQRxlJRSTG/Z5++LwXti6fHbg919Q5Zyioqv3Oxfn3NzOw2dMTIB3D/t69fDQRBRBQSH96/63f9ypW56djf8SaTwkcajooCIVFcVMjoa9Sd21N79Oz1yspmvi9RSJSXlckmJzw2iom6Z4bdL1tDUzOzQbPMb/f9e67mXygkaJSeDIS5w0uzYLXnjLHAJ2R9aVGPcr8jp8oDvd3pw0aFlElIVhQnxY+r/JWr1ygPEIK4RomrBErCSBr2+ZnsYOsDgyGcwKUMvl1WWiJXVFSkCG0yP3/qvnnNSr/vOTkacBOnVat38reStpwcXVz/BSZ6lvJkhKuD/cW7cQm95OXlC+Hc5jWrfH7//KnOGF98fGgkDQ77W1ZaKiclJVXmvGTxJeL4/MK+q9a+fS5KBpz4pC8YI96NvDUNIa7c+HWw/QKm6VCQl9cO2sF2ZWWltO6gwYnwge9pd+36YbWz01k4J0Kn1x04dsIG62t5czS/VRs2bhk/yfSav6/Pit1btxwKDrtmBOfmWkzlwI0cnF09JLD5tnub26GT/oHT8OM9evV+5R1wdpqOuio6a6716fmL7Y4Qv6fZufNnaK/Xo1vhDCurAJfVa7fD8Uex9yd47Njm+deZG43Mzpzw+Dxg8CqFC5QzpgKPpUB5aB0Y1VSr1sdFOf2uqKLVs5kqVDYAShAcLEnCmptNs2be799qKzCGQ4kILHYBfFLDsd1b3Q5JSUuXwm5xcZGilJR0qXY3nfc4qCiIvd0SI4iOmWPu+zyXTp04LsXSep6vDLNPQEdO+VqB6gsqcGctrY9jJ0y8we91E+PjjAN8fVxV2rX7udvzoH1z+jYMW6nhw+3829evB2Lqu4aWdtcMt127V5DPg1fGZtaM6KKCfBXYX7Vx02ZMeCQ1py++54LMu+p0f0eFqm/B7q2goFAo0HPh59kS7mOIaRvYZ8BfJySIA4aQGBAljRM3bYFsunF7HihpFWRfj9HGe7HhEMwrc2IivEkVU/2DmKsMke5hq53jIturcJPdBw7Z9enX7zm3a+RmZ3cSzD5vPvXo3TstJjFZp0NHjW/kc34nj6/FmFG3b//+qYUFBSrcngVx/+f37x29jx3ZABqGiopKs4WEYCYoJ23dsP447vmYYjE92H65877m3mvwUO54DdfnyNDAaLTsrCwtSncdrzmFnQNN7A1mUkIruohIXU/sOf2FwGXD5OLFhPiizg1/4MYkxHBvFsyFckpppCkRw4r+bA00HhGcE/jSHloKp1IJCOIYl5dXSGdnfdNiEw4cErhhnOrq60XUMEH5GRMSSsoqv9t0FqHU8OXRA55bLwedt4P+AUjrcejwYgRApf8nMcdl9BC9z/wHArHowrmzS+ED23JyckWp6R8V/1pzg2Xzc+IQTGWfiREgbJ4QMuuSwUZ2vAMh7KOUXEVl+pJ1lZa4QFF8QlMwPiDnv3786IAyNRG+JxNT/Wnp7Pc7eWI1gJg2Cxee0OnR8w35fDcdnXe4fcwPvX/zpv/nT5+6i4qJtm2dEAoBft7/9PLD+/fugO0BeoOSTwddmCQhIdEYAPfuzZsBEPgF82GyhUUwxIG0ZRefpX9Uwucr3udBPXUKaE1oQi5r1u4QZMz/05pEIwvycoHSiK5QJq7A5GqykG7YRql1cpS17DbwF8JFCBAnH9H0aJ2JTdacgEkPeuzeDeeCrlw1RggAXZNMQpyATdAPzBSoqakRJ/LW+QD/Zb4njq2F7Y4aHb9RCYmvX7508/c5tYIvyYrtf8Paw2ZdbZ1o26/YrE1wVW7ftPEY9AVTz1+ePh9sJicvX9QIHpeXy6xa7hgEUZqwP3aiyTUFhTYSEszxwIHg1tIg/07gkkcmKBFF58AtUJSN2cmqMMqx4pK1AvZWnNog2fZuWpMARD7m7p3JVEyU/vZNf3w7PCzUOjE+zgjOgysz8kb4TAlmuHdRYaESnU5HaU1gIVVVlZK4JiEqIspX0psfJgyyvn3TJo43tuL3wEdCS7vrB05TC6IuRWvkuYFzFM9NRFSEoUEg8DsEoI2rVvh9zczU4aZxEYPq3r15rcvQWt6+0QUPQ052Vpesr1+1YDyAMWVkZUuWL14YSvxeVta3LuWlpbJKysq/mWOtzA10bBVzo7nMTnru4Akb3Kt7wfV7MXq8sKz/LnBJgTGwPB6cCV8kbxxPmx0lTOKGayBs6gQRrCS7PNkgCxp/NyYzE5gR4uLiVbCt98/Qx311dZ9Cf8TFJSoBnAT0f9jIkbHD9fVj8d+qh9nQz5+mDOcFSG7bsO5ESnKyPi6EVNXV+SrSs3mn+0rysajbkdMcFi64CtuKSkr5VM8EgqdmWFoF8Ptw4Zpv0tL0REToAuWnbMH6V1dXJ4KScBaUC+4Cx+vr6kT37ty+LzkxYTSMx0Qz87Cde/Y5iomJNakhyMrJFQvSv4N7/nW/GX7NCsYcQuax/q7oTcG0B/d6uN+8GmYF/Zk7fSrWbvcKYG4AIt3dNnvBbznnf9qpqrpKEqJU8e9lfv6sswkTlCDIggMDHO4xXbswJq2BPf3xQoJtXSeswOQcD14AG1kDJeMSrKhJlENjQNjMEBpbHEWjqdPEUyIzk/OSxZdNzCeHUoUqL5preftJQoKh+TSLi06r1uzS6NQpk9/Bc1q5epeT/eJLsK07eHBS5y5dPrUEK2lqxUtJStTH4wEQHAMhaDpkb0f6+3d9m2NuyAhYvhDC053t7UIwrWwMuHPXbnHbYOewzLOtQMqRhqNiumh3zcD3uQWxjdQ3iOmipZ2BjweOM8HfGVZzAuAD+3gbnJSUFPOJ58naU0dNja9/qZBASYzNv01GtN1RShWYyoxB2QQF2bvSOL8QCu1PwKk3c471aQfb+eHAxP0H6j0hMCaS9uLF4IrKSulvmPqvjGkUTamcRFJt3z53r9fRhQ/vR08yn2pxsbXsZ/I98XEBAPDQCW/rpqAB/Ntg98dGR5nS27D2x6sXz4c42dtdwkwM7faYJuV59LhNW2eDDseYn692XPrBEBI8NDIFRaV8QTS2v0ZIEL2RuJJPZHlyBCYbeMkD3UcIICYxjLvhKygFWIly12tpzXOD6hsaRktKSVa4ONhfjIx91E+SGR7+If19X4gUBObzOXt+ck11tThkicK5gaSAn8Oe+7YjZA2L+ffTx4897kVGTpWRkSk7ftp/eovSz1EugWnYB1PduWIS1GYXXv289Rd0ELB+J4+vObjHY3dNTY2YiZl5qPt+TwdFJc709KLCAuXdW7cehF5MmDTpGkRMClnvDxQSxHh8roE6FCBnY4oPBejZ2IbNh9/wFyF5LRqFBpuAIIZqc4/HaPJHYswCq9vdiJsWd29FWEyZPiMYjj+KiZk4eNiweL9zwWbS0tJlgMiD6w7OOTi77tHV00vChQG2esXSSDEhuMhKjI83Sk54PBrU9OYKiOysrC74vSKuXbUaTsjfwAVTUsJjI2KiGft4I/i/xmPZ374xAogwc0OsNScNuFU3rnQ9nZKcZAiBWuvctm0YbzKJgacUFxWxxREAHrR1w7oT2LhPh/1OXTpnCoXEH6tJUAQ5ccEaaFwyRrkFW5EDtlAC4NBYGo+QNMIedYkQBARC4wc4ev/ubT+vvXvciVoPeCtGGI6KvhZ6ed75gDPL8H4oKioWrHVxCoTIug+YDc8AOLHjdDpSR1T9u+l0fxsSdH7J8hUr3cn321VYqALt+ukOfCroA4h/+GCcz/Fj654mJxksX7nKHVN1C25cDbNa6+ocuHLdejfAVwYM1EuRl1cohAzRVRs2beH32pCzkBD3yLgrM9S8pVSLaQz+vqdWHN6/b0dVVZWkkpLS73aqaj8DfE+5+vt4u9IoTM2qqmpJyJEB4SmBaXCYEFEQst2fDlySAx4oNAuUy3F204QlTziFDOs8y2xhaSYcMEBje06cgoogjwAQbyp0Pu5B7IQta1efguO+54PNIB4BIdnysA0eD4bpwZRYsB8bdc+ULCQqKyulMtLf94btwUOHxvM78JCPcdr7xBpA2gHsAzMFMhXh3Oy51n47t2w6Yjzsn0+Q5TjSwDB6otnkUA1Nja8gzMDkIAYmcaO1m902gHD8+eN7R0ibFiTvg0wP78dM2rh6pe+PnBwNzKTID78bNbhb9x5v+f2+Tgc1FLIr5QnxEkL6A4UEmxlBEQvBS0tgi8Rk/tcQYYmyx1AwuZHKk8HmYiWCmmzM3nQwFTAQNy8FqMe4WdVevUOOZlPeDGYnAamHnwABQJBFiJ9+kfpsGIRAwzVHGY+5w+/AR9+5PRXPCVi32W09LiCAwCW47/BRW9slS72CA/0d/bxPrKaqVQF9grZIg0lVDQFaNEJWaGPVK+yYnIJCUer7DIFDiqEwjte+vTsxjWd8F23tDLh2YWGBsiACgk37FPLcnykkyIVnuGkJFEoGu3DhmASsbE92c4bI9GijUEBoKKULAyHgE2grRsEJeq1/ho14FBwY6LDdY48TfiwxLs4Y/qqqq+cOGvIP35rE+q3b1sbcvWM+bbblObtlyynTj8Gn777/wNKde/c7Qhhz2vPUfwBszfz0SefH91yN/Px81eLCQkVG+jsp4hIiHEXoIrVQu0FZpd3vDhqCue1AOBzx3Lc9/uHD8eNMJl0LvXlrROrTp8PBhGn2gLewpNg6F+cAYpCOpLRUhSJm8piYTb5CFdx0Kei83ZOkJAOE8B38iZMBVMgOhqI4xD6KiYtVq6mp5YJ7nJdQfBATPenW9fDZgCuBljd8pP79WXPmnpGSluao+wqh6FATlLXgYQJcTrZYo1PnL9NnWwbiAWY4fcr40Mv7yJENxH6RF+cV69ZtJRYgglKKlI4GbHvj9h1riPeAGJB7kZHTCF5NFEzw7thCONli+gUA+eksIJETTWeDGpnxDQ3aAXvbxk5TLB4IjcZZAwIh2CQou+RozOugkdoTCtG0OJiFy2R9//btAGAM8GT8xNR68nkDI6O7ly8ELf7161d7wgQxgb+Tp1lcoDdVgYtAGpqdvnid8rXa8e+e5U21hesCE1jOs/EFM8rvfLD5jaj7evHPXmimffoim5H7Ezl35eoY74CzFtcwMwD2QWtIefu+XdTjpB6XbkSMPOztY9Uk5lBbK3r75o2ZllPNHy2dP+86YCyxySnaJ077zxC0ihRXjawFl9Do3CkzKT7OKCEubgzMBihqfPvmzZkWE8c9fXT//kRye2CG0pJixbBLFxcwtCxmHx7djzaBIjXEtiIiIrWa2PXvRUZMe5H6dCjMw+qqavGb167OMR9r/DyVGVhHJEiDd1xkG2ZnPecWuID7DRjwVFxcvHKf+869JkaGrzCBzlFDVVJKqlxVVe172KWQBZmfP+owBFRBQbsTXoc2mY8zfl5AKu0H5iX0H2f2h1jfE+MejYH9ivJSWThXWMCuZQI4DO0SsHY435VD28shC8DkI7YFoQZRw1B+EbxQwMoQDuC2bo33AsuZd8GLJcqJMzC1Chop/gHPTSCAjkRpRQ7vZrtuIzhJ1j458zTYE8QQkh8BaR2VlRBijhMM3qbVK33AfID98SacCDzgA9IyMqUnDh3csu1fD+ec7OzOL5+nDoUuWy8QvFrRuIkm11tLK4ICLJi2oTt9tlXgvsNHbPHj7lu3eEFNCdgOi7wzdAAhToRIYJpYTJrwRFu7a/oSx+Weo8eOjeSadIWNH0Rz8tLEKPGqFmqBrmvWbU+KjzdSUFQs3H/kqC3OqKZGo1+ePePnZGhszGbugaZQXFyseO925NQdHnuX4e5jGBNs5c4kM4sLdv0rISG2BqON7uK1McA7Y2pkmHbq2NH13v6BFsTvgOYRc+f2lKO+Z2aamJtfwY+DV2m+5cx7dvPmRtx5GN9HklCRrZtO93f2zi57Th0/ut7S2sYPj8f4+CG998RRBm8irl+bPc920Qk2/sHGEv+9EEyH/364z+2IiBlkwQsJaaAhYAtRJj4XQNjk/85rJ0bCsqAKGnikIq6HW65Yt2ErrpFdCblou36Fi//rV2l6omS1m3txGRqne5SUd4HwqGRFniNUACmbp4NGdpsStAk+JhTUU1hkbXWL3CdGyTemZHJeahciJSVVAeeLi4qVKirKpXFVrLSUWZiW4GoBhB7KzZ0/c9ppuqVlYHJCAqNALqbuhjLsdQGpsWYjNzuOytYjJ3Mxt6EoDfzNwFYvPAksNeXJiFs3rs/GL8Gr2C5oK9du3xvCrwv3zau0gTSCmUmJMyMIu1LYCpmyZC0QBBloAGVlpXJ8TTwaI+x8Ba+2RK0XvF0D9AY9ySBpBTDeQYEByxYtdTxIFBAMjadTp0zPI8fmz5ps9vha6GUbq3k2Pk31CfJ1AGMiVk4DgnJ8D5KfahN/Pz6f1Tt0yIJzaurtc7jhhThBAFnw1XAjfodZq2u3dAYwX14uI8qNsdnsHgqNgdWGnJdB4S2hEU0SlGRGkLEJlOeP5VdhVVNXz6GqS9lYdIYGVZ/8LHkl6txjlm0j/i7rBbbeZzGbcrXT8nNofZ0IHUHqnVev2dmc+Y6tXkWgBjeFBTW1UiMNyWV1uB2Nr5iQfwITHDfG+w3Q5emi5UdAMJ4mdj9YdQX5rUc892+jCVg4iNv9iXMk7cXzIU8SE0fZO7ns5SVYYqOjzKC8H+x27d79XTe8whXlD0TZNMynycn6unp6ycRmz54k69fV1oqYTZ16ieoyMPaAEyQ9jh9NFhIISdiBSu/ve2ol/NU3HH2PJwhP6JuIqGgtrzSCH9+/d8DzThrMZeO7vMoG4j2ChevcGT9nRSWlvD79+qeK8l75UY5AKo5JirJXTKbUQFB+gEJi3AQ5r4O9oEprEdKM1QvKp02aMvXSLUw9g/3Z1vN8id4OQWiyxfRgXufBBOAX5/D38V6Rk5PdqUsX7Yy2DClubq1MWnO/R3H/mKgoM72eOoVQ3Leqqkpq5py5ZxycWQlaVPfev9vdAwQ6Xr2bq5DAZsWj2NgJAP6Brf7syRN9sNWXOrt6EFuVlZUxVnw5HhGwsnKyRVDvk9t5SBAE06e6qkoCAvF27d3vwE92Kb+CNv3d2/7ublu88HEPuX7DgKuQwMYIsChM8NRVVlRIa3bq/OmY7+lZYF7TeTFLU/UliJzWCCiS3snB8Y4OgguT89LE7yA0dncnAZdowWQjDjA/4oaqzZqNmzfjzFuFDSieHdjadC30kg1EWF69fMmG35f40Nr6pSTNBY4pktCaSwMHDUrCJvBMTDj4A9gKIeF4li/l84Yo1pjYAQ9Snmk9ePJUC6pq87q+hKRElYKiQiFU9rK1W3L4XnxCTygdSGwD9Ubhuq/TqF+CBKDql0+funfikfS3wM7+yKHjJ6376w58AvPJlItW0twl0NDI6C7+m+EDlcJ5PR/I/vU46LVYpZ3qD9X27b/jVdtFGwOYGuMXqBmEzRSmcda/RMmFZyiATKJngtiepS0gpOgIYiYo2iqTjKP0Gz/qNekYeDcYZe6xa8H7LMowu+3A0ePzBc2ebIoAhATUfq2L01lMUCwAxuCZu9GS2gkCaARgbjBCvmmcJfYRigmDtqqMQmjKyiq/9UeNjoJQeyj2677VzSsi+r4uqN/8aIxQ9LiqskpSlSp7FOvz0OEjHvDELTACABgExakjhzdMMJl0TbQxT6aBzpzyXlVVXS1pPmVqCLeFp6uOzjujceMjtLrpvDcZpf8GTDKqYsLN0SKoYC54PQJE7oJ2QPUdTFilQMo9LHquS5eERN64PtsU679oI7NSDCZb/ANKYBiE5TTlfE0gwioRR7yWmPhPZNioS2qKyr9KUp+MrPj8YWR9bY0cd65kD9tmW5BaiRGao0nAig6ehDnzF3h/zMjoxXh/w+3IaVDpes/Bw4ubermOoARelMdxj8Y+fvRwLFSdDrl+04CIlpNR8DbVJBDWn11um72oFgGqWqmCCmZ+BT2svlt27FppM3tmFMQeLHJwPEjVlvwMA3x9ViTGxRlxBfL4GEPAb3Z67F22aK5V5OJ5cyO2/7vHSbtbt3QAxs/4eK88fuigG3gpIHmQchgJY6KlrZ0xf7Hd0cDTfi5W82x8u/fs9ZrfhU6QNpaTzeNc1q7bTjZHG7V+5r7p5CmXA/18XPbs2L7PeNz4m6JIY0QhytWzgXIwDPXEIIOXjGvLyKVLW9kekLecc44uJcWa3Ji0Knr9qn9RwmOD0pQkg7I3aYa1lWUdqSYeexJYKzCCIEKGJKUunA1kFEV1c9/tCm/vmjXZ9HEmplZinx5zLKY8xCTvpZXrN27Raoa3g4ogqxLCqzesdD2joKiYD/kTNKaQAFANXpkHXovvObmatDYnpNFDAe+tEOSbEJbdUq1iUE+dwrIGPz9qajzq5a37DwdAPg4UuPl3+9YDeXl5qms3b9mIt4fEsrCQi7bM7xYQBQBoC8Rr52RndTYzHv2yrLRUPsjf3zHtxfPBIeE3DXn1B4BAv6CLpm5rV58abzDiPbzEGXsmMlBoB8L3nVZxAtqxUffMVjguDYZ+ACbxOSOj5xqsz1Cb5EbYlblTxo9NPXc5bAzVYgM4DCPOAWNW/PdTgqY9usE4yYFLHB93Ks8NkPfRwxtAoMFRq6nmjyB4DxIg3TDTY6a5acKQPj1/UwOXgvq/2cyLhpmAqGs+ll5g7ylvxuU1f5gkVhig+xw+tKWOxxh23JdM7cLEBP3ipESDspfPDKsKfvWh0SigiBZqEnjgF1+qG6FN5sePPcDtFRhyeTy43sBdej40bMz8WTOjPmV86Ak/+9H9mImrN2za3JqsCZK/MD9fxXaJ/WGiWvv1y5eu8MaxsMuX5kPdSDgmTXhnRxvYGi1SQtAWahJBYeFG+NwTF2dVvPI6eWpOxsrVvcnRigBmzpk334dGEREsQ1K5G17B0KBZQDsoLcBPn0YZG9+JSXrSLTUlZQRUMldQUCgY9M/QeG5mIbwW4MLV66Px0VRWUfkF29D+Vuyj/rk5OZrcFpigK6xXRIhLcK8JGgzjRNbcmPYHuWDODMs5AaONx97Gy9V2ZEbmQt0VCKQrzC9QEaVkfkLKMYJwmhLcQEDw84p07xcut3T5fqlhwx8LOgmkumh9hk8HyznnYb+moEC5MClxZHFSgkHJ02TDytxvQ9D6enG0taZ6E8IGGJJRwBVrB7kQO7ZsOnriTIAF0ZYFMCg0InL4aqdl58DNduD4yXkMUKt17XCUKnS7V58+L3fs2bess5Z2hseObQewlax4js18n7YSEbKycsUamppfmiMrOmp2+sLIIZFvfi3L3n37UiL/sHJj515w3FND8ysxXJkXgdBvbt1KMD1g5efH1IT51JvLfUDIkQUdkfjtX28BfgfMZVUulb3gFQ/wQXIMBqL85GggpMAZYmAVQqdXig41PCvv4HRAQqd7eltN0vqqSsmip0+HiCooFMn17desl6QA6pyfl6cGPxCCUPgt5Z7+9m1/SHXmFTQFcfl9+w94Rvs/E/wmqJMBqrdaM95HKiQh8VyksvV1Ubb4Ro6X9LJrEWzahKhYvsTEKSfk7ZYeFVNV+ykcTiEJ6b9HoiytgB2QRFFuaCxKo0vLfpaYZXNQwdrGn06R6SYkIQnpPyYkWDKA9OIdgv0BwoPeTj1FxtZ+v6z5lDBEVLRWOHxCEtJfJCRYwoKET2AfunbPW7L2y/fLGBjGCodMSEL6S4UERxg1nV4jqjc8SM7ByVOyd5/XwqESkpD+UiHBHmKNQmpZkcRY01PySxwPi3XokCMcIiEJ6W/XJHApISH5TcpizmGFBYt86K2cgyAkIQnpT9YkFNq9lJlvt1/OYkYIQkpSEZKQhCSk/wkwAMD9z2ySmQFAAAAAAElFTkSuQmCC);
  background-size: cover;
}
'''
    }*/
  ]

if module? => module.exports = plotdb.theme.sample
