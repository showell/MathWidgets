Canvas = (div, id) ->
  width = 600
  height = 300

  canvas_html = """
    <canvas id='#{id}' width='#{width}' height='#{height}' style='border: 1px blue solid'>
    </canvas>
  """
  div.append canvas_html

  canvas = document.getElementById(id)
  ctx = canvas.getContext("2d")

  clear: ->
    canvas.width = width

  segment: (color, point1, point2) ->
    ctx.strokeStyle = color
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo point1...
    ctx.lineTo point2...
    ctx.stroke()
    ctx.closePath()
    
  draw_polygon: (color, point1, more_points...) ->
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.moveTo point1...
    for point in more_points
      ctx.lineTo point...
    ctx.lineTo point1...
    ctx.fill()
    ctx.closePath()
  
  outline_triangle: (color, point1, point2, point3) ->
    ctx.strokeStyle = color
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo point1...
    ctx.lineTo point2...
    ctx.lineTo point3...
    ctx.lineTo point1...
    ctx.stroke()
    ctx.closePath()
  
PythagProof = ->
  canvas = Canvas $("#pythag_proof"), "pythag_canvas" 
  
  rescale = (point) ->
    [x, y] = point
    y -= 4
    [x * 8 + 300, -y * 8 + 150]
    
  draw_poly = (poly, color, points) ->
    coords = (points[poly.charAt(i)] for i in [0...poly.length])
    canvas.draw_polygon color, coords...

  a = 8
  b = 3
  c = (a * b) / (a + b)
  points =
    A: -> [-a, 0]
    B: -> [-a-b, 0]
    C: -> [-a, c]
    D: -> [-a, a]
    E: -> [-a-b, a]
    F: -> [-a-b, a+b]
    G: -> [-a, a+b]
    H: -> [0, a+b]
    I: -> [a, a+b]
    J: -> [a+b, a+b]
    K: -> [a+b, a]
    L: -> [a, a]
    M: -> [b, a+b]
    N: -> [a+b, 2*a+b]
    O: -> [2*a+b, a]
    P: -> [a+b, c]
    Q: -> [a, 0]
    R: -> [a, -a]
    S: -> [a-c, -a]
    T: -> [0, -a]
    U: -> [0, 0]
    V: -> [b, a+b+c]
    W: -> [0, a]
    X: -> [a, -a-b]
    Y: -> [0, -a-b]
    Z: -> [-a, -a]

  blue = "#AAAADD"
  
  triangles = [
    ["FGDE", "cyan"]
    ["EDCB", "pink"]
    ["ABC", "lightblue"]
    ["AUG", "yellow"]
    ["UGH", "lightgreen"]
    #
    ["STU", "red"]
    ["UQRS", blue]
    #
    ["HIQ", "lightgreen"]
    ["HMV", "lightblue"]
    ["VNJM", blue]
    ["NKO", "yellow"]
    ["OKP", "red"]
    ["LKPQ", "pink"]
    ["IJKL", "cyan"]
  ]
  
  redraw = ->
    canvas.clear()
    scaled_points = {}
    for vertex, point of points
      scaled_points[vertex] = rescale point()
    
    for triangle in triangles
      [vertices, color] = triangle
      draw_poly vertices, color, scaled_points

    segment = (segment, color) ->
      point1 = scaled_points[segment.charAt(0)]
      point2 = scaled_points[segment.charAt(1)]
      canvas.segment color, point1, point2
    
    # black > blue > green
    segment "BW", "black"
    segment "HQ", "black"
    segment "HN", "black"
    segment "NO", "black"
    segment "OQ", "black"
    
    segment "BU", "blue"
    segment "UH", "blue"
    segment "HF", "blue"
    segment "FB", "blue"
    
    segment "QI", "blue"
    segment "NK", "blue"
    
    segment "EW", "blue"
    segment "UQ", "green"
    segment "UX", "black"
    segment "QX", "blue"
    segment "AG", "blue"
    segment "UY", "blue"
    segment "YX", "green"
    
    segment "AZ", "green"
    segment "ZT", "green"

  redraw()      
  
TwelveTriangles = ->
  canvas = Canvas $("#twelve_triangles"), "twelve_triangles_canvas"
  skew = 0
  height = 1
  
  rescale = (point) ->
    [x, y] = point
    x -= 4 # keep centroid centered
    x += y * skew
    x /= height
    y *= height
    [x * 40 + 300, -y * 40 + 150]
    
  draw_triangle = (triangle, color, points) ->
    v0 = triangle.charAt(0)
    v1 = triangle.charAt(1)
    v2 = triangle.charAt(2)
    canvas.draw_polygon color, points[v0], points[v1], points[v2]
    
  draw = ->
    points =
      A: [0, 2]
      B: [2, 2]
      C: [6, 2]
      D: [3, 1]
      E: [0, 0]
      F: [4, 0]
      G: [6, 0]
      H: [3, -1]
      I: [0, -2]
      J: [2, -2]
      K: [6, -2]
      

    triangles = [
      ["ABE", "red"]
      ["BED", "green"]
      ["BCD", "blue"]
      ["DEF", "blue"]
      ["DFC", "green"]
      ["CFG", "red"]
      #
      ["EFH", "pink"]
      ["FHK", "lightgreen"]
      ["FGK", "lightblue"]
      ["EIJ", "lightblue"]
      ["EJH", "lightgreen"]
      ["JHK", "pink"]
    ]
    
    redraw = ->
      canvas.clear()
      scaled_points = {}
      for vertex, point of points
        scaled_points[vertex] = rescale point
      
      for triangle in triangles
        [vertices, color] = triangle
        draw_triangle vertices, color, scaled_points
      
      vertices = (scaled_points[vertex] for vertex in ["E", "C", "K"])
      canvas.outline_triangle "black", vertices...

    redraw()
    
    $("#more_skew").click ->
      skew += 0.2
      redraw()
          
    $("#less_skew").click ->
      skew -= 0.2
      redraw()

    $("#taller").click ->
      height += 0.1
      redraw()
    
    $("#wider").click ->
      height -= 0.1
      redraw()
      
  draw()

MultiplicationTables = ->
  colors =
    2: "#EEEEEE"
    4: "#CCCCCC"
    8: "#AAAAAA"
    16: "#999999"
    3: "#EEAAAA"
    6: "#DDAAAA"
    9: "#CCAAAA"
    11: "DD6666"
    5: "#AAEEAA"
    10: "#AADDAA"
    15: "#AACCAA"
    20: "#AABBAA"
    7: "#AAAADD"
    14: "#AAAACC"
    12: "#00FFFF"
    13: "#FFFF00"
    17: "#FF00FF"
    18: "#55DD55"
    19: "#DD00DD"

  set_color = (n, width) ->
    color = "white"
    for delta in [0, 1]
      i = width + delta
      if n % i == 0 and colors[i]
        return colors[i]
    for i in [20..1] by -1
      if n % i == 0 and width % i == 0 and colors[i]
        return colors[i]
    if n % 2 == 0
      return colors[2]
    color

  max_prime_factor = (n) ->
    return n if n <= 15
    max = null
    for i in [2...n]
      break if i * 2 > n
      if n % i == 0
        max = i
        return max if i * i >= n
    return max if max
    return n if n <= 23
    return max_prime_factor(n+1)

  width = 10
  special_number = 10
  draw = ->
    html = """
      <h3>#{special_number}</h3>
    """
    for i in [1..special_number]
      if special_number % i == 0
        html += """
          #{i} * #{special_number / i} = <b>#{special_number}</b><br>
          """
    html += "<hr>"
    for i in [1..10]
      html += """
        <b>#{special_number}</b> * #{i} = #{special_number * i}<br>
        """
    facts = $ "<div>"
    facts.html html
    facts.css "border", "1px black solid"    
    $("#multi_right").html facts
        
    table = $("#multiplication")
    table.empty()
    height = Math.floor 169 / width
    max = null
    for n in [2, 3, 4, 5, 7, 11, 13, 17]
      if width % n == 0
        max = n

          
    for i in [0...height]
      tr = $ "<tr>"
      table.append tr
      for j in [0...width]
        n = i * width + j + 1
        color = set_color(n, width)
        style = "background: #{color}"
        td = $ "<td style='#{style}' align='center'>#{n}</td>"
        if max and (j + 1) % max == 0
          td.css "border-right", "2px black solid"
        td.attr "height", 40
        td.attr "width", 40
        td.attr "font-size", "13px"
        if n == special_number
          td.css "border", "5px black solid"
        else if special_number % n == 0
          td.css "border", "3px blue solid"
        else if n % special_number == 0
          td.css "border", "3px red solid"
        if (n % width == 0) or (n % (width-1) == 0) or (n % (width+1) == 0)
          td.css "font-weight", "bold"
        f = (n) ->
          td.click ->
            special_number = n
            width = max_prime_factor n
            draw()
        f(n)
        tr.append td
      td = $ "<td> #{width} * #{i+1} = #{(i+1)*(width)} </td>"
      td.css "border", "1px blue solid"
      tr.append td

  $("#multi_wide").click ->
    width += 1
    special_number = width
    draw()
    
  $("#multi_narrow").click ->
    width -= 1
    special_number = width
    draw()
    
  $("#multi_plus_one").click ->
    special_number += 1
    width = max_prime_factor special_number
    draw()
    
  draw()

jQuery(document).ready ->
  PythagProof()
  TwelveTriangles()
  MultiplicationTables()